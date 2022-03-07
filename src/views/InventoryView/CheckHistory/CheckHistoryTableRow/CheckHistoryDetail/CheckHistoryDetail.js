import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Dialog,Card,DialogContent,Box,Grid,TableHead,TableBody,Typography,Table,TableCell,TableRow,Collapse,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';

//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';


//import project 
import {StyledMenu,StyledMenuItem} from '../../../../../components/Button/MenuButton'
import InventoryReturnPopUp from '../../../../../components/PopUpReturn/InventoryReturnPopUp/InventoryReturnPopUp';

import { grey} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  headerTitle:{
    fontSize: '1.125rem'
  },
  typo:{
    marginBottom:20
  },
  card: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    borderWidth:2,
  },
  background:{
    background: theme.customization.mode === "Light"? theme.customization.primaryColor[50]: grey[700]
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },

}));


const CheckHistoryDetail = (props) => {
    const {row, openRow }= props.parentProps;
  //  tam thoi
    const currentUser = "Minh Tri";

    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };


    return (
      // <Collapse in={ openRow === row.id } timeout="auto" unmountOnExit>
      <Collapse in={openRow === row.uuid} timeout="auto" unmountOnExit>
        <Box margin={1}>
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            className={classes.typo}
          >
            {row.product_name}
          </Typography>

          <Grid container direction="row" justifyContent="flex-start">
            <Grid item xs={5}>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Typography variant="h5" gutterBottom component="div">
                    Mã đơn kiểm
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.inventory_check_code}{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Typography variant="h5" gutterBottom component="div">
                    Ngày kiểm{" "}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.created_at}{" "}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Typography variant="h5" gutterBottom component="div">
                    Tổng tồn kho
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.tongtonkho}
                  </Typography>
                </Grid>
              </Grid> */}
              {/* <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Typography variant="h5" gutterBottom component="div">
                    SL thực tế
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.details.sum}{" "}
                  </Typography>
                </Grid>
              </Grid> */}
            </Grid>
            <Grid item xs={5}>
              {/* <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom component="div">
                    Trạng thái
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    Không cân bằng
                  </Typography>
                </Grid>
              </Grid> */}
              {/* <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom component="div">
                    Tổng lệch
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.tongSLthucte - row.tongtonkho}
                  </Typography>
                </Grid>
              </Grid> */}
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom component="div">
                    Chi nhánh thực hiện
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.branch_name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom component="div">
                    Người thực hiện
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.user_name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Typography
            variant="h4"
            gutterBottom
            component="div"
            style={{ marginTop: 30 }}
          >
            Danh sách sản phẩm
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Mã vạch</TableCell>
                <TableCell align="right">Tồn kho</TableCell>
                <TableCell align="right">SL thực tế</TableCell>
                <TableCell align="right">Lệch</TableCell>
                <TableCell align="right">Giá trị</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.details?.map((detail) => (
                <TableRow key={detail.product_id}>
                  <TableCell component="th" scope="row">
                    {detail.product_code}
                  </TableCell>
                  <TableCell>{detail.product_name}</TableCell>
                  <TableCell component="th" scope="row">
                    {detail.bar_code}
                  </TableCell>
                  <TableCell align="right">{detail.branch_inventory}</TableCell>
                  <TableCell align="right">
                    {Number(detail.branch_inventory) + Number(detail.quantity)}
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 700 }}>
                    {detail.quantity}
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 700 }}>
                    {detail.quantity * detail.unit_price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            className={classes.background}
            style={{
              padding: 10,
              borderRadius: theme.customization.borderRadius,
              marginTop: 10,
            }}
          >
            <Grid container direction="column">
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item xs={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    Tổng số lượng lệch
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.details
                      ?.map((detail) => detail.quantity )
                      .reduce((total, ele) => total + ele, 0)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item xs={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    Tổng giá trị lệch
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.details
                      ?.map((detail) => detail.quantity * detail.unit_price)
                      .reduce((total, ele) => total + ele, 0)}
                  </Typography>
                </Grid>
              </Grid>

              {/* <Grid container direction="row" justifyContent="flex-end">
                <Grid item xs={2}>
                  <Typography variant="h5" gutterBottom component="div">
                    Tổng lệch
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" gutterBottom component="div">
                    {row.total}{" "}
                  </Typography>
                </Grid>
              </Grid> */}
            </Grid>
          </Box>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            style={{ marginTop: 20 }}
          >
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
                <ListItemText primary="In đơn nhập" />
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

export default CheckHistoryDetail

const headCells = [
  { id: 'stt', numeric: false, disablePadding: true, label: 'Stt' },
  { id: 'id', numeric: false, disablePadding: true, label: '#' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Đơn giá' },
  { id: 'quantity', numeric: true, disablePadding: true, label: 'Số lượng' },
  { id: 'protein1', numeric: true, disablePadding: true, label: 'Thành tiền' },]
;
