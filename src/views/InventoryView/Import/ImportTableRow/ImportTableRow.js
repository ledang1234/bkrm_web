import React, { useEffect } from 'react'
//import style
import useStyles from "../../../../components/TableCommon/style/mainViewStyle";
//impỏrt library
import {Box,TextField,ListItem,IconButton,TableRow,TableCell,Typography} from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
//import project 
import * as Input from '../../../../components/TextField/NumberFormatCustom'
import ButtonQuantity from "../../../../components/Button/ButtonQuantity";

import icon from '../../../../assets/img/product/tch.jpeg';


export const ImportRow = (props) =>{
    const classes = useStyles(); 
    const {row, handleDeleteItemCart, handleChangeItemQuantity, handleChangeItemPrice} = props

    const updateQuantity = (newQuantity) => {
      handleChangeItemQuantity(row.uuid, newQuantity)
    }
    
    return (
      <TableRow hover key={props.row.uuid}>
          <TableCell align="left">{row.id + 1}</TableCell>
          <TableCell align="left" style={{width:5}}>{row.barcode}</TableCell>
          <TableCell align="left" style={{minWidth:200}}>
            <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}> 
                <Box component="img" sx={{ height: 40, width: 40,  borderRadius:10,  marginRight:15 }}src={row.img_url} />
                {row.name}
            </ListItem>  
            </TableCell>
          <TableCell align="right">
            <Input.ThousandSeperatedInput 
              id="standard-basic" style={{width:70 }} size="small" 
              inputProps={{style: { textAlign: "right" }}} 
              defaultPrice={row.unit_price} 
              onChange={e => handleChangeItemPrice(props.row.uuid, e.target.value)}/>
          </TableCell>
  
          <TableCell align="left" padding='none' >
            <ButtonQuantity quantity={row.quantity} setQuantity={updateQuantity}/> 
          </TableCell> 
          
          <TableCell align="right"className={classes.boldText}>{row.unit_price * row.quantity}</TableCell>
          <TableCell align="right" >
            <IconButton aria-label="expand row" size="small" >
                <DeleteForeverOutlinedIcon onClick={() => handleDeleteItemCart(row.uuid)}/>
            </IconButton>
          </TableCell>
        </TableRow>
    )
  }
export const ImportRowMini = ({row}) =>{
    const classes = useStyles(); 

    return (
        <TableRow hover key={row.id}>
        
          <TableCell align="left" >
            <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}> 
                <Box component="img" sx={{ height: 40, width: 40,  borderRadius:10,  marginRight:15 }}src={icon} />
                <Box direction="column">

                    <Typography className={classes.boldText} style={{marginBottom:3, fontSize:14.5,width:135, textOverflow: 'ellipsis' ,overflow: 'hidden',whiteSpace: 'nowrap' }}>{row.name}</Typography>
                    {/* <Typography>{row.price}</Typography> */}
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:70 }} size="small" defaultPrice={row.price} />
                    
                </Box>
            </ListItem>  
        </TableCell>
     
          <TableCell align="left" padding='none' >
                <TextField variant="outlined" defaultValue={row.quantity} style={{width:37,margin: 0}}  size="small" inputProps={{style: { paddingLeft: 5,paddingRight: 5, textAlign: "center"}}} />
          </TableCell> 
          
          <TableCell align="right"className={classes.boldText}>700.000</TableCell>
          <TableCell align="left" >
            <IconButton aria-label="expand row" size="small"style={{marginLeft:-25}} >
                <DeleteForeverOutlinedIcon />
            </IconButton>
          </TableCell>
        </TableRow>
    )
  }


