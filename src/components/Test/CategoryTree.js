import React, { useEffect, useState } from "react";
import RootCategory from "./List/RootCategory";
import productApi from "../../api/productApi";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

const CategoryTree = (props) => {
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [parentCategories, setParentCategories] = useState([]);
  console.log(props.reset,"out")
  useEffect(() => {
    console.log(props.reset,"use")
    const fetchCategoryList = async () => {
      try {
        const categories = await productApi.getParentCategory(store_uuid);
        setParentCategories(categories.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryList();
  }, [store_uuid,props.reset]);
  return (
    <Box {...props}>
      {parentCategories.map((category) => (
        <RootCategory category={category} reset={props.reset}/>
      ))}
    </Box>
  );
};

export default CategoryTree;
