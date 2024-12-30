import React, { useState } from "react";

const NewCommentDialog = ({ student, onClose, onConfirm }) => {
  const [commentType, setCommentType] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentType && commentText) {
      onConfirm({ commentType: commentType, comment: commentText });
    } else {
      alert("Please select a comment type and enter your comment.");
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{`الطالب: ${student.name}`}</h2>
        <p>{"إضافة ملاحظة"}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="comment-type">{"نوع الملاحظة"}</label>
            <select
              id="comment-type"
              value={commentType}
              onChange={(e) => setCommentType(e.target.value)}
              required
            >
              <option value="" disabled>
                {"اختر النوع"}
              </option>
              <option value="Positive">{"إيجابية"}</option>
              <option value="Negative">{"سلبية"}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="comment-text">{"نص الملاحظة"}</label>
            <textarea
              id="comment-text"
              //   placeholder="Write your comment here"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </div>
          <div className="btns">
            <button className="close-button" onClick={onClose}>
              {"إلغاء"}
            </button>
            <button type="submit" className="confirm-button">
              {"إرسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCommentDialog;
