import React, {useState} from 'react'
import { Carousel } from "react-responsive-carousel";
import {
    Button,
    TextField,
    Typography,
    Grid,
    Box,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    Tooltip,
    Dialog,
    FormControlLabel,
    Switch,
    Collapse,
    Paper,
    Card,
    CardHeader,
    Checkbox,
  } from "@material-ui/core";
  import { useTheme, makeStyles, styled , lighten} from "@material-ui/core/styles";
import '../../../../index.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from "clsx";
import AddIcon from "@material-ui/icons/Add";
import avaUpload from "../../../../assets/img/product/default-product.png";
import AddMultipleImage from '../../../../components/AddMultipleImage/AddMultipleImage';

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


const MainPageSetting = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {imageURL, setImageURL,images,setImages,display,setDisplay} = props

  return (
    <>
        <Typography style={{fontWeight:500, marginRight:20, color:"#000",fontSize:15}}>Hình ảnh Banner: </Typography>

        <AddMultipleImage imageURL={imageURL} setImageURL={setImageURL} images={images} setImages={setImages} display={display} setDisplay={setDisplay} />
        <Carousel 
            interval="3000" infiniteLoop={true} showStatus={false}  autoPlay   emulateTouch={true} swipeable={true}  dynamicHeight={false}  showThumbs={false} 
            renderArrowPrev={(onClickHandler) =><IconButton className={classes.arrow} onClick={onClickHandler} ><ArrowBackIosIcon  /></IconButton>}
            renderArrowNext={(onClickHandler) =><IconButton className={clsx(classes.arrow, classes.arrowRight)} onClick={onClickHandler} ><ArrowForwardIosIcon  /></IconButton>}
        >
            {display.map((img)=><img  src={img.link} />)}
    
        </Carousel>
    </>
  )
}

export default MainPageSetting


