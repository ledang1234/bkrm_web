import React from 'react'
import { useTheme, withStyles,makeStyles, createStyles } from "@material-ui/core/styles";

import { Typography,Divider,Button, Select,MenuItem,TextField,FormControlLabel,Checkbox,List,Card,ListItem,FormControl,RadioGroup,Radio,ListSubheader,ListItemSecondaryAction,Switch,ListItemIcon, ListItemAvatar,Avatar,ListItemText,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import {ThousandSeperatedInput} from "../../../../components/TextField/NumberFormatCustom"


const OrderLowStockSetting = ({checked,handleClose,handleSubmit,name}) => {

  const theme = useTheme();

  const [orderLowStock, setOrderLowStock] = React.useState(checked)

  const handleChange = (event) => {
    setOrderLowStock((prevState)=>{
      return {
          ...prevState,
          [event.target.name]:event.target.value
      }
  })
  };
    
  return (
    <>
      <Typography style={{fontWeight:500, color:"#000",marginRight:15, width:150}}>Số lượng đặt hàng lại:</Typography>
      <FormControl component="fieldset">
          <RadioGroup  name="choiceQuantity" value={orderLowStock.choiceQuantity} onChange={handleChange}>
          <ListItem>
            <FormControlLabel value="select" control={<Radio  color="primary" />}  />
            <Typography style={{color:"#000", marginRight:15}}>Dựa trên SL sản phẩm mà chi nhánh đã đặt</Typography>
            <Select
                  name="selectQuantity"
                  value={orderLowStock.selectQuantity}
                  onChange={handleChange}
                  style={{color:theme.customization.primaryColor[500], fontWeight:500}}
              >
                  <MenuItem value={"latest"}> gần đây nhất</MenuItem> 
                  <MenuItem value={"avg"}> trung bình</MenuItem>
            </Select>
          </ListItem>

          <ListItem>
            <FormControlLabel value="number" control={<Radio  color="primary" />}  />
              <ThousandSeperatedInput name="inputQuantity" style={{width:60,marginRight:15}} value={orderLowStock.inputQuantity}  onChange={handleChange} />   
              <Typography style={{color:"#000"}}> sản phẩm </Typography>
         </ListItem>
    </RadioGroup>
    </FormControl>
      <Typography style={{fontWeight:500, color:"#000",marginRight:15, marginTop:25,marginBottom:5,width:150}}>Nhà cung cấp:</Typography>
      
      <ListItem>
        <Typography style={{color:"#000", marginRight:15}}>NCC mà chi nhánh đặt sản phẩm</Typography>
        <Select
              name="selectSuplier"
              value={orderLowStock.selectSuplier}
              onChange={handleChange}
              style={{color:theme.customization.primaryColor[500], fontWeight:500}}
          >
              <MenuItem value={"latest"}>gần nhất</MenuItem> 
              <MenuItem value={"manytime"}>nhiều lần nhất</MenuItem>
        </Select>

      </ListItem>
     

      <Grid item  xs={12} style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end",  paddingTop: 20,  }}  >
          <Button onClick={handleClose} variant="contained"  size="small"  style={{ marginRight: 20 }} color="secondary" >  Huỷ </Button>
          <Button onClick={()=>handleSubmit(name,orderLowStock)} variant="contained" size="small" color="primary" >OK  </Button>
        </Grid>
    </>     
  )
}

export default OrderLowStockSetting