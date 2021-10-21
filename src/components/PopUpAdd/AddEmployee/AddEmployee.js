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
import { Typography,Card,CardContent,Paper, CardHeader, Divider ,ListItem,Grid,IconButton,ButtonBase,Avatar} from '@material-ui/core';


const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(0.5),
      // width: '30ch',
    },
  },
  headerTitle:{
    // padding: '24px',
    fontSize: '1.125rem'
  },
  ava: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom:15
  },

}));




const AddEmployee = (props) =>{
    const {handleClose} = props;
    const theme = useTheme();
    const classes = useStyles(theme);

  return (
    <div>
         <DialogTitle id="form-dialog-title">
            <Typography className={classes.headerTitle} variant="h5">
                Thêm nhân viên
            </Typography>
        </DialogTitle>
              
        <DialogContent>
        
      <div className={classes.root}>
           <Grid container direction="row" >
            <Avatar alt="Remy Sharp" className={classes.ava} />
            <Button variant="contained" style={{height:22,textTransform: 'none', marginLeft:20}}  >Chọn ảnh</Button>
          </Grid>
        <Grid container direction="row" justifyContent="space-around"spacing={2}>
          <Grid item xs={6} >
              <TextField id="outlined-basic" label="Tên nhân viên" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Ngày sinh" variant="outlined"  fullWidth size="small"/>
              <TextField id="outlined-basic" label="CMND" variant="outlined" fullWidth size="small"/>

              <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth size="small"/>
          </Grid>
          <Grid item xs={6} >
              <TextField id="outlined-basic" label="Loại lương" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Mức lương" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Quyền" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Tên tài khoản" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Mật khẩu" variant="outlined" type="password"fullWidth size="small"/>
              <TextField id="outlined-basic" label="Nhập lại mật khẩu" variant="outlined" type="password" fullWidth size="small"/>
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

export default AddEmployee;


