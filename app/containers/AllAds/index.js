import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PageTemplate from '../PageTemplate';
import { getAdsAction } from './actions';
import { selectAds } from './selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { key } from './reducer';
import AdCard from '../../components/AdCard';

const useStyles = makeStyles(() => ({
  // paperBox: {
  //   marginRight: 30,
  //   display: 'flex',
  // },
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

export function Ads(props) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const topic = props?.match.params.topic;

  const getAllAds = params => {
    dispatch(
      getAdsAction({
        params,
      }),
    );
  };

  useEffect(() => {
    if (topic === ':topic') {
      getAllAds();
    }
  }, []);

  useEffect(() => {
    if (topic !== ':topic') {
      getAllAds({ topic });
    }
  }, [topic]);

  const ads = useSelector(selectAds()).content;
  const adsCards = ads ? (
    ads.map(ad => <AdCard ad={ad} />)
  ) : (
    <p>Нет ни одного объявления</p>
  );
  return (
    <PageTemplate header="Все объявления">
      <div className={classes.paperBox}>{adsCards}</div>
    </PageTemplate>
  );
}
