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
      margin: theme.spacing(1),
      // width: '30ch',
      // marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    // padding: '24px',
    fontSize: '1.125rem'
  },

}));




const AddSupplier = (props) =>{
    const {handleClose} = props;
    const theme = useTheme();
    const classes = useStyles(theme);

  return (
    <div>
        <DialogTitle id="form-dialog-title">
            <Typography className={classes.headerTitle} variant="h5">
                Thêm nhà cung cấp
            </Typography>
        </DialogTitle>
        
        
        <DialogContent>
        
      <div className={classes.root}>
        <Grid container direction="collumn" justifyContent="space-around"spacing={3}>
              <TextField id="outlined-basic" label="Tên nhà cung cấp" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Địa chỉ" variant="outlined"  fullWidth size="small"/>
            
              <Grid direction="row" container justifyContent="flex-start" spacing={1}>
                  <Grid item xs={4} >
                      <TextField id="outlined-basic" label="Số điện thoại" variant="outlined"  size="small" fullWidth/>
                  </Grid>
                  <Grid item xs={6} >
                      <TextField id="outlined-basic" label="Email" variant="outlined"  size="small" fullWidth/>
                  </Grid>
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

export default AddSupplier;


