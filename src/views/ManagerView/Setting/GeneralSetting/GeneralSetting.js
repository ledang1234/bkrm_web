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

  const [checked, setChecked] = React.useState({
    inventory:{status:true},
    recommendedProduct:{status:true},
    variation:{status:true},
    expiryDate:{status:true},

    customerScore:{status:true},
    email:{status:true},
    notifyDebt:{status:true},

    returnLimit:{status:true}
    
  });

  const handleToggle = (event) => {
    const {name,checked} = event.target;
    setChecked((prevState) => {
      return {
        ...prevState,
        [name]:{
          ...prevState[name],
          status:checked
        },
      };
    });
  };


  return (
    <Card className={classes.root}>
       <Typography className={classes.headerTitle} variant="h3">
          Cài đặt chung
        </Typography>
        {/* 1 */}
        <List subheader={<ListSubheader>Hàng hoá</ListSubheader>} className={classes.root}>
            <SettingItem statusChecked={checked.inventory.status} actionToggle={handleToggle} title="Quản lý tồn kho" subTitle="Quản lý sản phẩm theo số lượng tồn kho" >
                <WifiIcon style={{ fill: checked.inventory.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.recommendedProduct.status} actionToggle={handleToggle} title="Tự động gợi ý thông tin hàng hoá" subTitle="Cho phép tự động gợi ý tên, mã, mô tả, hình ảnh hàng hóa khi thêm mới" >
                <WifiIcon style={{ fill: checked.recommendedProduct.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.variation.status} actionToggle={handleToggle} title="Hàng hoá có thuộc tính" subTitle="Quản lý sản phẩm có thuộc tính (size, màu,...)" >
                <WifiIcon style={{ fill: checked.variation.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.expiryDate.status} actionToggle={handleToggle} title="Quản lý tồn kho theo Lô/Date" subTitle="..." >
                <WifiIcon style={{ fill: checked.expiryDate.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>
    
      </List>
      {/* 2 */}
      <List subheader={<ListSubheader>Khách hàng</ListSubheader>} className={classes.root}>
            <SettingItem statusChecked={checked.customerScore.status} actionToggle={handleToggle} title="Tích điểm" subTitle="Tích điểm thưởng cho khách hàng khi mua hàng, sử dụng điểm thưởng để chia nhóm khách hàng." >
                <WifiIcon style={{ fill: checked.customerScore.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.notifyDebt.status} actionToggle={handleToggle} title="Cảnh báo công nợ khách hàng" subTitle="Cho phép thiết lập hạn mức công nợ để cảnh báo khách hàng." >
                <WifiIcon style={{ fill: checked.notifyDebt.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>
        </List>
        <List subheader={<ListSubheader>Giao dịch</ListSubheader>} className={classes.root}>
            <SettingItem statusChecked={checked.returnLimit.status} actionToggle={handleToggle} title="Giới hạn thời gian trả hàng" subTitle="Không cho phép trả hàng khi vuợt quá thời gian giới hạn" >
                <WifiIcon style={{ fill: checked.returnLimit.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.returnLimit.status} actionToggle={handleToggle} title="Khuyến mãi" subTitle="..." >
                <WifiIcon style={{ fill: checked.returnLimit.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.returnLimit.status} actionToggle={handleToggle} title="Voucher" subTitle="..." >
                <WifiIcon style={{ fill: checked.returnLimit.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.returnLimit.status} actionToggle={handleToggle} title="Giao hàng" subTitle="..." >
                <WifiIcon style={{ fill: checked.returnLimit.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

            <SettingItem statusChecked={checked.returnLimit.status} actionToggle={handleToggle} title="Thu khác khi bán hàng" subTitle="..." >
                <WifiIcon style={{ fill: checked.returnLimit.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>

        </List> 

        <List subheader={<ListSubheader>Tự động</ListSubheader>} className={classes.root}>

            <SettingItem statusChecked={checked.email.status} actionToggle={handleToggle} title="Gửi SMS - Email - Zalo" subTitle="Cho phép sử dụng tính năng SMS – Email Marketing - Tin nhắn Zalo." >
                <WifiIcon style={{ fill: checked.email.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>
            {/*  */}
            <SettingItem statusChecked={checked.email.status} actionToggle={handleToggle} title="Gợi ý tạo đơn đặt hàng NCC" subTitle="Tự động gợi ý tạo đơn đặt hàng nhà cung cấp khi sản phẩm sắp hết" >
                <WifiIcon style={{ fill: checked.email.status ?  theme.customization.secondaryColor[500]:null }}/>
            </SettingItem>
        </List> 

    </Card>

  );
};

const SettingItem = ({statusChecked,actionToggle, title, subTitle}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
    <ListItem>
        <ListItemIcon>
            <WifiIcon style={{ fill: statusChecked ?  theme.customization.secondaryColor[500]:null }}/>
        </ListItemIcon>
        <ListItemText
        primary={<Typography style={{ fontSize:16,fontWeight:500 }}>{title}</Typography>} 
        secondary={<Typography style={{ fontSize:13 , color:'#9f9f9f', marginTop:2}}>{subTitle}</Typography>} />
        <ListItemSecondaryAction>
            <IOSSwitch
                edge="end"
                name="inventory"
                onChange={actionToggle}
                checked={statusChecked}
            />
        </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </>
  )
}

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
