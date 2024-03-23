import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CircularProgress } from '@mui/material';

interface MyComponentProps {
  enable: boolean;
}

export default function WaitDialog(props : MyComponentProps) {
  return (
    <React.Fragment>
      <Dialog
        open={props.enable}
      >
        <DialogContent>
        <CircularProgress />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}