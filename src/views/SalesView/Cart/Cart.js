import React from 'react'

import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
//import library 
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Dialog} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AddCustomer from '../../../components/PopUpAdd/AddCustomer/AddCustomer'


import { grey} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",

    
  },

}));

const Cart = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = (status) => {
        setOpen(false);
    };

    return (
        <Grid container direction="row" justifyContent="space-between"  alignItems="center" spacing={2} >
            <Grid item xs={8}  >
                <Card className={classes.root}>
                    <Box style={{padding:20, minHeight:'80vh'}} >
                        Hello
                    </Box>
                </Card>
            </Grid>




            <Grid item xs={4} className={classes.root} >
                <Card className={classes.root}>
                    <Box style={{padding:20,minHeight:'80vh'}}>
                        
                        <Grid container direction="column"  alignItems="flex-start">
                            <Typography variant="h5">
                                Chi nhánh
                            </Typography>
                            <Typography>
                                Tên nhân viên
                            </Typography>
                            <TextField 
                                style={{marginTop:20}}
                                id="standard-basic" 
                                // label="Khách hàng"  
                                placeholder="Khách hàng" 
                                fullWidth 
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon style={{color:grey[500], marginLeft:-5}}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <IconButton aria-label="delete"  size="small" onClick={handleClickOpen}>
                                        <AddIcon/>
                                    </IconButton>
                                ),
                                }}
                            />
                             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <AddCustomer handleClose={handleClose}/>
                            </Dialog>
                        </Grid>
                        



                    </Box>
                </Card>
            </Grid>
        </Grid>









       
    )
}

export default Cart