import * as React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { GpxUploadConnected } from "../../components/GpxUploader";

interface NavMenuState {
    anchorEl: Element | null;
    menuOpen: boolean;
}

const ITEM_HEIGHT = 48;

export class NavMenu extends React.PureComponent<{}, NavMenuState> {
    public state = {
        anchorEl: null,
        menuOpen: false
    };

    private handleClick = (event: React.MouseEvent) => {
        this.setState({ anchorEl: event.currentTarget });
        this.toggleMenu();
    };

    private handleClose = (): void => {
        this.setState({ anchorEl: null });
        this.toggleMenu();
    };

    private toggleMenu = (): void => {
        this.setState(({ menuOpen }) => ({
            menuOpen: !menuOpen
        }));
    };

    public render(): JSX.Element {
        return (
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.menuOpen}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch"
                        }
                    }}
                >
                    <MenuItem>
                        <GpxUploadConnected onClose={this.handleClose} />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}
