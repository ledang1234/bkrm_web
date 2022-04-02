import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {
  Typography,
  Card,
  Divider,
  Grid,
  ButtonBase,
  Avatar,
  Tooltip,
  TableBody,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";

//import api

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
//riêng
import InventoryReturnTableRow from "./InventoryReturnTableRow/InventoryReturnTableRow";
import InventoryReturnFilter from "./InventoryReturnTool/InventoryReturnFilter";

//chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import JSONdata from "../../../assets/JsonData/inventoryReturn.json";
import { useSelector } from "react-redux";
import purchaseReturnApi from "../../../api/purchaseReturnApi";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {BillMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"
import Pagination from "../../../components/TableCommon/TableWrapper/Pagination"

const InventoryReturnOrder = () => {
  const [purchaseReturns, setPurchaseReturns] = useState([]);
  const [openRow, setRowOpen] = React.useState(null);

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;


  const [reload, setReload] = useState(false);

  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });
  const [totalRows, setTotalRows] = useState(0)

  const initialQuery = {
    startDate: '',
    endDate: '',
    minTotalAmount: 0,
    maxTotalAmount: 0,
    status: '',
    paymentMethod: '',
    orderBy: 'purchase_returns.creation_date',
    sort: 'desc',
    searchKey: '',
  };
  const handleRemoveFilter = () => {
    setQuery(initialQuery)
  }
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid, query]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await purchaseReturnApi.getAllOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query
          }
        );
        // setPagingState({ ...pagingState, total_rows: response.total_rows });
        setTotalRows(response.total_rows)
        setPurchaseReturns(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid) {

      loadData();
    }
  }, [pagingState.page, pagingState.limit, branch_uuid, query]);

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
  const tableRef = React.createRef();

  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        <Typography className={classes.headerTitle} variant="h5">
          Đơn trả hàng nhập
        </Typography>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      {/* <ToolBar  dataTable={inventoryReturnList} tableType={TableType.INVENTORY_RETURN} /*handlePrint={handlePrint}*/}
      <ToolBar
        dataTable={purchaseReturns}
        tableType={TableType.INVENTORY_RETURN}
        textSearch={"#, #đn, NCC, Nguoi trả,..."}
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}

        orderByOptions={[
          {value: 'purchase_returns.creation_date', label: 'Ngày trả'},
          {value: 'total_amount', label: 'Tổng tiền trả'},
        ]}
        orderBy={query.orderBy} setOrderBy={(value) => setQuery({...query, orderBy: value})}
        sort={query.sort} setSort={(value) => setQuery({...query, sort:value})}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
        handleRemoveFilter={handleRemoveFilter}

        columnsToKeep = {[
          {dbName:"purchase_return_code",displayName:"Mã trả hàng nhập"},
          {dbName:"purchase_order_code",displayName:"Mã đơn nhập"},
          {dbName:"creation_date",displayName:"Ngày nhập"},
          {dbName:"supplier_name",displayName:"Nhà cung cấp"},
          {dbName:"total_amount",displayName:"Tổng tiền nhập"}, 
          {dbName:"paid_amount",displayName:"Tổng tiền đã thu"}, 
          {dbName:"branch_name",displayName:"Chi nhánh thực hiện"},
          {dbName:"payment_method",displayName:"Phương thức thanh toán"}
        ]}
      />

      <InventoryReturnFilter
        openFilter={openFilter}
        setQuery={setQuery}
        query={query}
        handleToggleFilter={handleToggleFilter}
        setPurchaseReturns={setPurchaseReturns}
      />

      {/* 3. TABLE */}
      {!xsScreen? <TableWrapper  pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState}
       list={purchaseReturns}
       tableRef={tableRef}
      >
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InventoryReturnOrderHeadCells}
        />
        <TableBody>
          {purchaseReturns.map((row, index) => {
            return (
              <InventoryReturnTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
              />
            );
          })}
        </TableBody>
      </TableWrapper>:
      <>
       <Box style={{minHeight:'50vh'}}>
      {purchaseReturns.map((row, index) => {
        return (
          // <InventoryReturnTableRow
          //   key={row.uuid}
          //   row={row}
          //   openRow={openRow}
          //   handleOpenRow={handleOpenRow}
          // />
          <BillMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow} 
          totalCost={row.total_amount}  id={row.purchase_return_code} partnerName={row.supplier_name} date={row.creation_date} 
          typeBill={"Đơn trả hàng nhập"}/>

        );
      })}
      </Box>
      <Pagination pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState} list={purchaseReturns}/>

      </>
      }
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint
            purchaseReturns={purchaseReturns}
            classes={classes}
          />
        </div>
      </div>
    </Card>
  );
};

const ComponentToPrint = ({ purchaseReturns, classes }) => {
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
        Danh sách đơn trả hàng nhập
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InventoryReturnOrderHeadCells}
        />
        <TableBody>
          {purchaseReturns.map((row, index) => {
            return <InventoryReturnTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};

export default InventoryReturnOrder;
