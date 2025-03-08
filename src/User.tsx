import { JSX, useEffect, useState } from "react";
import UserView from "./UserView";
import { UserState } from "./shared";
import { check } from "./userController";

export function User(): JSX.Element {
    const [userState, setUserState] = useState<UserState>({
        inProgress: true,

        validBasic: false,
        name: "",
        validName: false,

        validLicensing: true,
        licenseCount: 0,
        validLicenseCount: true,

        saveEnabled: false,
    });
    useEffect(() => {
        setTimeout(() => {
            setUserState({
                ...userState,
                inProgress: false,
            });
        }, 2_000);
    }, []);
    return <UserView state={check(userState)} setState={setUserState} />;
}
