import React from 'react'
import { useTheme, withStyles,makeStyles, createStyles } from "@material-ui/core/styles";

import { Typography,Divider,Button, TextField,FormControlLabel,Checkbox,List,Card,ListItem,ListSubheader,ListItemSecondaryAction,Switch,ListItemIcon, ListItemAvatar,Avatar,ListItemText,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import {ThousandSeperatedInput} from "../../../../components/TextField/NumberFormatCustom"


const EmailSetting = ({checked,handleClose,handleSubmit,name}) => {

    const theme = useTheme();

    const [email, setEmail] = React.useState(checked)


    const handleChangeValue= (event) => {
    
      setEmail((prevState)=>{
        return {
        ...prevState,
        [event.target.name]:event.target.value
        }
      })
    };

  
    return (
      <>
      <ListItem>
          <Typography style={{fontWeight:500, color:"#000", marginRight:20}}>Email gửi</Typography>
          <TextField  name="emailAddress" value={email.emailAddress} onChange={handleChangeValue} style={{width:250}} />
      </ListItem>
      <ListItem>
          <Typography style={{fontWeight:500, color:"#000", marginRight:20}}>Mật khẩu</Typography>
          <TextField  name="password" value={email.password} onChange={handleChangeValue} style={{width:250}} />
      </ListItem>

      <Grid item  xs={12} style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end",  paddingTop: 20,  }}  >
            <Button onClick={handleClose} variant="contained"  size="small"  style={{ marginRight: 20 }} color="secondary"  >  Huỷ </Button>
            <Button onClick={()=>handleSubmit(name,email)} variant="contained" size="small" color="primary" >OK  </Button>
        </Grid>
    
      </>      
    )
}

export default EmailSetting