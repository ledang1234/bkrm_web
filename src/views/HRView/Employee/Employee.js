import React, { useState, useEffect,useRef } from "react";
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
import employeeApi from "../../../api/employeeApi";
import { useSelector } from "react-redux";

//import constant
import * as HeadCells from "../../../assets/constant/tableHead";
import * as TableType from "../../../assets/constant/tableType";

////import project
//riêng
import AddEmployee from "./AddEmployee/AddEmployee";
import EmployeeFilter from "./EmployeeTool/EmployeeFilter";
import EmployeeTableRow from "./EmployeeTableRow/EmployeeTableRow";
//chung
import SnackBar from "../../../components/SnackBar/SnackBar";
import TableHeader from "../../../components/TableCommon/TableHeader/TableHeader";
import ToolBar from "../../../components/TableCommon/ToolBar/ToolBar";
import TableWrapper from "../../../components/TableCommon/TableWrapper/TableWrapper";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {PartnerMiniTableRow} from "../../../components/MiniTableRow/MiniTableRow"

const Employee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [reload, setReload] = useState(false);

  const onReload = () => {setReload(!reload); console.log('reload called')};
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const theme = useTheme();
  const classes = useStyles(theme);
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs")) ;



  // paging
  const initialQuery = {
    orderBy: 'employees.created_at',
    sort: 'desc',
    searchKey: '',
  };
  const handleRemoveFilter = (initialQuery) => {
    setQuery(initialQuery)
  }
  const [query, setQuery] = useState(initialQuery)
  const [pagingState, setPagingState] = useState({
    page: 0,
    limit: 10,
  });

  const [totalRows, setTotalRows] = useState(0)
  useEffect(() => {
    setPagingState({...pagingState, page: 0})
  }, [reload, store_uuid, query])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await employeeApi.getEmployees(store_uuid, {
          page: pagingState.page,
          limit: pagingState.limit,
          ...query
        });
        
       
        setEmployeeList(response.data);
        setTotalRows( response.total_rows)
      } catch (error) {
        console.log(error);
      }
    };
    if (store_uuid) {

      loadData();
    }
  }, [pagingState.page, pagingState.limit, reload, store_uuid, query]);


  //// 1. Add pop up + noti
  //add
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (status) => {
    setOpen(false);
    setAddStatus(status);
    if (status === "Success") {
      onReload();
      setOpenBar(true);
    } else if (status === "Fail") {
      setOpenBar(true);
    }
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

  return (
    // <TableWrapper title="Nhân viên" dataTable={employeeList} headerData={HeadCells.EmployeeHeadCells} tableType={TableType.EMPLOYEE} reload={onReload}/>
    <Card className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        {/* 1. ADD POP UP */}
        <Typography className={classes.headerTitle} variant="h5">
          Nhân viên
        </Typography>

        <Grid className={classes.btngroup1}>
          <ButtonBase sx={{ borderRadius: "16px" }} onClick={handleClickOpen}>
            <Avatar variant="rounded" className={classes.headerAvatar}>
              <Tooltip title="Thêm nhân viên">
                <AddIcon stroke={1.5} size="1.3rem" />
              </Tooltip>
            </Avatar>
          </ButtonBase>
        </Grid>
      </Grid>

      {/* Popup add */}
      {open && <AddEmployee open={open} handleClose={handleClose} />}
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
        dataTable={employeeList}
        tableType={TableType.EMPLOYEE}
        textSearch={
          "#, Tên, sđt, email, địa chỉ, ...  "
        } /*handlePrint={handlePrint}*/
        handleToggleFilter={handleToggleFilter}
        handlePrint={handlePrint}
        columnsToKeep = {[
          {dbName:"name",displayName:"Tên nhân viên"},
          {dbName:"phone",displayName:"Số điện thoại"},
          {dbName:"email",displayName:"Email"},
          {dbName:"date_of_birth",displayName:"Ngày sinh"},
          {dbName:"id_card_num",displayName:"CMND"},
          {dbName:"salary_type",displayName:"Loại lương"},
          {dbName:"salary",displayName:"Mức lương"},
        ]}

        isOnlySearch={true}
        handleRemoveFilter={handleRemoveFilter}
        searchKey={query.searchKey} setSearchKey={(value) => setQuery({...query, searchKey: value})}
      />

      <EmployeeFilter
        openFilter={openFilter}
        handleToggleFilter={handleToggleFilter}
      />
      {/* 3. TABLE */}
      {!xsScreen? <TableWrapper
        pagingState={{...pagingState, total_rows: totalRows}}
        setPagingState={setPagingState}
      >
        <TableHeader
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.EmployeeHeadCells}
        />
        <TableBody>
          {employeeList.map((row, index) => {
            return (
              <EmployeeTableRow
                key={row.uuid}
                row={row}
                openRow={openRow}
                handleOpenRow={handleOpenRow}
                handleReload={onReload}
              />
            );
          })}
        </TableBody>
      </TableWrapper>:
          employeeList.map((row, index) => {
            return (
             
              <PartnerMiniTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow}  onReload={onReload} 
              img={row.img_url}  id={row.employee_code} name={row.name} phone={row.phone} scrore={100}
              typePartner={"Nhân viên"}  />
            );
          })}


      <div  style={{display:'none'}} >
        <div ref={componentRef}  >
        <ComponentToPrint  employeeList={employeeList} classes={classes}/>
        </div>
        
      </div>
    </Card>
  );
};

export default Employee;
const ComponentToPrint = ({employeeList,classes}) =>{
  return (
      <div >
        <Typography style={{flexGrow: 1,textAlign: "center",fontSize:20, fontWeight:500, margin:30, color:'#000'}} >Danh sách nhân viên</Typography>
        <div >
          <TableHeader
                classes={classes}
                headerData={HeadCells.EmployeeHeadCells}
              />
              <TableBody >
                {employeeList.map((row, index) => {
                  return (
                    <EmployeeTableRow
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