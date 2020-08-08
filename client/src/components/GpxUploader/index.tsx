import * as React from "react";
import { isNil } from "lodash";
import { connect } from "react-redux";
import {
    Button,
    Dialog,
    DialogContent,
    Typography,
    DialogTitle,
    IconButton,
    Box
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Close from "@material-ui/icons/Close";

import { DispatchThunk } from "../../store/store";
import { uploadGPXThunk } from "./thunks";

interface OwnProps {
    onClose?(): void;
}

interface GpxUploadState {
    file?: File;
    modalOpen: boolean;
}

interface MapDispatchToProps {
    uploadFile(file: File): void;
}

type GpxUploadProps = MapDispatchToProps & OwnProps;

class GpxUpload extends React.Component<GpxUploadProps, GpxUploadState> {
    private uploadId = "gpx-upload";
    public state: GpxUploadState = {
        file: undefined,
        modalOpen: false
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

    private toggleModal = (): void => {
        this.setState(({ modalOpen }) => ({
            modalOpen: !modalOpen
        }));
    };

    private closeModal = (): void => {
        this.toggleModal();
        this.props.onClose?.();
    };

    public render(): JSX.Element {
        return (
            <>
                <span onClick={this.toggleModal}>Upload file</span>
                <Dialog
                    style={{ minWidth: "300px" }}
                    open={this.state.modalOpen}
                    onClose={this.closeModal}
                >
                    <DialogTitle disableTypography>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Upload GPX file</Typography>
                            <IconButton aria-label="close" onClick={this.closeModal}>
                                <Close />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
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
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

export const GpxUploadConnected = connect<null, MapDispatchToProps>(null, (dispatch: DispatchThunk) => ({
    uploadFile(file) {
        dispatch(uploadGPXThunk(file));
    }
}))(GpxUpload);
