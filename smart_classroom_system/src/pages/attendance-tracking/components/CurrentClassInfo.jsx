import React from 'react';
import Icon from '../../../components/AppIcon';

const CurrentClassInfo = ({ currentClass }) => {
  if (!currentClass) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Active Class</h3>
          <p className="text-text-secondary">No classes scheduled at this time</p>
        </div>
      </div>
    );
  }

  const getTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(currentClass.endTime);
    const diff = endTime - now;
    
    if (diff <= 0) return 'Class ended';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const getStatusColor = () => {
    const now = new Date();
    const startTime = new Date(currentClass.startTime);
    const endTime = new Date(currentClass.endTime);
    
    if (now < startTime) return 'text-warning';
    if (now > endTime) return 'text-error';
    return 'text-success';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BookOpen" size={24} className="text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-text-primary">{currentClass?.subject}</h3>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getTimeRemaining()}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {currentClass?.faculty} • {currentClass?.department}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {currentClass?.startTime} - {currentClass?.endTime}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {currentClass?.room} • {currentClass?.building}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Attendance Window</span>
              <span className="text-sm font-medium text-text-primary">
                {currentClass?.attendanceWindow || '15 minutes from start'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentClassInfo;