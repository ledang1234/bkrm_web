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

const StoreSetting = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [checked, setChecked] = React.useState(['wifi']);



  return (
    <Card className={classes.root}>
       <Typography className={classes.headerTitle} variant="h3">
          Cửa hàng
        </Typography>
        
       

    </Card>

  );
};


export default StoreSetting;
