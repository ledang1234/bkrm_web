import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Box,Grid,TableHead,TableBody,Typography,Table,TableCell,TableRow,Collapse,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';

//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';

//import project 
import {StyledMenu,StyledMenuItem} from '../../../Button/MenuButton'
import { grey} from '@material-ui/core/colors'


// dơn trả giá trả có khác ko ???

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
  background:{
    background: theme.customization.mode === "Light"? theme.customization.primaryColor[50]: grey[700]
  }

}));


const InvoiceReturnDetail = (props) => {
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
                        <Typography variant="h5" gutterBottom component="div">Mã đơn trả </Typography>    
                      </Grid>
                      <Grid item xs={4} >
                        <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                      </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Mã hoá đơn</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">{row.invoid_id}</Typography>
                        </Grid>
                    </Grid>
                  <Grid container direction="row" justifyContent="flex-start">
                      <Grid item xs={5} >
                        <Typography variant="h5" gutterBottom component="div">Ngày trả </Typography>    
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
                            <Typography variant="h5" gutterBottom component="div">Tình trạng</Typography>    
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="body1" gutterBottom component="div">Cần trả 100.000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                            <Typography variant="h5" gutterBottom component="div">Tổng đơn trả</Typography>    
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
                            <Typography variant="h5" gutterBottom component="div">Phương thức trả</Typography>    
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
                     <TableCell align="right">Giá trả</TableCell>
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
                       <TableCell align="right">
                         100
                       </TableCell>
                       <TableCell align="right" style={{fontWeight:700}}>
                         {historyRow.quantity * 100}
                       </TableCell>
                       
                     </TableRow>
                   ))}
                 </TableBody>
               </Table> 
               <Box className={classes.background}  style={{padding:10, borderRadius:theme.customization.borderRadius, marginTop:10}}>
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
                            <Typography variant="h5" gutterBottom component="div">Tiền hàng trả</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">{row.total} </Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Phí trả hàng</Typography>    
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant="body1" gutterBottom component="div">200</Typography>
                        </Grid>
                    </Grid>
   
                    <Grid container direction="row" justifyContent="flex-end">
                        <Grid item xs={2} >
                            <Typography variant="h5" gutterBottom component="div">Tổng đơn trả</Typography>    
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
                      <ListItemText primary="In đơn trả" />
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
    </Collapse>
    )
}

export default InvoiceReturnDetail
