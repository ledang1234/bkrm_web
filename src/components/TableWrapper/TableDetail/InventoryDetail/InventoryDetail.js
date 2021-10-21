import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Box,Grid,Collapse,Typography} from '@material-ui/core';

//import image
import avaUpload from '../../../../assets/img/product/img.jpeg';


const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    fontSize: '1.125rem'
  },
  typo:{
    marginBottom:20
  }

}));

const UploadImage  = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 190,
        width: 190, 
        borderRadius:2,
        marginLeft:15,

      }}
      src={avaUpload}
    />
    
  )
}
const InventoryDetail = (props) => {
    const {row,openRow }= props.parentProps;

    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Collapse in={ openRow === row.id } timeout="auto" unmountOnExit>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>
              <Grid  container direction="row" justifyContent="flex-start">
                  <Grid item xs={5}>
                      <UploadImage />
                  </Grid>
                <Grid item xs={7}>
                    <Grid container direction="row" justifyContent="flex-start" > 
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Mã hàng </Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Mã vạch </Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.barcode} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Danh mục</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.category} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5"gutterBottom component="div">Giá bán</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.price} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Giá vốn</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.import_price} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={2} >
                        <Typography variant="h5" gutterBottom component="div">Tồn kho</Typography>    
                      </Grid>
                      <Grid item xs={3} >
                        <Typography variant="body1" gutterBottom component="div">{row.quantity} </Typography>
                      </Grid>
                  </Grid>
                </Grid>
               
              </Grid>

             </Box>
           </Collapse>
    )
}

export default InventoryDetail
