import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import userApi from "../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logInHandler = async () => {
    try {
      const response = await userApi.signIn({
        phone: userName,
        password: password,
      });
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        dispatch(authActions.logIn());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();

  return (
    <Box className={classes.background}>
      <Paper className={classes.container}>
        <CssBaseline />
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              name="phone"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => logInHandler()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Typography
                  style={{ textDecoration: "none" }}
                  component={Link}
                  to="/signup"
                >
                  Do not have an account? Sign up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
