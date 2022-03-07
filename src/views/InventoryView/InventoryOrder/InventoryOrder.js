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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";

// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
import InventoryOrderFilter from "./InventoryOrderTool/InventoryOrderFilter";
import InventoryOrderTableRow from "./InventoryOrderTableRow/InventoryOrderTableRow";
//chung
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import purchaseOrderApi from "../../../api/purchaseOrderApi";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {BillMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"

const InventoryOrder = () => {
  // fetch data here
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;


  //// 2. Table
  //collapse
  const [openRow, setRowOpen] = React.useState(null);
  const handleOpenRow = (row) => {
    console.log(row);
    console.log(openRow);
    if (row !== openRow) {
      setRowOpen(row);
    } else {
      setRowOpen(null);
    }
  };

  const initialQuery = {
    startDate: '',
    endDate: '',
    minDiscount: 0,
    maxDiscount: 0,
    minTotalAmount: 0,
    maxTotalAmount: 0,
    status: '',
    paymentMethod: '',
    orderBy: 'purchase_orders.creation_date',
    sort: 'desc',
    searchKey: '',
  };

  const handleRemoveFilter = () => {
    setQuery(initialQuery)
  }
  const [query, setQuery] = useState(initialQuery)

  const [reload, setReload] = React.useState(false);
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
    total_rows: 0,
  });

  //3.2. filter
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const onReload = () => {
    setReload(!reload);
  };

  const handleRequestSort = (event, property) => {
    //// (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid, query]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await purchaseOrderApi.getAllOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query
          }
        );
        setPagingState({ ...pagingState, total_rows: response.total_rows });
        setPurchaseOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid ) {
      
      loadData();
    }
  }, [pagingState.page, pagingState.limit, branch_uuid, query]);

  const [snackStatus, setSnackStatus] = React.useState({
    style: "error",
    message: "Kiểm kho thất bại",
  });

  useEffect(() => {
    console.log(query)
  }, [query])

  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Đơn nhập hàng
        </Typography>

        <Grid className={classes.btngroup1}>
          <ButtonBase
            sx={{ borderRadius: "16px" }}
            onClick={() => {
              dispatch(customizeAction.setSidebarOpen(false));
              dispatch(customizeAction.setItemMenuOpen(4));
            }}
            component={Link}
            to="/home/inventory/import"
          >
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Nhập hàng">
                <AddIcon stroke={1.5} size="1.3rem" />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      {/* <ToolBar  dataTable={inventoryOrderList} tableType={TableType.INVENTORY_ORDER} /*handlePrint={handlePrint}*/}
      <ToolBar
        dataTable={purchaseOrders}
        tableType={TableType.INVENTORY_ORDER}
        textSearch={"#, NCC, Nguoi nhap,..."}
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}

        orderByOptions={[
          {value: 'purchase_orders.creation_date', label: 'Ngày nhập'},
          {value: 'total_amount', label: 'Tổng tiền nhập'},
        ]}
        orderBy={query.orderBy} setOrderBy={(value) => setQuery({...query, orderBy: value})}
        sort={query.sort} setSort={(value) => setQuery({...query, sort:value})}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
        handleRemoveFilter={handleRemoveFilter}

        columnsToKeep = {[
          {dbName:"purchase_order_code",displayName:"Mã đơn nhập"},
          {dbName:"payment_date",displayName:"Ngày nhập"},
          {dbName:"supplier_name",displayName:"Nhà cung cấp"},
          {dbName:"total_amount",displayName:"Tổng tiền nhập"}, 
          {dbName:"paid_amount",displayName:"Tiền đã trả"}, 
          {dbName:"branch_name",displayName:"Chi nhánh thực hiện"},
          {dbName:"payment_method",displayName:"Phương thức thanh toán"}
        ]}
      />

      <InventoryOrderFilter
        openFilter={openFilter}
        setQuery={setQuery}
        query={query}
        setPurchaseOrders={setPurchaseOrders}
        handleToggleFilter={handleToggleFilter}
      />

      {/* 3. TABLE */}
      {!xsScreen?<TableWrapper pagingState={pagingState} setPagingState={setPagingState}>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InventoryOrderHeadCells}
          pagingState={pagingState}
          setPagingState={setPagingState}
          
        />
        <TableBody>
          {purchaseOrders.map((row, index) => {
            return (
              <InventoryOrderTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
                onReload={onReload}
              />
            );
          })}
        </TableBody>
      </TableWrapper>
      :
      purchaseOrders.map((row, index) => {
        return (
          <BillMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  onReload={onReload} 
          totalCost={row.total_amount}  id={row.purchase_order_code} partnerName={row.supplier_name} date={row.creation_date} />

        );
      })
       
      
      }

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint purchaseOrders={purchaseOrders} classes={classes} />
        </div>
      </div>
    </Card>
  );
};

export default InventoryOrder;

const ComponentToPrint = ({ purchaseOrders, classes }) => {
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
        Danh sách đơn nhập hàng
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InventoryOrderHeadCells}
        />
        <TableBody>
          {purchaseOrders.map((row, index) => {
            return <InventoryOrderTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};
