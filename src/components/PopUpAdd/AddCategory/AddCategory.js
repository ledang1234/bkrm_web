import React from 'react';

//import project
import {Button,TextField,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';


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