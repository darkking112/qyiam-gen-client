import React from "react";

function SheetLogsDialog({ student, logs, onClose, onAddSheet, onViewClick }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>{`الطالب: ${student.name}`}</h3>
        <h4>{"السجل اليومي"}</h4>
        {Array.isArray(logs) ? (
          <ul>
            {logs.map((log, index) => {
              return (
                <li
                  className="logs-list-item"
                  key={index}
                  onClick={() => onViewClick(log.sheetID)}
                >
                  {log.date}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>{"لا يوجد أي سجلات مسبقة لهذا الطالب"}</p>
        )}

        <div className="btns">
          <button className="close-logs-dialog" onClick={onClose}>
            {"إغلاق"}
          </button>
          {onAddSheet ? (
            <button className="add-log-btn" onClick={onAddSheet}>
              {"إضافة سجل"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SheetLogsDialog;
