import React, { useEffect, useState } from 'react'
import { useTheme, makeStyles, styled , lighten} from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import {IconButton,Typography,Box} from '@material-ui/core';
import '../../../index.css';
import ProductList from '../ProductPage/ProductList/ProductList';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
import InventoryList from '../../../assets/JsonData/inventory.json'
import StoreContext from '../StoreContext';
import customerPageApi from '../../../api/customerPageApi';

const useStyles = makeStyles((theme) => ({
    arrow: {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',  
        cursor: 'pointer',
        opacity:0.2,
        '&:hover': {
            opacity: 1,
        },
    },
    arrowRight:{
        right: 15 ,
    }
}));
const images=[
    "https://minio.thecoffeehouse.com/image/admin/bannerWeb_TCH_TeacherDay_074746.jpg",
    "https://minio.thecoffeehouse.com/image/admin/BANNERWEB(7)_809808.jpg",
    "https://minio.thecoffeehouse.com/image/admin/BANNERWEB(5)_846453.jpg"
]

const MainPage = (props) => {
    const {mainColor, priceStyle,btnStyle,isMargin,border,alignCenter,nameStyle,isBox,storeInfo,marginContainer,boxDistance} = props;

    const theme = useTheme();
    const classes = useStyles(theme);

    const [inventoryList, setInventoryList] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await customerPageApi.storeProducts(storeInfo.uuid)
                setInventoryList(res.data)
                console.log(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchProducts();
    }, [storeInfo])
    return (
<>
    {/* // 1. CAROUSE */}
    <Carousel // showArrows={true} showStatus={true} showIndicators={true} showThumbs={true} stopOnHover={true} thumbWidth=""
        interval="3000"
        infiniteLoop={true}
        showStatus={false} 
        autoPlay  
        emulateTouch={true}
        swipeable={true}
        dynamicHeight={false} 
        showThumbs={false} 
        renderArrowPrev={(onClickHandler) =><IconButton className={classes.arrow} onClick={onClickHandler} ><ArrowBackIosIcon  /></IconButton>}
        renderArrowNext={(onClickHandler) =><IconButton className={clsx(classes.arrow, classes.arrowRight)} onClick={onClickHandler} ><ArrowForwardIosIcon  /></IconButton>}
    >
        {images.map((img)=><img  src={img} />)}
    
    </Carousel>


    {/* // 2. BEST SELLERS  */}
    <Box>
        <Typography variant="h2" style={{flexGrow: 1,textAlign: "center", marginBottom:30,marginTop:50}}>Bán chạy</Typography>
        <ProductList InventoryList={inventoryList} mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={10} boxDistance={2}/>
    </Box>

    {/* // 3. NEWS IN  */}
    {/* <Box style={{backgroundColor:lighten(mainColor, 0.9),paddingBottom:20,marginTop:50}}>
        <Typography variant="h2" style={{flexGrow: 1,textAlign: "center", marginBottom:30,paddingTop:50}}>Sản phẩm mới</Typography>
        <ProductList InventoryList={InventoryList} mainColor={mainColor} priceStyle={priceStyle} btnStyle={btnStyle} isMargin={isMargin} border={border} alignCenter={alignCenter} nameStyle={nameStyle} isBox={isBox} marginContainer={10} boxDistance={2}/>
    </Box> */}
    
</>  



    )
}

export default MainPage
