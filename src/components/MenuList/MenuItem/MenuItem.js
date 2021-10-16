import React from 'react'
import { Link } from "react-router-dom";
import { Collapse,Divider, List,ListItem,ListItemIcon, ListItemText, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import InboxIcon from "@material-ui/icons/MoveToInbox";
const useStyles = makeStyles((theme) => ({
}));

const MenuItem = (props) => {
    const classes = useStyles();
    const {open, list} = props;
    return (
        <div>
    <Collapse in={open} timeout="auto">
        <List component="div">
          {props.list.map((item) => (
            <ListItem
              key={list.indexOf(item)}
              button
              component={Link}
              to={item.url}
            >
              <ListItemIcon className={classes.menuIcon}>
                  {/* {item.icon} */}
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
        </div>
    )
}

export default MenuItem
