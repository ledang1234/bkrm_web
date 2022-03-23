// import React, { useState, useEffect } from "react";
// import { useTheme, makeStyles, createStyles,lighten,styled } from "@material-ui/core/styles";
// import {
//   Typography,
//   Box,
//   Card,
//   Button,
//   Grid,
//   ButtonBase,
//   Avatar,
//   TextField,
//   Tooltip,
//   InputLabel,
//   Select,
//   MenuItem,
//   TableBody,
//   FormControl,
//   FormHelperText
// } from "@material-ui/core";
// import * as TableType from "../../../assets/constant/tableType";
// import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
// import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
// import InvoiceReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary";
// import CartTableRow from "./CartTableRow/CartTableRow"
// import { Divider } from "@mui/material";
// import _ from 'lodash'
// // import {useTheme, makeStyles,styled,withStyles,createStyles,lighten} from "@material-ui/core/styles";
// import {useDispatch, useSelector} from "react-redux"
// import { customerPageActions } from '../../../store/slice/customerPageSlice';
// import customerPageApi from '../../../api/customerPageApi'
// import { error, success } from "../../../components/StatusModal/StatusModal";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import CartSummary from "./CartSummary/CartSummary"

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     textTitle: {
//       flexGrow: 1,
//       textAlign: "center",
//       marginBottom:15,
//     },
//     card1: {
//       boxShadow: "nones",
//     },
//     dividerColor:{
//       color:"#000"
//     }
//   })
// );

// export const CartHeadCells = [
//   { id: "name", align: "left", disablePadding: true, label: "Sản phẩm" },
//   { id: "price", align: "center", disablePadding: true, label: "Đơn giá" },
//   { id: "quantity", align: "center", disablePadding: true, label: "Số lượng" },
//   { id: "total", align: "right", disablePadding: true, label: "Thành tiền" },
//   { id: "action", align: "right", disablePadding: true, label: "" },
// ];

// const CartPage = (props) => {
//   const theme = useTheme();
//   const classes = useStyles(theme);
//   const {mainColor} = props.webInfo
  
//   const {order, storeInfo } = useSelector(state => state.customerPage)


//   const dispatch = useDispatch()

//   const handleChangeItemQuantity = (index, newQuantity) => {
//     let newOrder = _.cloneDeep(order)
//     newOrder.cartItem[index].quantity = newQuantity
//     dispatch(customerPageActions.setOrder(newOrder))
//   }
//   const handleDeleteItemCart = (uuid) =>{
//     let newOrder = _.cloneDeep(order)
//     newOrder.cartItem = newOrder.cartItem.filter(row => row.uuid !== uuid)
    
//     dispatch(customerPageActions.setOrder(newOrder))
//   }
//   const handleChangeOrder = (field, value) => {
//     let newOrder = _.cloneDeep(order)
//     newOrder[field] = value
    
//     dispatch(customerPageActions.setOrder(newOrder))
//   }


//   const  calculateTotal = () => {
//     let total = 0;
//     order.cartItem?.forEach(item => total += item.list_price * item.quantity)
//     return total
//   }
//   const calculateQuantity = () => {
//     let rs = order.cartItem?.reduce((b, a) => b + a.quantity, 0) ;
//     if(rs) return rs 
//     return 0
   
//   }

//   const handleSubmit = async () => {
//       try {
//         let submitOrder = _.omit(order, "cartItem")
//         // let submitOrder = _.omit(formik.values, "cartItem")

//         submitOrder.details = JSON.stringify(order.cartItem) 

//         console.log("submitOrder",submitOrder)
        
//         const res = await customerPageApi.addOrder(storeInfo.uuid, {...submitOrder, total_amount: calculateTotal()});
//         success("Thêm hóa đơn thành công")
//         dispatch(customerPageActions.setOrder({
//           name: "",
//           phone: "",
//           cartItem: [],
//           address: "",
//           branchId: storeInfo.branches?.at(0)?.id,
//         }))
//       } catch (err) {
//         console.log(err)
//         error('Thêm hóa đơn thất bại')
//       }
      
//   }
  

//   // const _CartSummary = () => {
//   //   return (
//   //     <>
//   //     <Grid
//   //         container
//   //         direction="column"
//   //         justifyContent="space-between"
//   //         alignItems="center"
//   //         spacing={5}
//   //       >
//   //         <Typography
//   //             style={{ fontSize: 19, fontWeight: 500, color: "#000", }}
//   //           >
//   //             Tổng tiền ({calculateQuantity()}):
//   //           </Typography>
//   //           <Typography
//   //             style={{ fontSize: 22, fontWeight: 700, color: "red" , marginBottom:30}}
//   //           >
//   //             {calculateTotal()}
//   //        </Typography>
             
//   //     </Grid >
//   //         <TextField
//   //           name="name"
//   //           required
//   //           fullWidth
//   //           label="Họ và tên"
//   //           onChange={(e)=>formik.setFieldValue("name", e.target.value)}
//   //           value={formik.values.name}
//   //           error={formik.touched.name && formik.errors.name}
//   //           helperText={formik.touched.name ? formik.errors.name : null}
//   //           // onBlur={formik.handleBlur}
//   //           style={{marginBottom:15}}
//   //         />
//   //         <TextField
//   //             required
//   //             fullWidth
//   //             label="Số điện thoại"
//   //             name="phone"
//   //             onChange={formik.handleChange}
//   //             value={formik.values.phone}
//   //             error={formik.touched.phone && formik.errors.phone}
//   //             helperText={formik.touched.phone ? formik.errors.phone : null}
//   //             // onBlur={formik.handleBlur}
//   //             style={{marginBottom:15}}
//   //           />
//   //         <FormControl
//   //           required
//   //           fullWidth
//   //           error={formik.touched.city && formik.errors.city}
//   //           style={{marginBottom:10}}
//   //         >
//   //           <InputLabel>Tỉnh</InputLabel>
//   //           <Select
//   //             native
//   //             name="city"
//   //             label="Tỉnh"
//   //             value={formik.values.city}
//   //             onChange={formik.handleChange}
//   //             onBlur={formik.handleBlur}
//   //           >
//   //             <option value="" />
//   //             {cityList.map((city) => (
//   //               <option value={city.id}>{city.name}</option>
//   //             ))}
//   //           </Select>
//   //           {formik.touched.city ? (
//   //             <FormHelperText>{formik.errors.city}</FormHelperText>
//   //           ) : null}
//   //         </FormControl>
//   //     <Grid container  spacing={3}>
//   //       <Grid item xs={6}> 
//   //         <FormControl
//   //           required
//   //           fullWidth
//   //           // variant="outlined"
//   //           error={formik.touched.district && formik.errors.district}
//   //           style={{marginBottom:10}}
//   //         >
//   //           <InputLabel>Huyện</InputLabel>
//   //           <Select
//   //             native
//   //             label="Huyện"
//   //             name="district"
//   //             value={formik.values.district}
//   //             onChange={formik.handleChange}
//   //             onBlur={formik.handleBlur}
//   //           >
//   //             <option value="" />
//   //             {districtList.map((district) => (
//   //               <option value={district.id}>{district.name}</option>
//   //             ))}
//   //           </Select>
//   //           {formik.touched.district ? (
//   //             <FormHelperText>{formik.errors.district}</FormHelperText>
//   //           ) : null}
//   //         </FormControl>
      
//   //     </Grid>
//   //     <Grid item xs={6}> 
//   //         <FormControl
//   //           required
//   //           fullWidth
//   //           // variant="outlined"
//   //           error={formik.touched.ward && formik.errors.ward}
//   //           style={{marginBottom:10}}
//   //         >
//   //           <InputLabel htmlFor="ward">Xã</InputLabel>
//   //           <Select
//   //             native
//   //             label="Xã"
//   //             name="ward"
//   //             value={formik.values.ward}
//   //             onChange={formik.handleChange}
//   //             onBlur={formik.handleBlur}
//   //           >
//   //             <option aria-label="None" value="" />
//   //             {wardList.map((ward) => (
//   //               <option value={ward.id}>{ward.name}</option>
//   //             ))}
//   //           </Select>
//   //           {formik.touched.ward ? (
//   //             <FormHelperText>{formik.errors.ward}</FormHelperText>
//   //           ) : null}
//   //         </FormControl>
//   //         </Grid>
//   //      </Grid>
//   //           <ColorButton
//   //             mainColor={mainColor}
//   //             color="primary"
//   //             style={{ marginTop: 50, }}
//   //             variant="contained"
//   //             fullWidth
//   //             disabled={!order.name || !order.phone || !calculateTotal()}
//   //             onClick={handleSubmit}
//   //           >
//   //             {" "}
//   //         Đặt hàng{" "}
//   //       </ColorButton>
//   //   </>
//   //   )
//   // }

//   return (
//     <div style={{ backgroundColor: "#fff" }}>
//       <Box style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
//         <Typography style={{ flexGrow: 1, textAlign: "center" }} variant="h2">
//           Giỏ hàng
//         </Typography>
//         <Grid container justifyContent="center">
//           <Divider
//             sx={{ borderBottomWidth: 5 }}
//             variant="middle"
//             style={{ width: 50, marginBottom: 20,marginTop:10, background: "black" }}
//           />
//         </Grid>

//         <Grid
//           container
//           direction="row"
//           justifyContent="space-between"
//           // alignItems="center"
//           spacing={2}
//         >
//           <Grid item sm={12} lg={8}>
//             <Card style={{ boxShadow: "0px 5px 10px rgba(0,0,0,0.1)" }}>
//               <Box style={{ padding: 30 }}>
//                 <TableWrapper isCart={true}>
//                   <TableHeader
//                     classes={classes}
//                     isCustomer={true}
//                     headerData={CartHeadCells}
//                   />
//                   <TableBody>
//                     {order.cartItem?.map((row, index) => {
//                       return (
//                         <CartTableRow
//                           row={row}
//                           handleDeleteItemCart={handleDeleteItemCart}
//                           handleChangeItemQuantity={handleChangeItemQuantity}
//                           index={index}
//                         />
//                       );
//                     })}
//                   </TableBody>
//                 </TableWrapper>
//               </Box>
//             </Card>
//           </Grid>

//           <Grid item sm={12} lg={4} className={classes.card}>
//             <Card className={classes.card} style={{ padding: 50 }}>
            
//               <CartSummary formik={formik} order={order} calculateTotal={calculateTotal} handleSubmit={handleSubmit} calculateQuantity={calculateQuantity}  mainColor={mainColor}/> 
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default CartPage;







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
import CartSummary from "./CartSummary/CartSummary"
import { useFormik } from "formik";
import * as Yup from "yup";
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
  const calculateQuantity = () => {
    let rs = order.cartItem?.reduce((b, a) => b + a.quantity, 0) ;
    if(rs) return rs 
    return 0
   
  }
  const formik = useFormik({
    initialValues: {
      name: order.name? order.name: "",
      email: order.email? order.email: "",
      phone: order.phone? order.phone: "",
      address:  order.address? order.address: "",
      ward:order.ward? order.ward: "",
      district: order.district? order.district: "",
      city: order.city? order.city: "",
  
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập họ và tên"),
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại")
        .matches(/^\d+$/,"Số điện thoại không chính xác"),
      email: Yup.string().email("Email không chính xác"),
      address: Yup.string().required("Nhập địa chỉ"),
      city: Yup.string().required("Chọn tỉnh/thành phố"),
      district: Yup.string().required("Chọn quận/huyện"),
      ward: Yup.string().required("Chọn phường/xã"),
    }),
  })
  const handleSubmit = async () => {
    try {
      let submitOrder = _.omit(order, "cartItem")
      // let submitOrder = _.omit(formik.values, "cartItem")

      submitOrder.details = JSON.stringify(order.cartItem) 

      console.log("submitOrder",submitOrder)
      
      const res = await customerPageApi.addOrder(storeInfo.uuid, {...submitOrder, total_amount: calculateTotal()});
      success("Đặt đơn hàng thành công")
      dispatch(customerPageActions.setOrder({
        name: "",
        phone: "",
        cartItem: [],
        address: "",
        branchId: storeInfo.branches?.at(0)?.id,
      }))
    } catch (err) {
      console.log(err)
      error('Đặt đơn hàng thất bại')
    }
    
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
            <CartSummary formik={formik} order={order} calculateTotal={calculateTotal} handleSubmit={handleSubmit} calculateQuantity={calculateQuantity}  mainColor={mainColor}/> 
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