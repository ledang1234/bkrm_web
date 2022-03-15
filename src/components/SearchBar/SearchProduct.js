import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
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

  const loadingData = async (searchKey) => {
    try {
      const response = await productApi.searchBranchProduct(
        store_uuid,
        branch_uuid,
        searchKey
      );
      setOptions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderOption = (option) => {
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
          <FormatedImage url={option.img_url} />
        </Grid>
        <Grid item xs={9} container direction="column">
          <Typography variant="h5">{`#${option.product_code}`}</Typography>
          <Typography variant="h5">{option.name}</Typography>
          <Grid container item direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Tồn kho: {option.branch_quantity}
            </Typography>
            <Typography variant="body2">
              Giá bán: <VNDFormat value={option.list_price}></VNDFormat>
            </Typography>
            <Typography variant="body2">
              Giá nhập: <VNDFormat value={option.standard_price}></VNDFormat>
            </Typography>
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
      onKeyDown={(e) => {
        if (e.key === " ") {
          // call search api and selected the first option
          if (e.target.value) {
            loadingData(e.target.value);
          }
        } else if (e.key === "Tab") {
          e.preventDefault();
          e.stopPropagation();
          // increase if selected
          console.log(selectedOption);
          if (selectedOption.name) {
            props.handleSearchBarSelect(selectedOption);
          } else {
            setSelectedOption(options.length ? options[0] : {});
          }
        } else if (e.key === "Backspace") {
          if (selectedOption?.name) {
            // console.log("reset");
            e.preventDefault();
            e.stopPropagation();
            setSelectedOption({});
            setOptions([]);
          }
        }
      }}
    />
  );

  const getOptionLabel = (option) => (option.name ? option.name : "");

  // just filter
  const filterOptions = (options, state) => options;
  return (
    <div style={{ width: 320, paddingLeft: 20 }}>
      <Tooltip
        title={`Space: tìm kiếm, Tab để chọn lựa chọn đầu tiên và tăng số lượng, Delete để xóa lựa chọn hiện tại`}
      >
        <Autocomplete
          options={selectedOption.name ? [selectedOption] : options}
          freeSolo={true}
          // CÁI NÀY ĐỂ SET GIÁ TRỊ TEXT FIELD
          // inputValue={inputValue}

          // BỎ CÁI NÀY TỰ EMPTY
          autoComplete={false}
          getOptionLabel={getOptionLabel}
          onChange={(event, value) => {
            if (value) {
              setSelectedOption(value);
            }
          }}
          renderInput={renderInput}
          renderOption={renderOption}
          filterOptions={filterOptions}
          value={selectedOption}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          blurOnSelect={false}
        />
      </Tooltip>
    </div>
  );
};

export default SearchProduct;
