import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid, Box,InputAdornment} from '@material-ui/core';


//import project 
import NumberFormatCustom from '../../TextField/NumberFormatCustom'
// import img
import avaUpload from '../../../assets/img/product/default-product.png';
import barcodeIcon from '../../../assets/img/icon/barcode1.png'


const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    fontSize: '1.125rem'
  },

}));


const UploadImage  = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 53,
        width: 53, 
        borderRadius:2,
        marginLeft:15,

      }}
      src={avaUpload}
    />
   
    
  )
}

const AddInventory = (props) =>{
    const {handleClose} = props;

    // tam thoi
    const statusState = "Success"


    // đổi thành state sau (price format)
    const [values, setValues] = React.useState({
      numberformat: '',
    });
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    };

    const [import_values, setImportValues] = React.useState({
      numberformat: '',
    });
    const handleImportChange = (event) => {
      setImportValues({
        ...import_values,
        [event.target.name]: event.target.value,
      });
    };
    
    
    const theme = useTheme();
    const classes = useStyles(theme);



    

  return (
    <div>
         <DialogTitle id="form-dialog-title">
            <Typography className={classes.headerTitle} variant="h5">
                Thêm sản phẩm
            </Typography>
        </DialogTitle>
        
        
        <DialogContent>
        
      <div className={classes.root}>
          
        <Grid container direction="row" justifyContent="space-around"spacing={3}>
          <Grid item xs={7} >
              <TextField id="outlined-basic" label="Tên sản phẩm" variant="outlined" fullWidth size="small"/>
              <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Mã vạch (mặc định)" variant="outlined"  fullWidth size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box component="img" sx={{height: 25,width: 25 }} src={barcodeIcon}/>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField id="outlined-basic" label="Danh mục" variant="outlined" fullWidth size="small"/>
          </Grid>
          <Grid item xs={5} >
              {/* <TextField id="outlined-basic" label="Giá bán" variant="outlined" fullWidth size="small"/> */}
              {/* <TextField id="outlined-basic" label="Giá vốn" variant="outlined" fullWidth size="small"/> */}
              <TextField
                  label="Giá bán"
                  variant="outlined" fullWidth size="small"
                  value={values.numberformat}
                  onChange={handleChange}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
                <TextField
                  label="Giá vốn"
                  variant="outlined" fullWidth size="small"
                  value={import_values.numberformat}
                  onChange={handleImportChange}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
             
              <TextField id="outlined-basic" label="Đơn vị" variant="outlined" fullWidth size="small"/>
          </Grid>
          <Grid container direction="row" >
              <UploadImage />
              <UploadImage />
              <UploadImage />
              <UploadImage />
              <UploadImage />
          </Grid>
        </Grid>
        
      </div>
        
        </DialogContent>
       
        <DialogActions>
          <Button onClick={() => handleClose(null)}  variant="contained" size="small" color="secondary">
            Huỷ
          </Button>
          <Button onClick={() => handleClose(statusState)}  variant="contained" size="small" color="primary">
            Thêm 
          </Button>
        </DialogActions>
       
    </div>
  );
}

export default AddInventory;

