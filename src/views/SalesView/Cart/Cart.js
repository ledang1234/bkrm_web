import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
import { grey } from "@material-ui/core/colors";
import moment from "moment";

//import library
import {
  Grid,
  Card,
  Box,
  Tabs,
  Tab,
  TableContainer,
  CardContent,
  CardMedia,
  CardActionArea,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
  ListItem,
  IconButton,
  TableBody,
  Typography,
} from "@material-ui/core";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";

//import project
//rieng
import CartSummary from "../../../components/CheckoutComponent/CheckoutSummary/CartSummary/NewCartSummary";
import { CartRow, CartRowMini } from "./CartTableRow/CartTableRow";
//chung
import MenuProduct from "../../../components/MenuProduct/MenuProduct";
import ChangeCartBtn from "../../../components/CheckoutComponent/ChangeCartBtn/ChangeCartBtn";
import SearchProduct from "../../../components/SearchBar/SearchProduct";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import {
  getComparator,
  stableSort,
} from "../../../components/TableCommon/util/sortUtil";

import orderApi from "../../../api/orderApi";
// update state
import update from "immutability-helper";
import { useSelector } from "react-redux";
import SnackBarGeneral from "../../../components/SnackBar/SnackBarGeneral";
import customerApi from "../../../api/customerApi";
// FILE này xử lý state -> connect search bar, table, với summary lại + quản lý chọn cart

const Cart = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedBranch, setSelectedBranch] = useState({});

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch = info.branch;

  const [customers, setCustomers] = useState([])
  ////------------ I. DATA (useState) ----------------
  // Cart data get from search_product component
  // const cartData = [
  //     // QUANTITY có thể edit ->  truyền quatity edit ngược về cartData ??
  //     //dựa vào id của text field quatity ??

  //     //còn bị lỗi sort // tự generate stt
  //     { stt: 1, id: 123, name:"Áo dài Việt Nam Việt Nam", quantity:2, price:200 },
  //     { stt: 2, id: 12,  name:"Quan", quantity:1, price:220 },
  //     { stt: 3, id: 134,  name:"Bánh", quantity:3, price:240 },
  //     { stt: 1, id: 123, name:"Áo dài Việt Nam Việt Nam", quantity:2, price:200 },
  //     { stt: 2, id: 12,  name:"Quan", quantity:1, price:220 },
  //     { stt: 3, id: 134,  name:"Bánh", quantity:3, price:240 },

  // ];
  // chú ý cartList id from 1 to ... dùng để edit + delete
  // const [cartList, setCartList] = React.useState([{ id: 1, customer: null, cartItem: cartData}]);

  const [cartList, setCartList] = React.useState([
    {
      customer: null,
      cartItem: [],
      total_amount: '0',
      paid_amount: '0',
      discount: '0',
      payment_method: "cash",
    },
  ]);
  //// ----------II. FUNCTION
  // 1.Cart
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [isUpdateTotalAmount, setIsUpdateTotalAmount] = React.useState(false);

  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Tạo hóa đơn thất bại",
  });

  useEffect(() => {
    updateTotalAmount();
  }, [isUpdateTotalAmount]);

  useEffect(() => {
    const loadingCustomer = async () => {
      try {
        const response = await customerApi.getCustomers(store_uuid);
        setCustomers(response.data);
      } catch(err) {
        console.log(err)
      }
      
    };

    loadingCustomer();
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSnackBar = (event, reason) => {
  
    setOpenSnack(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChoose = (index) => {
    setSelectedIndex(index);
    handleClose();
  };
  const handleAdd = () => {
    // ADD CART
    setCartList([
      ...cartList,
      {
        customer: null,
        cartItem: [],
        total_amount: "0",
        paid_amount: "0",
        payment_method: "cash",
        discount: '0',
      },
    ]);
    setSelectedIndex(cartList.length);
    handleClose();
  };
  const handleDelete = (index) => {
    // DELETE CART
    cartList.splice(index, 1);
    if (cartList.length === 0) {
      setCartList([
        {
          customer: customers[0],
          cartItem: [],
          total_amount: "0",
          paid_amount: "0",
          discount: "0",
          payment_method: "cash",
        },
      ]);
    } else {
      setCartList(cartList);
    }
    if (selectedIndex === index) {
      setSelectedIndex(0);
    } else if (selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
    handleClose();
  };
  const updateCustomer = (value) => {
    let newArr = [...cartList]; // copying the old datas array
    newArr[selectedIndex].customer = value;
    setCartList(newArr);
  };

  //2. Table sort
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("stt");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //mode
  const [mode, setMode] = React.useState(false);
  const handleChangeMode = (event) => {
    setMode(event.target.checked);
  };

  // handle search select item add to cart
  const handleSearchBarSelect = (selectedOption) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => {
        return item.uuid === selectedOption.uuid
      }
    );

    if (itemIndex !== -1) {
      handleChangeItemQuantity(
        selectedOption.uuid,
        cartList[selectedIndex].cartItem[itemIndex].quantity + 1
      );
      return;
    }
    let newCartItem = {
      id: cartList[selectedIndex].cartItem.length,
      uuid: selectedOption.uuid,
      quantity: 1,
      barcode: selectedOption.bar_code,
      unit_price: selectedOption.list_price,
      img_url: selectedOption.img_url,
      name: selectedOption.name,
    };

    let newCartList = update(cartList, {
      [selectedIndex]: { cartItem: { $push: [newCartItem] } },
    });
    console.log(newCartList);
    setCartList(newCartList);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleDeleteItemCart = (itemUuid) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: { cartItem: { $splice: [[itemIndex, 1]] } },
    });
    setCartList(newCartList);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleChangeItemQuantity = (itemUuid, newQuantity) => {
    if (newQuantity === 0) {
      handleDeleteItemCart(itemUuid);
      return;
    }
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: {
        cartItem: { [itemIndex]: { quantity: { $set: newQuantity } } },
      },
    });
    setCartList(newCartList);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleChangeItemPrice = (itemUuid, newPrice) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let newCartList = update(cartList, {
      [selectedIndex]: {
        cartItem: { [itemIndex]: { unit_price: { $set: newPrice } } },
      },
    });
    setCartList(newCartList);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleSelectCustomer = (selectedCustomer) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { customer: { $set: selectedCustomer } },
    });
    setCartList(newCartList);
  };

  const handleUpdatePaidAmount = (amount) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { paid_amount: { $set: amount } },
    });
    setCartList(newCartList);
  };

  const handleUpdatePaymentMethod = (method) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { payment_method: { $set: method } },
    });
    setCartList(newCartList);
  };

  const handleUpdateDiscount = (amount) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { discount: { $set: amount } },
    });
    setCartList(newCartList);
  };

  const updateTotalAmount = () => {
    let total = 0;
    cartList[selectedIndex].cartItem.forEach((item) => {
      total += item.unit_price * item.quantity;
    });

    let newCartList = update(cartList, {
      [selectedIndex]: { total_amount: { $set: total } },
    });
    setCartList(newCartList);
  };

  const handleConfirm = async () => {
    let cart = cartList[selectedIndex];

    let d = moment.now()/1000;
    
    let orderTime = moment.unix(d).format('YYYY-MM-DD HH:mm:ss',  { trim: false })
    console.log(orderTime)
    
    let details = cart.cartItem.map(item => ({...item, discount: '0'}));

    let body = {
      customer_uuid: cart.customer.uuid,
      total_amount: cart.total_amount.toString(),
      payment_method: cart.payment_method,
      paid_amount: cart.paid_amount,
      discount: cart.discount,
      status:
        cart.paid_amount >= cart.payment_amount - cart.discount 
          ? "closed"
          : "debt",
      details: details,
      creation_date: orderTime,
      paid_date: orderTime,
      tax: '0',
      shipping: '0'
    };


    try {
      let res = await orderApi.addOrder(
        store_uuid,
        branch.uuid,
        body
      );
      setSnackStatus({
        style: "success",
        message: "Tạo hóa đơn thành công: " + res.data.order.order_code,
      });
      setOpenSnack(true);
      handleDelete(selectedIndex);
    } catch (err) {
      setSnackStatus({
        style: "error",
        message: "Tạo hóa đơn thất bại! ",
      });
      setOpenSnack(true);
      console.log(err);
    }
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <SnackBarGeneral
        handleClose={handleCloseSnackBar}
        open={openSnack}
        status={snackStatus}
      />

      {/* 1. TABLE CARD (left) */}
      <Grid item xs={12} sm={8}>
        <Card className={classes.root}>
          <Box style={{ padding: 30, minHeight: "80vh", paddingBottom: 0 }}>
            <Box style={{ height: "70vh" }}>
              {/* 1.1 TITLE + BTN CHANGE CART +  SEARCH */}
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: -10, marginBottom: 30 }}
              >
                <Grid>
                  <ListItem>
                    {/* 1.1.1 Title */}
                    <Typography variant="h3"> Giỏ hàng </Typography>
                    <Typography
                      variant="h3"
                      style={{
                        marginLeft: 10,
                        color: theme.customization.primaryColor[500],
                      }}
                    >
                      {" "}
                      # {selectedIndex + 1}
                    </Typography>
                    {/* 1.1.2. Btn Channge Cart */}
                    <ChangeCartBtn
                      selectedIndex={selectedIndex}
                      anchorEl={anchorEl}
                      cartList={cartList}
                      handleClick={handleClick}
                      handleClose={handleClose}
                      handleChoose={handleChoose}
                      handleDelete={handleDelete}
                      handleAdd={handleAdd}
                      isCart={true}
                    />
                  </ListItem>
                </Grid>
                <Grid>
                  {/* 1.1.3. Search */}
                  <SearchProduct
                    handleSearchBarSelect={handleSearchBarSelect}
                  />
                </Grid>
              </Grid>

              {/* 1.2 TABLE */}
              {!mode ? (
                <TableWrapper isCart={true}>
                  <TableHeader
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headerData={HeadCells.ImportHeadCells}
                    isCart={true}
                  />
                  <TableBody>
                    {stableSort(
                      cartList[selectedIndex].cartItem,
                      getComparator(order, orderBy)
                    ).map((row, index) => {
                      return (
                        <CartRow
                          row={row}
                          handleDeleteItemCart={handleDeleteItemCart}
                          handleChangeItemPrice={handleChangeItemPrice}
                          handleChangeItemQuantity={handleChangeItemQuantity}
                        />
                      );
                    })}
                  </TableBody>
                </TableWrapper>
              ) : (
                <MenuProduct />
              )}
            </Box>
            {/* 1.3 CHANGE MODE  */}
            <FormControlLabel
              control={<Switch checked={mode} onChange={handleChangeMode} />}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: -10,
                marginTop: 10,
              }}
            />
          </Box>
        </Card>
      </Grid>

      {/* 2.SUMMARY CARD (right) */}
      <Grid item xs={12} sm={4} className={classes.root}>
        <Card className={classes.root}>
          <Box style={{ padding: 0, minHeight: "80vh" }}>
            {!mode ? (
              /* Viết hàm tính toán sau dựa trên cartData ... hiện tại đang set cứng giá trị */
              <CartSummary
                setSelectedBranch={setSelectedBranch}
                selectedBranch={selectedBranch}
                cartData={cartList[selectedIndex]}
                handleSelectCustomer={handleSelectCustomer}
                handleUpdateDiscount={handleUpdateDiscount}
                handleUpdatePaidAmount={handleUpdatePaidAmount}
                handleUpdatePaymentMethod={handleUpdatePaymentMethod}
                handleConfirm={handleConfirm}
                currentCustomer={cartList[selectedIndex].customer}
                currentBranch={branch}
                mode={mode}
                customers={customers}
              />
            ) : (
              <CartSummary
                cartData={cartList[selectedIndex]}
                updateCustomer={updateCustomer}
                currentCustomer={cartList[selectedIndex].customer}
                mode={mode}
              >
                <TableContainer
                  style={{
                    maxHeight: "40vh",
                    marginBottom: 20,
                    height: "40vh",
                  }}
                >
                  <TableBody>
                    {cartList[selectedIndex].cartItem.map((row, index) => {
                      return <CartRowMini row={row} />;
                    })}
                  </TableBody>
                </TableContainer>
              </CartSummary>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
