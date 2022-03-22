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
  TextField,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
  TableBody,
} from "@material-ui/core";
import * as TableType from "../../../assets/constant/tableType";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import InvoiceReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary";
import CartTableRow from "./CartTableRow/CartTableRow"
import { Divider } from "@mui/material";
import _ from 'lodash'
// import {useTheme, makeStyles,styled,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux"
import { customerPageActions } from '../../../store/slice/customerPageSlice';
import customerPageApi from '../../../api/customerPageApi'
import { error, success } from "../../../components/StatusModal/StatusModal";
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
  

  const {order, storeInfo } = useSelector(state => state.customerPage)
  const dispatch = useDispatch()
  const [cartList, setCartList] = React.useState([
    {
      uuid:"123423",
      id: 123,
      name: "Áo dài Việt Nam Việt Nam",
      quantity: 2,
      unit_price: 200,
    },
    { uuid:"dđ123423",id: 12, name: "Quan", quantity: 1, unit_price: 220 },
    { uuid:"dđ1dgrr23423",id: 134, name: "Bánh", quantity: 3, unit_price: 240 },
  ]);

  const handleChangeItemQuantity = (index, newQuantity) => {
    let newOrder = _.cloneDeep(order)

    newOrder.cartItem[index].quantity = newQuantity
    dispatch(customerPageActions.setOrder(newOrder))
  }


  const handleDeleteItemCart = (uuid) =>{
    let newOrder = _.cloneDeep(order)
    newOrder.cartItem = newOrder.cartItem.filter(row => row.uuid !== uuid)
    
    dispatch(customerPageActions.setOrder(newOrder))
  }

  const handleChangeOrder = (field, value) => {
    let newOrder = _.cloneDeep(order)
    newOrder[field] = value
    
    dispatch(customerPageActions.setOrder(newOrder))
  }

  const calculateTotal = () => {
    let total = 0;
    order.cartItem.forEach(item => total += item.list_price * item.quantity)
    return total
  }

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Box style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
        <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h2">
          Giỏ hàng
        </Typography>
        {/* <Typography
          className={classes.textTitle}
          variant="body2"
          style={{ marginBottom: 20 }}
        >
          {order.cartItem.length}
        </Typography> */}
        {/* <div style={{ flexGrow: 1, textAlign: "center"}} > */}
        {/* hello */}
        {/* <div style={{flexGrow: 1, textAlign: "center"}}> */}
        <Grid container justifyContent="center">
          <Divider
            sx={{ borderBottomWidth: 5 }}
            variant="middle"
            style={{ width: 50, marginBottom: 20, background: "black" }}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          // alignItems="center"
          spacing={2}
        >
          <Grid item sm={12} md={8}>
            <Card style={{ boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }}>
              <Box style={{ padding: 30 }}>
                <TableWrapper isCart={true}>
                  <TableHeader
                    classes={classes}
                    isCustomer={true}
                    headerData={CartHeadCells}
                  />
                  <TableBody>
                    {order.cartItem.map((row, index) => {
                      return (
                        <CartTableRow
                          row={row}
                          handleDeleteItemCart={handleDeleteItemCart}
                          handleChangeItemQuantity={handleChangeItemQuantity}
                          index={index}
                        />
                      );
                    })}
                  </TableBody>
                </TableWrapper>
              </Box>
            </Card>
          </Grid>

          <Grid item sm={12} md={4} className={classes.card}>
            <Card className={classes.card} style={{ padding: 20 }}>
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={!order.name}
                    value={order.name}
                    label="Họ và tên"
                    style={{ marginBottom: 20 }}
                    // helperText="Họ và tên không được trống."
                    onChange={(e) => handleChangeOrder("name", e.target.value)}
                  />
                  <TextField
                    error={!order.phone}
                    label="Số điện thoại"
                    value={order.phone}
                    style={{ marginBottom: 20 }}
                    onChange={(e) => handleChangeOrder("phone", e.target.value)}
                    // helperText="Số điện thoại không được trống."
                  />
                  <InputLabel id="demo-simple-select-label">
                    Chi nhánh
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={storeInfo.branches?.at(0)?.id}
                    value={order.branch_id}
                    label="Chi nhánh"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      handleChangeOrder("branch_id", e.target.value)
                    }
                  >
                    {storeInfo.branches?.map((branch) => (
                      <MenuItem value={branch.id}>{branch.name}</MenuItem>
                    ))}
                  </Select>
                  <TextField
                    value={order.address}
                    label="Địa chỉ"
                    onChange={(e) =>
                      handleChangeOrder("address", e.target.value)
                    }
                  />
                </Box>

                
                  <Typography
                    style={{ fontSize: 19, fontWeight: 500, color: "#000" }}
                  >
                    Tổng tiền ({order.cartItem.length} mặt hàng):
                  </Typography>
                  <Typography
                    style={{ fontSize: 22, fontWeight: 700, color: "red" }}
                  >
                    {calculateTotal()}
                  </Typography>
                
              </Grid>
              {/* <Button style={{marginTop:30}}variant="contained" fullWidth style={{color:mainColor}}>Đặt hàng</Button> */}
              <ColorButton
                mainColor={mainColor}
                color="primary"
                style={{ marginTop: 30 }}
                variant="contained"
                fullWidth
                disabled={!order.name || !order.phone || !calculateTotal()}
                onClick={ async () => {
                  try {
                    let submitOrder = _.omit(order, "cartItem")
                    submitOrder.details = JSON.stringify(order.cartItem) 
                    
                    const res = await customerPageApi.addOrder(storeInfo.uuid, {...submitOrder, total_amount: calculateTotal()});
                    success("Thêm hóa đơn thành công")
                    dispatch(customerPageActions.setOrder({
                      name: "",
                      phone: "",
                      cartItem: [],
                      address: "",
                      branchId: storeInfo.branches?.at(0)?.id,
                    }))
                  } catch (err) {
                    console.log(err)
                    error('Thêm hóa đơn thất bại')
                  }
                  
                }}
              >
                {" "}
                Đặt hàng{" "}
              </ColorButton>
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