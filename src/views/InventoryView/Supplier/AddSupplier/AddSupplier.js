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
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const supplierFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      company:"",
      paymentInfo:"",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên nhà cung cấp"),
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại").matches(/^\d+$/),
      address: Yup.string().required("Nhập địa chỉ nhà cung cấp"),
    }),
  })

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const clearImage = () => {
    setDisplay([]);
    setImage([]);
  };
  const dispatch = useDispatch();
  const handleAddSupplier = async () => {
    handleCloseAndReset()
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("name", supplierFormik.values.name.toString());
      bodyFormData.append("email", supplierFormik.values.email.toString());
      bodyFormData.append("phone", supplierFormik.values.phone.toString());
      bodyFormData.append("payment_info", supplierFormik.values.paymentInfo.toString());
      bodyFormData.append("payment_info", supplierFormik.values.company.toString());
      bodyFormData.append("address", supplierFormik.values.address.toString());
      bodyFormData.append("image", image);

      await supplierApi.createSupplier(
        store_uuid,
        bodyFormData
      );
      dispatch(statusAction.successfulStatus("Tạo nhà cung cấp thành công"));
      props.onReload();
    } catch (err) {
      dispatch(statusAction.failedStatus("Tạo nhà cung cấp thất bại"));
      console.log(err);
    }
  };
  const handleCloseAndReset =() =>{
    handleClose()
    setImage([])
    setDisplay([])
    supplierFormik.resetForm()
  } 
  return (
    <SimpleModal
      open={open}
      handleClose={handleCloseAndReset}
      aria-labelledby="form-dialog-title"
    >
      <Box style={{ width: 550, maxWidth: "100%" }}>
        <Typography className={classes.headerTitle} variant="h5" gutterBottom>
          Thêm nhà cung cấp
        </Typography>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Tên nhà cung cấp"
              variant="outlined"
              fullWidth
              size="small"
              name = "name"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.name}
              error={supplierFormik.touched.name && supplierFormik.errors.name}
              helperText={supplierFormik.touched.name ? supplierFormik.errors.name : null}
              onBlur={supplierFormik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              size="small"
              name= "address"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.address}
              error={supplierFormik.touched.address && supplierFormik.errors.address}
              helperText={supplierFormik.touched.address ? supplierFormik.errors.address : null}
              onBlur={supplierFormik.handleBlur}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              size="small"
              fullWidth
              required
              name="phone"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.phone}
              error={supplierFormik.touched.phone && supplierFormik.errors.phone}
              helperText={supplierFormik.touched.phone ? supplierFormik.errors.phone : null}
              onBlur={supplierFormik.handleBlur}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              name = "email"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.email}
              error={supplierFormik.touched.email && supplierFormik.errors.email}
              helperText={supplierFormik.touched.email ? supplierFormik.errors.email : null}
              onBlur={supplierFormik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Tên công ty"
              variant="outlined"
              fullWidth
              size="small"
              name = "company"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.company}
              error={supplierFormik.touched.company && supplierFormik.errors.company}
              helperText={supplierFormik.touched.company ? supplierFormik.errors.company : null}
              onBlur={supplierFormik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Thông tin thanh toán"
              variant="outlined"
              fullWidth
              size="small"
              name = "paymentInfo"
              onChange={supplierFormik.handleChange}
              value={supplierFormik.values.paymentInfo}
              error={supplierFormik.touched.paymentInfo && supplierFormik.errors.paymentInfo}
              helperText={supplierFormik.touched.paymentInfo ? supplierFormik.errors.paymentInfo : null}
              onBlur={supplierFormik.handleBlur}
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
            onClick={handleCloseAndReset}
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
            disabled = {!(supplierFormik.isValid && Object.keys(supplierFormik.touched).length > 0)}
          >
            Thêm
          </Button>
        </Grid>
      </Box>
    </SimpleModal>
  );
};

export default AddSupplier;
