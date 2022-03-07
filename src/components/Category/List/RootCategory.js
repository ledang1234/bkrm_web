import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from "@material-ui/icons/Category";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SubCategory from "./SubCategory";
import { useSelector } from "react-redux";
import productApi from "../../../api/productApi";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Button, Typography } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import Tooltip from '@material-ui/core/Tooltip';
import UpdateCategory from "./UpdateCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    zIndex: 1
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function RootCategory(props) {
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const categories = await productApi.getSubCategory(
          store_uuid,
          props.category.uuid
        );
        setSubCategories(categories.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryList();
  }, [store_uuid, props.category.uuid, props.reset]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    handleClose()
  };
  const [update, setUpdate] = useState(false)
  const handleOpenEdit = () => setUpdate(true)
  const handleClose = () => setUpdate(false)
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <UpdateCategory onReset={props.onReset} open={update} handleClose={handleClose} category={props.category}/>
      <ListItem >
        <ListItemText
          primary={
            <Tooltip  title="Cập nhật">
              <Button style={{display:"flex",flexDirection:"row",justifyContent:"flex-start", textDecoration:"none",textTransform:"none"}} fullWidth onClick={handleOpenEdit}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                {props.category.name}
              </Button>
            </Tooltip>
          }
        />
        {props.category.children.length === 0 ? null : open ? (
          <IconButton size="small" onClick={handleClick} style={{ zIndex: 2 }} >
            {" "}
            <ExpandLess />{" "}
          </IconButton>
        ) : (
          <IconButton size="small" onClick={handleClick} style={{ zIndex: 2 }}>
            {" "}
            <ExpandMore button />{" "}
          </IconButton>
        )}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        {subCategories.map((category) => (
          <SubCategory key={category.uuid} category={category} onReset={props.onReset}/>
        ))}
      </Collapse>
    </List>
  );
}
