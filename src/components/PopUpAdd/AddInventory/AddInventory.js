import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import project
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid, Box} from '@material-ui/core';


// import img
import avaUpload from '../../../assets/img/product/default-product.png';

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
       
    </div>
  );
}

export default AddInventory;

