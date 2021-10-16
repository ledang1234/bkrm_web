import React, { useState, useEffect } from "react";
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// import useStyles from "./styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

// //import library
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Container, Box } from "@material-ui/core";
//import icons
import MenuIcon from "@material-ui/icons/Menu";

//import project
import MenuList from "../../components/MenuList/MenuList"
import TableWrapper from "../../components/TableWrapper/TableWrapper";

const drawerWidth = 240;
const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background
  },
  appBar: {
    background: theme.palette.background,
    boxShadow: "none",
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerHide: {
    width: 0,
  },
  drawerPaper: {
    width: drawerWidth-20,
    marginTop:48+16+16,
    borderColor:"#fff",
    paddingLeft:20,
   
  },
  _drawerPaper: {
    width: drawerWidth-20,
    // paddingTop:48+16+16,
    borderColor:"#fff",
    paddingLeft:20,
   
  },
  drawerHeader: { 
    display: "flex",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    background:'#fff',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  background:{
    backgroundColor: theme.palette.primary.light,
    borderRadius:'12px',
    marginLeft:20,
    marginRight:20,
    padding:20
  },
  toolBar:{
    background:'#fff',

  },
  searchEngine:{
    paddingLeft:20
  },
  boxContainer: {
    display: 'flex',
    padding: '16px',
    marginLeft: 'auto',
    marginRight: 'auto'
}
})
);


const HomePage = (props)  =>{
  const theme = useTheme();
  const classes = useStyles();
  const { window } = props;
  
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isSidebarOpen, setSidebarOpen] = useState(!smallScreen);

  useEffect(() => {
    setSidebarOpen(!smallScreen);
  }, [smallScreen]);

  function handleToggleSidebar(open) {
    setSidebarOpen(open);
  }

  const divLogo =()=>{
    if(!smallScreen) return (
    // <div style={{width:drawerWidth}}/>
    <div  style={{width:drawerWidth, justifyContent: "flex-end",display: "flex",}}  >
      <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)}>
          <MenuIcon />
      </IconButton>
    </div>
    )
  }
  const _divLogo =()=>{
    if(smallScreen) return (
    // <div style={{width:drawerWidth}}/>
    <div  style={{width:drawerWidth, height:48,}}  >
      {/* <IconButton onClick={() => handleToggleSidebar(!isSidebarOpen)}>
          <MenuIcon />
      </IconButton> */}
      HEllo
    </div>
    )
  }

  const container = window !== undefined ? () => window().document.body : undefined;
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

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
            className={clsx(classes.menuButton, 
               !smallScreen && classes.hide
              )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.searchEngine}>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
  
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={isSidebarOpen}
        onClose={()=>handleToggleSidebar(!isSidebarOpen)}
    
        classes={{
          paper: matchUpMd ? classes.drawerPaper :classes._drawerPaper
      }}
      
          // className={clsx(classes.menuButton, 
          //   !smallScreen && classes.hide
          //  )}

          ModalProps={{ keepMounted: true }}
          color="inherit"
      >
        <Box >
        {_divLogo()}
            </Box>
            <MenuList/> 
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isSidebarOpen ,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography className={classes.background}  > 
          <TableWrapper/>
        </Typography>

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