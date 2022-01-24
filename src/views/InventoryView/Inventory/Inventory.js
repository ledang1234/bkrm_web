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
import * as xlsx from 'xlsx'
const Inventory = () => {
  const [productList, setProductList] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  const importProductByJSON = (jsonData) => {
    try {
      const res = await storeApi.importProductJSON(store_uuid,jsonData);
      console.log(res.message);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProductsOfBranch(
          store_uuid,
          branch_uuid
        );
        setProductList(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    if (reload) {
      fetchProducts();
      setReload(false);
    }
  }, [reload, store_uuid, branch_uuid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProductsOfBranch(
          store_uuid,
          branch_uuid
        );
        setProductList(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [branch_uuid]);

  // useEffect(() => {
  //   const identifier = setTimeout(async () => {
  //     try {
  //       const response = await productApi.searchProduct(
  //         store_uuid,
  //         searchValue
  //       );
  //       setProductList(response.data);
  //     } catch (error) {}
  //   }, 500);
  //   return () => clearTimeout(identifier);
  // }, [searchValue]);

  const theme = useTheme();
  const classes = useStyles(theme);
  //// 1. Add pop up + noti
  //add
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

  // toolbar
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const header = ['uuid','category','name','bar_code','standard_price','list_price','branch_quantity'];
            const cell = ['A1','B1','C1','D1','E1','F1','G1'];

            for (var i = 0; i < cell.length; i++) {
              xlsx.utils.sheet_add_aoa(worksheet, [[header[i]]], {origin: cell[i]});
            }
           
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

  return (
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Kho hàng
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
      />
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
        />
    </form>

      {/* 3. TABLE */}
      <TableWrapper>
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
          fontSize: 25,
          fontWeight: 500,
          margin: 30,
          color: "#000",
        }}
      >
        Kho hàng
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
