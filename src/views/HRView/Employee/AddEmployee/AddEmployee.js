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
  OutlinedInput,
  Dialog,
} from "@material-ui/core";

//import project
import NumberFormatCustom from "../../../../components/TextField/NumberFormatCustom";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";
import { EmailRounded, Image } from "@material-ui/icons";
import branchApi from "../../../../api/branchApi";

// api
import { useSelector } from "react-redux";
import employeeApi from "../../../../api/employeeApi";
import { statusAction } from "../../../../store/slice/statusSlice";
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
  { id: 1, name: "inventory", description: "Kho hàng" },
  { id: 2, name: "employee", description: "Nhân sự" },
  { id: 3, name: "sales", description: "Bán hàng" },
  { id: 4, name: "product", description: "Sản phẩm" },
  { id: 5, name: "report", description: "Báo cáo" },
];

const AddEmployee = (props) => {
  const { handleClose, open } = props;

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
  const [branches, setBranches] = React.useState([]);
  const [empWorkBranches, setEmpWorkBranches] = React.useState([]);
  const [image, setImage] = React.useState();
  const [imageToShow, setImageToShow] = React.useState("")

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const handleSelectPermission = (selected) => {
    let permissions = selected.map((permission) => permission.id);
    setPermissions(permissions);
  };

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm nhân viên
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Grid container direction="row">


            <Avatar alt="Remy Sharp" className={classes.ava} src={imageToShow}/>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              accept="image/*" 
              capture="environment"
              onChange={(event) => {
                setImage(event.target.files[0])

                // read the selected file and display on the avata
                var file = event.target.files[0];
                var reader = new FileReader();
                reader.onloadend = function() {
                  setImageToShow(reader.result);
                }

                reader.readAsDataURL(file);
              }}
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
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  label="Gender"
                  value={gender}
                >
                  <MenuItem value="male">Nam</MenuItem>
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
                  onChange={(event) => {
                    setSalaryType(event.target.value);
                  }}
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

              <FormControl
                className={classes.formControl}
                fullWidth
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
              >
                <InputLabel id="branchSelect">Chi nhánh </InputLabel>
                <Select
                  label="Chi nhánh"
                  id="branchSelect"
                  multiple
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={empWorkBranches}
                  renderValue={(selected) =>
                    selected
                      .map((empWorkBranch) => {
                        return branches.find(
                          (branch) => branch.id === empWorkBranch
                        )?.name;
                      })
                      .join(", ")
                  }
                  onChange={(e) => {
                    setEmpWorkBranches(e.target.value);
                    console.log(e.target.value);
                  }}
                  input={<OutlinedInput label="Name" />}
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
          onClick={async () => {
            let formData = new FormData(); //formdata object

            formData.append("name", name); 
            formData.append("email", email);
            formData.append("password", empPassword); 
            formData.append("password_confirmation", empPassword); 
            formData.append("phone", phone);
            formData.append("date_of_birth", dateOfBirth);
            formData.append("status", "active");
            formData.append("gender", gender);
            formData.append("id_card_num", idCardNum);
            formData.append("salary", salary);
            formData.append("salary_type", salaryType);
            formData.append("address", address);
            formData.append("image", image)

            for (var i = 0; i < permissions.length; i++) {
              formData.append('permissions[]', permissions[i]);
            }
            for (var i = 0; i < empWorkBranches.length; i++) {
              formData.append('branches[]', empWorkBranches[i]);
            }

            try {
              const response = await employeeApi.createEmployee(
                store_uuid,
                formData
              );
              handleClose("Success");
              console.log(response.status);
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

export default AddEmployee;
