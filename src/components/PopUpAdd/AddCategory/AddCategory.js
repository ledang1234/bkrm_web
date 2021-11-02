import React from 'react';

//import library
import {Button,TextField,DialogActions,DialogContent,Select,MenuItem,Divider,Typography,DialogTitle,Grid, Box,ListItem,List,IconButton} from '@material-ui/core';


// import icon 
import AddIcon from '@material-ui/icons/Add';

// import project
import CategoryTree from '../../CategoryTree/CategoryTree'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";

import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) =>
createStyles({
  headerTitle:{
    fontSize: '1.125rem'
  },

}));



const AddCategory = (props) =>{
  const {handleClose} = props;
  // tam thoi
  const statusState = "Success";

  const theme = useTheme();
  const classes = useStyles(theme);

   // loại lương
   const [isAdd, setIsAdd] = React.useState(false);

   const handleIsAdd = () => {
     setIsAdd(!isAdd);
   };

   const info = useSelector((state) => state.info);
   const store_uuid = info.store.uuid;

   
  return (
    <div>
      <DialogTitle id="form-dialog-title">
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Typography className={classes.headerTitle} variant="h5">
                 Danh mục
              </Typography>
              
              <IconButton aria-label="add"  color="primary" onClick={handleIsAdd}>
                  <AddIcon />
              </IconButton> 
          </Grid>
      </DialogTitle>
   

      <CategoryTree/>

      {isAdd ?
      
      <Box style={{margin:30,}}>
        <Divider style={{marginTop:20,marginBottom:20}}/>
        <TextField id="outlined-basic" label="Tên danh mục" variant="outlined" fullWidth size="small" style={{marginBottom:10}}/>

        <Select labelId="label" id="select" value="20" fullWidth variant="outlined" size="small">
          {/* <MenuItem value="10">Ten</MenuItem>
          <MenuItem value="20">Twenty</MenuItem> */}
          <CategoryTree/>
        </Select>

        
      </Box>
      :null}
      {isAdd?
      <DialogActions>
        <Button onClick={() => handleClose(null)} variant="contained" size="small" color="secondary">
          Huỷ
        </Button>
        <Button onClick={() => handleClose(statusState)} variant="contained" size="small" color="primary">
          Thêm 
        </Button>
      </DialogActions> 
      
      :null
      }

        
    </div>
  );
}

export default AddCategory;