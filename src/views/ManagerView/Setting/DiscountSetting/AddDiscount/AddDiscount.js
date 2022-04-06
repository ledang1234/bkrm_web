import React, {useState,useEffect} from "react";
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import MultipleSelect from "../../../../../components/Select/MultipleSelect"
//import library
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Avatar,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  FormControlLabel,
  Checkbox,
  Divider,
  ButtonBase,
  Tooltip,
  CardHeader,
  Input,
  Chip,
  ListItem
  
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

//import project
import customerApi from "../../../../../api/customerApi";
import {useSelector,useDispatch} from 'react-redux'
import MoreInfo from "../../../../../components/MoreInfo/MoreInfo"
import clsx from "clsx"
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { ThousandSeperatedInput } from "../../../../../components/TextField/NumberFormatCustom";
import SearchMultiple from "../../../../../components/SearchBar/SearchMultiple";
import promotionCouponApi from "../../../../../api/promotionCouponApi";
import { TreeSelect } from 'antd';
import 'react-quill/dist/quill.snow.css';
import ListIcon from '@material-ui/icons/List';
import productApi from "../../../../../api/productApi";
import { statusAction } from "../../../../../store/slice/statusSlice";
import 'antd/dist/antd.css';
import "../../../../../index.css"
const { SHOW_PARENT } = TreeSelect;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(2),
      },
    },
    headerTitle: {
      fontSize: "1.125rem",
    },
    ava: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    textField: {
      width: "100%",
    },
    input: {
      display: "none",
    },
    weight:{
      fontWeight:500,
      color: "#000",
      fontSize: 13,
    },
    attrCard:{
      margin:"5px 0px 25px 0px", 
      boxShadow: "none",border: '1px solid' , borderColor:"#c9c9c9"
    },
    attrHead:{
      backgroundColor:"#E4E4E4", height:40, color:"#000"
    }
 
  })
);

const AddDiscount = (props) => {
  const { handleClose, open } = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

  const [name, setName] = React.useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await productApi.getNestedCategory(store_uuid);
        setCategoryList(response.data);
        // productFormik.setFieldValue("category", response.data[0].uuid);
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    fetchCategoryList();
  }, []);

  //Khuyến mãi theo - Hình thức
  const [discountKey, setDiscountKey] = React.useState("invoice");   // invoice, product
 
 
  const handleChangeKey = (event) => {
    setDiscountKey(event.target.value);
    setDiscountType(event.target.value === "invoice" ? "discountInvoice": "sendGift")
    const d = new Date();
    setRowsInvoice([{key:d.toString(),  totalCost:0,  discountValue:0, numberGiftItem:1, listGiftItem:[], type:"VND" ,numberBuyItem:1, listBuyItem:[],typeDiscountItem:"price",listGiftCategory:[],listBuyCategory:[] }])
  };
  const [discountType, setDiscountType] = React.useState("discountInvoice"); //discountInvoice , sendGift, sendVoucher,priceByQuantity
  const handleChangeType = (event) => {
    setDiscountType(event.target.value);
    const d = new Date();
    setRowsInvoice([{key:d.toString(),  totalCost:0,  discountValue:0, numberGiftItem:1, listGiftItem:[], type:"VND" ,numberBuyItem:1, listBuyItem:[],typeDiscountItem:"price",listGiftCategory:[],listBuyCategory:[] }])
  };

  // Khuyên mãi theo 
  const [rowsInvoice, setRowsInvoice] = React.useState([
    {
      //invoive
      key:"1", //  ID dung để delete row , ko liên quan database
      totalCost:0, 
      type:"VND" ,// "%"

      discountValue:0,

      numberGiftItem:1,
      listGiftItem:[],

       //item
      numberBuyItem:1,
      listBuyItem:[],
      typeDiscountItem:"price",

      listGiftCategory:[],
      listBuyCategory:[],
      isGiftCategory:false,
      isBuyCategory:false,

      giftIsTheSameBuy:false
    }]);

    function checkForDuplicates(array) {
      return new Set(array).size !== array.length
    }
    const getInValidMesg = ()=>{
      if(name.length===0) {  return "Chưa nhập tên chương trình khuyến mãi"}
      
      if(discountKey ==="invoice"){
            let seen = new Set();
            var hasDuplicates = rowsInvoice.some(function(currentObject) {
                return seen.size === seen.add(currentObject.totalCost).size;
            });
            if(hasDuplicates)return "Có điều kiện khuyến mãi trùng nhau. Vui lòng kiểm tra lại"
            // 
            if(discountType ==="discountInvoice"){
              const isInvalid = rowsInvoice.some(row => Number(row.discountValue) <= 0 );
              if(isInvalid)return "Bạn chưa nhập giá trị giảm giá"
            }
            else if(discountType ==="sendGift"){
              const isInvalidNumber = rowsInvoice.some(row => Number(row.numberGiftItem) <= 0 );
              if(isInvalidNumber)return "Bạn chưa nhập SL hàng được tặng"
              const isInvalid = rowsInvoice.some(row =>!row.isGiftCategory? row.listGiftItem.length <= 0  : row.listGiftCategory.length <= 0);
              if(isInvalid)return "Bạn chưa nhập hàng/nhóm hàng được tặng"
              
            }
            else if(discountType ==="sendVoucher"){
              const isInvalidNumber = rowsInvoice.some(row => Number(row.numberGiftItem) <= 0 );
              if(isInvalidNumber)return "Bạn chưa nhập SL voucher được tặng"
              const isInvalid = rowsInvoice.some(row => row.listGiftItem.length <= 0 );
              if(isInvalid)return "Bạn chưa nhập voucher được tặng" 
            }
      }
      else if(discountKey ==="product") {
            const isInvalidNumber = rowsInvoice.some(row => Number(row.numberBuyItem) <= 0 );
            if(isInvalidNumber)return "Bạn chưa nhập SL hàng mua"
            const isInvalid = rowsInvoice.some(row => !row.isBuyCategory? row.listBuyItem.length <= 0  : row.listBuyCategory.length <= 0);
            if(isInvalid) return "Bạn chưa nhập hàng/nhóm hàng mua" 
          
            if(discountType === "sendGift"){
              const isInvalidNumber = rowsInvoice.some(row => Number(row.numberGiftItem) <= 0 );
              if(isInvalidNumber)return "Bạn chưa nhập SL hàng được tặng"
              const isInvalid = rowsInvoice.some(row =>!row.isGiftCategory? row.listGiftItem.length <= 0  : row.listGiftCategory.length <= 0);
              if(isInvalid)return "Bạn chưa nhập hàng/nhóm hàng được tặng"
              

            }else if (discountType === "priceByQuantity"){

            }

            let listBuyItem =rowsInvoice.reduce((set, a) =>set.concat(a.listBuyItem) ,[])
            const unique = [...new Set(listBuyItem.map(item => item.uuid))]; 
            let totalLength = rowsInvoice.reduce((sum, a) => sum + a.listBuyItem.length, 0)
            if (unique.length !== totalLength){return "Có điều kiện khuyến mãi trùng nhau. Vui lòng kiểm tra lại"}    
           
      }



      return null
  }

  

  const  handleChangeMoneyType = (index, value) => {
    let newArr = [...rowsInvoice];
    newArr[index].type = value;
    newArr[index].discountValue = Number(newArr[index].discountValue) > 100  &&  value ==="%" ?  100: newArr[index].discountValue
    setRowsInvoice(newArr);
  }
  const  handleChangeDiscountType = (index, value) => {
    console.log("rowsInvoice",rowsInvoice)
    let newArr = [...rowsInvoice];
    newArr[index].typeDiscountItem = value;
    setRowsInvoice(newArr);
  }

  const  handleChangeTotalCost = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].totalCost =  Math.abs(event.target.value)
    setRowsInvoice(newArr);
  }
  const  handleChangeValue = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].discountValue = Number(event.target.value) >= 100  &&  newArr[index].type ==="%" ? 100 : Math.abs(event.target.value);
    setRowsInvoice(newArr);
  }
  const  handleChangeNumberGiftItem = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].numberGiftItem =  Math.abs(event.target.value);
    setRowsInvoice(newArr);
  }
  const  handleChangeListGiftItem = (option, index,typeChange) => {
    let newArr = [...rowsInvoice];
    if (typeChange === "delete"){
      newArr[index].listGiftItem = newArr[index].listGiftItem.filter(item => item.uuid !== option.uuid)
    }else{
      newArr[index].listGiftItem.push(option)
    }
   
    setRowsInvoice(newArr);
  }
  const  handleChangeNumberBuyItem = (event, index) => {
    let newArr = [...rowsInvoice];
    newArr[index].numberBuyItem = Math.abs(event.target.value);
    setRowsInvoice(newArr);
  }
  const  handleChangeListBuyItem = (option, index,typeChange) => {
    let newArr = [...rowsInvoice];
    if (typeChange === "delete"){
      newArr[index].listBuyItem = newArr[index].listBuyItem.filter(item => item.uuid !== option.uuid)
    }else{
      newArr[index].listBuyItem.push(option)
    }
   
    setRowsInvoice(newArr);
  }
  const  handleChangeIsBuyCategory = (index) => {
    let newArr = [...rowsInvoice];
    newArr[index].isBuyCategory = !newArr[index].isBuyCategory;
    setRowsInvoice(newArr);
  }
  const  handleChangeListBuyCategory = (val,index) => {
    let newArr = [...rowsInvoice];
    newArr[index].listBuyCategory = val;
    setRowsInvoice(newArr);
  }
  
  const  handleChangeIsGiftCategory = (index) => {
    let newArr = [...rowsInvoice];
    newArr[index].isGiftCategory = !newArr[index].isGiftCategory;
    setRowsInvoice(newArr);
  }
  const  handleChangeListGiftCategory = (val,index) => {
    let newArr = [...rowsInvoice];
    newArr[index].listGiftCategory = val;
    setRowsInvoice(newArr);
  }

  const  handleCheckedGiftIsTheSameBuy = (index) => {
    let newArr = [...rowsInvoice];
    newArr[index].giftIsTheSameBuy = !newArr[index].giftIsTheSameBuy;
    setRowsInvoice(newArr);
  }
  

  

  const addConditionRow = () => {
    let newArr = [...rowsInvoice];
    const d = new Date();
    newArr.push({key:d.toString(),  totalCost:0,  discountValue:0, numberGiftItem:1, listGiftItem:[], type:"VND" ,numberBuyItem:1, listBuyItem:[],typeDiscountItem:"price", listGiftCategory:[],listBuyCategory:[], })
    setRowsInvoice(newArr);
  }

  const deleteAttr = (key) => {
    var newArr = [...rowsInvoice];
    newArr = newArr.filter(row => row.key !== key)
    setRowsInvoice(newArr);
  }


  // Set Date Advance

  const [byMonth, setByMonth] = React.useState([]);
  const [byDay, setByDay] = React.useState([]);
  const [byDate, setByDate] = React.useState([]);
  const [byTime, setByTime] = React.useState([]);

  const handleByMonthChange = (event) => {
    setByMonth(event.target.value);
  };
  const handleDeleteMonth = (chipToDelete) => () => {
    setByMonth((chips) => byMonth.filter((chip) => chip !== chipToDelete));
  };
  const handleByDayChange = (event) => {
    setByDay(event.target.value);
  };
  const handleDeleteDay = (chipToDelete) => () => {
    setByDay((chips) => byDay.filter((chip) => chip !== chipToDelete));
  };

  const handleByDateChange = (event) => {
    setByDate(event.target.value);
  };
  const handleDeleteDate = (chipToDelete) => () => {
    setByDate((chips) => byDate.filter((chip) => chip !== chipToDelete));
  };

  const handleByTimeChange = (event) => {
    setByTime(event.target.value);
  };
  const handleDeleteTime = (chipToDelete) => () => {
    setByTime((chips) => byTime.filter((chip) => chip !== chipToDelete));
  };

  //Birthday
  const [checkedBirthday, setCheckedBirthday] = React.useState(false);
  const handleCheckedBirthday = (event) => {
    setCheckedBirthday(event.target.checked);
  };

    
  const currentDate =  new Date()

  const [startDate, setStartDate] = React.useState(currentDate.toISOString().slice(0,10))
  const [endDate, setEndDate] = React.useState( new Date(currentDate.setMonth(currentDate.getMonth()+6)).toISOString().slice(0,10) )

  const info = useSelector(state => state.info)
  const store_uuid = info.store.uuid
  const dispatch = useDispatch();

  return (
 
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}
     >
      <DialogTitle id="form-dialog-title">
        <Typography className={classes.headerTitle} variant="h5" >
          Thêm chương trình khuyến mãi
        </Typography>
      </DialogTitle>

      <DialogContent>
        <div >
          <TextField
              id="outlined-basic"
              label="Tên chương trình khuyến mãi (*)"
              variant="outlined"
              fullWidth
              size="small"
              value={name}
              onChange={(event)=>setName(event.target.value)}
            />
         <Card className={classes.attrCard} style={{marginTop:20, marginBottom:10}}>
          <CardHeader
            title="Hình thức khuyến mãi"
            className={classes.attrHead}
          />

             
         {/* <Typography variant="h5" className={classes.text} style={{marginTop:20, marginBottom:10}}>Hình thức khuyến mãi</Typography> */}
         <Grid  container  direction="row"  alignItems="center" style={{padding:10, paddingBottom:15, marginBottom:10}} >
            <Grid container item sm={4} alignItems="center">
                <Grid item sm={6}>
                  <Typography style={{fontWeight:500, color:theme.customization.primaryColor[500], marginRight:10}}>Khuyến mãi theo </Typography>
                </Grid>
                <Grid item sm={6}>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={discountKey}
                        onChange={handleChangeKey}
                      >
                        <MenuItem value="invoice">Hoá đơn</MenuItem>
                        <MenuItem value="product">Sản phẩm</MenuItem>
                       
                      </Select>
                    </FormControl>
                      
                </Grid>
            </Grid>

            <Grid container item sm={4} alignItems="center">
              <Grid item sm={4}>
                    <Typography style={{fontWeight:500, color:theme.customization.primaryColor[500], marginRight:10}}>Hình thức</Typography>
                  </Grid>
                  <Grid item sm={8}>
                      {discountKey === 'invoice'? 
                         <FormControl className={classes.formControl}>
                        <Select
                          value={discountType}
                          onChange={handleChangeType}
                        >
                            <MenuItem value="discountInvoice">Giảm giá hoá đơn</MenuItem>
                            <MenuItem value="sendGift">Tặng hàng</MenuItem>
                            <MenuItem value="sendVoucher">Tặng voucher</MenuItem>
                        </Select>
                      </FormControl>
                      :
                      <FormControl className={classes.formControl}>
                      <Select
                        value={discountType}
                        onChange={handleChangeType}
                      >
                          <MenuItem value="sendGift">Mua hàng tặng hàng</MenuItem>
                          <MenuItem value="priceByQuantity">Giá bán theo số lượng mua</MenuItem>
                      </Select>
                    </FormControl>
                      
                    }
                  </Grid>
            </Grid>
         </Grid>

      {/* Header */}
         <div style={{backgroundColor:theme.customization.primaryColor[50], height:35, marginTop:20,paddingTop:10, paddingLeft:15, marginLeft:10, marginRight:10}}>
          <Grid  container direction="row" justifyContent="">
              {/* col 1 */}
              {discountKey ==="invoice"?
              <Grid item style={{width:150, marginRight:30}}>
                <Typography className={clsx(classes.text,classes.weight)} >Tổng tiền hàng</Typography>
              </Grid>:null
              }
              {discountKey ==="product" && discountType ==="sendGift"|| discountType=="priceByQuantity" ?
              <>
              <Grid item style={{width:50, marginRight:50}}>
                  <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>SL mua</Typography>
              </Grid>
              <Grid item style={{ marginRight:190}}>
                  <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>SP/nhóm hàng mua</Typography>
              </Grid>
               </>:null
              }
               { discountType ==="discountInvoice"?
                  <Grid item >
                  <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>Giá trị khuyến mãi</Typography>
                </Grid>:null
                }
                {['sendGift','sendVoucher'].includes(discountType) ?
                  <Grid item style={{width:50, marginRight:50}}>
                  <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>SL tặng</Typography>
              </Grid>:null
                }
                {discountType ==="sendGift"?
                    <Grid item >
                        <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>SP/nhóm hàng tặng</Typography>
                    </Grid> :null
               }
               {discountType ==="sendVoucher"?
                    <Grid item >
                        <Typography className={clsx(classes.text,classes.weight)} style={{textAlign: "center"}}>Voucher</Typography>
                    </Grid> :null
               }
                 
                 
           
              
          </Grid>
          
          </div>
           <Divider classes={{root: classes.divider}} style={{marginLeft:10, marginRight:10}}/>      
       
   

       {/* List Khuyen mai */}
          {rowsInvoice.map((row, index) => {
              return (
                  <>
                  <div style={{paddingLeft:15, marginLeft:10, marginRight:10}}>
                  <Grid container direction="row" justifyContent="">
                      {/* col 1 */}
                      {discountKey ==="invoice"?
                      <Grid item  container direction="row" alignItems="center" style={{width:130,marginRight:52, height:40}} >
                          <Grid item> <Typography style={{marginRight:10, color:"#000", fontSize:13}}> Từ </Typography> </Grid> 
                          <Grid item> <ThousandSeperatedInput  style={{width:100}} onChange={(event)=>handleChangeTotalCost(event, index)} value={row.totalCost} /> </Grid> 
                      </Grid>:null
                      }
                      {discountKey ==="product" && discountType ==="sendGift"|| discountType ==='priceByQuantity' ?
                      <>
                      <Grid item style={{width:50,marginRight:30, height:40, marginTop:4}} >
                        <ThousandSeperatedInput  style={{width:50}} onChange={(event)=>handleChangeNumberBuyItem(event, index)} value={row.numberBuyItem} /> 
                      </Grid>
                      <Grid  item style={{ marginTop:4, marginRight:30}} >
                      {!row.isBuyCategory?
                             <Grid  container direction='row'>
                            <SearchMultiple
                            
                              selectedOption={row.listBuyItem}
                              handleSelectedOption={handleChangeListBuyItem}
                              index={index}
                            />
                             <Tooltip title={"Chọn danh mục"}>
                              <ListIcon  onClick={()=>handleChangeIsBuyCategory(index )}/>
                            </Tooltip>
                            </Grid> :
                            <Grid  container direction='row'>
                            <TreeSelect
                                name="category"  
                                placeholder={ 'Danh mục"'}
                                style={{ width: 280}}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto',zIndex:100000000  }}
                                treeData={categoryList}
                                value={row.listBuyCategory}
                                onChange={(val)=>handleChangeListBuyCategory(val,index)}
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_PARENT}
                                // onBlur={productFormik.handleBlur}   
                            />
                             <Tooltip title={"Chọn danh mục"}>
                              <ListIcon  onClick={()=>handleChangeIsBuyCategory(index )}/>
                            </Tooltip>
                            </Grid> }
                        </Grid> 

                      </>
                      :null }
                      {
                        discountType ==='priceByQuantity'? 
                        <>
                          <Grid item style={{width:50,marginRight:50, height:40, marginTop:4}} >
                              <FormControl className={classes.formControl}>
                                <Select value={row.typeDiscountItem}  onClick={(e) => handleChangeDiscountType(index, e.target.value)}>
                                  <MenuItem value="price">Giá bán</MenuItem>
                                  <MenuItem value="percent">Giảm giá</MenuItem>
                                </Select>
                              </FormControl>
                          </Grid>
                     
                        </>
                        :null
                      }
                      {/* col 2 */}
                      {discountType ==="discountInvoice"  || discountType ==='priceByQuantity'?
                      <Grid item >
                        <Grid item  container direction="row" alignItems="center" style={{height:40}}>
                          {/*!! Nếu la % nhớ handle maximum change là 100% */}
                          <Grid item> <ThousandSeperatedInput style={{marginRight:10, color:"#000"}} onChange={(event)=>handleChangeValue(event, index)} value={row.discountValue}  />  </Grid> 
                          <Grid item style={{ marginRight:5}}> 
                              <ButtonBase sx={{ borderRadius: '16px', }} 
                                  onClick={()=>handleChangeMoneyType(index,"VND")}
                                >
                                <Avatar variant="rounded"   style={{width: theme.spacing(4),height: theme.spacing(3), background:row.type ==="VND"?  theme.palette.primary.main :null,}} >
                                    <Typography  style={{fontSize:13, fontWeight:500}} >VND</Typography>
                                </Avatar>     
                            </ButtonBase>
                           </Grid> 
                           <Grid item> 
                              <ButtonBase sx={{ borderRadius: '16px' }} 
                                  onClick={()=>handleChangeMoneyType(index,"%")}
                                >
                                <Avatar variant="rounded"   style={{width: theme.spacing(4),height: theme.spacing(3), background: row.type ==="%"?theme.palette.primary.main :null,}} >
                                    <Typography  style={{fontSize:13, fontWeight:500}} >%</Typography>
                                </Avatar>
                                
                            </ButtonBase>
                           </Grid> 
                        </Grid>
                      </Grid>:null
                      }
                    {/* col 3 */}
                    {['sendGift','sendVoucher'].includes(discountType) ?
                    <Grid item style={{width:50,marginRight:30, height:40, marginTop:4}} >
                        <ThousandSeperatedInput  style={{width:50}} onChange={(event)=>handleChangeNumberGiftItem(event, index)} value={row.numberGiftItem} /> 
                    </Grid>:null
                    }
                    {discountType ==="sendGift"?
                          !row.giftIsTheSameBuy ?
                          <Grid item style={{ marginTop:4}} >
                             {/* <ListItem style={{height:25,width:360, marginTop:4}}> */}
                          
                             <Grid  container direction='row'>
                            {!row.isGiftCategory ?
                               <>
                            <SearchMultiple
                              selectedOption={row.listGiftItem}
                              handleSelectedOption={handleChangeListGiftItem}
                              index={index}
                            />
                             <Tooltip title={"Chọn danh mục"}>
                              <ListIcon  onClick={()=>handleChangeIsGiftCategory(index )}/>
                            </Tooltip>
                            </>:
                            <>
                            <TreeSelect
                                name="category"  
                                placeholder={ 'Danh mục"'}
                                style={{ width: 280}}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto',zIndex:100000000  }}
                                treeData={categoryList}
                                // value={productFormik.values.category}
                                // onChange={(val)=>productFormik.setFieldValue("category",val )}
                                value={row.listGiftCategory}
                                onChange={(val)=>handleChangeListGiftCategory(val,index)}
                                treeCheckable={true}
                                showCheckedStrategy={SHOW_PARENT}
                                // onBlur={productFormik.handleBlur}   
                            />
                             <Tooltip title={"Chọn danh mục"}>
                              <ListIcon  onClick={()=>handleChangeIsGiftCategory(index )}/>
                            </Tooltip>
                            </>}
                         
                            
                            </Grid>
                          {/* </ListItem> */}
                          </Grid>
                         :  <FormControlLabel
                         control={<Checkbox  color="primary" checked={row.giftIsTheSameBuy} onChange={()=>handleCheckedGiftIsTheSameBuy(index)}  />}
                         label={"Hàng được tặng là hàng mua"}
                         
     
                        />
                          :null
                    }
                    {discountType ==="sendVoucher"?
                          <Grid item style={{ marginTop:4}} >
                            <SearchMultiple
                            isVoucher={true}
                              selectedOption={row.listGiftItem}
                              handleSelectedOption={handleChangeListGiftItem}
                              index={index}
                            />
                           

                          {/* </ListItem> */}
                          </Grid> :null
                    }
                  
                      <Grid item container direction="row" justifyContent="flex-end">
                          <DeleteForeverTwoToneIcon style={{marginTop:-30}} onClick={() => {deleteAttr(row.key)}} />
                      </Grid>
                </Grid>
                {discountType ==="sendGift" && discountKey ==="product" && !row.giftIsTheSameBuy?
                  <FormControlLabel
                  control={<Checkbox  color="primary" checked={row.giftIsTheSameBuy} onChange={()=>handleCheckedGiftIsTheSameBuy(index)}  />}
                  label={"Hàng được tặng là hàng mua"}
                  style={{marginLeft:480, marginTop:-10}}
                />
                :null}
                </div>
                
                <Divider classes={{root: classes.divider}} style={{marginLeft:10, marginRight:10}}/>
                  </>
              );

          })}

          <Button variant="outlined" size="small" color="primary" style={{ marginLeft: 20,marginBottom:15, marginTop: 10, textTransform: "none" }}
              startIcon={<AddIcon />}
              onClick={() => addConditionRow()}>
              Thêm điều kiện
          </Button>
        </Card>


        <Card className={classes.attrCard} style={{marginTop:20, marginBottom:10, }}>
          <CardHeader
            title="Thời gian áp dụng"
            className={classes.attrHead}
          />
           <div style={{padding:10}}>
          <Grid  container  direction="row" justifyContent="space-around" alignItems="center"  spacing={3} >
              <Grid item sm={6} >
                  <TextField id="startDate" label="Từ" 
                      type="date" 
                      name="startDate"
                      // defaultValue={formik.values.startDate} 
                      variant="outlined" size="small" fullWidth 
                      className={classes.textField} 
                      InputLabelProps={{ shrink: true }} 
                      value={startDate} 
                      onChange={e => setStartDate(e.target.value)}
                    />
            </Grid>
            
            <Grid item sm={6}>
              <TextField 
                  id="endDate" label="Đến" type="date" name="endDate"
                  defaultValue={new Date().toDateString()} 
                  variant="outlined" size="small" 
                  fullWidth className={classes.textField} 
                  InputLabelProps={{ shrink: true }} 
                  value={endDate}  
                  onChange={e => setEndDate(e.target.value)}
                />
            </Grid> 
        </Grid>
        {/*  */}
        <Divider style={{margin:"25px 10px 0px 10px"}} />
        <Typography style={{fontWeight:500, color:"#707070", marginTop:15, marginBottom:-10}}>Cài đặt nâng cao:</Typography>
            <MultipleSelect  chonsenValue={byMonth} handleAction={handleByMonthChange} handleDeleteChip={handleDeleteMonth} label="Theo tháng" options={month}/>
            <MultipleSelect  chonsenValue={byDay} handleAction={handleByDayChange} handleDeleteChip={handleDeleteDay}label="Theo ngày" options={day}/>
            <MultipleSelect  chonsenValue={byDate} handleAction={handleByDateChange} handleDeleteChip={handleDeleteDate}label="Theo thứ" options={date}/>
            <MultipleSelect  chonsenValue={byTime} handleAction={handleByTimeChange} handleDeleteChip={handleDeleteTime} label="Theo giờ" options={time}/>
           
        </div>
        <FormControlLabel
              control={<Checkbox  color="primary" checked={checkedBirthday} onChange={handleCheckedBirthday}  />}
              label={<Grid container direction="row" alignItems="center">Áp dụng vào <Typography style={{color:theme.customization.primaryColor[500], fontWeight:500, marginLeft:4, marginRight:4}}> ngày sinh nhật</Typography> của khách hàng </Grid>}
              style={{marginLeft:10}}
            />
        
        </Card>
      </div>


      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => handleClose(null)}
          variant="contained"
          size="small"
          color="secondary"
        >
          Huỷ
        </Button>
        <Button
          onClick={async () => {
            let body = {
              name: name,
              start_date: startDate,
              end_date: endDate,

              promotion_condition: JSON.stringify({
                discountKey: discountKey,
                discountType: discountType,
                rowsInvoice: rowsInvoice,
              
              }),
              customer_birth: checkedBirthday,
              // Thêm cái này nữa Hải ơi
              byDay:byDay,
              byMonth:byMonth,
              byDate:byDate,
              byTime:byTime

            };

            try {
              
              const invalidMesg = getInValidMesg()
                if(invalidMesg){
                  dispatch(statusAction.failedStatus(invalidMesg));
                  return
                }else{
                  // const response = await promotionCouponApi.createPromotion(store_uuid, body)
                  // handleClose("Success")
                }
              

            } catch (err) {
              // handleClose("Failed");
            }

          }}
          variant="contained"
          size="small"
          color="primary"
        >
          Thêm
        </Button>
      </DialogActions>
      </Dialog>
  );
};

export default AddDiscount;

const month = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];
const day = ['Ngày 1','Ngày 2','Ngày 3','Ngày 4','Ngày 5','Ngày 6','Ngày 7','Ngày 8','Ngày 9','Ngày 10','Ngày 11','Ngày 12','Ngày 13','Ngày 14','Ngày 15','Ngày 16','Ngày 17','Ngày 18','Ngày 19','Ngày 20','Ngày 21','Ngày 22','Ngày 23','Ngày 24','Ngày 25','Ngày 26','Ngày 27','Ngày 28','Ngày 29','Ngày 30','Ngày 31'];
const date=['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật']
const time = ['0am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12am','13pm','14pm','15pm','16pm','17pm','18pm','19pm','20pm', "21pm","22pm",'23pm']
