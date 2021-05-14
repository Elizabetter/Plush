import { createRoutine } from 'redux-saga-routines';
import {
  CRUD_CREATE,
  CRUD_DELETE,
  CRUD_GET_LIST,
  CRUD_GET_ONE,
  CRUD_GET_WHOLE_LIST,
  CRUD_UPDATE_ONE,
  GET_ACTIVE_USER,
  LOGIN,
  LOGOUT,
  SET_ACTIVE_USER,
  GET_MANAGERS,
  CRUD_DELETE_LIST,
} from './constants';

export const createEntityAction = createRoutine(CRUD_CREATE);
export const deleteEntityAction = createRoutine(CRUD_DELETE);
export const getListAction = createRoutine(CRUD_GET_LIST);
export const getOneAction = createRoutine(CRUD_GET_ONE);
export const deleteListAction = createRoutine(CRUD_DELETE_LIST);
export const getWholeListAction = createRoutine(CRUD_GET_WHOLE_LIST);
export const updateOneAction = createRoutine(CRUD_UPDATE_ONE);

export const loginAction = createRoutine(LOGIN);
export const logoutAction = createRoutine(LOGOUT);
export const setActiveUserAction = payload => ({
  type: SET_ACTIVE_USER,
  payload,
});

export const getActiveUserAction = payload => ({
  type: GET_ACTIVE_USER,
  payload,
});
export const getManagersAction = createRoutine(GET_MANAGERS);
