import ImportReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/ImportReturnSummary/ImportReturnSummary";

import React, { useEffect } from "react";
import useStyles from "../../../components/TableCommon/style/mainViewStyle";

//import library
import {
  Card,
  ListItem,
  DialogContent,
  Box,
  Grid,
  TableBody,
  Typography,
  Table,
  TableCell,
  TableRow,
  Collapse,
  Button,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";

import InvoiceReturnSummary from "../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary";

import CloseIcon from "@material-ui/icons/Close";
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";
import SearchProduct from "../../../components/SearchBar/SearchProduct";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import {
  getComparator,
  stableSort,
} from "../../../components/TableCommon/util/sortUtil";
import * as Input from "../../../components/TextField/NumberFormatCustom";
import ButtonQuantity from "../../../components/Button/ButtonQuantity";
import update from "immutability-helper";
import purchaseReturnApi from "../../../api/purchaseReturnApi";
import { useSelector } from "react-redux";
import moment from "moment";
import SnackBarGeneral from "../../SnackBar/SnackBarGeneral";

const InventoryReturnPopUp = (props) => {
  const { purchaseOrder, classes, handleCloseReturn } = props;

  // 2. Table sort
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("stt");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
   // redux
   const info = useSelector((state) => state.info);
   const store_uuid = info.store.uuid;
  const [isUpdateTotalAmount, setIsUpdateTotalAmount] = React.useState(false);
  const [purchaseReturn, setPurchaseReturn] = React.useState({
    purchase_order_code: purchaseOrder.purchase_order_code,
    purchase_order_id: purchaseOrder.id,
    branch: purchaseOrder.branch,
    supplier: purchaseOrder.supplier,
    supplier_id: purchaseOrder.supplier_id,
    branch_id: purchaseOrder.branch_id,
    total_amount: 0,
    details: purchaseOrder.details.map((detail) => ({
      ...detail,
      returnQuantity: detail.quantity,
      returnPrice: detail.unit_price,
    })),
    payment_method: "cash",
    paid_amount: "0",
  });

  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Nhập hàng thất bại",
  });


  useEffect(() => {
    updateTotalAmount();
  }, [isUpdateTotalAmount]);

  const updateTotalAmount = () => {
    let total = 0;
    purchaseReturn.details.forEach((item) => {
      total += item.returnPrice * item.returnQuantity;
    });

    let newPurchaseReturn = update(purchaseReturn, {
      total_amount: { $set: total },
    });
    setPurchaseReturn(newPurchaseReturn);
  };

  const handleDeleteItem = (itemId) => {
    let itemIndex = purchaseReturn.details.findIndex(
      (item) => item.id === itemId
    );
    let newPurchaseReturn = update(purchaseReturn, {
      details: { $splice: [[itemIndex, 1]] },
    });
    setPurchaseReturn(newPurchaseReturn);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleItemQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleDeleteItem(itemId);
      return;
    }
    let itemIndex = purchaseReturn.details.findIndex(
      (item) => item.id === itemId
    );
    let newPurchaseReturn = update(purchaseReturn, {
      details: {
        [itemIndex]: {
          returnQuantity: { $set: newQuantity },
        },
      },
    });
    setPurchaseReturn(newPurchaseReturn);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleProductPriceChange = (itemId, newPrice) => {
    let itemIndex = purchaseReturn.details.findIndex(
        (item) => item.id === itemId
      );
      let newPurchaseReturn = update(purchaseReturn, {
        details: {
          [itemIndex]: {
            returnPrice: { $set: newPrice },
          },
        },
      });
      setPurchaseReturn(newPurchaseReturn);
      setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handlePaidAmountChange = (paidAmount) => {
      let newPurchaseReturn = update(purchaseReturn, {paid_amount: {$set: paidAmount}})
      setPurchaseReturn(newPurchaseReturn);
  };

  const handlePaymentMethodChange = (paymentMethod) => {
    let newPurchaseReturn = update(purchaseReturn, {payment_method: {$set: paymentMethod}})
    setPurchaseReturn(newPurchaseReturn);
  };

  const handleConfirm = async () => {
   
    let d = moment.now()/1000;
    
    let export_date = moment.unix(d).format('YYYY-MM-DD HH:mm:ss',  { trim: false })


    let body = {
      purchase_order_uuid: purchaseOrder.uuid,
      supplier_id: purchaseReturn.supplier_id,
      total_amount: purchaseReturn.total_amount.toString(),
      payment_method: purchaseReturn.payment_method,
      paid_amount: purchaseReturn.paid_amount,
      status:
        purchaseReturn.payment_amount > purchaseReturn.paid_amount
          ? "closed"
          : "debt",
      details: purchaseReturn.details.map(detail => {
          return {
              product_id: detail.product_id,
              quantity: detail.returnQuantity,
              unit_price: detail.returnPrice,

          }
      }),
      export_date: export_date
    };
 
    try {
      let res = await purchaseReturnApi.removeInventory(
        store_uuid,
        purchaseOrder.branch.uuid,
        body
      );
      setSnackStatus({
        style: "success",
        message: "Trả hàng thành công: " + res.data.purchase_order_code,
      });
      setOpenSnack(true);
    
    } catch (err) {
      setSnackStatus({
        style: "error",
        message: "Trả hàng thất bại! ",
      });
      setOpenSnack(true);
      console.log(err);
    }
  };
  const handleCloseSnackBar = (event, reason) => {
    setOpenSnack(false);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
           <SnackBarGeneral
        handleClose={handleCloseSnackBar}
        open={openSnack}
        status={snackStatus}
      />

        <ListItem style={{ paddingTop: 20, marginBottom: -20, marginLeft: 25 }}>
          <Typography variant="h3" style={{ marginRight: 20 }}>
            Trả hàng nhập
          </Typography>

          {/* Search nayf chir search những sản phẩm trong hoá đơn thôi -> đổi lại thanh search khác sau */}
          {/* <SearchProduct /> */}
        </ListItem>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleCloseReturn}
        >
          <CloseIcon />
        </IconButton>
      </Grid>

      <DialogContent style={{ marginTop: 25 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={8}>
            <Card className={classes.card}>
              <Box style={{ padding: 30, minHeight: "75vh" }}>
                {/* JSON data attribute phải giongso table head id */}

                {/* <ListItem headCells={HeadCells.CartReturnHeadCells}  cartData={row.list} tableType={TableType.CART_RETURN} /> */}
                <TableWrapper isCart={true}>
                  <TableHeader
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headerData={HeadCells.ImportReturnHeadCells}
                  />
                  <TableBody>
                    {purchaseReturn.details.map((detail, index) => (
                      <ImportReturnTableRow 
                        handleProductPriceChange={handleProductPriceChange}
                        handleItemQuantityChange={handleItemQuantityChange}
                        detail={detail} />
                    ))}
                  </TableBody>
                </TableWrapper>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} className={classes.card}>
            <Card className={classes.card}>
              <ImportReturnSummary 
                data={purchaseReturn}
                handlePaidAmountChange={handlePaidAmountChange}
                handlePaymentMethodChange={handlePaymentMethodChange}
                handleConfirm={handleConfirm}
              />
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </>
  );
};

export default InventoryReturnPopUp;
const ImportReturnTableRow = ({ detail, handleProductPriceChange, handleItemQuantityChange }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState("none");
  useEffect(() => {}, [detail])

  const handleChangeQuantity = (newQuantity) => {
      handleItemQuantityChange(detail.id, newQuantity)
  }

  const handleChangePrice = (newPrice) => {
      handleProductPriceChange(detail.id, newPrice)
  }
  return (
    <TableRow hover key={detail.id}>
      <TableCell align="left" style={{ width: 5 }}>
        {detail.bar_code}
      </TableCell>
      {/* <TableCell align="left">{row.id}</TableCell> */}
      <TableCell align="left">{detail.name}</TableCell>
      <TableCell align="right">{detail.unit_price}</TableCell>
      <TableCell align="right">
        <Input.ThousandSeperatedInput
          id="standard-basic"
          style={{ width: 70 }}
          size="small"
          inputProps={{ style: { textAlign: "right" } }}
          defaultPrice={detail.returnPrice}
          onChange={(e) => handleChangePrice(e.target.value)}
        />
      </TableCell>

      <TableCell align="left" padding="none">
        <ButtonQuantity
          quantity={detail.returnQuantity}
          setQuantity={handleChangeQuantity}
          show={show}
          setShow={setShow}
          limit={detail.quantity}
        />
      </TableCell>

      <TableCell align="right" className={classes.boldText}>
        {Number(detail.returnQuantity) * Number(detail.returnPrice)}
      </TableCell>
    </TableRow>
  );
};
