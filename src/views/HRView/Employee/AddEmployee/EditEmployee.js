import React, { useEffect } from "react";
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
  Dialog,
} from "@material-ui/core";
import { useFormik } from "formik";

//import project
import NumberFormatCustom from "../../../../components/TextField/NumberFormatCustom";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";
import { EmailRounded } from "@material-ui/icons";
import branchApi from "../../../../api/branchApi";


// api
import { useSelector } from "react-redux";
import employeeApi from "../../../../api/employeeApi";

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

let permissionChoices = [
  { id: 1, name: "inventory", description: "Kho hàng" },
  { id: 2, name: "employee", description: "Nhân sự" },
  { id: 3, name: "sales", description: "Bán hàng" },
  { id: 4, name: "product", description: "Sản phẩm" },
  { id: 5, name: "report", description: "Báo cáo" },
];

const EditEmployee = ({ handleClose, open, employee }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const [branches, setBranches] = React.useState([]);

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

  useEffect(() => {
   
  }, [employee]);

  React.useEffect(() => {
    const loadBranches = async () => {
      try {
        const response = await branchApi.getAllBranches(store_uuid);
        console.log(response.data);
        setBranches(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadBranches();
   
  }, [store_uuid]);

  const formik = useFormik({
    initialValues: {
      uuid: employee.uuid,
      name: employee.name,
      phone: employee.phone,
      permissions: employee.permissions.map(p => p.id),
      email: employee.email,
      salary: employee.salary,
      salary_type: employee.salary_type,
      id_card_num: employee.id_card_num,
      gender: employee.gender,
      date_of_birth: employee.date_of_birth,
      address: employee.address,
      branches: employee.branches.map(b => b.id),
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await employeeApi.updateEmployee(
          store_uuid,
          employee.uuid,
          values
        );
        handleClose("Success");
        console.log(response.status);
      } catch (error) {
        handleClose("Failed");
      }
    },
  });

  // redux

  //   const handleSelectPermission = (selected) => {
  //     let permissions = selected.map((permission) => permission.key);
  //     setPermissions(permissions);
  //   };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Sửa thông tin nhân viên
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                id="name"
                label="Tên nhân viên"
                value={formik.values.name}
                variant="outlined"
                fullWidth
                size="small"
                // name="name"
                onChange={formik.handleChange}
              />

              <TextField
                id="date"
                name="date_of_birth"
                label="Ngày sinh"
                type="date"
                defaultValue="" //null
                variant="outlined"
                size="small"
                fullWidth
                value={formik.values.date_of_birth}
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
              />

              <TextField
                id="outlined-basic"
                name="id_card_num"
                label="CMND"
                value={formik.values.id_card_num}
                variant="outlined"
                fullWidth
                size="small"
                onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
                  label="Gender"
                  value={formik.values.gender}
                  name="gender"
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                value={formik.values.phone}
                variant="outlined"
                fullWidth
                size="small"
                name="phone"
                onChange={formik.handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                value={formik.values.email}
                variant="outlined"
                fullWidth
                size="small"
                onChange={formik.handleChange}
              />

              <TextField
                id="outlined-basic"
                label="Địa chỉ"
                value={formik.values.address}
                variant="outlined"
                fullWidth
                size="small"
                onChange={formik.handleChange}
                name="address"
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
                  onChange={formik.handleChange}
                  label="Salary"
                  name="salary_type"
                  value={formik.values.salary_type}
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
                name="salary"
                value={formik.values.salary}
                // value={values.numberformat}
                // onChange={handleChange}
                onChange={formik.handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              {/* <TextField id="outlined-basic" label="Quyền" variant="outlined" fullWidth size="small"/> */}

              <FormControl
                className={classes.formControl}
                fullWidth
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
              >
                <InputLabel id="branchSelect">Chức năng</InputLabel>
                <Select
                  multiple
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="permissions"
                  value={formik.values.permissions}
                  renderValue={(selected) =>
                    selected
                      .map((permission) => {
                        return permissionChoices.find(
                          (p) => p.id === permission
                        )?.description
                      })
                      .join(", ")
                  }
                  onChange={formik.handleChange}
                >
                  {permissionChoices.map((branch) => (
                    <MenuItem
                      key={branch.name}
                      value={branch.id}
                    >
                      {branch.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                className={classes.formControl}
                fullWidth
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
              >
                <InputLabel id="branchSelect">Chi nhánh </InputLabel>
                <Select
                  multiple
                  variant="outlined"
                  fullWidth
                  name="branches"
                  onChange={formik.handleChange}
                  size="small"
                  value={formik.initialValues.branches}
                  renderValue={(selected) =>
                    selected
                      .map((empWorkBranch) => {
                        return branches.find(
                          (branch) => branch.id === empWorkBranch
                        )?.name;
                      })
                      .join(", ")
                  }
                >
                  {branches.map((branch) => (
                    <MenuItem
                      key={branch.name}
                      value={branch.id}
                    >
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          onClick={formik.handleSubmit}
          variant="contained"
          size="small"
          color="primary"
        >
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
