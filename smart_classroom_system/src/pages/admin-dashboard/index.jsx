import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import DepartmentPerformance from './components/DepartmentPerformance';
import SystemMonitoring from './components/SystemMonitoring';
import UserManagement from './components/UserManagement';
import ReportsAnalytics from './components/ReportsAnalytics';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const institutionMetrics = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      changeType: "increase",
      icon: "GraduationCap",
      color: "primary"
    },
    {
      title: "Active Faculty",
      value: "112",
      change: "+3%",
      changeType: "increase",
      icon: "Users",
      color: "secondary"
    },
    {
      title: "Overall Attendance",
      value: "89.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: "CheckSquare",
      color: "success"
    },
    {
      title: "System Uptime",
      value: "99.8%",
      change: "0%",
      changeType: "stable",
      icon: "Activity",
      color: "warning"
    },
    {
      title: "Parent Engagement",
      value: "76.5%",
      change: "+8.3%",
      changeType: "increase",
      icon: "Heart",
      color: "accent"
    },
    {
      title: "Active Classes",
      value: "145",
      change: "+5",
      changeType: "increase",
      icon: "BookOpen",
      color: "primary"
    }
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'system', label: 'System Monitoring', icon: 'Monitor' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutionMetrics?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Department Performance */}
            <DepartmentPerformance />
            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleNavigation('/student-dashboard')}
                className="p-6 bg-surface border border-border rounded-lg hover:shadow-card transition-smooth text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="GraduationCap" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Student Portal</h4>
                    <p className="text-sm text-text-secondary">View student dashboard</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/faculty-dashboard')}
                className="p-6 bg-surface border border-border rounded-lg hover:shadow-card transition-smooth text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Faculty Portal</h4>
                    <p className="text-sm text-text-secondary">Access faculty dashboard</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/attendance-tracking')}
                className="p-6 bg-surface border border-border rounded-lg hover:shadow-card transition-smooth text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckSquare" size={24} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Attendance</h4>
                    <p className="text-sm text-text-secondary">Track attendance</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleNavigation('/class-management')}
                className="p-6 bg-surface border border-border rounded-lg hover:shadow-card transition-smooth text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Classes</h4>
                    <p className="text-sm text-text-secondary">Manage classes</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'system':
        return <SystemMonitoring />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'actions':
        return <QuickActions />;
      default:
        return null;
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
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
                <p className="text-text-secondary">
                  Comprehensive institutional oversight and management
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">
                    {currentTime?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {currentTime?.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </p>
                </div>
                <Button variant="default" iconName="RefreshCw" size="sm">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabItems?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
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
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;