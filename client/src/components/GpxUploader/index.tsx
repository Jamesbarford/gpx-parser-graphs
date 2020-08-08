import * as React from "react";
import { isNil } from "lodash";
import { connect } from "react-redux";
import { Button, Modal } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { DispatchThunk } from "../../store/store";
import { uploadGPXThunk } from "./thunks";

interface GpxUploadState {
    file?: File;
}

interface MapDispatchToProps {
    uploadFile(file: File): void;
}

type GpxUploadProps = MapDispatchToProps;

class GpxUpload extends React.Component<GpxUploadProps, GpxUploadState> {
    private uploadId = "gpx-upload";
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
            <Modal open={false}>
                <form onSubmit={this.handleSubmit}>
                    <label id={this.uploadId}>
                        <input
                            id={this.uploadId}
                            style={{ display: "none" }}
                            onChange={this.handleFileChange}
                            type="file"
                        />
                        <Button disableElevation={true} variant="contained" component="span">
                            Select a file
                        </Button>
                    </label>
                    <Button
                        disabled={isNil(this.state.file)}
                        variant="contained"
                        disableElevation={true}
                        type="submit"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                    >
                        submit
                    </Button>
                </form>
            </Modal>
        );
    }
}

export const GpxUploadConnected = connect<null, MapDispatchToProps>(null, (dispatch: DispatchThunk) => ({
    uploadFile(file) {
        dispatch(uploadGPXThunk(file));
    }
}))(GpxUpload);
