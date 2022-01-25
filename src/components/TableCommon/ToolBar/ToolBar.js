import React, { useState } from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";

//import project
import {
  CardHeader,
  Tooltip,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Button,
  Typography,
} from "@material-ui/core";

// import - icon
import GetAppTwoToneIcon from "@material-ui/icons/GetAppTwoTone";
import PrintTwoToneIcon from "@material-ui/icons/PrintTwoTone";
import ViewColumnTwoToneIcon from "@material-ui/icons/ViewColumnTwoTone";
import FilterListTwoToneIcon from "@material-ui/icons/FilterListTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import barcodeIcon from "../../../assets/img/icon/barcode_grey.png";
import grey from "@material-ui/core/colors/grey";
import NoteAddTwoToneIcon from "@material-ui/icons/NoteAddTwoTone";
// import third party
import xlsx from "xlsx";
import SimpleModal from "../../Modal/ModalWrapper";

import { Link } from "react-router-dom";

import { applyMiddleware } from "@reduxjs/toolkit";

//--thu vien nay bij loi font
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'

import { useSelector } from "react-redux";
//import api
import productApi from "../../../api/productApi";
import storeApi from "../../../api/storeApi";
const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: theme.customization.mode === "Light" ? grey[700] : grey[50],
    },
    toolbar: {
      justifyContent: "left",
    },
    search: {
      borderRadius: theme.customization.borderRadius,
      height: 40,
      marginLeft: 10,
      marginTop: 10,
      backgroundColor:
        theme.customization.mode === "Light" ? grey[50] : grey[700],
    },
    search: {
      borderRadius: theme.customization.borderRadius,
      height: 40,
      marginLeft: 10,
      marginTop: 10,
      //
      width: 260,
      backgroundColor:
        theme.customization.mode === "Light" ? grey[50] : grey[700],
    },
    actions: {
      marginTop: 10,
    },
  })
);

const exportExcel = (dataTable, tableType, header = null) => {
  const newData = dataTable;
  const workSheet = xlsx.utils.json_to_sheet(newData);
  const workBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workBook, workSheet, tableType);
  //Buffer
  //let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
  //Binary string
  xlsx.write(workBook, { bookType: "xlsx", type: "binary" });
  //Download
  xlsx.writeFile(workBook, `${tableType}.xlsx`);
};

const ToolBar = (props) => {
  const {
    dataTable,
    tableType,
    handlePrint,
    textSearch,
    handleToggleFilter,
    hasImport,
    importProductByJSON,
    excel_head,
    excel_data,
    excel_name,
  } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  const [openImport, setOpenImport] = useState(false);

  // const [json, setJson] = useState(null);

  const readUploadFile = (e, setJsonData) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // const header = ['product_code','bar_code','name','category_id','list_price','standard_price','quantity_per_unit','min_reorder_quantity','max_quantity','urls','description'];
        const cell = [
          "A1",
          "B1",
          "C1",
          "D1",
          "E1",
          "F1",
          "G1",
          "H1",
          "I1",
          "J1",
          "K1",
        ];

        for (var i = 0; i < excel_head.length; i++) {
          xlsx.utils.sheet_add_aoa(worksheet, [[excel_head[i]]], {
            origin: cell[i],
          });
        }
        const json = xlsx.utils.sheet_to_json(worksheet);

        for (var object in json) {
          json[object]["urls"] = json[object]["urls"].split(",");
          json[object]["bar_code"] = json[object]["bar_code"].toString();
        }
        // JSON HERE
        // console.log(json);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handleImport = () => {
    setOpenImport(false);
    importProductByJSON(jsonData);
  };
  const [jsonData, setJsonData] = useState([]);
  return (
    <CardHeader
      avatar={
        <TextField
          variant="outlined"
          placeholder={textSearch} /*placeholder='Tìm kiếm ...'*/
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon className={classes.icon} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  component="img"
                  sx={{ height: 23, width: 23 }}
                  src={barcodeIcon}
                />
              </InputAdornment>
            ),
            className: classes.search,
          }}
        />
      }
      action={
        <Box className={classes.actions}>
          <Tooltip
            title="Nhập excel"
            style={{ display: hasImport ? null : "none" }}
          >
            <IconButton
              aria-label="filter list"
              onClick={() => setOpenImport(true)}
            >
              <NoteAddTwoToneIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xuất excel">
            <IconButton
              aria-label="filter list"
              onClick={() => {
                exportExcel(dataTable, tableType);
              }}
            >
              <GetAppTwoToneIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          <Tooltip title="In">
            <IconButton
              aria-label="filter list"
              onClick={() => {
                handlePrint();
              }}
            >
              <PrintTwoToneIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          {/* {props.children} */}

          <Tooltip title="Chọn cột">
            <IconButton aria-label="filter list">
              <ViewColumnTwoToneIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Lọc">
            <IconButton aria-label="filter list" onClick={handleToggleFilter}>
              <FilterListTwoToneIcon className={classes.icon} />
            </IconButton>
          </Tooltip>

          <SimpleModal
            title={"Nhập hàng từ file excel"}
            open={openImport}
            handleClose={() => setOpenImport(false)}
          >
            <Typography style={{ marginBottom: 25 }}>
              {" "}
              (Tải về file mẫu:{" "}
              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => {
                  exportExcel(excel_data, excel_name);
                }}
              >
                Excel mẫu
              </a>{" "}
              ){" "}
            </Typography>

            <form>
              <label htmlFor="upload">Chọn file: </label>
              <input
                type="file"
                name="upload"
                id="upload"
                onChange={(e) => {
                  const result = readUploadFile(e, setJsonData);
                }}
              />
            </form>

            <Button
              style={{ marginTop: 40 }}
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => {
                handleImport();
              }}
            >
              Nhập hàng
            </Button>
          </SimpleModal>
        </Box>
      }
    />
  );
};

export default ToolBar;

const studentData = [
  {
    id: 1,
    name: "Quần dài",
    category: "Thực phẩm",
    price: 220,
    import_price: 130,
  },
  {
    id: 2,
    name: "Quần đùi",
    category: "Bánh kẹo",
    price: 220,
    import_price: 130,
  },
  {
    id: 3,
    name: "Áo dài",
    category: "Đồ dùng",
    price: 250,
    import_price: 120,
  },
  {
    id: 4,
    name: "Bánh",
    category: "Quần áo",
    price: 520,
    import_price: 102,
  },
  {
    id: 5,
    name: "Kẹo",
    category: "Quần áo",
    price: 220,
    import_price: 100,
  },
  {
    id: 6,
    name: "Khăn giấy",
    category: "Quần áo",
    price: 200,
    import_price: 100,
  },
  {
    id: 7,
    name: "Quần dài",
    category: "Quần áo",
    price: 200,
    import_price: 100,
  },
  {
    id: 8,
    name: "Túi xách",
    category: "Quần áo",
    price: 150,
    import_price: 350,
  },
  {
    id: 9,
    name: "Laptop",
    category: "Quần áo",
    price: 203,
    import_price: 152,
  },
  {
    id: 10,
    name: "Máy tính",
    category: "Quần áo",
    price: 203,
    import_price: 152,
  },
  {
    id: 11,
    name: "Máy tính cầm ta",
    category: "Quần áo",
    price: 223,
    import_price: 152,
  },
  {
    id: 12,
    name: "Tập vở",
    category: "Quần áo",
    price: 203,
    import_price: 154,
  },
  {
    id: 13,
    name: "Máy tính",
    category: "Quần áo",
    price: 1223,
    import_price: 354,
  },
];
