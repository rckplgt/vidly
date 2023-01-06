import React from "react";

function Like({ liked, onLike }) {
  let classes = "";
  if (liked) {
    classes = "fa fa-heart";
  } else {
    classes = "fa fa-heart-o";
  }
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={onLike}
      style={{ cursor: "pointer" }}
    ></i>
  );
}

export default Like;
