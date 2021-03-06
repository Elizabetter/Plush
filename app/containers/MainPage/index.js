import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import { routes } from '../../constants/routes';
import background from './assests/background1.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: -11,
    height: '110vh',
    backgroundImage: `url(${background})`,
  },
  paperBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    paddingTop: '2%',
    marginRight: '2%',
    display: 'flex',
  },
  button: {
    width: 100,
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  registration: {
    display: 'flex',
    marginRight: 10,
  },
  buttonRegistration: {
    width: 220,
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  buttonAds: {
    marginRight: 10,
    width: 200,
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  icons: {
    paddingLeft: 10,
  },
  flex: {
    flexGrow: 1,
  },
  search: {
    display: 'flex',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'relative',
    width: 400,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
      opacity: 0.8,
    },
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    // paddingRight: 10,
    // height: '100%',
    // position: 'absolute',
    // pointerEvents: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // marginRight: 'auto',
    // marginLeft: 'auto',
    // position: 'relative',
    // width: 10,
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: 'white',
    // '&:hover': {
    //   backgroundColor: 'white',
    //   opacity: 0.8,
    // },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  paper: {
    display: 'flex',
    marginTop: '18%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  label: {
    marginTop: theme.spacing(1),
    color: 'rgba(15,70,160,1)',
  },
  title: {
    fontWeight: 700,
    color: 'rgba(15,70,160,1)',
  },
  logotype: {
    position: 'absolute',
    bottom: 40,
  },
}));

export function MainPage() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    history.push(routes.SIGN_IN);
  };
  const [newComment, setNewComment] = React.useState('');
  const handleSearch = event => {
    setNewComment(event.target.value);
  };
  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <div className={classes.flex} />
        <div position="fixed" className={classes.registration}>
          <div>
            <Button
              className={classes.buttonAds}
              onClick={() => history.push(routes.ADS)}
            >
              ?????? ????????????????????
              <AssignmentIcon fontSize="large" className={classes.icons} />
            </Button>
          </div>
          <div className={classes.registration}>
            <Button
              className={classes.buttonRegistration}
              onClick={() => history.push(routes.REGISTRATION)}
            >
              ????????????????????????????????????
              <GroupAddIcon fontSize="large" className={classes.icons} />
            </Button>
          </div>
          <div>
            <Button className={classes.button} onClick={handleLogin}>
              ??????????
              <AccountCircleIcon fontSize="large" className={classes.icons} />
            </Button>
          </div>
        </div>
      </div>

      <div className={classes.paper}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Button onClick={() => history.push(`/ads/${newComment}`)}>
              <SearchIcon />
            </Button>
          </div>
          <InputBase
            onChange={handleSearch}
            placeholder="Search???"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
    </div>
  );
}
