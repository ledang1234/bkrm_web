import React, {useState,useEffect} from 'react'
import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";
import { grey, blue,purple} from '@material-ui/core/colors'
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';

import {Typography,Divider,Card,Grid,Paper,InputAdornment,Box,TextField,Button,InputLabel,MenuItem,FormControl,Select,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import ava from '../../../../assets/img/product/lyimg.jpeg';
import DayReportSelect from "../../../../components/Select/DayReportSelect"
import BranchSelect from "../../../../components/Select/BranchSelect"
import TopSelect from "../../../../components/Select/TopSelect"
import TypeReportSelect from "../../../../components/Select/TypeReportSelect"
import ReportCard from "../../../../components/CardWrapper/ReportCard"
import storeApi from "../../../../api/storeApi";
import defaultProduct from "../../../../assets/img/product/default-product.png"

import { useSelector } from 'react-redux'
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import barcodeIcon from "../../../../assets/img/icon/barcode_grey.png";
import { TreeSelect } from 'antd';
import productApi from "../../../../api/productApi";


const ProductStatistics = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branch_uuid = info.branch.uuid;
    const branches = info.store.branches 

  // category id to view to item by root category
  // should be selected by a drop down and pass as category_id=> category uuid đc ko
  const [categoryId, setCategoryId] = useState();
  
  const [topItemByCategory, setTopItemByCategory] = useState([])
  const [topData, setTopData] = useState({})

  const [categoryList, setCategoryList] = useState([]);
  
  const fetchAllCategory = async () => {
    try {
      const response = await productApi.getNestedCategory(store_uuid);
      setCategoryList(response.data);
    } catch (error) { }
  };

  const fetchItemByCategoryRes = async () =>{
    const topItemByCategoryRes = await storeApi.getReportProduct(store_uuid, dayQuery.fromDate, dayQuery.toDate, limit, categoryId);
    setTopItemByCategory(topItemByCategoryRes);
  }
  const fetchTopData = async () =>{
    const topDataRes = await storeApi.getReportTop( store_uuid,  dayQuery.fromDate, dayQuery.toDate );
    setTopData(topDataRes)
  }
   // 
   const today = new Date()
   const [dayQuery,setDayQuery] = useState({
     fromDate: new Date(today.setDate(today.getDate() - 7 +1)).toISOString().split('T')[0],
     toDate: new Date().toISOString().split('T')[0],
   });

   const [selectedBranches, setSelectedBranches] = useState(branches?branches:[]);
   const [limit, setLimit] = useState({bestSeller:10, revenue:10, profit:10 });
   const handleChangeLimit =  (event) => {
     const { name,value } = event.target;
     setLimit((prevState) => { return { ...prevState, [name]: value, };
    })};
   //

  useEffect(() => {
      if (store_uuid && branch_uuid ) {
        fetchItemByCategoryRes()
        fetchTopData()
        fetchAllCategory();

      }   
  }, [])
    useEffect(() => {
      if (store_uuid && branch_uuid ) {
        fetchItemByCategoryRes()
        fetchTopData()
        }   
  }, [store_uuid,dayQuery])
  console.log("topItemByCategory",topItemByCategory)
  console.log("categoryList",categoryList)

  

   
    let topSortedRevenue = topData?.top_product ? [...topData?.top_product] :[]
    topSortedRevenue.sort((a, b) => b.total_sell_price - a.total_sell_price ) 

    let topProfit = topData?.top_product ? [...topData?.top_product] :[]
    topProfit.sort((a, b) => b.total_sell_price - a.total_sell_price ) 

    let topBestSeller = topData?.top_product ? [...topData?.top_product] :[]
    topBestSeller.sort((a, b) => b.total_quantity - a.total_quantity ) 

    var dataRevenue= {   
      series: [{
        name: 'Tổng doanh thu',
        data: topSortedRevenue ? topSortedRevenue.map((item) =>item.total_sell_price).slice(0, limit.revenue) :[],
      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories:  topSortedRevenue ? topSortedRevenue.map((item) =>item.name).slice(0, limit.revenue) :[],
        }
      }
    };

    //          
    var dataProfit= {   
      series: [{
        name: 'Tổng lợi nhuận',
        data: topData?.top_product ? topData?.top_product.map((item) =>item.total_quantity).slice(0, limit.profit) :[]
      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories:   topData?.top_product ? topData?.top_product.map((item) =>item.name).slice(0, limit.profit) :[],
        }
      },
    };
           

    var dataBestSeller= {   
      series: [{
        name: 'Số lượng bán',
        data: topBestSeller ? topBestSeller.map((item) =>item.total_quantity).slice(0, limit.bestSeller) :[]

      }],
      options: {
        ...data.options,
        xaxis:{
          ...data.options.xaxis,
          categories: topBestSeller ? topBestSeller.map((item) =>item.name).slice(0, limit.bestSeller) :[],
        }
      },
      
    };

    const categoryData = {
      value:[20, 30, 10, 15, 15],
      title:["Quần áo", "Giày dép", "Mắt kính", 'Túi xách', "Trang sức"]
    }

    const dataCategory = {
      type:"donut",
      // DATA HERE : value
      series: categoryData.value,
      
      options: {
         // DATA HERE : name
        labels: categoryData.title,
        chart: {
          type: 'donut',
        },
        colors:['#06C9D6','#FFC90C', '#E56A75','#00C292','#FB9677','#ff007d','#9c4afb','#b6fb4a','#4afbe8'],
        // colors:[ '#00e5ff','#FFC90C', '#ff007d','#00C292','#FB9677','#E56A75',],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 50
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }

  
    const sumAllValue = categoryData.value.reduce((a, b) => a + b, 0)
    const [type,setType] = useState("revenue")
  return (
    <Card className={classes.root}>
    {/* 1. */}
    <ReportCard  title={"Báo cáo sản phẩm"} 
    ToolBar={
      <ListItem  style={{margin:0, padding:0}}>
        <TreeSelect
          id="category"
          name="category"  
          style={{ width: 220}}   
          dropdownStyle={{ maxHeight: 400, overflow: 'auto',zIndex:100000000  }}
          treeData={categoryList}
          value={categoryId}
          onChange={(val)=>setCategoryId(val )}
          treeDefaultExpandAll
          placeholder="Tất cả danh mục"
          
        />
        {branches?.length === 1?null: <BranchSelect selectedBranches={selectedBranches} setSelectedBranches={setSelectedBranches}/>}
        <DayReportSelect dayQuery={dayQuery} setDayQuery={setDayQuery}/>
      </ListItem>
      }
    />

      <Grid container spacing={3} style={{marginTop:10}}> 
        <Grid   item md={6} xs={12} >
            <ReportCard  limitTitle={`Top ${limit.revenue}`}  typeTitle={'doanh thu'}  ToolBar={<TopSelect name="revenue" handleChangeLimit={handleChangeLimit} limit={limit.revenue} />} > 
                <ReactApexChart options={dataRevenue.options} series={dataRevenue.series} type="bar" height={350} />
            </ReportCard>
        </Grid>
        <Grid  item md={6} xs={12} > 
            <ReportCard   limitTitle={`Top ${limit.profit}`}  typeTitle={'lợi nhuận'}   ToolBar={<TopSelect name="profit" handleChangeLimit={handleChangeLimit} limit={limit.profit} />} > 
                <ReactApexChart options={dataProfit.options} series={dataProfit.series} type="bar" height={350} />
            </ReportCard>
        </Grid>
    </Grid>

    <ReportCard  limitTitle={`Top ${limit.bestSeller}`}  typeTitle={'bán chạy'}   ToolBar={<TopSelect name="bestSeller" handleChangeLimit={handleChangeLimit} limit={limit.bestSeller} />} > 
        <ReactApexChart options={dataBestSeller.options} series={dataBestSeller.series} type="bar" height={350} />
    </ReportCard>

    <ReportCard  title={"Danh mục"}  ToolBar={<TypeReportSelect  type={type} handleChangeType={(e)=>setType(e.target.value)} title={title} />} > 
          <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item xs={6}>
                <Chart {...dataCategory}/> 
              </Grid>
              
              <Grid item xs={6}>  
              {categoryData.value?.map((value,index)=>{
                  return(
                  <Box key={index}style={{marginBottom:10}}>
                    <Grid container justifyContent='space-between' alignItems='center' style={{marginBottom:10}} >
                        <Grid item xs={4}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{index + 1}</Typography></Grid>
                        <Grid item xs={4}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{categoryData.title[index]}</Typography></Grid>
                        <Grid item xs={4}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{value}{` / `}{(Number(value) / Number(sumAllValue)*100).toFixed(2)}%</Typography></Grid>
                    </Grid>
                    <Divider />
                  </Box>
                  )
              })} 
              </Grid>
          </Grid>
          
    </ReportCard>



      
    <DetailStatisticProduct data={topData.top_product}/>
    

</Card>
  )

}
export default ProductStatistics
const title = ["Bán chạy", " doanh thu"," lợi nhuận" ]

const DetailStatisticCategory = () =>{

}
const DetailStatisticProduct = (props) =>{

  const {data} = props
  const theme = useTheme();
  const classes = useStyles(theme);
  const [productData , setProductData] = useState(data? data:[])

  useEffect(() => {
    setProductData(data)
}, [data])

  function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  const [type,setType] = useState("best-seller")

  const handleChangeType = (e)  =>{
    setType(e.target.value)
    console.log("e.target.value",e.target.value)
    if(e.target.value.includes("best-seller")){
      setProductData( productData.sort((a, b) => b.total_quantity - a.total_quantity ) )
    }else if (e.target.value.includes("revenue")) {
      setProductData( productData.sort((a, b) => b.total_sell_price - a.total_sell_price ) )
    }else{
      setProductData( productData.sort((a, b) => b.total_sell_price - a.total_sell_price ) )
    }
  }
  return(
    <ReportCard  title={`Báo cáo chi tiết`}  
        ToolBar={
          <ListItem style={{padding:0, margin:0}}>
          <TypeReportSelect  type={type} handleChangeType={handleChangeType} label="Sắp xếp theo" title={title}/>
          
          <TextField  style={{  marginLeft: 10 }}  variant="outlined"    placeholder={"Tìm sản phẩm..."} 
              InputProps={{ 
                startAdornment: (  <InputAdornment position="start">  <SearchTwoToneIcon className={classes.icon} /> </InputAdornment> ),
                endAdornment: (<InputAdornment position="end">  <Box   component="img"    sx={{ height: 23, width: 23 }}  src={barcodeIcon} />  </InputAdornment> ),
                className: classes.search,
              }}
              onChange={(e)=>{
                console.log('e')
                if(e.target.value.length === 0 ) { setProductData(data)}
                else{
                  let newProductData = productData.length !== 0 ?[...data]:[]
                  newProductData = newProductData.filter(item  => removeAccents(item.name.toUpperCase()).includes(removeAccents(e.target.value).toUpperCase()))
                  setProductData(newProductData)
                }
              }}
          
            />
            </ListItem>
        } > 
        <Grid container justifyContent='space-between' alignItems='center'  >
            <Grid item xs={4}><Typography style={{color:"#000",fontSize:17,fontWeight:500,}}>Sản phẩm</Typography></Grid>
            <Grid item xs={2}><Typography style={{ color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>SL bán</Typography></Grid>
            <Grid item xs={2}><Typography style={{color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>Doanh thu</Typography></Grid>
            <Grid item xs={2}><Typography style={{color:"#000",fontSize:17,fontWeight:500,textAlign:"center"}}>Tổng lợi nhuận</Typography></Grid>
        </Grid>

        <Divider style={{marginTop:15, marginBottom:10}} />
        {productData?.map((item)=>{
            return(
            <Box key={item.uuid}style={{marginBottom:10}}>
            <Grid container justifyContent='space-between' alignItems='center' style={{marginBottom:10}} >
               <Grid item xs={4}>
                  <Box style={{}}>
                      <ListItem style={{ margin:0, padding:0 }}  >
                          <Box  component="img"  sx={{ height: 50, width: 50, borderRadius: 10, marginRight: 15 }}  src={item.url ?item.url :defaultProduct } />
                          <Typography style={{color:"#000", fontSize:16, fontWeight:500}} >{item.name}</Typography>
                      </ListItem>
                  </Box>
                </Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{item.total_quantity ? item.total_quantity.toLocaleString() :0}</Typography></Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>{ item.total_sell_price ? item.total_sell_price.toLocaleString() :0}</Typography></Grid>
                <Grid item xs={2}><Typography style={{color:"#000", fontSize:16,textAlign:"center"}}>Tổng lợi nhuận</Typography></Grid>
            </Grid>
            <Divider />
            </Box>
            )
        })}
     </ReportCard>
  )
}


const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      borderRadius: theme.customization.borderRadius,
      height: 40,
      marginLeft: 10,
      backgroundColor:
        theme.customization.mode === "Light" ? grey[50] : grey[700],
    },
    root:{
      background: theme.customization.mode === "Light"? '#fafbfb': grey[800],
      borderRadius:theme.customization.borderRadius, color: '#000000',  color: '#fafbfb',boxShadow: "none", padding:20, // paddingRight:10, // paddingLeft:20,
      margin:-20
    }
  
}));


var data = {
  options: {
    chart: { type: 'bar', minHeight: 350 },
    plotOptions: { bar: { borderRadius: 4, horizontal: true,  }},
    dataLabels: { enabled: false},
    xaxis: { 
      labels: { 
        formatter: function (value) { return  value >= 1000000? (value/1000000).toFixed().toLocaleString() +' triệu': value >= 1000 ? (value/1000).toFixed().toLocaleString() +'k' :value},
        style: {colors: ['#000'], fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500, cssClass: 'apexcharts-xaxis-label',  }, 
      }, 
    },
    yaxis: {
      labels: { 
        formatter: function (value) { return value.toLocaleString() ;  },
        style: {colors: ['#000'], fontSize: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 500, cssClass: 'apexcharts-xaxis-label',  }, 
      },
    },
  },
}