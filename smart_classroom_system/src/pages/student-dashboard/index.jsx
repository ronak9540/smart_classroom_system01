import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AttendanceCard from './components/AttendanceCard';
import UpcomingClassesCard from './components/UpcomingClassesCard';
import NotificationsPanel from './components/NotificationsPanel';
import AcademicPerformanceCard from './components/AcademicPerformanceCard';
import QuickActionsGrid from './components/QuickActionsGrid';
import GamificationPanel from './components/GamificationPanel';
import AIRecommendationsCard from './components/AIRecommendationsCard';
import RealTimeUpdatesCard from './components/RealTimeUpdatesCard';

const StudentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for attendance
  const attendanceData = {
    percentage: 82,
    present: 41,
    total: 50,
    trend: 'up'
  };

  // Mock data for upcoming classes
  const upcomingClasses = [
    {
      subject: "Data Structures & Algorithms",
      time: "09:00",
      room: "Lab-101",
      faculty: "Dr. Priya Sharma",
      status: "upcoming"
    },
    {
      subject: "Database Management Systems",
      time: "11:00",
      room: "Room-205",
      faculty: "Prof. Rajesh Kumar",
      status: "upcoming"
    },
    {
      subject: "Computer Networks",
      time: "14:00",
      room: "Room-301",
      faculty: "Dr. Anita Singh",
      status: "upcoming"
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "Assignment Submission Reminder",
      message: "DSA Assignment due tomorrow at 11:59 PM",
      timestamp: new Date(Date.now() - 1800000),
      unread: true
    },
    {
      id: 2,
      type: "class",
      title: "Class Rescheduled",
      message: "DBMS class moved to 2:00 PM today",
      timestamp: new Date(Date.now() - 3600000),
      unread: true
    },
    {
      id: 3,
      type: "grade",
      title: "Test Results Published",
      message: "Computer Networks mid-term results are now available",
      timestamp: new Date(Date.now() - 7200000),
      unread: false
    },
    {
      id: 4,
      type: "reminder",
      title: "Lab Session Tomorrow",
      message: "Don\'t forget your lab manual for tomorrow\'s session",
      timestamp: new Date(Date.now() - 14400000),
      unread: false
    }
  ];

  // Mock data for academic performance
  const performanceData = {
    currentGPA: 8.2,
    subjectPerformance: [
      { subject: "DSA", grade: 9.1 },
      { subject: "DBMS", grade: 8.5 },
      { subject: "CN", grade: 7.8 },
      { subject: "OS", grade: 8.9 },
      { subject: "SE", grade: 7.2 }
    ],
    lowPerformingSubjects: [
      { name: "Software Engineering", grade: 7.2 },
      { name: "Computer Networks", grade: 7.8 }
    ],
    semesterTrend: [
      { semester: "Sem 1", gpa: 7.8 },
      { semester: "Sem 2", gpa: 8.1 },
      { semester: "Sem 3", gpa: 8.2 }
    ]
  };

  // Mock data for gamification
  const gamificationData = {
    badges: [
      {
        name: "Perfect Attendance",
        description: "100% attendance for a week",
        type: "attendance",
        rarity: "gold",
        earnedDate: "2025-01-02"
      },
      {
        name: "Top Performer",
        description: "Highest score in class test",
        type: "performance",
        rarity: "silver",
        earnedDate: "2025-01-01"
      },
      {
        name: "Active Participant",
        description: "Asked 5 questions in class",
        type: "participation",
        rarity: "bronze",
        earnedDate: "2024-12-30"
      },
      {
        name: "Study Streak",
        description: "7 days continuous learning",
        type: "streak",
        rarity: "gold",
        earnedDate: "2024-12-28"
      }
    ],
    currentStreak: 12,
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 3000,
    achievements: [
      {
        title: "Completed DSA Assignment",
        points: 50,
        date: "2025-01-03"
      },
      {
        title: "Attended All Classes This Week",
        points: 100,
        date: "2025-01-02"
      },
      {
        title: "Scored 90+ in Quiz",
        points: 75,
        date: "2025-01-01"
      }
    ]
  };

  // Mock data for AI recommendations
  const aiRecommendations = [
    {
      category: "content",
      title: "Advanced Tree Algorithms",
      description: "Based on your DSA performance, practice more tree problems",
      type: "practice",
      subject: "DSA",
      priority: "high",
      matchPercentage: 95,
      estimatedTime: "2 hours"
    },
    {
      category: "content",
      title: "Database Normalization Video",
      description: "Strengthen your DBMS concepts with this tutorial",
      type: "video",
      subject: "DBMS",
      priority: "medium",
      matchPercentage: 88,
      estimatedTime: "45 min"
    },
    {
      category: "study",
      title: "Visual Learning Technique",
      description: "Your learning style analysis suggests visual aids help you learn better",
      type: "article",
      subject: "General",
      priority: "low",
      matchPercentage: 92,
      estimatedTime: "15 min"
    },
    {
      category: "resources",
      title: "Interactive CN Simulator",
      description: "Practice network protocols with this simulation tool",
      type: "quiz",
      subject: "CN",
      priority: "medium",
      matchPercentage: 85,
      estimatedTime: "1 hour"
    }
  ];

  // Mock data for real-time updates
  const realTimeUpdates = [
    {
      id: 1,
      type: "reminder",
      title: "Class Starting Soon",
      message: "DSA class starts in 30 minutes in Lab-101",
      timestamp: new Date(Date.now() - 300000),
      priority: "high"
    },
    {
      id: 2,
      type: "announcement",
      title: "Library Hours Extended",
      message: "Library will remain open until 10 PM this week",
      timestamp: new Date(Date.now() - 900000),
      priority: "medium"
    },
    {
      id: 3,
      type: "assignment",
      title: "New Assignment Posted",
      message: "DBMS assignment on normalization has been posted",
      timestamp: new Date(Date.now() - 1800000),
      priority: "medium",
      action: "View Assignment"
    },
    {
      id: 4,
      type: "class_change",
      title: "Venue Changed",
      message: "OS class moved from Room-205 to Lab-102",
      timestamp: new Date(Date.now() - 3600000),
      priority: "high"
    }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={handleSidebarToggle} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back, Arjun! 👋
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your studies today, January 5th, 2025
            </p>
          </div>

          {/* Top Row - Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <AttendanceCard attendanceData={attendanceData} />
            <UpcomingClassesCard classes={upcomingClasses} />
            <NotificationsPanel notifications={notifications} />
          </div>

          {/* Middle Row - Performance and Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <AcademicPerformanceCard performanceData={performanceData} />
            <QuickActionsGrid />
          </div>

          {/* Bottom Row - Gamification and AI */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <GamificationPanel gamificationData={gamificationData} />
            <AIRecommendationsCard recommendations={aiRecommendations} />
          </div>

          {/* Final Row - Real-time Updates */}
          <div className="grid grid-cols-1 gap-6">
            <RealTimeUpdatesCard updates={realTimeUpdates} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;