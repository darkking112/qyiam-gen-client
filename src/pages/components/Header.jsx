import React from "react";
import { useNavigate } from "react-router";
import "../../CSS/header.css";

function Header({ isLoginPage, name }) {
  const navigate = useNavigate();

  function goToURL() {
    navigate(`/`);
  }
  return (
    <div className={isLoginPage ? "login-header" : "header"}>
      <p className="header-title">
        {name ? `أهلاً بك ${name}` : "أهلاً بكم في بوابة جيل القيم"}
      </p>
      {isLoginPage ? null : (
        <button onClick={() => goToURL()} className="header-button">
          {"نسجيل الخروج"}
        </button>
      )}
    </div>
  );
}

export default Header;
