import React from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Box,Grid,Collapse,Typography,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';


//import icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';

//import image
import avaUpload from '../../../../assets/img/product/lyimg.jpeg';

//import project 
import {StyledMenu,StyledMenuItem} from '../../../Button/MenuButton'

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
  }

}));

const UploadImage  = () => {
  return (
    <Box
      component="img"
      sx={{
        height: 120,
        width: 120, 
        borderRadius:120,
        marginLeft:15,

      }}
      src={avaUpload}
    />
    
  )
}
const EmployeeDetail = (props) => {
    const {row,openRow }= props.parentProps;

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
                  <Grid item xs={3}>
                      <UploadImage />
                  </Grid>
                <Grid item xs={5}>
                      <Grid container direction="row" justifyContent="flex-start" > 
                        <Grid item xs={5} >
                          <Typography variant="h5" gutterBottom component="div">Mã nhân viên </Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">{row.id} </Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={5} >
                          <Typography variant="h5" gutterBottom component="div">Tên nhân viên </Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">{row.name} </Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Ngày sinh</Typography>    
                          </Grid>
                          <Grid item xs={6} >
                            <Typography variant="body1" gutterBottom component="div">22/12/2008</Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={5} >
                            <Typography variant="h5"gutterBottom component="div">CMND</Typography>    
                          </Grid>
                          <Grid item xs={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.idCard}</Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Số điện thoại</Typography>    
                          </Grid>
                          <Grid item xs={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.phone}</Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Email</Typography>    
                          </Grid>
                          <Grid item xs={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.email} </Typography>
                          </Grid>
                      </Grid>
                      <Grid container direction="row" justifyContent="flex-start">
                          <Grid item xs={5} >
                            <Typography variant="h5" gutterBottom component="div">Địa chỉ</Typography>    
                          </Grid>
                          <Grid item xs={6} >
                            <Typography variant="body1" gutterBottom component="div">{row.address} </Typography>
                          </Grid>
                      </Grid>
                  </Grid>


                <Grid item xs={4}>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                          <Typography variant="h5" gutterBottom component="div">Tên tài khoản</Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">giale1234</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                          <Typography variant="h5" gutterBottom component="div">Chức năng</Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">Nhân viên bán hàng</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                          <Typography variant="h5" gutterBottom component="div">Loại lương</Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">Theo ca</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="flex-start">
                        <Grid item xs={6} >
                          <Typography variant="h5" gutterBottom component="div">Mức lương</Typography>    
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="body1" gutterBottom component="div">20.000/ca</Typography>
                        </Grid>
                    </Grid>
                  
                </Grid>
               
              </Grid>

              {/* Button */}
              <Grid container direction="row" justifyContent="flex-end" style={{marginTop:20}}> 
                          <Button variant="contained" size="small" style={{marginLeft:15}}>Sửa</Button>
                          <Button variant="contained" size="small" style={{marginLeft:15}}>Xoá</Button>
                          
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
                                <HighlightOffTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Ngừng hoạt động" />
                            </StyledMenuItem>

                          </StyledMenu>


                      </Grid>

             </Box>
           </Collapse>
    )
}

export default EmployeeDetail
