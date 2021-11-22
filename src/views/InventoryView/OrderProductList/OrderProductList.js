import React, {useState, useEffect} from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {Typography,Card,Divider ,Grid,ButtonBase,Avatar,Tooltip,TableBody} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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



const OrderProductList = () => {
   // fetch data here
   const orderProductList = JSONdata;


   const theme = useTheme();
   const classes = useStyles(theme);
   const dispatch = useDispatch();


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
           handleToggleFilter={handleToggleFilter}/> 

          <OrderProductListFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter}/>



          {/* 3. TABLE */}
          <TableWrapper>
              <TableHeader
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headerData={HeadCells.OrderListHeadCells}
              />
              <TableBody>
                {orderProductList.map((row, index) => {
                    return (
                      <OrderProductListTableRow key={row.uuid} row={row}  openRow={openRow}  handleOpenRow={handleOpenRow} />
         
                    );
                })}
              </TableBody>
          </TableWrapper>
     
      </Card>
  )
}

export default OrderProductList
