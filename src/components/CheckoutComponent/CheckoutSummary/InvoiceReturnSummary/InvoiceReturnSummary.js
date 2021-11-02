import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Grid,Avatar,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddCustomer from '../../../PopUpAdd/AddCustomer/AddCustomer'
//import project 
import * as Input from '../../../TextField/NumberFormatCustom'
import { grey} from '@material-ui/core/colors'

import ava from '../../../../assets/img/product/lyimg.jpeg';

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
  ava:{
      width:30,
      height:30
  }
}));
const InvoiceReturnSummary = (props) => {
    const {data} = props;
    const theme = useTheme();
    const classes = useStyles(theme);


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
                            {/* current branch */}
                            Chi nhánh trung tâm
                        </Typography>
                        
                    </Grid>
                    
                    <Grid item xs={4} container direction="column"  alignItems="flex-end">
                        <Typography variant="body2">
                            {/* current date */}
                            29/10/2000
                        </Typography>
                        <Typography variant="body2">
                            {/* current date */}
                            22:30
                        </Typography>
                    </Grid>
                </Grid>
              
                <Grid container direction="row"  className={classes.marginBox} style={{marginBottom:20}} justifyContent="space-between" alignItems="center">
                    <Grid item xs={8} container direction="row"  className={classes.marginBox} alignItems="center">
                        <Typography variant="h3"style={{marginRight:10}}>
                            Trả hoá đơn
                        </Typography>
                        <Typography variant="h3" style={{color:theme.customization.primaryColor[500]}}>
                            #{data.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}container direction="row"  justifyContent="flex-end" className={classes.marginBox} alignItems="center">
                        
                        <Avatar alt="Remy Sharp" src={ava} className={classes.ava} style={{marginRight:10}} />
                        <Typography variant="h5" >
                        {data.customer}
                        </Typography>
                    
                    </Grid>
                   
                </Grid>
        
        


                <Grid container direction="row" justifyContent="space-between" className={classes.marginBox}>
                    <Typography variant="h5" >
                        Số lượng sản phẩm trả
                    </Typography>
                    <Typography variant="body2">
                        5 
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng tiền gốc hàng trả
                    </Typography>
                    <Typography variant="body2">
                        500.000
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng tiền hàng trả
                    </Typography>
                    <Typography variant="body2">
                        500.000
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Phí trả hàng
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}  />
                </Grid>

                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng đơn trả
                    </Typography>
                    <Typography variant="body2">
                        400.000
                    </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="space-between"  alignItems="center" className={classes.marginRow}>
                    <Typography variant="h5">
                        Đã trả khách
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}  />
                </Grid>

                <Button variant="contained" fullWidth color="primary" style={{marginTop:40}}>
                    Trả hàng
                </Button>
            </Grid>
    </Box>

    )
}

export default InvoiceReturnSummary

