import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { styled } from "@mui/material/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 50,
}));

const ProductImportPopper = ({ open, loading, errors, handleClose }) => {
  const classes = useStyles();

  const renderErrorCard = () => {
    return errors?.map((error) => (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="space-between"
      >
        <Grid item xs={2}>
          <Item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {`Dòng ${error.row}`}
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {error.product.name}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {error.product.product_code}
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={2}>
          <Item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {error.product?.bar_code}
            </Typography>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {error.error[0].code}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    ));
  };

  return (
    open && (
      <div
        style={{
          zIndex: 200,
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: "-200px",
          marginLeft: "-250px",
        }}
      >
        <Paper
          elevation={3}
          style={{
            height: 400,
            width: 500,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              Xử lý file exel
            </Grid>
            <Grid item xs={4}>
              <Button onClick={handleClose}>Close</Button>
            </Grid>

            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              {loading ? <CircularProgress /> : <div>{renderErrorCard()}</div>}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  );
};

export default ProductImportPopper;
