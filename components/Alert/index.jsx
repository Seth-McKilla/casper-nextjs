import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Alert({ open, handleClose, title, btnText, children }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h4">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions style={{ padding: 24 }}>
          <Button variant="contained" size="large" onClick={handleClose}>
            {btnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
