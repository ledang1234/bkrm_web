import React from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

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
} from "@material-ui/core";

//import project
import customerApi from "../../../api/customerApi";

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

const AddCustomer = (props) => {
  const { handleClose } = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [paymentInfo, setPaymentInfo] = React.useState("");

  return (
    <div>
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm khách hàng
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          {/* <Grid container direction="row">
            <Avatar alt="Remy Sharp" className={classes.ava} />
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                style={{ height: 22, textTransform: "none", marginLeft: 20 }}
              >
                Chọn ảnh
              </Button>
            </label>
          </Grid> */}

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            spacing={3}
          >
            <Grid item xs={7}>
              <TextField
                id="outlined-basic"
                label="Tên khách hàng (*)"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={(event)=>setName(event.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Số điện thoại (*)"
                value={phone}
                onChange={(event)=>setPhone(event.target.value)}
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                variant="outlined"
                fullWidth
                size="small"
                value={address}
                onChange={(event)=>setAddress(event.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="date"
                label="Thông tin thanh toán"
                variant="outlined"
                size="small"
                className={classes.textField}
                value={paymentInfo}
                onChange={(event) => setPaymentInfo(event.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
          </Grid>
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
          onClick={async () => {
            let body = {
              name: name,
              email: email,
              phone: phone,
              address: address,
              payment_info: paymentInfo,
            };

            try {
              const response = await customerApi.createCustomer(body)
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
    </div>
  );
};

export default AddCustomer;
