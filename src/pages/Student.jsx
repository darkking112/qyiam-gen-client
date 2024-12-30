import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "./components/Header";
import NewSheetForm from "./components/NewSheetForm";
import "../CSS/student.css";

function Student() {
  const location = useLocation();
  let student = location.state?.student;

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showNewSheetForm, setNewShowSheetForm] = useState(false);

  useEffect(() => {
    if (!student) {
      setErrorMessage("يرجى تسجيل الدخول أولاً");
      setShowErrorDialog(true);
      return;
    }
  }, [student]);

  const handleCheckEligibilityClick = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/student/check-eligibility/${student.studentID}`
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
      `${process.env.REACT_APP_BACKEND_URL}/student/add-sheet`,
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

  return (
    <div className="student-page">
      <Header isLoginPage={false} name={student ? student.name : ""} />

      {showErrorDialog ? (
        <div className="error-dialog">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="student-container">
          <button
            className="check-eligibility-btn"
            onClick={() => handleCheckEligibilityClick()}
          >
            {"تعبئة سجل اليوم"}
          </button>

          {showNewSheetForm ? (
            <NewSheetForm
              student={student}
              onClose={onAddSheetCancel}
              onSubmit={onAddSheetConfirm}
              insertedBy={"Student"}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Student;
