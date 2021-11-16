import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import {
  useTheme,
  withStyles,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import { useSelector } from "react-redux";

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

const SearchBar = (props) => {
  const {
    handleSearchBarSelect,
    loadingData,
    renderOption,
    renderInput,
    selected,
    getOptionLabel
  } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  //------------
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const [selectedOption, setSelectedOption] = useState(props.selected)

  useEffect(() => {
  }, [props.selected])

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const res = await loadingData();

      if (active) {
        setOptions([...res.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  // --------------

  return (
    <div style={{ width: 320, paddingLeft: 20 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}

        value={props.selected}
        options={options}
        loading={loading}
        getOptionLabel={getOptionLabel}
        onKeyDown={(event) => {
          if (event.key === "Enter" && selectedOption) {
            // Prevent's default 'Enter' behavior.
            event.defaultMuiPrevented = true;
            handleSearchBarSelect(selectedOption);
          }
        }}
        onChange={(event, value) => {
          setSelectedOption(value);
        }}
        renderInput={renderInput}
        renderOption={renderOption}
      />
    </div>
  );
};

export default SearchBar;
