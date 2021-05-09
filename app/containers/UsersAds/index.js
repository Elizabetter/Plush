import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { key } from './reducer';
import { getContractsAction } from './actions';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { selectContracts } from './selectors';
import messages from './messages';
import PageTemplate from '../PageTemplate';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#f1e4f1',
  },
  title: {
    marginTop: -20,
  },
  content: {
    marginTop: -10,
    margin: 10,
    width: '50%',
  },
  block: {
    display: 'flex',
  },
}));

export function UsersAds() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { user } = useAuthDataContext();
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      dispatch(getContractsAction({ id: user?.id }));
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const ads = useSelector(selectContracts()).content;
  const adsCards = ads ? (
    ads.map(ad => (
      <Grid item xs={12} sm={12} md={12} lg={6} key={ad.id}>
        <Card className={classes.root}>
          <div className={classes.title}>
            <h2>{ad.topic}</h2>
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
    ))
  ) : (
    <p>Нет ни одного объявления</p>
  );
  return (
    <PageTemplate header={<FormattedMessage {...messages.title} />}>
      {adsCards}
    </PageTemplate>
  );
}
