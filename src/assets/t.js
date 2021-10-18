import React from 'react'
import { lighten, makeStyles ,createStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import  { useState, useEffect } from "react";
import { grey} from '@material-ui/core/colors'
import clsx from "clsx";
import TableDetail from '../TableDetail/TableDetail';
import * as  TableType  from '../../../assets/constant/tableType';
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
 

  }));

function ReturnDataTable (type, row){
  switch(type){
    case TableType.TEST:
      return <TableTestCell row={row}/>
    case TableType.INVENTORY:
      return <TableInventoryCell row={row}/>

  }
}
const TableTestCell = ({row}) =>{
  // const {row} = props
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
     
      </TableRow>
         <TableRow>
         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
             {/* doi lai thanh id */}
             {/* {ReturnDataTable(tableType,row)} */}
             {/* <TableTestCell row={row}/> */}
          
      <TableCell align="left" >{row.name}</TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    
         </TableCell>
       </TableRow>
       </>
    );
  }

export default TableRowInfo