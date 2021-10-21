import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";


//import library
import {AppBar, Toolbar,IconButton,Drawer,Typography,Box } from "@material-ui/core";
import PerfectScrollbar from 'react-perfect-scrollbar';

//import icons
import MenuIcon from "@material-ui/icons/Menu";

//import project
import MenuList from "../../components/MenuList/MenuList"
import Customization from '../../components/Customization/Customization'

import SalesView from "../../views/SalesView/SalesView"
import InventoryView from "../../views/InventoryView/InventoryView"
import HRView from "../../views/HRView/HRView"
import ManagerView from "../../views/ManagerView/ManagerView"
import PageNotFound from "../PageNotFound/PageNotFound"


const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    display: "flex",
    background: theme.palette.background.default,
  },
  appBar: {
    background: theme.palette.background.paper,
    boxShadow: "none",
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop:48+16+16,
    borderColor:theme.palette.background.paper,
    paddingLeft:20,
  },
  _drawerPaper: {
    width: drawerWidth,
    borderColor:theme.palette.background.paper,
    paddingLeft:20,
  },
  drawerHeader: { 
    display: "flex",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width:"100%",
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginLeft: drawerWidth,
  },

  background:{
    background: theme.customization.mode === "Light"? theme.palette.primary.light: theme.customization.primaryColor[theme.customization.colorLevel],
    borderRadius: theme.customization.borderRadius,
    marginLeft:20,
    marginRight:20,
    padding:20, 
  },
  toolBar:{
    background:theme.palette.background.paper,
  },
  searchEngine:{
    paddingLeft:20
  },
  scroll:{
    maxHeight:100
  },
}));


const HomePage = (props)  =>{
  const { window } = props;

  const theme = useTheme();
  const classes = useStyles(theme);
  let { path } = useRouteMatch();
  
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const container = window !== undefined ? () => window().document.body : undefined;
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [isSidebarOpen, setSidebarOpen] = useState(!smallScreen);
  
  useEffect(() => {
    setSidebarOpen(!smallScreen);
  }, [smallScreen]);

  function handleToggleSidebar(open) {
    setSidebarOpen(open);
  }

  const divLogo =()=>{
    if(!smallScreen) return (
    <div  style={{width:drawerWidth, justifyContent: "flex-end",display: "flex",}}>
        <div  style={{width:drawerWidth, justifyContent: "flex-end",display: "flex",}}  >
          <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)}>
              <MenuIcon style={{color:theme.customization.themeText}}/>
          </IconButton>
        </div>   
    </div>
    )
  }
  const _divLogo =()=>{
    if(smallScreen) return (
    <div  style={{width:drawerWidth, height:48}}  >
      
    </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar} 
      >
        <Toolbar className={classes.toolBar} >
            {divLogo()}
            <IconButton
              aria-label="open drawer"
              onClick={() => handleToggleSidebar(!isSidebarOpen)}
              edge="start"
              className={ !smallScreen && classes.hide}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h3" noWrap className={classes.searchEngine}>
              BKRM
            </Typography>

        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={isSidebarOpen}
        onClose={()=>handleToggleSidebar(!isSidebarOpen)}
    
        classes={{
          paper: matchUpMd ? classes.drawerPaper :classes._drawerPaper
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <PerfectScrollbar component="div" className={classes.scroll}>
            <Box >{_divLogo()} </Box>
            <MenuList/> 
        </PerfectScrollbar> 
      </Drawer>

      <main
        className={clsx([classes.content], {
          [classes.contentShift]: isSidebarOpen ,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography  className={clsx(classes.background)}  >   
            <Switch>
              <Route path={`${path}/sales`} component={SalesView} />
              <Route path={`${path}/inventory`} component={InventoryView} />
              <Route path={`${path}/hr`} component={HRView} />
              <Route path={`${path}/manager`} component={ManagerView} />
              <Route path={`${path}/*`} component={PageNotFound} />
          </Switch>
        </Typography>
        
        <Customization/>
       
      </main>
    </div>
  );
}
HomePage.propTypes = {
  window: PropTypes.func,
};

export default HomePage;

