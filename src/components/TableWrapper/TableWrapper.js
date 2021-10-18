import React from 'react';

// material-ui
import { Typography,Card,CardContent, CardHeader, Divider ,Grid} from '@material-ui/core';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import project
import TableView from './Test/TableView'
import TableTest from './Test/TableTest'



import Test from './Table/Table'

//= =============================|| SAMPLE PAGE ||==============================//
const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    backgroundColor: theme.palette.background,
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none"
  },
 
  headerTitle:{
    padding: '24px',
    fontSize: '1.125rem'
  },
  table:{
    paddingLeft:20,
    paddingRight:20
  }
})
);


const TableWrapper = (props) => {
    const {title, dataTable, headerData ,tableType} =props;

    const theme = useTheme();
    const classes = useStyles(theme);

   return ( 
      <Card className={classes.root}>
            <Typography className={classes.headerTitle} variant="h5">
                {title}
            </Typography>
        <Divider/>
        <Grid item xs={12}>
        <Test rows={dataTable} headerData={headerData} tableType={tableType}/>
      </Grid>

    </Card>
    )
        

};

export default TableWrapper;







// function createData(name, calories, fat, carbs, protein, history) {
//   return { name, calories, fat, carbs, protein,history };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3, [{ date: '2020-01-05', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Donut', 452, 25.0, 51, 4.9,[{ date: '2020-01-06', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Eclair', 262, 16.0, 24, 6.0,[{ date: '2020-01-07', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, [{ date: '2020-01-08', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Gingerbread', 356, 16.0, 49, 3.9,[{ date: '2020-01-09', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Honeycomb', 408, 3.2, 87, 6.5 ,[{ date: '2020-01-10', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, [{ date: '2020-01-11', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0,[{ date: '2020-01-12', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('KitKat', 518, 26.0, 65, 7.0, [{ date: '2020-01-13', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Lollipop', 392, 0.2, 98, 0.0, [{ date: '2020-01-14', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Marshmallow', 318, 0, 81, 2.0,[{ date: '2020-01-15', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Nougat', 360, 19.0, 9, 37.0, [{ date: '2020-01-16', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Oreo', 437, 18.0, 63, 4.0,[{ date: '2020-01-17', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
// ];

