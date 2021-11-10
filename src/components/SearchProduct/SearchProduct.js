import React from 'react'
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTheme, withStyles,makeStyles,createStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import { grey} from '@material-ui/core/colors'

// import img
import icon from '../../assets/img/product/img.jpeg';
import barcodeIcon from "../../assets/img/icon/barcode_grey.png";


import InventoryData from '../../assets/JsonData/inventory.json'

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

const FormatedImage  = () => {
    return (
      <Box
        component="img"
        sx={{
          height: 53,
          width: 53, 
          borderRadius:10,
          marginRight:15
        }}
        src={icon}
      />
      
    )
  }

const SearchProduct = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    let cartValue = null;

    return (
        <div style={{ width: 320, paddingLeft: 20,}}>
            <Autocomplete
            onChange={(event, value) => {console.log(value); cartValue = value;}}
            id="free-solo-demo"
            freeSolo
            options={InventoryData}
            getOptionLabel={(option) => option.name.concat(" - ").concat(option.id.toString()).concat(" - ").concat(option.barcode) }  
            onKeyDown={(event,value) => {
                if (event.key === 'Enter') {
                    // Prevent's default 'Enter' behavior.
                    // event.defaultMuiPrevented = true;
                    console.log('enter to increase quatity');
                    console.log(cartValue);
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
                    <Grid item xs={3}><FormatedImage/></Grid>
                    <Grid item xs={9}container direction="column"  >
                    <Typography variant="h5">{`#${option.id}`}</Typography>
                        <Typography variant="h5">{option.name}</Typography>
                        <Grid container item  direction="row" justifyContent="space-between" >
                        <Typography variant="body2">{`Tồn kho: ${option.quantity}`} </Typography>
                        <Typography variant="body2">{`Giá bán: ${option.price}`} </Typography>     
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
