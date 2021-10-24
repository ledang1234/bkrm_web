import React from "react";
import { Modal, Box, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import loading from "../../assets/img/icon/loading.gif";
export default function SimpleModal(props) {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Modal
        open={isLoading}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <React.Fragment>
          <Paper>
            <Box className={classes.container}>
              <img src={loading} className={classes.loading} />
            </Box>
          </Paper>
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
}
