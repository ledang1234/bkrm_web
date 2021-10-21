import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Box,Grid,TableHead,TableBody,Typography,Table,TableCell,TableRow,Collapse} from '@material-ui/core';




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


const InvoiceDetail = (props) => {
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
                  <Grid container direction="row" justifyContent="flex-start" > 
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Mã hoá đơn </Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Ngày bán </Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.date} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Tên khách hàng</Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.customer} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5"gutterBottom component="div">Tên người bán</Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.employee} </Typography>
                      </Grid>
                  </Grid>
                     
                  </Grid>
                    <Grid item xs={5}>
                    
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Tổng tiền</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.total}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Chi nhánh thực hiện</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.branch} </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Phương thức thanh toán</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.payment} </Typography>
                        </Grid>
                    </Grid>
                  </Grid>

          
               
               </Grid>
 



               <Typography variant="h4" gutterBottom component="div" style={{marginTop:30}}>
                 Danh sách sản phẩm
               </Typography>
               <Table size="small" aria-label="purchases">
                 <TableHead>
                   <TableRow>
                     <TableCell>#</TableCell>
                     <TableCell>Sảm phẩm</TableCell>
                     <TableCell align="right">Danh mục</TableCell>
                     <TableCell align="right">Giá bán </TableCell>
                     <TableCell align="right">Giá vốn</TableCell>
                     <TableCell align="right">Tồn kho </TableCell>
                     <TableCell align="right">Số lượng </TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
    
                    {row.list.map((historyRow) => (
                     <TableRow key={historyRow.product_id}>
                       <TableCell component="th" scope="row">
                         {historyRow.product_id}
                       </TableCell>
                       <TableCell>{historyRow.name}</TableCell>
                       <TableCell align="right">{historyRow.category_id}</TableCell>
                       <TableCell align="right">
                         {historyRow.price}
                       </TableCell>
                       <TableCell align="right">
                         {historyRow.import_price}
                       </TableCell>
                       <TableCell align="right">
                         {historyRow.quantity}
                       </TableCell>
                       <TableCell align="right">
                         2
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table> 
               <Box style={{background:theme.customization.primaryColor[50]}}>
               <Grid container direction="row" justifyContent="flex-end">
                    <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Tổng tiền</Typography>    
                    </Grid>
                    <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">450</Typography>
                    </Grid>
                    <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Tổng số luong</Typography>    
                    </Grid>
                    <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">2</Typography>
                    </Grid>
                    </Grid>
                    </Box>
             </Box>
           </Collapse>
    )
}

export default InvoiceDetail
