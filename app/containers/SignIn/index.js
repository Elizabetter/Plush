import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import SignInForm from '../SigninForm';
import { SIGN_IN } from '../../constants/endpoints';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { createOne } from '../../dataProvider/API';
import CustomizedSnackbars from '../../components/Alert';
import messages from './messages';
import { alertType } from '../../constants/api';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: '#483D8B',
  },
  form: {
    width: 400,
  },
}));

export function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { onLogin } = useAuthDataContext();

  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const onEditUserFormSubmit = ({ ...data }) => {
    // const params = data;
    // const payload = {
    //   endpoint: SIGN_IN,
    //   sagaRoutine: signInAction,
    //   params,
    //   callback: () => {
    //     history.push(`/ads`);
    //   },
    // };
    // dispatch(createEntityAction(payload));
    createOne(SIGN_IN, data)
      .then(r => {
        onLogin({
          id: r.body.split(' ')[0],
          token: r.body.split(' ')[2],
        });
        setTimeout(function() {
          history.push('ads/:topic');
        }, 500);
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
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        <FormattedMessage {...messages.title} />
      </Typography>
      <div className={classes.form}>
        <SignInForm onSubmit={onEditUserFormSubmit} />
      </div>
    </div>
  );
}
