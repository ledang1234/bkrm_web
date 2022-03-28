import React, {useState,useEffect} from 'react'
import {Button,Grid,Paper,Card,Box,CardActions,Tabs,FormControl,ButtonGroup,Divider,FormLabel,Tab,RadioGroup,Radio,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Menu,MenuItem,ListItem,IconButton,TableBody,Typography} from '@material-ui/core'
import { useTheme, makeStyles, styled ,lighten} from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import { Route, Switch, useRouteMatch, useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
// import {VNDFormat} from "../"
import {VNDFormat} from "../../../../components/TextField/NumberFormatCustom"
import {CustomButton} from "../../../../components/Button/ColorButton"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import defaultProduct from '../../../../assets/img/product/default-product.png'
import _ from 'lodash'
import { customerPageActions } from '../../../../store/slice/customerPageSlice';

import ReactQuill, {Quill} from 'react-quill';
import openNotification from "../../../../components/StatusPopup/StatusPopup";




const DetailPage = (props) => {
    const theme = useTheme();
    const {webInfo} = props;
    const mainColor = `rgba(${ webInfo.mainColor.r }, ${ webInfo.mainColor.g }, ${ webInfo.mainColor.b }, ${webInfo.mainColor.a })`;
    const useStyles = makeStyles((theme,) => ({
      root: {
          flexGrow: 1,
          marginLeft:50,
          marginRight:50,
          marginTop:130
      },
      radio: {
        color: mainColor,
        '&$checked': {
          color: mainColor
        }
      },
      checked: {}
  }));
     
  const dispatch = useDispatch()
    const classes = useStyles(theme);
    const {productCode} = useParams();
    const {products } = useSelector(state => state.customerPage)
    const detailProduct = products.find(prod => prod.product_code === productCode);
    const [quantity, setQuantity]  = useState(1)
    const {priceStyle, nameStyle} = webInfo.detailPage
    const {order} = useSelector(state => state.customerPage)


    const attrValue = detailProduct?.attribute_value? JSON.parse(detailProduct.attribute_value):null
    const initValue = attrValue?.map(row => row.items[0])
    const [selectAttr, setSelectedAttr]  = useState(initValue)
    const all_child_product = detailProduct?.has_variance ? products.filter( item => item.parent_product_code === detailProduct.product_code):null
    


    useEffect(()=>{
        setSelectedProduct(getChoosenProductWithVariance())
    },[selectAttr])
    useEffect(()=>{
      if(detailProduct?.has_variance){
        setSelectedProduct(getChoosenProductWithVariance())
      }
    },[])
    

    const getChoosenProductWithVariance = ()=>{
      let choosenProduct = all_child_product? [...all_child_product] :[]
        for (let i = 0; i< selectAttr?.length ; i++){
          choosenProduct =  choosenProduct.filter(item=> 
            JSON.parse(item.attribute_value)[i].value.includes(selectAttr[i]) )
        }
        return choosenProduct[0]
    }

    const [selectedProduct, setSelectedProduct] = useState(null)

  
    const handleChange = (e, keyIndex,val) =>{
      let newSelectAttr = [...selectAttr];
      newSelectAttr[keyIndex] = val? val: e.target.value;
      setSelectedAttr(newSelectAttr);

    }


    const addProduct= () =>{
      if(detailProduct.has_variance) {
        addProductToCart(selectedProduct, quantity)
        return
      }
      addProductToCart(detailProduct, quantity)
    }

    const addProductToCart = (product, addQuantity=1) => {
      const newItem = {...product}
      try {
          console.log(newItem);
          const index = order.cartItem.findIndex(item => item.uuid === newItem.uuid);
          console.log(index)
          const newOrder = _.cloneDeep(order);
          if (index !== -1) {
              // newOrder.cartItem[index].quantity += 1;
              newOrder.cartItem[index].quantity += addQuantity;
          } else {
              // newItem.quantity = 1;
              newItem.quantity  = addQuantity;
              newOrder.cartItem.push(newItem);
          }
          console.log("newOrder",newOrder)
          dispatch(customerPageActions.setOrder(newOrder))
          // success("Thêm sản phẩm thành công")
          openNotification("success", "Thêm sản phẩm thành công");
      } catch(err) {
          console.log(err)
      }
  }

 

    const image = JSON.parse(detailProduct?.img_urls ?detailProduct?.img_urls: "[]" )
    return (
    <div className={classes.root}>
      <Grid container  direction="row" justifyContent="space-between" alignItems="flex-start" spacing={8}>
        <Grid item xs={12} md={6}>
          {image.length !==0?
          <Carousel   showArrows={true} showStatus={false} infiniteLoop={true} emulateTouch={true} swipeable={true} dynamicHeight={false}  showThumbs={true}
            >
                {image?.map((url)=><img  src={url}style={{borderRadius:10}} />)}
            </Carousel>
           :
          <Box  component="img" sx={{  marginLeft: 7, marginRight: 7,  borderRadius: 2}} src={defaultProduct}/>
          }
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
              <Typography variant="h1" style={{marginBottom:25,color:nameStyle[0] === "0" ? "#000": mainColor , fontWeight:nameStyle[2], fontSize: Number(nameStyle[1])}}>{detailProduct?.name}</Typography>
              <Typography variant="h2" style={{color:priceStyle[0] === "0" ? "#000": mainColor , fontWeight:priceStyle[2], fontSize: Number(priceStyle[1])}}>{detailProduct?.list_price.toLocaleString()} đ</Typography>
              <Typography variant="h5" style={{marginTop:40, marginBottom:10}}>Số lượng :</Typography>
              
              <ButtonGroup disableElevation variant="contained" style={{marginBottom:50}}  >
                <CustomButton mainColor='#f7f7f7'  textColor='#000' size="small" color='secondary'onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}}> <RemoveIcon /></CustomButton>
                <CustomButton mainColor='#fff'  textColor='#000'  >{quantity}</CustomButton>
                <CustomButton mainColor='#f7f7f7' textColor='#000'size="small" onClick={()=>{setQuantity(quantity + 1)}}><AddIcon /></CustomButton>
              </ButtonGroup>
            {detailProduct?.has_variance ?
              attrValue?.map((attr,indexKey) => {
                return(
                  <Box  style={{marginBottom:20}}>
                     <Box style={{display:'flex',backgroundColor:'#F1F1F1',height:38 ,paddingLeft:10, marginBottom:10, paddingTop:9}}>
                      <Typography style={{fontSize:15, color:'#000', fontWeight:500, }}>{attr.key}</Typography> 
                    </Box> 
                  <FormControl>
                 
                      {/* <Typography style={{fontSize:15, color:'#000', fontWeight:500}}>{attr.key}</Typography>   */}
                        <RadioGroup  value={selectAttr[indexKey]} onChange={(e)=>handleChange(e,indexKey)} >
                          <div>
                              {attr.items.map(((val, indexItems) => {
                                return(
                                <FormControlLabel value={val} control={<Radio   classes={{root: classes.radio, checked: classes.checked}}  />} label={<Typography style={{color:'#000', fontSize:18,marginRight:15}}>{val}</Typography>}/>
                               ) }))}  
                          </div>
                        </RadioGroup>
                      </FormControl>
                    
                  </Box>
                )
              })
              :null
            }
          </Box>
          <CustomButton fullWidth mainColor={mainColor} style={{marginTop:50}} onClick={addProduct} >Thêm vào giỏ hàng</CustomButton>
        </Grid>
      </Grid>
    
        <Divider  style={{marginTop:20}}/>
        <Typography  style={{color:'#000', fontSize:18,fontWeight:500, marginTop:20,}}>Mô tả sản phẩm</Typography>
      
                {/* <ReactQuill theme="bubble" value={} readOnly={true} /> */}
                {detailProduct?.description}

    </div>
        
    )
}

export default DetailPage


{/* <Typography style={{fontSize:15, color:'#000', fontWeight:500, marginBottom:10}}>{attr.key}</Typography> 
                    <Grid container >
                        {attr.items.map(((val, indexVal) => (
                          <Box  style={{border: "1px solid #b8b8b8",backgroundColor: selectAttr[indexKey]  === val?  mainColor:null, color: selectAttr[indexKey]  === val?  '#fff':null, padding:6, paddingRight:20, paddingLeft:20, marginRight:10}}>
                            <Typography  onChange={(e)=>handleChange(e,indexKey,val )} style={{ fontSize:17, fontWeight:500}}>{val}</Typography>
                          </Box>
                          )))}  
                    </Grid>                        */}