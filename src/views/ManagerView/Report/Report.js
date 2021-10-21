import React from 'react'
import ApexChart from '../../../components/Chart/Chart'
import {useTheme, makeStyles,createStyles,withStyles} from "@material-ui/core/styles";
import {Typography,Divider} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { grey, pink, blue} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    // backgroundColor: theme.palette.background,
    background: theme.customization.mode == "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
    // paddingTop:30,
    paddingRight:15,
  },
  headerTitle:{
    padding: '24px',
    fontSize: '1.125rem'
  },
  divider:{
      marginBottom:30
  }
  

})
);

const Report = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        // <div>

        // </div>
        <Card className={classes.root}>
            <Typography className={classes.headerTitle} variant="h5">
                Báo cáo 
              </Typography>
              <Divider className={classes.divider}/>
            <ApexChart />

        </Card>
        
    )
}

export default Report
