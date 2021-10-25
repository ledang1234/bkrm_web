import {
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React, { useState } from "react";
import location from "../../assets/JsonData/provinces.json";

const StoreInfo = (props) => {
  const { storeInfo, setStoreInfo } = {
    ...props,
  };
  const cityList = location.provinces;
  const [districtList, setDistrictList] = useState(
    location.districts.filter((d) => d.province_id === storeInfo.city.id)
  );
  const [wardList, setWardList] = useState(
    location.wards.filter((w) => w.district_id === storeInfo.district.id)
  );
  const setName = (e) => {
    setStoreInfo({ ...storeInfo, name: e });
  };
  const setPhone = (e) => {
    setStoreInfo({ ...storeInfo, phone: e });
  };
  const setCity = (e) => {
    setStoreInfo({
      ...storeInfo,
      district: { id: "", name: "" },
      ward: { id: "", name: "" },
    });
    setWardList([]);
    try {
      const id = cityList.find((c) => c.name === e).id;
      setStoreInfo({ ...storeInfo, city: { id: id, name: e } });
      setDistrictList(
        location.districts.filter((district) => district.province_id === id)
      );
    } catch (error) {}
  };
  const setAddress = (e) => {
    setStoreInfo({ ...storeInfo, address: e });
  };
  const setDistrict = (e) => {
    setStoreInfo({
      ...storeInfo,
      ward: { id: "", name: "" },
    });
    try {
      const id = districtList.find((c) => c.name === e).id;
      setStoreInfo({ ...storeInfo, district: { id: id, name: e } });
      setWardList(location.wards.filter((ward) => ward.district_id === id));
    } catch (error) {}
  };
  const setWard = (e) => {
    try {
      const id = wardList.find((c) => c.name === e);
      setStoreInfo({ ...storeInfo, ward: { id: id, name: e } });
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="name"
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Store Name"
            value={storeInfo.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Phone"
            name="phone"
            autoComplete="phone"
            value={storeInfo.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel>City</InputLabel>
            <Select
              native
              value={storeInfo.city.name}
              onChange={(e) => setCity(e.target.value)}
              label="City"
              style={{ maxHeight: 100 }}
            >
              <option aria-label="None" value="" />
              {cityList.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="city">District</InputLabel>
            <Select
              native
              value={storeInfo.district.name}
              onChange={(e) => setDistrict(e.target.value)}
              label="District"
            >
              <option aria-label="None" value="" />
              {districtList.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="ward">Ward</InputLabel>
            <Select
              native
              value={storeInfo.ward.name}
              onChange={(e) => setWard(e.target.value)}
              label="Ward"
            >
              <option aria-label="None" value="" />
              {wardList.map((ward) => (
                <option key={ward.id} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="address"
            name="address"
            variant="outlined"
            required
            fullWidth
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Set as the default branch"
          />
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default StoreInfo;
