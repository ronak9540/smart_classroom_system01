import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceCard = ({ attendanceData }) => {
  const { percentage, present, total, trend } = attendanceData;
  
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return { color: 'text-success', bg: 'bg-success/10', status: 'Excellent' };
    if (percentage >= 75) return { color: 'text-warning', bg: 'bg-warning/10', status: 'Good' };
    return { color: 'text-error', bg: 'bg-error/10', status: 'Low' };
  };

  const status = getAttendanceStatus(percentage);

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Attendance Overview</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${status?.bg} ${status?.color}`}>
          {status?.status}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-text-primary">{percentage}%</div>
            <div className="text-sm text-text-secondary">{present} of {total} classes</div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
              size={20} 
              color={trend === 'up' ? 'var(--color-success)' : trend === 'down' ? 'var(--color-error)' : 'var(--color-text-secondary)'} 
            />
            <span className={`text-sm ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary'}`}>
              {trend === 'up' ? '+2%' : trend === 'down' ? '-1%' : '0%'} this week
            </span>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              percentage >= 85 ? 'bg-success' : percentage >= 75 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Required: 75%</span>
          <span>Target: 85%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;