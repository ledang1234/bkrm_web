// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles,createStyles} from "@material-ui/core/styles";
// // material-ui
// import { useTheme } from '@material-ui/styles';
// import {
//     Drawer,
//     Fab,
//     FormControl,
//     FormControlLabel,
//     Grid,
//     IconButton,
//     Radio,
//     RadioGroup,
//     Slider,
//     Tooltip,
//     Typography,
//     Card,
//     Button,
//     Box
// } from '@material-ui/core';

// // third-party
// // import PerfectScrollbar from 'react-perfect-scrollbar';

// // project imports
// import CardWrapper from '../CardWrapper/CardWrapper';
// import AnimateButton from '../Button/AnimateButton';
// import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../store/action'; // THEME_RTL
// import { IconSettings } from '@tabler/icons';

// const gridSpacing = 3;
// const drawerWidth = 240;
// // assets


// // concat 'px'
// function valueText(value) {
//     return `${value}px`;
// }
// const useStyles = makeStyles((theme) =>
// createStyles({
//   btn: {
//     bottom: 25,
//     m: 4,
//     position: 'fixed',
//     right: 25,
//     // zIndex: (theme) => theme.zIndex.speedDial,
//     boxShadow: theme.shadows[8],
//     marginLeft:200
//   },
//   drawer:{
//       width: drawerWidth
//   },
//   fontForm:{
//       paddingLeft:20,
//       paddingRight:20
//   },
//   borderForm:{
//      padding:30
//   }


// }));
// // ===========================|| LIVE CUSTOMIZATION ||=========================== //

// const Customization = () => {
//     const theme = useTheme();
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const customization = useSelector((state) => state.customization);

//     // drawer on/off
//     const [open, setOpen] = React.useState(false);
//     const handleToggle = () => {
//         setOpen(!open);
//     };

//     /////// BORDER
//     // state - border radius
//     // const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
//     const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
//     const handleBorderRadius = (event, newValue) => {
//         setBorderRadius(newValue);
//     };

//     useEffect(() => {
//         dispatch({ type: SET_BORDER_RADIUS, borderRadius });
//     }, [dispatch, borderRadius]);


//     /////// FONT FAMILY
//     let initialFont;
//     switch (customization.fontFamily) {
//         case `'Inter', sans-serif`:
//             initialFont = 'Inter';
//             break;
//         case `'Poppins', sans-serif`:
//             initialFont = 'Poppins';
//             break;
//         case `'Roboto', sans-serif`:
//         default:
//             initialFont = 'Roboto';
//             break;
//     }

//     // state - font family
//     const [fontFamily, setFontFamily] = React.useState(initialFont);
//     useEffect(() => {
//         let newFont;
//         switch (fontFamily) {
//             case 'Inter':
//                 newFont = `'Inter', sans-serif`;
//                 break;
//             case 'Poppins':
//                 newFont = `'Poppins', sans-serif`;
//                 break;
//             case 'Roboto':
//             default:
//                 newFont = `'Roboto', sans-serif`;
//                 break;
//         }
//         dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
//     }, [dispatch, fontFamily]);

//     return (
//         <>
//             {/* toggle button */}

//             <Tooltip title="Live Customize">
//                 <Fab
//                     component="div"
//                     onClick={handleToggle}
//                     size="medium"
//                     variant="string"
//                     color="secondary"
//                     className={classes.btn}
//                 >
//                     <AnimateButton type="rotate">
//                         <IconButton color="inherit" size="large" disableRipple>
//                             <IconSettings />
//                         </IconButton>
//                     </AnimateButton>
//                 </Fab>
//             </Tooltip>

//             <Drawer
//                 anchor="right"
//                 onClose={handleToggle}
//                 open={open}
//                 // className={classes.drawer}
//             >
//                 {/* <PerfectScrollbar component="div"> */}
//                     <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
//                         <Grid item xs={12}>
//                             {/* font family */}
//                             <CardWrapper title="Font Family">
//                                 <FormControl className={classes.fontForm}>
//                                     <RadioGroup
//                                         aria-label="font-family"
//                                         value={fontFamily}
//                                         onChange={(e) => setFontFamily(e.target.value)}
//                                         name="row-radio-buttons-group"
//                                     >
//                                         <FormControlLabel
//                                             value="Roboto"
//                                             control={<Radio />}
//                                             label="Roboto"
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 28 },
//                                                 '& .MuiFormControlLabel-label': { color: 'grey.900' }
//                                             }}
//                                         />
//                                         <FormControlLabel
//                                             value="Poppins"
//                                             control={<Radio />}
//                                             label="Poppins"
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 28 },
//                                                 '& .MuiFormControlLabel-label': { color: 'grey.900' }
//                                             }}
//                                         />
//                                         <FormControlLabel
//                                             value="Inter"
//                                             control={<Radio />}
//                                             label="Inter"
//                                             sx={{
//                                                 '& .MuiSvgIcon-root': { fontSize: 28 },
//                                                 '& .MuiFormControlLabel-label': { color: 'grey.900' }
//                                             }}
//                                         />
//                                     </RadioGroup>
//                                 </FormControl>
//                             </CardWrapper>
//                         </Grid>
//                         <Grid item xs={12}>
//                                 {/* border radius */}
//                             <CardWrapper title="Border Radius">
//                             <Box className={classes.borderForm}>
//                                 <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
//                                     <Grid item>
//                                         <Typography variant="h6" color="secondary">
//                                             4px
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item xs>
//                                         <Slider
//                                             size="small"
//                                             value={borderRadius}
//                                             onChange={handleBorderRadius}
//                                             getAriaValueText={valueText}
//                                             valueLabelDisplay="on"
//                                             aria-labelledby="discrete-slider-small-steps"
//                                             marks
//                                             step={2}
//                                             min={4}
//                                             max={24}
//                                             color="secondary"
//                                             sx={{
//                                                 '& .MuiSlider-valueLabel': {
//                                                     color: 'secondary.light'
//                                                 }
//                                             }}
//                                         />
//                                     </Grid>
//                                     <Grid item>
//                                         <Typography variant="h6" color="secondary">
//                                             24px
//                                         </Typography>
//                                     </Grid>
//                                 </Grid>
//                                 </Box>
//                             </CardWrapper>
                           
//                         </Grid>
//                     </Grid>
//                 {/* </PerfectScrollbar> */}
//             </Drawer>
//         </>
//     );
// };

// export default Customization;



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles,createStyles} from "@material-ui/core/styles";
// material-ui
import { useTheme } from '@material-ui/styles';
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography,
    Card,
    Button,
    Box,
    List
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import CardWrapper from '../CardWrapper/CardWrapper';
import AnimateButton from '../Button/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY, SET_MODE } from '../../store/action'; // THEME_RTL
import { IconSettings } from '@tabler/icons';
import ColorTheme from './ColorTheme/ColorTheme'
const gridSpacing = 3;
const drawerWidth = 300;
// assets


// concat 'px'
function valueText(value) {
    return `${value}px`;
}
const useStyles = makeStyles((theme) =>
createStyles({
  btn: {
    bottom: 25,
    m: 4,
    position: 'fixed',
    right: 25,
    // zIndex: (theme) => theme.zIndex.speedDial,
    boxShadow: theme.shadows[8],
    marginLeft:200
  },
  drawer:{
      width: drawerWidth,
      flexShrink: 0,
  },
  fontForm:{
      paddingLeft:20,
      paddingRight:100,

  },
  borderForm:{
     paddingTop:30,
     paddingBottom:20,
     paddingLeft:15
  },
  drawerPaper:{
    width: drawerWidth,
  }
  


}));
// ===========================|| LIVE CUSTOMIZATION ||=========================== //

const Customization = () => {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    // drawer on/off
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    /////// BORDER
    // state - border radius
    // const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius });
    }, [dispatch, borderRadius]);

      //MODE
      const [mode, setMode] = React.useState('Light');
   
      useEffect(() => {
          dispatch({ type: SET_MODE, mode });
      }, [dispatch, mode]);
  

    /////// FONT FAMILY
    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = React.useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

  

    return (
        <>
            {/* toggle button */}

            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="string"
                    color="secondary"
                    className={classes.btn}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}

                classes={{
                    paper: classes.drawerPaper
                  }}
                className={classes.drawer}
            >
        
                <PerfectScrollbar component="div">
            <CardWrapper title="Font Family">
                <FormControl className={classes.fontForm}>
                    <RadioGroup
                        aria-label="font-family"
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        name="row-radio-buttons-group"
                        
                    >
                        <FormControlLabel
                            value="Roboto"
                            control={<Radio  classes={{root: classes.radio, checked: classes.checked}}/>}
                            label="Roboto"
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                            }}
                            
                        />
                        <FormControlLabel
                            value="Poppins"
                            control={<Radio />}
                            label="Poppins"
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                            }}
                        />
                        <FormControlLabel
                            value="Inter"
                            control={<Radio />}
                            label="Inter"
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                            }}
                        />
                    </RadioGroup>
                </FormControl>
            </CardWrapper>
            <CardWrapper title="Mode">
                <FormControl className={classes.fontForm}>
                    <Grid>
                    <RadioGroup
                        aria-label="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel
                            value="Light"
                            control={<Radio />}
                            label="Light"
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                            }}
                        />
                        <FormControlLabel
                            value="Dark"
                            control={<Radio />}
                            label="Dark"
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                '& .MuiFormControlLabel-label': { color: 'grey.900' }
                            }}
                        />
                    
                    </RadioGroup>
                    </Grid>
                </FormControl>
            </CardWrapper>
                                            
        <CardWrapper title="Border Radius">
            <Box className={classes.borderForm}>
                <Grid item xs={12} container spacing={2} alignItems="center" sx={{ mt: 2.5 }}>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                            4px
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            size="small"
                            value={borderRadius}
                            onChange={handleBorderRadius}
                            getAriaValueText={valueText}
                            valueLabelDisplay="on"
                            aria-labelledby="discrete-slider-small-steps"
                            marks
                            step={1}
                            min={4}
                            max={24}
                            color="secondary"
                            sx={{
                                '& .MuiSlider-valueLabel': {
                                    color: 'secondary.light'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="secondary">
                            24px
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
            </CardWrapper>
       

            <ColorTheme />
            </PerfectScrollbar>
        </Drawer>
        </>
    );
};

export default Customization;
