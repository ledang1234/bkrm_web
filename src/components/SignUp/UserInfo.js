import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";

const UserInfo = (props) => {
  const { userInfo, setUserInfo ,user_formik} = { ...props };
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
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Họ tên"
            onChange={user_formik.handleChange}
            value={user_formik.values.name}
            error={user_formik.touched.name && user_formik.errors.name}
            helperText={user_formik.touched.name ? user_formik.errors.name : null}
            onBlur={user_formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Số điện thoại"
            name="phone"
            onChange={user_formik.handleChange}
            value={user_formik.values.phone}
            error={user_formik.touched.phone && user_formik.errors.phone}
            helperText={user_formik.touched.phone ? user_formik.errors.phone : null}
            onBlur={user_formik.handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="dateOfBirth"
            type="date"
            defaultValue="1991-01-01"
            label="Ngày sinh"
            onChange={user_formik.handleChange}
            value={user_formik.values.dateOfBirth}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Địa chỉ email"
            name="email"
            onChange={user_formik.handleChange}
            value={user_formik.values.email}
            error={user_formik.touched.email && user_formik.errors.email}
            helperText={user_formik.touched.email ? user_formik.errors.email : null}
            onBlur={user_formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            onChange={user_formik.handleChange}
            value={user_formik.values.password}
            error={user_formik.touched.password && user_formik.errors.password}
            helperText={user_formik.touched.password ? user_formik.errors.password : null}
            onBlur={user_formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="passwordConfirm"
            label="Nhập lại mật khẩu"
            type="password"
            onChange={user_formik.handleChange}
            value={user_formik.values.passwordConfirm}
            error={user_formik.touched.passwordConfirm && user_formik.errors.passwordConfirm}
            helperText={user_formik.touched.passwordConfirm ? user_formik.errors.passwordConfirm : null}
            onBlur={user_formik.handleBlur}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserInfo;
