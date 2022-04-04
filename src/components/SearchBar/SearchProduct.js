import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  useTheme,
  withStyles,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";

// import img
import icon from "../../assets/img/product/img.jpeg";
import barcodeIcon from "../../assets/img/icon/barcode_grey.png";

import InventoryData from "../../assets/JsonData/inventory.json";
import productApi from "../../api/productApi";
import { useSelector } from "react-redux";
import { render } from "sass";
import { VNDFormat } from "../TextField/NumberFormatCustom";
import defaultProduct from "../../assets/img/product/default-product.png"
import setting from "../../assets/constant/setting"

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      borderRadius: "20px",
    },
  })
);

export const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 14,
      },
    },
  },
})(TextField);

export const FormatedImage = (props) => {
  return (
    <Box
      component="img"
      sx={{
        height: 53,
        width: 53,
        borderRadius: 10,
        marginRight: 15,
      }}
      src={props.url}
    />
  );
};

const SearchProduct = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedOption, setSelectedOption] = useState({});
  const [options, setOptions] = React.useState([]);

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;
  const store_setting = info.store.general_configuration? JSON.parse(info.store.general_configuration): setting
  const products = info.products;


  const renderOption = (option) => {
    // console.log("option",option)
    //display value in Popper elements
    return (
      <Grid
        fullWidth
        container
        direction="row"
        style={{
          backgroundColor: selectedOption.name
            ? "rgba(164,247,247,0.3)"
            : "rgba(0,0,0,0)",
        }}
      >
        <Grid item xs={3}>
          <FormatedImage url={JSON.parse(option.img_urls ? option.img_urls : "[]").at(0) || defaultProduct} />
        </Grid>
        <Grid item xs={9} container direction="column">
          <Typography variant="h5">{`#${option.product_code}`}</Typography>
          <Typography variant="h5">{option.name}</Typography>
          <Grid container item direction="row" justifyContent="space-between">
           
        
            <Typography variant="body2">
            { store_setting?.inventory.status? `Tồn kho: ${option.branch_quantity}`  :null}
            </Typography>
         
           {props.isCart? 
           <Typography variant="body2">
           Giá bán: <VNDFormat value={option.list_price}></VNDFormat>
         </Typography>:null} 
         {!props.isCart? 
            <Typography variant="body2">
              Giá nhập: <VNDFormat value={option.standard_price}></VNDFormat>
            </Typography>:null} 
           
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderInput = (params) => (
    <CustomTextField
      {...params}
      id="autoValue"
      fullWidth
      placeholder="Tìm sản phẩm (mã sp, tên)"
      variant="outlined"
      size="small"
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: grey[500] }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Box
              component="img"
              sx={{ height: 23, width: 23 }}
              src={barcodeIcon}
            />
          </InputAdornment>
        ),

        style: {
          padding: " 10px",
        },
      }}
    />
  );

  const getOptionLabel = (option) => {
    return option.name ? `${option.name}-${option.bar_code}-${option.product_code}` : ""
  };

  // just filter
  const filterOptions = (options, state) => options;
  return (
    <div style={{ width: 320, paddingLeft: 20 }}>
      <Tooltip
        title={`Space: tìm kiếm, Tab để chọn lựa chọn đầu tiên và tăng số lượng, Delete để xóa lựa chọn hiện tại`}
      >
        <Autocomplete
          options={products}
          freeSolo
          // CÁI NÀY ĐỂ SET GIÁ TRỊ TEXT FIELD
          // inputValue={inputValue}

          // BỎ CÁI NÀY TỰ EMPTY
          autoComplete
          getOptionLabel={getOptionLabel}
          onChange={(event, value) => {
            if (value?.name) {
              setSelectedOption(value);
              props.handleSearchBarSelect(value);
            }
          }}
          renderInput={renderInput}
          renderOption={renderOption}
          value={selectedOption}
          clearOnEscape={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // increase if selected
              if (selectedOption.name) {
                props.handleSearchBarSelect(selectedOption);
              }
            } else if (e.key === "Backspace") {
              if (selectedOption?.name) {
                // console.log("reset");
                e.preventDefault();
                e.stopPropagation();
                setSelectedOption({});
              }
            }
          }}
          blurOnSelect={false}

        />
      </Tooltip>
    </div>
  );
};

export default SearchProduct;
