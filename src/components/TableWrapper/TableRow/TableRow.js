import React from 'react'
import { makeStyles ,createStyles} from '@material-ui/core/styles';
import clsx from "clsx";

//import library
import {TableCell,TableRow,Box,Avatar,ListItem,Typography, Chip} from '@material-ui/core';

// import img
import icon from '../../../assets/img/product/img.jpeg';
import ava from '../../../assets/img/product/lyimg.jpeg';

// import project
import CustomerDetail from '../TableDetail/CustomerDetail/CustomerDetail'
import EmployeeDetail from '../TableDetail/EmployeeDetail/EmployeeDetail'
import InventoryDetail from '../TableDetail/InventoryDetail/InventoryDetail'
import InventoryOrderDetail from '../TableDetail/InventoryOrderDetail/InventoryOrderDetail'
import InventoryReturnDetail from '../TableDetail/InventoryReturnDetail/InventoryReturnDetail'
import InvoiceDetail from '../TableDetail/InvoiceDetail/InvoiceDetail'
import InvoiceReturnDetail from '../TableDetail/InvoiceReturnDetail/InvoiceReturnDetail'
import SupplierDetail from '../TableDetail/SupplierDetail/SupplierDetail'
import * as  TableType  from '../../../assets/constant/tableType';

const useRowStyles = makeStyles((theme)=>
  createStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
   
  },
  rowClicked:{
    backgroundColor: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main ,
    
  },
  row:{
    '&:hover': {
      backgroundColor: theme.customization.mode === "Light" ? theme.palette.secondary.light : theme.palette.secondary.main ,
   },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  fontName:{
    fontWeight: 450,
  }
}));

  function ReturnDataTable (props){
    const {type,row} = props;
    switch(type){
      case TableType.INVENTORY:
        return <TableInventoryCell row={row} />
      case TableType.INVENTORY_ORDER:
        return <TableInventoryOrderCell row={row}/>
      case TableType.INVENTORY_RETURN:
          return <TableInventoryReturnOrderCell row={row}/>
      case TableType.SUPPLIER:
        return  <TableSupplierCell row={row}/>
      case TableType.INVOICE:
          return  <TableInvoiceCell row={row}/>
      case TableType.INVOICE_RETURN:
          return  <TableInvoiceReturnCell row={row}/>
      case TableType.EMPLOYEE:
          return  <TableEmployeeCell row={row}/>
      case TableType.CUSTOMER:
          return  <TableCustomerCell row={row}/>
      default:
        return <TableInventoryCell row={row} />
  
    }
  }
  function ReturnDetailRow (props){
    const {type,parentProps} = props;
    switch(type){
      case TableType.INVENTORY:
        return <InventoryDetail parentProps={parentProps} />
      case TableType.INVENTORY_ORDER:
        return <InventoryOrderDetail parentProps={parentProps}/>
      case TableType.INVENTORY_RETURN:
          return <InventoryReturnDetail parentProps={parentProps}/>
      case TableType.SUPPLIER:
        return  <SupplierDetail parentProps={parentProps}/>
      case TableType.INVOICE:
          return  <InvoiceDetail parentProps={parentProps}/>
      case TableType.INVOICE_RETURN:
          return  <InvoiceReturnDetail parentProps={parentProps}/>
      case TableType.EMPLOYEE:
          return  <EmployeeDetail parentProps={parentProps}/>
      case TableType.CUSTOMER:
          return  <CustomerDetail parentProps={parentProps}/>
      default:
        return  null
  
    }

  }
  const FormatedImage  = () => {
    return (
      <Box
        component="img"
        sx={{
          height: 53,
          width: 53, 
          borderRadius:10,
          marginRight:15
        }}
        src={icon}
      />
      
    )
  }
  const FormatedStatus  = (props) => {
    if (props.debt === 0){
      return ( <Chip label="Trả đủ" color="#76ff03" variant="outlined"  style={{backgroundColor:'#76ff03',  fontWeight:500, marginLeft:10, height:28}}>{"Trả đủ"} </Chip>)
    }
    else{
      return( <Chip label="Còn nợ" color="#ff3d00" variant="outlined"style={{backgroundColor:"#ff3d00" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip> )
    }
  }
  
  const FormatedProductStatus  = (props) => {
    if (props.quantity === 0){
      return (<Chip label="Hết hàng" color="#ff007d" variant="outlined"  style={{backgroundColor:'#ff007d',  fontWeight:500, marginLeft:10, height:28}}>{"Trả đủ"} </Chip>)
      //Gia tri low stock ??
    }else if (props.quantity <=10){
      return( <Chip label="Sắp hết" color="#ffc02b" variant="outlined"style={{backgroundColor:"#ffc02b" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip>  )
    }else{
      return(  <Chip label="Còn hàng" color="#00ded7" variant="outlined"style={{backgroundColor:"#00ded7" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip> )
    }
    
  }
/// ROW.ID cua HEADCELL phai trung vois ten ATTRIBUTE
const TableInventoryCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">{row.id}</TableCell>

      <TableCell align="left" style={{minWidth:200}} >
        <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}>
            <FormatedImage/>
            <Typography className={classes.fontName}>{row.name}</Typography>
        </ListItem>  
      </TableCell>
      
      <TableCell align="left">{row.category}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.import_price}</TableCell>
      <TableCell align="right">
        <FormatedProductStatus quantity={row.quantity}/>
      </TableCell>
      <TableCell align="right" className={classes.fontName}>{row.quantity}</TableCell>
    </>
  )
}
const TableInventoryOrderCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left"className={classes.fontName}>{row.date}</TableCell>
      <TableCell align="left"className={classes.fontName} style={{minWidth:150}}>{row.supplier}</TableCell>
      <TableCell align="left">{row.branch}</TableCell>
      <TableCell align="left">{row.payment}</TableCell>
      <TableCell align="right" className={classes.fontName}>{row.total}</TableCell>
      <TableCell align="center">
        <FormatedStatus debt={row.debt}/>
      </TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableInventoryReturnOrderCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left"className={classes.fontName}>{row.date}</TableCell>
      <TableCell align="left"className={classes.fontName} style={{minWidth:150}}>{row.supplier}</TableCell>
      <TableCell align="left">{row.branch}</TableCell>
      <TableCell align="left">{row.payment}</TableCell>
      <TableCell align="right" className={classes.fontName}>{row.total}</TableCell>
      <TableCell align="left">{row.import_id}</TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableSupplierCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">{row.id}</TableCell>
      <TableCell align="left" className={classes.fontName} style={{minWidth:150}}>{row.name}</TableCell>
      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left" style={{minWidth:150}}>{row.address}</TableCell>
      <TableCell align="left">
      <FormatedStatus debt={row.debt}/>
      </TableCell>
    </>
  )
}
const TableInvoiceCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left" className={classes.fontName}>{row.date}</TableCell>
      <TableCell align="left"style={{minWidth:150}}className={classes.fontName}>{row.customer}</TableCell>
      <TableCell align="left">{row.branch}</TableCell>
      <TableCell align="left">{row.payment}</TableCell>
      <TableCell align="right" className={classes.fontName}>{row.total}</TableCell>
      <TableCell align="center">
          <FormatedStatus debt={row.debt}/>
      </TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableInvoiceReturnCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left" className={classes.fontName}>{row.date}</TableCell>
      <TableCell align="left"style={{minWidth:100}}className={classes.fontName}>{row.customer}</TableCell>
      <TableCell align="left">{row.branch}</TableCell>
      <TableCell align="left">{row.payment}</TableCell>
      <TableCell align="right" className={classes.fontName}>{row.total}</TableCell>
      <TableCell align="left">{row.invoid_id}</TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableEmployeeCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">{row.id}</TableCell>
      
      <TableCell align="left" style={{minWidth:200}} >
        <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}>
            <Avatar alt="Remy Sharp" src={ava} style={{marginRight:20}} className={classes.ava} />
            <Typography className={classes.fontName}>{row.name}</Typography>
        </ListItem>  
      </TableCell>

      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">{row.email}</TableCell>
    </>
  )
}
const TableCustomerCell = ({row}) =>{
 const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">{row.id}</TableCell>
      
      <TableCell align="left" style={{minWidth:200}} >
        <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}>
            <Avatar alt="Remy Sharp" src={ava} style={{marginRight:20}} className={classes.ava} />
            <Typography className={classes.fontName}>{row.name}</Typography>
        </ListItem>  
      </TableCell>

      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="right" >{row.total_cost}</TableCell> 
      <TableCell align="left" >
        <FormatedStatus debt={row.debt} />
        
      </TableCell>
    </>
  )
}

function TableRowInfo(props) {
    const { row, handleOpenRow,openRow, tableType} = props;
    const classes = useRowStyles();
  
    return (
        < >
        {/* Row */}
        <TableRow
          onClick={() => handleOpenRow(row.id)}   
          key={row.id}
          className={ clsx(classes.row,(openRow === row.id) ? classes.rowClicked : null)}
          
        >
           
            <ReturnDataTable row={row} type={tableType}/> 
          </TableRow>
         
         {/* Collapse */}
         
         <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
              <ReturnDetailRow  type={tableType} parentProps={props}/>       
         </TableCell>
       
       </TableRow>
      </>
    );
  }

export default TableRowInfo