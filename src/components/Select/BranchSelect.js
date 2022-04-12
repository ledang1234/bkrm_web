import React from 'react'
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Chip,
    Typography
  } from "@material-ui/core";
  import {useTheme, makeStyles,withStyles,createStyles,lighten} from "@material-ui/core/styles";

  import {useDispatch, useSelector} from 'react-redux';

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const BranchSelect = ({selectedBranches,setSelectedBranches}) => {
  const theme = useTheme();
    // const classes = useStyles(theme);

 const info = useSelector((state) => state.info);
    const store_uuid = info.store.uuid;
    const branches = info.store.branches
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    console.log("selectedBranches",selectedBranches)

  return (
    <Box style={{marginLeft:10}}>
    <FormControl  variant="outlined" size="small" sx={{ m: 1 }} fullWidth>
      <Select multiple   value={selectedBranches} onChange={(e)=>setSelectedBranches(e.target.value)}  MenuProps={MenuProps}
        // renderValue={(selected) => {
        //   // if(selected.length === branches.length ) { return <div >Tất cả chi nhánh</div>}
        //   if(false ) { return <div >Tất cả chi nhánh</div>}
        //   return (
        //     <div >
        //       {/* {selected.map((value, index) => {
        //         if(index === 0){return value.name }
        //         return " , " + value.name 
        //       })} */}
        //     </div>
        //     // <></>
        //   )  

        
        // }}
        renderValue={(selected) =>{ if(selected.length === branches.length) {return "Tất cả chi nhánh"} return  selected.map(((item, index) =>  index === 0 ? item.name : " , "+ item.name))}}
      >
        {branches?.map(branch => {
            return (<MenuItem  key={branch.id}value={branch} style={getStyles(branches, branch.name, theme)}>{branch.name}</MenuItem>)
        })}
    </Select>
  </FormControl>
  </Box>
  )
}

export default BranchSelect