import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
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
import EditEmployee from "../../views/HRView/Employee/AddEmployee/EditEmployee"

import { customizeAction } from "../../store/slice/customizeSlice";

import PersonIcon from "@material-ui/icons/Person";
import { Notifications } from "@material-ui/icons";
import DeliveryView from "../../views/DeliveryView/DeliveryView";
import branchApi from "../../api/branchApi"
import { infoActions } from "../../store/slice/infoSlice";
import storeApi from "../../api/storeApi";
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
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const customization = useSelector((state) => state.customize);
  const infoDetail = useSelector((state) => state.info);
  const isSidebarOpen =
    customization.isSidebarOpen === null
      ? !smallScreen
      : customization.isSidebarOpen;

  const roleUser = infoDetail.role === "owner" ? "Chủ cửa hàng" : "Nhân viên"

  const permissions = useSelector((state) => state.info.user.permissions);

  useEffect(() => {
    dispatch(customizeAction.setSidebarOpen(!smallScreen));
  }, [smallScreen, permissions]);

  const handleToggleSidebar = (open) => {
    dispatch(customizeAction.setSidebarOpen(open));
  };



  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid
  const branch_uuid = info.branch.uuid

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
            // height: 48,
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
    dispatch(authActions.logOut());
    localStorage.removeItem("token");
    sessionStorage.removeItem("BKRMprev");
    sessionStorage.removeItem("BKRMopening");

  };

  const getNotification = async () => {
    try {
      if (store_uuid && branch_uuid) {
        const res = await storeApi.getNotification(store_uuid, branch_uuid);
        alert(JSON.stringify(res.data))
      }
    } catch(err) {
      console.log(err)
    }
  }

  const [openUserInfo, setOpenUserInfo] = useState(false)
  return (
    <div className={classes.root}>
      {openUserInfo && <EditEmployee open={openUserInfo} handleClose = {() =>setOpenUserInfo(false)} employee ={infoDetail.user} fromAvatar={true}/>}
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
              <IconButton color="primary" size="small" onClick={() => { setOpenUserInfo(true); }} >
                <PersonIcon fontSize="large" />
              </IconButton>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                style={{ width: 200, marginLeft: 10, marginRight: 5 }}
              >
                <Typography variant="h6" style={{ fontWeight: 700, fontSize: 13 }}>{roleUser}</Typography>
                <Typography variant="h6" noWrap>
                  {infoDetail.user.name}
                </Typography>
              </Box>

              <IconButton color="primary" onClick={getNotification} >
                <Notifications />
              </IconButton>

              <Button color="primary" onClick={() => logOutHandler()}>
                Đăng xuất
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
      // style={{height:30}}
      >
        {_divLogo()}
        {/* <PerfectScrollbar component="div" className={classes.scroll}> */}

        <MenuList permissions={permissions} />
        {/* <div>hello</div> */}
        {/* </PerfectScrollbar> */}
      </Drawer>

      <main
        className={clsx([classes.content], {
          [classes.contentShift]: isSidebarOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Box
          className={!xsScreen ? clsx([classes.background], {
            [classes.marginBackground]: !isSidebarOpen,
          }) :
            clsx([classes.backgroundMini], {
              [classes.marginBackground]: false,
            })
          }
        >
          
          <Switch>
            {permissions?.find((p) => p.name === "sales") && (
              <Route path={`${path}/sales`} component={SalesView} />
            )}
            {permissions?.find((p) => p.name === "inventory") && (
              <Route path={`${path}/inventory`} component={InventoryView} />
            )}
            {permissions?.find((p) => p.name === "employee") && (
              <Route path={`${path}/hr`} component={HRView} />
            )}
            {/* <Route path={`${path}/delivery`} component={DeliveryView} /> */}
            {permissions?.find((p) => p.name === "report") && (
              <Route path={`${path}/manager`} component={ManagerView} />
            )}
            <Route path={`${path}/`} >
              {/* only redirect whenever permissions is successfully loaded => length at least = 1 */}
              {permissions?.length > 0 ?
                (<Redirect to={permissions?.find((p) => p.name === "sales") ? `${path}/sales` : permissions?.find((p) => p.name === "inventory") ? `${path}/inventory` : permissions?.find((p) => p.name === "employee") ? `${path}/hr` : `${path}/manager`} />) : null}
            </Route>
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
