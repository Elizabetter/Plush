import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import messages from './messages';
import PageTemplate from '../PageTemplate';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { initialState, key } from './reducer';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import { selectList } from '../App/selectors';
import { selectEmployeesDomain } from './selectors';
import { deleteEmployeesAction, getEmployeesAction } from './actions';
import ListPagination from '../ListPagination';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import { USERS } from '../../constants/endpoints';
import { deleteEntityAction } from '../App/actions';
import storage from '../../utils/storage';
// eslint-disable-next-line import/no-cycle
import EmployeesTable from '../EmployeesTable';

export const useStyles = makeStyles(theme => ({
  table: {
    marginTop: 25,
    marginLeft: 5,
  },
  tableForMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: 30,
      width: '100%',
    },
  },
  paperBox: {
    position: 'relative',
    height: '150%',
  },
  emptyTable: {
    margin: 0,
    color: '#B3AAA8',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  head: {
    height: 61,
    overflow: 'none',
  },
  tableTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 0,
    paddingLeft: 5,
  },
  checkbox: {
    marginLeft: 26,
    width: 10,
  },
  option: {
    margin: theme.spacing(1),
  },
  textField: {
    paddingRight: theme.spacing(2),
  },
  search: {
    marginBottom: 10,
    display: 'block',
  },
  reset: {
    display: 'block',
  },
  icons: {
    display: 'flex',
    textAlign: 'center',
  },
  icon: {
    padding: 0,
  },
  iconDelete: {
    paddingLeft: -10,
  },
  label: {
    padding: 0,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 37,
    display: 'block',
  },
  root: {
    minWidth: 250,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    marginTop: 16,
    minWidth: 150,
    maxWidth: 200,
  },
}));

export function Users() {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const { user } = useAuthDataContext();
  const activeUser = user;
  // const history = useHistory();
  const storageToken = storage.getToken();
  activeUser.token = storageToken;

  const { data: employees, page, total } = useSelector(
    selectList(selectEmployeesDomain, initialState.employees.name),
  );

  const pagination = { limit: 10, page, total };
  const getEmployees = params => {
    dispatch(
      getEmployeesAction({
        params,
      }),
    );
  };
  useEffect(() => {
    if (user) {
      getEmployees({ ...pagination });
    }
  }, [user]);

  const deleteEmployees = () => {
    // eslint-disable-next-line array-callback-return
    selected.map(id => {
      const payload = {
        endpoint: USERS,
        sagaRoutine: deleteEmployeesAction,
        id,
        // callback: () => {
        //   getEmployees({ ...pagination });
        //   setSelected([]);
        //   window.location = `/employees`;
        // },
      };
      dispatch(deleteEntityAction(payload));
    });
  };

  const [selected, setSelected] = React.useState([]);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const isSelected = name => selected.indexOf(name) !== -1;

  const handleDelete = id => {
    const payload = {
      endpoint: USERS,
      sagaRoutine: deleteEmployeesAction,
      id,
      // callback: () => {
      //   // getEmployees({ ...pagination });
      //   // setSelected([]);
      //   // window.location = `/employees`;
      // },
    };
    dispatch(deleteEntityAction(payload));
  };
  const onChangePage = params => {
    getEmployees(params);
  };

  return (
    <PageTemplate header={<FormattedMessage {...messages.title} />}>
      <Box className={classes.table}>
        {employees.content && (
          <EmployeesTable
            employees={employees.content}
            selected={selected}
            deleteEmployees={deleteEmployees}
            isSelected={isSelected}
            handleClick={handleClick}
            handleDelete={handleDelete}
          />
        )}
      </Box>
      <ListPagination filters={pagination} fetchFunction={onChangePage} />
    </PageTemplate>
  );
}
