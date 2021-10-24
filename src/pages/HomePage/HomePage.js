import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useTheme, createStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

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
import Customization from "../../components/Customization/Customization";

import SalesView from "../../views/SalesView/SalesView";
import InventoryView from "../../views/InventoryView/InventoryView";
import HRView from "../../views/HRView/HRView";
import ManagerView from "../../views/ManagerView/ManagerView";
import PageNotFound from "../PageNotFound/PageNotFound";
import useStyles from "./styles";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
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

  const [isSidebarOpen, setSidebarOpen] = useState(!smallScreen);

  useEffect(() => {
    setSidebarOpen(!smallScreen);
  }, [smallScreen]);

  function handleToggleSidebar(open) {
    setSidebarOpen(open);
  }

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
      return <div style={{ width: drawerWidth, height: 48 }}></div>;
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
            <Typography variant="h3" noWrap className={classes.searchEngine}>
              BKRM
            </Typography>

            <Button color="primary" onClick={() => logOutHandler()}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

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
        <Box className={clsx(classes.background)}>
          <Switch>
            <Route path={`${path}/sales`} component={SalesView} />
            <Route path={`${path}/inventory`} component={InventoryView} />
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
