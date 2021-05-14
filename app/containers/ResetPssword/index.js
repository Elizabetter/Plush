import React from 'react';
import { Dialog, DialogContent, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SaveButton } from '../../components/Buttons';
import TextFormField from '../../components/FormFields/TextFormField';
import FormActions from '../../components/FormActions';
import { resetPassword } from '../../dataProvider/API';

const formFields = {
  login: 'login',
};

const schema = Yup.object().shape({
  [formFields.login]: Yup.string().required(),
});

// eslint-disable-next-line react/prop-types
function ResetPassword({ children }) {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
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
    const { login } = data;
    resetPassword(`user/resetPassword`, { login })
      // eslint-disable-next-line no-unused-vars
      .then(r => {
        handleClose();
      });
  };

  // const sendOnlyModified = formData => {
  //   const { dirtyFields } = formState;
  //   const modifiedFields = Object.fromEntries(
  //     Object.keys(dirtyFields).map(dirtyFieldKey => [
  //       dirtyFieldKey,
  //       formData[dirtyFieldKey],
  //     ]),
  //   );
  //   onSubmit(modifiedFields);
  // };

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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
              <Grid container>
                <FormActions>
                  <SaveButton />
                </FormActions>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResetPassword;
