import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Button,TextField,DialogActions,DialogContent,DialogTitle,
  Typography,Grid,Avatar,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';


//import project 
import NumberFormatCustom from '../../TextField/NumberFormatCustom'
import MultipleSelect  from '../../MultipleSelect/MultipleSelect'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1),
    },
  },
  headerTitle:{
    fontSize: '1.125rem'
  },
  ava: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom:15
  },
  input: {
    display: 'none',
  },

}));




const AddEmployee = (props) =>{
    const {handleClose} = props;

    // tam thoi
    const statusState = "Success"

    const theme = useTheme();
    const classes = useStyles(theme);

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

    // loại lương
    const [typeSalary, setTypeSalary] = React.useState('');

    const handleTypeSalary = (event) => {
      setTypeSalary(event.target.value);
    };


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
        <Grid container direction="row" justifyContent="space-around"spacing={2}>
          <Grid item xs={6} >
              <TextField id="outlined-basic" label="Tên nhân viên" variant="outlined" fullWidth size="small"/>
              <TextField
                  id="date"
                  label="Ngày sinh"
                  type="date"
                  defaultValue="" //null
                  variant="outlined" 
                  size="small"
                  fullWidth 
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              <TextField id="outlined-basic" label="CMND" variant="outlined" fullWidth size="small"/>

              <TextField id="outlined-basic" label="Số điện thoại" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth size="small"/>
              <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth size="small"/>
          </Grid>
          <Grid item xs={6} >
            {/* Select lưong */}
                <FormControl  className={classes.formControl} fullWidth size="small" variant="outlined" style={{marginTop:8}}>
                    <InputLabel id="demo-simple-select-outlined-label">Lương </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={typeSalary}
                      onChange={handleTypeSalary}
                      label="Age"
                      
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Lương cố định</MenuItem>
                      <MenuItem value={20}>Lương theo ca</MenuItem>
                    </Select>
              </FormControl>
            
              <TextField
                  label="Mức lương"
                  variant="outlined" fullWidth size="small"
                  value={values.numberformat}
                  onChange={handleChange}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />

              <TextField id="outlined-basic" label="Tên tài khoản" variant="outlined" fullWidth size="small"/>

              {/* <TextField id="outlined-basic" label="Quyền" variant="outlined" fullWidth size="small"/> */}
              <MultipleSelect />
              
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

export default AddEmployee;


