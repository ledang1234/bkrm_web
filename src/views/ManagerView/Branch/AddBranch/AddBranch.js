import React, {useEffect, useState} from "react";
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
  MenuItem
} from "@material-ui/core";

import userApi from "../../../../api/userApi";

//import project
import customerApi from "../../../../api/customerApi";
import branchApi from '../../../../api/branchApi';
import {useSelector} from 'react-redux'
import { useFormik } from 'formik';

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
  })
);

const AddBranch = (props) => {
  const { handleClose, open } = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [paymentInfo, setPaymentInfo] = React.useState("");

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    phone: "",
    province: { id: "", name: "" },
    district: { id: "", name: "" },
    ward: { id: "", name: "" },
    address: "",
  });

  const [provinces, setProvinces] = useState([]);

  const loadProvince = async () => {
    const res = await userApi.getCity();
    setProvinces(res.provinces);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '', 
      ward: '',
      distric: '',
      province: '',
      phone: '',
      status: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
 
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm chi nhánh
        </Typography>
      </DialogTitle>

      <DialogContent>
        <TextField
          required
          label="Tên chi nhánh"
          variant="outlined"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <TextField
          required
          label="Số điện thoại"
          variant="outlined"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.province}
          label="Age"
          onChange={formik.handleChange}
          onFocus={loadProvince}
        >
          {provinces.map(p => (<MenuItem value={p.name}>{p.name}</MenuItem>))}
          ""
        </Select>

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
          onClick={async () => {
            let body = {
              name: name,
              email: email,
              phone: phone,
              address: address,
              payment_info: paymentInfo,
            };

            try {
            const response = await customerApi.createCustomer(store_uuid, body)
            handleClose("Success")
            console.log(response.status)

            } catch (err) {
              handleClose("Failed");
            }

          }}
          variant="contained"
          size="small"
          color="primary"
        >
          Thêm
        </Button>
      </DialogActions>
      </Dialog>
  );
};

export default AddBranch;
