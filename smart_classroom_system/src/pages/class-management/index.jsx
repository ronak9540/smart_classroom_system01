import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClassControlPanel from './components/ClassControlPanel';
import StudentRoster from './components/StudentRoster';
import ContentManager from './components/ContentManager';
import NotificationCenter from './components/NotificationCenter';
import PostClassAnalytics from './components/PostClassAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClassManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isClassActive, setIsClassActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('control');
  const [showPostAnalytics, setShowPostAnalytics] = useState(false);

  // Mock class data
  const classInfo = {
    id: 'CS301-DS-001',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    section: 'A',
    room: '301',
    building: 'Computer Science Block',
    startTime: '14:00',
    endTime: '15:00',
    date: '2025-01-05',
    faculty: 'Dr. Rajesh Kumar',
    semester: 'Spring 2025'
  };

  const mockStudents = [
    {
      id: 1,
      name: 'Priya Sharma',
      rollNumber: 'CS21001',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      attendanceStatus: 'present',
      attendancePercentage: 92,
      engagementScore: 85,
      videoWatchTime: 95,
      questionsAsked: 3,
      participationScore: 88
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      rollNumber: 'CS21002',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      attendanceStatus: 'present',
      attendancePercentage: 88,
      engagementScore: 78,
      videoWatchTime: 87,
      questionsAsked: 1,
      participationScore: 75
    },
    {
      id: 3,
      name: 'Anita Patel',
      rollNumber: 'CS21003',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      attendanceStatus: 'late',
      attendancePercentage: 85,
      engagementScore: 92,
      videoWatchTime: 98,
      questionsAsked: 5,
      participationScore: 95
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rollNumber: 'CS21004',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      attendanceStatus: 'absent',
      attendancePercentage: 76,
      engagementScore: 0,
      videoWatchTime: 0,
      questionsAsked: 0,
      participationScore: 0
    },
    {
      id: 5,
      name: 'Sneha Reddy',
      rollNumber: 'CS21005',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      attendanceStatus: 'present',
      attendancePercentage: 94,
      engagementScore: 89,
      videoWatchTime: 92,
      questionsAsked: 2,
      participationScore: 87
    }
  ];

  const presentStudents = mockStudents?.filter(s => s?.attendanceStatus === 'present' || s?.attendanceStatus === 'late')?.length;
  const averageEngagement = Math.round(
    mockStudents?.filter(s => s?.attendanceStatus !== 'absent')?.reduce((acc, s) => acc + s?.engagementScore, 0) / presentStudents
  );

  const tabs = [
    { id: 'control', label: 'Class Control', icon: 'Settings' },
    { id: 'students', label: 'Students', icon: 'Users' },
    { id: 'content', label: 'Content', icon: 'FileText' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  useEffect(() => {
    // Auto-show post analytics when class ends
    if (!isClassActive && showPostAnalytics) {
      setActiveTab('analytics');
    }
  }, [isClassActive, showPostAnalytics]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleStartClass = () => {
    setIsClassActive(true);
    setShowPostAnalytics(false);
  };

  const handleEndClass = () => {
    setIsClassActive(false);
    setIsRecording(false);
    setShowPostAnalytics(true);
    setActiveTab('analytics');
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleContactStudent = (student) => {
    console.log('Contacting student:', student?.name);
    // Implementation for contacting student
  };

  const handleViewStudentDetails = (student) => {
    console.log('Viewing details for:', student?.name);
    // Implementation for viewing student details
  };

  const handleUploadNotes = (file) => {
    console.log('Uploading notes:', file?.name);
    // Implementation for uploading notes
  };

  const handleShareResource = () => {
    console.log('Sharing resource');
    // Implementation for sharing resource
  };

  const handlePostAssignment = () => {
    console.log('Posting assignment');
    // Implementation for posting assignment
  };

  const handleSendNotification = (notification) => {
    console.log('Sending notification:', notification);
    // Implementation for sending notification
  };

  const handleGenerateReport = () => {
    console.log('Generating class report');
    // Implementation for generating report
  };

  const handleCollectFeedback = () => {
    console.log('Collecting feedback');
    // Implementation for collecting feedback
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isCollapsed={isSidebarCollapsed} onToggleSidebar={handleToggleSidebar} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleToggleSidebar} />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{classInfo?.name}</h1>
                <div className="flex items-center space-x-4 mt-2 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(classInfo.date)?.toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{classInfo?.startTime} - {classInfo?.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={16} />
                    <span>Room {classInfo?.room}, {classInfo?.building}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{presentStudents}/{mockStudents?.length} Present</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => navigate('/faculty-dashboard')}
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="outline"
                  iconName="Share2"
                  iconPosition="left"
                  iconSize={16}
                >
                  Share Class Link
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab?.id
                      ? 'bg-surface text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
              
              {showPostAnalytics && (
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'analytics' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="BarChart3" size={16} />
                  <span>Analytics</span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </button>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'control' && (
              <ClassControlPanel
                isRecording={isRecording}
                onToggleRecording={handleToggleRecording}
                attendanceCount={presentStudents}
                totalStudents={mockStudents?.length}
                engagementScore={averageEngagement}
                onStartClass={handleStartClass}
                onEndClass={handleEndClass}
                isClassActive={isClassActive}
              />
            )}

            {activeTab === 'students' && (
              <StudentRoster
                students={mockStudents}
                onContactStudent={handleContactStudent}
                onViewDetails={handleViewStudentDetails}
              />
            )}

            {activeTab === 'content' && (
              <ContentManager
                onUploadNotes={handleUploadNotes}
                onShareResource={handleShareResource}
                onPostAssignment={handlePostAssignment}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationCenter
                onSendNotification={handleSendNotification}
              />
            )}

            {activeTab === 'analytics' && showPostAnalytics && (
              <PostClassAnalytics
                classData={classInfo}
                onGenerateReport={handleGenerateReport}
                onCollectFeedback={handleCollectFeedback}
              />
            )}
          </div>

          {/* Quick Actions Floating Panel */}
          {isClassActive && (
            <div className="fixed bottom-6 right-6 bg-surface border border-border rounded-lg shadow-modal p-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-text-primary">Class Live</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Mic"
                  iconSize={16}
                  className="h-8 w-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Video"
                  iconSize={16}
                  className="h-8 w-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MessageSquare"
                  iconSize={16}
                  className="h-8 w-8"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClassManagement;