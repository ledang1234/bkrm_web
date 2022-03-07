import React, { useEffect, useState } from "react";
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
  Switch,
  FormControlLabel
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import update from "immutability-helper";
import { useSelector } from "react-redux";
import SearchBarCode from "../SearchBar/SearchBarCode"
import moment from "moment";
import { Input } from "@mui/material";
import { VNDFormat,ThousandFormat } from "../TextField/NumberFormatCustom";
import useStyles from "../TableCommon/style/mainViewStyle";

import * as HeadCells from "../../assets/constant/tableHead";
import SearchProduct from "../SearchBar/SearchProduct";
import TableHeader from "../TableCommon/TableHeader/TableHeader";
import TableWrapper from "../TableCommon/TableWrapper/TableWrapper";
import inventoryCheckApi from "../../api/inventoryCheckApi";
import SnackBarGeneral from "../SnackBar/SnackBarGeneral";
import InventoryCheckSummary from "../CheckoutComponent/CheckoutSummary/InventoryCheckSumary/InventroyCheckSumary";
import SimpleModal from "../Modal/ModalWrapper";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ButtonQuantity from "../Button/ButtonQuantity";
function InventoryCheckPopUp({
  classes,
  setReload,
  handleCloseReturn,
  success,
  failure,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
  const branch_uuid = info.branch.uuid;
  const user_name = info.user.name;
  const branch_name = info.branch.name;
  const [isUpdateTotalAmount, setIsUpdateTotalAmount] = React.useState(false);
  const [inventoryCheck, setInventoryCheck] = React.useState({
    total_amount: 0,
    details: [],
    note: "",
  });

  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Kiểm kho thất bại",
  });

  useEffect(() => {
    updateTotalAmount();
  }, [isUpdateTotalAmount]);

  const updateTotalAmount = () => {
    let total = 0;
    inventoryCheck.details.forEach((item) => {
      total +=
        (Number(item.real_quantity) - Number(item.branch_quantity)) *
        Number(item.standard_price);
    });

    const newInventoryCheck = update(inventoryCheck, {
      total_amount: { $set: total },
    });
    setInventoryCheck(newInventoryCheck);
  };

  const handleDeleteItem = (itemId) => {
    const itemIndex = inventoryCheck.details.findIndex(
      (item) => item.id === itemId
    );
    const newInventoryCheck = update(inventoryCheck, {
      details: { $splice: [[itemIndex, 1]] },
    });
    setInventoryCheck(newInventoryCheck);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleItemRealQuantityChange = (itemId, newQuantity) => {
    const itemIndex = inventoryCheck.details.findIndex(
      (item) => item.id === itemId
    );

    if (newQuantity === itemIndex.real_quantity) {
      handleDeleteItem(itemId);
      return;
    }

    const newInventoryCheck = update(inventoryCheck, {
      details: {
        [itemIndex]: {
          real_quantity: { $set: newQuantity },
        },
      },
    });
    setInventoryCheck(newInventoryCheck);
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };

  const handleConfirm = () => {
    var emptyCart = inventoryCheck.details.length === 0;
    if (emptyCart) {
      setOpenSnack(true);
      setSnackStatus({
        style: "error",
        message: "Kiểm kho trống",
      });
    } else {
      setOpen(true);
    }
  };

  const handleConfirmBalance = async () => {
    const d = moment.now() / 1000;

    const export_date = moment
      .unix(d)
      .format("YYYY-MM-DD HH:mm:ss", { trim: false });

    const body = {
      total_amount: inventoryCheck.total_amount,
      details: inventoryCheck.details.map((detail) => ({
        product_id: detail.id,
        quantity: Number(detail.real_quantity) - Number(detail.branch_quantity),
        unit_price: detail.standard_price,
        uuid: detail.uuid,
        branch_inventory: detail.branch_quantity,
      })),
      note: inventoryCheck.note,
    };

    console.log(body);

    try {
      const res = await inventoryCheckApi.create(store_uuid, branch_uuid, body);
      handleCloseReturn();
      success(res.data?.inventory_check_code);
    } catch (err) {
      failure();
      console.log(err);
    }
  };
  const handleCloseSnackBar = (event, reason) => {
    setOpenSnack(false);
  };

  const handleProductSelect = (product) => {
    
    console.log(inventoryCheck.details.find(d => d.id === product.id))
    const newDetails = [
      ...inventoryCheck.details,
      {
        ...product,
        // real_quantity: 0,
        real_quantity: Number(product.branch_quantity),
      },
    ];
    setInventoryCheck({ ...inventoryCheck, details: newDetails });
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  };
  const [barcodeChecked, setBarcodeChecked] = useState(true)
  const handleSwitchChange = () => {
    setBarcodeChecked(!barcodeChecked)
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <ListItem
            style={{ paddingTop: 20, marginBottom: -20, marginLeft: 25 }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="h3" style={{ marginRight: 20 }}>
                  Kiểm kho
                </Typography></Grid>
              <Grid item>
                <FormControlLabel
                  control={<Switch
                    checked={barcodeChecked} onChange={handleSwitchChange}
                    color="primary" />}
                  label={"Dùng mã vạch"}
                />
              </Grid>
              <Grid item>
                {
                  barcodeChecked ?
                    <SearchBarCode handleSearchBarSelect={handleProductSelect} /> :
                    <SearchProduct
                      handleSearchBarSelect={handleProductSelect}
                    />
                }
              </Grid>
            </Grid>
          </ListItem>
        </Grid>

        <Grid item>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseReturn}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
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
                <TableWrapper isCart>
                  <TableHeader
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headerData={HeadCells.InventoryCheckHeadCells}
                  />
                  <TableBody>
                    {inventoryCheck.details.map((detail, index) => (
                      <InventoryCheckTableRow
                        handleItemRealQuantityChange={
                          handleItemRealQuantityChange
                        }
                        detail={detail}
                        handleDeleteItem={handleDeleteItem}
                      />
                    ))}
                  </TableBody>
                </TableWrapper>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} className={classes.card}>
            <Card className={classes.card}>
              <InventoryCheckSummary
                handleConfirm={handleConfirm}
                data={inventoryCheck}
                userName={user_name}
                branchName={branch_name}
              />
            </Card>
          </Grid>

          <SimpleModal
            title="Cân bằng kho"
            open={open}
            handleClose={handleClose}
          >
            <Typography style={{ marginTop: 10, marginBottom: 10 }}>
              Cân bằng kho sẽ thay đổi tồn kho hiện tại của hàng hóa được lưu
              trong hệ thống.
            </Typography>
            <Typography style={{ fontWeight: 500 }}>
              Bạn có chắc chắn muốn Cân bằng kho?
            </Typography>

            <Button
              onClick={() => handleClose()}
              variant="contained"
              size="small"
              color="secondary"
            >
              Huỷ
            </Button>
            <Button
              style={{ marginTop: 40 }}
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                handleConfirmBalance();

                // handleCloseReturn();
              }}
            >
              Xác nhận
            </Button>
          </SimpleModal>
        </Grid>
      </DialogContent>
    </>
  );
}

export default InventoryCheckPopUp;

function InventoryCheckTableRow({ detail, handleItemRealQuantityChange, handleDeleteItem }) {
  const classes = useStyles();
  const [show, setShow] = React.useState("none");
  useEffect(() => { }, [detail]);

  const onChangeRealQuantity = (newQuantity) => {
    handleItemRealQuantityChange(detail.id, newQuantity);
  };
  return (
    <TableRow hover key={detail.is}>
      <TableCell align="left" style={{ width: 5 }}>
        {detail.product_code}
      </TableCell>
      {/* <TableCell align="left">{row.id}</TableCell> */}
      <TableCell align="left">{detail.name}</TableCell>
      <TableCell align="right"> <ThousandFormat  value={detail.branch_quantity} /></TableCell>
      <TableCell align="center">
        {/* <Input
          id="standard-basic"
          style={{ width: 70 }}
          size="small"
          inputProps={{ style: { textAlign: "right" } }}
          defaultValue={detail.branch_quantity}
          onChange={(e) => onChangeRealQuantity(e.target.value)}
        /> */}
        <ButtonQuantity
          quantity={detail.real_quantity}
          setQuantity={onChangeRealQuantity}
          show={show}
          setShow={setShow}
          limit={detail.quantity}
          isReturn={false}
        />
      </TableCell>

      <TableCell align="center">
        <ThousandFormat  value={Number(detail.real_quantity) - Number(detail.branch_quantity)} />
      </TableCell>

      <TableCell align="center" className={classes.boldText}>
        <VNDFormat value={(Number(detail.real_quantity) - Number(detail.branch_quantity)) *
          detail.standard_price} />
      </TableCell>
      <TableCell align="right" className={classes.boldText}>
          <IconButton aria-label="expand row" size="small"style={{marginLeft:-25}} >
            <DeleteForeverOutlinedIcon onClick={() => handleDeleteItem(detail.id)}/>
          </IconButton>
      </TableCell>
    </TableRow>
  );
}
