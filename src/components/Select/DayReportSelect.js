import React ,{useState}from 'react'
import {useTheme} from "@material-ui/core/styles";
import {MenuItem,FormControl,Dialog,Select,Paper,InputLabel, Box,Modal,Button,ListSubheader} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import { Typography } from 'antd';
const DayReportSelect = ({dayQuery,setDayQuery}) => {
    const { RangePicker } = DatePicker;

    const [openPopUp, setOpenPopUp] = useState(false)
    const [day, setDay] = useState("7day")
    const  handleChangeDay = (e) =>{
       let today = new Date()
       var toDate = new Date()
       var fromDate =new Date()
       if(!e.target.value ){
        console.log("hello")
        return 
       }
       if(e.target.value === "today") { fromDate = fromDate.toISOString().split('T')[0] }
       else if(e.target.value === "7day"){  fromDate = new Date(fromDate.setDate(fromDate.getDate() - 7 +1)).toISOString().split('T')[0] ;toDate = toDate.toISOString().split('T')[0]}
       else if(e.target.value === "30day"){  fromDate = new Date(fromDate.setDate(fromDate.getDate() - 30 + 1)).toISOString().split('T')[0] ;toDate = toDate.toISOString().split('T')[0] }
       else if(e.target.value === "365day"){ fromDate = new Date(fromDate.setDate(fromDate.getDate() - 365 +1)).toISOString().split('T')[0];toDate = toDate.toISOString().split('T')[0] }
      

      else if(e.target.value === "yesterday"){  fromDate = new Date(fromDate.setDate(fromDate.getDate() -1 )).toISOString().split('T')[0] ; toDate = fromDate}
      else if(e.target.value === "this_month"){  fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 2).toISOString().split('T')[0] ;toDate = new Date(toDate.getFullYear(), toDate.getMonth()+1, 1).toISOString().split('T')[0]}
      else if(e.target.value === "this_year"){  fromDate = new Date(fromDate.getFullYear()-1, 11 , 31 +2).toISOString().split('T')[0];toDate =  new Date(toDate.getFullYear(), 11 , 31 +1).toISOString().split('T')[0] }

      // 

      else if(e.target.value === "previous_month"){  fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth()-1, 2).toISOString().split('T')[0] ;toDate = new Date(toDate.getFullYear(), toDate.getMonth(), 1).toISOString().split('T')[0]}
      else if(e.target.value === "previous_year"){  fromDate = new Date(fromDate.getFullYear()-2, 11 , 31 +2).toISOString().split('T')[0];toDate =  new Date(toDate.getFullYear()-1, 11 , 31 +1).toISOString().split('T')[0] }

      else if(e.target.value === "this_week"){  
        const first = today.getDate() - today.getDay() + 1;
        fromDate = new Date(fromDate.setDate(first)).toISOString().split('T')[0];toDate =  new Date(toDate.setDate(first+6)).toISOString().split('T')[0] 
       }
      else if(e.target.value === "previous_week"){  
        const first = today.getDate() - today.getDay() -7 + 1;
        fromDate = new Date(fromDate.setDate(first)).toISOString().split('T')[0];toDate =  new Date(toDate.setDate(first+6)).toISOString().split('T')[0] 
      }
       setDayQuery({  fromDate:fromDate, toDate: toDate})
       setDay(e.target.value)
   }
   const dateFormat = 'YYYY/MM/DD';
   console.log()
   let currentDate = new Date().toISOString().split('T')[0]
   const [choosenDate,setChoosenDate] = useState([currentDate, currentDate]) 
   console.log("choosenDate",choosenDate)
  return (
    <Box style={{marginLeft:10}}>
        <FormControl  size="small" variant="outlined" >
            {/* <Select size="small"   defaultValue="7day"  onChange={handleChangeDay}  value={day} >
                    <MenuItem value="today">Hôm nay</MenuItem>
                    <MenuItem value="7day">7 ngày gần nhất</MenuItem>
                    <MenuItem value="30day">30 ngày gần nhất</MenuItem>
                    <MenuItem value="365day">365 ngày gần nhất</MenuItem>
                    <MenuItem value="advance" onClick={()=>setOpenPopUp(true)}>Tuỳ chọn ...</MenuItem>  
            </Select> */}
            {day.length ===0?
             <InputLabel >{` Từ `}{choosenDate[0].split('-').reverse().join('/')} {` đến `}{choosenDate[1].split('-').reverse().join('/')}</InputLabel>:
             <InputLabel >{'Thời gian '}</InputLabel>}
            <Select size="small"   defaultValue="7day"  onChange={handleChangeDay}  value={day} 
                placeholder="hello"  style={{minWidth:day.length ===0?250:null}}
                label= {day.length ===0? choosenDate[0].concat(choosenDate[1]).concat(`spaceshere`):'Thời gian'}
            >
                    <ListSubheader style={{color:'#000', marginBottom:-15}} >Ngày</ListSubheader>
                    <MenuItem value="today">Hôm nay</MenuItem>
                    <MenuItem value="yesterday">Hôm qua</MenuItem>

                    <ListSubheader style={{color:'#000', marginBottom:-15, marginTop:-10}} >Tuần</ListSubheader>
                    <MenuItem value="7day">7 ngày gần nhất</MenuItem>
                    <MenuItem value="this_week">Tuần này</MenuItem>
                    <MenuItem value="previous_week">Tuần trước</MenuItem>

                    <ListSubheader style={{color:'#000', marginBottom:-15, marginTop:-10}} >Tháng</ListSubheader>
                    <MenuItem value="30day">30 ngày gần nhất</MenuItem>
                    <MenuItem value="this_month">Tháng này</MenuItem>
                    <MenuItem value="previous_month">Tháng trước</MenuItem>

                    
                    <ListSubheader style={{color:'#000', marginBottom:-15, marginTop:-10}} >Năm</ListSubheader>
                    <MenuItem value="365day">365 ngày gần nhất</MenuItem>
                    <MenuItem value="this_year">Năm nay</MenuItem>
                    <MenuItem value="previous_year">Năm trước</MenuItem>
                    <ListSubheader style={{color:'blue', marginBottom:-15, marginTop:-10}} onClick={()=>{setOpenPopUp(true)} }>Tuỳ chọn ngày...</ListSubheader>
                    {/* <MenuItem value="">{` Từ `}{choosenDate[0].split('/').reverse().join('/')} {` đến `}{choosenDate[1].split('/').reverse().join('/')}</MenuItem> */}
                    <MenuItem value="">
                      {/* <em>None</em> */}
                    </MenuItem>

            </Select>

        </FormControl>
          <ChooseDateDialog day={day} openPopUp={openPopUp} setDay={setDay} setOpenPopUp={setOpenPopUp} setDayQuery={setDayQuery} setChoosenDate={setChoosenDate} choosenDate={choosenDate}/>
    </Box>
  )
}

export default DayReportSelect

const ChooseDateDialog = ({openPopUp,day,setDay,setOpenPopUp,setDayQuery, choosenDate,setChoosenDate}) =>{
  const dateFormat = 'YYYY/MM/DD';
  console.log("day",day)
  const { RangePicker } = DatePicker;

  return(
    <Dialog open={openPopUp} onClose={()=>{setOpenPopUp(false) ;}}  >
    <Paper style={{padding:20}}>
      <Typography style={{color:'#000', fontSize:22, fontWeight:500, marginBottom:20}}>Chọn ngày</Typography>
      <Box>
          <RangePicker
            popupStyle={{zIndex:1000000}}
            defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
            format={dateFormat}
            onChange={(date,dateString)=>setChoosenDate(dateString )}
          />
      </Box>
      <Button variant='contained' color='primary'  style={{marginTop:20, width:250}}
      onClick={()=>{
        setDayQuery({  fromDate:choosenDate[0], toDate: choosenDate[1]})
        setDay('')
        setOpenPopUp(false)
      }}
      > Xác nhận </Button>
      </Paper>
  </Dialog> 
  )
}