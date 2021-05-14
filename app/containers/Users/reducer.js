import produce from 'immer';
import {
  genericReducer,
  namedListParams,
} from '../../dataProvider/routineUtils';
import {
  getEmployeesAction,
  getAllEmployeesAction,
  getDepartmentsAction,
  getAllDepartmentsAction,
  deleteEmployeesAction,
  getConstAllEmployeesAction,
  getConstEmployeesAction,
} from './actions';

export const key = 'Employees';

export const initialState = {
  employees: namedListParams('employees'),
  allEmployees: namedListParams('allEmployees'),
  departments: namedListParams('departments'),
  allDepartments: namedListParams('allDepartments'),
  constEmployees: namedListParams('constEmployees'),
  constAllEmployees: namedListParams('constAllEmployees'),
  deleteEmployees: namedListParams('deleteEmployees'),
};

const employeesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case getEmployeesAction.REQUEST:
      case getEmployeesAction.SUCCESS:
      case getEmployeesAction.FAILURE:
        genericReducer(state, draft, action, initialState.employees.name);
        break;
      case getAllEmployeesAction.REQUEST:
      case getAllEmployeesAction.SUCCESS:
      case getAllEmployeesAction.FAILURE:
        genericReducer(state, draft, action, initialState.allEmployees.name);
        break;
      case getDepartmentsAction.REQUEST:
      case getDepartmentsAction.SUCCESS:
      case getDepartmentsAction.FAILURE:
        genericReducer(state, draft, action, initialState.departments.name);
        break;
      case getAllDepartmentsAction.REQUEST:
      case getAllDepartmentsAction.SUCCESS:
      case getAllDepartmentsAction.FAILURE:
        genericReducer(state, draft, action, initialState.allDepartments.name);
        break;
      case deleteEmployeesAction.REQUEST:
      case deleteEmployeesAction.SUCCESS:
      case deleteEmployeesAction.FAILURE:
        genericReducer(state, draft, action, initialState.deleteEmployees.name);
        break;
      case getConstAllEmployeesAction.REQUEST:
      case getConstAllEmployeesAction.SUCCESS:
      case getConstAllEmployeesAction.FAILURE:
        genericReducer(
          state,
          draft,
          action,
          initialState.constAllEmployees.name,
        );
        break;
      case getConstEmployeesAction.REQUEST:
      case getConstEmployeesAction.SUCCESS:
      case getConstEmployeesAction.FAILURE:
        genericReducer(state, draft, action, initialState.constEmployees.name);
        break;
      default:
        break;
    }
  });

export default employeesReducer;
