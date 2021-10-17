import React , { useEffect }from 'react'
import { makeStyles,createStyles} from "@material-ui/core/styles";
import { Button,Grid} from "@material-ui/core";
import { SET_BORDER_RADIUS, SET_FONT_FAMILY, SET_MODE, SET_PRIMARY_COLOR,SET_SECONDARY_COLOR } from '../../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import {red, pink, purple, blue, cyan,  green, yellow, amber, orange, grey} from '@material-ui/core/colors'
import clsx from "clsx";
import CardWrapper from '../../CardWrapper/CardWrapper';
// material-ui
import { useTheme } from '@material-ui/styles'; 
 // borderWidth:2,
            // borderColor:'#212121'
const useStyles = makeStyles((theme) =>
createStyles({
    btn:{
        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', borderRadius:'30px', margin:10,
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
    btnYellow:{
        background:yellow[500],
        '&:hover': {background:yellow[300]}
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
}));
const ButtonGroup = (props)=>{
    const classes = useStyles();
    const {set, title} = props;
    return(
 
        <CardWrapper title={title}>
            <Grid spacing={3}>
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnPink)} onClick={()=>{set(pink)}}  />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnBlue)} onClick={()=>{set(blue)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnAmber)} onClick={()=>{set(amber)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnRed)} onClick={()=>{set(red)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnPurple)} onClick={()=>{set(purple)}} />
                
            </Grid>
            <Grid spacing={3}>
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnCyan)} onClick={()=>{set(cyan)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnGreen)} onClick={()=>{set(green)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnYellow)} onClick={()=>{set(yellow)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnOrange)} onClick={()=>{set(orange)}} />
                <Button variant="outlined"  className={clsx(classes.btn,classes.btnGrey)} onClick={()=>{set(grey)}} />
            </Grid>
        </CardWrapper>

    )
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
            <ButtonGroup set={setPrimaryColor} title="Màu nền" />
            <ButtonGroup  set={setSecondaryColor} title="Màu nhấn"/>
        </div>
    );
}   

export default ColorTheme
