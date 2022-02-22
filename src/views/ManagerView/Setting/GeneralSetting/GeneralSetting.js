import React, { useState } from "react";
import { useTheme, withStyles,makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography,Divider, List,Card,ListItem,ListSubheader,ListItemSecondaryAction,Switch,ListItemIcon, ListItemAvatar,Avatar,ListItemText,Grid, ButtonBase, Tooltip } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import WifiIcon from '@material-ui/icons/Wifi';

import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      background: theme.customization.mode === "Light" ? null : grey[800],
      borderRadius: theme.customization.borderRadius,
      color: "#000000",
      padding: 18,
    },
    headerTitle: {
   
      marginTop: 10,
      marginLeft: 20,
    },
  
  })
);

const GeneralSetting = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <Card className={classes.root}>
       <Typography className={classes.headerTitle} variant="h3">
          Cài đặt chung
        </Typography>
        <List subheader={<ListSubheader>Hàng hoá</ListSubheader>} className={classes.root}>

            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Quản lý tồn kho</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}>Quản lý sản phẩm theo số lượng tồn kho</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Tự động gợi ý thông tin hàng hoá</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}>Cho phép tự động gợi ý tên, mã, mô tả, hình ảnh hàng hóa khi thêm mới</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />


            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Hàng hoá có thuộc tính</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}>Quản lý sản phẩm theo số lượng tồn kho</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Quản lý tồn kho theo Lô/Date</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}>Quản lý sản phẩm theo số lượng tồn kho</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />


        </List>

        <List subheader={<ListSubheader>Khách hàng</ListSubheader>} className={classes.root}>
            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Tích điểm</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}> Tích điểm thưởng cho khách hàng khi mua hàng quy đổi điểm thưởng để thanh toán đơn hàng hoặc sử dụng điểm thưởng để chia nhóm khách hàng.</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Gửi SMS - Email - Zalo</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}> Cho phép thiết lập hạn mức công nợ để cảnh báo khách hàng.</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Cảnh báo công nợ khách hàng</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}> Cho phép thiết lập hạn mức công nợ để cảnh báo khách hàng.</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />

        </List>


        <List subheader={<ListSubheader>Giao dịch</ListSubheader>} className={classes.root}>
            <ListItem>
                <ListItemIcon>
                    <WifiIcon style={{ fill: checked.indexOf('wifi')  ?  null : theme.customization.secondaryColor[500] }}/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" 
                primary={<Typography style={{ fontSize:16,fontWeight:500 }}>Giới hạn thời gian trả hàng</Typography>} 
                secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}> Cho phép thiết lập hạn mức công nợ để cảnh báo khách hàng.</Typography>} />
                <ListItemSecondaryAction>
                    <IOSSwitch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={checked.indexOf('wifi') !== -1}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
        </List>

    </Card>

  );
};

const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
        //   backgroundColor: '#52d869',
            backgroundColor: theme.customization.secondaryColor[500],
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        // color: '#52d869',
        color:  theme.customization.secondaryColor[500],
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });


export default GeneralSetting;
