import React, { useState } from "react";

const ResetPasswordDialog = ({ user, onClose, onSubmit }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onSubmit(newPassword);
    } else {
      alert("كلمات السر المدخلة غير متطالقة");
    }
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog">
        <h2>{user.name}</h2>
        <p>{"إعادة تعيين كلمة سر المستخدم"}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="كلمة السر الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="تأكيد كلمة السر الجديدة"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="btns">
            <button className="close-button" onClick={onClose}>
              {"إلغاء"}
            </button>
            <button type="submit" className="confirm-button">
              {"تغيير"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordDialog;
