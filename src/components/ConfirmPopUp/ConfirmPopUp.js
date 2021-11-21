import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import ModalWrapper from "../Modal/ModalWrapper";
const ConfirmPopUp = (props) => {
  return (
    <ModalWrapper {...props}>
      <Box>
        <Typography>{props.message}</Typography>
      </Box>
      <Box
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="secondary"
          size="small"
          variant="outlined"
          style={{ marginRight: 20 }}
          onClick={props.handleClose}
        >
          Hủy
        </Button>
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={() => {
            props.handleConfirm();
          }}
        >
          {" "}
          Xóa
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default ConfirmPopUp;
