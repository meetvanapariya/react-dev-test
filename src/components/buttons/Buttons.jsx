import React from "react";
import { Link } from "react-router-dom";

function Buttons({ link, text, classDetail }) {
  return (
    <div className={classDetail}>
      <Link to={link}>{text}</Link>
    </div>
  );
}

export default Buttons;
