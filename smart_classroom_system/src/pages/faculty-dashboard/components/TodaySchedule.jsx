import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodaySchedule = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const todayClasses = [
    {
      id: 1,
      subject: "Data Structures & Algorithms",
      time: "09:00 - 10:30",
      room: "CS-101",
      students: 45,
      attendanceRate: 87,
      status: "completed",
      isRecording: false
    },
    {
      id: 2,
      subject: "Database Management Systems",
      time: "11:00 - 12:30",
      room: "CS-102",
      students: 38,
      attendanceRate: 92,
      status: "ongoing",
      isRecording: true
    },
    {
      id: 3,
      subject: "Software Engineering",
      time: "14:00 - 15:30",
      room: "CS-103",
      students: 42,
      attendanceRate: 0,
      status: "upcoming",
      isRecording: false
    },
    {
      id: 4,
      subject: "Computer Networks",
      time: "16:00 - 17:30",
      room: "CS-104",
      students: 35,
      attendanceRate: 0,
      status: "upcoming",
      isRecording: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'ongoing': return 'text-primary bg-primary/10';
      case 'upcoming': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'ongoing': return 'Play';
      case 'upcoming': return 'Clock';
      default: return 'Circle';
    }
  };

  const handleRecordingToggle = (classId) => {
    console.log(`Toggle recording for class ${classId}`);
  };

  const handleQuickAction = (action, classId) => {
    console.log(`${action} for class ${classId}`);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Today's Schedule</h2>
          <p className="text-sm text-text-secondary mt-1">
            {currentTime?.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            View Full Schedule
          </Button>
          <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
            Add Class
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {todayClasses?.map((classItem) => (
          <div key={classItem?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-text-primary">{classItem?.subject}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem?.status)}`}>
                    <Icon name={getStatusIcon(classItem?.status)} size={12} className="mr-1" />
                    {classItem?.status?.charAt(0)?.toUpperCase() + classItem?.status?.slice(1)}
                  </span>
                  {classItem?.isRecording && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-error bg-error/10">
                      <div className="w-2 h-2 bg-error rounded-full mr-1 animate-pulse" />
                      Recording
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} />
                    <span>{classItem?.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} />
                    <span>{classItem?.room}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={14} />
                    <span>{classItem?.students} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckSquare" size={14} />
                    <span>{classItem?.attendanceRate}% attendance</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {classItem?.status === 'ongoing' && (
                  <Button
                    variant={classItem?.isRecording ? "destructive" : "default"}
                    size="sm"
                    iconName={classItem?.isRecording ? "Square" : "Video"}
                    onClick={() => handleRecordingToggle(classItem?.id)}
                  >
                    {classItem?.isRecording ? 'Stop' : 'Record'}
                  </Button>
                )}
                
                {classItem?.status === 'upcoming' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      onClick={() => handleQuickAction('remind', classItem?.id)}
                    >
                      Remind
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => handleQuickAction('cancel', classItem?.id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                
                {classItem?.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    onClick={() => handleQuickAction('notes', classItem?.id)}
                  >
                    Share Notes
                  </Button>
                )}
              </div>
            </div>

            {classItem?.status === 'ongoing' && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Live Attendance Tracking</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-success">QR Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-primary">Face Recognition</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                      <span className="text-warning">GPS Verification</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;