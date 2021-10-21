import React, {useRef} from 'react';
import { useReactToPrint } from 'react-to-print';

// material-ui
import { Typography,Card,CardContent, CardHeader, Divider ,Button,ListItem,Grid,IconButton,ButtonBase,Avatar} from '@material-ui/core';
import {useTheme, makeStyles,createStyles,withStyles} from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
//import project
// import TableView from './Test/TableView'
import TableTest from './Test/TableTest'
import ToolBar from './ToolBar/ToolBar'
import Test from './Table/Table'
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { grey, pink, blue} from '@material-ui/core/colors'
import ReactToPrint from "react-to-print";
import Tooltip from '@material-ui/core/Tooltip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import * as TableType from '../../assets/constant/tableType'

import PopUpAdd from '../PopUpAdd/PopUpAdd'
// import AddCustomer from '../PopUpAdd/AddCustomer/AddCustomer'
// import AddEmployee from '../PopUpAdd/AddEmployee/AddEmployee'
// import AddInventory from '../PopUpAdd/AddInventory/AddInventory'
// import AddSupplier from '../PopUpAdd/AddSupplier/AddSupplier'
// import AddCategory from '../PopUpAdd/AddCategory/AddCategory'

//= =============================|| SAMPLE PAGE ||==============================//
const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    // backgroundColor: theme.palette.background,
    background: theme.customization.mode == "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
  },
 
  headerTitle:{
    padding: '24px',
    fontSize: '1.125rem'
  },
  table:{
    // paddingLeft:20,
    // paddingRight:20,
    width:"100%",
  },
  button: {
    margin: theme.spacing(1),
    paddingRight:-10
  },
  addbtn:{
    // backgroundColor:'#f50057'
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .05s ease-in-out',
    //Chỉnh lai hop voi dark mode sau
   // background:theme.customization.primaryColor === grey? blue[500] : theme.palette.primary.main ,
    background:theme.palette.primary.main ,

    '&:hover': {
        // background:theme.customization.primaryColor === grey? blue[300] :  theme.customization.primaryColor[400],
        background: theme.customization.primaryColor[400],
    },

},
menuBtn:{
    // background:theme.palette.secondary.main,
    // '&:hover': {
    //   background: theme.customization.secondaryColor[100],
    // }
    // background:theme.palette.secondary.main,
    // '&:hover': {
    //   background: theme.customization.secondaryColor[100],
    // }
},
btngroup:{
  marginRight:20,
  marginTop:10
},
btngroup1:{
  marginRight:20,
  marginTop:20
}

})
);


const TableWrapper = (props) => {
    const {title, dataTable, headerData ,tableType} =props;

    const theme = useTheme();
    const classes = useStyles(theme);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
   

   return ( 

      <Card className={classes.root} >
          <Grid 
            container
            direction="row"
            justifyContent="space-between"
           
          > 
              <Typography className={classes.headerTitle} variant="h5">
                {title}
              </Typography>
            
              {tableType === TableType.INVENTORY ? 
                  <Grid className={classes.btngroup} >
                      <Tooltip title="Xem danh mục">
                          {/* <ColorButton variant="contained" className={classes.menuBtn}  
                          //  startIcon={<ListIcon />} 
                          className={classes.button}
                          onClick={handleClickOpen}
                          >
                         
                              Danh mục
                          </ColorButton>      */}
                           <ColorButton variant="outlined" color="primary" className={classes.menuBtn}  
                          //  startIcon={<ListIcon />} 
                          className={classes.button}
                          onClick={handleClickOpen}
                          >
                         
                              Danh mục
                          </ColorButton> 
                    </Tooltip> 

                      <ButtonBase sx={{ borderRadius: '16px' }} onClick={handleClickOpen}>
                          <Avatar variant="rounded" className={classes.headerAvatar}  >
                            <Tooltip title="Thêm sản phẩm">
                              <AddIcon stroke={1.5} size="1.3rem" />
                              </Tooltip>
                          </Avatar>
                      </ButtonBase>
                  </Grid>
              : null}
            {tableType !== TableType.INVENTORY && tableType !== TableType.INVENTORY_RETURN && tableType !== TableType.INVOICE_RETURN? 
                  <Grid className={classes.btngroup1} >
                      <ButtonBase sx={{ borderRadius: '16px' }} 
                      onClick={tableType !== TableType.INVENTORY_ORDER  && tableType !== TableType.INVOICE ? 
                        handleClickOpen : null}
                      
                      >
                          <Avatar variant="rounded" className={classes.headerAvatar}  >
                            <Tooltip title={returnNameToolTip(tableType)}>
                              <AddIcon stroke={1.5} size="1.3rem" />
                              </Tooltip>
                          </Avatar>
                      </ButtonBase>
                  </Grid>
              : null}
              
            
        </Grid>
        
        <PopUpAdd open={open} handleClose={handleClose} tableType={tableType}/>
            <Divider />

            
            {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
            <ToolBar rows={dataTable} data={dataTable} tableType={tableType} handlePrint={handlePrint}/>
           

        {/* <Test rows={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} /> */}


        {/* CHinhr lai in table day du cac trang vs ko có in phần phía dưới */}
        <ComponentToPrint dataTable={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} />
            

    </Card>
    )
        

};

export default TableWrapper;


function returnNameToolTip(type){
  switch(type){
    case TableType.INVENTORY_ORDER:
      return "Nhập hàng"
    case TableType.INVENTORY_RETURN:
        return ""
    case TableType.SUPPLIER:
      return  "Thêm nhà cung cấp"
    case TableType.INVOICE:
        return  "Thêm hoá đơn"
    case TableType.INVOICE_RETURN:
        return  ""
    case TableType.EMPLOYEE:
        return  "Thêm nhân viên"
    case TableType.CUSTOMER:
        return "Thêm khách hàng"
    default:
      return ""

  }
}

const ColorButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(theme.palette.secondary.main),
    // // backgroundColor:theme.palette.secondary.main,
    // backgroundColor:theme.palette.secondary.main,
    // '&:hover': {
    //   background: theme.customization.secondaryColor[300],
    // }
  },
}))(Button);


class ComponentToPrint extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      dataTable :[],
      headerData:[],
      tableType :[]
    }

  }
 
  componentDidMount() {
    const { dataTable,headerData,tableType} = this.props;
    this.setState({ dataTable,headerData,tableType});
  }
  render() {
    return (

       <Test rows={this.state.dataTable} headerData={this.state.headerData} tableType={this.state.tableType} />
    );
  }
}






// function createData(name, calories, fat, carbs, protein, history) {
//   return { name, calories, fat, carbs, protein,history };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3, [{ date: '2020-01-05', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Donut', 452, 25.0, 51, 4.9,[{ date: '2020-01-06', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Eclair', 262, 16.0, 24, 6.0,[{ date: '2020-01-07', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, [{ date: '2020-01-08', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Gingerbread', 356, 16.0, 49, 3.9,[{ date: '2020-01-09', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Honeycomb', 408, 3.2, 87, 6.5 ,[{ date: '2020-01-10', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, [{ date: '2020-01-11', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0,[{ date: '2020-01-12', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('KitKat', 518, 26.0, 65, 7.0, [{ date: '2020-01-13', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Lollipop', 392, 0.2, 98, 0.0, [{ date: '2020-01-14', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Marshmallow', 318, 0, 81, 2.0,[{ date: '2020-01-15', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Nougat', 360, 19.0, 9, 37.0, [{ date: '2020-01-16', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
//   createData('Oreo', 437, 18.0, 63, 4.0,[{ date: '2020-01-17', customerId: '11091700', amount: 3 },{ date: '2020-01-02', customerId: 'Anonymous', amount: 1 }]),
// ];

