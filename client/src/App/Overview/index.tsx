import * as React from "react";
import { Typography, List } from "@material-ui/core";
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
                        <>
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                            <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        </>
                    }
                    ErrorComponent={
                        <Typography color="error" variant="h6">
                            {this.props.allActivitiesRequestState.error}
                        </Typography>
                    }
                    SuccessComponent={
                        <List>
                            {this.props.activityIds.map(id => (
                                <ActivityConnected key={id} activityISODate={id} />
                            ))}
                        </List>
                    }
                />
            </PageContainer>
        );
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
