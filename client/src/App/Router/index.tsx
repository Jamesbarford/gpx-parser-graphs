import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Tab, Tabs } from "@material-ui/core";

import { OverviewConnected } from "../Overview";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const enum RouterTabs {
    OVERVIEW
}

interface RouterState {
    selectedTab: RouterTabs;
}

export class AppRouter extends React.Component<{}, RouterState> {
    public state: RouterState = {
        selectedTab: RouterTabs.OVERVIEW
    };

    private setTab = (_: React.ChangeEvent, selectedTab: RouterTabs): void => {
        this.setState({ selectedTab });
    };

    public render(): JSX.Element {
        return (
            <Router>
                <AppBar position="static">
                    <Tabs
                        style={{
                            backgroundColor: "white",
                            color: "#333"
                        }}
                        value={this.state.selectedTab}
                        onChange={this.setTab}
                        aria-label="simple tabs example"
                    >
                        <Tab
                            label="Overview"
                            component={Link}
                            color="secondary"
                            to="/"
                            {...a11yProps(RouterTabs.OVERVIEW)}
                        />
                    </Tabs>
                </AppBar>

                <div>
                    <Switch>
                        <Route exact path="/">
                            <OverviewConnected />
                        </Route>
                        <Route path="/activity/:id" children={() => <span>Activity details</span>} />
                        <Route exact path="/activity">
                            <span>Activity?</span>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
