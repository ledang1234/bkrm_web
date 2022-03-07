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
import InvoiceFilter from "./InvoiceTool/InvoiceFilter";
import InvoiceTableRow from "./InvoiceTableRow/InvoiceTableRow";
//chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import JSONdata from "../../../assets/JsonData/invoice.json";
import orderApi from "../../../api/orderApi";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {BillMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"

const Invoice = () => {
  // fetch data here
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;


  const [orders, setOrders] = useState([]);
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
    total_rows: 0,
  });
  // api
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;


  /// search sort
  const initialQuery = {
    startDate: '',
    endDate: '',
    minDiscount: 0,
    maxDiscount: 0,
    minTotalAmount: 0,
    maxTotalAmount: 0,
    status: '',
    paymentMethod: '',
    orderBy: 'orders.created_at',
    sort: 'desc',
    searchKey: '',
  };

  const handleRemoveFilter = () => {
    setQuery(initialQuery)
  }
  const [query, setQuery] = useState(initialQuery)

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

  //3. ToolBar
  //3.2. filter
  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const [reload, setReload] = useState(false);
  const onReload = () => {
    setReload(!reload);
  };
  const handleRequestSort = (event, property) => {
    //// (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);

    

  };

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid, query]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await orderApi.getAllOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query,
          }
        );
        setPagingState({ ...pagingState, total_rows: response.total_rows });
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid) {
      loadData();
    }
  }, [pagingState.page, pagingState.limit, branch_uuid, query]);

  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Hoá đơn
        </Typography>

        <Grid className={classes.btngroup1}>
          <ButtonBase
            sx={{ borderRadius: "16px" }}
            onClick={() => {
              dispatch(customizeAction.setSidebarOpen(false));
              dispatch(customizeAction.setItemMenuOpen(1));
            }}
            component={Link}
            to="/home/sales/cart"
          >
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Thêm hoá đơn">
                <AddIcon stroke={1.5} size="1.3rem" />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={orders}
        tableType={TableType.INVOICE}
        textSearch={"#, Khách, Người bán,...  "} /*handlePrint={handlePrint}*/
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
        
        orderByOptions={[
          {value: 'orders.created_at', label: 'Ngày mua'},
          {value: 'total_amount', label: 'Tổng tiền mua'},
        ]}
        orderBy={query.orderBy} setOrderBy={(value) => setQuery({...query, orderBy: value})}
        sort={query.sort} setSort={(value) => setQuery({...query, sort:value})}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
        handleRemoveFilter={handleRemoveFilter}

        columnsToKeep = {[
          {dbName:"order_code",displayName:"Mã hoá đơn"},
          {dbName:"customer_name",displayName:"Khách hàng"},
          {dbName:"created_at",displayName:"Ngày bán"},
          {dbName:"total_amount",displayName:"Tổng tiền hoá đơn"},
          {dbName:"paid_amount",displayName:"Tiền khách đã trả"},
          {dbName:"status",displayName:"Trạng thái"},
          {dbName:"payment_method",displayName:"Phương thức thanh toán"},
        ]}
      />
      <InvoiceFilter
        openFilter={openFilter}
        setQuery={setQuery}
        query={query}
        handleToggleFilter={handleToggleFilter}
        setOrders={setOrders}
      />

      {/* 3. TABLE */}
      {!xsScreen?<TableWrapper  pagingState={pagingState} setPagingState={setPagingState}>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InvoiceHeadCells}
        />
        <TableBody>
          {orders.map((row, index) => {
            return (
              <InvoiceTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
                onReload={onReload}
              />
            );
          })}
        </TableBody>
      </TableWrapper>:
          orders.map((row, index) => {
            return (
              // <InvoiceTableRow
              //   key={row.uuid}
              //   row={row}
              //   openRow={openRow}
              //   handleOpenRow={handleOpenRow}
              //   onReload={onReload}
              // />
              <BillMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  onReload={onReload} 
             totalCost={row.total_amount}  id={row.order_code} partnerName={row.customer_name} date={row.paid_date} 
             typeBill={"Hoá đơn"}/>
            );
          })
        }
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint orders={orders} classes={classes} />
        </div>
      </div>
    </Card>
  );
};

export default Invoice;

const ComponentToPrint = ({ orders, classes }) => {
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
        Danh sách hoá đơn
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InvoiceHeadCells}
        />
        <TableBody>
          {orders.map((row, index) => {
            return <InvoiceTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};
