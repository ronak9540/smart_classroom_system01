import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceAnalytics = ({ analyticsData }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6B7280'];

  const overallStats = {
    totalClasses: analyticsData?.subjectWise?.reduce((sum, subject) => sum + subject?.totalClasses, 0),
    attendedClasses: analyticsData?.subjectWise?.reduce((sum, subject) => sum + subject?.attended, 0),
    overallPercentage: Math.round(
      (analyticsData?.subjectWise?.reduce((sum, subject) => sum + subject?.attended, 0) /
      analyticsData?.subjectWise?.reduce((sum, subject) => sum + subject?.totalClasses, 0)) * 100
    )
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getPercentageBgColor = (percentage) => {
    if (percentage >= 85) return 'bg-success/10';
    if (percentage >= 75) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const monthlyData = [
    { month: 'Jan', attendance: 88 },
    { month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 85 },
    { month: 'Apr', attendance: 90 },
    { month: 'May', attendance: 87 },
    { month: 'Jun', attendance: 89 }
  ];

  const statusData = [
    { name: 'Present', value: overallStats?.attendedClasses, color: '#10B981' },
    { name: 'Absent', value: overallStats?.totalClasses - overallStats?.attendedClasses, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{overallStats?.totalClasses}</p>
              <p className="text-sm text-text-secondary">Total Classes</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{overallStats?.attendedClasses}</p>
              <p className="text-sm text-text-secondary">Classes Attended</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPercentageBgColor(overallStats?.overallPercentage)}`}>
              <Icon name="TrendingUp" size={24} className={getPercentageColor(overallStats?.overallPercentage)} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${getPercentageColor(overallStats?.overallPercentage)}`}>
                {overallStats?.overallPercentage}%
              </p>
              <p className="text-sm text-text-secondary">Overall Attendance</p>
            </div>
          </div>
        </div>
      </div>
      {/* Subject-wise Attendance */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Subject-wise Attendance</h3>
        <div className="space-y-4">
          {analyticsData?.subjectWise?.map((subject, index) => {
            const percentage = Math.round((subject?.attended / subject?.totalClasses) * 100);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">{subject?.name}</h4>
                    <span className={`text-sm font-medium ${getPercentageColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                    <span>{subject?.attended}/{subject?.totalClasses} classes</span>
                    <span>{subject?.code}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        percentage >= 85 ? 'bg-success' : percentage >= 75 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {percentage < 75 && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon name="AlertTriangle" size={14} className="text-error" />
                      <span className="text-xs text-error">Below minimum requirement (75%)</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Monthly Attendance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="attendance" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Status Distribution */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Attendance Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {statusData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-text-secondary">{item?.name}: {item?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="MessageSquare" size={20} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-text-primary">WhatsApp Notifications</p>
                  <p className="text-xs text-text-secondary">Class reminders and updates</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-success rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">SMS Notifications</p>
                  <p className="text-xs text-text-secondary">Critical attendance alerts</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={20} className="text-warning" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Low Attendance Alerts</p>
                  <p className="text-xs text-text-secondary">When below 75%</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-warning rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-secondary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Class Reminders</p>
                  <p className="text-xs text-text-secondary">15 minutes before class</p>
                </div>
              </div>
              <div className="w-10 h-6 bg-secondary rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;