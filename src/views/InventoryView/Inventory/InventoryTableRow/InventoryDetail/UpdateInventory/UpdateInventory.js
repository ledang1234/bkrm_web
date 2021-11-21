import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
//import library
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//import project
import VNDInput from "../../../../../../components/TextField/NumberFormatCustom";
// import img
import avaUpload from "../../../../../../assets/img/product/default-product.png";
import barcodeIcon from "../../../../../../assets/img/icon/barcode1.png";
import AddCategory from "../../../AddCategory/AddCategory";
import useStyles from "./styles";
import productApi from "../../../../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { statusAction } from "../../../../../../store/slice/statusSlice";
const UploadImages = (img) => {
  return (
    <Box
      component="img"
      sx={{
        height: 70,
        width: 70,
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 2,
      }}
      src={avaUpload}
    />
  );
};
const UpdateInventory = (props) => {
  const dispatch = useDispatch();
  const { handleClose, open } = props;
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const handleCloseCategory = () => setOpenAddCategory(false);
  const [categoryList, setCategoryList] = useState([
    {
      uuid: "",
      parent_category_id: null,
      name: "",
      created_at: "",
      updated_at: "",
    },
  ]);
  const [images, setImages] = useState([]);
  const [display, setDisplay] = useState([]);
  const onChange = (e) => {
    setImages([...images, e.target.files[0]]);
    setDisplay([...display, URL.createObjectURL(e.target.files[0])]);
  };
  const [productInfo, setProductInfo] = useState({
    name: "",
    importedPrice: "",
    salesPrice: "",
    barcode: "",
    category: {
      uuid: "37526a21-06e1-43ee-bb77-dca5e901ff32",
      parent_category_id: null,
      name: "Mặc Định",
    },
    unit: "",
    re_order_point: "",
  });

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const theme = useTheme();
  const classes = useStyles(theme);
  const updateProductHandler = async () => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("name", productInfo.name.toString());
      bodyFormData.append("list_price", productInfo.importedPrice.toString());
      bodyFormData.append("standard_price", productInfo.salesPrice.toString());
      bodyFormData.append("bar_code", productInfo.barcode.toString());
      bodyFormData.append("quantity_per_unit", productInfo.unit.toString());
      bodyFormData.append(
        "min_reorder_quantity",
        productInfo.re_order_point.toString()
      );
      bodyFormData.append(
        "category_uuid",
        productInfo.category.uuid.toString()
      );
      // images.forEach((image) => bodyFormData.append("images[]", image));
      const response = await productApi.updateProduct(
        store_uuid,
        props.productInfo.uuid,
        bodyFormData
      );
      handleClose(1);
      dispatch(statusAction.successfulStatus("Sửa thành công"));
    } catch (error) {
      console.log("here", error);
      handleClose(0);
      dispatch(statusAction.failedStatus("Sửa thất bại"));
    }
  };
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await productApi.getAllCategory(store_uuid);
        setCategoryList(response.data);
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    fetchCategoryList();
    setProductInfo({
      name: props.productInfo.name,
      importedPrice: props.productInfo.list_price,
      salesPrice: props.productInfo.standard_price,
      barcode: props.productInfo.bar_code,
      category: props.productInfo.category,
      unit: props.productInfo.quantity_per_unit,
      re_order_point: props.productInfo.min_reorder_quantity,
    });
  }, [store_uuid, props.productInfo]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <AddCategory open={openAddCategory} handleClose={handleCloseCategory} />
      <Box className={classes.root}>
        <Typography
          className={classes.headerTitle}
          variant="h5"
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          Chỉnh sửa sản phẩm
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={2}
        >
          <Grid item sm={7} xs={12}>
            <TextField
              required
              label="Tên sản phẩm"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
              value={productInfo.name}
            />

            <TextField
              label="Mã vạch (mặc định)"
              variant="outlined"
              fullWidth
              size="small"
              value={productInfo.barcode}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      component="img"
                      sx={{ height: 25, width: 25 }}
                      src={barcodeIcon}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setProductInfo({ ...productInfo, barcode: e.target.value })
              }
              className={classes.margin}
            />
            <TextField
              label="Đơn vị"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.margin}
              value={productInfo.unit}
              onChange={(e) => {
                setProductInfo({ ...productInfo, unit: e.target.value });
              }}
            />
            <Box className={`${classes.box} ${classes.margin}`}>
              <FormControl required size="small" variant="outlined" fullWidth>
                <InputLabel htmlFor="category">Danh mục</InputLabel>
                <Select
                  native
                  value={productInfo.category.uuid}
                  InputLabelProps={{ shrink: !!productInfo.category.uuid }}
                  onChange={(e) => {
                    const cat = categoryList.find(
                      (item) => item.uuid === e.target.value
                    );
                    setProductInfo({
                      ...productInfo,
                      category: cat,
                    });
                  }}
                  label="Danh mục"
                  id="category"
                >
                  {categoryList.map((category) => (
                    <option key={category.uuid} value={category.uuid}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Tooltip title="Thêm danh mục">
                <IconButton
                  size="small"
                  style={{ marginLeft: 5 }}
                  onClick={() => setOpenAddCategory(true)}
                >
                  <AddIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item sm={5} xs={12}>
            <VNDInput
              required
              label="Giá bán"
              variant="outlined"
              fullWidth
              size="small"
              value={productInfo.importedPrice}
              onChange={(e) =>
                setProductInfo({
                  ...productInfo,
                  importedPrice: e.target.value,
                })
              }
            />
            <VNDInput
              required
              label="Giá vốn"
              variant="outlined"
              fullWidth
              size="small"
              value={productInfo.salesPrice}
              onChange={(e) => {
                setProductInfo({ ...productInfo, salesPrice: e.target.value });
              }}
              className={classes.margin}
            />

            <TextField
              label="Số lượng đặt hàng lại"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.margin}
              onChange={(e) =>
                setProductInfo({
                  ...productInfo,
                  re_order_point: e.target.value,
                })
              }
              value={productInfo.re_order_point}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              style={{ marginTop: 10 }}
            >
              {display.map((img) => (
                <Tooltip title="Xóa">
                  <Button
                    size="small"
                    onClick={() =>
                      setDisplay(display.filter((item) => item !== img))
                    }
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 70,
                        width: 70,
                        marginLeft: 7,
                        marginRight: 7,
                        borderRadius: 2,
                      }}
                      src={img}
                    />
                  </Button>
                </Tooltip>
              ))}
              {display.length === 0 ? <UploadImages /> : null}
              <IconButton
                disabled={display.length > 3 ? true : false}
                color="primary"
                size="medium"
                component="label"
              >
                <input type="file" hidden onChange={onChange} />
                <AddIcon />
              </IconButton>
            </Box>
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
            <Button
              onClick={() => handleClose(null)}
              variant="contained"
              size="small"
              color="secondary"
              style={{ marginRight: 20 }}
            >
              Huỷ
            </Button>
            <Button
              onClick={() => {
                updateProductHandler();
              }}
              variant="contained"
              size="small"
              color="primary"
            >
              Sửa
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default UpdateInventory;
