import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
// import style
import {
  Typography, Card, Button, Divider, Grid, ButtonBase, Avatar, Tooltip, TableBody,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import useStyles from '../../../components/TableCommon/style/mainViewStyle';
// import lib

// import api

// import constant
import * as HeadCells from '../../../assets/constant/tableHead';
import * as TableType from '../../../assets/constant/tableType';

/// /import project
// riêng
import InvoiceReturnFilter from './InvoiceReturnTool/InvoiceReturnFilter';
import InvoiceReturnTableRow from './InvoiceReturnTableRow/InvoiceReturnTableRow';
// chung
import TableHeader from '../../../components/TableCommon/TableHeader/TableHeader';
import ToolBar from '../../../components/TableCommon/ToolBar/ToolBar';
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper';
import refundApi from '../../../api/refundApi';

function InvoiceReturn() {
  // fetch data here
  const invoiceReturnList = [];
  const [refunds, setRefunds] = useState([]);
  // api
  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  const loadData = async () => {
    try {
      const res = await refundApi.getAllOfStore(store_uuid);
      console.log(res.data);
      setRefunds(res.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const theme = useTheme();
  const classes = useStyles(theme);

  /// / 2. Table

  // collapse
  const [openRow, setRowOpen] = React.useState(null);
  const handleOpenRow = (row) => {
    if (row !== openRow) { setRowOpen(row); } else { setRowOpen(null); }
  };

  // // header sort
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('id');

  const handleRequestSort = (event, property) => {
    /// / (gửi order vs orderBy lên api) -> fetch lại data để sort
    // const isAsc = orderBy === property && order === 'asc';
    // setOrder(isAsc ? 'desc' : 'asc');
    // setOrderBy(property);
  };

  // 3. ToolBar
  // 3.1. search

  // 3.2. filter
  const [openFilter, setOpenFilter] = React.useState(false);
  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  // 3.3. loc cot

  return (

    <Card className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
      >

        <Typography className={classes.headerTitle} variant="h5">
          Đơn trả
        </Typography>
      </Grid>

      <Divider />

      {/* 2. SEARCH - FILTER - EXPORT */}
      {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
      <ToolBar
        dataTable={refunds}
        tableType={TableType.INVOICE_RETURN}
        textSearch="#,#hđ, Khách, Người trả,...  " /* handlePrint={handlePrint} */

        handleToggleFilter={handleToggleFilter}
      />
      <InvoiceReturnFilter openFilter={openFilter} handleToggleFilter={handleToggleFilter} />
      {/* 3. TABLE */}
      <TableWrapper>
        <TableHeader
          classes={classes}
                // order={order}
                // orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headerData={HeadCells.InvoiceReturnHeadCells}
        />
        <TableBody>
          {refunds.map((row, index) => (
            <InvoiceReturnTableRow key={row.uuid} row={row} openRow={openRow} handleOpenRow={handleOpenRow} />
          ))}
        </TableBody>
      </TableWrapper>
    </Card>
  );
}

export default InvoiceReturn;
