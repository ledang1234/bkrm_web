import React from "react";
import { Modal, Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding:20,
    minWidth: "100%",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <React.Fragment>
          <Paper>
            <Box className={classes.container}>{props.children}</Box>
          </Paper>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
}
