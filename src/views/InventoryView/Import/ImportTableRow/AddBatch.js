import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import productApi from "../../../../api/productApi";
import { useSelector } from "react-redux";
import {
  error,
  openNotification,
  success,
} from "../../../../components/StatusPopup/StatusPopup";

export default function AddBatch({ handleSubmit, handleClose, row }) {
  const { store, branch } = useSelector((state) => state.info);
  const formik = useFormik({
    initialValues: {
      batch_code: "",
      additional_quantity: 0,
      expiry_date: null,
    },
    validationSchema: Yup.object({
      additional_quantity: Yup.number()
        .required("Nhập số lượng")
        .moreThan(0, "Số lượng phải lớn hơn không"),
    }),
    onSubmit: (values, actions) => {
      handleSubmit(values);
      handleClose();
    },
  });
  return (
    <Dialog open={true} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Thêm lô mới</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="batch_code"
          label="Mã lô (tự động)"
          fullWidth
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name ? formik.errors.name : null}
        />
        <TextField
          autoFocus
          margin="dense"
          name="expiry_date"
          fullWidth
          defaultValue={new Date().toISOString().substring(0, 10)}
          type="date"
          label="Ngày hết hạn"
          onChange={formik.handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          type="number"
          name="additional_quantity"
          label="Số lượng nhập"
          fullWidth
          error={
            formik.touched.additional_quantity &&
            formik.errors.additional_quantity
          }
          helperText={
            formik.touched.additional_quantity
              ? formik.errors.additional_quantity
              : null
          }
          onChange={formik.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Hủy
        </Button>
        <Button
          disable={!(formik.isValid && Object.keys(formik.touched).length > 0)}
          color="primary"
          onClick={formik.handleSubmit}
        >
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
