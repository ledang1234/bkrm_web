import React from 'react'
import { lighten, makeStyles ,createStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import  { useState, useEffect } from "react";
import { grey} from '@material-ui/core/colors'
import clsx from "clsx";
import TableDetail from '../TableDetail/TableDetail';

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

function TableRowInfo(props) {
    const { row,labelId ,handleOpenRow,openRow} = props;
    const classes = useRowStyles();
  
    return (
        < >
        <TableRow
          hover 
          onClick={() => handleOpenRow(row.name)}   
          key={row.name}
          //doi lai thanh id
          className={ (openRow === row.name) ?classes.rowClicked : null}
          
        >
    
          <TableCell component="th" id={labelId} scope="row" >{row.name}</TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
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