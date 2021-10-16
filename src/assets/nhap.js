// import React, { useState, useEffect } from "react";
// import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
// // import useStyles from "./styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import clsx from "clsx";

// // //import library
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Drawer from "@material-ui/core/Drawer";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import { Container } from "@material-ui/core";
// //import icons
// import MenuIcon from "@material-ui/icons/Menu";

// //import project
// import MenuList from "../../components/MenuList/MenuList"

// const drawerWidth = 240;
// const useStyles = makeStyles((theme) =>
// createStyles({
//   root: {
//     display: "flex",
//     backgroundColor: theme.palette.background
//   },
//   appBar: {
//     // background: '#efc5c2',
//     background: theme.palette.background,
//     boxShadow: "none",
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
    
//   },
//   appBarShift: {
//     background: theme.palette.background,
//     // elevation: 0.0,
//     boxShadow: "none",
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     // flexShrink: 0,

    
//   },
//   drawerHide: {
//     width: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth-20,
//     // borderRight:1, 
//     borderColor:"#fff",
//     paddingLeft:20,
    
    
   
//   },
//   drawerHeader: { 
    
//     display: "flex",
//     // alignItems: "center",
//     // padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: "flex-end",
//     background:'#fff',
   
  
//   },
//   content: {
//     flexGrow: 1,
//     // padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   contentShift: {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: drawerWidth,
//   },
//   background:{
//     backgroundColor: theme.palette.primary.light,
//     height: '100vh' , 
//     borderRadius:'12px',
//     marginLeft:20,
//     marginRight:20
//   },
//   toolBar:{
//     background:'#fff'
//   }

// })
// );


// const HomePage = ()  =>{
  // const theme = useTheme();
  // const classes = useStyles();
  
//   const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const [isSidebarOpen, setSidebarOpen] = useState(!smallScreen);

//   useEffect(() => {
//     setSidebarOpen(!smallScreen);
//   }, [smallScreen]);

//   function handleToggleSidebar(open) {
//     setSidebarOpen(open);
//   }


//   const drawer = (
//       <div>
        // <div className={classes.drawerHeader}    >
        //   <IconButton onClick={() => handleToggleSidebar(false)}>
        //       <MenuIcon />
        //   </IconButton>
        // </div>
       
     
        
//         <MenuList/>
   
//       </div>
//   )

//   return (
//     <div className={classes.root}>
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: isSidebarOpen,
//         })}
       
//       >
//         <Toolbar className={classes.toolBar} >
//           <IconButton
//             // color="inherit"
//             aria-label="open drawer"
//             onClick={() => handleToggleSidebar(!isSidebarOpen)}
//             edge="start"
            // className={clsx(classes.menuButton, 
            //   // isSidebarOpen && classes.hide
            //   )}
//               style={{scrollMarginInlineStart: 10}}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={clsx(classes.drawer, {
//           [classes.drawerHide]: !isSidebarOpen,
//         })}
//         variant="persistent"
//         anchor="left"
//         open={isSidebarOpen}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
   
       
//       >
//         {drawer}
//       </Drawer>
//       <main
//         className={clsx(classes.content, {
//           [classes.contentShift]: isSidebarOpen && !smallScreen,
//         })}
//       >
//         <div className={classes.drawerHeader} />
//         <Typography className={classes.background}  />

//       </main>
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from "react";
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
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
import { Container } from "@material-ui/core";
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
    marginRight: theme.spacing(2),
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
  }
})
);


const HomePage = ()  =>{
  const theme = useTheme();
  const classes = useStyles();
  
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
               isSidebarOpen && classes.hide
              )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={{[classes.searchEngine]: isSidebarOpen,}}>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerHide]: !isSidebarOpen,
        })}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <MenuList/> 
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isSidebarOpen && !smallScreen,
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

export default HomePage;