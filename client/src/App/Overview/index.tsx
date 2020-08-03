import * as React from "react";
import { Typography, Container, Card, CardContent, List } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { connect } from "react-redux";

import { getAllActivitiesThunk } from "../../store/data/activities/thunks";
import { AppState, DispatchThunk } from "../../store/store";
import { RequestError, RequestState, RequestStates } from "../../lib/persistance";
import { getAllActivitiesRequestState, getAllActivityIds } from "../../store/data/activities/selectors";
import { ActivityConnected } from "../components/Activity";

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
            <Container style={{ marginTop: "30px" }} fixed>
                <Card>
                    <CardContent>
                        <Typography variant="h4">Activity Overview</Typography>
                        {this.renderList}
                    </CardContent>
                </Card>
            </Container>
        );
    }

    private get renderList(): JSX.Element | null {
        if (RequestError.is(this.props.allActivitiesRequestState)) {
            return (
                <Typography color="error" variant="h6">
                    {this.props.allActivitiesRequestState.error}
                </Typography>
            );
        }

        switch (this.props.allActivitiesRequestState.state) {
            case RequestStates.Initial:
            case RequestStates.Loading:
                return (
                    <>
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                        <Skeleton variant="rect" style={{ marginTop: "5px" }} animation="wave" />
                    </>
                );

            case RequestStates.Success:
                return (
                    <List>
                        {this.props.activityIds.map(id => (
                            <ActivityConnected key={id} activityISODate={id} />
                        ))}
                    </List>
                );

            default:
                return null;
        }
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
