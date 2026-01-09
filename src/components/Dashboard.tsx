import { Calendar, Clock, BookOpen, FileText, TrendingUp, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const recentActivities = [
    { id: 1, type: 'assignment', title: 'Physics Lab Report', course: 'Physics 101', dueDate: '2025-01-08', status: 'pending' },
    { id: 2, type: 'workbook', title: 'Chapter 5 Exercises', course: 'Mathematics', completed: true },
    { id: 3, type: 'assignment', title: 'Chemical Bonding Essay', course: 'Chemistry', dueDate: '2025-01-10', status: 'submitted' },
  ];

  const courses = [
    { id: 1, name: 'Physics 101', progress: 75, assignments: 3, workbooks: 8 },
    { id: 2, name: 'Mathematics', progress: 90, assignments: 2, workbooks: 12 },
    { id: 3, name: 'Chemistry', progress: 60, assignments: 4, workbooks: 6 },
    { id: 4, name: 'Computer Science', progress: 85, assignments: 1, workbooks: 10 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header with Logout Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Student!</h2>
          <p className="text-muted-foreground">Here's your learning progress overview</p>
        </div>
        {onLogout && (
          <Button 
            onClick={onLogout} 
            variant="destructive"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Enrolled courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77%</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Your progress across all enrolled courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{course.name}</span>
                <span className="text-sm text-muted-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{course.assignments} assignments</span>
                <span>{course.workbooks} workbook entries</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest assignments and workbook entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.type === 'assignment' ? 
                    <FileText className="h-4 w-4 text-blue-500" /> : 
                    <BookOpen className="h-4 w-4 text-green-500" />
                  }
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activity.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.dueDate}
                    </div>
                  )}
                  <Badge variant={
                    activity.status === 'submitted' ? 'default' : 
                    activity.status === 'pending' ? 'destructive' : 
                    'secondary'
                  }>
                    {activity.status || 'completed'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}