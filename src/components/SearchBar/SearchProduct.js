import React, {useState, useEffect} from 'react'
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTheme, withStyles,makeStyles,createStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from './SearchBar'
import { grey } from '@material-ui/core/colors'

// import img
import icon from '../../assets/img/product/img.jpeg';
import barcodeIcon from "../../assets/img/icon/barcode_grey.png";


import InventoryData from '../../assets/JsonData/inventory.json'
import productApi from '../../api/productApi'
import { useSelector } from 'react-redux';
import { render } from 'sass';
const useStyles = makeStyles((theme) =>
createStyles({
    input:{
        borderRadius:'20px'
    },
    
}));

const CustomTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: 14,
        },
      },
    },
  })(TextField);

const FormatedImage  = (props) => {
    return (
      <Box
        component="img"
        sx={{
          height: 53,
          width: 53, 
          borderRadius:10,
          marginRight:15
        }}
        src={props.url}
      />
      
    )
  }

const SearchProduct = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    // redux
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid
    
    const loadingData = async () => {
      const response = await productApi.getProducts(store_uuid)
      return response
    }

    const renderOption = (option) => {
      //display value in Popper elements
      return (
          <Grid fullWidth container direction="row"  >
          <Grid item xs={3}><FormatedImage url={option.img_url}/></Grid>
          <Grid item xs={9}container direction="column"  >
          <Typography variant="h5">{`#${option.uuid}`}</Typography>
              <Typography variant="h5">{option.name}</Typography>
              <Grid container item  direction="row" justifyContent="space-between" >
              <Typography variant="body2">{`Tồn kho: ${option.quantity_available}`} </Typography>
              <Typography variant="body2">{`Giá bán: ${option.list_price}`} </Typography>     
              </Grid> 
          </Grid>                
      </Grid>
      )
    }

    const renderInput = (params) => (
      <CustomTextField
        {...params}
        fullWidth
        placeholder="Tìm sản phẩm (mã, tên, mã vạch)"
        variant="outlined"
        size="small"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color:grey[500]}}/>
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
    )

    return (
        <div style={{ width: 320, paddingLeft: 20,}}>
            <SearchBar 
              handleSearchBarSelect={props.handleSearchBarSelect}
              loadingData={loadingData}
              renderInput={renderInput}
              selected={{}}
              getOptionLabel={(option) => option.name}
              renderOption={renderOption}/>
        </div>
        
    )
}

export default SearchProduct
