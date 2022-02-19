import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInHandler, empLogInHandler } from "../../store/actionCreator";
import { useFormik  } from "formik";
import * as Yup from "yup";
export default function SignIn() {
  const [isOwner, setIsOwner] = useState(false);
  const loginFormik = useFormik({
    initialValues: {
      phone: "",
      password: ""
    },
    validationSchema : Yup.object({
      phone: Yup.string()
        .length(10, "Số điện thoại không chính xác")
        .required("Nhập số điện thoại")
        .matches(/^\d+$/, "Số điển thoại không chính xác"),
      password: Yup.string().required("Nhập mật khẩu"),
    })
  }
  )
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(loginFormik.touched,"errorS:",loginFormik.errors,loginFormik.values)
  return (
    <Box className={classes.background}>
      <Paper className={classes.container}>
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h3" gutterBottom color="textSecondary">
            CỬA HÀNG CỦA BẠN
          </Typography>
          <Typography variant="h5">Đăng nhập</Typography>
          <Box className={classes.form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Số điện thoại"
                name="phone"
                autoFocus
                value = {loginFormik.values.phone}
                onChange= {loginFormik.handleChange}
                error={loginFormik.touched.phone && loginFormik.errors.phone}
                helperText={loginFormik.touched.phone ? loginFormik.errors.phone : null}
                onBlur={loginFormik.handleBlur}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                value = {loginFormik.values.password}
                onChange= {loginFormik.handleChange}
                error={loginFormik.touched.password && loginFormik.errors.password}
                helperText={loginFormik.touched.password ? loginFormik.errors.password : null}
                onBlur={loginFormik.handleBlur}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={() => setIsOwner(true)}
                  />
                }
                label="Chủ cửa hàng"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled = {!(loginFormik.isValid && Object.keys(loginFormik.touched).length > 0)}
                onClick={() => {
                  if (isOwner) {
                    dispatch(logInHandler(loginFormik.values.phone, loginFormik.values.password));
                  } else {
                    dispatch(empLogInHandler(loginFormik.values.phone, loginFormik.values.password));
                  }
                }}
              >
                Đăng nhập
              </Button>
            </form>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Typography
                  style={{ textDecoration: "none" }}
                  component={Link}
                  to="/signup"
                >
                  Chưa có tài khoản? Đăng kí cửa hàng mới
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
