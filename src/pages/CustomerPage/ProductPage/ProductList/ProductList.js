import React,{useState}  from 'react'
import { useTheme, makeStyles, styled ,lighten} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import AddIcon from '@mui/icons-material/Add';
// import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import library 
import {Button,Grid,Card,Box,CardActions,Tabs,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Switch,Menu,MenuItem,ListItem,IconButton,TableBody,Typography, darken} from '@material-ui/core'
import icon from '../../../../assets/img/product/default.png';
// import icon from '../../../assets/img/product/tap.png';
// import icon from '../../../assets/img/product/rice.png';
//import project 
// import InventoryList from '../../../../assets/JsonData/inventory.json'
import { grey} from '@material-ui/core/colors'
import { Link } from "react-router-dom";
import { Route, useRouteMatch, useParams } from "react-router-dom";
import {useStyles} from './style'
import {ColorOutlineButtonCart} from "../../../../components/Button/ColorButton"
import { useDispatch, useSelector } from 'react-redux';
import { customerPageActions } from '../../../../store/slice/customerPageSlice';
import { success } from '../../../../components/StatusModal/StatusModal';
import defaultProduct from '../../../../assets/img/product/default-product.png'
import _ from 'lodash'
import PopUpProduct from "../PopUpProduct/PopUpProduct"
import openNotification from "../../../../components/StatusPopup/StatusPopup";
const ProductList = (props) => {
    let { categoryId } = useParams();
    let {url} = useRouteMatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch()


    // const {webInfo,InventoryList} = props;
    // const {isMargin, priceStyle,btnStyle,border,nameStyle,isBox,marginContainer,boxDistance} = props.webInfo.listProduct
    // const mainColor=`rgba(${ webInfo.mainColor.r }, ${ webInfo.mainColor.g }, ${ webInfo.mainColor.b }, ${ webInfo.mainColor.a })`

    const {isMargin, mainColor,priceStyle,btnStyle,border,nameStyle,isBox,marginContainer,boxDistance,InventoryList} = props
    // const mainColor=`rgba(${ webInfo.mainColor.r }, ${ webInfo.mainColor.g }, ${ webInfo.mainColor.b }, ${ webInfo.mainColor.a })`


    const {order} = useSelector(state => state.customerPage)
    // const orderWhenOutOfSctock = webSetting.orderManagement.orderWhenOutOfSctock
    // const branchOption = webSetting.orderManagement.branchOption

    //customization 
    const lgScreen = useMediaQuery(theme.breakpoints.down("lg")) ;
    const mdScreen = useMediaQuery(theme.breakpoints.down("md")) ;
    const smScreen = useMediaQuery(theme.breakpoints.down("sm")) ;
    const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;
    let numOfItemInRow = 6;
    if(xsScreen){numOfItemInRow=2}
    else if(smScreen){numOfItemInRow=3}
    else if(mdScreen){numOfItemInRow=4}
    else if(lgScreen){numOfItemInRow=5}
    else {numOfItemInRow=6}
    let widthSize = `${((100-marginContainer*2)/numOfItemInRow)-boxDistance*2}vw`
    function handleColor (type) {
        if(type==="0"){return '#000'}
        else if (type==="1"){return mainColor }
        else{return mainColor}
    }
    const nameColor = handleColor(nameStyle[0])
    const nameSize = nameStyle[1];
    const nameBold = nameStyle[2];
    const nameLineClass = classes.multiLineEllipsis

    const priceColor = handleColor(priceStyle[0])
    const priceSize =priceStyle[1]
    const priceBold = priceStyle[2]
    const alignCenter = Number(props.alignCenter)

    

    const [openQuickPopUp, setOpenQuickPopUp] = useState(false)
    const [selectedItem, setSelectedItem] = useState(false)

    const addProductToCart = (product, addQuantity=1) => {
        const newItem = {...product}
        try {
            console.log("newItem",newItem);
            const index = order.cartItem.findIndex(item => item.uuid === newItem.uuid);
            console.log(index)
            const newOrder = _.cloneDeep(order);
            if (index !== -1) {
                // newOrder.cartItem[index].quantity += 1;
                newOrder.cartItem[index].quantity += addQuantity;
            } else {
                // newItem.quantity = 1;
                newItem.quantity = addQuantity;
                newOrder.cartItem.push(newItem);
            }
            dispatch(customerPageActions.setOrder(newOrder))
            // success("Thêm sản phẩm thành công")
            openNotification("success", "Thêm sản phẩm thành công");
        } catch(err) {
            console.log(err)
        }
    }
    const openPopUp = (product) =>{
        if(product.has_variance){
            setOpenQuickPopUp(true)
            return
        }
        addProductToCart(product)
    }
    
    
    return (
        <Box className={classes.container} style={{marginLeft:`${marginContainer}vw`,marginRight:`${marginContainer}vw`,}}>
            <Grid container direction="row" spacing={2} justifyContent="center" >
             {/* Đổi list đúng với category */}
            {openQuickPopUp? <PopUpProduct  addProductToCart={addProductToCart}mainColor={mainColor} product={selectedItem}open={openQuickPopUp} onClose={()=>setOpenQuickPopUp(false)} />:null}
             {InventoryList?.map(item=>{
                 const image = JSON.parse(item.img_urls) ?JSON.parse(item.img_urls) [0]:null
             
                 return( 
                     <>
                     {Number(isBox)?
                     <Card  className={clsx(classes.hoverCard,classes.item,classes.colorCard)} style={{margin:`${boxDistance}%`, width:widthSize, borderRadius:border?7:0}} >
                        <CardActionArea 
                            component={Link} to={`${url}/products/${item.product_code}`} 
                        >
                            <CardMedia
                                style={{height:widthSize, margin:isMargin?10:0, marginBottom:isMargin?-5:0, borderRadius:border&& isMargin ?7:0}}
                                image={JSON.parse(item.img_urls ? item.img_urls : "[]").length  ? JSON.parse(item.img_urls ? item.img_urls : "[]").at(0) : defaultProduct}
                            />
                            <Box style={{marginTop:10}}>
                                <CardContent>
                                    < InfoComponent setSelectedItem={setSelectedItem} openPopUp={openPopUp}  item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                                </CardContent>   
                            </Box>
                        </CardActionArea>
                    </Card> :
                    <Box  className={clsx(/*classes.hoverCard,*/classes.item)} style={{margin:`${boxDistance}%`,width:widthSize, borderRadius:border?7:0}} >
                        <CardActionArea 
                            component={Link} to={`${url}/products/${item.product_code}`}
                        >
                            <CardMedia
                                style={{height:widthSize, margin:isMargin?10:0, marginBottom:isMargin?-5:0, borderRadius:border?7:0}}
                                image={JSON.parse(item.img_urls ? item.img_urls : "[]").length  ? JSON.parse(item.img_urls ? item.img_urls : "[]").at(0) : defaultProduct}
                            />
                            <Box style={{marginTop:10}}>
                                {isMargin? 
                                <CardContent>
                                    < InfoComponent setSelectedItem={setSelectedItem} openPopUp={openPopUp}  item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                                </CardContent>
                                :
                                < InfoComponent setSelectedItem={setSelectedItem} openPopUp={openPopUp}  item={item} mainColor={mainColor} btnStyle={btnStyle} alignCenter={alignCenter} nameColor={nameColor} priceColor={priceColor} nameSize={nameSize} nameBold={nameBold} nameLineClass={nameLineClass} priceBold={priceBold}priceSize={priceSize} />
                            }    
                            </Box>
                        </CardActionArea>
                    </Box>
                     } 
                </>
                )
             })}
            </Grid>
        </Box>
        
    )
}
export const InfoComponent = (props)=>{
    const {openPopUp,setSelectedItem,item,mainColor,btnStyle,alignCenter, nameColor,priceColor,nameSize,nameBold,nameLineClass,priceSize,priceBold} = props;
    let { path } = useRouteMatch();
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
        <Typography gutterBottom className={clsx( nameLineClass, classes.name, alignCenter && classes.alignCenter)} style={{color:nameColor, fontWeight:nameBold, fontSize:Number(nameSize)}}>
        {item.name}
        </Typography>
        {
            !alignCenter && !Number(btnStyle[1])? 
            <Grid container direction="row" alignItems="center" justifyContent="space-between" style={{marginBottom:-9}}>
                <Grid item>
                    <Typography variant="body2" style={{color:priceColor, fontWeight:priceBold, fontSize:Number(priceSize)}}  >
                        {item.list_price.toLocaleString()} đ
                    </Typography>
                
                </Grid>
                {Number(btnStyle[0])?
                    <Grid item>
                        <IconButton size="small"  style={{color:'#fff', background:mainColor}} 
                            // Stop Ripple Effect
                            onTouchStart={(event) => event.stopPropagation()}
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                // Prevent CardActionArea Click
                                event.preventDefault()
                                openPopUp(item);
                                setSelectedItem(item)
                            }}
                        >
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </Grid> :null }

            </Grid>
            :
            <>
            <Typography   className={alignCenter &&classes.alignCenter} style={{color:priceColor, fontWeight:priceBold, fontSize:Number(priceSize)}} >
                {item.list_price.toLocaleString()} đ
            </Typography>

            {Number(btnStyle[0])?
            <ColorOutlineButtonCart variant="outlined" fullWidth mainColor={mainColor} 
                onClick={(event) => {
                    // Prevent CardActionArea Click
                    event.preventDefault()
                    openPopUp(item);
                    setSelectedItem(item)
                }}
                style={{marginBottom:-12,marginTop:10 }}
                >
                Giỏ hàng
            </ColorOutlineButtonCart>   
            
            :null }
            </>
        }
        </>
    )
}



export default ProductList