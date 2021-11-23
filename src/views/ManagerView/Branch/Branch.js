import React ,{useState}from 'react'
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import {Typography,Card ,Grid,ButtonBase,Tooltip} from '@material-ui/core';
import SnackBar from '../../../components/SnackBar/SnackBar'
import BranchMap from '../../../components/BranchMap/BranchMap'

import AddIcon from '@material-ui/icons/Add';
import AddBranch from './AddBranch/AddBranch';
import { grey} from '@material-ui/core/colors'

const useStyles = makeStyles((theme) =>
createStyles({
  root: {
    background: theme.customization.mode === "Light"? null: grey[800],
    borderRadius:theme.customization.borderRadius,
    color: '#000000',
    padding:18,
  },
  headerTitle:{
    flexGrow: 1,
    textAlign: "center",
    marginTop:10,
    marginLeft:40

  },
  addIcon:{
    background:theme.customization.secondaryColor[500],
    borderRadius:20,
    color:"#fff",
    
  },
  addBtn:{
    marginRight:10,
    marginTop:5
  }

}));

const Branch = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [reload, setReload] = useState(false);

    const onReload = () => setReload(!reload)

    //// 1. Add pop up + noti
    //add
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (status) => {
      setOpen(false);
      setAddStatus(status);
      if(status === "Success"){
        onReload();
        setOpenBar(true);
      }else if (status === "Fail"){
        setOpenBar(true);
      }
    };
    //status add
    const [addStatus, setAddStatus] = React.useState(null);
    
    //noti
    const [openBar, setOpenBar] = React.useState(false);
    const handleCloseBar = () => {
      setOpenBar(false)
    };

    return (
        <Card className={classes.root} >
            <Grid container direction="row" alignItems="center">
                <Typography className={classes.headerTitle} variant="h2">
                  Chi nhánh
                </Typography>
                <ButtonBase   className={classes.addBtn}  onClick={handleClickOpen}>
                    <Tooltip title='Thêm chi nhánh'>
                        <AddIcon  size="small" className={classes.addIcon} />
                    </Tooltip>
                </ButtonBase>

                <AddBranch open={open} handleClose={handleClose}  />
                <SnackBar openBar={openBar} handleCloseBar={handleCloseBar} addStatus={addStatus}/>

            </Grid>
            <BranchMap/>
        </Card>


    )
}

export default Branch
