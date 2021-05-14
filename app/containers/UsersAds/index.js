import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { key } from './reducer';
import { getContractsAction } from './actions';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { selectContracts } from './selectors';
import messages from './messages';
import PageTemplate from '../PageTemplate';
import AdCard from '../../components/AdCard';

export function UsersAds() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { user } = useAuthDataContext();

  useEffect(() => {
    if (user) {
      dispatch(getContractsAction({ id: user?.id }));
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const ads = useSelector(selectContracts()).content;
  const adsCards = ads ? (
    ads.map(ad => <AdCard ad={ad} isUser />)
  ) : (
    <p>Нет ни одного объявления</p>
  );
  return (
    <PageTemplate header={<FormattedMessage {...messages.title} />}>
      {adsCards}
    </PageTemplate>
  );
}
