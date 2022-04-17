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
import { useDispatch, useSelector } from "react-redux";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {ProductMiniTableRow} from "../../../../components/MiniTableRow/MiniTableRow"
import defaultProduct from "../../../../assets/img/product/default-product.png"


const InventoryTableRow = (props) => {
  const { row, handleOpenRow, openRow ,isManageInventory} = props;
  const classes = useRowStyles();

  return (
    <>
      <TableRow
        onClick={() => handleOpenRow(row.uuid)}
        className={clsx(
          classes.row,
          openRow === row.uuid ? classes.rowClicked : null
        )}
        key={row.uuid}
      >
        <TableCell align="left">
          {row.product_code}
        </TableCell>
        <TableCell align="center" style={{ minWidth: 200 }}>
          <ListItem
            style={{ marginLeft: -30, marginTop: -10, marginBottom: -10 }}
          >
            <Box
              component="img"
              sx={{ height: 50, width: 50, borderRadius: 10, marginRight: 15 }}
              src={JSON.parse(row.img_urls)?.at(0) || defaultProduct}
            />
            <Typography className={classes.fontName}>{row.name}</Typography>
          </ListItem>
        </TableCell>
        {/* <TableCell align="left">{row.bar_code}</TableCell> */}

        <TableCell align="left">{row.category?.name}</TableCell>
        <TableCell align="right">
          <VNDFormat value={row.list_price} />
        </TableCell>
        <TableCell align="right">
          <VNDFormat value={row.standard_price} />
        </TableCell>
        {isManageInventory ?
        <>
        <TableCell align="center">
          <FormatedProductStatus
            quantity={row.branch_quantity}
            lowStock={row.min_reorder_quantity}
          />
        </TableCell> 
        <TableCell align="center" className={classes.fontName} style={{fontWeight:500, color:'#000'}}>
          {row.branch_quantity}
        </TableCell>
          </>
          : null}
      </TableRow>

      {/* DETAIL */}
      <TableRow>
        {/* colspan  => số cột trong collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <InventoryDetail parentProps={props} openRow={openRow} isManageInventory/>
        </TableCell>
      </TableRow>
    </>
  );
};

export default InventoryTableRow;
