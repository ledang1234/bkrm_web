import React from 'react'
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
    Paper,
    ListItem,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Table
  } from "@material-ui/core";
import TableHeader from "../../../../components/TableCommon/TableHeader/TableHeader"
import useStyles from "../../../../components/TableCommon/style/mainViewStyle";
import SearchBar from "../../../../components/SearchBar/SearchBar"
const DebtHistory = ({open,onClose}) => {
const classes = useStyles()
    const debtHistory = [
        {creation_date: "22/12/2008 22:12", customer_name:"ANH VINH", customer_phone:"0938919001",value:100000},
        {creation_date: "22/12/2008 22:12", customer_name:"ANH VINH", customer_phone:"0938919001",value:100000},
        {creation_date: "22/12/2008 22:12", customer_name:"ANH VINH", customer_phone:"0938919001",value:100000}
    ]
  return (
    <Dialog open={open} onClose={onClose}  maxWidth="sm" fullWidth={true} >
        <Paper style={{padding:15}}>
            <Grid container justifyContent="space-between">
                <Grid item><Typography style={{marginBottom:20, marginTop:10 }}  variant="h2"> Lịch sử thu nợ  </Typography> </Grid>
                <Grid  item >
                    <ListItem style={{margin:0, padding:0}}>
                        <TextField id="startDate" label="Từ"  type="date"  name="startDate" variant="outlined" size="small" fullWidth   className={classes.textField}  InputLabelProps={{ shrink: true }} 
                            // value={formik.values.startDate.length === 0 ? current :formik.values.startDate} 
                            // onChange={formik.handleChange}
                        />
                        <TextField style={{marginLeft:5}} id="endDate" label="Đến" type="date" name="endDate" variant="outlined" size="small"  fullWidth className={classes.textField}   InputLabelProps={{ shrink: true }} 
                            // value={formik.values.endDate}  
                            // onChange={formik.handleChange}
                        />
                        <Button variant="contained" color="primary" size="small" style={{marginLeft:10}}>Lọc</Button>
                    </ListItem >
                </Grid>
            </Grid>
            <Grid container  justifyContent="flex-end" >
                <SearchBar title={"Tìm kiếm khách hàng ..."} style={{width:250,  marginBottom:20}}/>
             </Grid>
     
            <TableContainer style={{maxHeight: '64vh', minHeight:'60vh'}}>
                <Table size={ 'small' } >
                    <TableHeader
                        classes={classes}
                        order={debtHistory}
                        color="#000"
                        headerData={DebtHistoryHeadCells}
                    />
                    <TableBody>
                        {debtHistory.map((row, index) => {
                        return (
                            <TableRow>
                                <TableCell align="left" style={{color:'#000'}}> {row.creation_date?.split(" ")[0].split('-').reverse().join('/').concat("\u00a0\u00a0"+ row.creation_date?.split(" ")[1].substr(0, 5)) } </TableCell>
                                <TableCell align="left" style={{color:'#000'}} > {row.customer_name}  {row.customer_phone ? ` - ${row.customer_phone}` :null}</TableCell>
                                <TableCell align="right" style={{color:'#000'}} > {"Tiền thu nợ"} </TableCell>
                            </TableRow>
                        );
                        })}
                        
                    </TableBody>
                </Table>       
          </TableContainer>
        </Paper>
    </Dialog>
  )
}

export default DebtHistory

const DebtHistoryHeadCells = [
    { id: "date", align: "left", disablePadding: false, label: "Ngày thu" },
    { id: "customer", align: "left", disablePadding: false, label: "Khách hàng" },
    { id: "total", align: "right", disablePadding: false, label: "Tiền thu" },
]