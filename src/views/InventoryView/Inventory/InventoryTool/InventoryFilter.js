import React from 'react'
import {
  Drawer,TextField, Typography,Button,Grid,MenuItem,Select,InputLabel,FormControl
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import {ThousandSeperatedInput} from '../../../../components/TextField/NumberFormatCustom'
import VNDInput from '../../../../components/TextField/NumberFormatCustom'


const drawerWidth = 300;
const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    
    drawerPaper: {
      width: drawerWidth,
      padding:15
    },
    textField:{marginBottom:10},
    text:{marginBottom:10,marginTop:15}
  })
);
const InventoryFilter = (props) => {
    const {handleToggleFilter,openFilter} =props;

    const theme = useTheme();
    const classes = useStyles(theme);

    return (
    <Drawer
        anchor="right"
        onClose={handleToggleFilter}
        open={openFilter}
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
      >

      {/* 1. Danh muc  */}
      <Typography variant="h5"className={classes.text} >Danh mục:</Typography>


      {/* 2. Tien von from-to */}
      <Typography variant="h5"className={classes.text} >Giá vốn:</Typography>
      <VNDInput  label="Từ" variant="outlined" fullWidth size="small" className={classes.textField}
        //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />
      <VNDInput  label="Đến" variant="outlined" fullWidth size="small" className={classes.textField}
      //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />

      {/* 2. Tien ban from-to */}
      <Typography variant="h5"className={classes.text} >Giá bán:</Typography>
      <VNDInput  label="Từ" variant="outlined" fullWidth size="small" className={classes.textField}
        //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />
      <VNDInput  label="Đến" variant="outlined" fullWidth size="small" className={classes.textField}
      //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />

      {/* 4. Tồn kho from-to */} 
      <Typography variant="h5"className={classes.text} >Tồn kho:</Typography>
      <ThousandSeperatedInput  label="Từ" variant="outlined" fullWidth size="small" className={classes.textField}
        //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />
      <ThousandSeperatedInput  label="Đến" variant="outlined" fullWidth size="small" className={classes.textField}
      //  value={productInfo.importedPrice}
        // onChange={(e) =>
        //   setProductInfo({
        //     ...productInfo,
        //     importedPrice: e.target.value,
        //   })
        // }
      />


      {/* 5. Tinh trang ton kho : còn hang het hang */} 
      <Typography variant="h5"className={classes.text} >Tình trạng:</Typography>
      <FormControl
          className={classes.formControl}
          fullWidth
          size="small"
          variant="outlined"
        >
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        size="small"
        // onChange={(event) => { setGender(event.target.value) }}
        // label=" Chi nhánh"
        // value={gender}
      >
        <MenuItem value="trungtam">Đã hết</MenuItem>
        <MenuItem value="q1">Sắp hết</MenuItem>
        <MenuItem value="q1">Còn hàng</MenuItem>
      </Select>
      </FormControl>

      {/* 6. Ngày tao ? */}
      <Typography variant="h5"className={classes.text} >Ngày bán:</Typography>
      <TextField id="date" label="Từ" type="date"  defaultValue=""  variant="outlined" size="small" fullWidth className={classes.textField} InputLabelProps={{ shrink: true }} // value={dateOfBirth} // onChange={(event) => setDateOfBirth(event.target.value)}
      />
       <TextField id="date" label="Đến" type="date"  defaultValue=""  variant="outlined" size="small" fullWidth className={classes.textField} InputLabelProps={{ shrink: true }} // value={dateOfBirth} // onChange={(event) => setDateOfBirth(event.target.value)}
      />

      {/* Ngung kinh doanh ? */}

       {/* BUTTON */}
       <Button variant="contained"  color="primary" style={{marginTop:30}}>
           Lọc
      </Button>
          


          
    </Drawer>
    )
}

export default InventoryFilter

