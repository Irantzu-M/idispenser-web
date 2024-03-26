import React, { useEffect, useState } from "react";
import useResultsStore from "../../stores/resultsStore";

const CommentTooltip = (props) => {
  const [messageText, setMessageText] = useState(props[props.field]);
  const [tooltipState, setTooltipState] = useState("close"); // view | edit | close
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenTooltip(true);
    setTooltipState("view");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setTooltipState("edit");
    if (props.comentario) {
      setMessageText(props.comentario);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenTooltip(false);
    }, "100");
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const addMessage = useResultsStore((state) => state.addMessage);
  const handleAddMessage = (message) => {
    addMessage(message, props.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddMessage(messageText);
    setTooltipState("close");
    setTooltipState("close submit");
    setOpenTooltip(false);
  };

  return (
    <>
      <div className="comment-tooltip" onClick={handleClick}>
        <span
          className={
            "comment-tooltip--icon icon icon-add-comment " +
            (messageText?.length > 0 && "hascomment")
          }
        ></span>

        {openTooltip && (
          <div
            className="comment-tooltip--box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="comment-tooltip--content">
              {tooltipState == "view" && props.comentario && (
                <span className="d-block py-2">
                  {messageText}
                  <input
                    type="text"
                    className="focus-input"
                    autoFocus
                    onBlur={handleBlur}
                    onClick={handleEdit}
                    defaultValue={messageText}
                  />
                </span>
              )}
              {(tooltipState == "edit" || !props.comentario) && (
                <form>
                  <input
                    type="text"
                    placeholder={"Add a comment"}
                    autoFocus
                    defaultValue={messageText?.length > 0 ? messageText : ""}
                    onFocus={(e) => e.target.select()}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <button className="btn btn-link" onClick={handleSubmit}>
                    <span className="icon icon-arrow-circle-o-up"></span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentTooltip;
