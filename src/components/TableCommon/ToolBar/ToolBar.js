import React from 'react';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import project
import { CardHeader,Tooltip ,TextField, IconButton,InputAdornment,Box} from '@material-ui/core';

// import - icon
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import ViewColumnTwoToneIcon from '@material-ui/icons/ViewColumnTwoTone';
import FilterListTwoToneIcon from '@material-ui/icons/FilterListTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import barcodeIcon from "../../../assets/img/icon/barcode_grey.png";
import grey from '@material-ui/core/colors/grey';


// import third party
import XLSX from 'xlsx';


//--thu vien nay bij loi font
// import jsPDF from 'jspdf'
// import 'jspdf-autotable'

const useStyles = makeStyles((theme) =>
createStyles({
    icon: {
        color:theme.customization.mode === 'Light' ?grey[700] :grey[50]
    },
    toolbar:{
        justifyContent:"left",
    },
    search:{
      borderRadius:theme.customization.borderRadius,
      height:40,
      marginLeft:10,
      marginTop:10,
      //
      width:260,
      backgroundColor:theme.customization.mode === 'Light' ?grey[50] :grey[700]
    },
    actions:{
        marginTop:10
    }
}));


const exportExcel = (dataTable,tableType)=>{
 
    const newData= dataTable;
    const workSheet=XLSX.utils.json_to_sheet(newData)
    const workBook=XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook,workSheet,tableType)
    //Buffer
    //let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    //Binary string
    XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    //Download
    XLSX.writeFile(workBook,`${tableType}.xlsx`)
}

 

const ToolBar = (props) => {
    const {dataTable,tableType,handlePrint,textSearch,handleToggleFilter} = props;
    const theme = useTheme();
    const classes = useStyles(theme);


    return (
        <CardHeader
          avatar={
            <TextField  variant="outlined"  placeholder={textSearch}/*placeholder='Tìm kiếm ...'*/
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon className={classes.icon}/>
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
                className:classes.search
              }}
            />    
          }
          action={
        <Box  className={classes.actions}>
             <Tooltip title="Xuất excel">
                <IconButton aria-label="filter list" onClick={() => { exportExcel(dataTable,tableType) }}>
                    <GetAppTwoToneIcon className={classes.icon}/>
                </IconButton>
             </Tooltip>
             
             <Tooltip title="In">
                <IconButton aria-label="filter list" onClick={handlePrint}>
                    <PrintTwoToneIcon className={classes.icon} />
                </IconButton>
             </Tooltip>
                
            {/* {props.children} */}

             <Tooltip title="Chọn cột">
                <IconButton aria-label="filter list">
                    <ViewColumnTwoToneIcon className={classes.icon}/>
                </IconButton>
             </Tooltip>

             <Tooltip title="Lọc">
                <IconButton aria-label="filter list" onClick={handleToggleFilter}>
                    <FilterListTwoToneIcon className={classes.icon} />
                </IconButton>
             </Tooltip>  
        </Box>
       
          }
        />
     
    )
}

export default ToolBar


const studentData = [
    {
        id: 1,
        name: "Quần dài",
        category:"Thực phẩm",
        price:220,
        import_price: 130,
    },
    {
        id: 2,
        name: "Quần đùi",
        category:"Bánh kẹo",
        price:220,
        import_price: 130,
    },
    {
        id: 3,
        name: "Áo dài",
        category:"Đồ dùng",
        price:250,
        import_price: 120,
    },
    {
        id: 4,
        name: "Bánh",
        category:"Quần áo",
        price:520,
        import_price: 102,

    },
    {
        id: 5,
        name: "Kẹo",
        category:"Quần áo",
        price:220,
        import_price: 100,

    },
    {
        id: 6,
        name: "Khăn giấy",
        category:"Quần áo",
        price:200,
        import_price: 100,
    },
    {
        id: 7,
        name: "Quần dài",
        category:"Quần áo",
        price:200,
        import_price: 100,
        
    },
    {
        id: 8,
        name: "Túi xách",
        category:"Quần áo",
        price:150,
        import_price: 350
    },
    {
        id: 9,
        name: "Laptop",
        category:"Quần áo",
        price:203,
        import_price: 152
    },
    {
        id: 10,
        name: "Máy tính",
        category:"Quần áo",
        price:203,
        import_price: 152
    },
    {
        id: 11,
        name: "Máy tính cầm ta",
        category:"Quần áo",
        price:223,
        import_price: 152
    },
    {
        id: 12,
        name: "Tập vở",
        category:"Quần áo",
        price:203,
        import_price: 154
    },
    {
        id: 13,
        name: "Máy tính",
        category:"Quần áo",
        price:1223,
        import_price: 354
    }

]

