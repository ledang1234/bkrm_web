import React from 'react'
import {Button,Grid,Paper,Card,Box,CardActions,Tabs,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Switch,Menu,MenuItem,ListItem,IconButton,TableBody,Typography} from '@material-ui/core'
import { useTheme, makeStyles, styled ,lighten} from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
const useStyles = makeStyles((theme,) => ({
    root: {
        flexGrow: 1,
        marginLeft:50,
        marginRight:50,
        marginTop:130
    },
}));

const images=[
    "https://minio.thecoffeehouse.com/image/admin/Bottle_TraDao_836487.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147051_photo-2021-10-02-10-52-45.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147050_photo-2021-10-02-10-52-44.jpg",
    "https://minio.thecoffeehouse.com/image/admin/Bottle_TraDao_836487.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147051_photo-2021-10-02-10-52-45.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147050_photo-2021-10-02-10-52-44.jpg",
    "https://minio.thecoffeehouse.com/image/admin/Bottle_TraDao_836487.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147051_photo-2021-10-02-10-52-45.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147050_photo-2021-10-02-10-52-44.jpg",
    "https://minio.thecoffeehouse.com/image/admin/Bottle_TraDao_836487.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147051_photo-2021-10-02-10-52-45.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1633147050_photo-2021-10-02-10-52-44.jpg",
]
const detailProduct={
        id: 1,
        name: "Trà Đào Cam Sả Chai Fresh 500ML",
        price:200,
        import_price: 100,
        barcode: 23443355545,
        category_id:"1",
        status:"active",
        image_url:"/src/assets/img/product/1.jpg",
        quantity:0,
        category:"Thuc pham"  
}

const DetailPage = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
    <div className={classes.root}>
      <Grid container  direction="row" justifyContent="space-between" alignItems="flex-start" spacing={8}>
        <Grid item xs={12} md={6}>
            {/* Hình đã đc cắt vuông trên database */}
            <Carousel 
                showArrows={false} 
                showStatus={false}
                infiniteLoop={true}
                emulateTouch={true}
                swipeable={true}
                dynamicHeight={false} 
                showThumbs={true} 
            >
                {images.map((img)=><img  src={img}style={{borderRadius:10}} />)}
            </Carousel>
           
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
              <Typography variant="h1">{detailProduct.name}</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
        
    )
}

export default DetailPage
