import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddSupplier from '../../../PopUpAdd/AddSupplier/AddSupplier'
//import project 
import * as Input from '../../../TextField/NumberFormatCustom'
import { grey} from '@material-ui/core/colors'

import SupplierData from '../../../../assets/JsonData/supplier.json'

const useStyles = makeStyles((theme) =>
createStyles({
  marginBox:{
    marginTop:30
  },
  marginRow:{
    marginTop:5
  },
  hidden:{
    display: "none",
  }
}));
const ImportSummary = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = (status) => {
        setOpen(false);
    };

    //phuong thuc thanh toan
    const [payment, setPayment] = React.useState('cash');

    const handleChangePayment = (event) => {
        setPayment(event.target.value);
    };


    let  _value = null;

    return (
        
        <Box style={{padding:30,minHeight:'80vh'}}>
                    
            <Grid container direction="column"  alignItems="flex-start" spacing={3}>
                <Grid container direction="row" justifyContent="space-between" >

                    <Grid item  xs={8} container direction="column"  alignItems="flex-start">
                        <Typography variant="h5">
                            Chi nhánh 
                        </Typography>
                        <Typography variant="body2">
                            Chi nhánh trung tâm
                        </Typography>
                        
                    </Grid>
                    
                    <Grid item xs={4} container direction="column"  alignItems="flex-end">
                        <Typography variant="body2">
                            22/12/2008
                        </Typography>
                        <Typography variant="body2">
                            22:30
                        </Typography>
                    </Grid>
                </Grid>
                
                <div style={{ width: '100%'}}>
                    
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={SupplierData}
                            getOptionLabel={(option) => option.name.concat(" - ").concat(option.phone) } 

                            onChange={(event, value) => {_value = value; }} 
                            renderInput={(params) => (
                                <TextField 
                                {...params}
                                fullWidth 
                                placeholder="Tìm nhà cung cấp"
                                margin="normal"  
                                InputProps={_value === null? {
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <SearchIcon style={{color:grey[500]}}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <IconButton aria-label="delete"  size="small" onClick={handleClickOpen} style={{marginRight:-30}}>
                                            <AddIcon/>
                                        </IconButton>
                                        ),
                                    }: {
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <SearchIcon style={{color:grey[500]}}/>
                                        </InputAdornment>
                                    ),
                                    }}
                                
                                />
                            )}  
                            renderOption={(option) => {
                                return (
                                <Grid fullWidth container direction="row" justifyContent="space-between"  >
                                    <Typography variant="h5">{option.name}</Typography>
                                    <Typography variant="body1">{option.phone}</Typography>               
                                </Grid>
                                )
                              }}          
                        />

                </div>
                
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <AddSupplier handleClose={handleClose}/>
                </Dialog>

                <Grid container direction="row" justifyContent="space-between" className={classes.marginBox}>
                    <Typography variant="h5">
                        Tổng số mặt hàng
                    </Typography>
                    <Typography variant="body2">
                            5
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng tiền hàng
                    </Typography>
                    <Typography variant="body2">
                            500.000
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Giảm giá
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}  />
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Cần trả NCC
                    </Typography>
                    <Typography variant="body2">
                        400.000
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                    <Typography variant="h5">
                        Đã trả NCC
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}  />
                </Grid>
                
                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.marginRow}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={payment} onChange={handleChangePayment}>
                            <Grid container direction="row">
                                <FormControlLabel labelPlacement="start" value="card" control={<Radio />} label="Thẻ" />
                                <FormControlLabel labelPlacement="start" value="cash" control={<Radio />} label="Tiền mặt" />
                                
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Button variant="contained" fullWidth color="primary" style={{marginTop:40}}>
                    Nhập hàng
                </Button>
            </Grid>
    </Box>

    )
}

export default ImportSummary

const supplier = [
    { name: '09009839294 - Gia Le', id: 1 },
    { name: '05009839294 - Kiet ',id: 2 },
    { name: '03223929424 - Hai', id: 3 },
    { name: '39009839294 - Khang ',id: 4 },
];