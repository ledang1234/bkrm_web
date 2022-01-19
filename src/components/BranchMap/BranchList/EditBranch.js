import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import SimpleModal from "../../Modal/ModalWrapper";

const useStyles = makeStyles((theme) =>
  createStyles({
    headerTitle: {
      fontSize: "1.125rem",
    },
  })
);

const EditBranch = (props) => {
  const classes = useStyles();
  return (
    <SimpleModal open={props.open} handleClose={props.handleClose}>
      <Box
        flexDirection="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className={classes.headerTitle} variant="h5">
          Chỉnh sửa chi nhánh
        </Typography>
      </Box>

      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
          
        <Button variant="contained" size="small" style={{ marginRight: 20 }}>
          Sửa
        </Button>
        <Button variant="contained" size="small" color="secondary">
          Xóa
        </Button>
      </Grid>
    </SimpleModal>
  );
};

export default EditBranch;
