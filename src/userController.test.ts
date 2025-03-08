import { expect, test } from "vitest";
import { UserState } from "./shared";
import { check } from "./userController";

function createState(valid: boolean): UserState {
    const state: UserState = {
        validBasic: valid,
        name: valid ? "dork" : "",
        validName: valid,
        validLicensing: valid,
        licenseCount: valid ? 3 : -1,
        validLicenseCount: valid,
        saveEnabled: valid,
        inProgress: false,
    };
    return state;
}

test("happy path", () => {
    const state = createState(false);
    state.name = "henry";
    state.licenseCount = 3;
    expect(check(state)).toEqual({
        ...state,
        saveEnabled: true,
        validBasic: true,
        validLicenseCount: true,
        validName: true,
        validLicensing: true,
    });
});

test.each([
    [-1, "License count must be non-negative"],
    [5, "Not enough licenses"],
])(
    "invalid license count: %d -> %s",
    (licenseCount: number, errorMessage: string) => {
        const state = createState(true);
        state.licenseCount = licenseCount;
        expect(check(state)).toEqual({
            ...state,
            validLicensing: false,
            validLicenseCount: false,
            licenseError: errorMessage,
            saveEnabled: false,
        });
    },
);

test.each([
    ["", "Name must not be empty"],
    ["alice", "Name already exists"],
    ["charles", "Too long a name"],
])('invalid name: "%s" -> "%s"', (name: string, errorMessage: string) => {
    const state = createState(true);
    state.name = name;
    expect(check(state)).toEqual({
        ...state,
        saveEnabled: false,
        validBasic: false,
        validName: false,
        nameError: errorMessage,
    });
});
