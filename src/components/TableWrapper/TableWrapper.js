import React, {useRef} from 'react';

import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
// import redux
import { customizeAction } from "../../store/slice/customizeSlice";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import library
import { Typography,Card, Button,Divider ,Grid,ButtonBase,Avatar,Tooltip,Snackbar} from '@material-ui/core';
import { grey} from '@material-ui/core/colors'
import MuiAlert from '@material-ui/lab/Alert';

//import thitd-party
import { useReactToPrint } from 'react-to-print';

//import project
import ToolBar from './ToolBar/ToolBar'
import PopUpAdd from '../PopUpAdd/PopUpAdd'
import MyTable from './Table/Table'
import AddIcon from '@material-ui/icons/Add';
import * as TableType from '../../assets/constant/tableType'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    boxShadow: "none",
  },
 
  headerTitle:{
    padding: '24px',
    fontSize: '1.125rem'
  },
  table:{
    width:"100%",
  },
  button: {
    margin: theme.spacing(1),
    paddingRight:-10
  },

  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .05s ease-in-out',
    background:theme.palette.primary.main ,
    '&:hover': {
      background: theme.customization.primaryColor[400],
    },

},
  btngroup:{
    marginRight:20,
    marginTop:10
  },
  btngroup1:{
    marginRight:20,
    marginTop:20
  }

}));


const TableWrapper = (props) => {
    const {title, headerData ,tableType} =props;
    const dispatch = useDispatch();

    const [isCategory, setIsCategory] = React.useState(false);
    const [dataTable, setDataTable] = React.useState([]);
    const theme = useTheme();
    const classes = useStyles(theme);

    React.useEffect(() => {
      setDataTable(props.dataTable)
      console.log(props.dataTable)
    }, [props.dataTable])


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [open, setOpen] = React.useState(false);
    const [addStatus, setAddStatus] = React.useState(null);

    const [openBar, setOpenBar] = React.useState(false);

  
    const handleCloseBar = () => {
      setOpenBar(false)
     
    };

    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickOpenCategory = () => {
      setIsCategory(true);
      setOpen(true);
    };
    
    const handleClose = (status) => {
      setOpen(false);
      
      setAddStatus(status);
      if(status === "Success"){
        props.reload()
        setOpenBar(true);
      }   
      setIsCategory(false);   
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
                    
                        <Button variant="outlined" color="primary"  
                          className={classes.button}
                          onClick={handleClickOpenCategory}
                          >               
                              Danh mục
                          </Button> 
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
                      {tableType !== TableType.INVENTORY_ORDER  && tableType !== TableType.INVOICE ?
                        <ButtonBase sx={{ borderRadius: '16px' }} 
                        onClick={handleClickOpen}
                         >
                            <Avatar variant="rounded" className={classes.headerAvatar}  >
                              <Tooltip title={returnNameToolTip(tableType)}>
                                <AddIcon stroke={1.5} size="1.3rem" />
                                </Tooltip>
                            </Avatar>
                        </ButtonBase>
                        : 
                        <ButtonBase 
                            sx={{ borderRadius: '16px' }} 
                            onClick={()=>dispatch(customizeAction.setSidebarOpen(false))}
                            component={Link}
                            to={tableType === TableType.INVOICE ? '/home/sales/cart' :'/home/inventory/import'}
                         >
                            <Avatar variant="rounded" className={classes.headerAvatar}  >
                              <Tooltip title={returnNameToolTip(tableType)}>
                                <AddIcon stroke={1.5} size="1.3rem" />
                                </Tooltip>
                            </Avatar>
                        </ButtonBase>
                        }
                  </Grid>
              : null}
              
              
            
        </Grid>
        
        {isCategory ? 
        <PopUpAdd open={open} handleClose={handleClose} tableType={''}  />
        :<PopUpAdd open={open} handleClose={handleClose} tableType={tableType}/>
        }
        
        <Snackbar
            anchorOrigin={{ vertical: 'top',horizontal:  'right' }}
            open={openBar}
            onClose={handleCloseBar}
            autoHideDuration={2000} 
          >
            {addStatus === "Success" ? 
            <Alert onClose={handleClose} severity="success">
                Thêm thành công
            </Alert> 
            :  <Alert onClose={handleClose} severity="error">
                Thêm thất bại
            </Alert> }

          </Snackbar>
        
        <Divider />

            
        {/* SAU NÀY SỬA LẠI TRUYỀN DATA SAU KHI FILTER, SORT, LỌC CỘT VÀO */}
        <ToolBar rows={dataTable} data={dataTable} tableType={tableType} handlePrint={handlePrint}/>
        
       
        {/* CHinhr lai in table day du cac trang vs ko có in phần phía dưới */}
        <ComponentToPrint dataTable={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} />
         {/* <Test rows={dataTable} headerData={headerData} tableType={tableType} ref={componentRef} /> */}
         
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


/* Hải: tui sửa lại tại cái table ko tự refresh khi props.dataTable thay đổi*/
// class ComponentToPrint extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state ={
//       dataTable :[],
//       headerData:[],
//       tableType :[]
//     }

//   }
 
//   componentDidMount() {
//     const { dataTable,headerData,tableType} = this.props;
//     this.setState({ dataTable,headerData,tableType});
//   }
//   render() {
//     return (

//        <MyTable rows={this.state.dataTable} headerData={this.state.headerData} tableType={this.state.tableType} />
//     );
//   }
// }

function ComponentToPrint(props) {
  const [dataTable, setDataTable] = React.useState([]) 
  const [headerData, setHeaderData] = React.useState(props.headerData) 
  const [tableType, setTableType] = React.useState(props.tableType) 

  React.useEffect(() => {
    setDataTable(props.dataTable)
  }, [props.dataTable])

  return (
    <MyTable rows={dataTable} headerData={headerData} tableType={tableType} />
  )
}