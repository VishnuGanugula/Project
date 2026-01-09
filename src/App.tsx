import { useState } from "react";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import LMSNavigation from "./components/LMSNavigation";
import Dashboard from "./components/Dashboard";
import AssignmentSubmission from "./components/AssignmentSubmission";
import CoursesView from "./components/CoursesView";
import BooksReferences from "./components/BooksReferences";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [authView, setAuthView] = useState<"signin" | "signup">("signin");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [studentInfo, setStudentInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleSignIn = (studentId: string, password: string) => {
    if (studentId && password) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setStudentInfo({
          id: studentId,
          name: "Student User",
        });
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleSignUp = (studentId: string, email: string, password: string, confirmPassword: string) => {
    if (studentId && email && password && confirmPassword && password === confirmPassword) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setStudentInfo({
          id: studentId,
          name: "Student User",
        });
        setIsTransitioning(false);
      }, 300);
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
        return <Dashboard onLogout={handleLogout} />;
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
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {authView === "signin" ? (
            <SignInPage 
              onSignIn={handleSignIn}
              onSwitchToSignUp={() => setAuthView("signup")}
            />
          ) : (
            <SignUpPage 
              onSignUp={handleSignUp}
              onSwitchToSignIn={() => setAuthView("signin")}
            />
          )}
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <div className={`h-screen flex bg-background transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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