import React from "react";
import {
  Modal,
  Box,
  Paper,
  Grid,
  ListItem,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    minWidth: "100%",
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
}));

export default function ModalWrapperWithClose(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        maxWidth="md"
        fullWidth={true}

      >
        <React.Fragment>
          <Paper>
            <Box className={classes.container}>
                <Box>   
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h3" >{props.title}</Typography>
                      <IconButton aria-label="close"   onClick={props.handleClose}>
                        <CloseIcon  fontSize="small" />
                      </IconButton>
                </Grid>
                </Box> 
              {props.children}

            </Box>
          </Paper>
            
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
}
