import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useLocation } from 'react-router-dom';
import messages from './messages';
import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
}));

const LeftMenu = ({ window, handleDrawerToggle, mobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuthDataContext();

  const isSelected = path => pathname === path;

  const defaultLinks = (
    <>
      <Link to={routes.CREATE_AD} className={classes.link}>
        <ListItem button selected={isSelected(routes.CREATE_AD)}>
          <ListItemText primary={<FormattedMessage {...messages.create} />} />
        </ListItem>
      </Link>

      <Link to={routes.ADS} className={classes.link}>
        <ListItem button selected={isSelected(routes.ADS)}>
          <ListItemText
            primary={<FormattedMessage {...messages.agreements} />}
          />
        </ListItem>
      </Link>
      {/* {user && ( */}
      <Link to={routes.MY_ADS} className={classes.link}>
        <ListItem button selected={isSelected(routes.MY_ADS)}>
          <ListItemText primary={<FormattedMessage {...messages.usersAds} />} />
        </ListItem>
      </Link>
      {/* )} */}
    </>
  );

  const drawer = (
    <div className={classes.drawerContainer}>
      <Toolbar>
        <Typography component="h6" variant="h6">
          <FormattedMessage {...messages.title} />
        </Typography>
      </Toolbar>
      <Divider />
      {defaultLinks}
      {/* <Divider /> */}
      {/* <List> */}
      {/*  <ListItem button> */}
      {/*    <ListItemText */}
      {/*      primary={<FormattedMessage {...messages.logout} />} */}
      {/*      onClick={handleLogout} */}
      {/*    /> */}
      {/*  </ListItem> */}
      {/* </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="menu">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClick={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

LeftMenu.propTypes = {
  window: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
  mobileOpen: PropTypes.bool,
};

export default LeftMenu;
