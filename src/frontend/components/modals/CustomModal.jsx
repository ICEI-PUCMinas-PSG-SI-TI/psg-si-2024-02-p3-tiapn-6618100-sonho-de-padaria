import React from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ children, isOpen, onClose, width }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          position: "relative",
          maxWidth: width ? width : "500px",
        },
      }}
      ariaHideApp={false}
    >
      <button style={styles.closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
      {children}
    </Modal>
  );
};

const styles = {
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default CustomModal;
