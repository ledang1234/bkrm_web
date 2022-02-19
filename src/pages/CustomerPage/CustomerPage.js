import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from '../PageNotFound/PageNotFound'

//import library
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core"

import NavBar from "./NavBar/NavBar";
import MainPage  from "./MainPage/MainPage"
import ProductPage from "./ProductPage/ProductPage";
import DetailPage from "./ProductPage/DetailPage/DetailPage";
import CartButton from "../../components/Button/CartButton";
import Footer from "./Footer/Footer";
import StorePage from './StorePage/StorePage'
import AboutUsPage from './AboutUsPage/AboutUsPage'
import PromotionPage from './PromotionPage/PromotionPage'
import CartPage from './CartPage/CartPage'
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    background: theme.palette.background.default,
  },
  

}));


const CustomerPage = () => {
  let { path } = useRouteMatch();
  // 1. Customer setting
  //1.1 NavBar
  // // -----recomendation 1
  // const navColor = 0 //0:white, 1- maincolor
  // const textNav = [3,1,1]  //0-left 1-right //color: black-white-grey-maincolor, size: small - large(16):,  bold:no() -yes (600)  
  // // -----recomendation 2
  // const navColor = 0 //0:white, 1- maincolor
  // const textNav = [2,0,0] 
   // -----recomendation 3
   const navColor = 1 //0:white, 1- maincolor
   const textNav = [1,1,1] 
  
  //1.2 Box show
  // ---- recomendation 1
  // const mainColor = '#f2a5ae'; //#fa8c16
  // const priceStyle = [0,0,0]; //0-left 1-right //color: normal-grey-maincolor, size: small - large(16),  bold:no() -yes (600) 
  // const nameStyle = [0,0,0,0]; //0-left 1-right //color: normal-grey-maincolor, size: small - large(16), bold:no() -yes (600) , maxNumberOFline: 1-2
  // const btnStyle = [1,1];//0-left 1-right //haveBtn: no-yes, style:circle - box
  // const isBox= false;
  // const isMargin = true
  // const border = true
  // const alignCenter = false
  // const marginContainer = 10;
  // const boxDistance = 0.75;

  // ---- recomendation 2
  const mainColor = '#fa8c16'; //#
  const priceStyle = [0,0,0]; //0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600) 
  const nameStyle = [0,1,0,0]; //0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600), maxNumberOFline: 1-2
  const btnStyle = [1,0];//0-left 1-right //haveBtn: no-yes, style:circle - box
  const isBox= true;
  const isMargin = true
  const border = true
  const alignCenter = false;
  const marginContainer = 0;
  const boxDistance =1;
  

  const theme = useTheme();
  const classes = useStyles(theme);
  
  const [clickItem, setClickItem] = useState(null);
  function handleClickItem(item) {
    setClickItem(item);
  }



  //1.  API GET ALL CATEGORY HERE
  //....


  
  const renderTree = (items) => {
    return(
      <>
      <Route exact path={`${path}/products/${items.id}`} >
          <ProductPage clickItem={clickItem} mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance}/> 
      </Route> 
       {Array.isArray(items.children) ? items.children.map((item) => renderTree(item)) : null }
      
      </>
    ) 
  };
  const RouteList = () => {
    const routeItems = category.map((item) => { return renderTree(item);})
    return routeItems;
  }

  return (
    <div className={classes.root}>
      <NavBar mainColor={mainColor} category={category} navColor={navColor} textNav={textNav}handleClickItem={handleClickItem} />  
      <CartButton />
        <Box style={{marginTop:73}}>
            <Switch>
              <Route exact  path={path}> 
                  <MainPage 
                    mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance}
                  />
              </Route>
              <Route exact  path={`${path}/promotion`}> 
                  <PromotionPage />
              </Route>
              <Route exact  path={`${path}/store`}> 
                  <StorePage />
              </Route>
              <Route exact  path={`${path}/aboutus`}> 
                  <AboutUsPage />
              </Route>
              <Route exact  path={`${path}/cart`}> 
                  <CartPage />
              </Route>

              {/* Path product */}
              <Route exact path={`${path}/products/all`} >                    
                  <ProductPage  mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={marginContainer} boxDistance={boxDistance} /> 
              </Route> 
              {/* Tại sao define route detail trong ProductPage 
              hoặc define route detial sau route product ko đc  */}
              
              {/* Path detail */}

              {/* tạm thời - fix lại sau */}
              <Route exact path={`${path}/products/all/1`}> 
                <DetailPage />       
              </Route>
             
              {/* Path product */}
              <RouteList  />  
           
              
              <Route path={`${path}/*`} component={PageNotFound} />

            </Switch>
        </Box>

        {/* <Footer/> */}
    </div>
  );
};

export default CustomerPage;


const category =[
  {
      id:1,
      title:"Quần áo",
      children:[
          {
              id:6,
              title:"Quần",
              children:[
                  {id:20,title:"Quần dài"},
                  {id:21,title:"Quần đùi"},
              ]
          },
          {
              id:7,
              title:"Áo",
              children:[
                  {id:22,title:"Áo dài"},
                  {id:23,title:"Áo thun"},
              ]
          
          },
          {id:8,title:"Đầm"},
          {id:9,title:"Váy"},

      ]
  },
  {
      id:2,
      title:"Phụ kiện",
      children:[
          {id:10,title:"Nón"},
          {id:11,title:"Mắt kiếng"},
      ]
  },
  {id:3,title:"Túi xách"},
  {id:4,title:"Giày dép"},
  {id:5,title:"Quần"}

]

