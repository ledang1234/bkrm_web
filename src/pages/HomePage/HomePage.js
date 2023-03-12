import React, { useState, useEffect, Suspense } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useTheme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import BranchSelectAppBar from "../../components/CheckoutComponent/BranchSelect/BranchSelectAppBar";
import QrScanner from "../../components/QRScanner/QRScanner";
import { Modal } from "antd";
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
import {CameraAlt} from "@material-ui/icons"
import {Spin} from 'antd'
//import project
import MenuList from "../../components/MenuList/MenuList";
import SearchProduct from "../../components/SearchBar/SearchProduct";
import Customization from "../../components/Customization/Customization";
import AvatarInfo from "../../components/Button/AvatarInfo";
// import SalesView from "../../views/SalesView/SalesView";
// import InventoryView from "../../views/InventoryView/InventoryView";
// import HRView from "../../views/HRView/HRView";
// import ManagerView from "../../views/ManagerView/ManagerView";
import PageNotFound from "../PageNotFound/PageNotFound";
import useStyles from "./styles";
import { authActions } from "../../store/slice/authSlice";
import EditEmployee from "../../views/HRView/Employee/AddEmployee/EditEmployee"

import { customizeAction } from "../../store/slice/customizeSlice";

import PersonIcon from "@material-ui/icons/Person";
import { Notifications } from "@material-ui/icons";
// import DeliveryView from "../../views/DeliveryView/DeliveryView";
import branchApi from "../../api/branchApi"
import { infoActions } from "../../store/slice/infoSlice";
import storeApi from "../../api/storeApi";
import scheduleApi from "../../api/scheduleApi";
import Notification from "../../components/Notification/Notification";
import { verifyToken } from "../../store/actionCreator";
import { set } from "date-fns";
// import ManualView from "../../views/ManualView/ManualView";

const ManagerView = React.lazy(() => import("../../views/ManagerView/ManagerView"))
const InventoryView = React.lazy(() => import("../../views/InventoryView/InventoryView"))
const HRView = React.lazy(() => import("../../views/HRView/HRView"))
const SalesView = React.lazy(() => import("../../views/SalesView/SalesView"))
const DeliveryView = React.lazy(() => import("../../views/DeliveryView/DeliveryView"))
const ManualView = React.lazy(() => import("../../views/ManualView/ManualView"))

// import ManagerView from '../../views/ManagerView/ManagerView';
// import InventoryView from "../../views/InventoryView/InventoryView"
// import HRView from "../../views/HRView/HRView"
// import SalesView from "../../views/SalesView/SalesView";
// import DeliveryView from "../../views/DeliveryView/DeliveryView"
// import ManualView from "../../views/ManualView/ManualView";


const success = (message) => {
  Modal.success({
    content: {message},
  });
};
const error = (message) => {
  Modal.error({
    content: message,
  });
};


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
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);
  const infoDetail = useSelector((state) => state.info);
  const isSidebarOpen =
    customization.isSidebarOpen === null
      ? !smallScreen
      : customization.isSidebarOpen;

  const roleUser = infoDetail.role === "owner" ? "Chủ cửa hàng" : "Nhân viên"

  const permissions = useSelector((state) => state.info.user.permissions);

  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])

  useEffect(() => {
    dispatch(customizeAction.setSidebarOpen(!smallScreen));
  }, [smallScreen, permissions]);

  const handleToggleSidebar = (open) => {
    dispatch(customizeAction.setSidebarOpen(open));
  };



  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid
  const branch_uuid = info.branch.uuid;
  const user_id = info.user.id;

  console.log("info",info)
  console.log(permissions)

  const checkAttendance = async (branchUuid) => {
    try {
      setOpenQrScanner(false);
      const response = await scheduleApi.checkAttendanceQR(store_uuid, branchUuid, info.user.uuid);
      alert(response.message + " " + response.data[0].shift_name + " " + response.data[0].start_time + "-" + response.data[0].end_time);
    } catch (err) {
      setOpenQrScanner(false);
      error("Điểm danh thất bại. Vui lòng scan lại mã" + JSON.stringify(err));
    }
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
  
  const logOutHandler = () => {
    dispatch(authActions.logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    localStorage.removeItem("cartListData");
    localStorage.removeItem("suppliers");
    localStorage.removeItem("importListData");
    localStorage.removeItem("products");
    sessionStorage.removeItem("BKRMprev");
    sessionStorage.removeItem("BKRMopening");
  };

  const [openNotification, setOpenNotifcation] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const getNotification = async (event) => {
    try {
      if (store_uuid && branch_uuid) {
        const res = await storeApi.getNotification(store_uuid, branch_uuid);
        // alert(JSON.stringify(res.data))
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpenNotifcation(true);
      }
    } catch(err) {
      console.log(err)
    }
  }

  const [openUserInfo, setOpenUserInfo] = useState(false)
  const [openQrScanner, setOpenQrScanner] = useState(false)

  return (
    <div className={classes.root}>
      {openQrScanner && <QrScanner open={openQrScanner} handleClose={() => setOpenQrScanner(false)} processResult={checkAttendance}/>}
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

            <Box display="flex" flexDirection={"row"} alignItems="center">
              {/* {infoDetail.store?.branches?.length > 1 ?<BranchSelectAppBar store_uuid={infoDetail.store.uuid} />:null} */}
              <BranchSelectAppBar store_uuid={infoDetail.store.uuid} smallScreen={smallScreen} />
              <IconButton color="primary" size="small" onClick={() => { setOpenUserInfo(true); }} >
                <PersonIcon fontSize="large" />
              </IconButton>

              {!smallScreen ? <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                style={{marginLeft: 10, marginRight: 5, minWidth:90 }}
              >
                <Typography variant="h6" style={{ fontWeight: 700, fontSize: 13 }}>{roleUser}</Typography>
                <Typography variant="h6" noWrap>
                  {infoDetail.user.name}
                </Typography>
              </Box> : null}
              

              {infoDetail.role === "employee" && <IconButton color="primary" size="small"  onClick={() => setOpenQrScanner(true)} >
                <CameraAlt fontSize="medium" />
              </IconButton>}
              <Notification anchorEl={anchorEl} open={openNotification} />
              <Button color="primary" size={smallScreen ? "small" : "medium"} style={!smallScreen ? { marginRight:10, marginLeft:10} : {width: 50}} onClick={() => logOutHandler()}>
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
          <Suspense fallback={<div style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', height: '100vh', width: '100%' }}>
            <Spin style={{margin: 'auto'}}/>
          </div>} >
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
            <Route path={`${path}/manual`} component={ManualView} />
            <Route path={`${path}/`} >
              {/* only redirect whenever permissions is successfully loaded => length at least = 1 */}
              {permissions?.length > 0 ?
                (<Redirect to={permissions?.find((p) => p.name === "sales") ? `${path}/sales` : permissions?.find((p) => p.name === "inventory") ? `${path}/inventory` : permissions?.find((p) => p.name === "employee") ? `${path}/hr` : `${path}/manager`} />) : null}
            </Route>
            
            <Route path={`${path}/*`} component={PageNotFound} />
          </Switch>
          </Suspense>

        </Box>
      </main>
    </div>
  );
};
HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;