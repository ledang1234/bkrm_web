/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import productApi from "../../api/productApi";
import { useEffect } from "react";

export default function SearchWithAutoComplete(props) {
  const {
    searchApiCall,
    onSelect,
    renderInput,
    renderOption,
    getOptionLabel,
    value,
  } = props;
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const loadingData = async (e, searchKey) => {
    setSearchValue(searchKey);
  };
  useEffect(() => {
    const fetchData = async (searchKey = searchValue) => {
      try {
        const response = await searchApiCall(searchKey);
        setOptions(response.data);
      } catch (error) {}
    };
    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [searchValue]);
  useEffect(() => {
    console.log(value);
  }, [value]);

  const FormatedImage = (props) => {
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


  return (
    <Autocomplete
      disableCloseOnSelect
      options={options}
      freeSolo={true}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onInputChange={loadingData}
      onChange={(e, value) => onSelect(value)}
      size="small"
      renderInput={renderInput}
    />
  );
}