import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as TableType from '../../../assets/constant/tableType'
import {useTheme, makeStyles,createStyles,withStyles} from "@material-ui/core/styles";
import { Typography,Card,CardContent,Paper, CardHeader, Divider ,Box,ListItem,Grid,IconButton,ButtonBase,Avatar} from '@material-ui/core';
import avaUpload from '../../../assets/img/product/default-product.png';

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    // padding: '24px',
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
              <TextField id="outlined-basic" label="Mã vạch (mặc định)" variant="outlined"  fullWidth size="small"/>
              <TextField id="outlined-basic" label="Danh mục" variant="outlined" fullWidth size="small"/>
          </Grid>
          <Grid item xs={5} >
              <TextField id="outlined-basic" label="Giá bán" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Giá vốn" variant="outlined" fullWidth size="small"/>
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
          <Button onClick={handleClose} variant="contained" size="small" color="secondary">
            Huỷ
          </Button>
          <Button onClick={handleClose} variant="contained" size="small" color="primary">
            Thêm 
          </Button>
        </DialogActions>
       
        {/* <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined" size="small" style={{background:theme.customization.secondaryColor[50]}}>
            Huỷ
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined" size="small" style={{background:theme.customization.primaryColor[50]}}>
            Thêm sản phẩm
          </Button>
        </DialogActions> */}
    </div>
  );
}

export default AddInventory;





{/*
   <TextField
required
id="outlined-required"
label="Required"
defaultValue="Hello World"
variant="outlined"
/>
<TextField
id="outlined-number"
label="Number"
type="number"
InputLabelProps={{
  shrink: true,
}}
variant="outlined"
/>
<TextField id="outlined-search" label="Search field" type="search" variant="outlined" /> 
*/}