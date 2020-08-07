import * as React from "react";
import { connect } from "react-redux";
import { DispatchThunk } from "../../store/store";
import { getActivityDetailsThunk } from "../../store/data/activities/thunks";

interface OwnProps {
    isoDate: string;
}

interface MapDispatchToProps {
    getActivityDetails(): void;
}

type AnalysisProps = OwnProps & MapDispatchToProps;

class Analysis extends React.Component<AnalysisProps, any> {
    public componentDidMount(): void {
        this.props.getActivityDetails();
    }

    public render() {
        return (
            <span>{this.props.isoDate}</span>
        )
    }
}

export const AnalysisConnected = connect<null, MapDispatchToProps, OwnProps>(
    null,
    (dispatch: DispatchThunk, ownProps: OwnProps) => ({
        getActivityDetails(): void {
            dispatch(getActivityDetailsThunk(ownProps.isoDate));
        }
    })
)(Analysis);
