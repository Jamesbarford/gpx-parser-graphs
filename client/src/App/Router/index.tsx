import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import { isNil } from "lodash";

import { OverviewConnected } from "../Overview";
import { AnalysisConnected } from "../Analysis";
import { NavMenu } from "./NavMenu";

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
                <AppBar position="static" style={{ backgroundColor: "white", color: "#333" }}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                    >
                        <Tabs
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
                        <NavMenu />
                    </Box>
                </AppBar>

                <div>
                    <Switch>
                        <Route exact path="/">
                            <OverviewConnected />
                        </Route>
                        <Route
                            path="/activity/:id"
                            children={p => {
                                const isoDate = p.match?.params?.id;
                                if (isNil(isoDate)) return <span>No activity found</span>;
                                return <AnalysisConnected activityISODate={isoDate} />;
                            }}
                        />
                        <Route exact path="/activity">
                            <span>Activity?</span>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
