import * as React from "react";
import { isNil } from "lodash";
import { connect } from "react-redux";

import { DispatchThunk } from "../../../store/store";
import { uploadGPXThunk } from "./thunks";

interface GpxUploadState {
    file?: File;
}

interface MapDispatchToProps {
    uploadFile(file: File): void
}

type GpxUploadProps = MapDispatchToProps;

class GpxUpload extends React.Component<GpxUploadProps, GpxUploadState> {
    public state: GpxUploadState = {
        file: undefined
    };

    private handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ file: e?.target?.files?.[0] });
    };

    private handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!isNil(this.state.file)) {
            this.props.uploadFile(this.state.file);
        }
    };

    public render(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleFileChange} type="file"/>
                <button>submit</button>
            </form>
        );
    }
}

export const GpxUploadConnected = connect<null, MapDispatchToProps>(
    null,
    (dispatch: DispatchThunk) => ({
        uploadFile(file) {
            dispatch(uploadGPXThunk(file));
        }
    })
)(GpxUpload);
