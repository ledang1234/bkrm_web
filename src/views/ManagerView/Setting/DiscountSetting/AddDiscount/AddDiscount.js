import React, { useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import MultipleSelect from "../../../../../components/Select/MultipleSelect";
//import library
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Avatar,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  FormControlLabel,
  Checkbox,
  Divider,
  ButtonBase,
  Tooltip,
  CardHeader,
  Input,
  Chip,
} from "@material-ui/core";

//import project
import customerApi from "../../../../../api/customerApi";
import { useSelector } from "react-redux";
import MoreInfo from "../../../../../components/MoreInfo/MoreInfo";
import clsx from "clsx";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import promotionCouponApi from "../../../../../api/promotionCouponApi";
import { useDispatch } from "react-redux";
import { statusAction } from "../../../../../store/slice/statusSlice";

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
    ava: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    textField: {
      width: "100%",
    },
    input: {
      display: "none",
    },
    weight: {
      fontWeight: 500,
      color: "#000",
      fontSize: 13,
    },
    attrCard: {
      margin: "5px 0px 25px 0px",
      boxShadow: "none",
      border: "1px solid",
      borderColor: "#c9c9c9",
    },
    attrHead: {
      backgroundColor: "#E4E4E4",
      height: 40,
      color: "#000",
    },
  })
);

const AddDiscount = (props) => {
  const { handleClose, open } = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  // const [email, setEmail] = React.useState("");
  // const [phone, setPhone] = React.useState("");
  // const [address, setAddress] = React.useState("");
  // const [paymentInfo, setPaymentInfo] = React.useState("");

  //Khuyến mãi theo - Hình thức
  const [discountKey, setDiscountKey] = React.useState("invoice");
  const handleChangeKey = (event) => {
    setDiscountKey(event.target.value);
    setDiscountType(
      event.target.value === "invoice" ? "discountInvoice" : "sendGift"
    );
  };
  const [discountType, setDiscountType] = React.useState("discountInvoice");
  const handleChangeType = (event) => {
    setDiscountType(event.target.value);
  };

  // Khuyên mãi theo
  const [rowsInvoice, setRowsInvoice] = React.useState([
    {
      key: "1", //  ID dung để delete row , ko liên quan database
      totalCost: 0,
      number: 0,
      listItem: [],
      type: "VND", // "%"
    },
  ]);

  const handleChangeMoneyType = (index, value) => {
    console.log("rowsInvoice", rowsInvoice);
    let newArr = [...rowsInvoice];
    newArr[index].type = value;
    setRowsInvoice(newArr);
  };
  const handleChangeTotalCost = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].totalCost = event.target.value;
    setRowsInvoice(newArr);
  };
  const handleChangeValue = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].number = event.target.value;
    setRowsInvoice(newArr);
  };

  const addConditionRow = () => {
    let newArr = [...rowsInvoice];
    const d = new Date();
    newArr.push({
      key: d.toString(),
      totalCost: 0,
      number: 1,
      listItem: [],
      type: "VND",
    });
    setRowsInvoice(newArr);
  };

  const deleteAttr = (key) => {
    console.log("key", key);
    console.log("rowsInvoice", rowsInvoice);
    var newArr = [...rowsInvoice];
    newArr = newArr.filter((row) => row.key !== key);
    setRowsInvoice(newArr);
  };

  // Set Date Advance

  const [byMonth, setByMonth] = React.useState([]);
  const [byDay, setByDay] = React.useState([]);
  const [byDate, setByDate] = React.useState([]);
  const [byTime, setByTime] = React.useState([]);

  const handleByMonthChange = (event) => {
    setByMonth(event.target.value);
  };
  const handleDeleteMonth = (chipToDelete) => () => {
    setByMonth((chips) => byMonth.filter((chip) => chip !== chipToDelete));
  };
  const handleByDayChange = (event) => {
    setByDay(event.target.value);
  };
  const handleDeleteDay = (chipToDelete) => () => {
    setByDay((chips) => byDay.filter((chip) => chip !== chipToDelete));
  };

  const handleByDateChange = (event) => {
    setByDate(event.target.value);
  };
  const handleDeleteDate = (chipToDelete) => () => {
    setByDate((chips) => byDate.filter((chip) => chip !== chipToDelete));
  };

  const handleByTimeChange = (event) => {
    setByTime(event.target.value);
  };
  const handleDeleteTime = (chipToDelete) => () => {
    setByTime((chips) => byTime.filter((chip) => chip !== chipToDelete));
  };

  //Birthday
  const [checkedBirthday, setCheckedBirthday] = React.useState(false);
  const handleCheckedBirthday = (event) => {
    setCheckedBirthday(event.target.checked);
  };

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const body = {
        name: name,
        start_date: startDate,
        end_date: endDate,
        promotionCondition: JSON.stringify({
          discountKey,
          discountType,
          conditions: rowsInvoice,
          byMonth,
          byDate,
          byDay,
          byTime,
        }),
      };

      const res = await promotionCouponApi.createPromotion(store_uuid, body);
      dispatch(
        statusAction.successfulStatus(`Thêm khuyến mãi thành công ${res.data}`)
      );
      handleClose();
    } catch (err) {
      console.log(err);
      dispatch(statusAction.failedStatus(`Thêm khuyến mãi thất bại!`));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm chương trình khuyến mãi
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div>
          <TextField
            id="outlined-basic"
            label="Tên chương trình khuyến mãi (*)"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {name.length === 0 && (
            <Typography
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "red",
                fontStyle: "italic",
              }}
            >
              ( Bắt buộc )
            </Typography>
          )}
          <Card
            className={classes.attrCard}
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            <CardHeader
              title="Hình thức khuyến mãi"
              className={classes.attrHead}
            />

            {/* <Typography variant="h5" className={classes.text} style={{marginTop:20, marginBottom:10}}>Hình thức khuyến mãi</Typography> */}
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ padding: 10, paddingBottom: 15, marginBottom: 10 }}
            >
              <Grid container item sm={4} alignItems="center">
                <Grid item sm={6}>
                  <Typography
                    style={{
                      fontWeight: 500,
                      color: theme.customization.primaryColor[500],
                      marginRight: 10,
                    }}
                  >
                    Khuyến mãi theo{" "}
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <FormControl className={classes.formControl}>
                    <Select value={discountKey} onChange={handleChangeKey}>
                      <MenuItem value="invoice">Hoá đơn</MenuItem>
                      <MenuItem value="product">Sản phẩm</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item sm={4} alignItems="center">
                <Grid item sm={4}>
                  <Typography
                    style={{
                      fontWeight: 500,
                      color: theme.customization.primaryColor[500],
                      marginRight: 10,
                    }}
                  >
                    Hình thức
                  </Typography>
                </Grid>
                <Grid item sm={8}>
                  {discountKey === "invoice" ? (
                    <FormControl className={classes.formControl}>
                      <Select value={discountType} onChange={handleChangeType}>
                        <MenuItem value="discountInvoice">
                          Giảm giá hoá đơn
                        </MenuItem>
                        <MenuItem value="gift">Tặng hàng</MenuItem>
                        <MenuItem value="sendVoucher">Tặng voucher</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <FormControl className={classes.formControl}>
                      <Select value={discountType} onChange={handleChangeType}>
                        <MenuItem value="sendGift">Mua hàng tặng hàng</MenuItem>
                        <MenuItem value="priceByQuantity">
                          Giá bán theo số lượng mua
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <div
              style={{
                backgroundColor: theme.customization.primaryColor[50],
                height: 35,
                marginTop: 20,
                paddingTop: 10,
                paddingLeft: 15,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Grid container direction="row" justifyContent="">
                <Grid item style={{ width: 150, marginRight: 30 }}>
                  <Typography className={clsx(classes.text, classes.weight)}>
                    Tổng tiền hàng
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={clsx(classes.text, classes.weight)}
                    style={{ textAlign: "center" }}
                  >
                    Giá trị khuyến mại
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider
              classes={{ root: classes.divider }}
              style={{ marginLeft: 10, marginRight: 10 }}
            />

            {rowsInvoice.map((row, index) => {
              return (
                <>
                  <div
                    style={{ paddingLeft: 15, marginLeft: 10, marginRight: 10 }}
                  >
                    <Grid container direction="row" justifyContent="">
                      <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        style={{ width: 130, marginRight: 30, height: 40 }}
                      >
                        <Grid item>
                          {" "}
                          <Typography
                            style={{
                              marginRight: 10,
                              color: "#000",
                              fontSize: 13,
                            }}
                          >
                            {" "}
                            Từ{" "}
                          </Typography>{" "}
                        </Grid>
                        <Grid item>
                          {" "}
                          <TextField
                            style={{ width: 100 }}
                            onChange={(event) =>
                              handleChangeTotalCost(event, index)
                            }
                            value={row.totalCost}
                          />{" "}
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          item
                          container
                          direction="row"
                          alignItems="center"
                          style={{ height: 40 }}
                        >
                          <Grid item>
                            {" "}
                            <TextField
                              style={{ marginRight: 10, color: "#000" }}
                              onChange={(event) =>
                                handleChangeValue(event, index)
                              }
                              value={row.number}
                            />{" "}
                          </Grid>
                          <Grid item style={{ marginRight: 5 }}>
                            <ButtonBase
                              sx={{ borderRadius: "16px" }}
                              onClick={() =>
                                handleChangeMoneyType(index, "VND")
                              }
                            >
                              <Avatar
                                variant="rounded"
                                style={{
                                  width: theme.spacing(4),
                                  height: theme.spacing(3),
                                  background:
                                    row.type === "VND"
                                      ? theme.palette.primary.main
                                      : null,
                                }}
                              >
                                <Typography
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  VND
                                </Typography>
                              </Avatar>
                            </ButtonBase>
                          </Grid>
                          <Grid item>
                            <ButtonBase
                              sx={{ borderRadius: "16px" }}
                              onClick={() => handleChangeMoneyType(index, "%")}
                            >
                              <Avatar
                                variant="rounded"
                                style={{
                                  width: theme.spacing(4),
                                  height: theme.spacing(3),
                                  background:
                                    row.type === "%"
                                      ? theme.palette.primary.main
                                      : null,
                                }}
                              >
                                <Typography
                                  style={{ fontSize: 13, fontWeight: 500 }}
                                >
                                  %
                                </Typography>
                              </Avatar>
                            </ButtonBase>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-end"
                      >
                        <DeleteForeverTwoToneIcon
                          style={{ marginTop: -30 }}
                          onClick={() => {
                            deleteAttr(row.key);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </div>

                  <Divider
                    classes={{ root: classes.divider }}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                </>
              );
            })}

            <Button
              variant="outlined"
              size="small"
              color="primary"
              style={{
                marginLeft: 20,
                marginBottom: 15,
                marginTop: 10,
                textTransform: "none",
              }}
              startIcon={<AddIcon />}
              onClick={() => addConditionRow()}
            >
              Thêm điều kiện
            </Button>
          </Card>

          <Card
            className={classes.attrCard}
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            <CardHeader
              title="Thời gian áp dụng"
              className={classes.attrHead}
            />
            <div style={{ padding: 10 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={6}>
                  <TextField
                    id="startDate"
                    label="Từ"
                    type="date"
                    name="startDate"
                    defaultValue={startDate}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="endDate"
                    label="Đến"
                    type="date"
                    name="endDate"
                    defaultValue={endDate}
                    variant="outlined"
                    size="small"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Grid>
              </Grid>
              {/*  */}
              <Divider style={{ margin: "25px 10px 0px 10px" }} />
              <Typography
                style={{
                  fontWeight: 500,
                  color: "#707070",
                  marginTop: 15,
                  marginBottom: -15,
                }}
              >
                Cài đặt nâng cao:
              </Typography>
              <MultipleSelect
                chonsenValue={byMonth}
                handleAction={handleByMonthChange}
                handleDeleteChip={handleDeleteMonth}
                label="Theo tháng"
                options={month}
              />
              <MultipleSelect
                chonsenValue={byDay}
                handleAction={handleByDayChange}
                handleDeleteChip={handleDeleteDay}
                label="Theo ngày"
                options={day}
              />
              <MultipleSelect
                chonsenValue={byDate}
                handleAction={handleByDateChange}
                handleDeleteChip={handleDeleteDate}
                label="Theo thứ"
                options={date}
              />
              <MultipleSelect
                chonsenValue={byTime}
                handleAction={handleByTimeChange}
                handleDeleteChip={handleDeleteTime}
                label="Theo giờ"
                options={time}
              />
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checkedBirthday}
                  onChange={handleCheckedBirthday}
                />
              }
              label={
                <Grid container direction="row" alignItems="center">
                  Áp dụng vào{" "}
                  <Typography
                    style={{
                      color: theme.customization.primaryColor[500],
                      fontWeight: 500,
                      marginLeft: 4,
                      marginRight: 4,
                    }}
                  >
                    {" "}
                    ngày sinh nhật
                  </Typography>{" "}
                  của khách hàng{" "}
                </Grid>
              }
              style={{ marginLeft: 10 }}
            />
          </Card>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => handleClose(null)}
          variant="contained"
          size="small"
          color="secondary"
        >
          Huỷ
        </Button>
        <Button
          disabled={name.length === 0 ? true : false}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiscount;

const month = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const day = [
  "Ngày 1",
  "Ngày 2",
  "Ngày 3",
  "Ngày 4",
  "Ngày 5",
  "Ngày 6",
  "Ngày 7",
  "Ngày 8",
  "Ngày 9",
  "Ngày 10",
  "Ngày 11",
  "Ngày 12",
  "Ngày 13",
  "Ngày 14",
  "Ngày 15",
  "Ngày 16",
  "Ngày 17",
  "Ngày 18",
  "Ngày 19",
  "Ngày 20",
  "Ngày 21",
  "Ngày 22",
  "Ngày 23",
  "Ngày 24",
  "Ngày 25",
  "Ngày 26",
  "Ngày 27",
  "Ngày 28",
  "Ngày 29",
  "Ngày 30",
  "Ngày 31",
];
const date = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const time = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
