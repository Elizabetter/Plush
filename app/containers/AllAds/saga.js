import { call, takeEvery } from 'redux-saga/effects';
import { getListSaga } from '../App/saga';
import { ADS } from '../../constants/endpoints';
import { getAdsAction } from './actions';

export function* getAdsSaga({ payload }) {
  const { params } = payload;
  console.log(params);
  const listPayload = {
    endpoint: ADS,
    sagaRoutine: getAdsAction,
    params: { params },
  };
  yield call(getListSaga, { payload: listPayload });
}

export default function* headerSaga() {
  yield takeEvery(getAdsAction.TRIGGER, getAdsSaga);
}
