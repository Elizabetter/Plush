import { createRoutine } from 'redux-saga-routines';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEES,
  GET_DEPARTMENT,
  GET_ALL_DEPARTMENT,
  GET_CONST_EMPLOYEES,
  GET_CONST_ALL_EMPLOYEES,
  DELETE_EMPLOYEES,
} from './constants';

export const getEmployeesAction = createRoutine(GET_EMPLOYEES);
export const getAllEmployeesAction = createRoutine(GET_ALL_EMPLOYEES);
export const getDepartmentsAction = createRoutine(GET_DEPARTMENT);
export const getAllDepartmentsAction = createRoutine(GET_ALL_DEPARTMENT);
export const getConstAllEmployeesAction = createRoutine(
  GET_CONST_ALL_EMPLOYEES,
);
export const getConstEmployeesAction = createRoutine(GET_CONST_EMPLOYEES);
export const deleteEmployeesAction = createRoutine(DELETE_EMPLOYEES);
