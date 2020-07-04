import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import PendingProducts from "../PendingProducts/PendingProducts";
import PendingProductDetail from "../PendingProducts/PendingProductDetail/PendingProductDetail";
import { Route } from "react-router-dom";
import Categories from './Categories/categories';
import AddCategory from './Categories/Add-Category/AddCategory';
import Axios from 'axios';
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { Snackbar, SnackbarContent } from "@material-ui/core";

const cookies = new Cookies();


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{ margin: "auto 24px" }}>
      {'Copyright © '}
      <Link color="inherit" href="https://engagenreap.com/">
        Enr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = (props) => {
  //states
  const [loginSnack, setLoginSnack] = useState({
    show: true
  })
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })
  const [open, setOpen] = React.useState(true);
  const [revenue, setRevenue] = useState({
    revenue: null
  })
  const [orders, setOrders] = useState({
    orders: null
  })


  //state Handlers
  const snackbarClose = (event) => {
    setSnack({
      show: false
    })
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  //consts
  const classes = useStyles();
  const token = cookies.get("Token");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //redirects nullified for now
  let redirect = null;
  if (!token && !(props.location.state && props.location.state.justLoggedIn) && false) {
    redirect = <Redirect to={{
      pathname: '/login',
      state: { message: null }
    }}
    />;
  }

  //Snacks
  if (loginSnack.show) {
    setLoginSnack({
      show: false
    })
    setSnack({
      show: true,
      message: "Logged In",
      color: "Green"
    })
  }

  //data from orders
  useEffect(() => {
    Axios.get("https://limitless-lowlands-36879.herokuapp.com/orders", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(response => {
        setRevenue({
          revenue: response.data.revenue
        })
        setOrders({
          orders: [...response.data.orders]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className={classes.root}>
      {redirect}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={4000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}
      >
        <SnackbarContent style={{
          backgroundColor: snack.color,
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" display="inline" variant="h6" color="inherit" noWrap className={classes.title}>
            Enr Consultancies
          </Typography>
          <Typography component="h1" align="right" display="inline" variant="h6" color="inherit" noWrap className={classes.title}>
            {/* <Button variant="contained" color="primary">
                Add Category
              </Button> */}
            <AddCategory />
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          {/* main-dashboard */}
          <Route path="/dashboard" exact>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits revenue={revenue.revenue} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders orders={orders.orders} />
                </Paper>
              </Grid>
              <Grid container spacing={3}>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Grid>
            </Grid>
          </Route>
          {/* pending-products */}
          <Route path="/dashboard/pending-products" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <PendingProducts />
              </Paper>
            </Grid>
          </Route>

          {/* Pending Product Details */}
          <Route path="/dashboard/pending-product/:id" exact component={PendingProductDetail}>
          </Route>

          {/* categories section */}
          <Route path="/dashboard/categories" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Categories />
              </Paper>
            </Grid>
          </Route>

          {/* Add category section */}
          <Route path="/dashboard/add-categories" exact>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <AddCategory /> */}
              </Paper>
            </Grid>
          </Route>

        </Container>
      </main>
    </div>
  );
}

export default Dashboard;