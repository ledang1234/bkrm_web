import React, {useState, useEffect,useRef} from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import {Typography,Card, Button,Divider ,Grid,ButtonBase,Avatar,Tooltip,TableBody} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useReactToPrint } from "react-to-print";
//import api 
import customerApi from '../../../api/customerApi'
import { useSelector } from 'react-redux'

//import constant
import * as HeadCells from '../../../assets/constant/tableHead'
import *  as TableType from '../../../assets/constant/tableType'

////import project
//riêng
import AddCustomer from './AddCustomer/AddCustomer'
import CustomerFilter from './CustomerTool/CustomerFilter'

import CustomerTableRow from './CustomerTableRow/CustomerTableRow'
//chung
import SnackBar from '../../../components/SnackBar/SnackBar'
import TableHeader  from '../../../components/TableCommon/TableHeader/TableHeader'
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'


const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)
    
    const info = useSelector(state => state.info)
    const store_uuid = info.store.uuid

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


    const [pagingState, setPagingState] = useState({
      page: 0,
      limit: 10,
      total_rows: 0,
    });
  
  
    useEffect(() => {
      setPagingState({...pagingState, page: 0})
    }, [reload, store_uuid])
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const response = await customerApi.getCustomers(store_uuid, {
            page: pagingState.page,
            limit: pagingState.limit
          });
          
          setPagingState({...pagingState, total_rows: response.total_rows})
          setCustomerList(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      loadData();
    }, [pagingState.page, pagingState.limit]);
    return (

    <Card className={classes.root} >
        <Grid 
          container
          direction="row"
          justifyContent="space-between"  
        > 
            {/* 1. ADD POP UP */}
              <Typography className={classes.headerTitle} variant="h5">
                    Khách hàng
              </Typography>

              <Grid className={classes.btngroup1} >
                  <ButtonBase sx={{ borderRadius: '16px' }} 
                      onClick={handleClickOpen}
                  >
                  <Avatar variant="rounded" className={classes.headerAvatar}  >
                      <Tooltip title='Thêm khách hàng'>
                      <AddIcon stroke={1.5} size="1.3rem" />
                      </Tooltip>
                  </Avatar>
              </ButtonBase>
            </Grid>
        </Grid>

        {/* Popup add */}
        <AddCustomer open={open} handleClose={handleClose} />
        {/* Noti */}
        <SnackBar openBar={openBar} handleCloseBar={handleCloseBar} addStatus={addStatus}/>

        
        <Divider  openFilter={openFilter} handleToggleFilter={handleToggleFilter}/>
        
        {/* 2. SEARCH - FILTER - EXPORT*/}
        {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
        <ToolBar  dataTable={customerList} tableType={TableType.CUSTOMER} textSearch={'#, Tên, sđt, ...  '} /*handlePrint={handlePrint}*/ 
        handleToggleFilter={handleToggleFilter}  handlePrint={handlePrint}/>
        <CustomerFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter}/>
        {/* 3. TABLE */}
        <TableWrapper
          pagingState={pagingState}
          setPagingState={setPagingState}
        >
            <TableHeader
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headerData={HeadCells.CustomerHeadCells}
            />
            <TableBody>
              {customerList.map((row, index) => {
                  return (
                    <CustomerTableRow key={row.uuid} row={row}  openRow={openRow}  handleOpenRow={handleOpenRow} />
                  );
              })}
            </TableBody>
        </TableWrapper>
        <div  style={{display:'none'}} >
        <div ref={componentRef}  >
        <ComponentToPrint  customerList={customerList} classes={classes}/>
        </div>
        
      </div>
      </Card>
    )
}

export default Customer

const ComponentToPrint = ({customerList,classes}) =>{
  return (
      <div >
        <Typography style={{flexGrow: 1,textAlign: "center",fontSize:20, fontWeight:500, margin:30, color:'#000'}} >Danh sách khách hàng</Typography>
        <div >
          <TableHeader
                classes={classes}
                headerData={HeadCells.CustomerHeadCells}
              />
              <TableBody >
                {customerList.map((row, index) => {
                  return (
                    <CustomerTableRow
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