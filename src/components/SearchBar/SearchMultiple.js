
import React, { useState, useEffect } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { VNDFormat } from "../TextField/NumberFormatCustom";
import productApi from "../../api/productApi";


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
    List
  } from "@material-ui/core";
import {
    useTheme,
    withStyles,
    makeStyles,
    createStyles,
  } from "@material-ui/core/styles";

  const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      borderRadius: "20px",
    },
  })
);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: scroll;
  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;
`;
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
export default function SearchMultiple(props) {
 const {isVoucher,selectedOption,handleSelectedOption,handleDeleteOption,index} = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [selectedOption, setSelectedOption] = useState(props.selected);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  // redux
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  const loadingData = async (searchKey) => {
    // search product
    if (!isVoucher ){
      const response = await productApi.searchBranchProduct(
        store_uuid,
        branch_uuid,
        searchKey
      );
      setOptions(response.data);
    }else{
        // search voucher 
        // CALL API VOUCHER HERE
      setOptions([{id:"VC00001", name:"HELLOWORLD", quantity:10,value:10000,}]);
    }
   
    
  };

  const handleSelect = (option) =>{
    if (selectedOption.findIndex( (item) => item.uuid === option.uuid)  === -1){
      handleSelectedOption(option,index,"add")
    }else{
      handleSelectedOption(option,index,"delete")
    }
    
    setOptions([])
    setInputValue("")
  }
  //add multiple
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  const renderOption = (option) => {
    //display value in Popper elements
    return (
      <Grid fullWidth container direction="row"style={{padding:'3px 10px 3px 10px'}} onClick={()=>handleSelect(option)}  style={{ cursor: "pointer",padding:5,backgroundColor: selectedOption.findIndex( (item) => item.uuid === option.uuid)  === -1?null: theme.customization.primaryColor[50]}}>
        <Grid item xs={3}>
          <FormatedImage url={option.img_url} />
        </Grid>
        <Grid item xs={9} container direction="column">
          <Typography variant="h5">{`#${option.bar_code}`}</Typography>
          <Typography variant="h5">{option.name}</Typography>
          <Grid container item direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Tồn kho: {option.branch_quantity}
            </Typography>
            <Typography variant="body2">
              Giá bán: <VNDFormat value={option.list_price}></VNDFormat>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const renderOptionVoucher = (option) => {
    //display value in Popper elements
    return (
      <Grid fullWidth container direction="row"style={{padding:'3px 10px 3px 10px'}} onClick={()=>handleSelect(option)}  style={{ cursor: "pointer",padding:5,backgroundColor: selectedOption.findIndex( (item) => item.uuid === option.uuid)  === -1?null: theme.customization.primaryColor[50]}}>
        <Grid item xs={9} container direction="column">
          <Typography variant="h5">{`#${option.id}`}</Typography>
          <Typography variant="h5">{option.name}</Typography>
          <Grid container item direction="row" justifyContent="space-between">
            <Typography variant="body2">
              SL: {option.quantity}
            </Typography>
            <Typography variant="body2">
              Mệnh giá: <VNDFormat value={option.value}></VNDFormat>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  




  return (
    <NoSsr>
      <div>
        <div >
          <InputWrapper >
          {/* {selectedOption.length== 0 ?<Typography style={{margin:"5px 0px 0px 9px"}}>Chọn sản phẩm tặng...</Typography> :null} */}
          { !isVoucher ?selectedOption.map((option) => (
              // suawr laij product_code sau
              <Tag label={option.bar_code.concat(" - ").concat(option.name)} onDelete={()=>{handleSelectedOption(option,index,"delete"); console.log("selectedOption",selectedOption)}} />
            )): 
            selectedOption.map((option) => (
              <Tag label={option.name} onDelete={()=>{handleSelectedOption(option,index,"delete"); console.log("selectedOption",selectedOption)}} />
            ))}
            <input 
              value={inputValue}
              onChange={(event, value) => {
                loadingData(event.target.value)
                setInputValue(event.target.value)
              }}
              onKeyDown={handleKeyDown}
              />
          </InputWrapper>
        </div>
        {options.length > 0 ? (
          <Listbox >
            {!isVoucher ?  
            options.map((option, index) => (
              renderOption(option)
            )):
            options.map((option, index) => (
              renderOptionVoucher(option)
            ))
            }
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}


