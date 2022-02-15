import React, { useEffect } from "react";
import {
  Typography,
  DialogTitle,
  TableBody,
  ListItem,
  TableCell,
  TableRow,
  Divider,
  Badge,
  Dialog,
  IconButton,
  Grid,
  Popover,
  Paper,
  Box,
  TextField,
  Avatar,
  ButtonBase,
  InputAdornment,
  ButtonGroup,
  Button,
  Tooltip,
  Checkbox,
  TableContainer,
} from "@material-ui/core";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import TableHeader from "../../../../components/TableCommon/TableHeader/TableHeader";
import TableWrapper from "../../../../components/TableCommon/TableWrapper/TableWrapper";
// import EmployeeTableRow from '../../Employee/EmployeeTableRow/EmployeeTableRow'
import * as HeadCells from "../../../../assets/constant/tableHead";
import ava from "../../../../assets/img/product/lyimg.jpeg";
import { grey } from "@material-ui/core/colors";

import {
  getComparator,
  stableSort,
} from "../../../../components/TableCommon/util/sortUtil";
import clsx from "clsx";
const useStyles = makeStyles((theme) =>
  createStyles({
    headerTitle: {
      fontSize: "1.125rem",
      flexGrow: 1,
      textAlign: "center",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
const ScheduleDetail = ({ open, handlePopUp, clickSchedule }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  // 2. Table sort
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("stt");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    console.log(clickSchedule);
  }, [clickSchedule]);
  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={handlePopUp}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography
          variant="h2"
          style={{
            marginBottom: 10,
            color: theme.customization.primaryColor[500],
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          {clickSchedule.schedules ? clickSchedule.schedules[0].date : ""}
        </Typography>
        <Typography className={classes.headerTitle} variant="h5">
          {clickSchedule.name}
        </Typography>
        <Typography
          className={classes.headerTitle}
          style={{ color: grey[600] }}
          variant="h5"
        >
          {clickSchedule.start_time} - {clickSchedule.end_time}
        </Typography>
      </DialogTitle>

      <TableWrapper isCart={true}>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.EmployeeScheduleHeadCells}
          isCart={true}
        />
        <TableBody>
          {clickSchedule.schedules?.map((row, index) => {
            return (
              <EmployeeTableRow
                row={row}
                // handleDeleteItemCart={handleDeleteItemCart}
                // handleChangeItemPrice={handleChangeItemPrice}
                // handleChangeItemQuantity={handleChangeItemQuantity}
              />
            );
          })}
        </TableBody>
      </TableWrapper>
    </Dialog>
  );
};
const EmployeeTableRow = ({ row }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <TableRow>
      <TableCell align="left">{row.schedule_id}</TableCell>
      <TableCell align="left" style={{ minWidth: 200 }}>
        <ListItem
          style={{ marginLeft: -30, marginTop: -10, marginBottom: -10 }}
        >
          <Avatar
            alt="Remy Sharp"
            src={row.employee_img_url}
            style={{ marginRight: 15 }}
            className={classes.ava}
          />
          <Typography className={classes.fontName}>
            {row.employee_name}
          </Typography>
        </ListItem>
      </TableCell>

      <TableCell align="left">{row.employee_phone}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={row.status}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </TableCell>
    </TableRow>
  );
};
export default ScheduleDetail;
