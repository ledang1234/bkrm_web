import React, { useRef, useState, useEffect } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";
import { ReceiptPrinter } from "../../../../../components/ReceiptPrinter/ReceiptPrinter";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { calculateTotalQuantity } from "../../../../../components/TableCommon/util/sortUtil";
// import library
import {
  Dialog,
  Card,
  DialogContent,
  Box,
  Tooltip,
  Chip,
  Grid,
  TableHead,
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
// import icon
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PrintTwoToneIcon from "@material-ui/icons/PrintTwoTone";
import GetAppTwoToneIcon from "@material-ui/icons/GetAppTwoTone";
import CloseIcon from "@material-ui/icons/Close";

// import project
import { grey } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import {
  StyledMenu,
  StyledMenuItem,
} from "../../../../../components/Button/MenuButton";
import InvoiceReturnPopUp from "../../../../../components/PopUpReturn/InvoiceReturnPopUp/InvoiceReturnPopUp";

import orderApi from "../../../../../api/orderApi";
import { VNDFormat } from "../../../../../components/TextField/NumberFormatCustom";
import PayRemaining from "../../../../../components/Modal/PayRemaining";
import invoiceApi from "../../../../../api/invoiceApi";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(2),
      },
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
    typo: {
      marginBottom: 20,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    card: {
      background: theme.customization.mode === "Light" ? null : grey[800],
      borderRadius: theme.customization.borderRadius,
      color: "#000000",
      borderWidth: 2,
    },
    background: {
      background:
        theme.customization.mode === "Light"
          ? theme.customization.primaryColor[50]
          : grey[700],
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

function InvoiceDetail(props) {
  const { row, openRow, onReload } = props.parentProps;
  const { isMini } = props;

  //  tam thoi
  const currentUser = "Phuong Gia Le";

  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const classes = useStyles(theme);
  const [reload, setReload] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseReturn = () => {
    setOpen(false);
  };

  const [order, setOrder] = useState({
    customer: { name: "" },
    created_by_user: { name: "" },
    branch: null,
    details: [],
  });

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await orderApi.getOrder(store_uuid, row.uuid);
        // console.log(res.data)
        setOrder(res.data);
      } catch (error) {
        setOrder({
          customer: { name: "" },
          created_by_user: { name: "" },
          branch: null,
          details: [],
        });
      }

      // },
      //   [props.parentProps.openRow],
      // );
    };
    if (openRow === row.uuid) {
      loadData();
    }
  }, [props.parentProps.openRow, reload]);
  const debtAmount = order.total_amount - order.paid_amount;
  const [openPayRemaining, setOpenPayRemaining] = useState(false);
  const editInventoryOrderApiCall = async (
    store_uuid,
    branch_uuid,
    uuid,
    body
  ) => {
    return orderApi.editOrderApi(store_uuid, branch_uuid, uuid, body);
  };

  //print

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Collapse
      in={isMini ? true : openRow === row.uuid}
      timeout="auto"
      unmountOnExit
    >
      <PayRemaining
        onReload={props.parentProps.onReload}
        reloadDetail={() => setReload(!reload)}
        uuid={row.uuid}
        debt={debtAmount}
        paid={Number(row.paid_amount)}
        title={
          <Typography variant="h4">
            Thu thêm hóa đơn <i>{row.purchase_order_code}</i>
          </Typography>
        }
        open={openPayRemaining}
        handleClose={() => setOpenPayRemaining(false)}
        editApiCall={editInventoryOrderApiCall}
      />
      {/* <Collapse in={true } timeout="auto" unmountOnExit> */}
      <Box margin={1}>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          className={classes.typo}
        >
          {row.name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs={12} sm={5}>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={5}>
                <Typography variant="h5" gutterBottom component="div">
                  Mã hoá đơn
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.order_code}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={5}>
                <Typography variant="h5" gutterBottom component="div">
                  Ngày bán{" "}
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.creation_date}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={5}>
                <Typography variant="h5" gutterBottom component="div">
                  Khách hàng
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {order.customer ? order.customer.name : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={5}>
                <Typography variant="h5" gutterBottom component="div">
                  Người bán
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {order.created_by_user ? order.created_by_user.name : ""}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={7} sm={4}>
                <Typography variant="h5" gutterBottom component="div">
                  Trạng thái
                </Typography>
              </Grid>
              <Grid item xs={3} sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {/* Cần thu <VNDFormat value={debtAmount} /> */}
                  {debtAmount > 0 ? "Cần thu thêm " : "Trả đủ"}
                  {debtAmount > 0 ? <VNDFormat value={debtAmount} /> : null}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {debtAmount > 0 ? (
                  <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={() => setOpenPayRemaining(true)}
                  >
                    Trả tiếp
                  </Button>
                ) : null}
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={4}>
                <Typography variant="h5" gutterBottom component="div">
                  Tổng tiền hoá đơn
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  <VNDFormat value={order.total_amount} />
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={4}>
                <Typography variant="h5" gutterBottom component="div">
                  Chi nhánh thực hiện
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {order.branch ? order.branch.name : ""}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={7} sm={4}>
                <Typography variant="h5" gutterBottom component="div">
                  Phương thức thanh toán
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.payment_method === "cash" ? "Tiền mặt" : "Thẻ"}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ marginTop: 30 }}
        >
          Danh sách sản phẩm
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>Mã SP</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Mã vạch</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Đổi trả</TableCell>
              <TableCell align="right">Giá bán</TableCell>
              <TableCell align="right">Thành tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.details.map((detail) => (
              <TableRow key={detail.product_id}>
                <TableCell component="th" scope="row">
                  {detail.product_code}
                </TableCell>
                <TableCell>{detail.name}</TableCell>
                <TableCell>{detail.bar_code}</TableCell>
                <TableCell align="right">
                  <div>
                    {detail.quantity}
                    <div>
                      {detail.batches
                        ? JSON.parse(detail.batches).map((batch) => (
                            <Chip
                              size="small"
                              label={`${
                                batch?.batch_code ? batch?.batch_code : "Mới"
                              } - ${
                                batch?.expiry_date ? batch?.expiry_date : ""
                              } - ${batch.additional_quantity}`}
                              key={batch.id}
                              color={batch.is_new ? "primary" : "secondary"}
                              variant="outlined"
                            />
                          ))
                        : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">{detail.returned_quantity}</TableCell>
                <TableCell align="right">
                  <VNDFormat value={detail.unit_price} />
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 700 }}>
                  <VNDFormat value={detail.quantity * detail.unit_price} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          className={classes.background}
          style={{
            padding: 10,
            borderRadius: theme.customization.borderRadius,
            marginTop: 10,
          }}
        >
          <Grid container direction="column">
            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={7} sm={2}>
                {/* <Typography variant="h5" gutterBottom component="div">Tổng số lượng</Typography> */}
                <Typography variant="h5" gutterBottom component="div">
                  Tổng SL sản phẩm ({order.details.length})
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="body1" gutterBottom component="div">
                  {calculateTotalQuantity(order.details)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={7} sm={2}>
                <Typography variant="h5" gutterBottom component="div">
                  Tiền hàng
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="body1" gutterBottom component="div">
                  <VNDFormat value={row.total_amount} />
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={7} sm={2}>
                <Typography variant="h5" gutterBottom component="div">
                  Giảm giá
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="body1" gutterBottom component="div">
                  <VNDFormat value={row.discount} />
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={7} sm={2}>
                <Typography variant="h5" gutterBottom component="div">
                  Tổng tiền hoá đơn
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="body1" gutterBottom component="div">
                  <VNDFormat value={row.total_amount - row.discount} />
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent={"flex-end"}>
              <Grid item xs={7} sm={2}>
                <Typography variant="h5" gutterBottom component="div">
                  Khách đã trả
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2}>
                <Typography variant="body1" gutterBottom component="div">
                  <VNDFormat value={row.paid_amount} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid
          container
          direction="row"
          // justifyContent="flex-end"
          justifyContent={"flex-end"}
          style={{ marginTop: 20 }}
        >
          {/* Chỉ có nhân viên thực hiện nhập đơn đó  mới có thể xoá sửa */}
          {currentUser === row.employee ? (
            <>
              {" "}
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 15 }}
              >
                Sửa
              </Button>
              <Button
                variant="contained"
                size="small"
                style={{ marginLeft: 15 }}
              >
                Xoá
              </Button>{" "}
            </>
          ) : null}

          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 15 }}
            onClick={handleClickOpen}
          >
            Trả hàng
          </Button>

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            style={{ marginLeft: 10 }}
          >
            <MoreVertIcon />
          </IconButton>

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={() => handlePrint()}>
              <ListItemIcon style={{ marginRight: -15 }}>
                <PrintTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="In hoá đơn" />
            </StyledMenuItem>

            <StyledMenuItem>
              <ListItemIcon style={{ marginRight: -15 }}>
                <GetAppTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Xuất excel" />
            </StyledMenuItem>
          </StyledMenu>
        </Grid>
      </Box>
      {/* 
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleCloseReturn} aria-labelledby="form-dialog-title">
        <InvoiceReturnPopUp handleCloseReturn={handleCloseReturn} order={order} classes={classes} /> */}

      {/* 3. Receipt */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ReceiptPrinter cart={order} date={row.creation_date} />
        </div>
      </div>

      {/* Tra hang */}

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleCloseReturn}
        aria-labelledby="form-dialog-title"
      >
        <InvoiceReturnPopUp
          handleCloseReturn={handleCloseReturn}
          order={order}
          classes={classes}
          reloadDetail={() => setReload(!reload)}
          reload={onReload}
        />
      </Dialog>
    </Collapse>
  );
}

export default InvoiceDetail;
