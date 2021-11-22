import React, {useState, useEffect} from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {Typography,Card, Button,Divider ,Grid,ButtonBase,Avatar,Tooltip,TableBody} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

//import api 
import productApi from '../../../api/productApi'

//import constant
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

////import project
//riêng
import AddCategory from './AddCategory/AddCategory'
import AddInventory from './AddInventory/AddInventory'
import InventoryFilter from './InventoryTool/InventoryFilter'
import InventoryTableRow from './InventoryTableRow/InventoryTableRow'
//chung
import SnackBar from '../../../components/SnackBar/SnackBar'
import TableHeader  from '../../../components/TableCommon/TableHeader/TableHeader'
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'
import { useSelector } from 'react-redux';


const Inventory = () => {
    const [productList, setProductList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)

    // redux
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid
  
    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await productApi.getProducts(store_uuid)
              setProductList(response.data)
              console.log(response.data)
          } catch(err) {
              console.log(err) 
          }
      }
      fetchProducts()  
    }, [reload, store_uuid]);

   

    const theme = useTheme();
    const classes = useStyles(theme);
    //// 1. Add pop up + noti
    //add
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (status) => {
      setOpen(false);
      setAddStatus(status);
      if(status === "Success"){
        onReload();
        setOpenBar(true);
      }else if (status === "Fail"){
        setOpenBar(true);
      }
    };
    //category
    const [openCategory, setOpenCategory] = React.useState(false);
    const handleClickOpenCategory = () => {
      setOpenCategory(true);
    };
    const handleCloseCategory = (status) => { 
      setOpenCategory(false);
      setAddStatus(status);
      if(status === "Success"){
        onReload();
        setOpenBar(true);
      }else if (status === "Fail"){
        setOpenBar(true);
      }
    };

    //status add
    const [addStatus, setAddStatus] = React.useState(null);
    
    //noti
    const [openBar, setOpenBar] = React.useState(false);
    const handleCloseBar = () => {
      setOpenBar(false)
    };

    //// 2. Table
  
    //collapse
    const [openRow, setRowOpen] = React.useState(null);
    const handleOpenRow = (row) => {
        if (row !==  openRow){setRowOpen(row);}
        else{setRowOpen(null)}  
    };

    // header sort 
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    
    const handleRequestSort = (event, property) => {
      //// (gửi order vs orderBy lên api) -> fetch lại data để sort
      // const isAsc = orderBy === property && order === 'asc';
      // setOrder(isAsc ? 'desc' : 'asc');
      // setOrderBy(property);
    };

    //3. ToolBar
    //3.1. search

    //3.2. filter
    const [openFilter, setOpenFilter] = React.useState(false);
    const handleToggleFilter = () => {
      setOpenFilter(!openFilter);
    };

    //3.3. loc cot
    
  
    return (
        <Card className={classes.root} >
          <Grid 
            container
            direction="row"
            justifyContent="space-between"  
          > 
              {/* 1. ADD POP UP */}
              <Typography className={classes.headerTitle} variant="h5">
                Kho hàng
              </Typography>
              <Grid className={classes.btngroup} >
                  <Tooltip title="Xem danh mục">
                    <Button variant="outlined" color="primary"  
                      className={classes.button}
                      onClick={handleClickOpenCategory}
                      >               
                          Danh mục
                      </Button> 
                  </Tooltip> 

                  <ButtonBase sx={{ borderRadius: '16px' }} onClick={handleClickOpen}>
                      <Avatar variant="rounded" className={classes.headerAvatar}  >
                        <Tooltip title="Thêm sản phẩm">
                          <AddIcon stroke={1.5} size="1.3rem" />
                          </Tooltip>
                      </Avatar>
                  </ButtonBase>
              </Grid>
          </Grid>

          {/* Popup add */}
          <AddCategory open={openCategory} handleClose={handleCloseCategory} />
          <AddInventory open={open} handleClose={handleClose} />
          {/* Noti */}
          <SnackBar openBar={openBar} handleCloseBar={handleCloseBar} addStatus={addStatus}/>

          
          <Divider />
          
          {/* 2. SEARCH - FILTER - EXPORT*/}
          {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
          <ToolBar  dataTable={productList} tableType={TableType.INVENTORY} textSearch={'#,mã vạch,tên sp,...  '}/*handlePrint={handlePrint}*/ 
          handleToggleFilter={handleToggleFilter}/>
          <InventoryFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter}/>




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
                      <InventoryTableRow key={row.uuid} row={row}  openRow={openRow}  handleOpenRow={handleOpenRow} />
                    );
                })}
              </TableBody>
          </TableWrapper>
        </Card>
    )
}
export default Inventory





// PRINT làm lại sau

//print
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
// });

{/* <ComponentToPrint dataTable={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} /> */}

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
