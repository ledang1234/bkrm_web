import React from 'react'
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

import useRowStyles from '../../../../components/TableCommon/style/rowStyle'
import clsx from "clsx";
import { grey} from '@material-ui/core/colors'

import {TableCell,TableRow,Avatar,ListItem,Typography} from '@material-ui/core';
import {pink,red,purple,blue,lime,amber,green,cyan,orange,yellow} from '@material-ui/core/colors';


import {FormatedStatus} from '../../../../components/TableCommon/util/format'
import CustomerDetail from './CustomerDetail/CustomerDetail'

// import ava from '../../../../assets/img/product/lyimg.jpeg';
// import ava from '../../../../assets/img/ava/ava6.png';
import ava from '../../../../assets/img/ava/avaa.jpeg';

import { VNDFormat, ThousandFormat } from '../../../../components/TextField/NumberFormatCustom';


const CustomerTableRow = (props) => {
    const { row, handleOpenRow,openRow ,onReload} = props;
    const theme = useTheme()
    const classes = useRowStyles();
    // const avaclasses = useStyles(theme);
    return (
        <>
        {/* ROW */}
            <TableRow
            onClick={() => handleOpenRow(row.uuid)}   
            key={row.uuid}
            className={ clsx(classes.row,(openRow === row.uuid) ? classes.rowClicked : null)}
            >
                <TableCell align="left">{row.customer_code}</TableCell>
                {/* <TableCell align="left">{row.id}</TableCell> */}
                <TableCell align="left" style={{minWidth:100}} >
                    <ListItem  style={{marginLeft:-30, marginTop:-10, marginBottom:-10 }}>
                        <Avatar alt="Remy Sharp" src={ava} style={{marginRight:20}} className={classes.ava} />
                        {/* <Avatar alt="Remy Sharp"  style={{marginRight:20}} className={returnRandomColor(Number(row.phone.charAt(row.phone.length - 1)),avaclasses)}  >  {row.name.split(" ").slice(-1)[0][0]} </Avatar> */}
                        <Typography className={classes.fontName}>{row.name}</Typography>
                    </ListItem>  
                </TableCell>

                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="right" ><ThousandFormat value={row.points} /></TableCell> 
                <TableCell align="center" >
                    <VNDFormat value={row.debt} />  
                </TableCell>
                <TableCell align="center" >
                    <FormatedStatus debt={row.debt} />     
                </TableCell>
            </TableRow>

        {/* DETAIL */}
            <TableRow>
              {/* colspan  => số cột trong collapse */}
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>           
                    <CustomerDetail parentProps={props}/>       
              </TableCell>
       
            </TableRow>
        </>
    )
}

export default CustomerTableRow

// const useStyles = makeStyles((theme) =>
// createStyles({
//   pink: { backgroundColor: pink[500]},
//   red: { backgroundColor: red[500]},
//   purple: { backgroundColor: purple[500]},
//   blue: { backgroundColor: blue[500]},
//   lime: { backgroundColor: lime[500]},
//   amber: { backgroundColor: amber[500]},
//   green: { backgroundColor: green[500]},
//   cyan: { backgroundColor: cyan[500]},
//   orange: { backgroundColor: orange[500]},
//   yellow: { backgroundColor: yellow[500]},
 
// })
// );
// const returnRandomColor = (number,avaclasses) =>{
//     if(number === 0) {return  avaclasses.pink}
//     else if(number === 1) {return  avaclasses.red}
//     else if(number === 2) {return  avaclasses.purple}
//     else if(number === 3) {return  avaclasses.blue}
//     else if(number === 4) {return  avaclasses.lime}
//     else if(number === 5) {return  avaclasses.amber}
//     else if(number === 6) {return  avaclasses.green}
//     else if(number === 7) {return  avaclasses.cyan}
//     else if(number === 8) {return  avaclasses.orange}
//     else if(number === 9) {return  avaclasses.yellow}
// }