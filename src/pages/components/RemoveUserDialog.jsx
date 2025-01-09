import React from "react";

function RemoveUserDialog({ user, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog">
        <h3>{`هل أنت متأكد من أنك تريد حذف حساب المستخدم ${user.name} ؟`}</h3>
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

export default RemoveUserDialog;
