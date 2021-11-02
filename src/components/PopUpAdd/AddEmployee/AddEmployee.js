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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

//import project
import NumberFormatCustom from "../../TextField/NumberFormatCustom";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";
import { EmailRounded } from "@material-ui/icons";
import employeeApi from "../../../api/employeeApi";
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(1),
      },
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
    ava: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginBottom: 15,
    },
    input: {
      display: "none",
    },
  })
);

let choices = [
  { key: "manage-employees", value: "Nhân viên" },
  { key: "manage-orders", value: "Bán hàng" },
  { key: "manage-purchase-orders", value: "Nhập hàng" },
  { key: "manage-purchase-returns", value: "Trả hàng" },
];

const AddEmployee = (props) => {
  const { handleClose } = props;

  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  // đổi thành state sau (price format)
  const [values, setValues] = React.useState({
    numberformat: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // employee info
  // const [typeSalary, setTypeSalary] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [empPassword, setEmpPassword] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [idCardNum, setIdCardNum] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [salaryType, setSalaryType] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [permissions, setPermissions] = React.useState([]);

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const handleSelectPermission = (selected) => {
    let permissions = selected.map((permission) => permission.key);
    setPermissions(permissions);
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm nhân viên
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Grid container direction="row">
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
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Tên nhân viên"
                value={name}
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setName(event.target.value)}
              />

              <TextField
                id="date"
                label="Ngày sinh"
                type="date"
                defaultValue="" //null
                variant="outlined"
                size="small"
                fullWidth
                value={dateOfBirth}
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setDateOfBirth(event.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="CMND"
                value={idCardNum}
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setIdCardNum(event.target.value)}
              />

              <FormControl
                className={classes.formControl}
                fullWidth
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Giới tính{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(event) => { setGender(event.target.value) }}
                  label="Gender"
                  value={gender}
                >
                  <MenuItem value="male">Name</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                value={phone}
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setPhone(event.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Email"
                value={email}
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setEmail(event.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                value={address}
                variant="outlined"
                fullWidth
                size="small"
                onChange={(event) => setAddress(event.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              {/* Select lưong */}
              <FormControl
                className={classes.formControl}
                fullWidth
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Lương{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(event) => { setSalaryType(event.target.value) }}
                  label="Age"
                  value={salaryType}
                >
                  <MenuItem value="none">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="fix">Lương cố định</MenuItem>
                  <MenuItem value="per-shift">Lương theo ca</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Mức lương"
                variant="outlined"
                fullWidth
                size="small"
                value={salary}
                // value={values.numberformat}
                // onChange={handleChange}
                onChange={(event) => setSalary(event.target.value)}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />

              {/**đăng nhập bằng sđt */}
              <TextField
                id="outlined-basic"
                label="Mật khẩu tài khoản"
                variant="outlined"
                fullWidth
                size="small"
                value={empPassword}
                onChange={(event) => setEmpPassword(event.target.value)}
              />

              {/* <TextField id="outlined-basic" label="Quyền" variant="outlined" fullWidth size="small"/> */}

              <MultipleSelect
                choices={choices}
                handleSelect={handleSelectPermission}
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
              password: empPassword,
              password_confirmation: empPassword,
              phone: phone,
              date_of_birth: dateOfBirth,
              status: "active",
              gender: gender,
              id_card_num: idCardNum,
              salary: salary,
              salary_type: salaryType,
              address: address,
              permissions: permissions,
            };

            try {
              const response = await employeeApi.createEmployee(store_uuid, body)
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

export default AddEmployee;
