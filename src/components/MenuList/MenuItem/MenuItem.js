import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Link } from "react-router-dom";

//import library
import { Collapse,Divider, List,ListItem,ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import InboxIcon from "@material-ui/icons/MoveToInbox";


const useStyles = makeStyles((theme) => ({
  menuIcon:{
  marginLeft:-15
  }
}));

const MenuItem = (props) => {
    const {item} = props;
    const classes = useStyles();

    const Icon = item.icon;
    const itemIcon = ( <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />)
    return (
      <ListItem   
          button
          component={Link}
          to={item.url}
        >
          <ListItemIcon >
            {itemIcon}
          </ListItemIcon>
          <ListItemText primary={item.title} className={classes.menuIcon} />
        </ListItem>
    )
}

export default MenuItem
