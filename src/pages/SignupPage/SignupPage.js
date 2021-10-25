import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import userApi from "../../api/userApi";
import Typography from "@material-ui/core/Typography";
import { Button, Paper, Step, StepLabel, Stepper } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { logInHandler } from "../../store/actionCreator";
import { Link } from "react-router-dom";
import UserInfo from "../../components/SignUp/UserInfo";
import StoreInfo from "../../components/SignUp/StoreInfo";
import { loadingActions } from "../../store/slice/loadingSlice";
export default function SignUp() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    dateOfBirth: "1991-01-01",
  });
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    phone: "",
    city: { id: "", name: "" },
    district: { id: "", name: "" },
    ward: { id: "", name: "" },
    address: "",
  });
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    try {
      dispatch(loadingActions.startLoad());
      const response = await userApi.ownerRegister({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        password_confirmation: userInfo.passwordConfirm,
        phone: userInfo.phone,
        date_of_birth: userInfo.dateOfBirth,
        status: "active",
        store_name: storeInfo.name,
        address: storeInfo.address,
        ward: storeInfo.ward.name,
        district: storeInfo.district.name,
        province: storeInfo.city.name,
        store_phone: storeInfo.phone,
        default_branch: true,
      });
      dispatch(loadingActions.finishLoad());
      if (response.message === "User successfully registered") {
        dispatch(logInHandler(userInfo.phone, userInfo.password));
      }
    } catch (error) {
      dispatch(loadingActions.finishLoad());
    }
  };
  return (
    <Box className={classes.background}>
      <Paper className={classes.container}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" gutterBottom>
            Sign up
          </Typography>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            style={{ width: 300 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep !== 1 ? (
            <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
          ) : (
            <StoreInfo storeInfo={storeInfo} setStoreInfo={setStoreInfo} />
          )}
          <Box className={classes.button}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep !== 1 ? (
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleSignUp()}
              >
                Sign Up
              </Button>
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                style={{ textDecoration: "none" }}
                component={Link}
                to="/login"
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Box>
  );
}

function getSteps() {
  return ["Fill in owner information", "Fill in store information"];
}
