import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import RegistrationForm from '../RegistrationForm';
import { REGISTRATION } from '../../constants/endpoints';
import { create } from '../../dataProvider/API';
import messages from './messages';
import CustomizedSnackbars from '../../components/Alert';
import { alertType } from '../../constants/api';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: 400,
  },
}));

export function Registration() {
  const classes = useStyles();
  const history = useHistory();

  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const onEditUserFormSubmit = ({ ...data }) => {
    // const params = data;
    // const payload = {
    //   endpoint: REGISTRATION,
    //   sagaRoutine: registrationAction,
    //   params,
    //   callback: () => {
    //     history.push(`/sign_in`);
    //   },
    // };
    // dispatch(createEntityAction(payload));
    create(REGISTRATION, data)
      // eslint-disable-next-line no-unused-vars
      .then(r => {
        setShowSuccessAlert(true);
        setTimeout(function() {
          history.push(`/sign_in`);
        }, 6000);
      })
      // eslint-disable-next-line no-unused-vars
      .catch(r => {
        setShowErrorAlert(true);
        setTimeout(function() {
          setShowErrorAlert(false);
        }, 5000);
      });
  };

  return (
    <div className={classes.paper}>
      {showErrorAlert && (
        <CustomizedSnackbars
          message={<FormattedMessage {...messages.errorAlert} />}
          status={alertType.ERROR}
        />
      )}
      {showSuccessAlert && <CustomizedSnackbars status={alertType.SUCCESS} />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <div className={classes.form}>
        <RegistrationForm onSubmit={onEditUserFormSubmit} />
      </div>
    </div>
  );
}
