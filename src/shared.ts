export interface UserState {
    inProgress: boolean;

    validBasic: boolean;
    name: string;
    validName: boolean;
    nameError?: string;

    validLicensing: boolean;
    licenseCount: number;
    validLicenseCount: boolean;
    licenseError?: string;

    saveEnabled: boolean;
}
