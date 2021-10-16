// import React from 'react'
// import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
// import clsx from "clsx";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

// // //import library
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// //import icons
// import MenuIcon from "@material-ui/icons/Menu";
// import Typography from "@material-ui/core/Typography";

// import constant from "../../assets/constant/constant"

// const drawerWidth = constant.drawerWidth;

// const useStyles = makeStyles((theme) =>
// createStyles({
//     appBar: {
//         background: theme.palette.background,
//         boxShadow: "none",
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     toolBar:{
//         background:'#fff',
//     },
//     searchEngine:{
//         paddingLeft:20
//     },
//     hide:{
//         display:'none'
//     }
// })
// );

// const NavBar = (props) => {
//     const {isSidebarOpen, handleToggleSidebar} = props;
//     const theme = useTheme();
//     const classes = useStyles();
    
//     const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    
//     const divLogo =(_isSidebarOpen,_smallScreen)=>{
//         if(!_smallScreen) return (
//         <div  style={{width:drawerWidth, justifyContent: "flex-end",display: "flex",}}  >
//           <IconButton onClick={() => handleToggleSidebar(!_isSidebarOpen)}>
//               <MenuIcon />
//           </IconButton>
//         </div>
//         )
//       }

//     return (
//     <AppBar
//         position="fixed"
//         className={classes.appBar} 
//       >
//         <Toolbar className={classes.toolBar} >
//           {divLogo(isSidebarOpen,smallScreen)}
          
//           <IconButton
//             aria-label="open drawer"
//             onClick={() => handleToggleSidebar(!isSidebarOpen)}
//             edge="start"
//             className={clsx(classes.menuButton, 
//                isSidebarOpen && classes.hide
//               )}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap className={{[classes.searchEngine]: isSidebarOpen,}}>
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     )
// }


// export default NavBar
