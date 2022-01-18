import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ModalWrapper from "../../../../components/Modal/ModalWrapper";
import productApi from "../../../../api/productApi";
import { useSelector } from "react-redux";
const AddCategory = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await productApi.getAllCategory(store_uuid);
        setCategoryList(response.data);
        console.log(response.data);
      } catch (error) {}
    };
    fetchAllCategory();
  }, []);
  return (
    <ModalWrapper {...props}>
      <Typography variant="h4" gutterBottom>
        {" "}
        Thêm danh mục mới
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 10, maxWidth: 300 }}>
        <Grid item xs={12}>
          <TextField
            label="Tên danh mục"
            variant="outlined"
            size="small"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl size="small" variant="outlined" fullWidth>
            <InputLabel htmlFor="category">Danh mục cha</InputLabel>
            <Select native label="Danh mục cha" id="category">
              <option aria-label="None" value="" />
              {categoryList.map((category) => (
                <option key={category.uuid} value={category.uuid}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <Button
            color="secondary"
            variant="contained"
            style={{ marginRight: 20 }}
            onClick={props.handleClose}
            size="small"
          >
            Hủy
          </Button>
          <Button color="primary" variant="contained" size="small">
            Thêm
          </Button>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default AddCategory;
