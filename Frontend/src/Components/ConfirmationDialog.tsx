import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Confirm, Modal } from 'semantic-ui-react';

export const ConfirmDialog = (props:any) => {
  const handleClose = () => props.setOpen(false);
  const handleConfirm = () => {
    props.onConfirm();
    props.setOpen(false);
  };

  return (
    <Modal open={props.open} onClose={handleClose} size='mini'>
      <Modal.Header>Confirmation</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to proceed?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleClose}>
          Cancel
        </Button>
        <Button positive onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};