import React from "react";

function SheetLogsDialog({ student, logs, onClose, onAddSheet }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>{`الطالب: ${student.name}`}</h3>
        <h4>{"السجل اليومي"}</h4>
        {Array.isArray(logs) ? (
          <ul>
            {logs.map((log, index) => {
              return <li key={index}>{log.date}</li>;
            })}
          </ul>
        ) : (
          <p>{"لا يوجد أي سجلات مسبقة لهذا الطالب"}</p>
        )}

        <div className="btns">
          <button className="close-logs-dialog" onClick={onClose}>
            {"إغلاق"}
          </button>
          <button className="add-log-btn" onClick={onAddSheet}>
            {"إضافة سجل"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SheetLogsDialog;
