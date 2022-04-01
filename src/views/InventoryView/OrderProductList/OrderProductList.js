import React, {useState, useEffect,useRef} from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {Typography,Card,Divider ,Grid,ButtonBase,Avatar,Tooltip,TableBody} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useReactToPrint } from "react-to-print";

//import api 

// import redux
import { customizeAction } from "../../../store/slice/customizeSlice";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";


//import constant
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

////import project
import OrderProductListFilter from './OrderProductListTool/OrderProductListFilter'

import OrderProductListTableRow from './OrderProductListTableRow/OrderProductListTableRow'
//chung
import TableHeader  from '../../../components/TableCommon/TableHeader/TableHeader'
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/inventoryOrder.json'

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {BillMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"

import Pagination from "../../../components/TableCommon/TableWrapper/Pagination"

import orderApi from '../../../api/orderApi';



const OrderProductList = () => {
   // fetch data here
   const orderProductList = JSONdata;
  

   const theme = useTheme();
   const classes = useStyles(theme);
   const dispatch = useDispatch();
   const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;
  


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




    // fileter
    const [customerOrders, setCustomerOrders] = useState([])
    const initialQuery = {
      startDate: '',
      endDate: '',
      minTotalAmount: 0,
      maxTotalAmount: 0,
      status: '',
      orderBy: 'customer_orders.created_at',
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
    });
    const [totalRows, setTotalRows] = useState(0)
    const onReload = () => {
      setReload(!reload);
    };
    const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const branch_uuid = info.branch.uuid;

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 });
  }, [reload, store_uuid, branch_uuid, query]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await orderApi.searchCustomerOrder(
          store_uuid,
          branch_uuid,
          {
            page: pagingState.page,
            limit: pagingState.limit,
            ...query
          }
        );
        // setPagingState({ ...pagingState, total_rows: response.total_rows });
        setTotalRows(response.total_rows);
        setCustomerOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid && branch_uuid ) {
      
      loadData();
    }
  }, [pagingState.page, pagingState.limit, branch_uuid, query, reload]);

  const tableRef = React.createRef();


  return (
    <Card className={classes.root} >
          <Grid 
            container
            direction="row"
            justifyContent="space-between"  
          > 
              {/* 1. ADD POP UP */}
                <Typography className={classes.headerTitle} variant="h5">
                    Đơn đặt hàng
                </Typography>

                <Grid className={classes.btngroup1} >
                    <ButtonBase 
                        sx={{ borderRadius: '16px' }} 
                        onClick={()=>{dispatch(customizeAction.setSidebarOpen(false));}}
                        component={Link}
                        to='/home/inventory/order-list/order' 
                        >
                        <Avatar variant="rounded" className={classes.headerAvatar}  >
                            <Tooltip title="Đặt hàng">
                            <AddIcon stroke={1.5} size="1.3rem" />
                            </Tooltip>
                        </Avatar>
                    </ButtonBase>
            </Grid>
          </Grid>
    
          <Divider />

          {/* 2. SEARCH - FILTER - EXPORT*/}
          {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
          {/* <ToolBar  dataTable={inventoryOrderList} tableType={TableType.INVENTORY_ORDER} /*handlePrint={handlePrint}*/ }
          <ToolBar  dataTable={orderProductList} tableType={TableType.ORDER_LIST}  textSearch={'#, NCC, Nguoi đặt,...'}
           handleToggleFilter={handleToggleFilter}  handlePrint={handlePrint}

           orderByOptions={[
            {value: 'customer_orders.created_at', label: 'Ngày tạo'},
            {value: 'total_amount', label: 'Tổng tiền'},
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

          {/* <OrderProductListFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter}/> */}



          {/* 3. TABLE */}
          {!xsScreen?<TableWrapper
           pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState}
           list={customerOrders}
           tableRef={tableRef}

          >
              <TableHeader
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headerData={HeadCells.OrderListHeadCells}
              />
              <TableBody>
                {customerOrders.map((row, index) => {
                    return (
                      <OrderProductListTableRow key={row.id} row={row}  openRow={openRow}  handleOpenRow={handleOpenRow} reload={onReload}/>
         
                    );
                })}
              </TableBody>
          </TableWrapper>:
         <>
         { orderProductList.map((row, index) => {
            return (
              <BillMiniTableRow key={row.id} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  
              //onReload={onReload} 
              totalCost={10000}  id={"OR00001"} partnerName={"THAY THẾ"} date={"22/12/2008"} 
              typeBill={"Đơn đặt hàng nhập"} />
            );
          })}
          <Pagination pagingState={{...pagingState, total_rows: totalRows}} setPagingState={setPagingState}
           list={customerOrders}
           />
    
          </>}
          <div  style={{display:'none'}} >
            <div ref={componentRef}  >
            <ComponentToPrint  orderProductList={orderProductList} classes={classes}/>
            </div>
        
          </div>
     
      </Card>
  )
}

export default OrderProductList

const ComponentToPrint = ({orderProductList,classes}) =>{
  return (
      <div >
        <Typography style={{flexGrow: 1,textAlign: "center",fontSize:20, fontWeight:500, margin:30, color:'#000'}} >Danh sác đơn đặt hàng NCC</Typography>
        <div >
          <TableHeader
                classes={classes}
                headerData={HeadCells.OrderListHeadCells}
              />
              <TableBody >
                {orderProductList.map((row, index) => {
                  return (
                    <OrderProductListTableRow
                      key={row.uuid}
                      row={row}
                    
                    />
                  );
                })}
              </TableBody>
        </div>
  </div>
  )
}