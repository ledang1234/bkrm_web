import React from 'react'
import {Box,TextField,Avatar,Slide,Divider,Dialog,AppBar,Toolbar,Button,ListItem,IconButton,TableRow,TableCell,Typography, Grid} from '@material-ui/core'
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";

import useStyles from "../TableCommon/style/mainViewStyle";
import icon from '../../assets/img/product/tch.jpeg';
import * as Input from '../TextField/NumberFormatCustom'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import InvoiceReturnDetail from "../../views/SalesView/InvoiceReturn/InvoiceReturnTableRow/InvoiceReturnDetail/InvoiceReturnDetail";
import InvoiceDetail from "../../views/SalesView/Invoice/InvoiceTableRow/InvoiceDetail/InvoiceDetail";
import InventoryOrderDetail from "../../views/InventoryView/InventoryOrder/InventoryOrderTableRow/InventoryOrderDetail/InventoryOrderDetail";
import InventoryReturnDetail from "../../views/InventoryView/InventoryReturnOrder/InventoryReturnTableRow/InventoryReturnDetail/InventoryReturnDetail";
import OrderProductListDetail from "../../views/InventoryView/OrderProductList/OrderProductListTableRow/OrderProductListDetail/OrderProductListDetail";
import CheckHistoryDetail from "../../views/InventoryView/CheckHistory/CheckHistoryTableRow/CheckHistoryDetail/CheckHistoryDetail"
import CustomerDetail from "../../views/ManagerView/Customer/CustomerTableRow/CustomerDetail/CustomerDetail"
import SupplierDetail from "../../views/InventoryView/Supplier/SupplierTableRow/SupplierDetail/SupplierDetail"
import EmployeeDetail from "../../views/HRView/Employee/EmployeeTableRow/EmployeeDetail/EmployeeDetail"
import DiscountDetail from '../../views/ManagerView/Setting/DiscountSetting/DiscountTableRow/DiscountDetail/DiscountDetail';
import VoucherDetail from '../../views/ManagerView/Setting/VoucherSetting/VoucherTableRow/VoucherDetail/VoucherDetail';
import CloseIcon from '@material-ui/icons/Close';
import {ThousandFormat} from "../TextField/NumberFormatCustom"
import ava from '../../assets/img/product/lyimg.jpeg';
import PhoneIcon from '@material-ui/icons/Phone';
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

    const {totalCost, id,partnerName ,date, typeBill } = props;
    const{promotion_condition, type} = props;
    const classes = useStyles(); 
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div style={{margin:10}}>
        <Grid  container direction="row" justifyContent="space-between" 
          onClick={()=>{handleClickOpen();handleOpenRow(typeBill === "Khuyến mãi"?row.id:row.uuid)}}  >
            <Grid item>
                <Typography style={{ fontWeight:500,marginTop:-5,fontSize:15, marginBottom:3}}>{id}</Typography>
                <Typography style={{ fontSize:14}}>{partnerName}</Typography>  
            </Grid>
            <Grid item justifyContent="flex-end" >
                
          {typeBill ==="Voucher"?<Typography style={{ fontSize:11, marginTop:-15, marginBottom:7}}> Ngày hết hạn:</Typography>:null}

           <Typography style={{color:"#6b6b6b", fontSize:10, marginTop:-8, marginBottom:5,textAlign: 'right'}}>{date.substring(0, 16)}</Typography>
            
            {typeBill === "Khuyến mãi"  ?<Typography style={{marginTop:10}} >{totalCost}  </Typography>:null}
            {typeBill === "Đơn đặt hàng"  || typeBill === "Voucher"?<Typography style={{fontWeight:500, fontSize:17, color:"orange",textAlign: 'right'}}><ThousandFormat value={totalCost}/></Typography> :null}
            {typeBill === "Đơn kiểm kho"?<Typography style={{fontWeight:500, fontSize:17, color:totalCost >=0?"green":"red",textAlign: 'right'}}><ThousandFormat value={totalCost}/></Typography> :null}
            {typeBill !== "Đơn đặt hàng" &&typeBill !== "Đơn kiểm kho" &&typeBill !== "Voucher" && typeBill !== "Khuyến mãi"? <Typography style={{fontWeight:500, fontSize:17, color:typeBill  === "Hoá đơn" || typeBill === "Đơn nhập hàng"?theme.customization.primaryColor[500]:theme.customization.secondaryColor[500],textAlign: 'right'}}><ThousandFormat value={totalCost}/></Typography> :null}
            
            
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
            {typeBill === "Đơn đặt hàng nhập"? <OrderProductListDetail parentProps={props}  isMini={true}/>:null}
            {typeBill === "Đơn kiểm kho"? <CheckHistoryDetail parentProps={props}  isMini={true}/>:null}
            {/* {typeBill === "Khuyến mãi"? <DiscountDetail parentProps={props}  isMini={true} promotion_condition={promotion_condition} type={type}/>:null} */}
            {typeBill === "Voucher"? <VoucherDetail parentProps={props}  isMini={true}/>:null}
            {typeBill === "Khuyến mãi"?  <DiscountDetail parentProps={props} promotion_condition={promotion_condition} type={type} />       :null}

        </Dialog>
        </div>
    )
}

export const PartnerMiniTableRow = (props) =>{
    const { row, handleOpenRow, openRow, onReload } = props;

    const {img, id,name ,phone, score,typePartner } = props
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div style={{margin:15,}}>
        <Grid  container direction="row" justifyContent="space-between" 
          onClick={()=>{handleClickOpen();handleOpenRow(row.uuid)}} 
          >
            <Grid item>
                <ListItem  style={{marginLeft:2, padding:0}}>
                    {typePartner !== "Nhà cung cấp"?<Avatar alt="Remy Sharp" src={img} style={{marginRight:20,}} className={classes.ava} />:null}
                    <div>
                        <Typography style={{marginBottom:2, marginTop:-5,marginBottom:3}}>{name}</Typography>
                        <ListItem  style={{margin:0, padding:0}}>
                            <PhoneIcon style={{width:10, height:10, marginRight:2, color:"#8f8f8f"}}/>
                            <Typography style={{color:'#36afff', fontSize:12}}>{phone}</Typography>
                        </ListItem>  
                    </div>
                </ListItem>  
            </Grid>
            <Grid item justifyContent="flex-end" >
            <Typography style={{marginTop:-5,fontSize:12,color:"#474747"}}>{id}</Typography>
            {typePartner === "Khách hàng"?<Typography style={{fontWeight:500, fontSize:14,marginTop:8, color:"green",textAlign: 'right'}}>{score}</Typography> :null}

            </Grid>
        </Grid> 

        <Divider style={{marginTop:2}} />
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h3" className={classes.title} style={{color:"white"}} >
                    {typePartner} {"#"} {id}
                </Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton>
            </Toolbar>
            </AppBar>

            {typePartner === "Khách hàng"? <CustomerDetail parentProps={props}  isMini={true} />:null}
            {typePartner === "Nhân viên"? <EmployeeDetail parentProps={props}  isMini={true}/>:null}
            {typePartner === "Nhà cung cấp"? <SupplierDetail parentProps={props}  isMini={true}/>:null}
        </Dialog>
        </div>
    )
}