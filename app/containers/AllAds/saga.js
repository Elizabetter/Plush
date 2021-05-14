import { call, takeEvery } from 'redux-saga/effects';
import { getListSaga } from '../App/saga';
import { ADS } from '../../constants/endpoints';
import { getAdsAction } from './actions';

export function* getAdsSaga() {
  const listPayload = {
    endpoint: ADS,
    sagaRoutine: getAdsAction,
  };
  yield call(getListSaga, { payload: listPayload });
}

export default function* headerSaga() {
  yield takeEvery(getAdsAction.TRIGGER, getAdsSaga);
}
