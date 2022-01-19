import React, { useEffect, useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import StoreInfo from "../../../../components/SignUp/StoreInfo";
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
  Select,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import userApi from "../../../../api/userApi";

//import project
import customerApi from "../../../../api/customerApi";
import branchApi from "../../../../api/branchApi";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import SimpleModal from "../../../../components/Modal/ModalWrapper";

const useStyles = makeStyles((theme) => createStyles({}));

const AddBranch = (props) => {
  const { handleClose, open } = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.store_uuid;
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
      try {
        const res = await userApi.getDistrict(city_id);
        setDistrictList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadDistrict(formik.values.city);
  }, [formik.values.city]);
  useEffect(() => {
    const loadWard = async (city_id, district_id) => {
      try {
        const res = await userApi.getWard(city_id, district_id);
        setWardList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadWard(formik.values.city, formik.values.district);
  }, [formik.values.city, formik.values.district]);
  const handleAddBranch = async () =>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <SimpleModal open={open} handleClose={handleClose}>
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
            label="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel>City</InputLabel>
            <Select
              native
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
            >
              <option value="" />
              {cityList.map((city) => (
                <option value={city.id}>{city.name}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel>District</InputLabel>
            <Select
              native
              label="District"
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
            <InputLabel htmlFor="ward">Ward</InputLabel>
            <Select
              native
              label="Ward"
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
            label="Address"
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
          color="secondary"
        >
          Hủy
        </Button>
        <Button variant="contained" size="small" color="primary">
          Thêm
        </Button>
      </Grid>
    </SimpleModal>
  );
};

export default AddBranch;
