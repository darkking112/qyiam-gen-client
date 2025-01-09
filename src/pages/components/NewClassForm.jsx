import React, { useState } from "react";

const NewClassForm = ({ onClose, onConfirm }) => {
  const [className, setClassName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (className.trim() === "") {
      alert("يرجى إدخال اسم الحلقة");
      return;
    }
    onConfirm(className); // Pass the class name to the parent component
    setClassName(""); // Reset the input field
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog">
        <h2>{"إضافة حلقة جديدة"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="اسم الحلقة"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
          <div className="btns">
            <button className="close-button" onClick={onClose}>
              {"إلغاء"}
            </button>
            <button type="submit" className="confirm-button">
              {"إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClassForm;
