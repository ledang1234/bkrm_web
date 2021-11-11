import ImportReturnSummary from '../../../components/CheckoutComponent/CheckoutSummary/ImportReturnSummary/ImportReturnSummary'


import React from 'react'
import useStyles from "../../../components/TableCommon/style/mainViewStyle";

//import library
import {Dialog,TextField,Card,ListItem,DialogContent,Box,Grid,TableHead,TableBody,Typography,Table,TableCell,TableRow,Collapse,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';

import InvoiceReturnSummary from '../../../components/CheckoutComponent/CheckoutSummary/InvoiceReturnSummary/InvoiceReturnSummary'

import CloseIcon from '@material-ui/icons/Close';
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'
import SearchProduct from "../../../components/SearchBar/SearchProduct";
import TableHeader from '../../../components/TableCommon/TableHeader/TableHeader'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'
import {getComparator,stableSort} from '../../../components/TableCommon/util/sortUtil'
import * as Input from '../../../components/TextField/NumberFormatCustom'
import ButtonQuantity from "../../../components/Button/ButtonQuantity";


const InventoryReturnPopUp = (props) => {
    const {row,classes, handleCloseReturn } =props;

    //2. Table sort
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('stt');
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
        <Grid  container direction="row" justifyContent="space-between"  alignItems="center" >
            <ListItem style={{paddingTop:20,marginBottom:-20, marginLeft:25}}>
                <Typography variant="h3" style={{marginRight:20}} >Trả hàng nhập</Typography>
                
                {/* Search nayf chir search những sản phẩm trong hoá đơn thôi -> đổi lại thanh search khác sau */}
                <SearchProduct />
            </ListItem>   

            <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseReturn}>
                <CloseIcon />
            </IconButton>   
        </Grid>
                
        <DialogContent style={{marginTop:25}}>
            <Grid container direction="row" justifyContent="space-between"  alignItems="center" spacing={2} >
                <Grid item xs={12} sm={8}  >
                    <Card className={classes.card}>
                        <Box style={{padding:30, minHeight:'75vh'}} >
                            {/* JSON data attribute phải giongso table head id */}
                          {/* <ListItem headCells={HeadCells.CartReturnHeadCells}  cartData={row.list} tableType={TableType.CART_RETURN} /> */}
                          <TableWrapper isCart={true} >
                                <TableHeader
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    headerData={HeadCells.ImportReturnHeadCells}

                                />
                                <TableBody>
                                {
                                    stableSort(row.list, getComparator(order, orderBy))
                                        .map((row, index) => {
                                        return (
                                            <ImportReturnTableRow row={row}/> 
                                        );})
                                }
                                </TableBody>
                        </TableWrapper> 
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.card} >
                    <Card className={classes.card}>
                        <ImportReturnSummary  data={row}/>
                    </Card>
                </Grid>
            </Grid>
        </DialogContent>
    </>
    )
}

export default InventoryReturnPopUp
const ImportReturnTableRow = ({row}) =>{
    const classes = useStyles();
    
    const [quantity, setQuantity] = React.useState(row.quantity);
    const [show, setShow] = React.useState('none');
    return (
      <TableRow hover key={row.id}>
         <TableCell align="left" style={{width:5}}>{row.stt}</TableCell>
          {/* <TableCell align="left">{row.id}</TableCell> */}
          <TableCell align="left" >{row.name}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">
            <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" inputProps={{style: { textAlign: "right" }}} defaultPrice={row.price}  />
          </TableCell>
      
          <TableCell align="left" padding='none' >
            <ButtonQuantity quantity={quantity} setQuantity={setQuantity} show={show} setShow={setShow}/> 
          </TableCell> 
        
  
          <TableCell align="right" className={classes.boldText}>{row.price * row.quantity}</TableCell>
       
      </TableRow>
    )
  }
  