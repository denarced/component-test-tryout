import classNames from "classnames";
import { BarLoader } from "react-spinners";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { UserState } from "./shared";
import style from "./user-view.module.css";

export interface Props {
    state: UserState;
    setState: (state: UserState) => void;
}

export default function UserView(props: Props) {
    if (props.state.inProgress) {
        return <BarLoader color="white" />;
    }
    const tabs = (
        <Tabs>
            <TabList>
                <Tab
                    className={classNames({
                        ["react-tabs__tab"]: true,
                        [style.invalidTab]: !props.state.validBasic,
                    })}
                >
                    Basic
                </Tab>
                <Tab
                    className={classNames({
                        ["react-tabs__tab"]: true,
                        [style.invalidTab]: !props.state.validLicensing,
                    })}
                >
                    Licensing
                </Tab>
            </TabList>
            <TabPanel>
                <label
                    className={classNames({
                        [style.invalidLabel]: !props.state.validName,
                    })}
                >
                    Name:
                    <input
                        className={classNames({
                            [style.invalidInput]: !props.state.validName,
                        })}
                        type="text"
                        placeholder="Name"
                        value={props.state.name}
                        onChange={(e) => {
                            props.setState({
                                ...props.state,
                                name: e.target.value,
                            });
                        }}
                    />
                </label>
                {props.state.nameError != null && (
                    <div className={style.errorLabel}>
                        {props.state.nameError}
                    </div>
                )}
            </TabPanel>
            <TabPanel>
                <label
                    className={classNames({
                        [style.invalidLabel]: !props.state.validLicenseCount,
                    })}
                >
                    License count:
                    <input
                        className={classNames({
                            [style.invalidInput]:
                                !props.state.validLicenseCount,
                        })}
                        type="number"
                        placeholder="License count"
                        value={props.state.licenseCount}
                        onChange={(e) => {
                            props.setState({
                                ...props.state,
                                licenseCount: Number(e.target.value),
                            });
                        }}
                    />
                </label>
                {props.state.licenseError != null && (
                    <div className={style.errorLabel}>
                        {props.state.licenseError}
                    </div>
                )}
            </TabPanel>
        </Tabs>
    );
    const buttons = (
        <div>
            <button
                className={classNames({
                    [style.okButton]: props.state.saveEnabled,
                    [style.disabledButton]: !props.state.saveEnabled,
                })}
            >
                Save
            </button>
            <button className={style.okButton}>Cancel</button>
        </div>
    );
    return (
        <>
            <h2>User</h2>
            {tabs}
            {buttons}
        </>
    );
}
