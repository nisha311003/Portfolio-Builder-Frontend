import React from 'react'
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import './DialogBox.css'
import Button from "@mui/material/Button";

const AlertDialogBox = (props) => {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="confirm-dialog-container"
                PaperProps={{ sx: { borderRadius: "0" } }}
            >
                <div>
                    <DialogTitle id="alert-dialog-1st-title"
                                 sx={{
                                     borderRadius: 0,
                                     textTransform: "none",
                                     paddingX: 2,
                                     paddingY: 1,
                                     fontSize: 16,
                                     fontWeight: "bold"
                                 }}
                                 className="confirm-dialog-title"
                    >
                        Alert
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{
                        paddingX: 3,
                        paddingY: 3
                    }}>
                        <DialogContentText id="alert-dialog-description">
                            <div>{props.message}</div>
                        </DialogContentText>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" onClick={props.onClose} autoFocus>Close</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}

export default AlertDialogBox;