import React, {useState, useEffect} from 'react'
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTheme, withStyles,makeStyles,createStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import { grey} from '@material-ui/core/colors'

// import img
import icon from '../../assets/img/product/img.jpeg';
import barcodeIcon from "../../assets/img/icon/barcode_grey.png";


import InventoryData from '../../assets/JsonData/inventory.json'
import productApi from '../../api/productApi'
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) =>
createStyles({
    input:{
        borderRadius:'20px'
    }
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

const SearchProduct = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    // redux
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid

    useEffect(() => {
      let active = true

      if (!loading) {
        return undefined
      }

      (async () => {
        const res = await productApi.getProducts(store_uuid);
  
        if (active) {
          setOptions([...res.data]);
        }
      })();
      

      return () => {
        active = false;
      };
    }, [loading])

    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    return (
        <div style={{ width: 320, paddingLeft: 20,}}>
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
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name }  
            onKeyDown={(event,value) => {
                if (event.key === 'Enter') {
                    // Prevent's default 'Enter' behavior.
                    // event.defaultMuiPrevented = true;
                    console.log('enter to increase quatity');
                    // console.log(cartValue);
                }
            }}
            renderInput={(params) => (
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
                      padding: ' 10px',
                    },
                }}
                />  
            )}
            renderOption={(option) => {
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
              }}         
        />
        </div>
        
    )
}

export default SearchProduct
