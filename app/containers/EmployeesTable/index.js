import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  // Tooltip,
  // IconButton,
  TableCell,
  // Box,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
// import DeleteIcon from '@material-ui/icons/Delete';
import messages from '../Users/messages';
import { TableTitle } from '../TableTitle';
// import { EnhancedTableToolbarDelete } from '../Users/EnhancedTableToolbar';
import CheckboxField from '../../components/FormFields/CheckboxField';
// eslint-disable-next-line import/no-cycle
import { useStyles } from '../Users/index';
// import Notification from '../Notification';

const EmployeesTable = ({
  employees,
  // selected,
  // handleDelete,
  // deleteEmployees,
  handleClick,
  isSelected,
}) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} elevation={2} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableTitle>
                {/* {selected.length > 0 ? ( */}
                {/*  <Notification */}
                {/*    deleteFunction={deleteEmployees} */}
                {/*    selected={selected.length} */}
                {/*  > */}
                {/*    <EnhancedTableToolbarDelete numSelected={selected.length} /> */}
                {/*  </Notification> */}
                {/* ) : ( */}
                <div />
                {/* )} */}
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.employee} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.login} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.email} />
              </TableTitle>
              <TableTitle>
                <FormattedMessage {...messages.role} />
              </TableTitle>
              {/* <TableTitle> */}
              {/*  <FormattedMessage {...messages.actions} /> */}
              {/* </TableTitle> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(row => {
              const { id, firstName, lastName, email, role, login } = row;
              const fullName = [lastName, firstName].join(' ');
              const isItemSelected = isSelected(id);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell
                    padding="checkbox"
                    onClick={event => handleClick(event, id)}
                  >
                    <CheckboxField
                      className={classes.checkbox}
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{fullName}</TableCell>
                  <TableCell>{login}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{role}</TableCell>
                  {/* <TableCell> */}
                  {/*  <Box className={classes.icons}> */}
                  {/*    <Notification */}
                  {/*      deleteFunction={handleDelete} */}
                  {/*      userId={id} */}
                  {/*      name={fullName} */}
                  {/*    > */}
                  {/*      <div className={classes.iconDelete}> */}
                  {/*        <Tooltip */}
                  {/*          className={classes.icon} */}
                  {/*          title={ */}
                  {/*            <FormattedMessage {...messages.deleteTitle} /> */}
                  {/*          } */}
                  {/*        > */}
                  {/*          <IconButton aria-label="delete"> */}
                  {/*            <DeleteIcon fontSize="small" /> */}
                  {/*          </IconButton> */}
                  {/*        </Tooltip> */}
                  {/*      </div> */}
                  {/*    </Notification> */}
                  {/*  </Box> */}
                  {/* </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

EmployeesTable.propTypes = {
  employees: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  deleteEmployees: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
};

export default EmployeesTable;
