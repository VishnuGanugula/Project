import { useState } from 'react';
import Dashboard from './components/Dashboard';
import SignInPage from './components/SignInPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentInfo, setStudentInfo] = useState<{ id: string; name: string } | null>(null);

  const handleSignIn = (studentId: string, password: string) => {
    if (studentId && password) {
      setTimeout(() => {
        setIsLoggedIn(true);
        setStudentInfo({ id: studentId, name: 'Student User' });
      }, 300);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStudentInfo(null);
  };

  if (!isLoggedIn) {
    return (
      <>
        <SignInPage onSignIn={handleSignIn} onSwitchToSignUp={() => {}} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="h-screen bg-background">
      <Dashboard onLogout={handleLogout} />
      <Toaster />
    </div>
  );
}
