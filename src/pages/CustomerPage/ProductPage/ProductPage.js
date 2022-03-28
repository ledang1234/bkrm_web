import React, { useState } from 'react'
import ProductList  from './ProductList/ProductList'
import InventoryList from '../../../assets/JsonData/inventory.json'
import { Typography } from '@mui/material';
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import DetailPage from './DetailPage/DetailPage'
import { useSelector } from 'react-redux';
// File to get product & navigate page

const ProductPage = (props) => {
    let { url } = useRouteMatch();
    let { categoryId } = useParams();

    const {priceStyle,btnStyle,isMargin,border,alignCenter,nameStyle,isBox,marginContainer,boxDistance} = props.webInfo.listProduct;
    const {mainColor} = props.webInfo

    //2.  API GET PRODUCT (base on category and page)
    //....
    function renderTree (items) {
      let rs = []
      if(items?.id.toString() === categoryId){
        return items
      }else{
        if(items?.children.length > 0){
          rs =  items?.children.map((item) => renderTree(item))
          return rs.filter(item => item !== undefined)[0]
        }
        return
      }     
    };
    const findCategoryName = () =>{
      for (let i = 0; i < categories.length ; i++ ){
        let rs =  renderTree(categories[i])
        if(rs !== undefined){
          return rs
        }
      }
     
    }
    // const category = categories.find(cat => cat.id.toString() === categoryId)
    // let productOfCategory = products.filter(product => product.category.id.toString() === categoryId)

    const {products, categories} = useSelector(state => state.customerPage);
    const category = findCategoryName()

    let productOfCategory = categoryId ? products.filter(product => product.category.id.toString() === categoryId &&(product.attribute_value === null || product.has_variance === 1) ) 
                        :products.filter(product => product.attribute_value === null || product.has_variance === 1 ) 
    return (
        <>
            {/* 1. TITLE */}
            {/* Đổi sang breadcrumb ?? */}
            {/* <Typography variant="h6" style={{marginLeft:40, marginBottom:10, marginTop:100}}>{categoryId? category?.name : "Tất cả sản phẩm"}</Typography> */}
             <Typography variant="h6" style={{/*flexGrow: 1,textAlign: "center",*/marginLeft:40, marginBottom:10, marginTop:100}}>{ category?.name }</Typography>

            {/* 2. LIST */}
            <ProductList InventoryList={productOfCategory}   mainColor={`rgba(${ mainColor.r }, ${ mainColor.g }, ${ mainColor.b }, ${mainColor.a })`} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance}/>

            {/* 3. NAVIGATION PAGE NAV  */}
            {/*  */}
        </>
 
    )
}

export default ProductPage
