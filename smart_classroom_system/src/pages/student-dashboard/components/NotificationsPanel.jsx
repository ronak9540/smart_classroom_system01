import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsPanel = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 3);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return 'FileText';
      case 'class': return 'BookOpen';
      case 'grade': return 'Award';
      case 'reminder': return 'Bell';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'assignment': return 'text-warning';
      case 'class': return 'text-primary';
      case 'grade': return 'text-success';
      case 'reminder': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Notifications</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <span className="text-sm text-text-secondary">{notifications?.filter(n => n?.unread)?.length} new</span>
        </div>
      </div>
      <div className="space-y-3">
        {displayedNotifications?.map((notification) => (
          <div key={notification?.id} className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
            notification?.unread ? 'bg-primary/5 border border-primary/20' : 'bg-muted'
          }`}>
            <Icon 
              name={getNotificationIcon(notification?.type)} 
              size={16} 
              className={getNotificationColor(notification?.type)} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-text-primary truncate">{notification?.title}</p>
                <span className="text-xs text-text-secondary ml-2">{formatTimeAgo(notification?.timestamp)}</span>
              </div>
              <p className="text-sm text-text-secondary mt-1">{notification?.message}</p>
            </div>
            {notification?.unread && (
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
        
        {notifications?.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Bell" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>
      {notifications?.length > 3 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? 'Show Less' : `View All (${notifications?.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;