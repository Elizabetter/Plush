import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import ChangePassword from '../ChangePassword';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#3f51b5',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#FFFAF0\t',
    flexGrow: 1,
  },
  image: {
    height: 30,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      marginTop: 5,
    },
  },
  submit: {
    margin: 5,
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Header = ({ handleToggle }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, onLogout } = useAuthDataContext();
  const activeUser = user;
  const history = useHistory();

  let fullName = ' ';
  // eslint-disable-next-line no-unused-expressions

  if (activeUser) {
    // eslint-disable-next-line no-shadow
    const { firstName, lastName } = activeUser;
    fullName = [firstName, lastName].join(' ');
  }
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    history.push(routes.SIGN_IN);
  };

  const handleLogin = () => {
    history.push(routes.SIGN_IN);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <div className={classes.title}>
            <Typography variant="h4" component="h1" gutterBottom>
              Plushkin
            </Typography>
          </div>
          {activeUser ? (
            <div>
              {fullName}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={fullName}
                  // src={picture}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <ChangePassword>
                  <MenuItem>Сменить пароль</MenuItem>
                </ChangePassword>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogin}>Войти</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};

export default Header;
