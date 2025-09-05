import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeUpdatesCard = ({ updates }) => {
  const [liveUpdates, setLiveUpdates] = useState(updates);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving new updates
      const newUpdate = {
        id: Date.now(),
        type: 'reminder',
        title: 'Class Starting Soon',
        message: 'Mathematics class starts in 15 minutes',
        timestamp: new Date(),
        priority: 'medium'
      };
      
      // Randomly add new updates (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        setLiveUpdates(prev => [newUpdate, ...prev?.slice(0, 9)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getUpdateIcon = (type) => {
    switch (type) {
      case 'reminder': return 'Clock';
      case 'announcement': return 'Megaphone';
      case 'assignment': return 'FileText';
      case 'grade': return 'Award';
      case 'class_change': return 'Calendar';
      default: return 'Info';
    }
  };

  const getUpdateColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Live Updates</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-error'}`} />
          <span className="text-xs text-text-secondary">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {liveUpdates?.map((update) => (
          <div key={update?.id} className={`p-3 rounded-lg border ${getUpdateColor(update?.priority)}`}>
            <div className="flex items-start space-x-3">
              <Icon name={getUpdateIcon(update?.type)} size={16} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary text-sm">{update?.title}</h4>
                  <span className="text-xs text-text-secondary">{formatTimeAgo(update?.timestamp)}</span>
                </div>
                <p className="text-sm text-text-secondary">{update?.message}</p>
                {update?.action && (
                  <button className="text-xs text-primary hover:underline mt-2">
                    {update?.action}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {liveUpdates?.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Wifi" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p>No live updates</p>
            <p className="text-xs mt-1">You'll see real-time notifications here</p>
          </div>
        )}
      </div>
      {liveUpdates?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="text-sm text-primary hover:underline w-full text-center">
            View All Updates
          </button>
        </div>
      )}
    </div>
  );
};

export default RealTimeUpdatesCard;