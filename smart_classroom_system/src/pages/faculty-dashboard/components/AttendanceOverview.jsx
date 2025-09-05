import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const attendanceData = {
    today: {
      totalClasses: 4,
      completedClasses: 2,
      averageAttendance: 89.5,
      totalStudents: 160,
      presentStudents: 143,
      lateArrivals: 8,
      earlyDepartures: 3
    },
    week: {
      totalClasses: 20,
      completedClasses: 18,
      averageAttendance: 87.2,
      totalStudents: 800,
      presentStudents: 698,
      lateArrivals: 45,
      earlyDepartures: 23
    },
    month: {
      totalClasses: 80,
      completedClasses: 76,
      averageAttendance: 85.8,
      totalStudents: 3200,
      presentStudents: 2746,
      lateArrivals: 189,
      earlyDepartures: 97
    }
  };

  const recentAttendance = [
    {
      id: 1,
      studentName: "Arjun Sharma",
      studentId: "CS2021001",
      subject: "Database Management",
      checkInTime: "11:02 AM",
      method: "QR Code",
      status: "present",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      studentName: "Priya Patel",
      studentId: "CS2021002",
      subject: "Database Management",
      checkInTime: "11:05 AM",
      method: "Face Recognition",
      status: "late",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      studentName: "Rahul Kumar",
      studentId: "CS2021003",
      subject: "Database Management",
      checkInTime: "11:01 AM",
      method: "GPS Verification",
      status: "present",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      studentName: "Sneha Gupta",
      studentId: "CS2021004",
      subject: "Database Management",
      checkInTime: "11:08 AM",
      method: "QR Code",
      status: "late",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  const currentData = attendanceData?.[selectedPeriod];

  const getMethodIcon = (method) => {
    switch (method) {
      case 'QR Code': return 'QrCode';
      case 'Face Recognition': return 'Scan';
      case 'GPS Verification': return 'MapPin';
      default: return 'CheckSquare';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-success bg-success/10';
      case 'late': return 'text-warning bg-warning/10';
      case 'absent': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Attendance Overview</h2>
        <div className="flex items-center space-x-2">
          {['today', 'week', 'month']?.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period?.charAt(0)?.toUpperCase() + period?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Average Attendance</p>
              <p className="text-2xl font-semibold text-primary">{currentData?.averageAttendance}%</p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-success/5 rounded-lg p-4 border border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Present Students</p>
              <p className="text-2xl font-semibold text-success">{currentData?.presentStudents}</p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="UserCheck" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Late Arrivals</p>
              <p className="text-2xl font-semibold text-warning">{currentData?.lateArrivals}</p>
            </div>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-error/5 rounded-lg p-4 border border-error/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Early Departures</p>
              <p className="text-2xl font-semibold text-error">{currentData?.earlyDepartures}</p>
            </div>
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="LogOut" size={20} className="text-error" />
            </div>
          </div>
        </div>
      </div>
      {/* Recent Check-ins */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Recent Check-ins</h3>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {recentAttendance?.map((student) => (
            <div key={student?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={student?.avatar}
                  alt={student?.studentName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-text-primary">{student?.studentName}</p>
                  <p className="text-sm text-text-secondary">{student?.studentId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{student?.checkInTime}</p>
                  <div className="flex items-center space-x-1">
                    <Icon name={getMethodIcon(student?.method)} size={12} />
                    <span className="text-xs text-text-secondary">{student?.method}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                  {student?.status?.charAt(0)?.toUpperCase() + student?.status?.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" iconName="Eye">
            View All Check-ins
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;