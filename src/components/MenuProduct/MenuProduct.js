import React from 'react'
import icon from '../../assets/img/product/tch.jpeg';
import InventoryList from '../../assets/JsonData/inventory.json';
import {useTheme} from "@material-ui/core/styles";
import useStyles from "../../components/TableCommon/style/mainViewStyle";
//import library 
import {Grid,Card,Box,Tabs,Tab,TableContainer,CardContent,CardMedia,CardActionArea,FormControlLabel,Switch,Menu,MenuItem,ListItem,IconButton,TableBody,Typography} from '@material-ui/core'


const MenuProduct = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    //tab menu
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <Tabs style={{marginBottom:10, marginLeft:-20}}  variant="scrollable" scrollButtons="auto" indicatorColor="secondary" textColor="secondary"value={value} onChange={handleChange} aria-label="simple tabs example">
           {categoryBig.map((item)=>{
            return(
                <Tab label={item} style={{ minWidth: 100,textTransform: 'none'}} />          
               )
           })}
         </Tabs>
         <TableContainer style={{maxHeight:'50vh',padding:5}}>
         <Grid container direction="row" spacing={3} >
             {/* Đổi list đúng với category */}
             {InventoryList.map(item=>{
                 return(
                     <Grid item>
                         <Card  onClick={()=> console.log('add item to cart', item)}  style={{  width:141, height:240,borderRadius:10}} >
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image={icon}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography style={{height:37}}gutterBottom variant="h5" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.price}.000đ
                                </Typography>
                                <Typography style={{marginLeft:65,}}variant="body2" color="textSecondary" component="p">
                                    Tồn: {item.quantity}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid> 
                 )
             })}
        </Grid>
        </TableContainer>
        </>
    )
}

export default MenuProduct

const categoryBig = ['Quần áo', 'Bánh kẹo', 'Đồ dùng', 'Điện thoại', 'Máy tính']