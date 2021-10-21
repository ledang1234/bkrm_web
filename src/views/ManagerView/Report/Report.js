import React from 'react'
import ApexChart from '../../../components/Chart/Chart'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Typography,Divider} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { grey} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
    paddingRight:15,
  },
  headerTitle:{
    padding: '24px',
    fontSize: '1.125rem'
  },
  divider:{
      marginBottom:30
  }
}));

const Report = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
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
