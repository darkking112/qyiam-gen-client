import React, { useState } from "react";

function RenameClassDialog({ clas, onConfirm, onCancel }) {
  const [newClassName, setNewClassName] = useState(clas.className);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newClassName.trim() === "") {
      alert("يرجى إدخال اسم جديد للحلقة");
      return;
    }
    onConfirm(newClassName); // Pass the new class name to the parent component
  };

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog">
        <h3>{`إعادة تسمية الحلقة ${clas.className}`}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="اسم الحلقة الجديد"
            required
          />
          <div className="btns">
            <button type="button" onClick={onCancel} className="close-button">
              {"إلغاء"}
            </button>
            <button type="submit" className="confirm-button">
              {"تأكيد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RenameClassDialog;
