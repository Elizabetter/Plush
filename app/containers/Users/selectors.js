import { createSelector } from 'reselect';
import { initialState, key } from './reducer';
import { selectListData } from '../App/selectors';

export const selectEmployeesDomain = state => state[key] || initialState;

const selectDepartments = () =>
  createSelector(
    selectListData(selectEmployeesDomain, initialState.departments.name),
    data => data,
  );

const selectConstAllEmployees = () =>
  createSelector(
    selectListData(selectEmployeesDomain, initialState.constAllEmployees.name),
    data => data,
  );

export { selectDepartments, selectConstAllEmployees };
