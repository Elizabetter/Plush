import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextFormField from '../../components/FormFields/TextFormField';
import { CancelButton, SaveButton } from '../../components/Buttons';
import FormActions from '../../components/FormActions';
import ResetPassword from '../ResetPssword';
import { routes } from '../../constants/routes';
const formFields = {
  password: 'password',
  login: 'login',
};
const useStyles = makeStyles(() => ({
  paperBox: {
    marginTop: 10,
    marginLeft: 0,
    display: 'flex',
  },
  button: {
    marginLeft: 50,
    color: '#483D8B',
    backgroundColor: 'white',
    border: '2px solid',
    height: 30,
    textDecoration: 'none',
    minWidth: 84,
  },
}));

const schema = Yup.object().shape({
  [formFields.password]: Yup.string()
    .min(6)
    .required(),
  [formFields.login]: Yup.string().required(),
});

const SignInForm = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const classes = useStyles();
  const sendOnlyModified = formData => {
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendOnlyModified)}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Controller
              as={TextFormField}
              control={control}
              errors={errors}
              name={formFields.login}
              label="Логин"
              required
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Controller
              as={TextFormField}
              control={control}
              errors={errors}
              name={formFields.password}
              label="Пароль"
              type="password"
              required
            />
          </Grid>
          <Grid container>
            <FormActions>
              <SaveButton>Войти</SaveButton>
            </FormActions>
          </Grid>
        </Grid>
      </form>
      <Grid container>
        <div className={classes.paperBox}>
          <ResetPassword>
            <CancelButton>Забыли пароль?</CancelButton>
          </ResetPassword>
          <Button
            className={classes.button}
            onClick={() => history.push(routes.REGISTRATION)}
          >
            Зарегистрироваться
          </Button>
        </div>
      </Grid>
    </>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
