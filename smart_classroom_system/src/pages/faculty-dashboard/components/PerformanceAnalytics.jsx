import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceAnalytics = () => {
  const [selectedView, setSelectedView] = useState('attendance');

  const attendanceData = [
    { subject: 'DSA', attendance: 87, engagement: 92, performance: 85 },
    { subject: 'DBMS', attendance: 92, engagement: 88, performance: 90 },
    { subject: 'SE', attendance: 78, engagement: 85, performance: 82 },
    { subject: 'CN', attendance: 85, engagement: 90, performance: 87 }
  ];

  const engagementTrend = [
    { week: 'Week 1', engagement: 85, videoCompletion: 78, participation: 92 },
    { week: 'Week 2', engagement: 88, videoCompletion: 82, participation: 89 },
    { week: 'Week 3', engagement: 92, videoCompletion: 85, participation: 95 },
    { week: 'Week 4', engagement: 89, videoCompletion: 88, participation: 91 },
    { week: 'Week 5', engagement: 94, videoCompletion: 91, participation: 97 }
  ];

  const performanceDistribution = [
    { name: 'Excellent (90-100%)', value: 25, color: '#10B981' },
    { name: 'Good (80-89%)', value: 35, color: '#3B82F6' },
    { name: 'Average (70-79%)', value: 28, color: '#F59E0B' },
    { name: 'Below Average (<70%)', value: 12, color: '#EF4444' }
  ];

  const lowPerformingStudents = [
    {
      id: 1,
      name: "Amit Singh",
      studentId: "CS2021015",
      subjects: ["Data Structures", "Database Management"],
      avgScore: 65,
      attendance: 72,
      trend: "declining",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
      id: 2,
      name: "Kavya Reddy",
      studentId: "CS2021028",
      subjects: ["Software Engineering"],
      avgScore: 68,
      attendance: 78,
      trend: "stable",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 3,
      name: "Rohit Sharma",
      studentId: "CS2021042",
      subjects: ["Computer Networks", "Data Structures"],
      avgScore: 62,
      attendance: 69,
      trend: "declining",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return { icon: 'TrendingUp', color: 'text-success' };
      case 'declining': return { icon: 'TrendingDown', color: 'text-error' };
      case 'stable': return { icon: 'Minus', color: 'text-warning' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const renderChart = () => {
    switch (selectedView) {
      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#3B82F6" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} name="Engagement %" />
              <Line type="monotone" dataKey="videoCompletion" stroke="#F59E0B" strokeWidth={2} name="Video Completion %" />
              <Line type="monotone" dataKey="participation" stroke="#8B5CF6" strokeWidth={2} name="Participation %" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Performance Analytics</h2>
        <div className="flex items-center space-x-2">
          {[
            { key: 'attendance', label: 'Attendance', icon: 'CheckSquare' },
            { key: 'engagement', label: 'Engagement', icon: 'Activity' },
            { key: 'performance', label: 'Performance', icon: 'BarChart3' }
          ]?.map((view) => (
            <Button
              key={view?.key}
              variant={selectedView === view?.key ? "default" : "ghost"}
              size="sm"
              iconName={view?.icon}
              iconPosition="left"
              onClick={() => setSelectedView(view?.key)}
            >
              {view?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart Section */}
      <div className="mb-8">
        <div className="bg-muted/30 rounded-lg p-4">
          {renderChart()}
        </div>
      </div>
      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Subject Performance</h3>
          {attendanceData?.map((subject) => (
            <div key={subject?.subject} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{subject?.subject}</h4>
                <span className="text-sm text-text-secondary">Overall: {subject?.performance}%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Attendance</span>
                  <span className="font-medium">{subject?.attendance}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${subject?.attendance}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Engagement</span>
                  <span className="font-medium">{subject?.engagement}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full" 
                    style={{ width: `${subject?.engagement}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Low Performing Students */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">Students Needing Attention</h3>
            <Button variant="outline" size="sm" iconName="MessageSquare">
              Send Alerts
            </Button>
          </div>
          
          {lowPerformingStudents?.map((student) => {
            const trendInfo = getTrendIcon(student?.trend);
            return (
              <div key={student?.id} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student?.avatar}
                      alt={student?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{student?.name}</p>
                      <p className="text-sm text-text-secondary">{student?.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={trendInfo?.icon} size={16} className={trendInfo?.color} />
                    <span className={`text-sm ${trendInfo?.color}`}>
                      {student?.trend?.charAt(0)?.toUpperCase() + student?.trend?.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Average Score</span>
                    <span className="font-medium text-error">{student?.avgScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Attendance</span>
                    <span className="font-medium text-warning">{student?.attendance}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-text-secondary">Struggling with: </span>
                    <span className="text-text-primary">{student?.subjects?.join(', ')}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="MessageCircle">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" iconName="BookOpen">
                    Resources
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;