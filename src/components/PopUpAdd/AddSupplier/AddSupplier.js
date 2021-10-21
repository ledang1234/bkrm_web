import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import project
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid} from '@material-ui/core';



const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  headerTitle:{
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


