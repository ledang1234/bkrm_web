import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
//import library
import {
  Button,
  TextField,
  Typography,
  Grid,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import userApi from "../../../../api/userApi";
import getGeoCode from "../../../../components/BranchMap/Geocode";

//import project
import customerApi from "../../../../api/customerApi";
import branchApi from "../../../../api/branchApi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import SimpleModal from "../../../../components/Modal/ModalWrapper";
import { statusAction } from "../../../../store/slice/statusSlice";
import avaUpload from "../../../../assets/img/product/default-product.png";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => createStyles({}));
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
const StoreSetting = (props) => {
  const { handleClose, open} = props;

  const theme = useTheme();

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [image, setImage] = useState([]);
  const [display, setDisplay] = useState([]);
  const clearImage = () => {
    setDisplay([]);
    setImage([]);
  };
  const addImageHandler = (e) => {
    setImage(e.target.files[0]);
    setDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      facebook: "",
      instagram: "",
      web: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên cửa hàng nhánh"),
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại")
        .matches(/^\d+$/, "Số điển thoại không chính xác"),
    }),
  });
  const dispatch = useDispatch();
  const closeModalAndResetData = () => {
    handleClose();
    formik.resetForm();
  };
  const handleUpdateStore = async () => {
    closeModalAndResetData();
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("name", formik.values.name.toString());
      bodyFormData.append("image", image);
      //   const response = await branchApi.createBranch(store_uuid, bodyFormData);
      dispatch(statusAction.successfulStatus("Lưu thay đổi"));
    } catch (error) {
      console.log(error);
      dispatch(statusAction.successfulStatus("Lưu thất bại"));
    }
  };
  return (
    <SimpleModal open={open} handleClose={closeModalAndResetData}>
      <Typography variant="h4" gutterBottom>
        Cài đặt chung cửa hàng
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center">
        {display.length ? (
          <Tooltip title="Xóa hình ảnh">
            <Button size="small" onClick={clearImage}>
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
          style={{ display: "none" }}
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
      <Grid container spacing={2} style={{ maxWidth: 600, marginTop: 10 }}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Tên cửa hàng"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name ? formik.errors.name : null}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Link facebook"
            name="facebook"
            onChange={formik.handleChange}
            value={formik.values.facebook}
            error={formik.touched.facebook && formik.errors.facebook}
            helperText={formik.touched.facebook ? formik.errors.facebook : null}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Link instagram"
            name="instagram"
            onChange={formik.handleChange}
            value={formik.values.instagram}
            error={formik.touched.instagram && formik.errors.instagram}
            helperText={formik.touched.instagram ? formik.errors.instagram : null}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Link web"
            name="web"
            onChange={formik.handleChange}
            value={formik.values.web}
            error={formik.touched.web && formik.errors.web}
            helperText={formik.touched.web ? formik.errors.web : null}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Số điện thoại"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
            helperText={formik.touched.phone ? formik.errors.phone : null}
            onBlur={formik.handleBlur}
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
          paddingTop: 20,
        }}
      >
        <Button
          variant="contained"
          size="small"
          style={{ marginRight: 20 }}
          color="secondary"
          onClick={closeModalAndResetData}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleUpdateStore}
          disabled={!(formik.isValid && Object.keys(formik.touched).length > 0)}
        >
          Lưu thay đổi
        </Button>
      </Grid>
    </SimpleModal>
  );
};

export default StoreSetting;
