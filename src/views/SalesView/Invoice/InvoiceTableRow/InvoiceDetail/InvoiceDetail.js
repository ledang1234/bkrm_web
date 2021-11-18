import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Dialog,Card,DialogContent,Box,Grid,TableHead,TableBody,Typography,Table,TableCell,TableRow,Collapse,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';
//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import CloseIcon from '@material-ui/icons/Close';

//import project 
import {StyledMenu,StyledMenuItem} from '../../../../../components/Button/MenuButton'
import InvoiceReturnPopUp from '../../../../../components/PopUpReturn/InvoiceReturnPopUp/InvoiceReturnPopUp';


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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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

const InvoiceDetail = (props) => {
    const {row,openRow }= props.parentProps;
    //  tam thoi
    const currentUser = "Phuong Gia Le";

    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCloseReturn = () => {
      setOpen(false);
    };

    

    return (
        // <Collapse in={ openRow === row.id } timeout="auto" unmountOnExit>
        <Collapse in={true } timeout="auto" unmountOnExit>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>

             <Grid  container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Grid container direction="row" justifyContent="flex-start" > 
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Mã hoá đơn </Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Ngày bán </Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.date} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Khách hàng</Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.customer} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5"gutterBottom component="div">Người bán</Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.employee} </Typography>
                      </Grid>
                  </Grid>
                     
                  </Grid>
                    <Grid item xs={5}>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Trạng thái</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">Cần thu 500.000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Tổng hoá đơn</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.total}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Chi nhánh thực hiện</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.branch} </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Phương thức thanh toán</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.payment} </Typography>
                        </Grid>
                    </Grid>
                    
                  </Grid>

          
               
               </Grid>
 
               <Typography variant="h4" gutterBottom component="div" style={{marginTop:30}}>
                 Danh sách sản phẩm
               </Typography>
               <Table size="small" aria-label="purchases">
                 <TableHead>
                   <TableRow>
                     <TableCell>#</TableCell>
                     <TableCell>Sản phẩm</TableCell>
                     <TableCell align="right">Số lượng</TableCell>
                     <TableCell align="right">Giá bán</TableCell>
                     <TableCell align="right">Thành tiền</TableCell>
 
                   </TableRow>
                 </TableHead>
                 <TableBody>
    
                    {row.list.map((historyRow) => (
                     <TableRow key={historyRow.product_id}>
                       <TableCell component="th" scope="row">
                         {historyRow.product_id}
                       </TableCell>
                       <TableCell>{historyRow.name}</TableCell>
                       <TableCell align="right">{historyRow.quantity}</TableCell>
                       <TableCell align="right">
                         {historyRow.price}
                       </TableCell>
                       <TableCell align="right" style={{fontWeight:700}}>
                         {historyRow.quantity * historyRow.price}
                       </TableCell>
                       
                     </TableRow>
                   ))}
                 </TableBody>
               </Table> 
               <Box  className={classes.background}  style={{padding:10, borderRadius:theme.customization.borderRadius, marginTop:10}}>
               <Grid container direction="column" >
                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Tổng số lượng</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">4 </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Tiền hàng</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">{row.total} </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Giảm giá</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">200</Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Tổng hoá đơn</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">100</Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Khách đã trả</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">100</Typography>
                        </Grid>
                    </Grid>
                    
              </Grid>
            </Box>

            <Grid container direction="row" justifyContent="flex-end" style={{marginTop:20}}> 
                    {/* Chỉ có nhân viên thực hiện nhập đơn đó  mới có thể xoá sửa */}
                    {currentUser === row.employee ? 
                    <> <Button variant="contained" size="small" style={{marginLeft:15}}>Sửa</Button>
                      <Button variant="contained" size="small" style={{marginLeft:15}}>Xoá</Button> </>
                    : null
                    }
                  
                  <Button variant="contained" size="small" style={{marginLeft:15}} onClick={handleClickOpen}>Trả hàng</Button>
                  
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    size="small"
                    style={{marginLeft:10}}

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
                      <ListItemIcon style={{marginRight:-15}}>
                        <PrintTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="In hoá đơn" />
                    </StyledMenuItem>

                    <StyledMenuItem>
                      <ListItemIcon style={{marginRight:-15}}>
                        <GetAppTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Xuất excel" />
                    </StyledMenuItem>
                  </StyledMenu>
                  
              </Grid>
      </Box>
      <Dialog fullWidth={true} maxWidth='lg' open={open} onClose={handleCloseReturn} aria-labelledby="form-dialog-title">
      <InvoiceReturnPopUp handleCloseReturn={handleCloseReturn} row={row} classes={classes}/>
      </Dialog>
  </Collapse>
    )
}

export default InvoiceDetail
