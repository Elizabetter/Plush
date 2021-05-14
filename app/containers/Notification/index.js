import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  DialogContentText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import messages from '../Users/messages';
import { CancelButton, SaveButton } from '../../components/Buttons';

const useStyles = makeStyles(() => ({
  buttons: {
    marginRight: 17,
  },
  dialog: {
    width: 409,
  },
}));
// eslint-disable-next-line react/prop-types
function Notification({ children, deleteFunction, userId, name, selected }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpen(false);
    deleteFunction(userId);
  };

  return (
    <div>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {selected ? (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage
                {...messages.deleteQuestion}
                values={{
                  selected,
                }}
              />
            </DialogContentText>
          </DialogContent>
        ) : (
          <DialogContent className={classes.dialog}>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage
                {...messages.oneDeleteQuestion}
                values={{
                  name,
                }}
              />
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions className={classes.buttons}>
          <CancelButton onClick={handleClose}>
            <FormattedMessage {...messages.cancel} />
          </CancelButton>
          <SaveButton onClick={handleDeleteClose}>
            <FormattedMessage {...messages.deleteTitle} />
          </SaveButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Notification.propTypes = {
  name: PropTypes.string,
  deleteFunction: PropTypes.func.isRequired,
  userId: PropTypes.number,
  selected: PropTypes.number,
};

export default Notification;
