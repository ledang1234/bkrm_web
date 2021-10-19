import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const history =[{ date: '2020-01-05', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]
const TableDetail = (props) => {
    const {row,labelId ,handleOpenRow,openRow }= props.parentProps;
    return (
        <Collapse in={ openRow === row.name } timeout="auto" unmountOnExit>
             <Box margin={1}>
               <Typography variant="h3" gutterBottom component="div">
                 History
               </Typography>
               <Table size="small" aria-label="purchases">
                 <TableHead>
                   <TableRow>
                     <TableCell>Date</TableCell>
                     <TableCell>Customer</TableCell>
                     <TableCell align="right">Amount</TableCell>
                     <TableCell align="right">Total price ($)</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {/* {row.history.map((historyRow) => ( */}
                    {history.map((historyRow) => (
                     <TableRow key={historyRow.date}>
                       <TableCell component="th" scope="row">
                         {historyRow.date}
                       </TableCell>
                       <TableCell>{historyRow.customerId}</TableCell>
                       <TableCell align="right">{historyRow.amount}</TableCell>
                       <TableCell align="right">
                         {Math.round(historyRow.amount * row.price * 100) / 100}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </Box>
           </Collapse>
        // <div></div>
    )
}

export default TableDetail
