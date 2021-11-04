import React from 'react'

import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
//import library 
import {Grid,Card,Box, Typography,TextField,InputAdornment,IconButton,Button,Dialog,FormControlLabel,Checkbox,FormControl,FormLabel,RadioGroup, Radio} from '@material-ui/core'



import { grey} from '@material-ui/core/colors'
import ImportSummary from '../../../components/CheckoutComponent/CheckoutSummary/ImportSummary/ImportSummary';
import ListItem from '../../../components/CheckoutComponent/ListItem/ListItem'
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
  },
}));

const Import = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    // Cart data get from search_product component 
    const cartData = [
        // QUANTITY có thể edit -> làm sao để truyền quatity edit ngược về cartData ??
        //dựa vào id của text field quatity ??
       { stt: 1, id: 123, name:"áo", quantity:2, price:200 },
       { stt: 2, id: 12,  name:"quan", quantity:1, price:220 },
       { stt: 3, id: 134,  name:"banh", quantity:3, price:240 },   
    ];
   
    // FILE này xử lý state -> connect search bar, listitem, với summary lại
    return (
        <Grid container direction="row" justifyContent="space-between"  alignItems="center" spacing={2} >
            <Grid item xs={12} sm={8}  >
                <Card className={classes.root}>
                    <Box style={{padding:30, minHeight:'80vh'}} >
                        <ListItem headCells={HeadCells.ImportHeadCells}  cartData={cartData}  tableType={TableType.IMPORT} />
                    </Box>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.root} >
                <Card className={classes.root}>
                    <ImportSummary cartData={cartData} />
                </Card>
            </Grid>
        </Grid>
    )
}

export default Import



  