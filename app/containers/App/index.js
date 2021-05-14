/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer, { key } from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import EmptyPage from '../EmptyPage';
import { SignIn } from '../SignIn';
import { Registration } from '../Registration';
import { Ads } from '../AllAds';
import { CreateAd } from '../CreateAd';
import { UsersAds } from '../UsersAds';
import { Users } from '../Users';
import { MainPage } from '../MainPage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function App() {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const query = useQuery();
  const queryId = query.get('id');
  const queryToken = query.get('token');
  const { onLogin } = useAuthDataContext();

  useEffect(() => {
    if (queryToken && queryId) {
      onLogin({
        id: queryId,
        token: queryToken,
      });
    }
  }, [queryId, queryToken]);

  return (
    <div>
      <Switch>
        <Route exact path={routes.HOME}>
          <Redirect to={routes.MAIN} />
        </Route>
        <Route path={routes.HOME_PAGE} component={HomePage} />
        <Route path={routes.SIGN_IN} component={SignIn} />
        <Route path={routes.REGISTRATION} component={Registration} />
        <Route path={routes.ADS} component={Ads} />
        <Route path={routes.USERS} component={Users} />
        <Route path={routes.MAIN} component={MainPage} />
        <Route path={routes.MY_ADS} component={UsersAds} />
        <Route path={routes.CREATE_AD} component={CreateAd} />
        <Route path={routes.EMPTY_PAGE} component={EmptyPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
