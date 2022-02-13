import React from 'react';
import clsx from 'clsx';

import { TableCell, TableRow } from '@material-ui/core';
import useRowStyles from '../../../../components/TableCommon/style/rowStyle';

import InvoiceReturnDetail from './InvoiceReturnDetail/InvoiceReturnDetail';

function InvoiceReturnTableRow(props) {
  const { row, handleOpenRow, openRow } = props;
  const classes = useRowStyles();
  console.log(row);
  return (
    <>
      {/* ROW */}
      <TableRow
        onClick={() => handleOpenRow(row.uuid)}
        key={row.uuid}
        className={clsx(classes.row, (openRow === row.uuid) ? classes.rowClicked : null)}
      >
        <TableCell align="left">{row.refund_code}</TableCell>
        <TableCell align="left" className={classes.fontName}>{row.created_at}</TableCell>
        <TableCell align="left" style={{ minWidth: 100 }} className={classes.fontName}>{row.customer_name}</TableCell>
        <TableCell align="left">{row.branch_name}</TableCell>
        <TableCell align="left">{row.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ'}</TableCell>
        <TableCell align="right" className={classes.fontName}>{row.total_amount}</TableCell>
        {/* <TableCell align="right" ></TableCell>
        <TableCell align="right" ></TableCell> */}
        
      </TableRow>

      {/* DETAIL */}
      <TableRow>
        {/* colspan  => số cột trong collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <InvoiceReturnDetail parentProps={props}/>
        </TableCell>

      </TableRow>
    </>
  );
}

export default InvoiceReturnTableRow;
