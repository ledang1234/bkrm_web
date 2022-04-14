import React from 'react'
import icon from '../../assets/img/product/tch.jpeg';
import InventoryList from '../../assets/JsonData/inventory.json';
import {useTheme} from "@material-ui/core/styles";
import useStyles from "../../components/TableCommon/style/mainViewStyle";
import { useSelector } from 'react-redux';
//import library 
import {Grid,Card,Box,Tabs,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Switch,Menu,MenuItem,ListItem,IconButton,TableBody,Typography, Button} from '@material-ui/core'
import { VNDFormat } from "../TextField/NumberFormatCustom";
import defaultProduct from "../../assets/img/product/default-product.png"
import setting from "../../assets/constant/setting"
export const FormatedImage = (props) => {
    return (
      <Box
        component="img"
        sx={{
          height: 53,
          width: 53,
          borderRadius: 10,
          marginRight: 15,
        }}
        src={props.url}
      />
    );
  };
  
const MenuProduct = ({products, handleSearchBarSelect, isCart}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    // redux
    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;
    const store_setting = info.store.general_configuration? JSON.parse(info.store.general_configuration): setting;

    //tab menu
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const renderOption = (option) => {
      // console.log("option",option)
      //display value in Popper elements
      return (
        <div
          style={{display: 'flex', flexDirection:'row', gap: 10, alignContent: 'center'}}
          // style={{
          //   backgroundColor: selectedOption.name
          //     ? "rgba(164,247,247,0.3)"
          //     : "rgba(0,0,0,0)",
          // }}
        >
          
            <FormatedImage
              url={
                JSON.parse(option.img_urls ? option.img_urls : "[]").at(0) ||
                defaultProduct
              }
            />
        <Typography variant="h5">{`${option.product_code}`}</Typography>
        <Typography variant="h5">{option.name}</Typography>
        <Typography variant="body2">
                {store_setting?.inventory.status
                  ? `Tồn kho: ${option.branch_quantity}`
                  : null}
              </Typography>

              {isCart ? (
                <Typography variant="body2">
                  Giá bán: <VNDFormat value={option.list_price}></VNDFormat>
                </Typography>
              ) : null}
              {!isCart ? (
                <Typography variant="body2">
                  Giá nhập:{" "}
                  <VNDFormat value={option.standard_price}></VNDFormat>
                </Typography>
              ) : null}
          <Button 
            type='primary'
            onClick={() => handleSearchBarSelect(option)}>Chọn</Button>
        </div>
      );
    };
    

    return (
        <div style={{margin: 50}}>
        {/* <Tabs style={{marginBottom:10, marginLeft:-20}}  variant="scrollable" scrollButtons="auto" indicatorColor="secondary" textColor="secondary"value={value} onChange={handleChange} aria-label="simple tabs example">
           {categoryBig.map((item)=>{
            return(
                <Tab label={item} style={{ minWidth: 100,textTransform: 'none'}} />          
               )
           })}
         </Tabs> */}
         <div style={{display: 'flex', flexDirection: 'column', gap: 10}} >
             {/* Đổi list đúng với category */}
             {products.map(item=>renderOption(item)
             )}
        </div>
        </div>
    )
}

export default MenuProduct

const categoryBig = ['Quần áo', 'Bánh kẹo', 'Đồ dùng', 'Điện thoại', 'Máy tính']