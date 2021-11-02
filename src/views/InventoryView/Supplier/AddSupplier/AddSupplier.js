import React, { useState, useEffect } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import supplierApi from "../../../../api/supplierApi";

//import project
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Dialog
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
      },
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
  })
);

const AddSupplier = (props) => {
  const { handleClose ,open} = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [paymentInfo, setPaymentInfo] = React.useState("");

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm nhà cung cấp
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Grid
            container
            direction="collumn"
            justifyContent="space-around"
            spacing={3}
          >
            <TextField
              id="outlined-basic"
              label="Tên nhà cung cấp (*)"
              variant="outlined"
              fullWidth
              size="small"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              size="small"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />

            <Grid
              direction="row"
              container
              justifyContent="flex-start"
              spacing={1}
            >
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
            </Grid>

            <TextField
              id="outlined-basic"
              label="Tên công ty"
              variant="outlined"
              fullWidth
              size="small"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
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
              payment_info: paymentInfo,
              company: company,
              address: address,
            };

            try {
              const response = await supplierApi.createSupplier(body)
              handleClose("Success")

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

export default AddSupplier;
