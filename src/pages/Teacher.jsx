import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "./components/Header";
import NewCommentDialog from "./components/NewCommentDialog";
import "../CSS/teacher.css";
import SheetLogsDialog from "./components/SheetLogsDialog";
import NewSheetForm from "./components/NewSheetForm";

function Teacher() {
  const location = useLocation();
  let teacher = location.state?.teacher;

  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [studentSheets, setStudentsSheets] = useState([]);
  const [showStudentSheets, setShowStudentSheets] = useState(false);
  const [showNewSheetForm, setNewShowSheetForm] = useState(false);

  useEffect(() => {
    if (!teacher) {
      setErrorMessage("يرجى تسجيل الدخول أولاً");
      setShowErrorDialog(true);
      return;
    }

    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/teacher/get-students-list/${teacher.teacherID}`
      );
      const response = await res.json();
      if (response.status === "success") {
        setStudentsList(response.students);
      } else if (
        response.status === "failed" &&
        response.message === "No students found for the given teacher."
      ) {
        setErrorMessage("لا يوجد لديك أي طلبة في الوقت الحالي...");
        setShowErrorDialog(true);
      } else if (
        response.status === "failed" &&
        response.message === "No class found for the given teacher."
      ) {
        setErrorMessage("لا يوجد حلقة موكلة إليك في الوقت الحالي...");
        setShowErrorDialog(true);
      } else {
        setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
        setShowErrorDialog(true);
      }
    };

    fetchData();
  }, [teacher]);

  const handleAddCommentClick = (student) => {
    setSelectedStudent(student);
    setShowCommentDialog(true);
  };

  const onAddCommentConfirm = async (comment) => {
    let body = {
      ...comment,
      studentID: selectedStudent.studentID,
      teacherID: teacher.teacherID,
      date: new Date().toLocaleDateString(),
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/teacher/add-comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      setShowCommentDialog(false);
    } else {
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
    }
  };

  const onAddCommentCancel = () => {
    setShowCommentDialog(false);
  };

  // show students logs, so the teacher can now which dates are not filled
  const handleShowStudentLogs = async (student) => {
    setSelectedStudent(student);
    // setStudentsSheet
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/teacher/get-student-sheets/${student.studentID}`
    );
    const response = await res.json();
    if (response.status === "success") {
      setStudentsSheets(response.sheets);
      setShowStudentSheets(true);
    } else if (response.status === "failed") {
      setStudentsSheets("لا يوجد أي سجل مسبق لهذا الطالب");
      setShowStudentSheets(true);
    } else {
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
    }
  };

  const onCloseStudentLogs = () => {
    setShowStudentSheets(false);
  };

  // handling adding a new sheet
  const handleAddSheetClick = async () => {
    setShowStudentSheets(false);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/teacher/check-eligibility/${selectedStudent.studentID}`
    );
    const response = await res.json();
    if (response.status === "success") {
      setNewShowSheetForm(true);
      return;
    } else if (response.status === "failed") {
      setErrorMessage("لا يمكن تعبئة أكثر من سجل واحد لكل طالب يومياً");
      setShowErrorDialog(true);
      return;
    } else {
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      return;
    }
  };

  const onAddSheetConfirm = async (sheet) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/teacher/add-sheet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheet),
      }
    );
    const response = await res.json();
    if (response.status === "success") setNewShowSheetForm(false);
    else {
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
    }
  };

  const onAddSheetCancel = () => {
    setNewShowSheetForm(false);
  };

  //   setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
  //       setShowErrorDialog(true);
  return (
    <div className="teacher-page">
      <Header isLoginPage={false} name={teacher ? teacher.name : ""} />

      {showErrorDialog && (
        <div className="error-dialog">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="teacher-container">
        <h3>{""}</h3>
        <table className="students-table">
          <thead>
            <tr>
              <th>{"رقم الطالب"}</th>
              <th>{"اسم الطالب"}</th>
              <th>{"الاجراءات"}</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.studentID}</td>
                  <td>{student.name}</td>
                  <td>
                    <button
                      className="add-comment-btn"
                      onClick={() => handleAddCommentClick(student)}
                    >
                      {"إضافة ملاحظة"}
                    </button>
                    <button
                      className="view-logs-btn"
                      onClick={() => handleShowStudentLogs(student)}
                    >
                      {"عرض السجل اليومي"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {showCommentDialog ? (
          <NewCommentDialog
            student={selectedStudent}
            onClose={onAddCommentCancel}
            onConfirm={onAddCommentConfirm}
          />
        ) : null}

        {showStudentSheets ? (
          <SheetLogsDialog
            student={selectedStudent}
            logs={studentSheets}
            onClose={onCloseStudentLogs}
            onAddSheet={handleAddSheetClick}
          />
        ) : null}

        {showNewSheetForm ? (
          <NewSheetForm
            student={selectedStudent}
            onClose={onAddSheetCancel}
            onSubmit={onAddSheetConfirm}
            insertedBy={"Teacher"}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Teacher;
