import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as TableType from '../../../assets/constant/tableType'
const AddCategory = (props) =>{
const {handleClose} = props
  return (
    <div>
      <DialogTitle id="form-dialog-title">Danh mục</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Text
          </DialogContentText>
          <TextField
            autoFocus
            margin="daense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
    </div>
  );
}

export default AddCategory;