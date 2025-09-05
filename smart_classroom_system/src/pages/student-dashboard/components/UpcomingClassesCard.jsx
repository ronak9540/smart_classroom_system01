import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingClassesCard = ({ classes }) => {
  const formatTime = (time) => {
    return new Date(`2025-01-01 ${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntilClass = (time) => {
    const now = new Date();
    const classTime = new Date(`${now.toDateString()} ${time}`);
    const diff = classTime - now;
    
    if (diff < 0) return 'In progress';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min`;
    return `${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Today's Classes</h3>
        <Icon name="Clock" size={20} color="var(--color-text-secondary)" />
      </div>
      <div className="space-y-3">
        {classes?.map((classItem, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                classItem?.status === 'upcoming' ? 'bg-primary' : 
                classItem?.status === 'current' ? 'bg-success animate-pulse' : 'bg-muted-foreground'
              }`} />
              <div>
                <div className="font-medium text-text-primary">{classItem?.subject}</div>
                <div className="text-sm text-text-secondary">{classItem?.room} • {classItem?.faculty}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">{formatTime(classItem?.time)}</div>
              <div className="text-xs text-text-secondary">{getTimeUntilClass(classItem?.time)}</div>
            </div>
          </div>
        ))}
        
        {classes?.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p>No classes scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingClassesCard;