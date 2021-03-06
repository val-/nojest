import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';


export default function ConfirmActionPopup({ nextStatus, handleClose, handleConfirm }) {

  const [contractorPriceState, setContractorPrice] = useState('');

  const confirmMessageByNextStatus = {
    REQUESTED: 'Please confirm job request',
    REJECTED_BY_CONTRACTOR: 'Please confirm task rejection',
    REJECTED_BY_CUSTOMER: 'Please confirm task rejection',
    ASSIGNED: 'Please confirm task assignment',
    RESOLVED: 'Please confirm task resolve',
    DISPUTE: 'Open dispute?',
    CANCELLED: 'Cancel task?',
    DONE: 'Pleace confirm that you have received the result',
  };

  const handleContractorPriceChange = event => {
    event.persist();
    setContractorPrice(event.target.value);
  };

  const doSubmit = () => {
    const params = { nextStatus };
    if (nextStatus === 'REQUESTED' && contractorPriceState !== '') {
      params.contractorPrice = contractorPriceState;
    }
    if (nextStatus !== 'REQUESTED' || contractorPriceState !== '') {
      handleConfirm(params);
    }
  };

  return (
    <Dialog open={!!nextStatus} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { confirmMessageByNextStatus[nextStatus] }
        </DialogContentText>
        { nextStatus === 'REQUESTED' &&
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            label="You price"
            name="contractorPrice"
            type="number"
            value={contractorPriceState}
            onChange={handleContractorPriceChange}
        />
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={doSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>      
  );
};
