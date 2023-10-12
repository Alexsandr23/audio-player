import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const MyModal = ({ open, onClose, children, render}) => {
  const style = {
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 3,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {children}
        </Typography>
        {render}
      </Box>
    </Modal>
  )
}

export default MyModal