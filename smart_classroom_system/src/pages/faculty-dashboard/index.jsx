import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TodaySchedule from './components/TodaySchedule';
import AttendanceOverview from './components/AttendanceOverview';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import TeachingQuality from './components/TeachingQuality';
import QuickActions from './components/QuickActions';
import StudentManagement from './components/StudentManagement';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FacultyDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'quality', label: 'Teaching Quality', icon: 'Award' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  const facultyStats = [
    {
      title: "Today\'s Classes",
      value: "4",
      change: "+1 from yesterday",
      trend: "up",
      icon: "BookOpen",
      color: "text-primary bg-primary/10"
    },
    {
      title: "Active Students",
      value: "156",
      change: "+12 this week",
      trend: "up",
      icon: "Users",
      color: "text-success bg-success/10"
    },
    {
      title: "Avg Attendance",
      value: "89.5%",
      change: "+2.3% this month",
      trend: "up",
      icon: "CheckSquare",
      color: "text-warning bg-warning/10"
    },
    {
      title: "Teaching Rating",
      value: "4.3/5",
      change: "+0.2 this semester",
      trend: "up",
      icon: "Star",
      color: "text-secondary bg-secondary/10"
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: "Software Engineering",
      time: "14:00 - 15:30",
      room: "CS-103",
      students: 42,
      status: "upcoming"
    },
    {
      id: 2,
      subject: "Computer Networks",
      time: "16:00 - 17:30",
      room: "CS-104",
      students: 35,
      status: "upcoming"
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodaySchedule />
              <AttendanceOverview />
            </div>
            <PerformanceAnalytics />
          </div>
        );
      case 'analytics':
        return <PerformanceAnalytics />;
      case 'students':
        return <StudentManagement />;
      case 'quality':
        return <TeachingQuality />;
      case 'actions':
        return <QuickActions />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodaySchedule />
              <AttendanceOverview />
            </div>
            <PerformanceAnalytics />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={sidebarCollapsed} 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 pt-16 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Faculty Dashboard</h1>
                <p className="text-text-secondary mt-2">
                  Welcome back, Prof. John Doe • {currentTime?.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => handleNavigation('/class-management')}
                >
                  View Schedule
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="CheckSquare"
                  iconPosition="left"
                  onClick={() => handleNavigation('/attendance-tracking')}
                >
                  Mark Attendance
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {facultyStats?.map((stat, index) => (
              <div key={index} className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat?.title}</p>
                    <p className="text-2xl font-semibold text-text-primary mt-1">{stat?.value}</p>
                    <p className="text-sm text-success mt-1">{stat?.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.color}`}>
                    <Icon name={stat?.icon} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {dashboardTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {renderTabContent()}
          </div>

          {/* Quick Access Panel */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Classes */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-text-primary">Upcoming Classes</h3>
                  <Button variant="ghost" size="sm" iconName="Calendar">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingClasses?.map((classItem) => (
                    <div key={classItem?.id} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary">{classItem?.subject}</p>
                          <p className="text-sm text-text-secondary">{classItem?.time} • {classItem?.room}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-text-secondary">{classItem?.students} students</p>
                          <Button variant="outline" size="sm" className="mt-1">
                            Prepare
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="text-lg font-medium text-text-primary mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-sm text-text-secondary">Attendance System</span>
                    </div>
                    <span className="text-sm text-success">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-sm text-text-secondary">Recording System</span>
                    </div>
                    <span className="text-sm text-success">Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-sm text-text-secondary">Notification Service</span>
                    </div>
                    <span className="text-sm text-success">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                      <span className="text-sm text-text-secondary">AI Analysis</span>
                    </div>
                    <span className="text-sm text-warning">Processing</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h3 className="text-lg font-medium text-text-primary mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => handleNavigation('/student-dashboard')}
                    className="w-full justify-start"
                  >
                    Student Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="BookOpen"
                    iconPosition="left"
                    onClick={() => handleNavigation('/class-management')}
                    className="w-full justify-start"
                  >
                    Class Management
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="CheckSquare"
                    iconPosition="left"
                    onClick={() => handleNavigation('/attendance-tracking')}
                    className="w-full justify-start"
                  >
                    Attendance Tracking
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    onClick={() => handleNavigation('/admin-dashboard')}
                    className="w-full justify-start"
                  >
                    Admin Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;