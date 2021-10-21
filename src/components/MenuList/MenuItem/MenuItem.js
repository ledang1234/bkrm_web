import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Link } from "react-router-dom";

//import library
import { Box,ListItem,ListItemIcon, ListItemText } from '@material-ui/core';



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
  }
}));

const MenuItem = (props) => {
    const {item} = props;
    const classes = useStyles();
    return (
      <ListItem   
          button
          component={Link}
          to={item.url}
          className={classes.item}
          
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

          <ListItemText primary={item.title} className={classes.menuText} />
        </ListItem>
    )
}

export default MenuItem
