import React from 'react'
import {Box,TextField,Slide,Divider,Dialog,AppBar,Toolbar,Button,ListItem,IconButton,TableRow,TableCell,Typography, Grid} from '@material-ui/core'

import useStyles from "../TableCommon/style/mainViewStyle";
import icon from '../../assets/img/product/tch.jpeg';
import * as Input from '../TextField/NumberFormatCustom'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import InvoiceReturnDetail from "../../views/SalesView/InvoiceReturn/InvoiceReturnTableRow/InvoiceReturnDetail/InvoiceReturnDetail";
import InvoiceDetail from "../../views/SalesView/Invoice/InvoiceTableRow/InvoiceDetail/InvoiceDetail";
import InventoryOrderDetail from "../../views/InventoryView/InventoryOrder/InventoryOrderTableRow/InventoryOrderDetail/InventoryOrderDetail";

import InventoryReturnDetail from "../../views/InventoryView/InventoryReturnOrder/InventoryReturnTableRow/InventoryReturnDetail/InventoryReturnDetail";
import CloseIcon from '@material-ui/icons/Close';
import {ThousandFormat} from "../TextField/NumberFormatCustom"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export const MiniTableRow = ({}) =>{
    const classes = useStyles(); 
    return (
        <div></div>
    )
}
export const BillMiniTableRow = (props) =>{
    const { row, handleOpenRow, openRow, onReload } = props;

    const {totalCost, id,partnerName ,date, typeBill } = props
    const classes = useStyles(); 

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let dateTime = date.split(" ")
    return (
  
        <div style={{margin:10}}>
        <Grid  container direction="row" justifyContent="space-between" 
          onClick={()=>{handleClickOpen();handleOpenRow(row.uuid)}} 
          >
            <Grid item>
                <Typography style={{ fontWeight:500,marginTop:-5,fontSize:15, marginBottom:3}}>{id}</Typography>
                <Typography style={{ fontSize:14}}>{partnerName}</Typography>  
            </Grid>

            <Grid item justifyContent="flex-end" >
            <Typography style={{color:"#6b6b6b", fontSize:10, marginTop:-8, marginBottom:5}}>{date.substring(0, 16)}</Typography>

            <Typography style={{fontWeight:500, fontSize:17, color:"green",textAlign: 'right'}}><ThousandFormat value={totalCost}/></Typography>

            {/* <Typography style={{color:"#6b6b6b", fontSize:11,textAlign: 'right'}}>{dateTime[1]}</Typography> */}
            </Grid>
        </Grid> 

        <Divider style={{marginTop:2}} />
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                
                <Typography variant="h3" className={classes.title} style={{color:"white"}} >
                    {typeBill} {"#"} {id}
                </Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton>
            </Toolbar>
            </AppBar>

            {typeBill === "Hoá đơn"? <InvoiceDetail parentProps={props}  isMini={true} />:null}
            {typeBill === "Đơn trả"? <InvoiceReturnDetail parentProps={props}  isMini={true}/>:null}
            {typeBill === "Đơn nhập hàng"? <InventoryOrderDetail parentProps={props}  isMini={true}/>:null}
            {typeBill === "Đơn trả hàng nhập"? <InventoryReturnDetail parentProps={props}  isMini={true}/>:null}
        </Dialog>
        </div>
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