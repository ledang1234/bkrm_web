import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";

const UserInfo = (props) => {
  const { userInfo, setUserInfo } = { ...props };
  const setName = (e) => {
    setUserInfo({ ...userInfo, name: e });
  };
  const setPhone = (e) => {
    setUserInfo({ ...userInfo, phone: e });
  };
  const setEmail = (e) => {
    setUserInfo({ ...userInfo, email: e });
  };
  const setDateOfBirth = (e) => {
    setUserInfo({ ...userInfo, dateOfBirth: e });
  };
  const setPassword = (e) => {
    setUserInfo({ ...userInfo, password: e });
  };
  const SetPasswordConfirm = (e) => {
    setUserInfo({ ...userInfo, passwordConfirm: e });
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
            label="Full Name"
            value={userInfo.name}
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
            value={userInfo.phone}
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
            value={userInfo.dateOfBirth}
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
            value={userInfo.email}
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
            value={userInfo.password}
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
            value={userInfo.passwordConfirm}
            onChange={(e) => SetPasswordConfirm(e.target.value)}
            error={
              userInfo.passwordConfirm === userInfo.password ? false : true
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserInfo;
