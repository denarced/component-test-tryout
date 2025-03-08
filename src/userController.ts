import { UserState } from "./shared";

type Checker = (state: UserState) => UserState;

const CHECKERS: Checker[] = [checkName, checkLicenseCount];
const EXISTING_NAMES = ["alice", "bob", "chuck"];

export function check(state: UserState): UserState {
    state = JSON.parse(JSON.stringify(state));
    for (const each of CHECKERS) {
        state = each(state);
    }
    state.saveEnabled = state.validName && state.validLicenseCount;
    // Seems silly but that's only because the tabs only have one input field each.
    state.validBasic = state.validName;
    state.validLicensing = state.validLicenseCount;
    return state;
}

function checkName(state: UserState): UserState {
    // In both cases (name and license count) there are multiple checks and they're made in the same function. That's not a coincidence. If there were multiple functions,
    // we'd need to have a context for these checks. The problem comes when the state is invalid at the start of any given check function. We'd need to know whether the
    // state (e.g. validName) was already invalid before all of the checks. If it was, the first check could run the check and mark the state as valid if the check passes.
    // If it marks it as invalid, the next check would need to know that current invalid state is due to previous check during the overall check round. It would then
    // skip the check because there's only one error message for any given field.
    const trimmed = state.name.trim();
    state.validName = trimmed.length !== 0;
    if (!state.validName) {
        state.nameError = "Name must not be empty";
        return state;
    }
    state.validName = trimmed.length <= 5;
    if (!state.validName) {
        state.nameError = "Too long a name";
        return state;
    }
    state.validName = !EXISTING_NAMES.includes(state.name);
    if (!state.validName) {
        state.nameError = "Name already exists";
        return state;
    }

    delete state.nameError;
    return state;
}

function checkLicenseCount(state: UserState): UserState {
    if (state.licenseCount < 0) {
        state.validLicenseCount = false;
        state.licenseError = "License count must be non-negative";
        return state;
    }
    if (state.licenseCount >= 5) {
        state.validLicenseCount = false;
        state.licenseError = "Not enough licenses";
        return state;
    }

    state.validLicenseCount = true;
    delete state.licenseError;
    return state;
}
