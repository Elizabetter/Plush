import React, { useEffect } from 'react';
import { Dialog, DialogContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from '../../components/Buttons';
import TextFormField from '../../components/FormFields/TextFormField';
import FormActions from '../../components/FormActions';
import { create } from '../../dataProvider/API';
import { CHANGE_PASSWORD } from '../../constants/endpoints';
import storage from '../../utils/storage';

const useStyles = makeStyles(() => ({
  buttons: {
    marginRight: 17,
  },
  dialog: {
    width: 409,
  },
  error: {
    marginLeft: 10,
    color: 'red',
    fontSize: 13,
  },
}));

const formFields = {
  oldPassword: 'oldPassword',
  newPassword: 'newPassword',
  matchingNewPassword: 'matchingNewPassword',
};

const schema = Yup.object().shape({
  [formFields.oldPassword]: Yup.string()
    .min(6)
    .required(),
  [formFields.newPassword]: Yup.string()
    .min(6)
    .required(),
  [formFields.matchingNewPassword]: Yup.string()
    .min(6)
    .required(),
});

// eslint-disable-next-line react/prop-types
function ChangePassword({ children }) {
  const { control, errors, formState, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const token = storage.getToken();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleDeleteClose = () => {
  //   setOpen(false);
  //   deleteFunction(userId);
  // };
  const onSubmit = ({ ...data }) => {
    const { oldPassword, newPassword, matchingNewPassword } = data;
    const params = {
      oldPassword,
      newPassword,
      matchingNewPassword,
      token,
    };
    create(CHANGE_PASSWORD, params)
      // eslint-disable-next-line no-unused-vars
      .then(r => {
        handleClose();
        // setShowSuccessAlert(true);
        // setTimeout(function() {
        //   history.push(`/sign_in`);
        // }, 6000);
      });
    // // eslint-disable-next-line no-unused-vars
    // .catch(r => {
    //   setShowErrorAlert(true);
    //   setTimeout(function() {
    //     setShowErrorAlert(false);
    //   }, 5000);
    // });
  };

  const sendOnlyModified = formData => {
    const { dirtyFields } = formState;
    const modifiedFields = Object.fromEntries(
      Object.keys(dirtyFields).map(dirtyFieldKey => [
        dirtyFieldKey,
        formData[dirtyFieldKey],
      ]),
    );
    onSubmit(modifiedFields);
  };

  const [matchingPasswordDisable, setMatchingPasswordDisable] = React.useState(
    true,
  );
  const passwordWatch = watch(formFields.newPassword);
  const matchingPasswordWatch = watch(formFields.matchingNewPassword);
  useEffect(() => {
    const { dirtyFields } = formState;
    const check = passwordWatch === matchingPasswordWatch;
    if (
      dirtyFields[formFields.newPassword] &&
      dirtyFields[formFields.matchingNewPassword] &&
      check
    ) {
      setMatchingPasswordDisable(true);
    }
    if (
      dirtyFields[formFields.newPassword] &&
      dirtyFields[formFields.matchingNewPassword] &&
      !check
    ) {
      setMatchingPasswordDisable(false);
    }
  }, [passwordWatch, matchingPasswordWatch]);

  return (
    <div>
      <Box onClick={handleClickOpen}>{children}</Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <form noValidate onSubmit={handleSubmit(sendOnlyModified)}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Controller
                  as={TextFormField}
                  control={control}
                  errors={errors}
                  type="password"
                  name={formFields.oldPassword}
                  label="Старый пароль"
                  required
                />

                <Grid item xs={12} md={12}>
                  <Controller
                    as={TextFormField}
                    control={control}
                    errors={errors}
                    name={formFields.newPassword}
                    label="Пароль"
                    type="password"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Controller
                    as={TextFormField}
                    control={control}
                    errors={errors}
                    type="password"
                    name={formFields.matchingNewPassword}
                    label="Подтверждение пароля"
                    required
                  />
                  {!matchingPasswordDisable && (
                    <div className={classes.error}>password does not match</div>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <FormActions>
                  <SaveButton />
                </FormActions>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        {/* <DialogActions className={classes.buttons}> */}
        {/*  <CancelButton onClick={handleClose}> */}
        {/*    <FormattedMessage {...messages.cancel} /> */}
        {/*  </CancelButton> */}
        {/*  <SaveButton onClick={handleClose}> */}
        {/*    <FormattedMessage {...messages.deleteTitle} /> */}
        {/*  </SaveButton> */}
        {/* </DialogActions> */}
      </Dialog>
    </div>
  );
}
//
// ChangePassword.propTypes = {
//   name: PropTypes.string,
//   deleteFunction: PropTypes.func.isRequired,
//   userId: PropTypes.number,
//   selected: PropTypes.number,
// };

export default ChangePassword;
