import React, { useState } from "react";
import { useTheme,withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography,InputAdornment,FormControlLabel,FormLabel,CardHeader,IconButton,Collapse,FormControl,RadioGroup,TextField, ListItem,Card, Radio,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import LanguageIcon from '@material-ui/icons/Language';
import LinkIcon from '@material-ui/icons/Link';
import ModalWrapperWithClose from "../../../../components/Modal/ModalWrapperWithClose"
import { grey } from "@material-ui/core/colors";
import { SketchPicker } from 'react-color';
import clsx from "clsx"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import NavBar from "../../../../pages/CustomerPage/NavBar/"
import NavBarSetting from "./NavBarSetting"
import ProductSetting from "./ProductSetting"
import {useStyles} from "./style"
const WebSetting = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const domainName = "http://localhost:3000/#/store/";
  
  // api
  var logoStore ="https://cdn.mykiot.vn/2021/11/c3fa6fc1ceef1d611cd9c7ed256db621e1814ba175dd832a37ffb6cc8e43bd6d.jpg"
  const webInfo = {
      webAddress :'lyquochai',
      status:'inactive',
      mainColor: {  r: '250', g: '140', b: '22',  a: '1', hex:'#fa8c16'}, //#f2a5ae , //#fa8c16"       // mainColor: {  r: '242', g: '165', b: '174',  a: '1', hex:'#fa8c16'}, 
      bgColor:{r: '255', g: '255', b: '255',  a: '1',hex:'#ffffff'},
      navBar:{
        buttonLogin: "0" ,  // 0: nut, 1:icon
        buttonCart:"0" , //0: special, 1: normal
        navColor : "1", //0:white, 1- maincolor
        textNav : ["1", 17, 600],//0-left 1-right //color: black-white-grey-maincolor, size: small - large(16):,  bold:no() -yes (600)
      },
      listProduct:{
        priceStyle :[0, 0, 0],//0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600)
        nameStyle: [0, 1, 0, 0],//0-left 1-right //color: normal-maincolor , size: small - large(16), bold:no() -yes (600), maxNumberOFline: 1-2
        btnStyle:[1, 0], //0-left 1-right //haveBtn: no-yes, style:circle - box
        isBox:true,
        isMargin:true,
        border:true,
        alignCenter:false,
        marginContainer:0,
        boxDistance:1,
        // marginContainer:10,
        // boxDistance:2,
      }   
  }

  const [web, setWeb] = React.useState(webInfo);
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const [displayColorPicker1, setDisplayColorPicker1] = React.useState(false);
  const [openLinkWarningPopup, seOpenLinkWarningPopup] = React.useState(false);

  // 1.

  const handleWebAddress = (e) =>{
    var newWeb = {...web}
    newWeb.webAddress = e.target.value
    setWeb(newWeb)
  }
  
  const openLinkTab = ()=>{
    if(web.status === 'active' && webInfo.webAddress.length !==0   ){
      window.open(domainName + web.webAddress)
    }else{
      seOpenLinkWarningPopup(true)
    }
  }

  // 2.
  const handleChangeMainColor = (color) => {
    var newWeb = {...web}
    console.log(color.rgb)
    newWeb.mainColor.r = color.rgb.r
    newWeb.mainColor.g = color.rgb.g
    newWeb.mainColor.b = color.rgb.b
    newWeb.mainColor.a = color.rgb.a
    newWeb.mainColor.hex = color.hex
    setWeb(newWeb)
 
  };
  const handleChangeBgColor = (color) => {
    var newWeb = {...web}
    newWeb.bgColor.r = color.rgb.r
    newWeb.bgColor.g = color.rgb.g
    newWeb.bgColor.b = color.rgb.b
    newWeb.bgColor.a = color.rgb.a
    newWeb.bgColor.hex = color.hex
    setWeb(newWeb)
  };

  // 3.
  const [expandedNavBar, setExpandedNavBar] = React.useState(false);
  const [expandedListProduct, setExpandedListProduct] = React.useState(false);
  const [expandedDetailProduct, setExpandedDetailProduct] = React.useState(false);
  const [expandedCart, setExpandedCart] = React.useState(false);
  const [expandedMainPage, setExpandedMainPage] = React.useState(false);

  const handleChangeNavBar = (event) => {
    const {name,value} = event.target;
    console.log("web",web)
    setWeb((prevState) => {
      return {
        ...prevState,
        "navBar": {
          ...prevState["navBar"],
          [name]:value,
        },
      };
    });
  };
  const handleChangeListProduct = (event) => {
    const {name,value} = event.target;
    console.log("web",web)
    setWeb((prevState) => {
      return {
        ...prevState,
        "listProduct": {
          ...prevState["listProduct"],
          [name]:value,
        },
      };
    });
  };
  
 

  return (
    <Card className={classes.root}>
        <Typography className={classes.headerTitle} variant="h2">
          Trang web
        </Typography>

      {/* 1.Địa chỉ trang web */}
      <Typography style={{fontWeight:500, marginRight:10, marginBottom:10}}>Địa chỉ trang web: </Typography>
      <div style={{display:'flex',height:45,marginBottom:20,border:"1px solid #b8b8b8",borderRadius:15, padding:1,alignItems:'center' }} >
        <LanguageIcon style={{ color: grey[700], margin:10 }} />
        <Typography >{domainName}</Typography>
        <input value={web.webAddress}
         onChange={(e)=>{handleWebAddress(e)}}  
         placeholder="Tên_cửa_hàng" style={{border:0,outline:0, color:theme.customization.primaryColor[500], fontWeight:700, }}/>
      
         <Grid item container direction="row" justifyContent="flex-end">
            <Tooltip title="Xem trang web" >
                <LinkIcon style={{ textAlign: "left",marginRight:10}} onClick={()=>openLinkTab()} />
            </Tooltip>
          </Grid>
      </div>

      {openLinkWarningPopup ? <ModalWrapperWithClose title="Lỗi trang web" open={openLinkWarningPopup} handleClose={()=>{seOpenLinkWarningPopup(false)}}>
        Trang web khách hàng chưa được tạo hoặc đang trong trạng thái không kích hoạt. 
      </ModalWrapperWithClose>:null }

      {/* 2.Tổng quan */}
      <ListItem style={{padding:0, margin:0, marginBottom:10}}>
        <Typography style={{fontWeight:500, marginRight:10}}>Màu chính: </Typography>
        <div >
          <Grid container  onClick={()=> setDisplayColorPicker(!displayColorPicker)}>
            <Grid item  className={classes.swatch}>
              <div style={{width:18, height:18,background: `rgba(${ web.mainColor.r }, ${ web.mainColor.g }, ${ web.mainColor.b }, ${ web.mainColor.a })`,}}/>
            </Grid>
            <Grid item className={classes.swatch} style={{width:70}}>{web.mainColor.hex}</Grid>
            <Grid item className={classes.swatch}>{web.mainColor.a *100} %</Grid>
          </Grid>
          { displayColorPicker ? <div className={ classes.popover }>
            <div className={ classes.cover } onClick={()=>setDisplayColorPicker(false) }/>
            <SketchPicker  color={ {r:web.mainColor.r,g:web.mainColor.g,b:web.mainColor.b,a:web.mainColor.a}} onChange={handleChangeMainColor} />
          </div> 
          : null }
        </div>
      </ListItem>
      

      <ListItem style={{padding:0, margin:0,marginBottom:15}}>
        <Typography style={{fontWeight:500, marginRight:20}}>Màu nền: </Typography>
        <div >
          <Grid container  onClick={()=> setDisplayColorPicker1(!displayColorPicker1)}>
            <Grid item  className={classes.swatch}>
              <div style={{width:18, height:18,background: `rgba(${ web.bgColor.r }, ${ web.bgColor.g }, ${ web.bgColor.b }, ${ web.bgColor.a })`,}}/>
            </Grid>
            <Grid item className={classes.swatch} style={{width:70}}>{web.bgColor.hex}</Grid>
            <Grid item className={classes.swatch}>{web.bgColor.a *100} %</Grid>
          </Grid>
          { displayColorPicker1 ? <div className={ classes.popover }>
            <div className={ classes.cover } onClick={()=>setDisplayColorPicker1(false) }/>
            <SketchPicker color={ {r:web.bgColor.r,g:web.bgColor.g,b:web.bgColor.b,a:web.bgColor.a}} onChange={handleChangeBgColor} />
          </div> 
          : null }
        </div>
      </ListItem>
      

    {/* 3.Thanh công cụ*/}
      <SettingCollapse  title="Thanh công cụ" expand={expandedNavBar} setExpanded={setExpandedNavBar}>
        <NavBarSetting  web={web} handleChangeNavBar={handleChangeNavBar} logo={logoStore} setWeb={setWeb}/>
     </SettingCollapse>
      
      {/*4. Danh sách sản phẩm */}
      <SettingCollapse  title="Danh sách sản phẩm"  expand={expandedListProduct} setExpanded={setExpandedListProduct}>
        <ProductSetting  web={web} handleChangeListProduct={handleChangeListProduct}  setWeb={setWeb}/>
      </SettingCollapse>
      {/*5. Chi tiết sản phẩm */}
      <SettingCollapse   title="Chi tiết sản phẩm" expand={expandedDetailProduct} setExpanded={setExpandedDetailProduct}>
          Hello
      </SettingCollapse>
      {/*6. Giỏ hàng */}
    <SettingCollapse title="Giỏ hàng" expand={expandedCart} setExpanded={setExpandedCart}>
          Hello
      </SettingCollapse>

      {/*7. Trang chính */}
      <SettingCollapse  title="Trang chủ" expand={expandedMainPage} setExpanded={setExpandedMainPage}>
          Hello
      </SettingCollapse>

     

    </Card>
  );
};

export default WebSetting;

const SettingCollapse  = (props)=>{
  const {expand, setExpanded,title} =props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Card className={classes.attrCard}>
        <CardHeader
          onClick={()=>setExpanded(!expand)}
          action={
            <IconButton
              size="small"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expand,
              })}
              onClick={()=>setExpanded(!expand)}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title={title}
          className={classes.attrHead}
        />
        <Collapse in={expand} timeout="auto" unmountOnExit style={{padding:10}}>
             {props.children}
        </Collapse>
       
    </Card>
  )
}


export const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 14,
      },
    },
  },
})(TextField);