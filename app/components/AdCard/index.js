import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { roleTypes } from '../../constants/api';
import { ADS } from '../../constants/endpoints';
import { deleteEmployeesAction } from '../../containers/Users/actions';
import { deleteEntityAction } from '../../containers/App/actions';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#3f51b5',
  },
  title: {
    marginTop: -20,
    color: 'white',
    display: 'flex',
  },
  content: {
    color: 'white',
    marginTop: -10,
    margin: 10,
    width: '50%',
  },
  delete: {
    marginTop: 20,
    color: 'white',
    height: 30,
    marginLeft: 15,
  },
  icon: {
    marginTop: -4,
    marginLeft: -10,
    color: 'white',
  },
  block: {
    display: 'flex',
  },
}));

function AdCard({ ad }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useAuthDataContext();
  let role;
  if (user) {
    // eslint-disable-next-line prefer-destructuring
    role = user.role;
  } else {
    role = 'EMPTY';
  }
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} key={ad.id}>
      <Card className={classes.root}>
        <div className={classes.title}>
          <h2>{ad.topic}</h2>
          {role === roleTypes.ADMIN && (
            <Button
              className={classes.delete}
              onClick={() =>
                dispatch(
                  deleteEntityAction({
                    endpoint: ADS,
                    sagaRoutine: deleteEmployeesAction,
                    id: ad.id,
                  }),
                )
              }
            >
              Удалить объявление
            </Button>
          )}
        </div>
        <div className={classes.block}>
          <div className={classes.content}>
            <b>Описание:</b> {ad.content}
            <br />
            <b>Город:</b> {ad.city}
          </div>
          <div className={classes.content}>
            <b>Номер телефона:</b> {ad.phoneNumber}
            <br />
            <b>Цена:</b> {ad.price} бел.руб.
          </div>
        </div>
      </Card>
    </Grid>
  );
}

AdCard.propTypes = {
  ad: PropTypes.object,
};

export default AdCard;
