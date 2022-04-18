import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
//import lib
import { Typography, FormControlLabel, Switch, Card, Button, Divider, Grid, ButtonBase, Avatar, Tooltip, TableBody, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useReactToPrint } from "react-to-print";
//import api 
import customerApi from '../../../api/customerApi'
import storeApi from '../../../api/storeApi';
import { useSelector, useDispatch } from 'react-redux'

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
import TableHeader from '../../../components/TableCommon/TableHeader/TableHeader'
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'


import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PartnerMiniTableRow } from "../../../components/MiniTableRow/MiniTableRow"
import ava from '../../../assets/img/product/lyimg.jpeg';
import Pagination from "../../../components/TableCommon/TableWrapper/Pagination"
import { excel_name_customer, excel_data_customer } from "../../../assets/constant/excel"
import CustomerRegisterEmail from '../../../components/Email/CustomerRegisterEmail';
import { statusAction } from '../../../store/slice/statusSlice';
import { removeAccents } from '../../../utils';
import Fuse from 'fuse.js'
import setting from "../../../assets/constant/setting";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload(!reload)

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid
  const dispatch = useDispatch();
  const store_setting = info.store.general_configuration ? JSON.parse(info.store.general_configuration)  : setting;
  const haveCustomerScore = store_setting.customerScore.status

  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));


  //// 1. Add pop up + noti
  //add
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (customerList.length) {
      window.localStorage.setItem(
        "customers",
        JSON.stringify({ 
          store_uuid: store_uuid, 
          data: customerList })
      );
    }
  }, [customerList]);

  // const handleClose = (status) => {
  //   setOpen(false);
  //   setAddStatus(status);
  //   if(status === "Success"){
  //     onReload();
  //     setOpenBar(true);
  //   }else if (status === "Fail"){
  //     setOpenBar(true);
  //   }
  // };

  //status add
  const [addStatus, setAddStatus] = React.useState(null);

  //noti
  const [openBar, setOpenBar] = React.useState(false);
  const handleCloseBar = () => {
    setOpenBar(false)
  };

  //// 2. Table
console.log(info.store.general_configuration)
  //collapse
  const [openRow, setRowOpen] = React.useState(null);
  const handleOpenRow = (row) => {
    if (row !== openRow) { setRowOpen(row); }
    else { setRowOpen(null) }
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
  const [showOnlyDebt, setShowOnlyDebt] = React.useState(true);

  //3.3. loc cot

  const initialQuery = {
    orderBy: 'customers.created_at',
    sort: 'desc',
    searchKey: '',
  };
  const handleRemoveFilter = (initialQuery) => {
    setQuery(initialQuery)
  }


  useEffect(() => {
    if (window.localStorage.getItem("customers")) {
      const customers = JSON.parse(window.localStorage.getItem("customers"));
      if (customers.store_uuid === store_uuid ) {
        setCustomerList(customers.data);
      }
    }
  }, [store_uuid, reload])

  const [query, setQuery] = useState(initialQuery)
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });

  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    setPagingState({ ...pagingState, page: 0 })
    setTotalRows(filterCustomer().length);
  }, [reload, store_uuid, query])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await customerApi.getCustomers(store_uuid, {
          ...query,
          searchKey: '',
        });
        setTotalRows(response.total_rows)
        setCustomerList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid) {
      loadData();
    }
  }, [reload, store_uuid]);
  const getDataExport = async () => {
    try {
      const response = await customerApi.getCustomers(
        store_uuid,
        query,
      );
      return response.data;
    } catch (error) {
      dispatch(statusAction.failedStatus('Không thể lấy dữ liệu'))
      console.log(error);
    }
  }

  const tableRef = React.createRef();

  const importCustomerByJSON  = async (jsonData) => {
    try {
      await customerApi.importCustomerJson(store_uuid,jsonData);
    }catch(error){
    }
  }

  const filterCustomer = () => {
    if (query.searchKey) {
      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['customer_code', 'name', 'phone', 'email']
      }
      const fuse = new Fuse(customerList, options)
      const result = fuse.search(query.searchKey);
      return showOnlyDebt ? result.map(r => r.item).filter(cust => cust.debt > 0) : result.map(r => r.item);
    } 
    
    if (showOnlyDebt) {
      return customerList.filter(cust => cust.debt > 0);
    }
     
    return customerList
    
  }

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

      {/* {open && <AddCustomer open={open} handleClose={handleClose} onReload={onReload} />} */}
      {open && <AddCustomer open={open} handleClose={() => setOpen(false)} onReload={onReload} />}

      {/* Noti */}
      {/* <SnackBar openBar={openBar} handleCloseBar={handleCloseBar} addStatus={addStatus}/> */}


      <Divider openFilter={openFilter} handleToggleFilter={handleToggleFilter} />

      {/* 2. SEARCH - FILTER - EXPORT*/}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={customerList}
        tableType={TableType.CUSTOMER}
        textSearch={'#, Tên, sđt, email,...  '} /*handlePrint={handlePrint}*/
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
        isOnlySearch={true}
        hasImport={true}
        handleRemoveFilter={handleRemoveFilter}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({ ...query, searchKey: value })}
        customizable={false}
        getDataExport={getDataExport}
        excel_data={excel_data_customer}
        excel_name={excel_name_customer}
        importByJSON={importCustomerByJSON}
        
        columnsToKeep={[
          { dbName: "name", displayName: "Tên khách hàng" },
          { dbName: "phone", displayName: "Số điện thoại" },
          { dbName: "email", displayName: "Email" },
          { dbName: "address", displayName: "Địa chỉ" },
          { dbName: "payment_info", displayName: "Thông tin thanh toán" },
          { dbName: "points", displayName: "Tích điểm" },
          { dbName: "total_payment", displayName: "Tổng tiền mua" },
          { dbName: "debt", displayName: "Còn nợ" },
        ]}

        extra={<FormControlLabel
          control={
            <Switch
              checked={showOnlyDebt}
              onChange={(e) => setShowOnlyDebt(e.target.checked)}
              color="primary"
            />
          }
          label="Chỉ hiện khách nợ"
        />}
      />

      <CustomerFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter} />
      {/* 3. TABLE */}
      {!xsScreen ? <TableWrapper
        pagingState={{ ...pagingState, total_rows: totalRows }}
        setPagingState={setPagingState}
        list={customerList}
        tableRef={tableRef}
      >
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={haveCustomerScore ?HeadCells.CustomerHeadCells :HeadCells.CustomerHeadCells.filter(item => !item.id.includes('score'))}
          


        />
        <TableBody>
          {filterCustomer().map((row, index) => {
            return (
              <CustomerTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow} onReload={onReload} />
            );
          })}
        </TableBody>
      </TableWrapper> :
        <>
          <Box style={{ minHeight: '60vh' }}>
            {customerList?.map((row, index) => {
              return (
                <PartnerMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow} onReload={onReload}
                  img={ava} id={row.customer_code} name={row.name} phone={row.phone} score={haveCustomerScore?row.points:null}
                  typePartner={"Khách hàng"} />
              );
            })}
          </Box>
          <Pagination pagingState={{ ...pagingState, total_rows: totalRows}} setPagingState={setPagingState} list={customerList} />

        </>}

      <div style={{ display: 'none' }} >
        <div ref={componentRef}  >
          <ComponentToPrint customerList={customerList} classes={classes} />
        </div>
      </div>
    </Card>
  )
}

export default Customer

const ComponentToPrint = ({ customerList, classes }) => {
  return (
    <div >
      <Typography style={{ flexGrow: 1, textAlign: "center", fontSize: 20, fontWeight: 500, margin: 30, color: '#000' }} >Danh sách khách hàng</Typography>
      <div >
        <TableHeader
          classes={classes}
          headerData={HeadCells.CustomerHeadCells}
        />
        <TableBody >
          {customerList?.map((row, index) => {
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