import React, { useEffect, useState } from 'react';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Grid, Avatar, Card, Box, Typography, TextField, InputAdornment, IconButton, Button, Dialog, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
// import project
import { grey } from '@material-ui/core/colors';
import * as Input from '../../../TextField/NumberFormatCustom';

import ava from '../../../../assets/img/product/lyimg.jpeg';

const useStyles = makeStyles((theme) => createStyles({
  marginBox: {
    marginTop: 30,
  },
  marginRow: {
    marginTop: 5,
  },
  hidden: {
    display: 'none',
  },
  ava: {
    width: 30,
    height: 30,
  },
}));
function InvoiceReturnSummary({
  data,
  handlePaidAmountChange,
  handlePaymentMethodChange,
  handleConfirm,
}) {
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
  }, [data]);

  return (

    <Box style={{ padding: 30, minHeight: '75vh' }}>
      <Grid container direction="column" alignItems="flex-start" spacing={3}>
        <Grid container direction="row" justifyContent="space-between">

          <Grid item xs={8} container direction="column" alignItems="flex-start">
            <Typography variant="h5">
              Chi nhánh
            </Typography>
            <Typography variant="body2">
              {/* current branch */}
              {data.branch.name}
            </Typography>

          </Grid>

          <Grid item xs={4} container direction="column" alignItems="flex-end">
            <Typography variant="body2">
              {/* current date */}
              {new Date().toLocaleDateString('es-US')}
            </Typography>
            <Typography variant="body2">
              {/* current date */}
              {new Date().toLocaleTimeString()}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" className={classes.marginBox} style={{ marginBottom: 20 }} justifyContent="space-between" alignItems="center">
          <Grid item xs={8} container direction="row" className={classes.marginBox} alignItems="center">
            <Typography variant="h3" style={{ marginRight: 10 }}>
              Trả hoá đơn
            </Typography>
            <Typography variant="h3" style={{ color: theme.customization.primaryColor[500] }}>
              #
              {data.order_code}
            </Typography>
          </Grid>
          <Grid item xs={4} container direction="row" justifyContent="flex-end" className={classes.marginBox} alignItems="center">
            <Typography variant="h5">
              {data.customer.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="space-between" className={classes.marginBox}>
          <Typography variant="h5">
            {/* Số lượng sản phẩm trả */}
            Tổng số mặt hàng trả
          </Typography>
          <Typography variant="body2">
            {data.details.filter((item) => item.returnQuantity !== 0).length}
          </Typography>
        </Grid>

        <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
          <Typography variant="h5">
            Tổng tiền gốc
          </Typography>
          <Typography variant="body2">
            {data.order_total_amount}
          </Typography>
        </Grid>

        <Grid container direction="row" justifyContent="space-between" className={classes.marginRow}>
          <Typography variant="h5">
            Tổng tiền trả
          </Typography>
          <Typography variant="body2">
            {data.total_amount}
          </Typography>
        </Grid>
        {/*
                <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Phí trả hàng
                    </Typography>
                    <Input.ThousandSeperatedInput id="standard-basic" style={{width:90 }} size="small" inputProps={{style: { textAlign: "right" }}}  />
                </Grid> */}

        {/* <Grid container direction="row" justifyContent="space-between"className={classes.marginRow}>
                    <Typography variant="h5">
                        Tổng đơn trả
                    </Typography>
                    <Typography variant="body2">
                        400.000
                    </Typography>
                </Grid> */}

        <Grid container direction="row" justifyContent="space-between" alignItems="center" className={classes.marginRow}>
          <Typography variant="h5">
            Đã trả khách
          </Typography>
          <Input.ThousandSeperatedInput
            id="standard-basic"
            style={{ width: 90 }}
            size="small"
            inputProps={{ style: { textAlign: 'right' } }}
            onChange={(e) => handlePaidAmountChange(e.target.value)}
          />
        </Grid>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: 40 }}
          onClick={handleConfirm}
        >
          Trả hàng
        </Button>
      </Grid>
    </Box>
  );
}

export default InvoiceReturnSummary;
