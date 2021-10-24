import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { customizeAction } from "../../../store/slice/customizeSlice";
import clsx from "clsx";

// import library
// import icon
import {
  red,
  pink,
  purple,
  blue,
  cyan,
  green,
  amber,
  orange,
  grey,
  teal,
} from "@material-ui/core/colors";

//import project
import CardWrapper from "../../CardWrapper/CardWrapper";
import { Box, Button, Grid, Slider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    btn: {
      maxWidth: "30px",
      maxHeight: "33px",
      minWidth: "30px",
      minHeight: "33px",
      borderRadius: "30px",
      margin: 10,
    },
    btnPink: {
      background: pink[500],
      "&:hover": { background: pink[300] },
    },
    btnBlue: {
      background: blue[500],
      "&:hover": { background: blue[300] },
    },
    btnRed: {
      background: red[500],
      "&:hover": { background: red[300] },
    },
    btnPurple: {
      background: purple[500],
      "&:hover": { background: purple[300] },
    },
    btnCyan: {
      background: cyan[500],
      "&:hover": { background: cyan[300] },
    },
    btnGreen: {
      background: green[500],
      "&:hover": { background: green[300] },
    },
    btnTeal: {
      background: teal[500],
      "&:hover": { background: teal[300] },
    },
    btnAmber: {
      background: amber[500],
      "&:hover": { background: amber[300] },
    },
    btnOrange: {
      background: orange[500],
      "&:hover": { background: orange[300] },
    },
    btnGrey: {
      background: grey[500],
      "&:hover": { background: grey[300] },
    },
    levelForm: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 15,
    },
    choosen: {
      borderWidth: 2,
      margin: 9,
      borderColor: "#212121",
    },
  })
);

function valueText(value) {
  return `${value}`;
}

const SliderColor = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);

  // state - border radius
  const colorLevel = customization.colorLevel;

  const handleColorLevel = (event, newValue) => {
    dispatch(customizeAction.setColorLevel(newValue));
  };

  if (props.title === "Màu nền") {
    return (
      <Box className={classes.levelForm}>
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
              0
            </Typography>
          </Grid>
          <Grid item xs>
            <Slider
              size="small"
              value={colorLevel}
              onChange={handleColorLevel}
              getAriaValueText={valueText}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-small-steps"
              marks
              step={100}
              min={0}
              max={900}
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
              900
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <div></div>;
  }
};

const ButtonGroup = (props) => {
  const classes = useStyles();
  const { set, title, colorChoosen } = props;
  return (
    <CardWrapper title={title}>
      <Grid spacing={3}>
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnPink,
            colorChoosen === pink && classes.choosen
          )}
          onClick={() => {
            set(pink);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnBlue,
            colorChoosen === blue && classes.choosen
          )}
          onClick={() => {
            set(blue);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnAmber,
            colorChoosen === amber && classes.choosen
          )}
          onClick={() => {
            set(amber);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnRed,
            colorChoosen === red && classes.choosen
          )}
          onClick={() => {
            set(red);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnPurple,
            colorChoosen === purple && classes.choosen
          )}
          onClick={() => {
            set(purple);
          }}
        />
      </Grid>
      <Grid spacing={3}>
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnCyan,
            colorChoosen === cyan && classes.choosen
          )}
          onClick={() => {
            set(cyan);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnGreen,
            colorChoosen === green && classes.choosen
          )}
          onClick={() => {
            set(green);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnTeal,
            colorChoosen === teal && classes.choosen
          )}
          onClick={() => {
            set(teal);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnOrange,
            colorChoosen === orange && classes.choosen
          )}
          onClick={() => {
            set(orange);
          }}
        />
        <Button
          variant="outlined"
          className={clsx(
            classes.btn,
            classes.btnGrey,
            colorChoosen === grey && classes.choosen
          )}
          onClick={() => {
            set(grey);
          }}
        />
      </Grid>
      <SliderColor title={title} />
    </CardWrapper>
  );
};
const ColorTheme = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);

  const primaryColor = customization.primaryColor;
  const handlePrimaryColor = (e) => {
    dispatch(customizeAction.setPrimaryColor(e));
  };

  const secondaryColor = customization.secondaryColor;
  const handleSecondaryColor = (e) => {
    dispatch(customizeAction.setSecondaryColor(e));
  };

  return (
    <div>
      <ButtonGroup
        set={handlePrimaryColor}
        title="Màu nền"
        colorChoosen={primaryColor}
      />
      <ButtonGroup
        set={handleSecondaryColor}
        title="Màu nhấn"
        colorChoosen={secondaryColor}
      />
    </div>
  );
};

export default ColorTheme;
