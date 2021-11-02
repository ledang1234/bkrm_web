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
import {StyledMenu,StyledMenuItem} from '../../../Button/MenuButton'
import ImportReturnSummary from '../../../CheckoutComponent/CheckoutSummary/ImportReturnSummary/ImportReturnSummary'
import ListItem from '../../../CheckoutComponent/ListItem/ListItem'
import * as HeadCells from '../../../../assets/constant/tableHead'
import *  as TableType from '../../../../assets/constant/tableType'

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
  }

}));


const InventoryOrderDetail = (props) => {
    const {row,openRow }= props.parentProps;
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCloseReturn = () => {
      setOpen(false);
    };


    return (
        <Collapse in={ openRow === row.id } timeout="auto" unmountOnExit>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>

             <Grid  container direction="row" justifyContent="flex-start">
                <Grid item xs={5}>
                  <Grid container direction="row" justifyContent="flex-start" > 
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Mã đơn nhập</Typography>    
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
                        <Typography variant="h5" gutterBottom component="div">Nhà cung cấp</Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.customer} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5"gutterBottom component="div">Người trả</Typography>    
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
                            <Typography variant="body1" gutterBottom component="div">Cần trả 500.000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Tổng đơn nhập</Typography>    
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
                     <TableCell align="right">Giá nhập</TableCell>
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
               <Box  className={classes.background}style={{padding:10, borderRadius:theme.customization.borderRadius, marginTop:10}}>
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
                            <Typography variant="h5" gutterBottom component="div">Tổng số mặt hàng</Typography>    
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
                            <Typography variant="h5" gutterBottom component="div">Tổng đơn nhập</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">100</Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Đã trả NCC</Typography>    
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
                      <ListItemText primary="In đơn nhập" />
                    </StyledMenuItem>

                    <StyledMenuItem>
                      <ListItemIcon style={{marginRight:-15}}>
                        <GetAppTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Xuất excel" />
                    </StyledMenuItem>
                  </StyledMenu>
                  
              </Grid>

              <Dialog fullWidth={true} maxWidth='lg' open={open} onClose={handleCloseReturn} aria-labelledby="form-dialog-title">
                <Grid  container direction="row" justifyContent="space-between"  alignItems="center" >
                    <Typography variant="h3" style={{paddingTop:20,marginBottom:-20, marginLeft:25}}>Trả hàng nhập</Typography>
                  
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseReturn}>
                      <CloseIcon />
                    </IconButton>
            
                </Grid>



                {/* RETURN POP ƯP */}
                
                <DialogContent style={{marginTop:25}}>
                  <Grid container direction="row" justifyContent="space-between"  alignItems="center" spacing={2} >
                      <Grid item xs={12} sm={8}  >
                          <Card className={classes.card}>
                              <Box style={{padding:30, minHeight:'80vh'}} >
                                {/* JSON data attribute phải giongso table head id */}
                                  <ListItem headCells={HeadCells.ImportReturnHeadCells}  cartData={row.list} tableType={TableType.IMPORT_RETURN}/>
                              </Box>
                          </Card>
                      </Grid>

                      <Grid item xs={12} sm={4} className={classes.card} >
                          <Card className={classes.card}>
                              <ImportReturnSummary  data={row}/>
                          </Card>
                      </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
                
             </Box>
           </Collapse>
    )
}

export default InventoryOrderDetail

const headCells = [
  { id: 'stt', numeric: false, disablePadding: true, label: 'Stt' },
  { id: 'id', numeric: false, disablePadding: true, label: '#' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Tên' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Đơn giá' },
  { id: 'quantity', numeric: true, disablePadding: true, label: 'Số lượng' },
  { id: 'protein1', numeric: true, disablePadding: true, label: 'Thành tiền' },]
;
