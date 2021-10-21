import React, { useState, useEffect } from "react";
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import { useSelector } from 'react-redux';

//import library
import {AppBar, Toolbar,IconButton,Drawer,Typography,Box} from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//import icons
import MenuIcon from "@material-ui/icons/Menu";

//import project
import MenuList from "../../components/MenuList/MenuList"
import TableWrapper from "../../components/TableWrapper/TableWrapper";
import Customization from '../../components/Customization'

import SalesView from "../../views/SalesView/SalesView"
import InventoryView from "../../views/InventoryView/InventoryView"
import HRView from "../../views/HRView/HRView"
import ManagerView from "../../views/ManagerView/ManagerView"
import PageNotFound from "../PageNotFound/PageNotFound"

import PerfectScrollbar from 'react-perfect-scrollbar';
import { grey, pink,blue} from '@material-ui/core/colors'

const drawerWidth = 240;


const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    display: "flex",
    //SET CHO DARK MODE -> chinhr lai
    // height:735,
    height:1035,
    
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
    
    // marginTop:48,
    // paddingTop:48+16+16,
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

    // background:'#fff',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    

    //// KO CÓ DÒNG NÀY TABLE KO SCOLL NGANG ĐC
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

    // backgroundColor: theme.palette.primary.light,
    background: theme.customization.mode == "Light"? theme.palette.primary.light: theme.customization.primaryColor[theme.customization.colorLevel],
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
  logo1:{
    fontSize: '1.25rem',
    color:  theme.palette.primary.main,
    fontWeight: 700
  },
  logo2:{
    fontSize: '1.25rem',
    color: theme.heading,
    fontWeight: 700
  },
    logoPos:{
      marginLeft:-10,
      marginTop:20,
      marginBottom:10
    },
    headerAvatar: {
      ...theme.typography.commonAvatar,
      ...theme.typography.mediumAvatar,
      transition: 'all .2s ease-in-out',
      background: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
      '&:hover': {
          background: theme.palette.secondary.dark,
          color: theme.palette.secondary.light
      }
  },


}));


const HomePage = (props)  =>{
  const theme = useTheme();
  const classes = useStyles();
  const customization = useSelector((state) => state.customization);
  const { window } = props;
  
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const container = window !== undefined ? () => window().document.body : undefined;
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  let { path } = useRouteMatch();
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
          {/* <ListItem >
            <div className={classes.logo1} > MY LOGO </div>
            <div  className={classes.logo2} >  </div>
          </ListItem> */}

          <div  style={{width:drawerWidth, justifyContent: "flex-end",display: "flex",}}  >
          <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)}>
            
              <MenuIcon style={{color:theme.customization.themeText}}/>
          </IconButton>

          {/* icon menu color */}
          {/* <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Avatar variant="rounded" className={classes.headerAvatar} color="inherit">
                  <MenuIcon stroke={1.5} size="1.1rem" />
              </Avatar>
      
          </IconButton> */}
        </div>
        
    </div>
    )
  }
  const _divLogo =()=>{
    if(smallScreen) return (
    <div  style={{width:drawerWidth, height:48}}  >
        {/* <ListItem className={classes.logoPos}>
           <div className={classes.logo1} > BK </div>
           <div  className={classes.logo2} > RM </div>
        </ListItem> */}
    </div>
    )
  }

  return (
    <div className={classes.root}>
      {/* NavBar */}
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
        <Box >
          {_divLogo()}
          {/* {divLogo()} */}
        </Box>
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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


export default HomePage;



// import TableTest from "../../components/TableWrapper/Test/TableTest"

// <TableTest />
// <div style={{width:500, height:300}}> </div>