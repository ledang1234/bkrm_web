import React, {useRef} from 'react';

import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

// import library
import { Typography,Card, Button,Divider ,Grid,ButtonBase,Avatar,Tooltip} from '@material-ui/core';
import { grey} from '@material-ui/core/colors'

//import thitd-party
import { useReactToPrint } from 'react-to-print';

//import project
import ToolBar from './ToolBar/ToolBar'
import PopUpAdd from '../PopUpAdd/PopUpAdd'
import MyTable from './Table/Table'
import AddIcon from '@material-ui/icons/Add';
import * as TableType from '../../assets/constant/tableType'


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
                    
                           <Button variant="outlined" color="primary"  
                          className={classes.button}
                          onClick={handleClickOpen}
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

       <MyTable rows={this.state.dataTable} headerData={this.state.headerData} tableType={this.state.tableType} />
    );
  }
}
