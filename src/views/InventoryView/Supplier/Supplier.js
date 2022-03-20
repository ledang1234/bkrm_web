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
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";
//import api
import supplierApi from "../../../api/supplierApi";
import { useSelector } from "react-redux";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
//riêng
import AddSupplier from "./AddSupplier/AddSupplier";
import SupplierFilter from "./SupplierTool/SupplierFilter";
// import InventoryTableRow from './InventoryTableRow/InventoryTableRow'
import SupplierTableRow from "./SupplierTableRow/SupplierTableRow";
//chung
import SnackBar from "../../../components/SnackBar/SnackBar";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {PartnerMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"


const Supplier = () => {
  const [supplerList, setSupplierList] = useState([]);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload(!reload);

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;

  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;


  //// 1. Add pop up + noti
  //add
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (status) => {
    onReload();
    setOpen(false);
  };

  //status add
  const [addStatus, setAddStatus] = React.useState(null);

  //noti
  const [openBar, setOpenBar] = React.useState(false);
  const handleCloseBar = () => {
    setOpenBar(false);
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
  const initialQuery = {
    orderBy: 'suppliers.created_at',
    sort: 'desc',
    searchKey: '',
  };
  const handleRemoveFilter = (initialQuery) => {
    setQuery(initialQuery)
  }
  const [query, setQuery] = useState(initialQuery)
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });

  const [totalRows, setTotalRows] = useState(0)
  useEffect(() => {
    setPagingState({...pagingState, page: 0})
  }, [reload, store_uuid, query])
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await supplierApi.getSuppliers(store_uuid, {
          page: pagingState.page,
          limit: pagingState.limit,
          ...query
        });
        
        setSupplierList(response.data);
        // setPagingState({...pagingState, total_rows: response.total_rows})
        setTotalRows( response.total_rows)
      } catch (error) {
        console.log(error);
      }
    };
    
    if (store_uuid) {

      loadData();
    }
    
  }, [reload,pagingState.page, store_uuid, pagingState.limit, query]);


  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Nhà cung cấp
        </Typography>

        <Grid className={classes.btngroup1}>
          <ButtonBase sx={{ borderRadius: "16px" }} onClick={handleClickOpen}>
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Thêm nhà cung cấp">
                <AddIcon stroke={1.5} size="1.3rem" />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      {/* Popup add */}
      <AddSupplier open={open} handleClose={handleClose} onReload={onReload} />
      {/* Noti */}
      <SnackBar
        openBar={openBar}
        handleCloseBar={handleCloseBar}
        addStatus={addStatus}
      />

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={supplerList}
        tableType={TableType.SUPPLIER}
        textSearch={"#, Tên, sđt, email, ...  "}
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
        columnsToKeep = {[
          {dbName:"name",displayName:"Tên nhà cung cấp"},
          {dbName:"phone",displayName:"Số điện thoại"},
          {dbName:"email",displayName:"Email"},
          {dbName:"address",displayName:"Địa chỉ"},
          {dbName:"company",displayName:"Công ty"},
          {dbName:"payment_info",displayName:"Thông tin thanh toán"},
        ]}
        isOnlySearch={true}
        handleRemoveFilter={handleRemoveFilter}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
      />
      <SupplierFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
      />

      {/* 3. TABLE */}

      {!xsScreen ?<TableWrapper

        pagingState={{...pagingState, total_rows: totalRows}}


        setPagingState={setPagingState}
      >
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.SupplierHeadCells}
        />
        <TableBody>
          {supplerList.map((row, index) => {
            return (
              <SupplierTableRow
                setReload={onReload}
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
              />
            );
          })}
        </TableBody>
      </TableWrapper>:
      supplerList.map((row, index) => {
        return (
          <PartnerMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  onReload={onReload} 
            id={row.supplier_code} name={row.name} phone={row.phone} 
            typePartner={"Nhà cung cấp"}  />
        );
      })}

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint supplerList={supplerList} classes={classes} />
        </div>
      </div>
    </Card>
  );
};

export default Supplier;

const ComponentToPrint = ({ supplerList, classes }) => {
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
        Danh sách nhà cung cấp
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.SupplierHeadCells}
        />
        <TableBody>
          {supplerList.map((row, index) => {
            return <SupplierTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};
