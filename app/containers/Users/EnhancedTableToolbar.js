import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import messages from './messages';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    margin: -20,
  },
  highlight: {
    color: theme.palette.secondary.main,
  },
  icons: {
    display: 'flex',
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  delete: {
    marginLeft: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5,
    },
  },
}));

export const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, search, reset, setFiltration } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Box className={classes.icons}>
        <Tooltip
          title={<FormattedMessage {...messages.filterList} />}
          onClick={() => {
            search();
            setFiltration(false);
          }}
        >
          <IconButton aria-label="filter list">
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<FormattedMessage {...messages.resetFilter} />}
          onClick={() => reset()}
        >
          <IconButton aria-label="reset filter">
            <RotateLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

export const EnhancedTableToolbarDelete = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Tooltip
          className={classes.delete}
          title={<FormattedMessage {...messages.deleteTitle} />}
        >
          <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  search: PropTypes.func,
  reset: PropTypes.func,
  setFiltration: PropTypes.func,
};

EnhancedTableToolbarDelete.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
