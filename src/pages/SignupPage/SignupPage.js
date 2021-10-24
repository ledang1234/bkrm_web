import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import userApi from "../../api/userApi";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInHandler } from "../../store/actionCreator";
export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    try {
      const response = await userApi.ownerRegister({
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        phone: phone,
        date_of_birth: dateOfBirth,
        status: "active",
      });
      console.log(response)
      if (response.message === "User successfully registered") {
        console.log("succ")
        dispatch(logInHandler(phone, password));
      }
    } catch (error) {}
  };
  return (
    <Box className={classes.background}>
      <Paper className={classes.container}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h3" gutterBottom color="textSecondary">
            STORE OWNER
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="date"
                  type="date"
                  defaultValue="1991-01-01"
                  label="Date"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password Confirmation"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPassword === password ? false : true}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleSignUp()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  style={{ textDecoration: "none" }}
                  component={Link}
                  to="/login"
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Box>
  );
}
