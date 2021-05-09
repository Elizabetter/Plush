import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import merge from 'lodash/merge';
import get from 'lodash/get';
import {
  createEntityAction,
  deleteEntityAction,
  getListAction,
  getOneAction,
  getWholeListAction,
  logoutAction,
  setActiveUserAction,
  updateOneAction,
} from './actions';
import {
  create,
  deleteOne,
  getList,
  getOne,
  updateOne,
} from '../../dataProvider/API';
import { GET_ACTIVE_USER } from './constants';
import { USERS } from '../../constants/endpoints';
import storage from '../../utils/storage';

export function* createEntitySaga({ payload }) {
  const { endpoint, sagaRoutine, params, callback } = payload;
  if (endpoint === null || sagaRoutine === null) {
    throw new Error('Specify endpoint, sagaRoutine');
  }
  try {
    yield put(sagaRoutine.request());
    const data = yield call(create, endpoint, params);
    yield put(sagaRoutine.success(data));

    if (typeof callback === 'function') {
      callback(data.entity);
    }
  } catch (err) {
    yield put(sagaRoutine.failure(err.message));
  } finally {
    yield put(sagaRoutine.fulfill());
  }
}

export function* deleteOneSaga({ payload }) {
  const { endpoint, sagaRoutine, id, params, callback } = payload;
  if (endpoint === null || sagaRoutine === null || id === null) {
    throw new Error('Specify endpoint, id, sagaRoutine');
  }
  try {
    yield put(sagaRoutine.request());
    yield call(deleteOne, endpoint, id, params);
    yield put(sagaRoutine.success({ id }));
    if (typeof callback === 'function') {
      callback();
    }
  } catch (err) {
    yield put(sagaRoutine.failure(err.message));
  } finally {
    yield put(sagaRoutine.fulfill());
  }
}

export function* getListSaga({ payload }) {
  const { endpoint, sagaRoutine, params } = payload;
  if (endpoint === null || sagaRoutine === null) {
    throw new Error('Specify endpoint and sagaRoutine');
  }
  try {
    yield put(sagaRoutine.request());
    const list = yield call(getList, endpoint, params);
    yield put(sagaRoutine.success(list));
  } catch (err) {
    yield put(sagaRoutine.failure(err.message));
  } finally {
    yield put(sagaRoutine.fulfill());
  }
}

export function* getWholeListSaga({ payload }) {
  const payloadWithPagination = merge(payload, {
    params: { pagination: { page: 1, limit: 100000 } },
  });
  yield call(getListSaga, { payload: payloadWithPagination });
}

export function* getOneSaga({ payload }) {
  const { endpoint, sagaRoutine, id, params } = payload;
  if (endpoint === null || sagaRoutine === null || id === null) {
    throw new Error('Specify endpoint, id, sagaRoutine');
  }
  try {
    yield put(sagaRoutine.request());
    const data = yield call(getOne, endpoint, id, params);
    yield put(sagaRoutine.success(data));
  } catch (err) {
    yield put(sagaRoutine.failure(err.message));
  } finally {
    yield put(sagaRoutine.fulfill());
  }
}

export function* updateOneSaga({ payload }) {
  const { endpoint, sagaRoutine, id, params, callback } = payload;
  if (endpoint === null || sagaRoutine === null || id === null) {
    throw new Error('Specify endpoint, id, sagaRoutine');
  }
  try {
    yield put(sagaRoutine.request());
    const data = yield call(updateOne, endpoint, id, params);
    yield put(sagaRoutine.success(data));

    if (typeof callback === 'function') {
      callback(data.entity);
    }
  } catch (err) {
    yield put(sagaRoutine.failure(err.message));
  } finally {
    yield put(sagaRoutine.fulfill());
  }
}

export function* getActiveUserSaga({ payload }) {
  try {
    const { id, callback } = payload;
    const data = yield call(getOne, USERS, id);
    const user = get(data, 'entity');
    yield put(setActiveUserAction(user));
    if (typeof callback === 'function') {
      callback(user);
    }
  } catch (err) {
    yield put(setActiveUserAction(null));
  }
}

export function* logoutUserSaga() {
  try {
    yield put(logoutAction.request());
    yield storage.clearUserData();
    yield put(logoutAction.success());
  } catch (e) {
    yield put(logoutAction.error(e));
  }
}

export default function* appSaga() {
  yield takeEvery(createEntityAction.TRIGGER, createEntitySaga);
  yield takeEvery(deleteEntityAction.TRIGGER, deleteOneSaga);
  yield takeEvery(getListAction.TRIGGER, getListSaga);
  yield takeEvery(getOneAction.TRIGGER, getOneSaga);
  yield takeEvery(getWholeListAction.TRIGGER, getWholeListSaga);
  yield takeEvery(updateOneAction.TRIGGER, updateOneSaga);
  yield takeLatest(GET_ACTIVE_USER, getActiveUserSaga);
  yield takeLatest(logoutAction.TRIGGER, logoutUserSaga);
}
