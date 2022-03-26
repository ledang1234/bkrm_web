import React from 'react'
import ProductList  from './ProductList/ProductList'
import InventoryList from '../../../assets/JsonData/inventory.json'
import { Typography } from '@mui/material';
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import DetailPage from './DetailPage/DetailPage'
import { useSelector } from 'react-redux';
// File to get product & navigate page

  const RouteList = () => {
    let { path } = useRouteMatch();
    const routeItems = InventoryList.map((item) => { 
        return(
        <Route exact path={`${path}/${item.id}`} >
             <ProductList InventoryList={InventoryList}/>
        </Route> 
        )
    })
    return routeItems;
  }
  
const ProductPage = (props) => {
    const {clickItem} = props;
    const {mainColor}=props.webInfo;
    const {priceStyle,btnStyle,isMargin,border,alignCenter,nameStyle,isBox,marginContainer,boxDistance} = props.webInfo.listProduct;
    let { url } = useRouteMatch();
    
    //2.  API GET PRODUCT (base on category and page)
    //....
    let { categoryId } = useParams();
    const {products, categories} = useSelector(state => state.customerPage);
    let productOfCategory = products.filter(product => product.category.id.toString() === categoryId)
    productOfCategory= productOfCategory.filter(product => product.attribute_value !== null )
    const category = categories.find(cat => cat.id.toString() === categoryId)

    console.log("category", category)   
    console.log("clickItem",clickItem) 
    return (
        <>
            {/* 1. TITLE */}
            {/* Đổi sang breadcrumb ?? */}
            <Typography variant="h6" style={{/*flexGrow: 1,textAlign: "center",*/marginLeft:40, marginBottom:10, marginTop:100}}>{clickItem? clickItem:category?.name}</Typography>
            
        
            {/* 2. LIST */}
            {/* // InventoryList theo category get from api */}
            <ProductList InventoryList={productOfCategory} mainColor={`rgba(${ mainColor.r }, ${ mainColor.g }, ${ mainColor.b }, ${mainColor.a })`} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance}/>
            

            {/* 3. NAVIGATION PAGE NAV  */}
            {/*  */}
        </>





    //define route detail ở đây ko hiện ??
    // <Switch>
    //     <Route exact  path={path}>           
    //             <ProductList InventoryList={InventoryList} mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance}/>
    //     </Route>
    //     {/* Path detail */}
    //     <RouteList  />  

    // </Switch>
   
 
    )
}

export default ProductPage
