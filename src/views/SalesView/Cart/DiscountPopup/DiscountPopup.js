import React from 'react'
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Grid,
    Avatar,
    Dialog,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    FormControlLabel,
    Checkbox,
    Divider,
    ButtonBase,
    Tooltip,
    CardHeader,
    Input,
    Chip,
    IconButton,
    FormLabel,
    RadioGroup,
    Radio
  } from "@material-ui/core";
import clsx  from "clsx"

import ModalWrapperWithClose from "../../../../components/Modal/ModalWrapperWithClose"
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) =>
    createStyles({

    weight:{
        fontWeight:500,
        color: "#000",
        fontSize: 14,
    },
    headerTitle: {
        fontSize: "1.125rem",
      },

})
);
const DiscountPopup = ({open,onClose,title}) => {
    const theme = useTheme();
  const classes = useStyles(theme);

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    if(event.target.value === value){
        setValue('');
    }else{
        setValue(event.target.value);
    }
    
  };
    return (
        // <Dialog open={open} handleClose={onClose} title={title}>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="form-dialog-title">
                        <Typography className={classes.headerTitle} variant="h3" >
                            {title}
                        </Typography>
                    </DialogTitle>

                    <IconButton aria-label="close"   onClick={onClose}>
                        <CloseIcon  fontSize="small" />
                    </IconButton>
            </Grid>
           
            <DialogContent>
                <Grid  container direction="row" justifyContent="" style={{marginBottom:8}}>
                    <Grid item style={{width:10,marginRight:30}} >                      
                    </Grid>
                    <Grid item style={{width:250,marginRight:30}} >
                        <Typography className={clsx(classes.text,classes.weight)} >Chương trình khuyến mãi</Typography>
                    </Grid>
                    <Grid item style={{width:250, marginRight:30}}>
                        <Typography className={clsx(classes.text,classes.weight)} >Hình thức khuyến mãi</Typography>
                    </Grid>
                </Grid>
                <Divider style={{marginBottom:8}} />
                {/* // */}
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <Grid  container direction="row" justifyContent="">
                            <Grid item style={{width:10,marginRight:30}} >
                                <FormControlLabel value="female" control={<Radio  size="small"/>}  />
                            </Grid>
                            <Grid item style={{width:250,marginRight:30,marginTop:10, color:"#383737"}} >
                                <Typography >VOUCHER</Typography>
                            </Grid>
                            <Grid item style={{width:250, marginRight:30,marginTop:10,color:"#383737"}}>
                                <Typography  >Giảm giá tổng tiền</Typography>
                            </Grid>
                            <Grid item style={{width:250, marginRight:30,marginTop:10,color:"#383737"}}>
                                <Typography  >Giảm giá 100</Typography>
                            </Grid>
                        </Grid>
                </RadioGroup>
            </FormControl>
            <Divider />
                
            </DialogContent>
            <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          size="small"
          color="secondary"
        >
          Huỷ
        </Button>
        <Button
         
          variant="contained"
          size="small"
          color="primary"
        >
          Áp dụng
        </Button>
      </DialogActions>
  
              
        </Dialog>
    )
}

export default DiscountPopup
