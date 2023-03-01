import React from "react";

function Modal({ show, url, handleClick }) {
  if (!show) return null;

  let styles = {
    width: "600px",
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClick}
    >
      <img src={url} style={styles} />
    </div>
  );
}

export default Modal;
