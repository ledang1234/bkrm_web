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
} from "@material-ui/core";

import userApi from "../../../../api/userApi";
import getGeoCode from "../../../../components/BranchMap/Geocode";

//import project
import customerApi from "../../../../api/customerApi";
import branchApi from "../../../../api/branchApi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import SimpleModal from "../../../../components/Modal/ModalWrapper";
import { statusAction } from "../../../../store/slice/statusSlice";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => createStyles({}));

const AddBranch = (props) => {
  const { handleClose, open, onReload } = props;

  const theme = useTheme();

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên chi nhánh"),
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại")
        .matches(/^\d+$/, "Số điển thoại không chính xác"),
      address: Yup.string().required("Nhập địa chỉ"),
      city: Yup.string().required("Chọn tỉnh/thành phố"),
      district: Yup.string().required("Chọn quận/huyện"),
      ward: Yup.string().required("Chọn phường/xã"),
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
    console.log(formik.errors);
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
  const closeModalAndResetData = () => {
    handleClose();
    formik.resetForm();
  };
  const handleAddBranch = async () => {
    closeModalAndResetData();
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
    const body = {
      name: formik.values.name,
      address: formik.values.address,
      ward: ward,
      province: province,
      district: district,
      phone: formik.values.phone,
      status: "active",
      lng: `${lng}`,
      lat: `${lat}`,
    };
    try {
      const response = await branchApi.createBranch(store_uuid, body);
      onReload();
      dispatch(statusAction.successfulStatus("Create branch successfully"));
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Failed to createBranch"));
    }
  };
  return (
    <SimpleModal open={open} handleClose={closeModalAndResetData}>
      <Typography variant="h4" gutterBottom>
        Thêm chi nhánh mới
      </Typography>
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
          >
            <InputLabel>Huyện</InputLabel>
            <Select
              native
              label="Huyện"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" />
              {districtList.map((district) => (
                <option value={district.id}>{district.name}</option>
              ))}
            </Select>
            {formik.touched.district ? (
              <FormHelperText>{formik.errors.district}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl
            required
            fullWidth
            variant="outlined"
            error={formik.touched.ward && formik.errors.ward}
          >
            <InputLabel htmlFor="ward">Xã</InputLabel>
            <Select
              native
              label="Xã"
              name="ward"
              value={formik.values.ward}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option aria-label="None" value="" />
              {wardList.map((ward) => (
                <option value={ward.id}>{ward.name}</option>
              ))}
            </Select>
            {formik.touched.ward ? (
              <FormHelperText>{formik.errors.ward}</FormHelperText>
            ) : null}
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
            onBlur={formik.handleBlur}
            error={formik.touched.address && formik.errors.address}
            helperText={formik.touched.address ? formik.errors.address : null}
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
          color="secondary"
          onClick={closeModalAndResetData}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleAddBranch}
          disabled={!(formik.isValid && Object.keys(formik.touched).length > 0)}
        >
          Thêm
        </Button>
      </Grid>
    </SimpleModal>
  );
};

export default AddBranch;
