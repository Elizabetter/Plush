import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { alertType } from '../../constants/api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// eslint-disable-next-line react/prop-types
function CustomizedSnackbars({ message, status }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const situationAlert = type => {
    let result = {};
    switch (type) {
      case alertType.ERROR:
        result = (
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        );
        break;
      case alertType.SUCCESS:
        result = (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        );
        break;
      case alertType.WARNING:
        result = (
          <Alert onClose={handleClose} severity="warning">
            {message}
          </Alert>
        );
        break;
      default:
        result = (
          <Alert onClose={handleClose} severity="error">
            <p>error</p>
          </Alert>
        );
        break;
    }
    return result;
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {situationAlert(status)}
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  message: PropTypes.node,
  status: PropTypes.string,
};

export default CustomizedSnackbars;
