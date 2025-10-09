import { BookOpen, Calendar, FileText, Home, Library, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface LMSNavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  deadlineCount: number;
}

export default function LMSNavigation({ currentView, setCurrentView, deadlineCount }: LMSNavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: deadlineCount > 0 ? deadlineCount : null },
    { id: 'workbooks', label: 'Workbooks', icon: Calendar },
    { id: 'library', label: 'Reference Library', icon: Library },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="w-64 bg-card border-r border-border p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">EduPortal</h1>
        <p className="text-sm text-muted-foreground">Learning Management System</p>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setCurrentView(item.id)}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="destructive" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {deadlineCount > 0 && (
        <div className="mt-8 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Upcoming Deadlines</span>
          </div>
          <p className="text-xs text-muted-foreground">
            You have {deadlineCount} assignment{deadlineCount > 1 ? 's' : ''} due soon
          </p>
        </div>
      )}
    </nav>
  );
}