import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';

export default function MsgDialog({ open, handleClose, desc }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Typography>{desc}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ padding: "6px 20px" }}
          variant="containedPrimary"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
