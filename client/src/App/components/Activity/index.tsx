import * as React from "react";
import { connect } from "react-redux";
import { ListItem } from "@material-ui/core";

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
    <ListItem>
        <span>Name: {props.name}</span>
        <span>Date: {props.dateFormatted}</span>
        <span>
            Type: <ActivityIcon activityType={props.activityType} />
        </span>
    </ListItem>
);

export const ActivityConnected = connect((state: AppState, ownProps: OwnProps) => ({
    name: getActivityNameFromISODateOwnProp(state, ownProps),
    dateFormatted: getActivityDateFormattedFromISODateOwnProp(state, ownProps),
    activityType: getActivityTypeFromISODateOwnProp(state, ownProps)
}))(ActivityComponent);
