import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
import CustomExcel from "./CustomExcel";
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
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useReactToPrint } from "react-to-print";
// import Pagination from "@material-ui/lab/Pagination";

//import api
import productApi from "../../../api/productApi";
import storeApi from "../../../api/storeApi";
import branchApi from "../../../api/branchApi"
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

import { useSelector,useDispatch } from "react-redux";
import openNotification from "../../../components/StatusPopup/StatusPopup";


import * as excel from "../../../assets/constant/excel";

import * as xlsx from "xlsx";
import ProductImportPopper from "../../../components/Popper/ProductImportPopper";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ProductMiniTableRow } from "../../../components/MiniTableRow/MiniTableRow";
import InventoryFilter from "./InventoryTool/InventoryFilter";
import Pagination from "../../../components/TableCommon/TableWrapper/Pagination";
import { infoActions } from "../../../store/slice/infoSlice";

import defaultProduct from "../../../assets/img/product/default-product.png";
import setting from "../../../assets/constant/setting"
import empltyImage from "../../../assets/img/icon/empty-cart.png"
const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;
  const store_setting = info.store.general_configuration? JSON.parse(info.store.general_configuration): setting



  const [openFilter, setOpenFilter] = React.useState(false);
  const dispatch = useDispatch();
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };
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


  const initialQuery = {
    orderBy: "products.created_at",
    sort: "desc",
    searchKey: "",
    minStandardPrice: "",
    maxStandardPrice: "",
    minListPrice: "",
    maxListPrice: "",
    minInventory: "",
    maxInventory: "",
    status: "",
    categoryId: "",
  };
  const handleRemoveFilter = () => {
    setQuery(initialQuery);
  };
  const [query, setQuery] = useState(initialQuery);
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });

  const [totalRows, setTotalRows] = useState(0);
  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, query]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await productApi.getProductsOfBranch(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query,
          }
        );
        setTotalRows(response.total_rows);
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid) {
      loadData();
    }
  }, [pagingState.page, pagingState.limit, branch_uuid, reload, query]);

  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));
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


  // const handleClickRecommend = async () => {
  //   if (store_uuid && branch_uuid) {
  //     try {
  //       const res = await productApi.productOrderRecommend(store_uuid, branch_uuid);
  //       alert(JSON.stringify(res.data, null, 2))
  //     } catch (err) {
  //       console.log(err);
  //       openNotification('error', 'Không thể tạo gợi ý', '')
  //     }
  //   }
  // }

  const tableRef = React.createRef();
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
          {/* <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleClickRecommend}
            >
              Gợi ý đặt hàng
            </Button> */}

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
      {open && (
        <AddInventory
          open={open}
          handleClose={handleClose}
          setReload={() => setReload(!reload)}
        />
      )}
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
        handleToggleFilter={handleToggleFilter}
        hasImport={true}
        importByJSON={importProductByJSON}
        excel_head={excel.header_product}
        excel_data={excel.excel_data_product}
        excel_name={excel.excel_name_product}
        customExcel = {CustomExcel}
        columnsToKeep={[
          { dbName: "product_code", displayName: "Mã sản phẩm" },
          { dbName: "name", displayName: "Sản phẩm" },
          { dbName: "bar_code", displayName: "Mã vạch" },
          { dbName: "list_price", displayName: "Giá bán" },
          { dbName: "standard_price", displayName: "Giá nhập" },
          { dbName: "quantity_available", displayName: "Tồn kho" },
          { dbName: "min_reorder_quantity", displayName: "Điểm đặt hàng lại" },
        ]}
        orderByOptions={
          store_setting?.inventory.status ?
         [
          { value: "products.created_at", label: "Ngày tạo" },
          { value: "products.list_price", label: "Gia ban" },
          { value: "products.standard_price", label: "Gia von" },
          { value: "products.quantity_available", label: "Ton kho" },
        ]:
        [
          { value: "products.created_at", label: "Ngày tạo" },
          { value: "products.list_price", label: "Gia ban" },
          { value: "products.standard_price", label: "Gia von" },
        ]}
        orderBy={query.orderBy}
        setOrderBy={(value) => setQuery({ ...query, orderBy: value })}
        sort={query.sort}
        setSort={(value) => setQuery({ ...query, sort: value })}
        searchKey={query.searchKey}
        setSearchKey={(value) => setQuery({ ...query, searchKey: value })}
        handleRemoveFilter={handleRemoveFilter}
      />

      <InventoryFilter
        openFilter={openFilter}
        setQuery={setQuery}
        query={query}
        setProductList={setProductList}
        handleToggleFilter={handleToggleFilter}
        isManageInventory={store_setting?.inventory.status }
      />

      {/* 3. TABLE */}
      {!xsScreen ? (
        <TableWrapper
          pagingState={{ ...pagingState, total_rows: totalRows }}
          setPagingState={setPagingState}
          list={productList}
          tableRef={tableRef}
        >
          <TableHeader
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headerData={store_setting?.inventory.status ?HeadCells.InventoryHeadCells:
              HeadCells.InventoryHeadCells.filter(item => item.id !== "inventory" &&  item.id !== "quantity")
            }
          />
          <TableBody>
            {productList.map((row, index) => {
              return (
                <InventoryTableRow
                  key={row.uuid}
                  row={row}
                  setReload={() => setReload(!reload)}
                  openRow={openRow}
                  handleOpenRow={handleOpenRow}
                  isManageInventory={store_setting?.inventory.status}
                />
              );
            })}

          </TableBody>
          

        </TableWrapper>
      ) : (
        <>
        <Box style={{minHeight:'50vh'}}>
          {productList.map((row, index) => {
            return (
              // <ProductMiniTableRow
              //   key={row.uuid}
              //   row={row}
              //   setReload={() => setReload(!reload)}
              //   openRow={openRow}
              //   handleOpenRow={handleOpenRow}
              // />
              // <BillMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  onReload={() => setReload(!reload)}
              // totalCost={row.total_amount}  id={row.purchase_order_code} partnerName={row.supplier_name} date={row.creation_date}
              // typeBill={"Sản phẩm"} />
              <ProductMiniTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
                onReload={() => setReload(!reload)}
                img={JSON.parse(row.img_urls ? row.img_urls : '[]')?.at(0) || defaultProduct}
                id={row.product_code}
                name={row.name}
                list_price={row.list_price}
                standard_price={row.standard_price}
                branch_quantity={row.branch_quantity}
                min_reorder_quantity={row.min_reorder_quantity}
                typePartner={"Sản phẩm"}
                isManageInventory={store_setting?.inventory.status}

              />
            );
          })}
           </Box>
          <Pagination
            pagingState={{ ...pagingState, total_rows: totalRows }}
            setPagingState={setPagingState}
            list={productList}
            
          />
        </>
      )}

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
  const info = useSelector((state) => state.info);
  const store_setting = info.store.general_configuration? JSON.parse(info.store.general_configuration): setting

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
          headerData={store_setting?.inventory.status ? HeadCells.InventoryHeadCells:
            HeadCells.InventoryHeadCells.filter(item => item.id !== "inventory" &&  item.id !== "quantity")

          }
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
