import React from 'react';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';

// import library
import {
  Box, Grid, TableHead, TableBody, Typography, Table, TableCell, TableRow, Collapse, Button, ListItemIcon, ListItemText, IconButton,
} from '@material-ui/core';

// import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';

// import project
import { grey } from '@material-ui/core/colors';
import { StyledMenu, StyledMenuItem } from '../../../../../components/Button/MenuButton';
import { useSelector } from 'react-redux';
import refundApi from '../../../../../api/refundApi';
// dơn trả giá trả có khác ko ???

const useStyles = makeStyles((theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  headerTitle: {
    fontSize: '1.125rem',
  },
  typo: {
    marginBottom: 20,
  },
  background: {
    background: theme.customization.mode === 'Light' ? theme.customization.primaryColor[50] : grey[700],
  },

}));

function InvoiceReturnDetail(props) {
  const { row, openRow } = props.parentProps;
  //  tam thoi
  const currentUser = 'Minh Tri';

  const theme = useTheme();
  const classes = useStyles(theme);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const info = useSelector((state) => state.info);
  const store_uuid = info.store.uuid;
  
  const [refund, setRefund] = React.useState({
    branch: null,
    details: []
  })

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const res = await refundApi.getRefund(store_uuid, row.uuid);
        // console.log(res.data)
        setRefund(res.data);
      } catch (error) {
        setRefund({
          branch: null,
          details: []
        });
      }
    }
    if (openRow === row.uuid) {
      loadData();

    }
  }
  , [props.parentProps.openRow]);

  return (
    <Collapse in={openRow === row.uuid} timeout="auto" unmountOnExit>
      <Box margin={1}>
        <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
          {row.name}
        </Typography>

        <Grid container direction="row" justifyContent="flex-start">
          <Grid item xs={5}>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom component="div">Mã đơn trả </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.refund_code}
                  {' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom component="div">Mã hoá đơn</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">{refund.order?.order_code}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom component="div">Ngày trả </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.created_at}
                  {' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom component="div">Khách hàng</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {refund.customer?.name}
                  {' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom component="div">Người thực hiện</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {refund.created_by_user?.name}
                  {' '}
                </Typography>
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={5}>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom component="div">Tình trạng</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">{`Cần trả ${(row.total_amount - row.paid_amount).toString()}`}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom component="div">Tổng đơn trả</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">{row.total_amount}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom component="div">Chi nhánh thực hiện</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {refund.branch?.name}
                  {' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom component="div">Phương thức trả</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.payment_method}
                  {' '}
                </Typography>
              </Grid>
            </Grid>

          </Grid>

        </Grid>

        <Typography variant="h4" gutterBottom component="div" style={{ marginTop: 30 }}>
          Danh sách sản phẩm
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá trả</TableCell>
              <TableCell align="right">Thành tiền</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {refund.details.map((detail) => (
              <TableRow key={detail.bar_code}>
                <TableCell component="th" scope="row">
                  {detail.bar_code}
                </TableCell>
                <TableCell>{detail.name}</TableCell>
                <TableCell align="right">{detail.quantity}</TableCell>
                <TableCell align="right">
                  {detail.unit_price}
                </TableCell>
               
                <TableCell align="right" style={{ fontWeight: 700 }}>
                  {detail.quantity * detail.unit_price}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={classes.background} style={{ padding: 10, borderRadius: theme.customization.borderRadius, marginTop: 10 }}>
          <Grid container direction="column">

            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2}>
                <Typography variant="h5" gutterBottom component="div">Tổng số lượng</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom component="div">{refund.details?.length}</Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2}>
                <Typography variant="h5" gutterBottom component="div">Tiền hàng trả</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom component="div">
                  {row.total_amount}
                  {' '}
                </Typography>
              </Grid>
            </Grid>
            {/* <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2}>
                <Typography variant="h5" gutterBottom component="div">Phí trả hàng</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom component="div">200</Typography>
              </Grid>
            </Grid> */}

            {/* <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2}>
                <Typography variant="h5" gutterBottom component="div">Tổng đơn trả</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom component="div">100</Typography>
              </Grid>
            </Grid> */}

            <Grid container direction="row" justifyContent="flex-end">
              <Grid item xs={2}>
                <Typography variant="h5" gutterBottom component="div">Đã trả khách</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" gutterBottom component="div">{row.paid_amount}</Typography>
              </Grid>
            </Grid>

          </Grid>
        </Box>

        <Grid container direction="row" justifyContent="flex-end" style={{ marginTop: 20 }}>
          {/* Chỉ có nhân viên thực hiện nhập đơn đó  mới có thể xoá sửa */}
          {currentUser === row.employee
            ? (
              <>
                {' '}
                <Button variant="contained" size="small" style={{ marginLeft: 15 }}>Sửa</Button>
                <Button variant="contained" size="small" style={{ marginLeft: 15 }}>Xoá</Button>
                {' '}

              </>
            )
            : null}

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            style={{ marginLeft: 10 }}
          >
            <MoreVertIcon />
          </IconButton>

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon style={{ marginRight: -15 }}>
                <PrintTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="In đơn trả" />
            </StyledMenuItem>

            <StyledMenuItem>
              <ListItemIcon style={{ marginRight: -15 }}>
                <GetAppTwoToneIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Xuất excel" />
            </StyledMenuItem>
          </StyledMenu>

        </Grid>

      </Box>
    </Collapse>
  );
}

export default InvoiceReturnDetail;
