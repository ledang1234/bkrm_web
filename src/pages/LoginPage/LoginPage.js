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
export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

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
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={() => {
                  if (isOwner) {
                    dispatch(logInHandler(userName, password));
                  } else {
                    dispatch(empLogInHandler(userName, password));
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
