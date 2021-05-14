import { makeStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  tableTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 11,
    padding: -1,
    height: 60,
  },
}));

// eslint-disable-next-line react/prop-types
export function TableTitle({ children }) {
  const classes = useStyles();
  return <TableCell className={classes.tableTitle}>{children}</TableCell>;
}
