import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "maintenance", message: "System maintenance scheduled for tonight", priority: "high", time: "10 min ago" },
    { id: 2, type: "alert", message: "Low attendance in Civil Engineering", priority: "medium", time: "1 hour ago" },
    { id: 3, type: "update", message: "New faculty member added to Computer Science", priority: "low", time: "2 hours ago" }
  ]);

  const quickActionItems = [
    {
      title: "Send Bulk Notification",
      description: "Send announcements to all users",
      icon: "Bell",
      color: "primary",
      action: () => console.log("Send notification")
    },
    {
      title: "Generate Reports",
      description: "Create institutional reports",
      icon: "FileText",
      color: "secondary",
      action: () => console.log("Generate reports")
    },
    {
      title: "Manage Users",
      description: "Add, edit, or remove users",
      icon: "Users",
      color: "success",
      action: () => console.log("Manage users")
    },
    {
      title: "System Backup",
      description: "Create system backup",
      icon: "HardDrive",
      color: "warning",
      action: () => console.log("System backup")
    },
    {
      title: "Emergency Alert",
      description: "Send emergency notifications",
      icon: "AlertTriangle",
      color: "error",
      action: () => console.log("Emergency alert")
    },
    {
      title: "Schedule Maintenance",
      description: "Plan system maintenance",
      icon: "Settings",
      color: "accent",
      action: () => console.log("Schedule maintenance")
    }
  ];

  const recentActivities = [
    { id: 1, user: "Dr. Rajesh Kumar", action: "marked attendance for CS-301", time: "5 min ago", icon: "CheckSquare" },
    { id: 2, user: "Priya Sharma", action: "submitted assignment for Physics", time: "12 min ago", icon: "FileText" },
    { id: 3, user: "Admin System", action: "generated monthly report", time: "25 min ago", icon: "BarChart3" },
    { id: 4, user: "Prof. Anita Singh", action: "scheduled new class session", time: "1 hour ago", icon: "Calendar" },
    { id: 5, user: "Parent Portal", action: "sent attendance alerts to 45 parents", time: "2 hours ago", icon: "Send" }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20",
      success: "bg-success/10 text-success border-success/20 hover:bg-success/20",
      warning: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
      error: "bg-error/10 text-error border-error/20 hover:bg-error/20",
      accent: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
    };
    return colors?.[color] || colors?.primary;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-error",
      medium: "text-warning",
      low: "text-success"
    };
    return colors?.[priority] || colors?.low;
  };

  const dismissNotification = (id) => {
    setNotifications(notifications?.filter(notif => notif?.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
            <p className="text-sm text-text-secondary">Frequently used administrative functions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionItems?.map((item, index) => (
            <button
              key={index}
              onClick={item?.action}
              className={`p-4 rounded-lg border transition-smooth text-left hover:shadow-card ${getColorClasses(item?.color)}`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon name={item?.icon} size={24} />
                <h4 className="font-medium">{item?.title}</h4>
              </div>
              <p className="text-sm opacity-80">{item?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Activities</h3>
            <p className="text-sm text-text-secondary">Latest system activities and user actions</p>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={activity?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  <span className="font-semibold">{activity?.user}</span> {activity?.action}
                </p>
                <p className="text-xs text-text-secondary">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" iconName="Eye">
            View All Activities
          </Button>
        </div>
      </div>
      {/* System Notifications */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">System Notifications</h3>
            <p className="text-sm text-text-secondary">Important system alerts and updates</p>
          </div>
          <Button variant="outline" size="sm" iconName="Settings">
            Manage
          </Button>
        </div>

        <div className="space-y-3">
          {notifications?.map((notification) => (
            <div key={notification?.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(notification?.priority)}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{notification?.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${getPriorityColor(notification?.priority)}`}>
                    {notification?.priority} priority
                  </span>
                  <span className="text-xs text-text-secondary">{notification?.time}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => dismissNotification(notification?.id)}
              />
            </div>
          ))}
        </div>

        {notifications?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-text-secondary">No active notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;