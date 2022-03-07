import React from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  ListItem
} from "@material-ui/core";
import {calculateTotalQuantity} from "../../../../components/TableCommon/util/sortUtil"

import AddCustomer from "../../../../views/ManagerView/Customer/AddCustomer/AddCustomer";
import giftBox from "../../../../assets/img/icon/giftbox.png";
// import giftBox from "../../../../assets/img/icon/gift.png";
// import giftBox from "../../../../assets/img/icon/gift2.png";

import SearchCustomer from "../../../SearchBar/SearchCustomer";

//import project
import * as Input from "../../../TextField/NumberFormatCustom";

// import VNDInput from '../../../TextField/NumberFormatCustom';
// import { VNDFormat,ThousandFormat } from '../../../TextField/NumberFormatCustom';

import VNDInput from "../../../TextField/NumberFormatCustom";
import {
  VNDFormat,
  ThousandFormat,
} from "../../../TextField/NumberFormatCustom";
import { useDispatch } from "react-redux";
import { statusAction } from "../../../../store/slice/statusSlice";
import DiscountPopUp from "../../../../views/SalesView/Cart/DiscountPopup/DiscountPopup"
const useStyles = makeStyles((theme) =>
  createStyles({
    marginBox: {
      marginTop: 30,
    },
    marginRow: {
      marginTop: 5,
    },
    hidden: {
      display: "none",
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
  })
);
const CartSummary = (props) => {
  const {
    cartData,
    handleSelectCustomer,
    currentCustomer,
    handleUpdateDiscount,
    handleUpdatePaidAmount,
    handleUpdatePaymentMethod,

    handleCheckDelivery,

    handleSearchCustomer,

    handleConfirm,
    selectedBranch,
    setSelectedBranch,
    customers,
    currentBranch,
    mode,
    reloadCustomers,
    discountData,
    
  } = props;

  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const handleClose = (status) => {
    if ((status = "Success")) {
      setOpen(false);
      reloadCustomers();
      dispatch(statusAction.successfulStatus("Thêm khách hàng thành công"));
    } else {
      dispatch(statusAction.failedStatus("Thêm khách hàng thất bại"));
    }
  };

  //mode 2: popup
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const handleClickOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  // giao hang
  const [deliver, setDeliver] = React.useState(false);

  const handleChangeDeliver = (event) => {
    setDeliver(event.target.checked);
  };


  // so tien khach đưa
  const [customerMoney, setCustomerMoney] = React.useState("0");
  
  
  // React.useEffect(() => {console.log(currentBranch)})

  // console.log("cartItem")
  // console.log(cartData.cartItem)
  // var emptyCart =  cartData.cartItem.length === 0;

  // var correctQuantity = cartData.cartItem.every(function(element, index) {
  //     console.log(element);
  //     if(element.quantity > element.branch_quantity)
  //         return false;
  //     else
  //         return true;
  // });
  // console.log("correctQuantity")
  // console.log(correctQuantity)
  // console.log("emptyCart")
  // console.log(emptyCart)


  // Discount
  // let haveDiscount = discountData.every(row => row.detail.totalCost > parseInt(cartData.total_amount))
  // let haveDiscount = discountData.some(row => row.detail.map((i)=> i.totalCost) < parseInt(cartData.total_amount))
  function checkHaveDiscount  () {
        for (let i = 0; i < discountData.length; i++) {
            for (let j = 0; j < discountData[i]?.detail.length; j++) {
                if( discountData[i].detail[j].totalCost < parseInt(cartData.total_amount)){
                  return true;
                }
            }         
        }
        return false
  }
  let haveDiscount = checkHaveDiscount();
  const [openDiscount, setOpenDiscount] = React.useState(false);
  console.log("cartData",cartData)

  
  return (
    <Box style={{ padding: 30, minHeight: "80vh" }}>
      <Grid container direction="column" alignItems="flex-start" spacing={3}>
        <Grid container direction="row" justifyContent="space-between">
          {/* 1. BASIC INFO */}
          <Grid
            item
            xs={8}
            container
            direction="column"
            alignItems="flex-start"
          >
            <Typography variant="h5">Chi nhánh</Typography>
            <Typography variant="body2">{currentBranch.name}</Typography>
            {/* <BranchSelect 
                            setSelectedBranch={setSelectedBranch}
                            selectedBranch={selectedBranch}
                        /> */}
          </Grid>

          <Grid item xs={4} container direction="column" alignItems="flex-end">
            <Typography variant="body2">
              {new Date().toLocaleDateString("es-US")}
            </Typography>
            <Typography variant="body2">
              {new Date().toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>

        <div style={{ width: "100%" }}>
          <SearchCustomer
            handleClickOpen={handleClickOpen}
            handleSearchCustomer={handleSearchCustomer}
            customers={customers}
            selectedCustomer={
              currentCustomer ? currentCustomer : { name: "", phone: "" }
            }
            handleSearchBarSelect={handleSelectCustomer}
          />
        </div>

        <AddCustomer open={open} handleClose={handleClose} />

        {/* when change mode to menu product */}
        {props.children}

        {/* 2. PAYMENT INFO  */}
        {!mode ? (
          <>
            {/* 2.1 Mode 1 */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginBox}
            >
              <Typography variant="h5">Tổng số lượng hàng ({cartData.cartItem.length}) </Typography>
              <Typography variant="body2">
                <ThousandFormat
                  value={calculateTotalQuantity(cartData.cartItem)}
                ></ThousandFormat>
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginRow}
            >
              <div>
                <ListItem style={{padding: 0,margin:0}}>
                <Typography variant="h5">Tổng tiền hàng</Typography>
                {haveDiscount ? 
                <div onClick={()=>{setOpenDiscount(!openDiscount);console.log("hello")}}>
                    <img id="gift" src={require('../../../../assets/img/icon/giftbox.png').default} style={{height:16,width:16, marginLeft:10, marginTop:-3}} />

                </div>
                :null}
                
                </ListItem>
              
              </div>
              {openDiscount && <DiscountPopUp open={openDiscount} title="Khuyến mãi trên hóa đơn" onClose={()=>{setOpenDiscount(!openDiscount)}}/>}

              
              <Typography variant="body2">
                <VNDFormat value={cartData.total_amount} />
              </Typography>
            </Grid>


            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginRow}
            >
              <Typography variant="h5">Giảm giá</Typography>
              <VNDInput
                id="standard-basic"
                style={{ width: 90 }}
                size="small"
                inputProps={{ style: { textAlign: "right" } }}
                onChange={(e) => handleUpdateDiscount(e.target.value)}
              />
            </Grid>


            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginRow}
            >
              <Typography variant="h5">Tổng tiền</Typography>
              <Typography variant="body2">
                <VNDFormat
                  style={{ color: "#2096f3", fontWeight: 500 }}
                  value={cartData.total_amount - cartData.discount}
                />
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.marginRow}
            >
              <Typography variant="h5">Khách thanh toán</Typography>
              <VNDInput
                id="standard-basic"
                style={{ width: 90 }}
                // defaultPrice={(cartData.total_amount - cartData.discount).toString()}
                // defaultValue={(cartData.total_amount - cartData.discount).toString()}
                value={cartData.paid_amount}
                size="small"
                inputProps={{ style: { textAlign: "right" } }}
                onChange={(e) => handleUpdatePaidAmount(e.target.value)}
              />
            </Grid>

            {/* <Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.marginRow}>
                                <Typography variant="h5">
                                    Khách đưa
                                </Typography>
                                <VNDInput id="standard-basic" style={{ width: 90 }}
                                    // defaultValue={(cartData.total_amount - cartData.discount).toString()}
                                    defaultValue={cartData.total_amount - cartData.discount}
                                    // value={cartData.paid_amount}
                                    // value={cartData.total_amount - cartData.discount}
                                    size="small" inputProps={{ style: { textAlign: "right" } }}
                                    onChange={(e) => setCustomerMoney(e.target.value)} />
                            </Grid> */}

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.marginRow}
            >
              <Typography variant="h5">Tiền thối</Typography>
              {/* <Input.ThousandSeperatedInput
                                    id="standard-basic" style={{ width: 90 }}
                                    size="small" inputProps={{ style: { textAlign: "right" } }}
                                    value={Number(customerMoney) - cartData.paid_amount}
                                /> */}
              <Typography variant="body2">
                <VNDFormat
                  value={
                    cartData.paid_amount -
                    (cartData.total_amount - cartData.discount)
                  }
                />
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              className={classes.marginRow}
            >
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={cartData.payment_method}
                  onChange={(e)=>handleUpdatePaymentMethod(e.target.value)}
                >
                  <Grid container direction="row">
                    <FormControlLabel
                      labelPlacement="start"
                      value="card"
                      control={<Radio />}
                      label="Thẻ"
                    />
                    <FormControlLabel
                      labelPlacement="start"
                      value="cash"
                      control={<Radio />}
                      label="Tiền mặt"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Checkbox checked={cartData.delivery} onChange={(e)=>handleCheckDelivery(e.target.checked)} />
                }
                label="Giao hàng"
              />
            </Grid>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              style={{ marginTop: 40 }}
              onClick={handleConfirm}
            >
              Thanh toán
            </Button>
          </>
        ) : (
          /* 2.2 Mode 2 */
          <>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginRow}
            >
              <Typography variant="h5">Tổng tiền hàng</Typography>
              <Typography variant="body2">500.000</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              className={classes.marginRow}
            >
              <Typography variant="h5">Giảm giá</Typography>
              <Input.ThousandSeperatedInput
                id="standard-basic"
                style={{ width: 90 }}
                size="small"
                inputProps={{ style: { textAlign: "right" } }}
              />
            </Grid>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              style={{ marginTop: 20 }}
              onClick={handleClickOpenPopUp}
            >
              <Grid container direction="row" justifyContent="space-between">
                <Grid item>Thanh toán </Grid>
                <Grid item>500.000 </Grid>
              </Grid>
            </Button>
            <Dialog
              open={openPopUp}
              onClose={handleClosePopUp}
              aria-labelledby="form-dialog-title"
            >
              <CheckoutPopUp />
            </Dialog>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default CartSummary;

const CheckoutPopUp = (props) => {
  const { onClose, handleChangePayment, payment } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <Box style={{ marginTop: 20, marginLeft: 15, marginBottom: 10 }}>
        <Typography className={classes.headerTitle} variant="h5">
          Trả tiền NCC
        </Typography>
      </Box>
      <DialogContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          className={classes.marginRow}
        >
          <Typography variant="h5">Tổng tiền hàng</Typography>
          <Typography variant="body2">500.000</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.marginRow}
        >
          <Typography variant="h5" style={{ paddingRight: 50 }}>
            Đã trả CNN
          </Typography>
          <Input.ThousandSeperatedInput
            id="standard-basic"
            style={{ width: 90 }}
            size="small"
            inputProps={{ style: { textAlign: "right" } }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.marginRow}
        >
          <Typography variant="h5">Công nợ</Typography>
          <Input.ThousandSeperatedInput
            id="standard-basic"
            style={{ width: 90 }}
            size="small"
            inputProps={{ style: { textAlign: "right" } }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          className={classes.marginRow}
        >
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={payment}
              onChange={handleChangePayment}
            >
              <Grid container direction="row">
                <FormControlLabel
                  labelPlacement="start"
                  value="card"
                  control={<Radio />}
                  label="Thẻ"
                />
                <FormControlLabel
                  labelPlacement="start"
                  value="cash"
                  control={<Radio />}
                  label="Tiền mặt"
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          fullWidth
          color="primary"
          style={{ marginTop: 40 }}
        >
          Thanh toán
        </Button>
      </DialogActions>
    </>
  );
};
