import React from 'react'
import {Typography,Divider,IconButton,Grid,Popover,Box,TextField,ButtonBase,InputAdornment,ButtonGroup,Button,Tooltip} from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import SwapVertTwoToneIcon from '@material-ui/icons/SwapVertTwoTone';
import {useTheme, makeStyles,createStyles} from "@material-ui/core/styles";
import { useStyles } from '../style';


const ScheduleHead = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Grid container direction="row" justifyContent="space-between">
                <TextField  
                    variant="outlined" 
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchTwoToneIcon className={classes.icon}/>
                        </InputAdornment>
                        ),
                        className:classes.search
                    }}
                /> 
                <Box>
                    <Typography className={classes.headerTitle} variant="h2">
                        Ca làm việc
                    </Typography>
                    <Typography className={classes.textTitle} variant="body2">
                        ( Chi nhánh trung tâm )
                    </Typography> 
                </Box>
                
                <Box>
                    <Tooltip title="In">
                        <IconButton aria-label="filter list" style={{height:50, marginTop:5}}>
                            <PrintTwoToneIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Đổi chi nhánh">
                        <IconButton aria-label="filter list" style={{height:50, marginTop:5}}>
                            <SwapVertTwoToneIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Grid>
    )
}

export default ScheduleHead