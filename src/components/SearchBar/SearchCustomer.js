import React, { useEffect } from "react";
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

import Autocomplete from "@material-ui/lab/Autocomplete";

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

const SearchCustomer = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [selectedOption, setSelectedOption] = useState(props.selected)
  // const [options, setOptions] = React.useState([]);

  useEffect(() => {}, [props.selectedCustomer]);

  // const loadingData = async () => {
  //   const response = await customerApi.getCustomers(store_uuid);
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
      placeholder="Tìm khách hàng"
      margin="normal"
      InputProps={
        props.selectedCustomer
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
        autoComplete={false}
        freeSolo={false}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            props.handleSearchCustomer(event.target.value) 
          }
        }}
       
        value={props.selectedCustomer}
        options={props.customers}
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

export default SearchCustomer;
