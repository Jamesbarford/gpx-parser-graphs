import * as React from "react";
import { List, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { connect } from "react-redux";

import { getAllActivitiesThunk } from "../../store/data/activities/thunks";
import { AppState, DispatchThunk } from "../../store/store";
import { RequestState } from "../../lib/persistance";
import { getAllActivitiesRequestState, getAllActivityIds } from "../../store/data/activities/selectors";
import { ActivityConnected } from "../../components/Activity";
import { PageContainer } from "../../components/PageContainer";
import { RenderOnRequestStateMergeInitialAndLoading } from "../../components/RenderOnRequestState";

interface MapStateToProps {
    activityIds: Array<string>;
    allActivitiesRequestState: RequestState;
}

interface MapDispatchToProps {
    getAllActivities(): void;
}

type OverviewProps = MapStateToProps & MapDispatchToProps;

export class Overview extends React.Component<OverviewProps> {
    public componentDidMount(): void {
        this.props.getAllActivities();
    }

    public render(): JSX.Element {
        return (
            <PageContainer>
                <Typography variant="h4">Activity Overview</Typography>
                <RenderOnRequestStateMergeInitialAndLoading
                    requestState={this.props.allActivitiesRequestState}
                    LoadingComponent={
                        this.props.activityIds.length > 0 ? (
                            this.renderList
                        ) : (
                            <>
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="rect"
                                    style={{ marginTop: "5px", height: "60px" }}
                                    animation="wave"
                                />
                            </>
                        )
                    }
                    ErrorComponent={
                        <Typography color="error" variant="h6">
                            {this.props.allActivitiesRequestState.error}
                        </Typography>
                    }
                    SuccessComponent={this.renderList}
                />
            </PageContainer>
        );
    }

    private get renderList(): JSX.Element {
        if (this.props.activityIds.length > 0) {
            return (
                <List>
                    {this.props.activityIds.map(id => (
                        <ActivityConnected key={id} activityISODate={id} />
                    ))}
                </List>
            );
        }
        return <Typography variant="h6">You have no activities!</Typography>;
    }
}

export const OverviewConnected = connect<MapStateToProps, MapDispatchToProps>(
    (state: AppState) => ({
        activityIds: getAllActivityIds(state),
        allActivitiesRequestState: getAllActivitiesRequestState(state)
    }),
    (dispatch: DispatchThunk) => ({
        getAllActivities(): void {
            dispatch(getAllActivitiesThunk());
        }
    })
)(Overview);
