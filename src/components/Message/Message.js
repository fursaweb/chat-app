import React from "react";
import { db } from "../../services/firebase";

const Message = (props) => {
  const updateData = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="message__wrappper">
      <p className="chat__bubble">{props.content}</p>
      <button onClick={updateData}>U</button>
      <button>X</button>
    </div>
  );
};

export default Message;
