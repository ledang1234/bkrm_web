import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {
  Typography,
  Card,
  Button,
  Divider,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";

//import api

// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
import CheckHistoryFilter from "./CheckHistoryTool/CheckHistoryFilter";
import CheckHistoryTableRow from "./CheckHistoryTableRow/CheckHistoryTableRow";
//chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import JSONdata from "../../../assets/JsonData/check.json";
import InventoryCheckPopUp from "../../../components/PopupCheck/InventoryCheckPopUp";
import inventoryCheckApi from "../../../api/inventoryCheckApi";
import SnackBarGeneral from "../../../components/SnackBar/SnackBarGeneral";

const CheckHistory = () => {
  // fetch data here
  const checkHistoryList = JSONdata;

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  const [inventoryChecks, setInventoryChecks] = useState([]);

  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
    total_rows: 0,
  });

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [branch_uuid, store_uuid, reload]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await inventoryCheckApi.getAllOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
          }
        );

        setInventoryChecks(response.data);
        setPagingState({ ...pagingState, total_rows: response.total_rows });
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [pagingState.page, pagingState.limit, branch_uuid]);

  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();

  const [addOpen, setAddOpen] = useState(false);

  const openInvetoryCheck = () => {
    setAddOpen(true);
  };

  const closeInvetoryCheck = () => {
    setAddOpen(false);
    setIsClosePopUp(false);
  };

  //// 2. Table
  //collapse
  const [openRow, setRowOpen] = React.useState(null);
  const handleOpenRow = (row) => {
    if (row !== openRow) {
      setRowOpen(row);
    } else {
      setRowOpen(null);
    }
  };

  // header sort
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");

  const handleRequestSort = (event, property) => {
    //// (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  //3. ToolBar
  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //3.1. search

  //3.2. filter
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  //3.3. loc cot

  const [closePopUp, setIsClosePopUp] = useState(false);
  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Kiểm kho thất bại",
  });
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnackBar = (event, reason) => {
    setOpenSnack(false);
  };

  return (
    <Card className={classes.root}>
      <SnackBarGeneral
        handleClose={handleCloseSnackBar}
        open={openSnack}
        status={snackStatus}
      />
      {closePopUp && (
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={addOpen}
          onClose={closeInvetoryCheck}
          aria-labelledby="form-dialog-title"
        >
          <InventoryCheckPopUp
            handleCloseReturn={closeInvetoryCheck}
            classes={classes}
            setReload={() => {
              setReload(!reload);
            }}
            success={(code) => {
              setSnackStatus({
                style: "success",
                message: `Kiểm kho thành công ${code}`,
              });
              setOpenSnack(true);
              setReload(!reload);
            }}
            failure={() => {
              setSnackStatus({
                style: "success",
                message: `Kiểm kho thất bại`,
              });
              setOpenSnack(true);
            }}
          />
        </Dialog>
      )}
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Đơn kiểm kho
        </Typography>

        <Grid className={classes.btngroup1}>
          <ButtonBase
            sx={{ borderRadius: "16px" }}
            onClick={() => {
              openInvetoryCheck();
            }}
          >
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Kiểm kho">
                <AddIcon
                  stroke={1.5}
                  size="1.3rem"
                  onClick={() => setIsClosePopUp(true)}
                />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={checkHistoryList}
        tableType={TableType.CHECK_LIST}
        textSearch={"#, Người kiểm,..."} /*handlePrint={handlePrint}*/
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
      />

      <CheckHistoryFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
      />

      {/* 3. TABLE */}
      <TableWrapper pagingState={pagingState} setPagingState={setPagingState}>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.CheckHistoryHeadCells}
        />
        <TableBody>
          {inventoryChecks.map((row, index) => {
            return (
              <CheckHistoryTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
              />
            );
          })}
        </TableBody>
      </TableWrapper>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint
            checkHistoryList={checkHistoryList}
            classes={classes}
          />
        </div>
      </div>
    </Card>
  );
};

export default CheckHistory;

const ComponentToPrint = ({ checkHistoryList, classes }) => {
  return (
    <div>
      <Typography
        style={{
          flexGrow: 1,
          textAlign: "center",
          fontSize: 20,
          fontWeight: 500,
          margin: 30,
          color: "#000",
        }}
      >
        Danh sách đơn kiểm kho
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.CheckHistoryHeadCells}
        />
        <TableBody>
          {checkHistoryList.map((row, index) => {
            return <CheckHistoryTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};
