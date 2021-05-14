import { createSelector } from 'reselect';
import { initialState, key } from './reducer';
import { selectListData } from '../App/selectors';

const selectMainContentDomain = state => state[key] || initialState;

const selectAds = () =>
  createSelector(
    selectListData(selectMainContentDomain, initialState.ads.name),
    data => data,
  );

export { selectMainContentDomain, selectAds };
