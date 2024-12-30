import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./components/Header";
import "../CSS/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    try {
      const response = await res.json();
      setIsLoading(false);
      if (response.message === "Loggedin Successfully") {
        let { userInfo } = response;
        if (userInfo.role === "Student")
          navigate("/student", { state: { student: response.studentInfo } });
        else if (userInfo.role === "Teacher")
          navigate("/teacher", { state: { teacher: response.teacherInfo } });
        else if (userInfo.role === "Admin")
          navigate("/admin", { state: { user: userInfo } });
      } else {
        if (response.message === "Email or Password is Wrong")
          setErrorMessage("الايميل المدخل أو كلمة المرور غير صحيحة");
        else if (
          response.message ===
          "An error occurred while processing your request."
        )
          setErrorMessage("حدثت مشكلة أثناء الطلب، يرجى المحاولة لاحقاً");
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error("Error parsing response:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header isLoginPage={true} />
      <div className="login-container">
        <h2>{"أهلاً بكم في بوابة جيل القيم"}</h2>

        {isLoading && (
          <div className="loading-spinner">
            <p>{"جاري التحميل..."}</p>
          </div>
        )}

        {showErrorDialog && (
          <div className="error-dialog">
            <p>{errorMessage}</p>
          </div>
        )}

        {!isLoading && (
          <form onSubmit={onSubmitClick} className="login-form">
            <label htmlFor="email">{"البريد الالكتروني"}</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: example@gmail.com"
            />

            <label htmlFor="password">{"كلمة المرور"}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />

            <div className="login-button-container">
              <button type="submit" className="login-btn">
                {"تسجيل الدخول"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
