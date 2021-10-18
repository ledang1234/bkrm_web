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
  }
})
);


const TableWrapper = (props) => {
    const {title} =props;
    const theme = useTheme();
    const classes = useStyles(theme);

   return ( 
      <Card className={classes.root}>
            <Typography className={classes.headerTitle} variant="h5">
                {title}
            </Typography>
        <Divider/>
        <Grid item xs={12}>
        <Test />
      </Grid>

    </Card>
    )
        

};

export default TableWrapper;

// import React from 'react';

// // material-ui
// import { Typography } from '@material-ui/core';

// // project imports
// import MainCard from './MainCard/MainCard';

// //= =============================|| SAMPLE PAGE ||==============================//

// const SamplePage = () => (
//     <MainCard title="Sample Card">
//         <Typography variant="body2">
//             Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif
//             ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
//             reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
//             qui officiate descent molls anim id est labours.
//         </Typography>
//     </MainCard>
// );

// export default SamplePage;
