import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import useRowStyles from "../../../../components/TableCommon/style/rowStyle";
import clsx from "clsx";
import { grey } from "@material-ui/core/colors";

import {
  TableCell,
  TableRow,
  Box,
  Avatar,
  ListItem,
  Typography,
  Chip,
} from "@material-ui/core";

import InventoryDetail from "./InventoryDetail/InventoryDetail";
import { FormatedProductStatus } from "../../../../components/TableCommon/util/format";
import icon from "../../../../assets/img/product/img.jpeg";
import { VNDFormat } from "../../../../components/TextField/NumberFormatCustom";

const InventoryTableRow = (props) => {
  const { row, handleOpenRow, openRow } = props;
  const classes = useRowStyles();
  return (
    <>
      <TableRow
        onClick={() => handleOpenRow(row.uuid)}
        className={clsx(
          classes.row,
          openRow === row.uuid ? classes.rowClicked : null
        )}
      >
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left" style={{ minWidth: 200 }}>
          <ListItem
            style={{ marginLeft: -30, marginTop: -10, marginBottom: -10 }}
          >
            <Box
              component="img"
              sx={{ height: 50, width: 50, borderRadius: 10, marginRight: 15 }}
              src={row.img_url}
            />
            <Typography className={classes.fontName}>{row.name}</Typography>
          </ListItem>
        </TableCell>
        <TableCell align="left">{row.category.name}</TableCell>
        <TableCell align="right"><VNDFormat value={row.list_price} /></TableCell>
        <TableCell align="right"><VNDFormat value={row.standard_price} /></TableCell>
        <TableCell align="center">
          <FormatedProductStatus quantity={row.quantity_available} />
        </TableCell>
        <TableCell align="right" className={classes.fontName}>
          {row.quantity_available}
        </TableCell>
      </TableRow>

      {/* DETAIL */}
      <TableRow>
        {/* colspan  => số cột trong collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <InventoryDetail parentProps={props} openRow={openRow} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryTableRow;
