import React from 'react';
import clsx from 'clsx';

import { TableCell, TableRow } from '@material-ui/core';
import useRowStyles from '../../../../components/TableCommon/style/rowStyle';

import { FormatedStatus } from '../../../../components/TableCommon/util/format';
import InvoiceDetail from './InvoiceDetail/InvoiceDetail';

function InvoiceTableRow(props) {
  const { row, handleOpenRow, openRow } = props;
  const classes = useRowStyles();

  return (
    <>
      {/* ROW */}
      <TableRow
        onClick={() => handleOpenRow(row.uuid)}
        key={row.uuid}
        className={clsx(classes.row, (openRow === row.uuid) ? classes.rowClicked : null)}
      >
        <TableCell align="left">{row.order_code}</TableCell>
        <TableCell align="left" className={classes.fontName}>{row.paid_date}</TableCell>
        <TableCell align="left" style={{ minWidth: 150 }} className={classes.fontName}>{row.customer_name}</TableCell>
        <TableCell align="left">{row.branch_name}</TableCell>
        <TableCell align="left">{row.payment_method === 'cash' ? 'Tiền mặt' : 'Thẻ'}</TableCell>
        <TableCell align="right" className={classes.fontName}>{row.total_amount}</TableCell>
        <TableCell align="center">
          <FormatedStatus debt={row.status === 'debt' ? 1 : 0} />
        </TableCell>

      </TableRow>

      {/* DETAIL */}
      <TableRow>
        {/* colspan  => số cột trong collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <InvoiceDetail parentProps={props} />
        </TableCell>

      </TableRow>
    </>
  );
}

export default InvoiceTableRow;
