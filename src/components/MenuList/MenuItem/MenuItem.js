import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Link } from "react-router-dom";
import clsx from "clsx";

//import library
import { Box,ListItem,ListItemIcon, ListItemText ,Typography} from '@material-ui/core';
import { useDispatch,useSelector } from "react-redux";
// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";


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

  },
  itemClick:{
      background: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main ,
      color: theme.customization.mode === "Light" ? theme.palette.secondary.main : null,
  },
  menuTextClick:{
    fontWeight:800
  }
}));

const MenuItem = (props) => {
    const {item} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customize);
    
    const itemMenuOpen = customization.itemMenuOpen;
  
    function handleOnClick(id){
        if(id === 1 || id ===4){
          dispatch(customizeAction.setSidebarOpen(false));  
        }
        dispatch(customizeAction.setItemMenuOpen(id));
    }
    return (
      <ListItem   
          button
          component={Link}
          to={item.url}
          // className={classes.item}
          className={clsx([classes.item], {
            [classes.itemClick]: itemMenuOpen === item.id,
          })}
          onClick={()=>handleOnClick(item.id)}
          
        >
          <ListItemIcon >
          <Box
            component="img"
            sx={{
              height: 25,
              width: 25, 
            }}
            src={item.icon}
          />
          </ListItemIcon>
          
           <Typography
              className={clsx([classes.menuText], {
                [classes.menuTextClick]: itemMenuOpen === item.id,
              })}
            > 
              {item.title} 
          </Typography>
        </ListItem>
    )
}

export default MenuItem
