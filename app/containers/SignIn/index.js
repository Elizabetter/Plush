import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SignInForm from '../SigninForm';
import { SIGN_IN } from '../../constants/endpoints';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { createOne } from '../../dataProvider/API';

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

export function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { onLogin } = useAuthDataContext();

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
      .then(r =>
        // console.log(r),
        onLogin({
          id: r.body.split(' ')[0],
          token: r.body.split(' ')[2],
        }),
      )
      .then(history.push(`/ads`));
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вход
      </Typography>
      <div className={classes.form}>
        <SignInForm onSubmit={onEditUserFormSubmit} />
      </div>
    </div>
  );
}