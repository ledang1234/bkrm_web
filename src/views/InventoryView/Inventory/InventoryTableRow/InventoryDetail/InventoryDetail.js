import React, {useEffect, useState} from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

//import library
import {Box,Grid,Collapse,Typography,Button,ListItemIcon,ListItemText,IconButton} from '@material-ui/core';

//import icon
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';

//import image
import avaUpload from '../../../../../assets/img/product/img.jpeg';

//import project 
import {StyledMenu,StyledMenuItem} from '../../../../../components/Button/MenuButton'
import productApi from '../../../../../api/productApi';
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
        height: 170,
        width: 170, 
        borderRadius:2,
        marginLeft:15,

      }}
      src={avaUpload}
    />
    
  )
}
const InventoryDetail = (props) => {
    const {row,openRow }= props.parentProps;

    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [productDetail, setProductDetail] = React.useState({
      name: "",
      barcode: "",
      category: {name: ""},
      images: [],
      suppliers: [],

    }); 

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await productApi.getProduct(row.uuid)
          setProductDetail(response.data)
        } catch(err) {
          console.log(err)
        }
      }
      fetchProduct()

    }, [])

    return (
        <Collapse in={ openRow === row.uuid } timeout="auto" unmountOnExit>
             <Box margin={1}>
                <Typography variant="h3" gutterBottom component="div" className={classes.typo}>
                 {row.name}
               </Typography>

              <Grid  container direction="row" justifyContent="flex-start">
                <Grid item xs={4}>
                    <UploadImage />
                </Grid>

                <Grid  container direction="column" item xs={8}>
                  <Grid container direction="row"> 
                      <Grid item xs={6}>
                          <Grid container direction="row" justifyContent="flex-start" > 
                            <Grid item xs={6} >
                              <Typography variant="h5" gutterBottom component="div">Mã hàng </Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.uuid} </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={6} >
                              <Typography variant="h5" gutterBottom component="div">Tên sản phẩm</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.name} </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={6} >
                              <Typography variant="h5" gutterBottom component="div">Mã vạch</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.barcode} </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={6} >
                              <Typography variant="h5" gutterBottom component="div">Danh mục</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.category.name } </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={6} >
                              <Typography variant="h5" gutterBottom component="div">Đơn vị</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.quantity_per_unit}</Typography>
                            </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={4} >
                              <Typography variant="h5"gutterBottom component="div">Giá bán</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.list_price} </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={4} >
                              <Typography variant="h5" gutterBottom component="div">Giá vốn</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.standard_price} </Typography>
                            </Grid>
                        </Grid>
                       
                        <Grid container direction="row" justifyContent="flex-start">
                            <Grid item xs={4} >
                              <Typography variant="h5" gutterBottom component="div">Tồn kho</Typography>    
                            </Grid>
                            <Grid item xs={6} >
                              <Typography variant="body1" gutterBottom component="div">{productDetail.quantity_available} </Typography>
                            </Grid>
                        </Grid>
                      </Grid>
                      
                      </Grid>

                      
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
                                <InboxIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="In mã tem" />
                            </StyledMenuItem>

                            <StyledMenuItem>
                              <ListItemIcon style={{marginRight:-15}}>
                                <HighlightOffTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Ngừng kinh doanh" />
                            </StyledMenuItem>

                            <StyledMenuItem>
                              <ListItemIcon style={{marginRight:-15}}>
                                <LocalOfferTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Lịch sử giá" />
                            </StyledMenuItem>

                            <StyledMenuItem>
                              <ListItemIcon style={{marginRight:-15}}>
                                <VerifiedUserTwoToneIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Lịch sử kiểm kê" />
                            </StyledMenuItem>
                          </StyledMenu>
                          
                      </Grid>

                </Grid>
               
              </Grid>

              

             </Box>
           </Collapse>
    )
}

export default InventoryDetail
