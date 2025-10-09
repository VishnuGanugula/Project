import { useState } from "react";
import LoginPage from "./components/LoginPage";
import LMSNavigation from "./components/LMSNavigation";
import Dashboard from "./components/Dashboard";
import AssignmentSubmission from "./components/AssignmentSubmission";
import CoursesView from "./components/CoursesView";
import BooksReferences from "./components/BooksReferences";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [studentInfo, setStudentInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleLogin = (studentId: string, password: string) => {
    if (studentId && password) {
      setIsLoggedIn(true);
      setStudentInfo({
        id: studentId,
        name: "Student User",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentInfo(null);
    setCurrentView("dashboard");
  };

  const deadlineCount = 3;

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "courses":
        return <CoursesView />;
      case "assignments":
        return <AssignmentSubmission />;
      case "library":
        return <BooksReferences />;
      case "workbooks":
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold">Workbooks</h2>
            <p className="text-muted-foreground">
              Digital workbooks and practice exercises coming
              soon...
            </p>
          </div>
        );
      case "profile":
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold">Profile</h2>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">
                Student Information
              </h3>
              <div className="space-y-2">
                <div>
                  <strong>Student ID:</strong> {studentInfo?.id}
                </div>
                <div>
                  <strong>Name:</strong> {studentInfo?.name}
                </div>
                <div>
                  <strong>Status:</strong> Active
                </div>
                <div>
                  <strong>Year:</strong> Sophomore
                </div>
                <div>
                  <strong>Major:</strong> Physics
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
              >
                Logout
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      <LMSNavigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        deadlineCount={deadlineCount}
      />
      <main className="flex-1 overflow-auto">
        {renderCurrentView()}
      </main>
      <Toaster />
    </div>
  );
}