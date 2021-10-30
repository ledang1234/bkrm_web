import React, { useState } from "react";
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//import project
import VNDInput from "../../TextField/NumberFormatCustom";
// import img
import avaUpload from "../../../assets/img/product/default-product.png";
import barcodeIcon from "../../../assets/img/icon/barcode1.png";
import AddCategory from "./AddCategory";
import useStyles from "./styles";
const UploadImage = (img) => {
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
  const { handleClose } = props;
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const handleCloseCategory = () => setOpenAddCategory(false);
  const statusState = "Success";

  const [image, setImage] = useState(null);
  const [display, setDisplay] = useState([]);
  const onChange = (e) => {
    setImage(e.target.files[0]);
    setDisplay([...display, URL.createObjectURL(e.target.files[0])]);
  };
  const [productInfo, setProductInfo] = useState({
    name: "",
    importedPrice: 0,
    salesPrice: 0,
    barcode: "",
    category: "",
    unit: "",
  });
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div>
      <Box className={classes.root}>
        <AddCategory open={openAddCategory} handleClose={handleCloseCategory} />
        <Typography className={classes.headerTitle} variant="h5" gutterBottom>
          Thêm sản phẩm
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          spacing={2}
        >
          <Grid item sm={7} xs={12}>
            <TextField
              id="outlined-basic"
              label="Tên sản phẩm"
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              id="input-with-icon-textfield"
              label="Mã vạch (mặc định)"
              variant="outlined"
              fullWidth
              size="small"
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
            <Grid item xs>
              <Box className={`${classes.box} ${classes.margin}`}>
                <FormControl required size="small" variant="outlined" fullWidth>
                  <InputLabel htmlFor="category">Danh mục</InputLabel>
                  <Select
                    native
                    value={productInfo.category}
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        category: e.target.value,
                      })
                    }
                    label="Danh mục"
                    id="category"
                  >
                    <option aria-label="None" value="" />
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
          </Grid>
          <Grid item sm={5} xs={12}>
            <VNDInput
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
              label="Giá vốn"
              variant="outlined"
              fullWidth
              size="small"
              value={productInfo.salesPrice}
              onChange={(e) =>
                setProductInfo({ ...productInfo, salesPrice: e.target.value })
              }
              className={classes.margin}
            />

            <TextField
              id="outlined-basic"
              label="Đơn vị"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.margin}
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
              {display.length === 0 ? <UploadImage /> : null}
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
              onClick={() => handleClose(statusState)}
              variant="contained"
              size="small"
              color="primary"
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddInventory;
