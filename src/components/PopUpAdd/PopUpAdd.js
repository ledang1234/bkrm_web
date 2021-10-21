import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as TableType from '../../assets/constant/tableType'


import AddCustomer from './AddCustomer/AddCustomer'
import AddEmployee from './AddEmployee/AddEmployee'
import AddInventory from './AddInventory/AddInventory'
import AddSupplier from './AddSupplier/AddSupplier'
import AddCategory from './AddCategory/AddCategory'


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





