import React from 'react'
import ApexChart from '../../../components/Chart/Chart'
import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import {Typography,Divider,Grid,Paper,Box,Button,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { grey, blue,purple} from '@material-ui/core/colors'
import clsx from "clsx";
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
    paddingRight:10,
    paddingLeft:20
  },
  header:{
    // padding: '20px',
    paddingTop:20,
    paddingBottom:15
  },
  headerTitle:{
    fontSize: '1.125rem',
  },
  divider:{
      marginBottom:15
  },
  row:{
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  overall:{
    background:'#13d0f2',
  }
}));
const ColorButton = withStyles((theme) => ({
  root: {
  //  color: theme.palette.getContrastText("#ff007d"),
  color:'#000',
    backgroundColor: "#ff007d",
    textTransform: 'none',
    '&:hover': {
      backgroundColor: lighten("#ff007d", 0.3),
    },
    borderRadius:20
  },
}))(Button);
const ColorButton1 = withStyles((theme) => ({
  root: {
   color: theme.palette.getContrastText("#ffc02b"),
    backgroundColor: "#ffc02b",
    textTransform: 'none',
    '&:hover': {
      backgroundColor: lighten("#ffc02b", 0.3),
    },
    borderRadius:20
  },
}))(Button);

const Report = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
      <Card className={classes.root}>
            <div className={classes.row}>
              <Grid 
              container 
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className={classes.header}
              >
                  <Grid item >
                    <Typography className={classes.headerTitle} variant="h5">
                        {/* Thống kê  */}
                        Tong quan
                      </Typography> 
                  </Grid>
                  <Grid item  >
                        <ColorButton variant="contained" size="small" className={classes.row} >
                              Báo cáo
                        </ColorButton>
                         <ColorButton1 variant="contained" size="small" className={classes.row} style={{marginLeft:10}}>
                            <GetAppTwoToneIcon fontSize="small"/>
                              Báo cáo
                        </ColorButton1>

                  </Grid>

              </Grid>
                   
                  
            </div>
            {/* <Divider className={classes.divider}/> */}
        
            <div className={classes.row}>
              <Grid container spacing={3}>
                <Grid item xs={4} >
                  <Paper className={clsx(classes.paper, classes.overall)}>xs=6</Paper>
                </Grid>

                <Grid container item xs={8} spacing={3}>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                  </Grid>
                </Grid>

              </Grid>
            </div>
          {/* <ApexChart /> */}
      </Card>
        
    )
}

export default Report
