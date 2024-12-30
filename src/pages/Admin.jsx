import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "../CSS/admin.css";
import ResetPasswordDialog from "./components/ResetPasswordDialog";
import RemoveUserDialog from "./components/RemoveUserDialog";
import NewUserForm from "./components/NewUserForm";
import AssignToClassDialog from "./components/AssignToClassDialog";
import NewClassForm from "./components/NewClassForm";
import RemoveClassDialog from "./components/RemoveClassDialog";
import RenameClassDialog from "./RenameClassDialog";

function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showUsers, setShowUsers] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showRemoveUserDialog, setShowRemoveUserDialog] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showAssignToClassDialog, setShowAssignToClassDialog] = useState(false);

  const [showNewClassForm, setShowNewClassForm] = useState(false);
  const [showRenameClassDialog, setShowRenameClassDialog] = useState(false);
  const [showRemoveClassDialog, setShowRemoveClassDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/get-users`
        );
        const response = await res.json(); // Await response parsing
        if (response.status === "success") {
          setUsers(response.users);
        }

        // Fetch classes
        const res2 = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/get-classes`
        );
        const response2 = await res2.json(); // Await response parsing
        if (response2.status === "success") {
          setClasses(response2.classes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // functions for the reset password usecase
  const handleResetPasswrodClick = (user) => {
    setShowResetPasswordDialog(true);
    setSelectedUser(user);
  };

  const onResetPasswrodConfirm = async (newPassword) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/reset-user-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: selectedUser.userID,
          newPassword: newPassword,
        }),
      }
    );
    const response = await res.json();
    if (response.status === "success") {
      setShowResetPasswordDialog(false);
    } else if (response.status === "failed") {
      setShowResetPasswordDialog(false);
      setErrorMessage("المستخدم غير مسجل مسبقا");
      setShowErrorDialog(true);
    } else {
      setShowResetPasswordDialog(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onResetPasswrodCancel = () => {
    setShowResetPasswordDialog(false);
  };

  // functions for the remove user usecase
  const handleRemoveUserClick = (user) => {
    setSelectedUser(user);
    setShowRemoveUserDialog(true);
  };

  const onRemoveUserConfirm = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/remove-user/${selectedUser.userID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      let newUsers = users.filter(
        (user) => user.userID !== selectedUser.userID
      );
      setUsers(newUsers);
      setShowRemoveUserDialog(false);
    } else if (
      response.status === "failed" &&
      response.message === "User Not Found"
    ) {
      setShowRemoveUserDialog(false);
      setErrorMessage("المستخدم غير مسجل مسبقا");
      setShowErrorDialog(true);
    } else {
      setShowRemoveUserDialog(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
    }
  };

  const onRemoveUserCancel = () => {
    setShowRemoveUserDialog(false);
  };

  // functions for the adding new user usecase
  const handleAddUserClick = () => {
    setShowNewUserForm(true);
  };

  const onAddUserConfirm = async (user) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/add-new-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      setUsers([...users, response.userInfo]);
      setShowNewUserForm(false);
    } else {
      setShowNewUserForm(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onAddUserCancel = () => {
    setShowNewUserForm(false);
  };

  // functions for the assigning a student to class usecase
  const handleAssignToClassClick = (user) => {
    setSelectedUser(user);
    setShowAssignToClassDialog(true);
  };

  const onAssignToClassConfirm = async (clas) => {
    let url =
      selectedUser.role === "Student"
        ? "assign-student-to-class"
        : "assign-teacher-to-class";
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/${url}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: selectedUser.userID,
          classID: clas.classID,
        }),
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      setShowAssignToClassDialog(false);
    } else {
      setShowAssignToClassDialog(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onAssignToClassCancel = () => {
    setShowAssignToClassDialog(false);
  };

  // functions for the adding new class usecase
  const handleAddClassClick = () => {
    setShowNewClassForm(true);
  };

  const onAddClassConfirm = async (className) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/add-class`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ className: className }),
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      setClasses([...classes, response.class]);
      setShowNewClassForm(false);
    } else {
      setShowNewClassForm(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onAddClassCancel = () => {
    setShowNewClassForm(false);
  };

  // functions for the renaming class usecase
  const handleRenameClassClick = (clas) => {
    setSelectedClass(clas);
    setShowRenameClassDialog(true);
  };

  const onRenameClassConfirm = async (newName) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/set-class-name`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classID: selectedClass.classID,
          className: newName,
        }),
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      let newClasses = classes.filter(
        (clas) => clas.classID !== selectedClass.classID
      );
      newClasses.push({ classID: selectedClass.classID, className: newName });
      setClasses(newClasses);
      setShowRenameClassDialog(false);
    } else {
      setShowRenameClassDialog(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onRenameClassCancel = () => {
    setShowRenameClassDialog(false);
  };

  // functions for the removing class function
  const handleRemoveClassClick = (clas) => {
    setSelectedClass(clas);
    setShowRemoveClassDialog(true);
  };

  const onRemoveClassConfirm = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/admin/remove-class/${selectedClass.classID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();
    if (response.status === "success") {
      let newClasses = classes.filter(
        (clas) => clas.classID !== selectedClass.classID
      );
      setClasses(newClasses);
      setShowRemoveClassDialog(false);
    } else {
      setShowRemoveClassDialog(false);
      setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
      setShowErrorDialog(true);
      console.log(response);
    }
  };

  const onRemoveClassCancel = () => {
    setShowRemoveClassDialog(false);
  };

  // setShowAssignToClassDialog(false);
  // setErrorMessage("حدث خطأ، يرجى المحاولة لاحقا");
  // setShowErrorDialog(true);
  // console.log(response);
  return (
    <div className="admin-page">
      <Header isLoginPage={false} />
      {showErrorDialog && (
        <div className="error-dialog">
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="admin-container">
        {showUsers ? (
          <div className="users-view-container">
            <h3>{"جدول المستخدمين"}</h3>
            <table className="users-table">
              <thead>
                <tr>
                  <th>{"الرقم المميز"}</th>
                  <th>{"الاسم"}</th>
                  <th>{"نوع المستخدم"}</th>
                  <th>{"الاجراءات"}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.userID}</td>
                      <td>{user.name}</td>
                      <td>
                        {user.role === "Student"
                          ? "طالب"
                          : user.role === "Teacher"
                          ? "معلم"
                          : "مدير"}
                      </td>
                      <td>
                        <button onClick={() => handleResetPasswrodClick(user)}>
                          {"تغيير كلمة السر"}
                        </button>
                        {user.role !== "Admin" ? (
                          <button
                            onClick={() => handleAssignToClassClick(user)}
                          >
                            {user.role === "Student"
                              ? "نقل الطالب لحلقة"
                              : "تعيين كمعلم حلقة"}
                          </button>
                        ) : null}
                        <button onClick={() => handleRemoveUserClick(user)}>
                          {"إزالة المستحدم"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="btns">
              <button className="add-user" onClick={() => handleAddUserClick()}>
                {"إضافة مستخدم جديد"}
              </button>
              <button
                className="manage-classes"
                onClick={() => setShowUsers(false)}
              >
                {"إدارة الحلقات"}
              </button>
            </div>
          </div>
        ) : (
          <div className="classes-view-container">
            <h3>{"جدول الحلقات"}</h3>
            <table className="classes-table">
              <thead>
                <tr>
                  <th>{"الرقم المميز"}</th>
                  <th>{"اسم الحلقة"}</th>
                  <th>{"الاجراءات"}</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((clas, index) => {
                  return (
                    <tr key={index}>
                      <td>{clas.classID}</td>
                      <td>{clas.className}</td>
                      <td>
                        <button
                          className="rename-classs"
                          onClick={() => handleRenameClassClick(clas)}
                        >
                          {"إعادة تسمية الحلقة"}
                        </button>
                        <button
                          className="remove-class"
                          onClick={() => handleRemoveClassClick(clas)}
                        >
                          {"إزالة الحلقة"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="btns">
              <button
                className="add-class"
                onClick={() => handleAddClassClick()}
              >
                {"إضافة حلقة جديدة"}
              </button>
              <button
                className="manage-students"
                onClick={() => setShowUsers(true)}
              >
                {"إدارة المستخدمين"}
              </button>
            </div>
          </div>
        )}

        {showResetPasswordDialog ? (
          <ResetPasswordDialog
            user={selectedUser}
            onClose={onResetPasswrodCancel}
            onSubmit={onResetPasswrodConfirm}
          />
        ) : null}

        {showRemoveUserDialog ? (
          <RemoveUserDialog
            user={selectedUser}
            onCancel={onRemoveUserCancel}
            onConfirm={onRemoveUserConfirm}
          />
        ) : null}

        {showNewUserForm ? (
          <NewUserForm onClose={onAddUserCancel} onSubmit={onAddUserConfirm} />
        ) : null}

        {showAssignToClassDialog ? (
          <AssignToClassDialog
            user={selectedUser}
            classes={classes}
            onCancel={onAssignToClassCancel}
            onConfirm={onAssignToClassConfirm}
          />
        ) : null}

        {showNewClassForm ? (
          <NewClassForm
            onClose={onAddClassCancel}
            onConfirm={onAddClassConfirm}
          />
        ) : null}

        {showRemoveClassDialog ? (
          <RemoveClassDialog
            className={selectedClass.className}
            onCancel={onRemoveClassCancel}
            onConfirm={onRemoveClassConfirm}
          />
        ) : null}

        {showRenameClassDialog ? (
          <RenameClassDialog
            clas={selectedClass}
            onCancel={onRenameClassCancel}
            onConfirm={onRenameClassConfirm}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Admin;
