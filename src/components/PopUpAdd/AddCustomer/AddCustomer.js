import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid,Avatar} from '@material-ui/core';

//import project 



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
  textField: {
    width:'100%',
  },
  input: {
    display: 'none',
  },

}));




const AddCustomer = (props) =>{
    const {handleClose} = props;
    // tam thoi
    const statusState = "Success"
    
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
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" style={{height:22,textTransform: 'none', marginLeft:20}}  >Chọn ảnh</Button>
            </label>
            
          </Grid>
        <Grid container direction="row" justifyContent="space-around"spacing={3}>
          <Grid item xs={7} >
              <TextField id="outlined-basic" label="Tên khách hàng" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Số điện thoại" variant="outlined"  fullWidth size="small"/>
              <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth size="small"/>
              
          </Grid>
          <Grid item xs={5} >
              <TextField
                  id="date"
                  label="Ngày sinh"
                  type="date"
                  defaultValue="" //null
                  variant="outlined" 
                  size="small"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small"/>
          </Grid>
        </Grid>
      </div>
        
     
        
        </DialogContent>
       

       
        <DialogActions>
          <Button onClick={() => handleClose(null)} variant="contained" size="small" color="secondary">
            Huỷ
          </Button>
          <Button onClick={() => handleClose(statusState)} variant="contained" size="small" color="primary">
            Thêm 
          </Button>

        </DialogActions>
    </div>
  );
}

export default AddCustomer;


