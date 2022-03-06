import React from 'react'
import { useTheme, withStyles,makeStyles, createStyles } from "@material-ui/core/styles";

import { Typography,Divider, Button,TextField,FormControlLabel,Checkbox,List,Card,FormControl,ListItem,ListSubheader,ListItemSecondaryAction,Switch,ListItemIcon, ListItemAvatar,Avatar,ListItemText,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import {ThousandSeperatedInput} from "../../../../components/TextField/NumberFormatCustom"
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

export const ReturnLimitSetting = ({checked,handleClose,handleSubmit,name}) => {

    const theme = useTheme();
    const [returnLimit, setReturnLimit] = React.useState(checked)

    return (
        <>
        <ListItem style={{paddingLeft:0, marginTop:15}}>
          <Typography style={{fontWeight:500, color:"#000", marginRight:20}}>Không cho phép trả hàng sau: </Typography>
          <ThousandSeperatedInput style={{width:50,marginRight:20}} value={returnLimit.day} onChange={(e)=>setReturnLimit({status:true, day:e.target.value})} />
          <Typography >ngày </Typography>
        </ListItem>
         <Grid item  xs={12} style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end",  paddingTop: 20,  }}  >
          <Button onClick={handleClose} variant="contained"  size="small"  style={{ marginRight: 20 }} color="secondary"  >  Huỷ </Button>
          <Button onClick={()=>handleSubmit(name,returnLimit)} variant="contained" size="small" color="primary" >OK  </Button>
        </Grid>
        </>

  )
}

export const DiscountSetting = ({checked,handleClose,handleSubmit,name}) => {

    const theme = useTheme();
    const [discount, setDiscount] = React.useState(checked)
    const handleCheckbox= (event) => {
        setDiscount((prevState)=>{
            return {
                ...prevState,
                [event.target.name]:event.target.checked
            }
        })
    };
    return (
        <>
        <FormControlLabel control={<Checkbox  color="primary" name="applyMultiple"  checked={discount.applyMultiple}  onChange={handleCheckbox} />} label="Áp dụng gộp các chương trình khuyến mại" />
        <FormControlLabel control={<Checkbox  color="primary" name="applyOnline"  checked={discount.applyOnline}  onChange={handleCheckbox} />} label="Áp dụng khuyến mãi khi mua hàng online" />

        <Grid item  xs={12} style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end",  paddingTop: 20,  }}  >
          <Button onClick={handleClose} variant="contained"  size="small"  style={{ marginRight: 20 }} color="secondary"  >  Huỷ </Button>
          <Button onClick={()=>handleSubmit(name,discount)} variant="contained" size="small" color="primary" >OK  </Button>
        </Grid>
        </>

  )
}
  
export const VatSetting = ({checked,handleClose,handleSubmit,name}) => {

    const theme = useTheme();
    const [vat, setVat] = React.useState(checked)

    const handleChangeName = (event, index) => {
        var newVat = {...vat}
        newVat.listCost[index].name = event.target.value
        setVat(newVat)
    };

    const handleChangeValue= (event, index) => {
        var newVat = {...vat}
        newVat.listCost[index].value = event.target.value
        setVat(newVat)
    };
   

    const handleChangeMoneyType= (index,value) => {
        var newVat = {...vat}
        newVat.listCost[index].type = value
        setVat(newVat)
    };
    const addConditionRow = () => {
        var newVat = {...vat}
        const d = new Date();
        newVat.listCost.push({key:d.toString(),costName:"", value:0, type:"%"})
        setVat(newVat);
    }
    const deleteAttr = (key) => {
        var newVat = {...vat}
        newVat.listCost = newVat.listCost.filter(row => row.key !== key)
        setVat(newVat);
    }
    return (
        <>
      
        {vat.listCost.map((row,index) =>{
            return (
            <>
        
            <Grid item  container direction="row" alignItems="center" spacing={5} style={{marginTop:10}}>
                <Grid item> 
                    <ListItem style={{margin:0, padding:0}}>
                        <Typography style={{fontWeight:500, color:"#000",marginRight:15, width:150}}>Tên chi phí</Typography>
                        <TextField placeholder="Tên chi phí" style={{marginRight:15}} value={row.name} onChange={(e)=>handleChangeName(e, index)}/>
                    </ListItem>
                </Grid> 
                
                <Grid item> 
                    <ListItem style={{margin:0, padding:0}}>
                        <Typography style={{fontWeight:500, color:"#000",marginRight:15}}>Giá trị</Typography>
                        <ThousandSeperatedInput style={{marginRight:10, color:"#000"}} value={row.value} onChange={(e)=>handleChangeValue(e, index)} />
                        <Avatar variant="rounded"  onClick={()=>handleChangeMoneyType(index,"VND")}  style={{width: theme.spacing(4),height: theme.spacing(3), background:row.type ==="VND"?  theme.palette.primary.main :null,}} >
                            <Typography  style={{fontSize:13, fontWeight:500}} >VND</Typography>
                        </Avatar>     
                        <Avatar  onClick={()=>handleChangeMoneyType(index,"%")} variant="rounded"   style={{width: theme.spacing(4),height: theme.spacing(3), background: row.type ==="%"?theme.palette.primary.main :null,}} >
                            <Typography  style={{fontSize:13, fontWeight:500}} >%</Typography>
                        </Avatar>    
                    </ListItem>      
                </Grid> 
                <Grid item>
                    <DeleteForeverTwoToneIcon  onClick={() => {deleteAttr(row.key)}}/>
                </Grid> 
            </Grid>
            </>
        )})}
        <div style={{display:'flex',justifyContent:"flex-end"}}>
         <Button variant="outlined" size="small" color="primary" style={{marginBottom:15 , width:150,marginTop: 20, textTransform: "none" }}
            startIcon={<AddIcon />}
            onClick={() => addConditionRow()}>
            Thêm phí thu
        </Button>
        </div>

        <Grid item  xs={12} style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end",  paddingTop: 20,  }}  >
          <Button onClick={handleClose} variant="contained"  size="small"  style={{ marginRight: 20 }} color="secondary"  >  Huỷ </Button>
          <Button onClick={()=>handleSubmit(name,vat)} variant="contained" size="small" color="primary" >OK  </Button>
        </Grid>
        </>

  )
}
