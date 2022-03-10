import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
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
  // const [selectedOption, setSelectedOption] = useState(props.selectedSupplier);
  // const [options, setOptions] = React.useState([]);

  // redux
  // const info = useSelector((state) => state.info);
  // const store_uuid = info.store.uuid;

  useEffect(() => {
    // loadingData();
  }, []);

  // const loadingData = async () => {
  //   const response = await supplierApi.getSuppliers(store_uuid);
  //   setOptions(response.data)
  //   setSelectedOption(response.data[0]);
  //   props.handleSearchBarSelect(response.data[0])
  // };

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
        props.selectedSupplier
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
      }
    />
  );

  const getOptionLabel = (option) => (option.name ? option.name : "");

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        freeSolo 
        value={props.selectedSupplier}
        options={props.suppliers}
        getOptionLabel={getOptionLabel}
        onChange={(event, value) => {
          if (value) {
            // setSelectedOption(value);
            props.handleSearchBarSelect(value);
          }
        }}
        renderInput={renderInput}
        renderOption={renderOption}
      />
    </div>
  );
};

export default SearchSupplier;
