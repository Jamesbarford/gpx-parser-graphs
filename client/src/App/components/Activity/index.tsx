import * as React from "react";
import { connect } from "react-redux";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

import { ActivityIcon } from "../ActivityIcon";
import { AppState } from "../../../store/store";
import {
    getActivityDateFormattedFromISODateOwnProp,
    getActivityNameFromISODateOwnProp,
    getActivityTypeFromISODateOwnProp
} from "./selectors";

interface OwnProps {
    activityISODate: string;
}

interface MapStateToProps {
    name: string;
    dateFormatted: string;
    activityType: string;
}

type ActivityComponentProps = OwnProps & MapStateToProps;

const ActivityComponent: React.FC<ActivityComponentProps> = props => (
    <ListItem
        button={true}
        disableRipple={true}
        dense={true}
        alignItems="center"
        component={Link}
        to={`/activity/${props.activityISODate}`}
    >
        <ListItemIcon>
            <ActivityIcon activityType={props.activityType} />
        </ListItemIcon>
        <ListItemText primary={`Name: ${props.name}`} secondary={`Date: ${props.dateFormatted}`} />
    </ListItem>
);

export const ActivityConnected = connect<MapStateToProps, null, OwnProps>(
    (state: AppState, ownProps: OwnProps) => ({
        name: getActivityNameFromISODateOwnProp(state, ownProps),
        dateFormatted: getActivityDateFormattedFromISODateOwnProp(state, ownProps),
        activityType: getActivityTypeFromISODateOwnProp(state, ownProps)
    })
)(ActivityComponent);
