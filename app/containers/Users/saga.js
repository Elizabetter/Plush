import { call, takeEvery } from 'redux-saga/effects';
import { getListSaga } from '../App/saga';
// eslint-disable-next-line import/named,no-unused-vars
import { DEPARTMENTS, USERS } from '../../constants/endpoints';
import {
  // getAllEmployeesAction,
  getEmployeesAction,
  // getDepartmentsAction,
  // getAllDepartmentsAction,
  // getConstAllEmployeesAction,
  // getConstEmployeesAction,
} from './actions';

export function* getEmployeesSaga({ payload }) {
  const { params } = payload;
  const listPayload = {
    endpoint: USERS,
    sagaRoutine: getEmployeesAction,
    params: { params },
  };
  yield call(getListSaga, { payload: listPayload });
}
//
// export function* getAllEmployeesSaga({ payload }) {
//   const { params } = payload;
//   const listPayload = {
//     endpoint: USERS,
//     sagaRoutine: getAllEmployeesAction,
//     params: { params },
//   };
//   yield call(getListSaga, { payload: listPayload });
// }
// export function* getConstEmployeesSaga() {
//   const listPayload = {
//     endpoint: USERS,
//     sagaRoutine: getConstEmployeesAction,
//   };
//   yield call(getListSaga, { payload: listPayload });
// }
//
// export function* getConstAllEmployeesSaga({ payload }) {
//   const { params } = payload;
//   const listPayload = {
//     endpoint: USERS,
//     sagaRoutine: getConstAllEmployeesAction,
//     params: { params },
//   };
//   yield call(getListSaga, { payload: listPayload });
// }
//
// export function* getDepartmentsSaga({ payload }) {
//   const { params } = payload;
//   const listPayload = {
//     endpoint: DEPARTMENTS,
//     sagaRoutine: getDepartmentsAction,
//     params: { params },
//   };
//   yield call(getListSaga, { payload: listPayload });
// }
//
// export function* getAllDepartmentsSaga({ payload }) {
//   const { params } = payload;
//   const listPayload = {
//     endpoint: DEPARTMENTS,
//     sagaRoutine: getAllDepartmentsAction,
//     params: { params },
//   };
//   yield call(getListSaga, { payload: listPayload });
// }

export default function* headerSaga() {
  yield takeEvery(getEmployeesAction.TRIGGER, getEmployeesSaga);
  // yield takeEvery(getAllEmployeesAction.TRIGGER, getAllEmployeesSaga);
  // yield takeEvery(getConstAllEmployeesAction.TRIGGER, getConstAllEmployeesSaga);
  // yield takeEvery(getConstEmployeesAction.TRIGGER, getConstEmployeesSaga);
  // yield takeEvery(getDepartmentsAction.TRIGGER, getDepartmentsSaga);
  // yield takeEvery(getAllDepartmentsAction.TRIGGER, getAllDepartmentsSaga);
}
