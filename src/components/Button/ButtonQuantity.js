import React, { useEffect } from 'react'
import {Grid,Card,Box,TextField,ListItem,Divider,IconButton,TableRow,TableCell,TableBody,Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import useStyles from "../../components/TableCommon/style/mainViewStyle";
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from "clsx";
const ButtonQuantity = (props) =>{
    const classes = useStyles();
    const {quantity,setQuantity, limit} = props;
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
    return(
    <ListItem onMouseOver={handleShow} onMouseOut={handleClose}>  
          <IconButton style={{ display: show }} aria-label="delete" className={classes.margin} size="small" onClick={handleDecrement} >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
        
          <TextField  id="standard-basic" style={{width:35 }} className={clsx(classes.textfieldClass,(show === 'none') ? classes.padding : null)}  size="small" inputProps={{style: { textAlign: "right" }}} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
          
          <IconButton style={{ display: show }} aria-label="delete" className={classes.margin} size="small" onClick={handleIncrement}>
            <AddIcon fontSize="inherit" />
          </IconButton>

    </ListItem>  
    )
  }

export default ButtonQuantity
