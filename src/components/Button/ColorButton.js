import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import {Typography,Divider,Grid,Paper,Box,Button,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';

export const ColorButtonPink = withStyles((theme) => ({
    root: {
    //  color: theme.palette.getContrastText("#ff007d"),
    color:'#000',
      backgroundColor: "#ff007d",
      textTransform: 'none',
      '&:hover': {
        backgroundColor: lighten("#ff007d", 0.3),
      },
      borderRadius:15
    },
  }))(Button);
  export  const ColorButtonYellow = withStyles((theme) => ({
    root: {
     color: theme.palette.getContrastText("#ffc02b"),
      backgroundColor: "#ffc02b",
      textTransform: 'none',
      '&:hover': {
        backgroundColor: lighten("#ffc02b", 0.3),
      },
      borderRadius:15
    },
  }))(Button);