import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
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
import VNDInput from "../../../../components/TextField/NumberFormatCustom";
// import img
import avaUpload from "../../../../assets/img/product/default-product.png";
import barcodeIcon from "../../../../assets/img/icon/barcode1.png";
import AddCategory from "./AddCategory";
import useStyles from "./styles";
import productApi from "../../../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import SearchWithAutoComplete from "../../../../components/SearchBar/SearchWithAutoComplete";
import { urltoFile } from "../../../../api/helper";
import { statusAction } from "../../../../store/slice/statusSlice";
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
const AddInventory = (props) => {
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
  const [imageURL, setImageURL] = useState();
  const addImageHandler = (e) => {
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setImages([...images, e.target.files[0]]);
    setDisplay([
      ...display,
      {
        index: images.length,
        link: URL.createObjectURL(e.target.files[0]),
        isUrl: false,
      },
    ]);
  };
  const [productInfo, setProductInfo] = useState({
    name: "",
    barcode: "",
    importedPrice: 0,
    salesPrice: 0,
    category: {
      uuid: "",
      name: "Mặc Định",
    },
    unit: "",
    re_order_point: "",
  });

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);
  const addProductHandler = async () => {
    handleCloseAndReset();
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("name", productInfo.name.toString());
      bodyFormData.append("list_price", productInfo.salesPrice.toString());
      bodyFormData.append(
        "standard_price",
        productInfo.importedPrice.toString()
      );
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
      bodyFormData.append("img_url", imageURL.toString());
      // bodyFormData.append("images[]", images);
      images.forEach((image) => bodyFormData.append("images[]", image));
      console.log(productInfo);
      await productApi.createProduct(store_uuid, bodyFormData);
      dispatch(statusAction.successfulStatus("Create product successfully"));
      props.setReload(true);
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Create product failed"));
    }
  };
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await productApi.getAllCategory(store_uuid);
        const defautCategory = response.data[0];
        setCategoryList(response.data);
        setProductInfo((productInfo) => {
          return { ...productInfo, category: { ...defautCategory } };
        });
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    fetchCategoryList();
  }, [store_uuid]);

  const selectSampleProductHandler = (product) => {
    try {
      setProductInfo({
        ...productInfo,
        name: product.name,
        barcode: product.bar_code,
      });
      setDisplay([...display, { link: product.img_url, isUrl: true }]);
      setImages([]);
      setImageURL(product.img_url);
    } catch (error) {
      console.log(error);
    }
  };

  const searchSampleProductHandler = async (searchKey) => {
    return productApi.searchDefaultProducts(searchKey, 1);
  };
  const handleCloseAndReset = () => {
    handleClose();
    setProductInfo({
      name: "",
      barcode: "",
      importedPrice: 0,
      salesPrice: 0,
      category: {
        uuid: "",
        name: "Mặc Định",
      },
      unit: "",
      re_order_point: 0,
    });
    clearAllImages();
  };
  const clearAllImages = () => {
    setDisplay([]);
    setImages([]);
    setImageURL(null);
  };
  const clearImage = (displayImage) => {
    setDisplay(display.filter((img) => img != displayImage));
    if (displayImage.isUrl) {
      setImageURL(null);
    } else {
      setImages(images.filter((image, index) => index !== displayImage.index));
    }
  };
  const renderNameInput = (params) => (
    <TextField
      {...params}
      required
      label="Tìm kiếm sản phẩm mẫu bằng tên hoặc mã vạch"
      variant="outlined"
      fullWidth
      size="small"
    />
  );
  return (
    <Dialog
      open={open}
      onClose={handleCloseAndReset}
      aria-labelledby="form-dialog-title"
    >
      <Box className={classes.root}>
        <AddCategory open={openAddCategory} handleClose={handleCloseCategory} />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 20 }}
        >
          <Typography className={classes.headerTitle} variant="h5">
            Thêm sản phẩm
          </Typography>
          <Box style={{ width: "70%" }}>
            <SearchWithAutoComplete
              onSelect={selectSampleProductHandler}
              searchApiCall={searchSampleProductHandler}
              renderInput={renderNameInput}
              getOptionLabel={(option) => option.name}
            />
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={2}
        >
          <Grid item sm={7} xs={12}>
            <TextField
              label="Tên sản phẩm"
              variant="outlined"
              fullWidth
              size="small"
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
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
                <Tooltip title="Xóa tất cả hình ảnh">
                  <Button size="small" onClick={() => clearImage(img)}>
                    <Box
                      component="img"
                      sx={{
                        height: 70,
                        width: 70,
                        marginLeft: 7,
                        marginRight: 7,
                        borderRadius: 2,
                      }}
                      src={img.link}
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
                <input type="file" hidden onChange={addImageHandler} />
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
              onClick={handleCloseAndReset}
              variant="contained"
              size="small"
              color="secondary"
              style={{ marginRight: 20 }}
            >
              Huỷ
            </Button>
            <Button
              onClick={() => {
                addProductHandler();
              }}
              variant="contained"
              size="small"
              color="primary"
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddInventory;
