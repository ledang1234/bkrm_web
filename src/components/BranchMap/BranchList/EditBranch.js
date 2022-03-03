import {
  Box,
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import branchApi from "../../../api/branchApi";
import userApi from "../../../api/userApi";
import { statusAction } from "../../../store/slice/statusSlice";
import SimpleModal from "../../Modal/ModalWrapper";
import getGeoCode from "../Geocode";
import ConfirmPopUp from "../../ConfirmPopUp/ConfirmPopUp";
import * as Yup from "yup";

const useStyles = makeStyles((theme) =>
  createStyles({
    headerTitle: {
      fontSize: "1.125rem",
    },
  })
);

const EditBranch = (props) => {
  const { handleClose, open, branch } = props;
  const classes = useStyles();

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: branch.name,
      address: branch.address,
      ward: branch.ward,
      district: branch.district,
      city: branch.province,
      phone: branch.phone,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên chi nhánh"),
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại").matches(/^\d+$/),
      address: Yup.string().required("Nhập địa chỉ"),
      city: Yup.string().required("Chọn tỉnh/ thành phố"),
    }),
  });
  useEffect(() => {
    const loadCity = async () => {
      try {
        const res = await userApi.getCity();
        setCityList(res.provinces);
      } catch (error) {
        console.log(error);
      }
    };
    loadCity();
  }, []);
  useEffect(() => {
    const loadDistrict = async (city_id) => {
      if (city_id) {
        try {
          const res = await userApi.getDistrict(city_id);
          setDistrictList(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadDistrict(formik.values.city);
  }, [formik.values.city]);
  useEffect(() => {
    const loadWard = async (city_id, district_id) => {
      if (city_id && district_id) {
        try {
          const res = await userApi.getWard(city_id, district_id);
          setWardList(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    loadWard(formik.values.city, formik.values.district);
  }, [formik.values.city, formik.values.district]);

  const dispatch = useDispatch();
  const handleEditBranch = async () => {
    const ward = wardList.find((ward) => ward.id === formik.values.ward).name;
    const province = cityList.find(
      (city) => city.id === formik.values.city
    ).name;
    const district = districtList.find(
      (district) => district.id === formik.values.district
    ).name;
    const { lat, lng } = await getGeoCode(
      formik.values.address + " " + ward + " " + district + " " + province
    );
    handleClose();
    try {
      const body = {
        name: formik.values.name,
        address: formik.values.address,
        ward: ward,
        province: province,
        district: district,
        phone: formik.values.phone,
        status: "active",
        lng: lng,
        lat: lat,
      };
      const response = await branchApi.updateBranch(
        store_uuid,
        branch.uuid,
        body
      );
      dispatch(statusAction.successfulStatus("Edit branch successfully"));
      props.onReload();
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Failed to edit branch"));
    }
  };
  const handleDeleteBranch = async () => {
    setIsDelete(false);
    handleClose();
    try {
      await branchApi.deleteBranch(store_uuid, branch.uuid);
      props.onReload();
      dispatch(statusAction.successfulStatus("Delete branch successfully"));
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Delete branch failed"));
    }
  };
  return (
    <SimpleModal open={open} handleClose={handleClose}>
      <ConfirmPopUp
        open={isDelete}
        handleConfirm={handleDeleteBranch}
        handleClose={() => setIsDelete(false)}
        message={
          <Typography>
            Xóa vĩnh viễn chi nhánh <b>{branch.name} ?</b>
          </Typography>
        }
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa chi nhánh mới
        </Typography>
        <Button
          variant="contained"
          size="small"
          style={{ marginRight: 20 }}
          color="secondary"
          onClick={() => setIsDelete(true)}
        >
          Xóa chi nhánh
        </Button>
      </Box>
      <Grid container spacing={2} style={{ maxWidth: 600, marginTop: 10 }}>
        <Grid item xs={12}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Tên chi nhánh"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name ? formik.errors.name : null}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={5}>
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
        <Grid item xs={7}>
          <FormControl
            required
            fullWidth
            variant="outlined"
            error={formik.touched.city && formik.errors.city}
          >
            <InputLabel>Tỉnh</InputLabel>
            <Select
              native
              name="city"
              label="Tỉnh"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" />
              {cityList.map((city) => (
                <option value={city.id}>{city.name}</option>
              ))}
            </Select>
            {formik.touched.city ? (
              <FormHelperText>{formik.errors.city}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl
            required
            fullWidth
            variant="outlined"
            error={formik.touched.district && formik.errors.district}
            onBlur={formik.handleBlur}
          >
            <InputLabel>Quận</InputLabel>
            <Select
              native
              label="Quận"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
            >
              <option value="" />
              {districtList.map((district) => (
                <option value={district.id}>{district.name}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="ward">Phường</InputLabel>
            <Select
              native
              label="Phường"
              name="ward"
              value={formik.values.ward}
              onChange={formik.handleChange}
            >
              <option aria-label="None" value="" />
              {wardList.map((ward) => (
                <option value={ward.id}>{ward.name}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            variant="outlined"
            required
            fullWidth
            label="Địa chỉ"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </Grid>
      </Grid>{" "}
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
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleEditBranch}
          style={{ marginRight: 20 }}
          disabled= {!(formik.isValid && Object.keys(formik.touched).length > 0)}
        >
          Sửa
        </Button>
      </Grid>
    </SimpleModal>
  );
};

export default EditBranch;
