import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import genericMessages from '../../containers/App/messages';

const useStyles = makeStyles(() => ({
  save: {
    color: 'white',
    backgroundColor: '#483D8B',
    height: 30,
    textDecoration: 'none',
    minWidth: 84,
    '&:hover': {
      backgroundColor: '#483D8B',
    },
  },
  saveDisabled: {
    color: 'white',
    backgroundColor: '#D3D3D3',
    height: 30,
    textDecoration: 'none',
    minWidth: 84,
    '&:hover': {
      backgroundColor: '#9B59B6 ',
    },
  },
  cancel: {
    color: '#483D8B',
    backgroundColor: 'white',
    border: '2px solid',
    height: 30,
    textDecoration: 'none',
    minWidth: 84,
  },
  whiteText: {
    color: 'white',
    backgroundColor: '#9B59B6 ',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#9B59B6 ',
    },
  },
}));

// eslint-disable-next-line react/prop-types
export const PrimaryButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button className={classes.whiteText} {...props}>
      {children || <FormattedMessage {...genericMessages.save} />}
    </Button>
  );
};

// eslint-disable-next-line react/prop-types
export const SaveButton = ({ children, ...props }) => {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { disabled } = props;
  return (
    <Button
      className={disabled ? classes.saveDisabled : classes.save}
      type="submit"
      {...props}
    >
      {children || <FormattedMessage {...genericMessages.save} />}
    </Button>
  );
};

// eslint-disable-next-line react/prop-types
export const CancelButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button className={classes.cancel} {...props}>
      {children || <FormattedMessage {...genericMessages.cancel} />}
    </Button>
  );
};
