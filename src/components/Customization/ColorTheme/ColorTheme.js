import React , { useEffect }from 'react'
import { makeStyles,createStyles} from "@material-ui/core/styles";
import { Button,Grid} from "@material-ui/core";
import { SET_BORDER_RADIUS, SET_FONT_FAMILY, SET_PRIMARY_COLOR,SET_SECONDARY_COLOR , SET_COLOR_LEVEL} from '../../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import {red, pink, purple, blue, cyan,  green, yellow, amber, orange, grey,teal} from '@material-ui/core/colors'
import clsx from "clsx";

import CardWrapper from '../../CardWrapper/CardWrapper';
// material-ui

import { useTheme } from '@material-ui/styles';
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,

    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography,
    Card,

    Box,
    List
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
createStyles({
    btn:{
        maxWidth: '30px', maxHeight: '33px', minWidth: '30px', minHeight: '33px', borderRadius:'30px', margin:10,
    },
    btnPink:{
        background:pink[500],
        '&:hover': {background:pink[300]}
    },
    btnBlue:{
        background:blue[500],
        '&:hover': {background:blue[300]}
    },
    btnRed:{
        background:red[500],
        '&:hover': {background:red[300]}
    },
    btnPurple:{
        background:purple[500],
        '&:hover': {background:purple[300]}
    },
    btnCyan:{
        background:cyan[500],
        '&:hover': {background:cyan[300]}
    },
    btnGreen:{
        background:green[500],
        '&:hover': {background:green[300]}
    },
    btnTeal:{
        background:teal[500],
        '&:hover': {background:teal[300]}
    },
    btnAmber:{
        background:amber[500],
        '&:hover': {background:amber[300]}
    },
    btnOrange:{
        background:orange[500],
        '&:hover': {background:orange[300]}
    },
    btnGrey:{
        background:grey[500],
        '&:hover': {background:grey[300]}
    },
    levelForm:{
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:15
     },
    choosen:{
        borderWidth:2,
        margin:9,
        borderColor:'#212121'
    }
}));
function valueText(value) {
    return `${value}px`;
}
const SliderColor = (props) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    // state - border radius
    const [colorLevel, setColorLevel] = React.useState(customization.colorLevel);
    const handleColorLevel = (event, newValue) => {
        setColorLevel(newValue);
    };
    useEffect(() => {
        dispatch({ type: SET_COLOR_LEVEL, colorLevel});
    }, [dispatch, colorLevel]);

    if (props.title === "Màu nền"){
        return (
            <Box className={classes.levelForm}>
                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                            4px
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            size="small"
                            value={colorLevel}
                            onChange={handleColorLevel}
                            getAriaValueText={valueText}
                            valueLabelDisplay="on"
                            aria-labelledby="discrete-slider-small-steps"
                            marks
                            step={100}
                            min={0}
                            max={900}
                            color="secondary"
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    color: 'secondary.light'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                            24px
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }else{
        return(<div></div>)
    }
    
}

const ButtonGroup = (props)=>{
    const classes = useStyles();
    const {set, title, colorChoosen} = props;
    return(
 
        <CardWrapper title={title}>
            <Grid spacing={3}>
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnPink,(colorChoosen === pink)&& classes.choosen)} onClick={()=>{set(pink)}}  />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnBlue,(colorChoosen === blue)&& classes.choosen)} onClick={()=>{set(blue)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnAmber,(colorChoosen === amber)&& classes.choosen)} onClick={()=>{set(amber)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnRed,(colorChoosen === red)&& classes.choosen)} onClick={()=>{set(red)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnPurple,(colorChoosen === purple)&& classes.choosen)} onClick={()=>{set(purple)}} />
                
            </Grid>
            <Grid spacing={3}>
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnCyan,(colorChoosen === cyan)&& classes.choosen)} onClick={()=>{set(cyan)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnGreen,(colorChoosen === green)&& classes.choosen)} onClick={()=>{set(green)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnTeal,(colorChoosen === teal)&& classes.choosen)} onClick={()=>{set(teal)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnOrange,(colorChoosen === orange)&& classes.choosen)} onClick={()=>{set(orange)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnGrey,(colorChoosen === grey)&& classes.choosen)} onClick={()=>{set(grey)}} />
            </Grid>
            <SliderColor title={title}/>
       
        </CardWrapper>
       
    );
}
const ColorTheme = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);


    // state - font family
    const [primaryColor, setPrimaryColor] = React.useState(customization.primaryColor);
    useEffect(() => {
        dispatch({ type: SET_PRIMARY_COLOR, primaryColor });
    }, [dispatch, primaryColor]);

    
    const [secondaryColor, setSecondaryColor] = React.useState(customization.secondaryColor);
    useEffect(() => {
        dispatch({ type: SET_SECONDARY_COLOR, secondaryColor });
    }, [dispatch, secondaryColor]);
   

    return (
        <div>
            <ButtonGroup set={setPrimaryColor} title="Màu nền"  colorChoosen={primaryColor}/>
            <ButtonGroup  set={setSecondaryColor} title="Màu nhấn" colorChoosen={secondaryColor}/>
        </div>
    );
}   

export default ColorTheme
