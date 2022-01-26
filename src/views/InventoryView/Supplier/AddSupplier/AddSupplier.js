import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import supplierApi from "../../../../api/supplierApi";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
//import project
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Dialog,
  Box,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import SimpleModal from "../../../../components/Modal/ModalWrapper";
import avaUpload from "../../../../assets/img/product/default-product.png";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { statusAction } from "../../../../store/slice/statusSlice";

const UploadImages = (img) => {
  return (
    <Box
      component="img"
      sx={{
        height: 70,
        width: 70,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 2,
      }}
      src={avaUpload}
    />
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    headerTitle: {
      fontSize: "1.125rem",
    },
    input: {
      display: "none",
    },
  })
);

const AddSupplier = (props) => {
  const { handleClose, open } = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [image, setImage] = useState([]);
  const [display, setDisplay] = useState([]);
  const addImageHandler = (e) => {
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [paymentInfo, setPaymentInfo] = React.useState("");

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const clearImage = () => {
    setDisplay([]);
    setImage([]);
  };
  const dispatch = useDispatch();
  const handleAddSupplier = async () => {
    handleClose();

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("name", name.toString());
      bodyFormData.append("email", email.toString());
      bodyFormData.append("phone", phone.toString());
      bodyFormData.append("payment_info", paymentInfo.toString());
      bodyFormData.append("address", address.toString());
      bodyFormData.append("image", image);

      const response = await supplierApi.createSupplier(
        store_uuid,
        bodyFormData
      );
      dispatch(statusAction.successfulStatus("Tạo nhà cung cấp thành công"));
      props.onReload();
    } catch (err) {
      dispatch(statusAction.successfulStatus("Tạo nhà cung cấp thất bại"));
      console.log(err);
    }
  };
  return (
    <SimpleModal
      open={open}
      handleClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Box style={{ width: 550, maxWidth: "100%" }}>
        <Typography className={classes.headerTitle} variant="h5" gutterBottom>
          Thêm nhà cung cấp
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          {display.length ? (
            <Tooltip title="Xóa hình ảnh">
              <Button size="small" onClick={() => clearImage()}>
                <Box
                  component="img"
                  sx={{
                    height: 70,
                    width: 70,
                    marginLeft: 7,
                    marginRight: 7,
                    borderRadius: 2,
                  }}
                  src={display}
                />
              </Button>
            </Tooltip>
          ) : (
            <UploadImages />
          )}

          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={addImageHandler}
          />
          {display.length === 0 ? (
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          ) : null}
        </Box>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Tên nhà cung cấp (*)"
              variant="outlined"
              fullWidth
              size="small"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              size="small"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              size="small"
              fullWidth
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Tên công ty"
              variant="outlined"
              fullWidth
              size="small"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Thông tin thanh toán"
              variant="outlined"
              fullWidth
              size="small"
              value={paymentInfo}
              onChange={(event) => setPaymentInfo(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button
            onClick={() => handleClose(null)}
            variant="contained"
            size="small"
            color="secondary"
          >
            Huỷ
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={handleAddSupplier}
            variant="contained"
            size="small"
            color="primary"
          >
            Thêm
          </Button>
        </Grid>
      </Box>
    </SimpleModal>
  );
};

export default AddSupplier;
