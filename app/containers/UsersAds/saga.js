import { call, takeEvery } from 'redux-saga/effects';
import { getListSaga } from '../App/saga';
import { USERS_ADS } from '../../constants/endpoints';
import { getContractsAction } from './actions';

export function* getContractsSaga({ payload }) {
  const { id } = payload;
  const listPayload = {
    endpoint: USERS_ADS(id),
    sagaRoutine: getContractsAction,
  };
  yield call(getListSaga, { payload: listPayload });
}

export default function* headerSaga() {
  yield takeEvery(getContractsAction.TRIGGER, getContractsSaga);
}
