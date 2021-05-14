import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from '../PageTemplate';
import { getAdsAction } from './actions';
import { selectAds } from './selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { key } from './reducer';
import AdCard from '../../components/AdCard';

export function Ads(props) {
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
  return <PageTemplate header="Все объявления">{adsCards}</PageTemplate>;
}
