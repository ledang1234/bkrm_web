import React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles';

import { Link } from "react-router-dom";
import clsx from "clsx";

//import library
import { Collapse, List, Box, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";

//import project 
import SubItem from './SubItem';

//ICON
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import setting from "../../../assets/constant/setting"



const useStyles = makeStyles((theme) => ({
  menuText: {
    marginLeft: -15
  },
  item: {
    // background:theme.color.primaryLight
    // background: "#f1f1f1",
    borderRadius: theme.customization.borderRadius,
    '&:hover': {
      background: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main,
    },
    marginTop: 2,


  },
  itemClick: {
    background: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main,
    color: theme.customization.mode === "Light" ? theme.palette.secondary.main : null,
  },
  menuTextClick: {
    fontWeight: 800
  },
  openIcon: {

    flexGrow: 1, textAlign: "right",
    marginRight: -25
  }
}));

const MenuItem = (props) => {
  const { item, collapse } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);

  const [open, setOpen] = React.useState(true);
  const itemMenuOpen = customization.itemMenuOpen;

  const Icon = item.icon1;
  const Icon1 = item.icon2;

  const xsScreen = useMediaQuery(theme.breakpoints.down("md")) ;
  const info = useSelector((state) => state.info);
  const store_setting = info.store.general_configuration? JSON.parse(info.store.general_configuration): setting


  function getMenuIcon(type) {
    switch (type) {
      case "1":
        return <Box
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

  function handleOnClick(id) {
    sessionStorage.setItem("BKRMopening",id)
    if (id === 1 || id === 4 || xsScreen) {
      dispatch(customizeAction.setSidebarOpen(false));
    }
    dispatch(customizeAction.setItemMenuOpen(id));
    if (collapse) { setOpen(!open) }
  }
 
  if(!store_setting.inventory.status && (item.id  == 4 || item.id ==6 || item.id == 7 || item.id == 9 || item.id == 11 || item.id==12)){
      return null
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
        onClick={() => handleOnClick(item.id)}

      >
        <ListItemIcon style={{ marginRight: -6, paddingTop: 2, paddingBottom: 2, marginLeft: -7 }}>

          {getMenuIcon(theme.customization.menu)}

          {/* { getMenuIcon(1)} */}
        </ListItemIcon>
    

        <Typography
          className={clsx([classes.menuText], {
            [classes.menuTextClick]: Math.floor(itemMenuOpen) === Math.floor(item.id),
          })}
        >
          {item.title}
        </Typography>

        {collapse ?
          open ? <ExpandLess className={classes.openIcon} fontSize="small" /> : <ExpandMore className={classes.openIcon} fontSize="small" />
          : null}
      </ListItem>


      {collapse ?
        <Collapse in={open} timeout="auto">
          <List component="div" style={{/*marginRight:25*/marginTop: -7 }} >
            {item.children.map((_item) => (
              <SubItem item={_item} />
            ))}
          </List>
        </Collapse>
        : null}
    </>
  )
}

export default MenuItem
