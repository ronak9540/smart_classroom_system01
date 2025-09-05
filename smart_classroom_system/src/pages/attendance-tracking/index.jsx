import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AttendanceMethodCard from './components/AttendanceMethodCard';
import CurrentClassInfo from './components/CurrentClassInfo';
import AttendanceHistory from './components/AttendanceHistory';
import AttendanceAnalytics from './components/AttendanceAnalytics';

const AttendanceTracking = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('mark');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const navigate = useNavigate();

  // Mock current class data
  const currentClass = {
    subject: 'Advanced Data Structures',
    code: 'CS301',
    faculty: 'Dr. Priya Sharma',
    department: 'Computer Science',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    room: 'Room 101',
    building: 'Engineering Block A',
    attendanceWindow: '15 minutes from start'
  };

  // Mock attendance history data
  const attendanceData = [
    {
      date: '2025-01-05',
      day: 'Sunday',
      subject: 'Advanced Data Structures',
      code: 'CS301',
      time: '10:00 AM',
      method: 'QR Code',
      status: 'Present',
      faculty: 'Dr. Priya Sharma'
    },
    {
      date: '2025-01-03',
      day: 'Friday',
      subject: 'Database Management',
      code: 'CS302',
      time: '2:00 PM',
      method: 'Face Recognition',
      status: 'Present',
      faculty: 'Prof. Rajesh Kumar'
    },
    {
      date: '2025-01-02',
      day: 'Thursday',
      subject: 'Software Engineering',
      code: 'CS303',
      time: '11:00 AM',
      method: 'GPS Location',
      status: 'Late',
      faculty: 'Dr. Anita Singh'
    },
    {
      date: '2025-01-01',
      day: 'Wednesday',
      subject: 'Machine Learning',
      code: 'CS304',
      time: '9:00 AM',
      method: 'QR Code',
      status: 'Absent',
      faculty: 'Dr. Vikram Patel'
    },
    {
      date: '2024-12-30',
      day: 'Monday',
      subject: 'Advanced Data Structures',
      code: 'CS301',
      time: '10:00 AM',
      method: 'Face Recognition',
      status: 'Present',
      faculty: 'Dr. Priya Sharma'
    }
  ];

  // Mock analytics data
  const analyticsData = {
    subjectWise: [
      {
        name: 'Advanced Data Structures',
        code: 'CS301',
        attended: 28,
        totalClasses: 32
      },
      {
        name: 'Database Management',
        code: 'CS302',
        attended: 25,
        totalClasses: 30
      },
      {
        name: 'Software Engineering',
        code: 'CS303',
        attended: 22,
        totalClasses: 28
      },
      {
        name: 'Machine Learning',
        code: 'CS304',
        attended: 20,
        totalClasses: 26
      },
      {
        name: 'Computer Networks',
        code: 'CS305',
        attended: 18,
        totalClasses: 24
      }
    ]
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleAttendanceSubmit = () => {
    setAttendanceMarked(true);
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 2000);
  };

  const tabs = [
    { id: 'mark', label: 'Mark Attendance', icon: 'CheckSquare' },
    { id: 'history', label: 'History', icon: 'History' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  if (attendanceMarked) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          isCollapsed={isSidebarCollapsed} 
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={48} className="text-success" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Attendance Marked Successfully!</h2>
              <p className="text-text-secondary mb-6">
                Your attendance for {currentClass?.subject} has been recorded using {selectedMethod} method.
              </p>
              <div className="space-y-3">
                <Button
                  variant="default"
                  iconName="Home"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => navigate('/student-dashboard')}
                  fullWidth
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => {
                    setAttendanceMarked(false);
                    setSelectedMethod(null);
                  }}
                  fullWidth
                >
                  Mark Another Attendance
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={isSidebarCollapsed} 
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Attendance Tracking</h1>
                <p className="text-text-secondary">Mark your attendance and track your progress</p>
              </div>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
                onClick={() => navigate('/student-dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
          {activeTab === 'mark' && (
            <div className="space-y-6">
              {/* Current Class Info */}
              <CurrentClassInfo currentClass={currentClass} />

              {/* Attendance Methods */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Choose Attendance Method</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <AttendanceMethodCard
                    method="qr"
                    onMethodSelect={handleMethodSelect}
                    isActive={selectedMethod === 'qr'}
                    currentClass={currentClass}
                  />
                  <AttendanceMethodCard
                    method="face"
                    onMethodSelect={handleMethodSelect}
                    isActive={selectedMethod === 'face'}
                    currentClass={currentClass}
                  />
                  <AttendanceMethodCard
                    method="gps"
                    onMethodSelect={handleMethodSelect}
                    isActive={selectedMethod === 'gps'}
                    currentClass={currentClass}
                  />
                </div>
              </div>

              {/* Submit Button */}
              {selectedMethod && (
                <div className="flex justify-center pt-6">
                  <Button
                    variant="success"
                    iconName="Check"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleAttendanceSubmit}
                    size="lg"
                  >
                    Confirm Attendance
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <AttendanceHistory attendanceData={attendanceData} />
          )}

          {activeTab === 'analytics' && (
            <AttendanceAnalytics analyticsData={analyticsData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AttendanceTracking;