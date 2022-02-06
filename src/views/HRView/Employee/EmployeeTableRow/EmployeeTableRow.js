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
import EmployeeDetail from "./EmployeeDetail/EmployeeDetail";

import ava from "../../../../assets/img/product/lyimg.jpeg";

const EmployeeTableRow = (props) => {
  const { row, handleOpenRow, openRow, handleReload } = props;
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
        <TableCell align="left" style={{ minWidth: 200 }}>
          <ListItem
            style={{ marginLeft: 30, marginTop: -10, marginBottom: -10 }}
          >
            <Avatar
              alt="Remy Sharp"
              src={row.img_url}
              style={{ marginRight: 20 }}
              className={classes.ava}
            />
            <Typography className={classes.fontName}>{row.name}</Typography>
          </ListItem>
        </TableCell>

        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}</TableCell>
      </TableRow>

      {/* DETAIL */}
      <TableRow>
        {/* colspan  => số cột trong collapse */}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <EmployeeDetail parentProps={props} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeeTableRow;
