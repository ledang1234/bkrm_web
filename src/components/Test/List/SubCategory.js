import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoryIcon from "@material-ui/icons/Category";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { useSelector } from "react-redux";
import productApi from "../../../api/productApi";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SubCategory(props) {
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
  }, [store_uuid, props.category.uuid]);
  useEffect(() => {
    console.log(subCategories);
  }, [subCategories]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log(subCategories);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.nested}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={props.category.name} />
        {props.category.children.length === 0 ? null : open ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subCategories.map((category) => (
          <SubCategory category={category} />
        ))}
      </Collapse>
    </List>
  );
}
