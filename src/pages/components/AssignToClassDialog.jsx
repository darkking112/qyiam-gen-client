import React, { useState } from "react";

function AssignToClassDialog({ user, classes, onCancel, onConfirm }) {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleConfirm = () => {
    if (selectedClass) {
      onConfirm(selectedClass); // Pass the selected class to the onConfirm handler
    } else {
      alert("Please select a class!");
    }
  };
  let role = user.role === "Student" ? "الطالب" : "المعلم";

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h4>{`${role}: ${user.name}`}</h4>
        <h5>{`إختر الحلقة: `}</h5>
        <select
          value={selectedClass ? selectedClass.classID : ""}
          onChange={(e) => {
            const selected = classes.find(
              (clas) => clas.classID === Number(e.target.value)
            );
            setSelectedClass(selected || null); // Set the selected class object
          }}
          required
        >
          <option value="" disabled>
            اختر الحلقة
          </option>
          {classes.map((clas, index) => (
            <option value={clas.classID} key={index}>
              {clas.className}
            </option>
          ))}
        </select>

        <div className="btns">
          <button onClick={onCancel} className="close-button">
            {"إلغاء"}
          </button>
          <button onClick={handleConfirm} className="confirm-button">
            {"تأكيد"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignToClassDialog;
