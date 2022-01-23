import React, { useEffect } from "react";
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
import CloseIcon from "@material-ui/icons/Close";
import update from "immutability-helper";
import { useSelector } from "react-redux";
import moment from "moment";
import { Input } from "@mui/material";

import useStyles from "../TableCommon/style/mainViewStyle";

import * as HeadCells from "../../assets/constant/tableHead";
import SearchProduct from "../SearchBar/SearchProduct";
import TableHeader from "../TableCommon/TableHeader/TableHeader";
import TableWrapper from "../TableCommon/TableWrapper/TableWrapper";
import inventoryCheckApi from "../../api/inventoryCheckApi";
import SnackBarGeneral from "../SnackBar/SnackBarGeneral";
import InventoryCheckSummary from "../CheckoutComponent/CheckoutSummary/InventoryCheckSumary/InventroyCheckSumary";
function InventoryCheckPopUp({ classes, handleCloseReturn }) {
  
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
      total += (Number(item.real_quantity) - Number(item.branch_quantity)) * Number(item.standard_price);
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

  const handleConfirm = async () => {
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
      note: inventoryCheck.note
    };

    console.log(body);

    try {
      const res = await inventoryCheckApi.create(
        store_uuid,
        branch_uuid,
        body
      );
      setSnackStatus({
        style: "success",
        message: `Kiểm kho thành công ${res.data?.inventory_check_code}`,
      });
      setOpenSnack(true);
    } catch (err) {
      setSnackStatus({
        style: "error",
        message: "Kiểm kho thất bại! ",
      });
      setOpenSnack(true);
      console.log(err);
    }
  };
  const handleCloseSnackBar = (event, reason) => {
    setOpenSnack(false);
  };
  
  const handleProductSelect = (product) => {
    console.log(product)
    const newDetails = [...inventoryCheck.details, {
      ...product,
      real_quantity: 0,
    }]
    console.log(newDetails)
    setInventoryCheck({...inventoryCheck, details: newDetails})
    setIsUpdateTotalAmount(!isUpdateTotalAmount);
  }
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
            Kiểm kho
          </Typography>

          <SearchProduct handleSearchBarSelect={handleProductSelect} />
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
                        handleItemRealQuantityChange={handleItemRealQuantityChange}
                        detail={detail}
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
        </Grid>
      </DialogContent>
    </>
  );
}

export default InventoryCheckPopUp;


function InventoryCheckTableRow({ detail, handleItemRealQuantityChange }) {
  const classes = useStyles();
  const [show, setShow] = React.useState("none");
  useEffect(() => {}, [detail]);

  const onChangeRealQuantity = (newQuantity) => {
    handleItemRealQuantityChange(detail.id, newQuantity);
  };
  return (
    <TableRow hover key={detail.is}>
      <TableCell align="left" style={{ width: 5 }}>
        {detail.bar_code}
      </TableCell>
      {/* <TableCell align="left">{row.id}</TableCell> */}
      <TableCell align="left">{detail.name}</TableCell>
      <TableCell align="right">{detail.branch_quantity}</TableCell>
      <TableCell align="center">
        <Input
          id="standard-basic"
          style={{ width: 70 }}
          size="small"
          inputProps={{ style: { textAlign: "right" } }}
          defaultValue={detail.real_quantity}
          onChange={(e) => onChangeRealQuantity(e.target.value)}
        />
      </TableCell>

      <TableCell align="center">
        {Number(detail.real_quantity) - Number(detail.branch_quantity)}
      </TableCell>

      <TableCell align="center" className={classes.boldText}>
        {(Number(detail.real_quantity) - Number(detail.branch_quantity)) *
          detail.standard_price}
      </TableCell>
    </TableRow>
  );
}
