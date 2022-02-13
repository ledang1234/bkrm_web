import React from 'react'
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import TableHeader  from '../../components/TableCommon/TableHeader/TableHeader'
import TableWrapper from '../../components/TableCommon/TableWrapper/TableWrapper'
import {ThousandFormat} from '../../components/TextField/NumberFormatCustom'
import moment from "moment";
import  clsx from "clsx"
//import library
import {
    Grid,
    Card,
    Box,
    Tabs,
    Tab,
    TableContainer,
    CardContent,
    CardMedia,
    CardActionArea,
    FormControlLabel,
    Switch,
    Menu,
    MenuItem,
    ListItem,
    IconButton,
    TableBody,
    Typography,
    Table,
    TableHead,
    TableRow,TableCell,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: 12,
        fontWeight: 700,
        marginTop:10,
        color: "#000",
    },
    centerQR:{
        flexGrow: 1,
        textAlign: "center",
       
    },
    center:{
        flexGrow: 1,
        textAlign: "center",
        color: "#000",
        fontSize: 10,
    },
    right:{
        flexGrow: 1,
        textAlign: "right",
        color: "#000",
        fontSize: 10,
    },
    text:{
        color: "#000",
        fontSize: 10,
        textAlign: "center",
    },
    media: {
      // height: '10%',
      // // width: '10%'
      // height: 50,
      // width:50
    },
    weight:{
      fontWeight:500
    },
    root: {
      maxWidth: 10,
      
    },
}));
let d = moment.now() / 1000;

let orderTime = moment
.unix(d)
.format("DD/MM/YYYY HH:mm", { trim: false });
// CON THIEU LINK WEB + LOGO + MA HOA DON
var QRCode = require('qrcode.react');


export const ReceiptPrinter = ({cart, date}) => {
    const info = useSelector((state) => state.info);
    var link = "https://www.facebook.com/GiaLePhuongg/";
    var logo ="https://newstatic2.clingme.vn/resized/images/default/cms-images/place/0/0/17/1550914926_557320_w600.jpg"
    
    const theme = useTheme();
    const classes = useStyles(theme);

    const item = cart.cartItem? cart.cartItem :cart.details

    console.log(info)
    return (
        <div >
            {/* Logo */}
           {logo? 
            <div className={classes.centerQR} style={{marginBottom:10}}  >
              <img src={logo} style={{height:60}}/>
            </div>:null}
              
           {/* In đơn cũ thì ko lấy store?? */}
           {
             cart.branch ?
             <>
             <Typography className={classes.center}>Địa chỉ: {cart.branch.address}, {cart.branch.ward} , {cart.branch.district}</Typography>
            <Typography className={classes.center}>Điện thoại: {cart.branch.phone}</Typography>
             </>:
            //  get current branch
            <>
             <Typography className={classes.center}>Địa chỉ: {info.store.district}, P. {info.store.ward} ,Q. {info.store.district}, {info.store.province}</Typography>
             <Typography className={classes.center}>Điện thoại: {info.store.phone}</Typography>
          </>
           }
            

            {/*  */}
            <Typography className={classes.title}>HOÁ ĐƠN BÁN HÀNG</Typography>
            <Typography className={classes.center}>Mã HĐ: {}</Typography>
            <Typography className={classes.center} style={{marginBottom:10}}>Thời gian: {date? date: orderTime}</Typography>
           

            <Typography className={classes.text} >Thu ngân: {cart.created_by_user? cart.created_by_user.name: info.user.name}</Typography>
            <Typography className={classes.text} style={{marginBottom:20}}>Khách hàng: {cart.customer?.name} - {cart.customer?.phone}</Typography>
           
            {/* List */}

                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item xs={5}>
                        <Typography className={clsx(classes.text,classes.weight)} >Sản phẩm</Typography>
                        </Grid>
                        <Grid item xs={3}>
                        <Typography className={clsx(classes.text,classes.weight)} >SL</Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography className={clsx(classes.text,classes.weight)} >Thành tiền</Typography>
                        </Grid>
                    </Grid>
                       
                    {/* <TableBody> */}
                    {/* {cart.cartItem.map((row, index) => { */}
                    {item.map((row, index) => {
                    return (
                        <>
                        
                         {/* <TableCell align="left" className={classes.text} >{row.name}</TableCell>   
                          <TableRow >
                              <TableCell align="left" className={classes.text} >{row.unit_price}</TableCell>    
                              <TableCell align="center" className={classes.text} ><ThousandFormat value={row.quantity}/></TableCell> 
                              <TableCell align="right" className={classes.text} > <ThousandFormat value={row.quantity * row.unit_price}/></TableCell>
                              
                          </TableRow> */}
                          <Typography className={classes.text} >{row.name}</Typography>
                          <Grid container direction="row" justifyContent="space-between">
                            <Grid item xs={5}>
                            <Typography className={classes.text} ><ThousandFormat value={row.unit_price}/></Typography>
                            </Grid>
                            <Grid item xs={3}>
                            <Typography className={classes.text} ><ThousandFormat value={row.quantity}/></Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography className={classes.text} ><ThousandFormat value={row.quantity * row.unit_price}/></Typography>
                            </Grid>
                        </Grid>
                        </>
                    );
                })}
                {/* </TableBody> */}
              

            <Grid container direction="row" justifyContent="flex-end" style={{marginTop:20}}>
              <Grid item xs={6}>
                <Typography className={clsx(classes.text,classes.weight)}> Tổng tiền hàng:{" "}</Typography>
                <Typography className={clsx(classes.text,classes.weight)}> Giảm giá:{" "}</Typography>
                <Typography className={clsx(classes.text,classes.weight)}>
                Tổng cộng:{" "} 
                </Typography>
                <Typography className={clsx(classes.text,classes.weight)}>
                Tiền khách đưa:{" "}
                </Typography>
                <Typography className={clsx(classes.text,classes.weight)}>
                Tiền thối:{" "}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={clsx(classes.text,classes.weight)}>   <ThousandFormat value={cart.total_amount} /></Typography>
                <Typography >
                  <ThousandFormat className={clsx(classes.text,classes.weight)} value={cart.discount} />
                </Typography>
                <Typography className={clsx(classes.text,classes.weight)}>  <ThousandFormat value={cart.total_amount - cart.discount}/></Typography>
                <Typography className={clsx(classes.text,classes.weight)}> <ThousandFormat value={cart.paid_amount} /></Typography>
                <Typography className={clsx(classes.text,classes.weight)}><ThousandFormat value={cart.paid_amount - (cart.total_amount- cart.discount)} /></Typography>

              </Grid>
            </Grid>

            

       
            <Typography className={classes.center}> --------------------------</Typography>

            {link? 
            <>
                <Typography className={classes.center}> Mở camera và quét mã để truy cập trang web</Typography>
                <div className={classes.centerQR} style={{marginBottom:15, marginTop:10, }}>
                   <QRCode value={link} style={{height:"50%", width:"45%"}} />
                </div> 
                </>
            : null}
            <Typography className={classes.center}>Xin cảm ơn và hẹn gặp lại !</Typography> 
        </div>
    )
}

export const ImportReceiptPrinter = ({cart, date}) => {
  const info = useSelector((state) => state.info);

  const theme = useTheme();
  const classes = useStyles(theme);

  const item = cart.cartItem? cart.cartItem :cart.details
    return (
          <div style={{margin:20}}>

          {/*  */}
          <Typography className={classes.title} style={{marginTop:50}}>PHIẾU NHẬP HÀNG</Typography>
          <Typography className={classes.center}>Mã phiếu: {}</Typography>
          <Typography className={classes.center} style={{marginBottom:25}}>Thời gian: {date? date: orderTime}</Typography>
        
          
          <Typography className={classes.text} >Chi nhánh nhập: {cart.branch ? cart.branch.name :info.branch.name}</Typography>
          <Typography className={classes.text} >Người tạo: {cart.created_by_user ? cart.created_by_user.name :info.user.name}</Typography>
          <Typography className={classes.text}>Nhà cung cấp: {cart.supplier?.name} - {cart.supplier?.phone}</Typography>
        
          {/* List */}
      
          <TableContainer >
              <Table  >
                  <TableHead >
                      <TableRow >
                          <TableCell align="left" className={classes.text}>STT</TableCell>
                          <TableCell align="left" className={classes.text}>Mã hàng</TableCell>
                          <TableCell align="left" className={classes.text}>Sản phẩm</TableCell>
                          <TableCell align="center" className={classes.text}>Đơn giá</TableCell>
                          <TableCell align="center" className={classes.text}>SL</TableCell>
                          <TableCell align="right" className={classes.text}>Thành tiền</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  {item.map((row, index) => {
                  return (
                      <>
                      <TableRow >
                          <TableCell align="left" className={classes.text} >{index+1}</TableCell> 
                          <TableCell align="left" className={classes.text} >{row.bar_code}</TableCell>   
                          <TableCell align="left" className={classes.text} >{row.name}</TableCell>    
                          <TableCell align="center" className={classes.text} ><ThousandFormat value={row.unit_price}/></TableCell>    
                          <TableCell align="center" className={classes.text} ><ThousandFormat value={row.quantity}/></TableCell> 
                          <TableCell align="right" className={classes.text} > <ThousandFormat value={row.quantity * row.unit_price}/></TableCell>
                          
                      </TableRow>
                      </>
                  );
              })}
              </TableBody>
              </Table>

          </TableContainer>
          

      <Grid container direction="column" style={{marginTop:20, marginBottom:50}}>
          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs={3}>
              <Typography className={clsx(classes.text,classes.weight)}> Tổng tiền hàng:{" "}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.text,classes.weight)}>  <ThousandFormat value={cart.total_amount}/></Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs={3}>
            <Typography className={clsx(classes.text,classes.weight)}> Giảm giá:{" "}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography >
                <ThousandFormat className={clsx(classes.text,classes.weight)} value={cart.discount} />
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs={3}>
              <Typography className={clsx(classes.text,classes.weight)}>
              Tổng cộng:{" "} 
              </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography className={clsx(classes.text,classes.weight)}>  <ThousandFormat value={cart.total_amount- cart.discount}/></Typography>
              
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs={3}>
              <Typography className={clsx(classes.text,classes.weight)}>
              Tiền trả NCC:{" "}
              </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography className={clsx(classes.text,classes.weight)}> <ThousandFormat value={cart.paid_amount} /></Typography>

            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end">
            <Grid item xs={3}>
              <Typography className={clsx(classes.text,classes.weight)}>
              Còn lại:{" "}
              </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography className={clsx(classes.text,classes.weight)}><ThousandFormat value={cart.paid_amount - (cart.total_amount- cart.discount)} /></Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="space-around">
              <Typography className={clsx(classes.text,classes.weight)}>
                  Nhà cung cấp
              </Typography>
 
            <Typography className={clsx(classes.text,classes.weight)}>
                  Người lập phiếu
              </Typography>
          </Grid>
      </div>
    )
}

