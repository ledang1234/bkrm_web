import React from "react";
import clsx from "clsx";

import { TableCell, TableRow } from "@material-ui/core";
import useRowStyles from "../../../../components/TableCommon/style/rowStyle";

import { FormatedStatus } from "../../../../components/TableCommon/util/format";
import InvoiceDetail from "./InvoiceDetail/InvoiceDetail";
import { VNDFormat } from "../../../../components/TextField/NumberFormatCustom";

function InvoiceTableRow(props) {
  const { row, handleOpenRow, openRow, onReload } = props;
  const classes = useRowStyles();

  return (
    <>
      {/* ROW */}
      <TableRow
        onClick={() => handleOpenRow(row.uuid)}
        key={row.uuid}
        className={clsx(
          classes.row,
          openRow === row.uuid ? classes.rowClicked : null
        )}
      >
        <TableCell align="left">{row.order_code}</TableCell>
        <TableCell align="left" className={classes.fontName}>
          {/* {new Date(row.creation_date).toLocaleString()} */}
          {row.creation_date?.split(" ")[0].split('-').reverse().join('/').concat("\u00a0\u00a0"+ row.creation_date?.split(" ")[1].substr(0, 5)) }

        </TableCell>
        <TableCell
          align="left"
          style={{ minWidth: 150 }}
          className={classes.fontName}
        >
          {row.customer_name}
        </TableCell>
        {/* <TableCell align="left">{row.branch_name}</TableCell> */}
        <TableCell align="left">
          {row.payment_method === "cash" ? "Tiền mặt" : "Thẻ"}
        </TableCell>
        <TableCell align="right" className={classes.fontName}>
          {" "}
          <VNDFormat value={Number(row.total_amount) - Number(row.discount)} />
        </TableCell>
        <TableCell align="center">
          <FormatedStatus debt={Number(row.total_amount) - Number(row.discount) - Number(row.paid_amount) > 0 ? 1 : 0} />
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
