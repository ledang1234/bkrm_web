import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Link } from "react-router-dom";

//import library
import { Collapse,Box,Divider,CardActionArea, List,ListItem,ListItemIcon, ListItemText, Typography } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  menuText:{
    marginLeft:-15
  },
  item:{
    // background:theme.color.primaryLight
    // background: "#f1f1f1",
    borderRadius: theme.customization.borderRadius,
    '&:hover': {
       background: theme.palette.secondary.dark,
       
    },
  }
}));

const MenuItem = (props) => {
    const {item} = props;
    const classes = useStyles();

    // const Icon = item.icon;
    // const itemIcon = ( <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />)
    return (
      <ListItem   
          button
          component={Link}
          to={item.url}
          className={classes.item}
          
        >
          {/* <ListItemIcon >
            {itemIcon}
          </ListItemIcon> */}
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
