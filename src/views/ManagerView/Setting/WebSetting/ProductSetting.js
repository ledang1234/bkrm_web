import React,{useEffect,useState,useRef} from 'react'
import { Typography,Box,Toolbar,Fab,Button,Badge,Select,CardActionArea,CardMedia,CardContent,MenuItem,InputAdornment,FormControlLabel,FormLabel,CardHeader,IconButton,Collapse,FormControl,RadioGroup,TextField, ListItem,Card, Radio,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import { useTheme, makeStyles,styled ,lighten,darken} from "@material-ui/core/styles";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {ColorButton,ColorOutlineButton} from "../../../../components/Button/ColorButton"
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import { ThousandSeperatedInput } from '../../../../components/TextField/NumberFormatCustom';
import clsx from "clsx";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import InfoComponent from "../../../../pages/CustomerPage/ProductPage/ProductList/ProductList"
import InventoryList from '../../../../assets/JsonData/inventory.json'
import icon from '../../../../assets/img/product/tradao.jpeg';
import AddIcon from '@mui/icons-material/Add';

import {ColorOutlineButtonCart} from "../../../../components/Button/ColorButton"

const useStyles = makeStyles((theme) => ({
    toolBar: {
        // background: theme.palette.background.paper,
        color: theme.customization.themeGreyText,
        border:'1px solid #b6b6b6'
    },
    btnNav: {
        textTransform: "none",
        marginRight: 10,
    }, 
    btn: {
        boxShadow: "0px 12px 14px 0px #ffe57f4d",
        backgroundColor: "#ffe57f",
        borderRadius: "10px 0px 0px 10px",
        "&:hover": {
          backgroundColor: "#ffcf10",
        },
        height: 60,
        width: 60,
       
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },  
}));


const ProductSetting = ({web,handleChangeListProduct,setWeb}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {mainColor, priceStyle,btnStyle,isMargin,border,alignCenter,nameStyle,isBox,marginContainer,boxDistance} = web.listProduct;
     //customization 

    let  numOfItemInRow=5;
     let widthSize = `${((100-marginContainer*2 )/numOfItemInRow)-boxDistance*2}vw`
     function handleColor (type) {
         if(type===0){return theme.heading}
         else if (type===1){return theme.darkTextPrimary }
         else{return mainColor}
     }
     console.log("nameStyle",nameStyle)
     const nameColor = handleColor(nameStyle[0])
     const nameSize = nameStyle[1]?"h4":"h5";
     const nameBold = nameStyle[2]? 600:500;
     const nameLineClass = nameStyle[3]?classes.multiLineEllipsis:classes.oneLineEllipsis
     const priceColor = handleColor(priceStyle[0])
     const priceSize =priceStyle[1]?16:14
     const priceBold = priceStyle[2]?600:400
     

  
   
    const handleChangeNavBarIndex = (event, index)=>{
        var newWeb = {...web};
        newWeb.navBar.textNav[index] = event.target.value;
        setWeb(newWeb)
    }
      
    return (
        <>
       <Grid container spacing={8}>
           <Grid item>
           <Typography style={{fontWeight:500, marginRight:20, color:"#000",fontSize:15}}>Tên sản phẩm: </Typography>
                <ListItem style={{margin:0, padding:0, marginBottom:8}}>
                    <Typography style={{fontWeight:500, marginRight:20}}>Màu chữ </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup name="textNav" value={web.navBar.textNav[0]} onChange={(event)=>{}}>
                        <div>
                            <FormControlLabel value={"0"} control={<Radio color="primary" />} label="Đen" />
                            <FormControlLabel value={"1"} control={<Radio color="primary"/>} label="Màu chính" />
                        </div>
                        </RadioGroup>
                    </FormControl>
                </ListItem>
                <ListItem style={{margin:0, padding:0,marginBottom:15}}>
                    <Typography style={{fontWeight:500, marginRight:20,width:60 }}>Cỡ chữ </Typography>
                    <Grid container  >
                        <Grid item className={classes.swatch} style={{width:40}}><ThousandSeperatedInput value={web.navBar.textNav[1]} onChange={(event)=>{}}/></Grid>
                        <Grid item className={classes.swatch} style={{width:30, backgroundColor:"#E4E4E4"}}>px</Grid>
                    </Grid>
                </ListItem>
                <ListItem style={{margin:0, padding:0, marginBottom:8}}>
                    <Typography style={{fontWeight:500, marginRight:20}}>Độ dày </Typography>
                    <FormControl size="small" variant="outlined" className={classes.formControl} >
                        <Select
                            value={web.navBar.textNav[2]}
                            onChange={(event)=>{}}
                            >
                            <MenuItem value={300}>300</MenuItem>
                            <MenuItem value={400}>400</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                            <MenuItem value={600}>600</MenuItem>
                            <MenuItem value={700}>700</MenuItem>
                            </Select>
                        </FormControl>
                </ListItem>
           </Grid>
           <Grid item >
           <Typography style={{fontWeight:500, marginRight:20, color:"#000",fontSize:15}}>Giá sản phẩm: </Typography>
                <ListItem style={{margin:0, padding:0, marginBottom:8}}>
                    <Typography style={{fontWeight:500, marginRight:20}}>Màu số </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup name="textNav" value={web.navBar.textNav[0]} onChange={(event)=>{}}>
                        <div>
                            <FormControlLabel value={"0"} control={<Radio color="primary" />} label="Đen" />
                            <FormControlLabel value={"1"} control={<Radio color="primary"/>} label="Màu chính" />
                        </div>
                        </RadioGroup>
                    </FormControl>
                </ListItem>
                <ListItem style={{margin:0, padding:0,marginBottom:15}}>
                    <Typography style={{fontWeight:500, marginRight:20,width:55 }}>Cỡ số </Typography>
                    <Grid container  >
                        <Grid item className={classes.swatch} style={{width:40}}><ThousandSeperatedInput value={web.navBar.textNav[1]} onChange={(event)=>{}}/></Grid>
                        <Grid item className={classes.swatch} style={{width:30, backgroundColor:"#E4E4E4"}}>px</Grid>
                    </Grid>
                </ListItem>
                <ListItem style={{margin:0, padding:0, marginBottom:8}}>
                    <Typography style={{fontWeight:500, marginRight:20}}>Độ dày </Typography>
                    <FormControl size="small" variant="outlined" className={classes.formControl} >
                        <Select
                            value={web.navBar.textNav[2]}
                            onChange={(event)=>{}}
                            >
                            <MenuItem value={300}>300</MenuItem>
                            <MenuItem value={400}>400</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                            <MenuItem value={600}>600</MenuItem>
                            <MenuItem value={700}>700</MenuItem>
                            </Select>
                        </FormControl>
                </ListItem>
           </Grid>
       </Grid>

        {/* Mẫu */}
        <Box   className={classes.container} style={{backgroundColor:'pink',marginLeft:`${marginContainer}vw`,marginRight:`${marginContainer}vw`,}}>

            <Grid container direction="row" spacing={2} justifyContent="center" >
             {
             InventoryList?.map((item,index)=>{
                 return( 
                     <>
                     {isBox?
                     <Card  className={clsx(classes.hoverCard,classes.item,classes.colorCard)} style={{margin:`${boxDistance}%`, width:widthSize, borderRadius:border?7:0}} >
                        <CardActionArea >
                            <CardMedia
                                style={{height:widthSize, margin:isMargin?10:0, marginBottom:isMargin?-5:0, borderRadius:border&& isMargin ?7:0}}
                                image={icon}
                            />
                            <Box style={{marginTop:10}}>
                                <CardContent>
                                    < InfoComponent  item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                                </CardContent>   
                            </Box>
                        </CardActionArea>
                    </Card> :
                    <Box  className={clsx(/*classes.hoverCard,*/classes.item)} style={{margin:`${boxDistance}%`,width:widthSize, borderRadius:border?7:0}} >
                        <CardActionArea >
                            <CardMedia
                                style={{height:widthSize, margin:isMargin?10:0, marginBottom:isMargin?-5:0, borderRadius:border?7:0}}
                                image={icon}
                            />
                            <Box style={{marginTop:10}}>
                                {isMargin? 
                                <CardContent>
                                    < InfoComponent item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                                </CardContent>
                                :
                                < InfoComponent  item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                            }    
                            </Box>
                        </CardActionArea>
                    </Box>
                     } 
                </>
                )
             }
             )
             }
            </Grid>
        </Box>
        </>
    )
}

export default ProductSetting


const InfoComponent = (props)=>{
    const {openPopUp,item,mainColor,btnStyle,alignCenter, nameColor,priceColor,nameSize,nameBold,nameLineClass,priceSize,priceBold} = props;
   
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
        <Typography gutterBottom variant={nameSize}className={clsx( nameLineClass, classes.name, alignCenter && classes.alignCenter)} style={{color:nameColor, fontWeight:nameBold}}>
        {item.name}
        </Typography>
        {
            !alignCenter && !btnStyle[1]? 
            <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{marginBottom:-9}}>
                <Grid item>
                    <Typography variant="body2" style={{color:priceColor, fontWeight:priceBold, fontSize:priceSize}}  >
                        {item.price}.000đ
                    </Typography>
                
                </Grid>
                {btnStyle[0]?
                    <Grid item>
                        <IconButton size="small"  style={{color:'#fff', background:mainColor}} 
                            // Stop Ripple Effect
                            onTouchStart={(event) => event.stopPropagation()}
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                // Prevent CardActionArea Click
                                event.preventDefault()
                                openPopUp(item);
                            }}
                        >
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </Grid> :null }

            </Grid>
            :
            <>
            <Typography   className={alignCenter &&classes.alignCenter} style={{color:priceColor, fontWeight:priceBold, fontSize:priceSize}} >
                {item.price}.000đ
            </Typography>

            {btnStyle[0]?
            <ColorOutlineButtonCart variant="outlined" fullWidth mainColor={mainColor} 
                onClick={(event) => {
                    // Prevent CardActionArea Click
                    event.preventDefault()
                    openPopUp(item);
                }}
                >
                Giỏ hàng
            </ColorOutlineButtonCart>   
            
            :null }
            </>
        }
        </>
    )
}
