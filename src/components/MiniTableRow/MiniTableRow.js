import React from 'react'
import {Box,TextField,Divider,ListItem,IconButton,TableRow,TableCell,Typography, Grid} from '@material-ui/core'

import useStyles from "../TableCommon/style/mainViewStyle";
import icon from '../../assets/img/product/tch.jpeg';
import * as Input from '../TextField/NumberFormatCustom'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import InvoiceReturnDetail from "../../views/SalesView/InvoiceReturn/InvoiceReturnTableRow/InvoiceReturnDetail/InvoiceReturnDetail";
import InvoiceDetail from "../../views/SalesView/Invoice/InvoiceTableRow/InvoiceDetail/InvoiceDetail";
import InventoryOrderDetail from "../../views/InventoryView/InventoryOrder/InventoryOrderTableRow/InventoryOrderDetail/InventoryOrderDetail";

import InventoryReturnDetail from "../../views/InventoryView/InventoryReturnOrder/InventoryReturnTableRow/InventoryReturnDetail/InventoryReturnDetail";


export const MiniTableRow = ({}) =>{
    const classes = useStyles(); 
    return (
        <div></div>
    )
}

export const BillMiniTableRow = (props) =>{
    const { row, handleOpenRow, openRow, onReload } = props;

    const {totalCost, id,partnerName ,date } = props
    const classes = useStyles(); 
    return (
        <>
        <Grid  container direction="row" justifyContent="space-between" 
          onClick={() => handleOpenRow(row.uuid)} >
            <Grid item>
                <Typography>{totalCost}</Typography>
                <Typography>{id}</Typography>
                <Typography>{partnerName}</Typography>  
            </Grid>

            <Grid item>
            <Typography>{date}</Typography>
            </Grid>
        
        </Grid>
        <InventoryReturnDetail parentProps={props}  isMini={true}/>
        <Divider />
        </>
    )
}

export const PartnerMiniTableRow = (props) =>{
    const { row, handleOpenRow, openRow, onReload } = props;

    const {totalCost, id,partnerName ,date } = props
    const classes = useStyles(); 
    return (
        <>
        
        </>
    )
}