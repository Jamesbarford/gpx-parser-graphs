import * as React from "react";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

interface ActivityIconProps {
    activityType: string;
}

export const ActivityIcon: React.FC<ActivityIconProps> = props => {
    switch (props.activityType) {
        case "run":
            return <DirectionsRunIcon />;

        case "cycle":
            return <DirectionsBikeIcon />;

        default:
            console.warn(`${props.activityType} not a known activity`);
            return null;
    }
};
