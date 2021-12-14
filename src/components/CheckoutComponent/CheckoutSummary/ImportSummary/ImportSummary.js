import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Grid,Card,Box, Typography,TextField,InputAdornment,DialogActions,DialogContent,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddSupplier from '../../../../views/InventoryView/Supplier/AddSupplier/AddSupplier'

import SearchSupplier from '../../../SearchBar/SearchSupplier';

//import project
import * as Input from '../../../TextField/NumberFormatCustom'
import { grey} from '@material-ui/core/colors'

import SupplierData from '../../../../assets/JsonData/supplier.json'
import supplierApi from '../../../../api/supplierApi';
import { CardTravelTwoTone } from '@material-ui/icons';
import BranchSelect from '../../BranchSelect/BranchSelect';
import moment from "moment";
// update state
import update from "immutability-helper";

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
  },
  headerTitle:{
    fontSize: "1.125rem",
  }
}));
const ImportSummary = (props) => {
    const {
        cartData,
        handleSelectSupplier,
        currentSupplier,
        handleUpdateDiscount,
        handleUpdatePaidAmount,
        handleUpdatePaymentMethod,
        handleConfirm,
        selectedBranch,
        setSelectedBranch,
        mode
    } = props;

    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = (status) => {
        setOpen(false);
    };


    const handleChangePayment = (event) => {
        handleUpdatePaymentMethod(event.target.value);
    };

    //mode 2: popup
    const [openPopUp, setOpenPopUp] = React.useState(false);
    const handleClickOpenPopUp = () => {
        setOpenPopUp(true);
    };

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    };


    return (

        <Box style={{padding:30,minHeight:'80vh'}}>

            <Grid container direction="column"  alignItems="flex-start" spacing={3}>
                <Grid container direction="row" justifyContent="space-between" >
                        {/* 1. BASIC INFO */}
                    <Grid item  xs={8} container direction="column"  alignItems="flex-start">
                        {/* <Typography variant="h5">
                            Chi nhánh
                        </Typography> */}
                        {/* <Typography variant="body2">
                            Chi nhánh trung tâm
                        </Typography> */}
                        <BranchSelect 
                            setSelectedBranch={setSelectedBranch}
                            selectedBranch={selectedBranch}
                        />
                    </Grid>

                    <Grid item xs={4} container direction="column"  alignItems="flex-end">
                        <Typography variant="body2">
                            {new Date().toLocaleDateString("es-US")}
                        </Typography>
                        <Typography variant="body2">
                        {new Date().toLocaleTimeString()}
                        </Typography>
                    </Grid>
                </Grid>

                <div style={{ width: '100%'}}>
                    <SearchSupplier
                        handleClickOpen={handleClickOpen}
                        selectedSupplier={currentSupplier ? currentSupplier : {name: "", phone:""}}
                        handleSearchBarSelect={handleSelectSupplier}/>
                </div>

                <AddSupplier  open={open} handleClose={handleClose}/>

                {/* when change mode to menu product */}
                {props.children}

                {/* 2. PAYMENT INFO  */}
                {
                    !mode?
             <>
              {/* 2.1 Mode 1 */}
                <Grid container direction="row" justifyContent="space-between" className={classes.marginBox}>
                    <Typography variant="h5">
                        Tổng số mặt hàng
                    </Typography>
                    <Typography variant="body2">
                        {cartData.cartItem.length}
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng tiền hàng
                    </Typography>
                    <Typography variant="body2">
                        {cartData.total_amount}
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Giảm giá
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }}
                        size="small" inputProps={{style: { textAlign: "right" }}}
                        onChange={(e) => handleUpdateDiscount(e.target.value)}
                    />
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Cần trả NCC
                    </Typography>
                    <Typography variant="body2">
                        {cartData.total_amount - cartData.discount}
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                    <Typography variant="h5">
                        Đã trả NCC
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }}
                        value={cartData.total_amount - cartData.discount}
                        size="small" inputProps={{style: { textAlign: "right" }}}
                        onChange={(e) => handleUpdatePaidAmount(e.target.value)}/>
                </Grid>
                <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                    <Typography variant="h5">
                        Công nợ phải trả
                    </Typography>
                    <Input.ThousandSeperatedInput
                        id="standard-basic" style={{width:90 }}
                        size="small" inputProps={{style: { textAlign: "right" }}}
                        value={cartData.total_amount - cartData.discount - cartData.paid_amount}
                    />
                </Grid>

                <Grid container direction="row" justifyContent="flex-end" alignItems="center" className={classes.marginRow}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1"
                            value={cartData.payment_method} onChange={handleChangePayment}>
                            <Grid container direction="row">
                                <FormControlLabel labelPlacement="start" value="card" control={<Radio />} label="Thẻ" />
                                <FormControlLabel labelPlacement="start" value="cash" control={<Radio />} label="Tiền mặt" />
                            </Grid>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Button variant="contained" fullWidth color="primary" style={{marginTop:40}} onClick={handleConfirm}>
                    Nhập hàng
                </Button>

            </>:
            /* 2.2 Mode 2 */
            <>
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
            <Button variant="contained" fullWidth color="primary" style={{marginTop:20}} onClick={handleClickOpenPopUp}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>Thanh toán </Grid>
                    <Grid item>500.000 </Grid>
                </Grid>
            </Button>
            <Dialog open={openPopUp} onClose={handleClosePopUp}aria-labelledby="form-dialog-title">
                <CheckoutPopUp />
            </Dialog>
            </>}
        </Grid>
    </Box>

    )
}

export default ImportSummary

const CheckoutPopUp = (props)=>{
    const {onClose,handleChangePayment,payment}= props;
    const theme = useTheme();
    const classes = useStyles(theme);
    return(
       <>
        <Box style={{marginTop:20, marginLeft:15, marginBottom:10}}>
            <Typography className={classes.headerTitle} variant="h5">
            Trả tiền NCC
            </Typography>
        </Box>
        <DialogContent>
            <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
                <Typography variant="h5">
                    Tổng tiền hàng
                </Typography>
                <Typography variant="body2">
                    500.000
                </Typography>
            </Grid>
            <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                <Typography variant="h5" style={{paddingRight:50}}>
                    Đã trả CNN
                </Typography>
                <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}   />
            </Grid>
            <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                <Typography variant="h5">
                    Công nợ
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
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={onClose} fullWidth color="primary" style={{marginTop:40}}>
                Thanh toán
            </Button>
        </DialogActions>

        </>
    )
}