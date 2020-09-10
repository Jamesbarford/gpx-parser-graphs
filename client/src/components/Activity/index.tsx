import * as React from "react";
import { connect } from "react-redux";
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";

import { ActivityIcon } from "../ActivityIcon";
import { AppState, DispatchThunk } from "../../store/store";
import {
    getActivityDateFormattedFromISODateOwnProp,
    getActivityNameFromISODateOwnProp,
    getActivityTypeFromISODateOwnProp
} from "./selectors";
import { deleteActivityThunk } from "../../store/data/activities/thunks";

interface OwnProps {
    activityISODate: string;
}

interface MapStateToProps {
    name: string;
    dateFormatted: string;
    activityType: string;
}

interface MapDispatchToProps {
    deleteActivity(): void;
}

type ActivityComponentProps = OwnProps & MapStateToProps & MapDispatchToProps;

const ActivityComponent: React.FC<ActivityComponentProps> = props => (
    <ListItem button={true} disableRipple={true} dense={true} alignItems="center">
        <ListItem
            component={Link}
            to={`/activity/${props.activityISODate}`}
            className="link-box__contents--activity"
        >
            <ListItemIcon>
                <ActivityIcon activityType={props.activityType} />
            </ListItemIcon>
            <ListItemText primary={`Name: ${props.name}`} secondary={`Date: ${props.dateFormatted}`} />
        </ListItem>
        <Tooltip title="Delete">
            <ListItemIcon onClick={props.deleteActivity}>
                <DeleteOutlineIcon />
            </ListItemIcon>
        </Tooltip>
    </ListItem>
);

export const ActivityConnected = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
    (state: AppState, ownProps: OwnProps) => ({
        name: getActivityNameFromISODateOwnProp(state, ownProps),
        dateFormatted: getActivityDateFormattedFromISODateOwnProp(state, ownProps),
        activityType: getActivityTypeFromISODateOwnProp(state, ownProps)
    }),
    (dispatch: DispatchThunk, ownProps: OwnProps) => ({
        deleteActivity(): void {
            dispatch(deleteActivityThunk(ownProps.activityISODate));
        }
    })
)(ActivityComponent);
