import React, {useState} from "react";
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
  Dialog
} from "@material-ui/core";

//import project
import customerApi from "../../../../api/customerApi";
import {useSelector} from 'react-redux'

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
    city: { id: "", name: "" },
    district: { id: "", name: "" },
    ward: { id: "", name: "" },
    address: "",
  });

  return (
 
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm chi nhánh
        </Typography>
      </DialogTitle>

      <DialogContent>
            <StoreInfo storeInfo={storeInfo} setStoreInfo={setStoreInfo} />
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
            //   const response = await customerApi.createCustomer(store_uuid, body)
              handleClose("Success")
            //   console.log(response.status)

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
