import React from 'react'
import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";
import { grey} from '@material-ui/core/colors'

import {TableCell,TableRow,Avatar,ListItem,Typography} from '@material-ui/core';


import {FormatedStatus} from '../../../../components/TableCommon/util/format'
import CustomerDetail from './CustomerDetail/CustomerDetail'

import ava from '../../../../assets/img/product/lyimg.jpeg';
import { VNDFormat, ThousandFormat } from '../../../../components/TextField/NumberFormatCustom';

const CustomerTableRow = (props) => {
    const { row, handleOpenRow,openRow ,onReload} = props;
    const classes = useRowStyles();

    return (
        <>
        {/* ROW */}
            <TableRow
            onClick={() => handleOpenRow(row.uuid)}   
            key={row.uuid}
            className={ clsx(classes.row,(openRow === row.uuid) ? classes.rowClicked : null)}
            >
                <TableCell align="left">{row.customer_code}</TableCell>
                {/* <TableCell align="left">{row.id}</TableCell> */}
                <TableCell align="left" style={{minWidth:200}} >
                    <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}>
                        <Avatar alt="Remy Sharp" src={ava} style={{marginRight:20}} className={classes.ava} />
                        <Typography className={classes.fontName}>{row.name}</Typography>
                    </ListItem>  
                </TableCell>

                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="right" ><ThousandFormat value={row.points} /></TableCell> 
                <TableCell align="center" >
                    <FormatedStatus debt={row.debt} />     
                </TableCell>
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <CustomerDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default CustomerTableRow
