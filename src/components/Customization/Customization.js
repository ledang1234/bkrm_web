import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
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
  Box,
} from "@material-ui/core";
// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import ColorTheme from "./ColorTheme/ColorTheme";
import CardWrapper from "../CardWrapper/CardWrapper";
// import AnimateButton from "../Button/AnimateButton";

//import icon
import { IconSettings } from "@tabler/icons";

// import redux
import { customizeAction } from "../../store/slice/customizeSlice";
const drawerWidth = 300;

export const updateLocalStorage = (action) => {
  let customization = JSON.parse(sessionStorage.getItem("customization"));
  switch (action.type) {
    case "MODE":
      customization.mode = action.payload;
      break;
    case "FONT_FAMILY":
      customization.fontFamily = action.payload;
      break;
    case "BORDER_RADIUS":
      customization.borderRadius = action.payload;
      break;
    case "COLOR_LEVEL":
      customization.colorLevel = action.payload;
      break;
    case "PRIMARY_COLOR":
      customization.primaryColor = action.payload;
      break;
    case "SECONDARY_COLOR":
      customization.secondaryColor = action.payload;
      break;
    default:
      console.log("invalid customization");
      break;
  }
  sessionStorage.setItem("customization", JSON.stringify(customization));
};

function valueText(value) {
  return `${value}px`;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    btn: {
      bottom: 25,
      m: 4,
      position: "fixed",
      right: 25,
      boxShadow: theme.shadows[8],
      marginLeft: 200,
      zIndex:5
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    fontForm: {
      paddingLeft: 20,
      paddingRight: 100,
    },
    borderForm: {
      paddingTop: 30,
      paddingBottom: 20,
      paddingLeft: 15,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);
// ===========================|| LIVE CUSTOMIZATION ||=========================== //

const Customization = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);

  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const borderRadius = customization.borderRadius;
  const handleBorderRadius = (borderRadius) => {
    dispatch(customizeAction.setBorderRadius(borderRadius));
    updateLocalStorage({ type: "BORDER_RADIUS", payload: borderRadius });
  };

  const mode = customization.mode;
  const handleMode = (mode) => {
    dispatch(customizeAction.setMode(mode));
    updateLocalStorage({ type: "MODE", payload: mode });
  };
  const fontFamily = customization.fontFamily;
  const handleFontChange = (fontFamily) => {
    dispatch(customizeAction.setFontFamily(fontFamily));
    updateLocalStorage({ type: "FONT_FAMILY", payload: fontFamily });
  };
  return (
    <>
      {/* Button  */}
      <Tooltip title="Cài đặt">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="string"
          color="secondary"
          className={classes.btn}
        >
          {/* <AnimateButton type="rotate"> */}
          <IconButton color="inherit" size="large" disableRipple>
            <IconSettings />
          </IconButton>
          {/* </AnimateButton> */}
        </Fab>
      </Tooltip>

      {/* Drawer  */}
      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        className={classes.drawer}
      >
        <PerfectScrollbar component="div">
          {/* Font family */}
          <CardWrapper title="Font Family">
            <FormControl className={classes.fontForm}>
              <RadioGroup
                aria-label="font-family"
                value={fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={`'Roboto', sans-serif`}
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Roboto"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    "& .MuiFormControlLabel-label": { color: "grey.900" },
                  }}
                />
                <FormControlLabel
                  value={`'Poppins', sans-serif`}
                  control={<Radio />}
                  label="Poppins"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    "& .MuiFormControlLabel-label": { color: "grey.900" },
                  }}
                />
                <FormControlLabel
                  value={`'Inter', sans-serif`}
                  control={<Radio />}
                  label="Inter"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    "& .MuiFormControlLabel-label": { color: "grey.900" },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </CardWrapper>

          {/* Mode */}
          <CardWrapper title="Mode">
            <FormControl className={classes.fontForm}>
              <Grid>
                <RadioGroup
                  aria-label="mode"
                  value={mode}
                  onChange={(e) => handleMode(e.target.value)}
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Light"
                    control={<Radio />}
                    label="Light"
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 28 },
                      "& .MuiFormControlLabel-label": { color: "grey.900" },
                    }}
                  />
                  <FormControlLabel
                    value="Dark"
                    control={<Radio />}
                    label="Dark"
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 28 },
                      "& .MuiFormControlLabel-label": { color: "grey.900" },
                    }}
                  />
                </RadioGroup>
              </Grid>
            </FormControl>
          </CardWrapper>

          {/* Border Radius */}
          <CardWrapper title="Border Radius">
            <Box className={classes.borderForm}>
              <Grid
                item
                xs={12}
                container
                spacing={2}
                alignItems="center"
                sx={{ mt: 2.5 }}
              >
                <Grid item>
                  <Typography variant="h6" color="secondary">
                    4px
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Slider
                    size="small"
                    value={borderRadius}
                    onChange={(e, n) => {
                      handleBorderRadius(n);
                    }}
                    getAriaValueText={valueText}
                    valueLabelDisplay="on"
                    aria-labelledby="discrete-slider-small-steps"
                    marks
                    step={1}
                    min={4}
                    max={24}
                    color="secondary"
                    sx={{
                      "& .MuiSlider-valueLabel": {
                        color: "secondary.light",
                      },
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

          {/* Color */}
          <ColorTheme updateLocalStorage={updateLocalStorage} />
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
