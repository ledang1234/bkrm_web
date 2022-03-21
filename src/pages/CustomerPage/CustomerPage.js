import React, { useState, useEffect, useRef  } from "react";
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";

//import library
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core";

import NavBar from "./NavBar/NavBar";
import MainPage from "./MainPage/MainPage";
import ProductPage from "./ProductPage/ProductPage";
import DetailPage from "./ProductPage/DetailPage/DetailPage";
import CartButton from "../../components/Button/CartButton";
import Footer from "./Footer/Footer";
import StorePage from "./StorePage/StorePage";
import AboutUsPage from "./AboutUsPage/AboutUsPage";
import PromotionPage from "./PromotionPage/PromotionPage";
import CartPage from "./CartPage/CartPage";
import customerPageApi from "../../api/customerPageApi";
import StoreContext from "./StoreContext";
import { useParams } from "react-router-dom";
import webSetting from "../../assets/constant/webInfo";
import {useDispatch, useSelector} from 'react-redux';
import {customerPageActions} from '../../store/slice/customerPageSlice'
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}));

const CustomerPage = () => {
  let { path } = useRouteMatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  const [clickItem, setClickItem] = useState(null);
  function handleClickItem(item) {
    setClickItem(item);
  }

  const {categories, products} = useSelector(state => state.customerPage)

  //0.Store Info 
  var logoStore = "https://cdn.mykiot.vn/2021/11/c3fa6fc1ceef1d611cd9c7ed256db621e1814ba175dd832a37ffb6cc8e43bd6d.jpg"
  //1.  API GET ALL CATEGORY HERE
  //....
 //2.  GET SETTING
  const  webInfo =  webSetting;

  const renderTree = (items) => {
    return (
      <>
        <Route exact path={`${path}/products/${items.id}`}>
          <ProductPage
            clickItem={clickItem}
            webInfo={webInfo}
    
          />
        </Route>
        {Array.isArray(items.children)
          ? items.children.map((item) => renderTree(item))
          : null}
      </>
    );
  };
  const RouteList = () => {
    const routeItems = category.map((item) => {
      return renderTree(item);
    });
    return routeItems;
  };

  const dispatch = useDispatch()
  let { storeWebPage } = useParams();
  useEffect(() => {
    if (!storeWebPage) {
      return;
    }
    const fetchStore = async () => {
      const res = await customerPageApi.storeInfo(storeWebPage);
      console.log(res.data);
      
      dispatch(customerPageActions.setStoreInfo(res.data))
      const data = await Promise.all([customerPageApi.storeCategroies(res.data.uuid), 
        customerPageApi.storeProducts(res.data.uuid)]
      )

      dispatch(customerPageActions.setCategories(data[0].data ? data[0].data : []));
      dispatch(customerPageActions.setProducts(data[1].data ? data[1].data : []));
      // console.log(data)
    };
    fetchStore();
  }, []);

  return (
      <div className={classes.root}>
        <NavBar
          // storeInfo={storeInfo}
          handleClickItem={handleClickItem}
          category={categories ? categories : []}

          logo={logoStore}
          webInfo={webInfo}
        />
        {/* {parseInt(webInfo.navBar.buttonCart) === 0 ?
         <CartButton storeInfo={storeInfo} />:null
        } */}
        

        <Box style={{ marginTop: 73 }}>
          <Switch>
            <Route exact path={`${path}`}>
              <MainPage
               
                webInfo={webInfo}
              />
            </Route>
            <Route exact path={`${path}/promotion`}>
              <PromotionPage />
            </Route>
            <Route exact path={`${path}/storeInfo`}>
              <StorePage />
            </Route>
            {/* <Route exact path={`${path}/aboutUs`}>
              <AboutUsPage />
            </Route> */}

            <Route exact path={`${path}/cart`}>
              <CartPage webInfo={webInfo}  />
            </Route>

            {/* Path product */}
            <Route exact path={`${path}/products/all`}>
              <ProductPage
                webInfo={webInfo}
              />
            </Route>
            {/* Tại sao define route detail trong ProductPage 
              hoặc define route detial sau route product ko đc  
              --> Làm sao tui biet đc tại sao ^^
            */}

            {/* Path detail */}

            {/* tạm thời - fix lại sau */}
            <Route exact path={`${path}/products/all/1`}>
              <DetailPage />
            </Route>

            {/* Path product */}
            <RouteList />

            <Route path={`${path}/*`} component={PageNotFound} />
          </Switch>
        </Box>

        {/* <Footer/> */}
      </div>
  
  );
};

export default CustomerPage;

const category = [
  {
    id: 1,
    title: "Quần áo",
    children: [
      {
        id: 6,
        title: "Quần",
        children: [
          { id: 20, title: "Quần dài" },
          { id: 21, title: "Quần đùi" },
        ],
      },
      {
        id: 7,
        title: "Áo",
        children: [
          { id: 22, title: "Áo dài" },
          { id: 23, title: "Áo thun" },
        ],
      },
      { id: 8, title: "Đầm" },
      { id: 9, title: "Váy" },
    ],
  },
  {
    id: 2,
    title: "Phụ kiện",
    children: [
      { id: 10, title: "Nón" },
      { id: 11, title: "Mắt kiếng" },
    ],
  },
  { id: 3, title: "Túi xách" },
  { id: 4, title: "Giày dép" },
  { id: 5, title: "Quần" },
];
