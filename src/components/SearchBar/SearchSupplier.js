import React, { useEffect } from "react";
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import {
  useTheme,
  withStyles,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";

import supplierApi from "../../api/supplierApi";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { render } from "sass";
const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      borderRadius: "20px",
    },
  })
);

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 14,
      },
    },
  },
})(TextField);

const SearchSupplier = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
  }, [props.handleSelectSupplier])

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const loadingData = async () => {
    const response = await supplierApi.getSuppliers(store_uuid);
    return response;
  };

  const renderOption = (option) => {
    //display value in Popper elements
    return (
      <Grid fullWidth container direction="row" justifyContent="space-between">
        <Typography variant="h5">{option.name}</Typography>
        <Typography variant="body1">{option.phone}</Typography>
      </Grid>
    );
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      fullWidth
      placeholder="Tìm nhà cung cấp"
      margin="normal"
      InputProps={
        props.selectedSupplier === {}
          ? {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: grey[500] }} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={props.handleClickOpen}
                  style={{ marginRight: -30 }}
                >
                  <AddIcon />
                </IconButton>
              ),
            }
          : {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: grey[500] }} />
                </InputAdornment>
              ),
            }
      }
    />
  );

  const getOptionLabel = (option) =>  option.name ? option.name : ""
  return (
    <div style={{ width: "100%" }}>
      <SearchBar
        handleSearchBarSelect={props.handleSearchBarSelect}
        loadingData={loadingData}
        renderInput={renderInput}
        renderOption={renderOption}
        selected={props.selectedSupplier}
        getOptionLabel={getOptionLabel}
      />
    </div>
  );
};

export default SearchSupplier;
