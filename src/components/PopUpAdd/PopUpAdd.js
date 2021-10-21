import React from 'react';

//import library
import Dialog from '@material-ui/core/Dialog';



//import project
import AddCustomer from './AddCustomer/AddCustomer'
import AddEmployee from './AddEmployee/AddEmployee'
import AddInventory from './AddInventory/AddInventory'
import AddSupplier from './AddSupplier/AddSupplier'
import AddCategory from './AddCategory/AddCategory'
import * as TableType from '../../assets/constant/tableType'


const  AddView = (props) =>{
    const {handleClose,tableType} = props;
    switch(tableType){
      case TableType.INVENTORY:
        return <AddInventory  handleClose={handleClose}/>
      case TableType.SUPPLIER:
        return  <AddSupplier handleClose={handleClose}/>
      case TableType.EMPLOYEE:
          return  <AddEmployee handleClose={handleClose}/>
      case TableType.CUSTOMER:
          return  <AddCustomer handleClose={handleClose}/>
      default:
        return <AddCategory handleClose={handleClose}/>
    }
}
      

const PopUpAdd = (props) =>{
    const {open, handleClose,tableType} = props
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <AddView handleClose={handleClose} tableType={tableType}/> 
      </Dialog>
    </div>
  );
}

export default PopUpAdd;





