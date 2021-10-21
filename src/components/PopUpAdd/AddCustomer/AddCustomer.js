import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import project
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid,Avatar} from '@material-ui/core';




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
  ava: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

}));




const AddCustomer = (props) =>{
    const {handleClose} = props;
    const theme = useTheme();
    const classes = useStyles(theme);

  return (
    <div>
         <DialogTitle id="form-dialog-title">
            <Typography className={classes.headerTitle} variant="h5" >
                Thêm khách hàng
            </Typography>
        </DialogTitle>
        
        
        <DialogContent>
        
      <div className={classes.root}>
          <Grid container direction="row" >
            <Avatar alt="Remy Sharp" className={classes.ava} />
            <Button variant="contained" style={{height:22,textTransform: 'none', marginLeft:20}}  >Chọn ảnh</Button>
          </Grid>
        <Grid container direction="row" justifyContent="space-around"spacing={3}>
          <Grid item xs={7} >
              <TextField id="outlined-basic" label="Tên khách hàng" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Số điện thoại" variant="outlined"  fullWidth size="small"/>
              <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth size="small"/>
              
          </Grid>
          <Grid item xs={5} >
              <TextField id="outlined-basic" label="Ngày sinh" variant="outlined" fullWidth size="small"/>    
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small"/>
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

export default AddCustomer;


