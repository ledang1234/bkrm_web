import React, { useState, useEffect, useRef } from "react";
import { useTheme,makeStyles } from "@material-ui/core/styles";

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
  FormControlLabel,
  Switch,
  Collapse,
  Paper,
  Card,
  CardHeader
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
import SearchIcon from "@material-ui/icons/Search";
import { FormatedImage } from "../../../../components/SearchBar/SearchProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx"
import TagsInput from "../../../../components/TextField/TagsInput"
import AddAttribute from "./AddAttribute"
import RelaltedItemList from "./RelaltedItemList"
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
    category: "",
    unit: "",
    re_order_point: "",
  });

  const productFormik = useFormik({
    initialValues: {
      name: "",
      barcode: "",
      importedPrice: 0,
      salesPrice: 0,
      category: "",
      unit: "",
      re_order_point: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên sản phẩm "),
      importedPrice: Yup.number().required("Nhập giá vốn").moreThan(0, "Giá vốn không được âm"),
      salesPrice: Yup.number().required("Nhập giá bán").moreThan(0, "Giá bán không được âm"),
      re_order_point: Yup.number("Phải là một số").moreThan(0, "Số lượng đặt hàng lại không được âm"),
    }),
  })

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
      bodyFormData.append("name", productFormik.values.name.toString());
      bodyFormData.append("list_price", productFormik.values.salesPrice.toString());
      bodyFormData.append(
        "standard_price",
        productInfo.importedPrice.toString()
      );
      bodyFormData.append("bar_code", productFormik.values.barcode.toString());
      bodyFormData.append("quantity_per_unit", productFormik.values.unit.toString());
      bodyFormData.append(
        "min_reorder_quantity",
        productFormik.values.re_order_point.toString()
      );
      bodyFormData.append(
        "category_uuid",
        productFormik.values.category.toString()
      );
      bodyFormData.append("img_url", imageURL);

      images.forEach((image) => bodyFormData.append("images[]", image));

      await productApi.createProduct(store_uuid, bodyFormData);
      dispatch(statusAction.successfulStatus("Create product successfully"));
      props.setReload(true);
    } catch (error) {
      console.log(error);
      dispatch(statusAction.failedStatus("Create product failed"));
    }
  };

  const [reset,setReset] = useState(true)
  const onReset = () =>{
    setReset(reset => !reset)
  }
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await productApi.getAllCategory(store_uuid);
        setCategoryList(response.data)
        productFormik.setFieldValue("category",response.data[0].uuid)
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    fetchCategoryList();
  }, [store_uuid,reset]);

  const selectSampleProductHandler = (product) => {
    if (product && product.name) {
      try {
        productFormik.setFieldValue("name", product.name, true)
        productFormik.setFieldValue("barcode", product.bar_code, true)
        clearAllImages();
        setDisplay([{ link: product.img_url, isUrl: true }]);
        setImages([]);
        setImageURL(product.img_url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const searchSampleProductHandler = async (searchKey) => {
    return productApi.searchDefaultProducts(searchKey, 1);
  };
  const handleCloseAndReset = () => {
    handleClose();
    productFormik.resetForm()
    clearAllImages();
  };
  const clearAllImages = () => {
    setDisplay([]);
    setImages([]);
    setImageURL("");
  };
  const clearImage = (displayImage) => {
    setDisplay(display.filter((img) => img != displayImage));
    if (displayImage.isUrl) {
      setImageURL("");
    } else {
      setImages(images.filter((image, index) => index !== displayImage.index));
    }
  };
  const renderNameInput = (params) => {
    return (
      <TextField
        {...params}
        required
        label="Tìm kiếm sp mẫu bằng tên hoặc mã vạch"
        variant="outlined"
        fullWidth
        autoFocus
        size="small"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
                <Box
                    component="img"
                    sx={{ height: 23, width: 23,marginRight:-30}}
                    src={barcodeIcon}
                />
            </InputAdornment>
        ),
          onKeyDown: (e) => {
            if (e.key.toLowerCase() === "arrowdown") {
              onFocus(salesPriceRef)
            }
          }
        }}
      />
    );
  };
  const renderOptionTest = (option) => {
    return (
      <Grid fullWidth container direction="row">
        <Grid item xs={3}>
          <FormatedImage url={option.img_url} />
        </Grid>
        <Grid item xs={9} container direction="column">
          <Typography variant="h5">{option.name}</Typography>
          <Typography variant="body2">{option.bar_code}</Typography>
        </Grid>
      </Grid>
    );
  };
  const getOptionLabel = (option) => {
    if (option.name) {
      return option.name + " " + "(" + option.bar_code + ")"
    }
    return option
  }
  const salesPriceRef = useRef()
  const onFocus = (ref) => {
    ref.current.focus()
  }

  //ATTRIBUTE
  // api get all attribute
  const attributeList = [
    {
      id:"1",
      name:'MÀU'
    },
    {
      id:"2",
      name:'SIZE'
    },
    {
      id:"3",
      name:'RAM'
    },
  ]
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  

  // Attr
  const [datas, setDatas] = useState([ { key:  "",  items: []}]);

  // {name:e,product_code:"", bar_code: "",standard_price:0, unit_price :0}
  const [relatedList, setRelatedList] =  useState([]);

  console.log("relatedList",relatedList)
  
 
  

  return (
    <Dialog
      open={open}
      onClose={handleCloseAndReset}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <Box className={classes.root}>
        <AddCategory open={openAddCategory} handleClose={handleCloseCategory} onReset={onReset} />
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
              handleDefaultSelect={selectSampleProductHandler}
              onSelect={selectSampleProductHandler}
              searchApiCall={searchSampleProductHandler}
              renderInput={renderNameInput}
              getOptionLabel={getOptionLabel}
              renderOption={renderOptionTest}
              filterOptions={(options, state) => options}
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
              required
              label="Tên sản phẩm"
              variant="outlined"
              fullWidth
              size="small"
              name="name"
              onChange={productFormik.handleChange}
              value={productFormik.values.name}
              error={productFormik.touched.name && productFormik.errors.name}
              helperText={productFormik.touched.name ? productFormik.errors.name : null}
              onBlur={productFormik.handleBlur}
              type="text"
            />
            <TextField
              label="Mã vạch (mặc định)"
              variant="outlined"
              fullWidth
              size="small"
              name="barcode"
              onKeyDown={(e) => { }}
              onChange={productFormik.handleChange}
              value={productFormik.values.barcode}
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
              className={classes.margin}
            />
            <TextField
              label="Đơn vị"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.margin}
              name="unit"
              onChange={productFormik.handleChange}
              value={productFormik.values.unit}
            />
            <Box className={`${classes.box} ${classes.margin}`}>
              <FormControl required size="small" variant="outlined" fullWidth>
                <InputLabel htmlFor="category">Danh mục</InputLabel>
                <Select
                  native
                  label="Danh mục"
                  id="category"
                  name="category"
                  value={productFormik.values.category}
                  onChange={productFormik.handleChange}
                  onBlur={productFormik.handleBlur}
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
              name="salesPrice"
              inputRef={salesPriceRef}
              value={productFormik.values.salesPrice}
              onChange={productFormik.handleChange}
              error={productFormik.touched.salesPrice && productFormik.errors.salesPrice}
              helperText={productFormik.touched.salesPrice ? productFormik.errors.salesPrice : null}
              onBlur={productFormik.handleBlur}
            />
            <VNDInput
              required
              label="Giá vốn"
              variant="outlined"
              fullWidth
              size="small"
              name="importedPrice"
              value={productFormik.values.importedPrice}
              onChange={productFormik.handleChange}
              error={productFormik.touched.importedPrice && productFormik.errors.importedPrice}
              helperText={productFormik.touched.importedPrice ? productFormik.errors.importedPrice : null}
              onBlur={productFormik.handleBlur}
              className={classes.margin}
            />
            <TextField
              label="Số lượng đặt hàng lại"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.margin}
              name="re_order_point"
              value={productFormik.values.re_order_point}
              onChange={productFormik.handleChange}
              error={productFormik.touched.re_order_point && productFormik.errors.re_order_point}
              helperText={productFormik.touched.re_order_point ? productFormik.errors.re_order_point : null}
              onBlur={productFormik.handleBlur}
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
          
        </Grid>


      {/* ATTRIBUTE */}
        <Card className={classes.attrCard}>
          <CardHeader
           onClick={handleExpandClick}
            action={
              <IconButton 
              size="small"
              className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
              onClick={handleExpandClick}
              aria-expanded={expanded} >
                <ExpandMoreIcon />
              </IconButton>
            }
            title="Thuộc tính"
            className={classes.attrHead}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <AddAttribute attributeList={attributeList} datas={datas} setDatas={setDatas} setRelatedList={setRelatedList}/>
          </Collapse>
    
      </Card>
      {/* GENERATE ATTR */}
      {relatedList.length > 0 ?
       <Card className={classes.attrCard}>
       <CardHeader
         title="Danh sách hàng cùng loại"
         className={classes.attrHead}
       />
          <RelaltedItemList relatedList={relatedList} setRelatedList={setRelatedList}/>
    </Card>
    : null}
     


      {/* Button */}
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


      </Box>
      





     
     
       
    </Dialog >
  );
};

export default AddInventory;
