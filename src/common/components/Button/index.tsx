import React from "react";

export const Button = ({ classes, label, onClick }: any) => {
  return (
    <button onClick={onClick} className={classes}>
      {label}
    </button>
  );
};
