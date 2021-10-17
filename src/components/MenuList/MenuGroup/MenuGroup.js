
import React from 'react'
import { makeStyles } from '@material-ui/styles';

// import library
import { Collapse, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import {ExpandLess,ExpandMore} from "@material-ui/icons";

// import project
import MenuItem from '../MenuItem/MenuItem';


const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption,
        marginLeft:-20,
    },
    collapse:{
        marginBottom:-10,
        marginTop:-10,
    },
    menuDivider:{
       marginRight:20,
       marginTop:-5,
    },
    openIcon:{
        marginRight:10
    }
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
            >
                <ListItem    
                    onClick={() => setOpen(!open)}
                    className={classes.collapse}
                >
                    <ListItemText
                        primary={
                            <Typography variant="caption" className={classes.menuCaption} >
                                {item.title}
                            </Typography>
                        } />
                    {open ? <ExpandLess className={classes.openIcon}  /> : <ExpandMore className={classes.openIcon} />}
                </ListItem>
                
                <Collapse in={open} timeout="auto">
                    <List component="div">
                        {item.children.map((_item) => (
                            <MenuItem  item={_item} />
                        ))}
                    </List>
                </Collapse>
                

            </List>
            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </>
    )
}

export default MenuGroup
