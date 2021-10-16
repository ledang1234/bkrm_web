
import React from 'react'

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuItem from '../MenuItem/MenuItem';
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
}));
const MenuGroup = (props) => {
    const { item } = props;

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    return (
        <>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem
                    
                    onClick={() => setOpen(!open)}

                >

                    <ListItemText
                        primary={
                            <Typography variant="caption" className={classes.menuCaption} >
                                {item.title}

                            </Typography>
                        } />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <MenuItem open={open} list={item.children} />

            </List>
            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </>
    )
}

export default MenuGroup
