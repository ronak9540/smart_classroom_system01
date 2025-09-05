import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [selectedAction, setSelectedAction] = useState(null);

  const quickActionItems = [
    {
      id: 'attendance',
      title: 'Mark Attendance',
      description: 'Start attendance tracking for current class',
      icon: 'CheckSquare',
      color: 'bg-primary/10 text-primary border-primary/20',
      action: () => console.log('Mark attendance'),
      status: 'available'
    },
    {
      id: 'record',
      title: 'Start Recording',
      description: 'Begin class recording with face detection',
      icon: 'Video',
      color: 'bg-error/10 text-error border-error/20',
      action: () => console.log('Start recording'),
      status: 'available'
    },
    {
      id: 'notes',
      title: 'Share Notes',
      description: 'Upload and distribute class notes',
      icon: 'FileText',
      color: 'bg-success/10 text-success border-success/20',
      action: () => console.log('Share notes'),
      status: 'available'
    },
    {
      id: 'reminder',
      title: 'Send Reminder',
      description: 'WhatsApp/SMS class reminders to students',
      icon: 'MessageSquare',
      color: 'bg-warning/10 text-warning border-warning/20',
      action: () => console.log('Send reminder'),
      status: 'available'
    },
    {
      id: 'cancel',
      title: 'Cancel Class',
      description: 'Notify students about class cancellation',
      icon: 'X',
      color: 'bg-error/10 text-error border-error/20',
      action: () => console.log('Cancel class'),
      status: 'available'
    },
    {
      id: 'assignment',
      title: 'Create Assignment',
      description: 'Create and assign homework/projects',
      icon: 'Plus',
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      action: () => console.log('Create assignment'),
      status: 'available'
    }
  ];

  const communicationTemplates = [
    {
      id: 1,
      type: 'Class Reminder',
      message: 'Reminder: Your {subject} class is scheduled for {time} in room {room}. Please bring your textbooks and notebooks.',
      recipients: 'All enrolled students',
      lastUsed: '2 hours ago'
    },
    {
      id: 2,
      type: 'Assignment Due',
      message: 'Assignment reminder: {assignment_name} is due on {due_date}. Submit through the portal before the deadline.',
      recipients: 'Students with pending assignments',
      lastUsed: '1 day ago'
    },
    {
      id: 3,
      type: 'Class Cancellation',
      message: 'Important: Today\'s {subject} class at {time} has been cancelled due to {reason}. Next class as per schedule.',
      recipients: 'All enrolled students',
      lastUsed: '3 days ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Shared notes for Database Management Systems',
      timestamp: '15 minutes ago',
      icon: 'FileText',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Sent class reminder to 45 students',
      timestamp: '1 hour ago',
      icon: 'MessageSquare',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Started recording for Software Engineering class',
      timestamp: '2 hours ago',
      icon: 'Video',
      status: 'completed'
    },
    {
      id: 4,
      action: 'Marked attendance for Data Structures class',
      timestamp: '3 hours ago',
      icon: 'CheckSquare',
      status: 'completed'
    }
  ];

  const handleQuickAction = (actionId) => {
    setSelectedAction(actionId);
    const action = quickActionItems?.find(item => item?.id === actionId);
    if (action) {
      action?.action();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
        <Button variant="outline" size="sm" iconName="Settings">
          Customize
        </Button>
      </div>
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickActionItems?.map((item) => (
          <div
            key={item?.id}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${item?.color} ${
              selectedAction === item?.id ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            onClick={() => handleQuickAction(item?.id)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-surface/50 flex items-center justify-center">
                <Icon name={item?.icon} size={24} />
              </div>
              <div>
                <h3 className="font-medium text-sm">{item?.title}</h3>
                <p className="text-xs opacity-80 mt-1">{item?.description}</p>
              </div>
            </div>
            {item?.status === 'active' && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-success rounded-full animate-pulse" />
            )}
          </div>
        ))}
      </div>
      {/* Communication Templates */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Communication Templates</h3>
          <Button variant="ghost" size="sm" iconName="Plus">
            Add Template
          </Button>
        </div>

        <div className="space-y-3">
          {communicationTemplates?.map((template) => (
            <div key={template?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-text-primary">{template?.type}</h4>
                    <span className="text-xs text-text-secondary">• {template?.lastUsed}</span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">{template?.message}</p>
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Users" size={12} />
                    <span>{template?.recipients}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" iconName="Send">
                    Use
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Recent Activities</h3>
          <Button variant="ghost" size="sm" iconName="History">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={activity?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">{activity?.action}</p>
                <p className="text-xs text-text-secondary">{activity?.timestamp}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="text-xs text-success">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-text-primary mb-4">Emergency Actions</h3>
        <div className="flex items-center space-x-4">
          <Button variant="destructive" size="sm" iconName="AlertTriangle" iconPosition="left">
            Emergency Alert
          </Button>
          <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
            Contact Admin
          </Button>
          <Button variant="outline" size="sm" iconName="Shield" iconPosition="left">
            Security Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;