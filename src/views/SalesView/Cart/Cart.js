import React from 'react'
import {useTheme} from "@material-ui/core/styles";
//import style
import useStyles from "../../../components/TableCommon/style/mainViewStyle";
import { grey} from '@material-ui/core/colors'

//import library 
import {Grid,Card,Box,Tabs,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Switch,Menu,MenuItem,ListItem,IconButton,TableBody,Typography} from '@material-ui/core'


//import constant
import * as HeadCells from '../../../assets/constant/tableHead'


//import project
//rieng
import CartSummary from '../../../components/CheckoutComponent/CheckoutSummary/CartSummary/CartSummary'
import {CartRow,CartRowMini} from './CartTableRow/CartTableRow'
//chung
import MenuProduct from "../../../components/MenuProduct/MenuProduct"
import ChangeCartBtn from  "../../../components/CheckoutComponent/ChangeCartBtn/ChangeCartBtn"
import SearchProduct from "../../../components/SearchProduct/SearchProduct";
import TableHeader from '../../../components/TableCommon/TableHeader/TableHeader'
import TableWrapper from '../../../components/TableCommon/TableWrapper/TableWrapper'
import {getComparator,stableSort} from '../../../components/TableCommon/util/sortUtil'


 // FILE này xử lý state -> connect search bar, table, với summary lại + quản lý chọn cart

const Cart = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    ////------------ I. DATA (useState) ----------------
    // Cart data get from search_product component 
    const cartData = [
        // QUANTITY có thể edit ->  truyền quatity edit ngược về cartData ??
        //dựa vào id của text field quatity ??

        //còn bị lỗi sort // tự generate stt
        { stt: 1, id: 123, name:"Áo dài Việt Nam Việt Nam", quantity:2, price:200 },
        { stt: 2, id: 12,  name:"Quan", quantity:1, price:220 },
        { stt: 3, id: 134,  name:"Bánh", quantity:3, price:240 },   
        
    ]; 
    // chú ý cartList id from 1 to ... dùng để edit + delete
    const [cartList, setCartList] = React.useState([{ id: 1, customer: null, cartItem: cartData}]);

    //// ----------II. FUNCTION
    // 1.Cart
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChoose = (index) =>{
        setSelectedIndex(index);
        handleClose();
    }
    const handleAdd = () =>{
        // ADD CART
        setCartList([...cartList, { id: cartList.length + 1, customer:null, cartItem: []}]);
        setSelectedIndex(cartList.length);
        handleClose();
    } 
    const handleDelete = (index) =>{
        // DELETE CART
        cartList.splice(index, 1);
        setCartList(cartList);
        if (selectedIndex === index){setSelectedIndex(0);}
        else if(selectedIndex > index){setSelectedIndex(selectedIndex-1);}
        handleClose();
    }
    const updateCustomer =  value => {  
        let newArr = [...cartList]; // copying the old datas array
        newArr[selectedIndex].customer = value; 
        setCartList(newArr);
    }

    //2. Table sort
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('stt');
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    //mode
    const [mode, setMode] = React.useState(false);
    const handleChangeMode = (event) => {
        setMode(event.target.checked);
    };


  

   
    return (
        <Grid container direction="row" justifyContent="space-between"  alignItems="center" spacing={2} >
            
            {/* 1. TABLE CARD (left) */}
            <Grid item xs={12} sm={8}  >
                <Card className={classes.root}>
                    <Box style={{padding:30, minHeight:'80vh', paddingBottom:0}} >
                        <Box style={{ height:'70vh'}}>
                        {/* 1.1 TITLE + BTN CHANGE CART +  SEARCH */}
                        <Grid 
                            container
                            direction="row"
                            justifyContent="space-between"  
                            alignItems="center"
                            style={{marginTop:-10,marginBottom:30}}
                        > 
                            <Grid>
                                <ListItem  >
                                    {/* 1.1.1 Title */}
                                    <Typography  variant="h3" > Giỏ hàng </Typography> 
                                    <Typography  variant="h3" style={{marginLeft:10, color:theme.customization.primaryColor[500]}}> #{cartList[selectedIndex].customer ?cartList[selectedIndex].customer.name:selectedIndex + 1} </Typography> 
                                    {/* 1.1.2. Btn Channge Cart */}
                                    <ChangeCartBtn selectedIndex={selectedIndex}anchorEl={anchorEl}cartList={cartList} handleClick={handleClick} handleClose={handleClose}handleChoose={handleChoose}handleDelete={handleDelete}handleAdd={handleAdd} isCart={true}/>                
                                </ListItem>
                            </Grid>
                            <Grid>
                                {/* 1.1.3. Search */}
                                <SearchProduct />    
                            </Grid>
                        </Grid>


                        {/* 1.2 TABLE */}
                        {!mode ? 
                            <TableWrapper isCart={true} >
                                <TableHeader
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    headerData={HeadCells.CartHeadCells}
                                    isCart={true}
                                />
                                <TableBody>
                                {stableSort(cartList[selectedIndex].cartItem, getComparator(order, orderBy))
                                    .map((row, index) => {
                                    return (
                                        <CartRow row={row}/> 
                                    );})
                                }
                                </TableBody>
                            </TableWrapper> 
                        :

                        <MenuProduct />
                        
                        }
                        </Box>
                       {/* 1.3 CHANGE MODE  */}
                        <FormControlLabel
                            control={<Switch checked={mode} onChange={handleChangeMode} />}
                            style={{display: "flex",justifyContent: "flex-end",margin:-10, marginTop:10}}
                        />
 
                    </Box>
                </Card>
            </Grid>


            {/* 2.SUMMARY CARD (right) */}
            <Grid item xs={12} sm={4} className={classes.root} >
                
                <Card className={classes.root}>
                    <Box style={{padding:30,minHeight:'80vh', }}>
                    {!mode  ?
                        /* Viết hàm tính toán sau dựa trên cartData ... hiện tại đang set cứng giá trị */
                        <CartSummary cartData={cartList[selectedIndex].cartItem} updateCustomer={updateCustomer}  currentCustomer={cartList[selectedIndex].customer} mode={mode}/>                    
                        : 
                        <CartSummary cartData={cartList[selectedIndex].cartItem} updateCustomer={updateCustomer}  currentCustomer={cartList[selectedIndex].customer} mode={mode}>
                            <TableContainer style={{maxHeight: '40vh',marginBottom:35, height:'40vh'}}>                         
                                <TableBody>
                                {cartList[selectedIndex].cartItem.map((row, index) => {
                                    return (
                                    <CartRowMini row={row}/> 
                                    );})
                                }
                                </TableBody>
                            </TableContainer> 
                        </CartSummary>
  
                    }
                    </Box>
                </Card>
           
           
            </Grid>
        </Grid>
        
    )
}

export default Cart



