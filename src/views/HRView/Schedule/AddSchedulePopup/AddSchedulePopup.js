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
  FormHelperText,
  Dialog,
} from "@material-ui/core";

// api
import { useSelector } from "react-redux";
import { statusAction } from "../../../../store/slice/statusSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import scheduleApi from "../../../../api/scheduleApi";

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

const AddSchedulePopup = (props) => {
  const { handleClose, addScheduleOpen } = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  const formik = useFormik({
    initialValues: {
      employee_id: "",
      shift_id: "",
      start_date: "",
      end_date: "",
      week_day: "",
    },
    validationSchema: Yup.object().shape({
      employee_id: Yup.string().required("Bắt buộc!"),
      shift_id: Yup.string().required("Bắt buộc!"),
      start_date: Yup.string().required("Bắt buộc!"),
      end_date: Yup.string().required("Bắt buộc!"),
      week_day: Yup.string().required("Bắt buộc!"),
    }),

    onSubmit: async (values, actions) => {
      try {
        const response = await scheduleApi.createShift(
          store_uuid,
          branch_uuid,
          values
        );
        handleClose("Success");
      } catch (error) {
        handleClose("Failed");
      }
    },
  });

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  return (
    <Dialog
      open={addScheduleOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5">
          Thêm lịch làm việc cho nhân viên
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div className={classes.root}>
          <Grid container direction="row">
            <InputLabel id="employee_name">Nhân viên</InputLabel>
            <Select
              labelId="employee_name"
              required
              value={formik.values.name}
              name="employee_id"
              variant="outlined"
              fullWidth
              size="small"
              onChange={formik.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            {formik.errors.employee_id && formik.touched.employee_id && (
              <FormHelperText error>{formik.errors.employee_id}</FormHelperText>
            )}

            <InputLabel id="shift_name">Ca làm việc</InputLabel>
            <Select
              labelId="shift_name"
              required
              value={formik.values.shift_id}
              name="shift_id"
              variant="outlined"
              fullWidth
              size="small"
              onChange={formik.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            {formik.errors.shift_id && formik.touched.shift_id && (
              <FormHelperText error>{formik.errors.shift_id}</FormHelperText>
            )}

            <TextField
              label="Bắt đầu"
              type="date"
              value={formik.values.start_date}
              name="start_date"
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              size="small"
            />

            {formik.errors.start_date && formik.touched.start_date && (
              <FormHelperText error>{formik.errors.start_date}</FormHelperText>
            )}

            <TextField
              label="Kết thúc"
              type="date"
              value={formik.values.end_date}
              name="end_date"
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              size="small"
            />

            {formik.errors.end_date && formik.touched.end_date && (
              <FormHelperText error>{formik.errors.end_date}</FormHelperText>
            )}
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
        <Button onClick={formik.handleSubmit}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSchedulePopup;
