import React from "react";

function Like(props) {
  let classes = "";
  if (props.liked) {
    classes = "fa fa-heart";
  } else {
    classes = "fa fa-heart-o";
  }
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
}

export default Like;
