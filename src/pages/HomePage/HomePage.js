import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useTheme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import BranchSelectAppBar from "../../components/CheckoutComponent/BranchSelect/BranchSelectAppBar";
//import library
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

//import icons
import MenuIcon from "@material-ui/icons/Menu";

//import project
import MenuList from "../../components/MenuList/MenuList";
import SearchProduct from "../../components/SearchBar/SearchProduct";
import Customization from "../../components/Customization/Customization";
import AvatarInfo from "../../components/Button/AvatarInfo";
import SalesView from "../../views/SalesView/SalesView";
import InventoryView from "../../views/InventoryView/InventoryView";
import HRView from "../../views/HRView/HRView";
import ManagerView from "../../views/ManagerView/ManagerView";
import PageNotFound from "../PageNotFound/PageNotFound";
import useStyles from "./styles";
import { authActions } from "../../store/slice/authSlice";

import { customizeAction } from "../../store/slice/customizeSlice";

import PersonIcon from "@material-ui/icons/Person";
import DeliveryView from "../../views/DeliveryView/DeliveryView";

const drawerWidth = 240;

const HomePage = (props) => {
  const { window } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  let { path } = useRouteMatch();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const customization = useSelector((state) => state.customize);
  const infoDetail = useSelector((state) => state.info);
  const isSidebarOpen =
    customization.isSidebarOpen === null
      ? !smallScreen
      : customization.isSidebarOpen;

  useEffect(() => {
    dispatch(customizeAction.setSidebarOpen(!smallScreen));
  }, [smallScreen]);

  const handleToggleSidebar = (open) => {
    dispatch(customizeAction.setSidebarOpen(open));
  };

  const divLogo = () => {
    if (!smallScreen)
      return (
        <div
          style={{
            width: drawerWidth,
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <Typography variant="h3" style={{ marginTop: 15, marginLeft: 20 }}>
            BKRM
          </Typography>
          <div
            style={{
              width: drawerWidth,
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)}>
              <MenuIcon style={{ color: theme.customization.themeText }} />
            </IconButton>
          </div>
        </div>
      );
  };
  const _divLogo = () => {
    if (smallScreen)
      return (
        <div
          style={{
            width: drawerWidth,
            height: 48,
            marginTop: 30,
            marginLeft: -15,
          }}
        >
          <Typography variant="h3" noWrap className={classes.searchEngine}>
            BKRM
          </Typography>
        </div>
      );
  };
  const dispatch = useDispatch();
  const logOutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logOut());
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {divLogo()}
          <IconButton
            aria-label="open drawer"
            onClick={() => handleToggleSidebar(!isSidebarOpen)}
            edge="start"
            className={!smallScreen && classes.hide}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "100%" }}
          >
            {/* <Typography variant="h3" noWrap >
     
            </Typography> */}
            <Box></Box>
            {/* <SearchProduct /> */}
            
            <Box display="flex" flexDirection="row" alignItems="center">
              <BranchSelectAppBar store_uuid={infoDetail.store.uuid} />
              <IconButton color="primary" size="small">
                <PersonIcon fontSize="large" />
              </IconButton>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                style={{ maxWidth: 90, marginLeft: 10, marginRight: 5 }}
              >
                
                <Typography variant="h6">Store Owner</Typography>
                <Typography variant="h6" noWrap>
                  {infoDetail.user.name}
                </Typography>
              </Box>
              <Button color="primary" onClick={() => logOutHandler()}>
                Logout
              </Button>
              
            </Box>
            {/* <Box style={{marginRight:10}}>
              <AvatarInfo  name={infoDetail.user.name}/>
            </Box> */}
            


          </Box>
        </Toolbar>
      </AppBar>
      <Customization />
      {/* Drawer */}
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={isSidebarOpen}
        onClose={() => handleToggleSidebar(!isSidebarOpen)}
        classes={{
          paper: matchUpMd ? classes.drawerPaper : classes._drawerPaper,
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <PerfectScrollbar component="div" className={classes.scroll}>
          <Box>{_divLogo()} </Box>
          <MenuList />
        </PerfectScrollbar>
      </Drawer>

      <main
        className={clsx([classes.content], {
          [classes.contentShift]: isSidebarOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Box
          className={clsx([classes.background], {
            [classes.marginBackground]: !isSidebarOpen,
          })}
        >
          <Switch>
            <Route path={`${path}/sales`} component={SalesView} />
            <Route path={`${path}/inventory`} component={InventoryView} />
            <Route path={`${path}/delivery`} component={DeliveryView} />
            <Route path={`${path}/hr`} component={HRView} />
            <Route path={`${path}/manager`} component={ManagerView} />
            <Route path={`${path}/*`} component={PageNotFound} />
          </Switch>
        </Box>
      </main>
    </div>
  );
};
HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;
