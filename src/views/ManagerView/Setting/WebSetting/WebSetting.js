import React, { useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Card, Grid, ButtonBase, Tooltip } from "@material-ui/core";


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
      flexGrow: 1,
      textAlign: "center",
      marginTop: 10,
      marginLeft: 40,
    },
  
  })
);

const WebSetting = () => {
  const theme = useTheme();
  const classes = useStyles(theme);



  return (
    <Card className={classes.root}>
       <Typography className={classes.headerTitle} variant="h2">
          Trang web
        </Typography>
    </Card>
  );
};

export default WebSetting;
