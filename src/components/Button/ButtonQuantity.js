import React, { useEffect } from 'react'
import {Grid,Card,Box,Tooltip,TextField,ListItem,Divider,IconButton,TableRow,TableCell,TableBody,Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import useStyles from "../../components/TableCommon/style/mainViewStyle";
import {withStyles} from "@material-ui/core/styles";

import RemoveIcon from '@material-ui/icons/Remove';
import clsx from "clsx";
import WarningIcon from '@material-ui/icons/Warning';
const ButtonQuantity = (props) =>{
    const classes = useStyles();
    const {quantity,setQuantity, limit, isReturn,branch_quantity} = props;
    const [show, setShow] = React.useState('none');
  
    const handleIncrement = () => {
      if(limit) {
        if(quantity >= Number(limit)) {
          console.log('true')
          setQuantity(quantity)
          return
        }
      } 
      setQuantity(quantity+ 1);
    };
  
    const handleDecrement = () => {
      if(quantity >=1){setQuantity(quantity- 1);}
    };

    
    const handleShow = () => {
      setShow('block');
    };
    const handleClose = () => {
      setShow('none');
    };
  
    const HtmlTooltip = withStyles((theme) => ({
      tooltip: {
        backgroundColor: '#9f9fa1',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }))(Tooltip);

    var error_quantity = quantity > branch_quantity;

    const handleQuantity = (e) =>{

       if (!isNaN(e.target.value) && e.target.value >0){
        setQuantity(parseInt(e.target.value))
      } 
    }
   
    return(
    <ListItem onMouseOver={handleShow} onMouseOut={handleClose}  > 
          <IconButton style={{ display: show ,color: error_quantity  ? "red":null,}} aria-label="delete" className={classes.margin} size="small" onClick={handleDecrement} >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
       
           <TextField  id="standard-basic" style={{width:35 }} className={clsx(classes.textfieldClass,(show === 'none') ? classes.padding : null)}  size="small" inputProps={{style: { textAlign: "right", color: error_quantity  ? "red":null, fontWeight:error_quantity ? 600:null,
          backgroundColor:error_quantity ?"#ffe8e8":null
        }}} 
                value={quantity} onChange={handleQuantity}/>
           
           
          {isReturn ? `/${limit}`: null}

          <IconButton style={{ display: show ,color: error_quantity  ? "red":null, }} aria-label="delete" className={classes.margin} size="small" onClick={handleIncrement}>
            <AddIcon fontSize="inherit" />
          </IconButton>

          {error_quantity ?
     
        <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit"><b>Vượt tồn kho</b> </Typography>
            <u>{"Tồn kho:"}</u> <b>{branch_quantity}</b> 
           
          </React.Fragment>
        }
      >
         <WarningIcon fontSize="small"  style={{fill: "red"}}/> 
      </HtmlTooltip>
         
          
          :null}

    </ListItem>  
    )
  }

export default ButtonQuantity
