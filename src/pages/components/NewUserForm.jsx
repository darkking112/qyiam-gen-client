import React, { useState } from "react";

const NewUserForm = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };
    onSubmit(userData); // Pass the user data to the parent component
    setName(""); // Reset all states
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{"إضافة مستخدم جديد"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Student">{"طالب"}</option>
            <option value="Teacher">{"معلم"}</option>
            <option value="Admin">{"مدير"}</option>
          </select>
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

export default NewUserForm;
