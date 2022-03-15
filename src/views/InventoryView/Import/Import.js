import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
import { grey } from "@material-ui/core/colors";
import { CartBottom } from "../../../components/Button/CartButton";

import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useReactToPrint } from "react-to-print";
import { ImportReceiptPrinter } from "../../../components/ReceiptPrinter/ReceiptPrinter";
//import library
import {
  Grid,
  Card,
  Box,
  TableContainer,
  FormControlLabel,
  Switch,
  ListItem,
  TableBody,
  Typography,
  ButtonBase,
  Avatar,
  Tooltip,
  TextField,
} from "@material-ui/core";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import SearchBarCode from "../../../components/SearchBar/SearchBarCode";

//import project
//rieng
import ImportSummary from "../../../components/CheckoutComponent/CheckoutSummary/ImportSummary/ImportSummary";
import { ImportRow, ImportRowMini } from "./ImportTableRow/ImportTableRow";
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

import purchaseOrderApi from "../../../api/purchaseOrderApi";
// update state
import update from "immutability-helper";
import { useSelector } from "react-redux";
import SnackBarGeneral from "../../../components/SnackBar/SnackBarGeneral";
import moment from "moment";
import AddInventory from "../Inventory/AddInventory/AddInventory";
import supplierApi from "../../../api/supplierApi";
import { CartMiniTableRow } from "../../../components/MiniTableRow/MiniTableRow";

// FILE này xử lý state -> connect search bar, table, với summary lại + quản lý chọn cart

const Import = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedBranch, setSelectedBranch] = useState({});
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch = info.branch;
  const user_uuid = useSelector((state) => state.info.user.uuid);

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

  // local storage
  const loadLocalStorage = () => {
    if (window.localStorage.getItem("importListData")) {
      const data = JSON.parse(window.localStorage.getItem("importListData"));
      if (data.user_uuid === user_uuid) {
        return data.cartList;
      }
    }

    return [
      {
        supplier: null,
        cartItem: [],
        total_amount: 0,
        paid_amount: 0,
        discount: 0,
        payment_method: "cash",
      },
    ];
  };
  const [cartList, setCartList] = React.useState(loadLocalStorage());

  useEffect(() => {
    window.localStorage.setItem(
      "importListData",
      JSON.stringify({ user_uuid: user_uuid, cartList: cartList })
    );
  }, [cartList]);

  //// ----------II. FUNCTION
  // 1.Cart
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [addProduct, setAddProduct] = useState(false);
  const [isUpdateTotalAmount, setIsUpdateTotalAmount] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState([]);

  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Nhập hàng thất bại",
  });

  useEffect(() => {
    updateTotalAmount();
  }, [isUpdateTotalAmount]);

  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await supplierApi.getSuppliers(store_uuid);
      setSuppliers(response.data);
    };

    fetchSupplier();
  }, []);

  const [reloadSupplier, setReloadSupplier] = useState(false);
  useEffect(() => {
    const fetchSupplier = async () => {
      const response = await supplierApi.getSuppliers(store_uuid);
      setSuppliers(response.data);
    };

    fetchSupplier();
  }, [reloadSupplier]);

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
        supplier: null,
        cartItem: [],
        total_amount: 0,
        paid_amount: 0,
        discount: 0,
        payment_method: "cash",
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
          supplier: null,
          cartItem: [],
          total_amount: "0",
          paid_amount: "0",
          discount: "0",
          payment_method: "cash",
        },
      ]);
      setSelectedIndex(0);
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
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
      (item) => item.uuid === selectedOption.uuid
    );
    let item = cartList[selectedIndex].cartItem.find(
      (item) => item.uuid === selectedOption.uuid
    );

    if (!item) {
      let newCartItem = {
        id: cartList[selectedIndex].cartItem.length,
        uuid: selectedOption.uuid,
        quantity: selectedOption.has_batches ? 0 : 1,
        bar_code: selectedOption.bar_code,
        product_code: selectedOption.product_code,
        unit_price: selectedOption.standard_price,
        img_url: selectedOption.img_url,
        name: selectedOption.name,
        has_batches: selectedOption.has_batches,
        batches: selectedOption.batches,
      };

      let newCartList = update(cartList, {
        [selectedIndex]: { cartItem: { $push: [newCartItem] } },
      });
      setCartList(newCartList);
      setIsUpdateTotalAmount(!isUpdateTotalAmount);
      return;
    }

    if (!item.has_batches) {
      handleChangeItemQuantity(
        selectedOption.uuid,
        cartList[selectedIndex].cartItem[itemIndex].quantity + 1
      );
    }
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
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );
    let item = cartList[selectedIndex].cartItem.find(
      (item) => item.uuid === itemUuid
    );
    if (newQuantity === 0 && !item.has_batches) {
      handleDeleteItemCart(itemUuid);
      return;
    }

    let newCartList = [...cartList];
    newCartList[selectedIndex].cartItem[itemIndex].quantity = newQuantity;
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

  const handleSelectSupplier = (selectedSupplier) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { supplier: { $set: selectedSupplier } },
    });
    setCartList(newCartList);
  };

  const handleUpdatePaidAmount = (amount) => {
    let newCartList = update(cartList, {
      [selectedIndex]: { paid_amount: { $set: amount } },
    });

    setCartList(newCartList);
  };

  const handleUpdateBatches = (itemUuid, selectedBatches) => {
    let itemIndex = cartList[selectedIndex].cartItem.findIndex(
      (item) => item.uuid === itemUuid
    );

    if (itemIndex === -1) return;
    const newCartList = [...cartList];
    newCartList[selectedIndex].cartItem[itemIndex].selectedBatches =
      selectedBatches;

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

    newCartList = update(newCartList, {
      [selectedIndex]: {
        paid_amount: { $set: total - cartList[selectedIndex].discount },
      },
    });

    setCartList(newCartList);
  };

  const handleConfirm = async () => {
    let cart = cartList[selectedIndex];

    // let d = new Date();
    // let importTime = d.getFullYear() + '-' + (d.getMonth() + 1).toString()  + '-' + d.getDate() + ' '
    //                 + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    var emptyCart = cart.cartItem.filter((item) => item.quantity).length === 0;
    if (emptyCart) {
      setOpenSnack(true);
      setSnackStatus({
        style: "error",
        message: "Giỏ hàng trống",
      });

      setOpenSnack(true);
      // console.log(err);
    } else {
      let d = moment.now() / 1000;
      let importTime = moment
        .unix(d)
        .format("YYYY-MM-DD HH:mm:ss", { trim: false });

      let body = {
        supplier_uuid: cart.supplier ? cart.suplier.uuid : "",
        total_amount: cart.total_amount.toString(),
        payment_method: cart.payment_method,
        paid_amount: cart.paid_amount,
        discount: cart.discount.toString(),
        status:
          Number(cart.total_amount) - Number(cart.discount) >=
          Number(cart.paid_amount)
            ? "debt"
            : "closed",
        details: cart.cartItem.map((item) => ({
          ...item,
          selectedBatches: item.selectedBatches.map((batch) => ({
            ...batch,
            returned_quantity: 0,
          })),
        })),
        import_date: importTime,
      };
      try {
        let res = await purchaseOrderApi.addInventory(
          store_uuid,
          branch.uuid,
          body
        );
        setSnackStatus({
          style: "success",
          message: "Nhập hàng thành công: " + res.data.purchase_order_code,
        });
        setOpenSnack(true);

        handlePrint();
        handleDelete(selectedIndex);
      } catch (err) {
        setSnackStatus({
          style: "error",
          message: "Nhập hàng thất bại! ",
        });
        setOpenSnack(true);
        console.log(err);
      }
    }
  };

  //print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //   }
  // };

  const [barcodeChecked, setBarcodeChecked] = useState(true);
  const handleSwitchChange = () => {
    setBarcodeChecked(!barcodeChecked);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <AddInventory
        open={addProduct}
        handleClose={() => setAddProduct(false)}
        setReload={() => {}}
      />{" "}
      <SnackBarGeneral
        handleClose={handleCloseSnackBar}
        open={openSnack}
        status={snackStatus}
      />
      {/* 1. TABLE CARD (left) */}
      <Grid item xs={12} sm={8}>
        <Card className={classes.root}>
          <Box
            style={{
              padding: xsScreen ? 10 : 30,
              minHeight: "80vh",
              paddingBottom: 0,
            }}
          >
            <Box style={{ height: xsScreen ? null : "70vh" }}>
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
                    <Typography variant="h3"> Nhập hàng </Typography>
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
                      isCart={false}
                    />
                  </ListItem>
                </Grid>
                <Grid>
                  <Grid container alignItems="center">
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={barcodeChecked}
                            onChange={handleSwitchChange}
                            color="primary"
                          />
                        }
                        label={"Dùng mã vạch"}
                      />
                    </Grid>
                    <Grid item>
                      {barcodeChecked ? (
                        <SearchBarCode
                          handleSearchBarSelect={handleSearchBarSelect}
                        />
                      ) : (
                        <SearchProduct
                          handleSearchBarSelect={handleSearchBarSelect}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      <ButtonBase
                        sx={{ borderRadius: "1px" }}
                        onClick={() => {
                          setAddProduct(true);
                        }}
                        style={{ marginLeft: 10 }}
                      >
                        <Avatar
                          variant="rounded"
                          className={classes.headerAvatar}
                        >
                          <Tooltip title="Thêm sản phẩm">
                            <AddIcon stroke={1.5} size="1.3rem" />
                          </Tooltip>
                        </Avatar>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* 1.2 TABLE */}
              {!mode ? (
                !xsScreen ? (
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
                          <ImportRow
                            key={`${row.uuid}_index`}
                            row={row}
                            handleDeleteItemCart={handleDeleteItemCart}
                            handleChangeItemPrice={handleChangeItemPrice}
                            handleChangeItemQuantity={handleChangeItemQuantity}
                            handleUpdateBatches={handleUpdateBatches}
                          />
                        );
                      })}
                    </TableBody>
                  </TableWrapper>
                ) : (
                  cartList[selectedIndex].cartItem.map((row, index) => {
                    return (
                      <CartMiniTableRow
                        row={row}
                        handleDeleteItemCart={handleDeleteItemCart}
                        handleChangeItemPrice={handleChangeItemPrice}
                        handleChangeItemQuantity={handleChangeItemQuantity}
                      />
                    );
                  })
                )
              ) : (
                <MenuProduct />
              )}
            </Box>
            {/* 1.3 CHANGE MODE  */}
            {/* <FormControlLabel
              control={<Switch checked={mode} onChange={handleChangeMode} />}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: -10,
                marginTop: 10,
              }}
            /> */}
          </Box>
        </Card>
      </Grid>
      {xsScreen ? <CartBottom numberItem={2} /> : null}
      {/* 2.SUMMARY CARD (right) */}
      <Grid item xs={12} sm={4} className={classes.root}>
        <Card className={classes.root}>
          <Box style={{ padding: 0, minHeight: "80vh" }}>
            {!mode ? (
              /* Viết hàm tính toán sau dựa trên cartData ... hiện tại đang set cứng giá trị */
              <ImportSummary
                setSelectedBranch={setSelectedBranch}
                selectedBranch={selectedBranch}
                cartData={cartList[selectedIndex]}
                handleSelectSupplier={handleSelectSupplier}
                handleUpdateDiscount={handleUpdateDiscount}
                handleUpdatePaidAmount={handleUpdatePaidAmount}
                handleUpdatePaymentMethod={handleUpdatePaymentMethod}
                handleConfirm={handleConfirm}
                currentSupplier={cartList[selectedIndex].supplier}
                mode={mode}
                currentBranch={branch}
                suppliers={suppliers}
                reloadSuppliers={() => setReloadSupplier(!reloadSupplier)}
              />
            ) : (
              <ImportSummary
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
                      return <ImportRowMini row={row} />;
                    })}
                  </TableBody>
                </TableContainer>
              </ImportSummary>
            )}
          </Box>
        </Card>
      </Grid>
      {/* 3. Receipt */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ImportReceiptPrinter cart={cartList[selectedIndex]} />
        </div>
      </div>
    </Grid>
  );
};

export default Import;
