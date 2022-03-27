import React, {useState} from 'react'
import {Button,Grid,Paper,Card,Box,CardActions,Tabs,ButtonGroup,Divider,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Menu,MenuItem,ListItem,IconButton,TableBody,Typography} from '@material-ui/core'
import { useTheme, makeStyles, styled ,lighten} from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
// import {VNDFormat} from "../"
import {VNDFormat} from "../../../../components/TextField/NumberFormatCustom"
import {CustomButton} from "../../../../components/Button/ColorButton"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const useStyles = makeStyles((theme,) => ({
    root: {
        flexGrow: 1,
        marginLeft:50,
        marginRight:50,
        marginTop:130
    },
}));



const DetailPage = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {webInfo} = props;
    const mainColor = `rgba(${ webInfo.mainColor.r }, ${ webInfo.mainColor.g }, ${ webInfo.mainColor.b }, ${webInfo.mainColor.a })`;
    const {productCode} = useParams();
    const {products } = useSelector(state => state.customerPage)
    const detailProduct = products.find(prod => prod.product_code === productCode);
    // const attribute_value = JSON.parse(detailProduct.attribute_value)
    const [quantity, setQuantity]  = useState(1)

    const image = detailProduct? JSON.parse(detailProduct?.img_urls) :null

    const {priceStyle, nameStyle} = webInfo.detailPage
  


    return (
    <div className={classes.root}>
      <Grid container  direction="row" justifyContent="space-between" alignItems="flex-start" spacing={8}>
        <Grid item xs={12} md={6}>
            <Carousel   showArrows={true} showStatus={false} infiniteLoop={true} emulateTouch={true} swipeable={true} dynamicHeight={false}  showThumbs={true}
            >
                {JSON.parse(detailProduct?.img_urls ?detailProduct?.img_urls: "[]" )?.map((url)=><img  src={url}style={{borderRadius:10}} />)}
            </Carousel>
           
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
              <Typography variant="h1" style={{marginBottom:25,color:nameStyle[0] === "0" ? "#000": mainColor , fontWeight:nameStyle[2], fontSize: Number(nameStyle[1])}}>{detailProduct?.name}</Typography>
              <Typography variant="h2" style={{color:priceStyle[0] === "0" ? "#000": mainColor , fontWeight:priceStyle[2], fontSize: Number(priceStyle[1])}}>{detailProduct?.list_price.toLocaleString()} đ</Typography>
              <Typography variant="h5" style={{marginTop:40, marginBottom:10}}>Số lượng :</Typography>
              <ButtonGroup disableElevation variant="contained"  >
                <CustomButton mainColor='#f7f7f7'  textColor='#000' size="small" color='secondary'onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}> <RemoveIcon /></CustomButton>
                <CustomButton mainColor='#fff'  textColor='#000'  >{quantity}</CustomButton>
                <CustomButton mainColor='#f7f7f7' textColor='#000'size="small" onClick={()=>{setQuantity(quantity + 1)}}><AddIcon /></CustomButton>
            </ButtonGroup>

          </Box>
          <CustomButton fullWidth mainColor={mainColor} style={{marginTop:100}}  >Thêm vào giỏ hàng</CustomButton>
        </Grid>
      </Grid>
    
        <Divider  style={{marginTop:20}}/>
        <Typography  style={{color:'#000', fontSize:18,fontWeight:500, marginTop:20,}}>Mô tả sản phẩm</Typography>

    </div>
        
    )
}

export default DetailPage
