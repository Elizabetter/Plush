import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
}));

const ListPagination = ({
  filters,
  fetchFunction,
  onPageUpdate = () => {},
}) => {
  const classes = useStyles();
  const count = Math.ceil(filters.total / filters.limit);
  const handleChange = (event, value) => {
    fetchFunction({ limit: filters.limit, page: value });
    onPageUpdate(value);
  };

  const isEmpty = !filters.total;

  if (isEmpty) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={filters.page}
        color="primary"
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

ListPagination.propTypes = {
  fetchFunction: PropTypes.func,
  filters: PropTypes.shape({
    limit: PropTypes.number,
    page: PropTypes.number,
    total: PropTypes.number,
  }),
  onPageUpdate: PropTypes.func,
};

ListPagination.defaultProps = {
  fetchFunction: () => {},
  filters: {
    limit: 10,
    page: 1,
    total: 0,
  },
};

export default ListPagination;
