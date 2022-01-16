import {Chip} from '@material-ui/core';

export const FormatedStatus  = (props) => {
    if (props.debt === 0){
      return ( <Chip label="Trả đủ" color="#76ff03" variant="outlined"  style={{backgroundColor:'#76ff03',  fontWeight:500, marginLeft:-10, height:28}}>{"Trả đủ"} </Chip>)
    }
    else{
      return( <Chip label="Còn nợ" color="#ff3d00" variant="outlined"style={{backgroundColor:"#ff3d00" ,  fontWeight:500, marginLeft:-10, height:28} }>{"Trả đủ"} </Chip> )
    }
}
export const FormatedProductStatus  = (props) => {
  if (props.quantity === 0){
    return (<Chip label="Hết hàng" color="#ff007d" variant="outlined"  style={{backgroundColor:'#ff007d',  fontWeight:500, marginLeft:-10, height:28}}>{"Trả đủ"} </Chip>)
    //Gia tri low stock ??
  } else if (Number(props.quantity) <= props.lowStock){
    return( <Chip label="Sắp hết" color="#ffc02b" variant="outlined"style={{backgroundColor:"#ffc02b" ,  fontWeight:500, marginLeft:-10, height:28} }>{"Trả đủ"} </Chip>  )
  } else{
    return(  <Chip label="Còn hàng" color="#00ded7" variant="outlined"style={{backgroundColor:"#00ded7" ,  fontWeight:500, marginLeft:-10, height:28} }>{"Trả đủ"} </Chip> )
  }
  
}

export const FormatedStatusOrder  = (props) => {
  console.log(props.status)
  switch (props.status){
    case 0:
      return (<Chip label="Chờ chấp nhận" color="#ff007d" variant="outlined"  style={{backgroundColor:'#ff007d',  fontWeight:500, marginLeft:-10, height:28}}>{"Chờ chấp nhận"} </Chip>)   
    case 1:
      return (<Chip label="Chờ giao" color="#ffc02b" variant="outlined"  style={{backgroundColor:"#ffc02b" ,  fontWeight:500, marginLeft:-10, height:28}}>{"Chờ giao"} </Chip>)
    case 2: 
      return (<Chip label="Chưa giao đủ" color="#00ded7" variant="outlined"  style={{backgroundColor:"#00ded7",  fontWeight:500, marginLeft:-10, height:28}}>{"Chưa giao đủ"} </Chip>)
    case 3:
      return (<Chip label="Hoàn thành"color="#76ff03" variant="outlined"  style={{backgroundColor:'#76ff03',  fontWeight:500, marginLeft:-10, height:28}}>{"Hoàn thành"} </Chip>)
    default:
      return (<Chip label="Chờ" color="#ff007d" variant="outlined"  style={{backgroundColor:'#ff007d',  fontWeight:500, marginLeft:-10, height:28}}>{"Chờ chấp nhận"} </Chip>)

  }
}

export const FormatedStatusCheck  = (props) => {
  if (props.status === 0){
    return ( <Chip label="Cân bằng" color="#76ff03" variant="outlined"  style={{backgroundColor:'#76ff03',  fontWeight:500, marginLeft:-10, height:28}}>{"Cân bằng"} </Chip>)
  }
  else{
    return( <Chip label="Không cân bằng" color="#ff3d00" variant="outlined"style={{backgroundColor:"#ff3d00" ,  fontWeight:500, marginLeft:-10, height:28} }>{"Không cân bằng"} </Chip> )
  }
}