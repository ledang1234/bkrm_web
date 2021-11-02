import {Chip} from '@material-ui/core';

export const FormatedStatus  = (props) => {
    if (props.debt === 0){
      return ( <Chip label="Trả đủ" color="#76ff03" variant="outlined"  style={{backgroundColor:'#76ff03',  fontWeight:500, marginLeft:10, height:28}}>{"Trả đủ"} </Chip>)
    }
    else{
      return( <Chip label="Còn nợ" color="#ff3d00" variant="outlined"style={{backgroundColor:"#ff3d00" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip> )
    }
}
export const FormatedProductStatus  = (props) => {
  if (props.quantity === 0){
    return (<Chip label="Hết hàng" color="#ff007d" variant="outlined"  style={{backgroundColor:'#ff007d',  fontWeight:500, marginLeft:10, height:28}}>{"Trả đủ"} </Chip>)
    //Gia tri low stock ??
  } else if (props.quantity <=10){
    return( <Chip label="Sắp hết" color="#ffc02b" variant="outlined"style={{backgroundColor:"#ffc02b" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip>  )
  } else{
    return(  <Chip label="Còn hàng" color="#00ded7" variant="outlined"style={{backgroundColor:"#00ded7" ,  fontWeight:500, marginLeft:10, height:28} }>{"Trả đủ"} </Chip> )
  }
  
}
