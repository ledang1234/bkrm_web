import React, {useState, useEffect,useRef} from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {Typography,Card, Button,Divider ,Grid,ButtonBase,Avatar,Tooltip,TableBody} from '@material-ui/core';
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
import InvoiceFilter from './InvoiceTool/InvoiceFilter'
import InvoiceTableRow from './InvoiceTableRow/InvoiceTableRow'
//chung
import TableHeader  from '../../../components/TableCommon/TableHeader/TableHeader'
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'

import JSONdata from '../../../assets/JsonData/invoice.json'
import orderApi from '../../../api/orderApi'



const Invoice = () => {
    // fetch data here
    const theme = useTheme();
    const classes = useStyles(theme);
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([])
    // api
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid
    const branch_uuid = info.branch.uuid
    const loadData = async () => {
      try {
        const res = await orderApi.getAllOfBranch(store_uuid,branch_uuid);
        console.log(res.data)
        setOrders(res.data.reverse());
      } catch (error) {
        console.log(error)
      }
    }


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


      //3. ToolBar
      //3.2. filter
      // toolbar
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [openFilter, setOpenFilter] = React.useState(false);
    const handleToggleFilter = () => {
      setOpenFilter(!openFilter);
    };
    
    const handleRequestSort = (event, property) => {
      //// (gửi order vs orderBy lên api) -> fetch lại data để sort
      // const isAsc = orderBy === property && order === 'asc';
      // setOrder(isAsc ? 'desc' : 'asc');
      // setOrderBy(property);
    };

    useEffect(() => {
      loadData();
    }, [branch_uuid]);

    return (
      
        <Card className={classes.root} >
          <Grid 
            container
            direction="row"
            justifyContent="space-between"  
          > 
              {/* 1. ADD POP UP */}
                <Typography className={classes.headerTitle} variant="h5">
                    Hoá đơn
                </Typography>

                <Grid className={classes.btngroup1} >
                    <ButtonBase 
                        sx={{ borderRadius: '16px' }} 
                        onClick={()=>{dispatch(customizeAction.setSidebarOpen(false));dispatch(customizeAction.setItemMenuOpen(1));}}
                        component={Link}
                        to='/home/sales/cart' 
                        >
                        <Avatar variant="rounded" className={classes.headerAvatar}  >
                            <Tooltip title="Thêm hoá đơn">
                            <AddIcon stroke={1.5} size="1.3rem" />
                            </Tooltip>
                        </Avatar>
                    </ButtonBase>
            </Grid>
          </Grid>

         
          <Divider />
          
          {/* 2. SEARCH - FILTER - EXPORT*/}
          {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
          <ToolBar  dataTable={orders} tableType={TableType.INVOICE} textSearch={'#, Khách, Người bán,...  '}  /*handlePrint={handlePrint}*/ 
          handleToggleFilter={handleToggleFilter} handlePrint={handlePrint}
          />
          <InvoiceFilter 
            openFilter={openFilter} 
            handleToggleFilter={handleToggleFilter}
            setOrders={setOrders}
          />
          
          {/* 3. TABLE */}
          <TableWrapper>
              <TableHeader
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headerData={HeadCells.InvoiceHeadCells}
              />
              <TableBody>
                {orders.map((row, index) => {
                    return (
                      <InvoiceTableRow key={row.uuid} row={row}  openRow={openRow}  handleOpenRow={handleOpenRow} />
                    );
                })}
              </TableBody>
          </TableWrapper>
          <div  style={{display:'none'}} >
            <div ref={componentRef}  >
            <ComponentToPrint  orders={orders} classes={classes}/>
            </div>
            
          </div>
        </Card>
    )
}

export default Invoice

const ComponentToPrint = ({orders,classes}) =>{
  return (
      <div >
        <Typography style={{flexGrow: 1,textAlign: "center",fontSize:25, fontWeight:500, margin:30, color:'#000'}} >Hoá đơn</Typography>
        <div >
          <TableHeader
                classes={classes}
                headerData={HeadCells.InvoiceHeadCells}
              />
              <TableBody >
                {orders.map((row, index) => {
                  return (
                    <InvoiceTableRow
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