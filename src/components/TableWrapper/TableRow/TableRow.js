import React from 'react'
import { lighten, makeStyles ,createStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import  { useState, useEffect } from "react";
import { grey} from '@material-ui/core/colors'
import clsx from "clsx";
import TableDetail from '../TableDetail/TableDetail';
import * as  TableType  from '../../../assets/constant/tableType';
import icon from '../../../assets/img/product/img.jpeg';
import ava from '../../../assets/img/product/ava.png';


const useRowStyles = makeStyles((theme)=>
  createStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
   
  },
  rowClicked:{
    backgroundColor:grey[200],

  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
 

  }));

  function ReturnDataTable (props){
    const {type,row} = props;
    switch(type){
      case TableType.TEST:
        return <TableTestCell row={row} />
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
  const FormatedImage  = () => {
    return (
      <Box
        component="img"
        sx={{
          height: 40,
          width: 60, 
          borderRadius:2,
        }}
        src={icon}
      />
      
    )
  }
  const FormatedStatus  = (props) => {
    if (props.debt === 0){
      return (
        <Box component="span" m={1}>
        OK
      </Box>
      )
    }else{
      return(
        <Box component="span" m={1}>
            Còn nợ
        </Box>
      )
    }
  }
const TableTestCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.name}</TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </>
  )
}

const TableInventoryCell = ({row}) =>{
  const classes = useRowStyles();
  return (
    <>
      {/* <TableCell align="left" >{row.image_url}</TableCell> */}
      {/* <TableCell align="left" >
          <Avatar alt="Remy Sharp" src="../../../assets/img/product/1.jpg"  />
      </TableCell> */}
      {/* <TableCell align="left">
      <Avatar alt="Remy Sharp" src={require('../../../assets/img/product/1.jpg')}/>
      </TableCell> */}
      {/* <TableCell align="left"><FormatedImage  /></TableCell> */}
      
      <TableCell align="left">
          <Avatar alt="Remy Sharp" src={icon} className={classes.large} />
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.import_price}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
    </>
  )
}
const TableInventoryOrderCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left">{row.supplier}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
      <TableCell align="center">
        <FormatedStatus debt={row.debt}/>
      </TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableInventoryReturnOrderCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left">{row.supplier}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
      <TableCell align="left">{row.import_id}</TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableSupplierCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.name}</TableCell>
      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
      <TableCell align="center">
      <FormatedStatus debt={row.debt}/>
      </TableCell>
    </>
  )
}
const TableInvoiceCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left">{row.customer}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
      <TableCell align="center">
      <FormatedStatus debt={row.debt}/>
      </TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableInvoiceReturnCell = ({row}) =>{
  return (
    <>
      <TableCell align="left" >{row.id}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left">{row.customer}</TableCell>
      <TableCell align="right">{row.total}</TableCell>
      <TableCell align="left">{row.invoid_id}</TableCell>
      <TableCell align="left">{row.employee}</TableCell>
    </>
  )
}
const TableEmployeeCell = ({row}) =>{
  // const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">
          <Avatar alt="Remy Sharp" src={ava} />
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">{row.email}</TableCell>
      {/* <TableCell align="left">{row.address}</TableCell> */}
      {/* <TableCell align="left">
      <FormatedStatus debt={row.debt}/>
      </TableCell> */}
    </>
  )
}
const TableCustomerCell = ({row}) =>{
  // const classes = useRowStyles();
  return (
    <>
      <TableCell align="left">
          <Avatar alt="Remy Sharp" src={ava} />

      </TableCell>
      <TableCell align="left" >{row.name}</TableCell>
      <TableCell align="left">{row.phone}</TableCell>
      <TableCell align="left">{row.total_cost}</TableCell>
      
      <TableCell align="center">
        <FormatedStatus debt={row.debt}/>
      </TableCell>
    </>
  )
}

function TableRowInfo(props) {
    const { row, handleOpenRow,openRow, tableType} = props;
    const classes = useRowStyles();
  
    return (
        < >
        <TableRow
          hover 
          onClick={() => handleOpenRow(row.name)}   
          key={row.name}
          //doi lai thanh id
          className={ (openRow === row.name) ? classes.rowClicked : null}
          
        >
           {/* <TableTestCell row={row}/> */}
           <ReturnDataTable row={row} type={tableType}/> 
      </TableRow>
         <TableRow>
         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
             {/* doi lai thanh id */}
             
              <TableDetail parentProps={props}/>
         </TableCell>
       </TableRow>
       </>
    );
  }

export default TableRowInfo