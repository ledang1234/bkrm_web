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
import Pagination from "@material-ui/lab/Pagination";

//import api
import productApi from "../../../api/productApi";
import storeApi from "../../../api/storeApi";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
//riêng
import Category from "./Category/Category";
import AddInventory from "./AddInventory/AddInventory";
import InventoryTableRow from "./InventoryTableRow/InventoryTableRow";
//chung
import SnackBar from "../../../components/SnackBar/SnackBar";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";
import { useSelector } from "react-redux";

import * as excel from "../../../assets/constant/excel";

import * as xlsx from "xlsx";
import ProductImportPopper from "../../../components/Popper/ProductImportPopper";

const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
    total_rows: 0,
  });

  const importProductByJSON = async (jsonData) => {
    try {
      setOpenProductImportPopper(true);
      setIsLoadingProduct(true);
      const res = await storeApi.importProductJSON(store_uuid, jsonData);
      if (res.status === "error") {
        setIsLoadingProduct(false);
        setProductErrors(res.data);
      } else {
        setIsLoadingProduct(false);
        setOpenProductImportPopper(false);
        setReload(!reload);
      }

      // setOpen(true);
    } catch (err) {
      console.log(err);
      setIsLoadingProduct(false);
      // setOpen(false);
    }
  };

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await productApi.getProductsOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
          }
        );
        setPagingState({ ...pagingState, total_rows: response.total_rows });
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [pagingState.page, pagingState.limit, branch_uuid]);

  const theme = useTheme();
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //category
  const [openCategory, setOpenCategory] = React.useState(false);
  const handleClickOpenCategory = () => {
    setOpenCategory(true);
  };
  const handleCloseCategory = () => {
    setOpenCategory(false);
    console.log("here");
  };

  //status add
  const [addStatus, setAddStatus] = React.useState(null);

  //noti
  const [openBar, setOpenBar] = React.useState(false);
  const handleCloseBar = () => {
    setOpenBar(false);
  };

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

  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  /// import product by file
  const [openProductImportPopper, setOpenProductImportPopper] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [productErrors, setProductErrors] = useState([]);

  return (
    <Card className={classes.root}>
      <ProductImportPopper
        open={openProductImportPopper}
        loading={isLoadingProduct}
        errors={productErrors}
        handleClose={() => setOpenProductImportPopper(false)}
      />
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Sản phẩm
        </Typography>
        <Grid className={classes.btngroup}>
          <Tooltip title="Xem danh mục">
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleClickOpenCategory}
            >
              Danh mục
            </Button>
          </Tooltip>

          <ButtonBase sx={{ borderRadius: "16px" }} onClick={handleClickOpen}>
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Thêm sản phẩm">
                <AddIcon stroke={1.5} size="1.3rem" />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      {/* Popup add */}
      <Category open={openCategory} handleClose={handleCloseCategory} />
      <AddInventory
        open={open}
        handleClose={handleClose}
        setReload={setReload}
      />
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
        dataTable={productList}
        tableType={TableType.INVENTORY}
        handlePrint={handlePrint}
        handleSearchValueChange={setSearchValue}
        hasImport={true}
        importProductByJSON={importProductByJSON}
        excel_head={excel.header_product}
        excel_data={excel.excel_data_product}
        excel_name={excel.excel_name_product}
      />

      {/* 3. TABLE */}
      <TableWrapper pagingState={pagingState} setPagingState={setPagingState}>
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InventoryHeadCells}
        />
        <TableBody>
          {productList.map((row, index) => {
            return (
              <InventoryTableRow
                key={row.uuid}
                row={row}
                setReload={setReload}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
              />
            );
          })}
        </TableBody>
      </TableWrapper>

      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentToPrint productList={productList} classes={classes} />
        </div>
      </div>
    </Card>
  );
};
export default Inventory;

const ComponentToPrint = ({ productList, classes }) => {
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
        Danh sách sản phẩm
      </Typography>
      <div>
        <TableHeader
          classes={classes}
          headerData={HeadCells.InventoryHeadCells}
        />
        <TableBody>
          {productList.map((row, index) => {
            return <InventoryTableRow key={row.uuid} row={row} />;
          })}
        </TableBody>
      </div>
    </div>
  );
};

// PRINT làm lại sau

//print
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
// });

{
  /* <ComponentToPrint dataTable={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} /> */
}

// function ComponentToPrint(props) {
//   const [dataTable, setDataTable] = React.useState([])
//   const [headerData, setHeaderData] = React.useState(props.headerData)
//   const [tableType, setTableType] = React.useState(props.tableType)

//   React.useEffect(() => {
//     setDataTable(props.dataTable)
//   }, [props.dataTable])

//   return (
//     <MyTable rows={dataTable} headerData={headerData} tableType={tableType} />
//   )
// }
