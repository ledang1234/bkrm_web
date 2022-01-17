import React from 'react'
import { makeStyles,useTheme } from '@material-ui/styles';

import { Link } from "react-router-dom";
import clsx from "clsx";

//import library
import {Collapse,List, Box,ListItem,ListItemIcon, ListItemText ,Typography} from '@material-ui/core';
import { useDispatch,useSelector } from "react-redux";
import {ExpandLess,ExpandMore} from "@material-ui/icons";

// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";

//import project 
import SubItem from './SubItem';

//ICON
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';



const useStyles = makeStyles((theme) => ({
  menuText:{
    marginLeft:-15
  },
  item:{
    // background:theme.color.primaryLight
    // background: "#f1f1f1",
    borderRadius: theme.customization.borderRadius,
    '&:hover': {
       background: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main ,
    },
    marginTop:2,


  },
  itemClick:{
      background: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main ,
      color: theme.customization.mode === "Light" ? theme.palette.secondary.main : null,
  },
  menuTextClick:{
    fontWeight:800
  },
  openIcon:{
    marginLeft:40
  }
}));

const MenuItem = (props) => {
    const {item, collapse} = props;
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customize);
    
    const [open, setOpen] = React.useState(true);
    const itemMenuOpen = customization.itemMenuOpen;
  
    const Icon = item.icon1;
    const Icon1 = item.icon2;

    function getMenuIcon (type){
      switch (type) {
        case "1":
          return  <Box
              component="img"
              sx={{
                height: 24,
                width: 24, 
              }}
              src={item.icon}
           />
          
        case "2":
          return <Icon1 fontSize="small" />
          
        case "3":
            return <Icon fontSize="small" />
        default:
            return <Icon fontSize="small" />
      } 
    }

    function handleOnClick(id){
        if(id === 1 || id ===4 
          // ||id === 8 || id ===10 
          ){
          dispatch(customizeAction.setSidebarOpen(false));  
        }
        dispatch(customizeAction.setItemMenuOpen(id));
        if(collapse){setOpen(!open)}

    }

    return (
      <>
      <ListItem   
          button
          component={Link}
          to={item.url}
          // className={classes.item}
          className={clsx([classes.item], {
            [classes.itemClick]: Math.floor(itemMenuOpen) === Math.floor(item.id),
          })}
          onClick={()=>handleOnClick(item.id)}
          
        >
          <ListItemIcon style={{marginRight:-5, padding:2}}>

             { getMenuIcon(theme.customization.menu)}
            
             {/* { getMenuIcon(1)} */}
          </ListItemIcon>
          {/* <ListItemIcon >
              <Box
                component="img"
                sx={{
                  height: 24,
                  width: 24, 
                }}
                src={item.icon}
              />
          </ListItemIcon> */}
          
           <Typography
              className={clsx([classes.menuText], {
                [classes.menuTextClick]:  Math.floor(itemMenuOpen) === Math.floor(item.id),
              })}
            > 
              {item.title} 
          </Typography>
              
          {collapse ?
           open? <ExpandLess className={classes.openIcon}  fontSize="small"/> : <ExpandMore className={classes.openIcon}fontSize="small" />  
          :null}
          </ListItem>
        
        
          {collapse ?
            <Collapse in={open} timeout="auto">
            <List component="div" style={{/*marginRight:25*/marginTop:-7}} >
                {item.children.map((_item) => (
                    <SubItem  item={_item}  />
                ))}
            </List>
          </Collapse>
          :null}
    </>
    )
}

export default MenuItem
