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
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

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

  useEffect(() => {

  }, [props.selectedCustomer]);
console.log("selectedCustomer",props.selectedCustomer)
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
        // props.selectedCustomer?.name.length === 0 
        !props.selectedCustomer
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
                  onClick={()=>{
                    props.handleSearchBarSelect(null)
                    props.setAddCustomer({ name: "", phone: "" })
                  }}
                  style={{ marginRight: -30 }}
                >
                  <ClearOutlinedIcon fontSize="small" />
                </IconButton>
              ),
            }
      }
    />
  );

  const getOptionLabel = (option) => (option.name ? option.name.concat(option.phone? ` - ${option.phone}` :'') : "");

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        autoComplete={false}
        freeSolo
        onKeyUp={(event) => {
          // if (event.key === "Enter") {
          //   props.handleSearchCustomer(event.target.value) 
          // }
          if(props.selectedCustomer && (event.key === "Delete" || event.key === "Backspace") ){
            props.handleSearchBarSelect(null)
          }
        }}
        
       
        value={props.selectedCustomer}
        options={props.customers.filter(item => item.status ==='active')}
        getOptionLabel={getOptionLabel}
        onChange={(event, value) => {
          if (value) {
            // setSelectedOption(value);
            props.handleSearchBarSelect(value);
          }
        }}
        // onInputChange={()=>{
        //   if(props.selectedCustomer?.name.length !== 0){
        //     // props.handleSearchBarSelect(null)
        //     props.setAddCustomer({ name: "", phone: "" })
        //   }
          
        // }}
        renderInput={renderInput}
        renderOption={renderOption}
      />
    </div>
  );
};

export default SearchCustomer;
