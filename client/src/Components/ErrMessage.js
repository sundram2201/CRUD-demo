import React from "react";

const InputErrorMessage = ({ error, marginTop, marginBottom = 20 }) => {
  if (error) {
    return (
      <p
        className='text-danger'
        style={{
          marginTop: marginTop ? marginTop : 0,
          marginBottom: marginBottom ? marginBottom : 0,
          textAlign: "start",
          fontSize: "14px",
        }}>
        {error}
      </p>
    );
  }
  return (
    <p
      style={{ marginTop: marginTop ? marginTop : 0, marginBottom: marginBottom ? marginBottom : 0, fontSize: "14px" }}
      className='invisible'>
      -
    </p>
  );
};

export default InputErrorMessage;
