import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, createStyles,lighten,styled } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Card,
  Button,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
} from "@material-ui/core";
import * as TableType from "../../../assets/constant/tableType";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import InvoiceReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary";
import CartTableRow from "./CartTableRow/CartTableRow"
import { Divider } from "@mui/material";
// import {useTheme, makeStyles,styled,withStyles,createStyles,lighten} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    textTitle: {
      flexGrow: 1,
      textAlign: "center",
      marginBottom:15,
    },
    card1: {
      boxShadow: "nones",
    },
    dividerColor:{
      color:"#000"
    }
  })
);

export const CartHeadCells = [
  { id: "name", align: "left", disablePadding: true, label: "Sản phẩm" },
  { id: "price", align: "center", disablePadding: true, label: "Đơn giá" },
  { id: "quantity", align: "center", disablePadding: true, label: "Số lượng" },
  { id: "total", align: "right", disablePadding: true, label: "Thành tiền" },
  { id: "action", align: "right", disablePadding: true, label: "" },
];

const CartPage = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {mainColor} = props.webInfo
  console.log("mainColor",mainColor)

  const [cartList, setCartList] = React.useState([
    {
      uuid:"123423",
      id: 123,
      name: "Áo dài Việt Nam Việt Nam",
      quantity: 2,
      unit_price: 200,
    },
    {   uuid:"dđ123423",id: 12, name: "Quan", quantity: 1, unit_price: 220 },
    { uuid:"dđ1dgrr23423",id: 134, name: "Bánh", quantity: 3, unit_price: 240 },
  ]);

  const handleChangeItemQuantity = (index, newQuantity) =>{
    let newCartList = [...cartList]
    newCartList[index].quantity = newQuantity
    setCartList(newCartList)
  }


  const handleDeleteItemCart = (uuid) =>{
    let newCartList = [...cartList]
    newCartList = newCartList.filter(row => row.uuid === uuid)
    setCartList(newCartList)
  }





  return (
    <div style={{backgroundColor:"#fff",  }}>
    <Box style={{ marginTop: 100, marginLeft: 50, marginRight: 50,}}>
      <Typography style={{ flexGrow: 1, textAlign: "center",}} variant="h2">
        Giỏ hàng 
      </Typography>
      <Typography className={classes.textTitle} variant="body2" style={{marginBottom:20}}>
        ( 5 sản phẩm )
      </Typography>
      {/* <div style={{ flexGrow: 1, textAlign: "center"}} > */}
        {/* hello */}
        {/* <div style={{flexGrow: 1, textAlign: "center"}}> */}
      <Grid container justifyContent="center">
      <Divider  sx={{ borderBottomWidth: 5 }} variant="middle" style={{width:50, marginBottom:20,background: 'black'}}  />
      </Grid>
    
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        // alignItems="center"
        spacing={2}
      >
        <Grid item sm={12} md={8}>
          <Card style={{boxShadow:'0px 5px 10px rgba(0,0,0,0.1)',}}>
            <Box style={{ padding: 30,  }}>
              <TableWrapper isCart={true}>
                <TableHeader
                  classes={classes}
                  isCustomer={true}
                  headerData={CartHeadCells}
                />
                <TableBody>
                  {cartList.map((row, index) => {
                    return (
                      <CartTableRow row={row} handleDeleteItemCart={handleDeleteItemCart} handleChangeItemQuantity={handleChangeItemQuantity} index={index}/>
                    );
                  })}
                </TableBody>
              </TableWrapper>
            </Box>
          </Card>
        </Grid>

        <Grid item sm={12} md={4} className={classes.card} >
          <Card className={classes.card} style={{padding:20, }} >
            <Grid container  direction="row" justifyContent="space-between" alignItems="center" spacing={2} >
                <Typography style={{fontSize:19, fontWeight:500, color:"#000"}} >Tổng tiền  (1):</Typography>  
                <Typography  style={{fontSize:22, fontWeight:700, color:"red"}}>500.000</Typography>  
              </Grid>   
              {/* <Button style={{marginTop:30}}variant="contained" fullWidth style={{color:mainColor}}>Đặt hàng</Button> */}
              <ColorButton  mainColor={mainColor} color="primary"  style={{marginTop:30}}variant="contained" fullWidth> Đặt hàng </ColorButton>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default CartPage;






export const ColorButton = styled(Button)(({mainColor }) => ({
  // color: "#ffffff",
  // backgroundColor: `rgba(${ mainColor.r }, ${ mainColor.g }, ${ mainColor.b }, ${mainColor.a })` ,
  // backgroundColor:lighten(`rgba(${ mainColor.r }, ${ mainColor.g }, ${ mainColor.b }, ${mainColor.a })` , 0.5),

  // "&:hover": {
  //   backgroundColor:lighten(`rgba(${ mainColor.r }, ${ mainColor.g }, ${ mainColor.b }, ${mainColor.a })` , 0.3),
    
  // },
}));