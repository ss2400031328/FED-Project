import * as React from "react";
import { useState } from "react";
import { PortalSelection } from "./components/PortalSelection";
import { StudentLogin } from "./components/StudentLogin.jsx";
import { TeacherLogin } from "./components/TeacherLogin.jsx";
import { StudentDashboard } from "./components/StudentDashboard.jsx";
import { TeacherDashboard } from "./components/TeacherDashboard.jsx";
export default function App() {
  const [currentView, setCurrentView] = useState("portal-selection");
  const [currentUser, setCurrentUser] = useState(null);
  const handlePortalSelect = portal => {
    if (portal === "student") {
      setCurrentView("student-login");
    } else {
      setCurrentView("teacher-login");
    }
  };
  const handleStudentLogin = student => {
    setCurrentUser(student);
    setCurrentView("student-dashboard");
  };
  const handleTeacherLogin = teacher => {
    // Debug: log teacher object being set as current user
    // eslint-disable-next-line no-console
    console.log('handleTeacherLogin - setting currentUser:', teacher);
    // Previously we showed a blocking alert for debugging; remove it so login flows directly
    // eslint-disable-next-line no-console
    console.debug('Teacher login object (debug):', teacher);
    setCurrentUser(teacher);
    setCurrentView("teacher-dashboard");
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("portal-selection");
  };
  switch (currentView) {
    case "portal-selection":
      return /*#__PURE__*/React.createElement(PortalSelection, {
        onPortalSelect: handlePortalSelect
      });
    case "student-login":
      return /*#__PURE__*/React.createElement(StudentLogin, {
        onLogin: handleStudentLogin,
        onBack: () => setCurrentView("portal-selection")
      });
    case "teacher-login":
      return /*#__PURE__*/React.createElement(TeacherLogin, {
        onLogin: handleTeacherLogin,
        onBack: () => setCurrentView("portal-selection")
      });
    case "student-dashboard":
      return /*#__PURE__*/React.createElement(StudentDashboard, {
        user: currentUser,
        onLogout: handleLogout
      });
    case "teacher-dashboard":
      return /*#__PURE__*/React.createElement(TeacherDashboard, {
        user: currentUser,
        onLogout: handleLogout
      });
    default:
      return /*#__PURE__*/React.createElement(PortalSelection, {
        onPortalSelect: handlePortalSelect
      });
  }
}