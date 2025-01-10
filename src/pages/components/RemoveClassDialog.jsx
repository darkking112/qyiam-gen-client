import React from "react";

function RemoveClassDialog({ className, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>{`هل أنت متأكد من أنك تريد حذف الحلقة ${className} ؟`}</h3>
        <div className="btns">
          <button onClick={onCancel} className="close-button">
            {"إلغاء"}
          </button>
          <button onClick={onConfirm} className="confirm-button">
            {"تأكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveClassDialog;
