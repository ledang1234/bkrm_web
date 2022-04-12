import React ,{useState}from 'react'
import {useTheme} from "@material-ui/core/styles";
import {MenuItem,FormControl,Select, Box,Modal,Button} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
const DayReportSelect = ({dayQuery,setDayQuery}) => {
    const subDays = require('date-fns/subDays')

    const [openPopUp, setOpenPopUp] = useState(false)
    const [day, setDay] = useState("7day")
   const  handleChangeDay = (e) =>{
       let today = new Date()
       let fromDate = ""
     
       if(e.target.value === "today") { fromDate = today.toISOString().split('T')[0] }
       else if(e.target.value === "7day"){  fromDate = new Date(today.setDate(today.getDate() - 7 +1)).toISOString().split('T')[0] }
       else if(e.target.value === "30day"){  fromDate = new Date(today.setDate(today.getDate() - 30+1)).toISOString().split('T')[0]  }
       else if(e.target.value === "365day"){ fromDate = new Date(today.setDate(today.getDate() - 365 +1)).toISOString().split('T')[0] }
       console.log("fromDate",fromDate)
       console.log("toDate",today.toISOString().split('T')[0])
       setDayQuery({  fromDate:fromDate, toDate: new Date().toISOString().split('T')[0]})
       setDay(e.target.value)
   }

  return (
    <Box style={{marginLeft:10}}>
        <FormControl  size="small" variant="outlined" >
            <Select size="small"   defaultValue="7day"  onChange={handleChangeDay}  value={day} >
                    <MenuItem value="today">Hôm nay</MenuItem>
                    <MenuItem value="7day">7 ngày gần nhất</MenuItem>
                    <MenuItem value="30day">30 ngày gần nhất</MenuItem>
                    <MenuItem value="365day">365 ngày gần nhất</MenuItem>
                    <MenuItem value="advance" onClick={()=>setOpenPopUp(true)}>Tuỳ chọn ...</MenuItem>  
            </Select>
        </FormControl>
        <Modal open={openPopUp} onClose={()=>setOpenPopUp(false)}>
            
        </Modal>
    </Box>
  )
}

export default DayReportSelect