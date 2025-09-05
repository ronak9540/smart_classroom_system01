import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AcademicPerformanceCard = ({ performanceData }) => {
  const { currentGPA, subjectPerformance, lowPerformingSubjects, semesterTrend } = performanceData;

  const COLORS = ['#1E40AF', '#7C3AED', '#F59E0B', '#10B981', '#EF4444'];

  const getGradeColor = (grade) => {
    if (grade >= 9) return 'text-success';
    if (grade >= 7) return 'text-warning';
    return 'text-error';
  };

  const getGradeStatus = (grade) => {
    if (grade >= 9) return 'Excellent';
    if (grade >= 7) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Academic Performance</h3>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          <span className="text-sm text-success">+0.3 GPA</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current GPA */}
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className={`text-3xl font-bold ${getGradeColor(currentGPA)}`}>{currentGPA}</div>
            <div className="text-sm text-text-secondary">Current GPA</div>
            <div className={`text-xs font-medium mt-1 ${getGradeColor(currentGPA)}`}>
              {getGradeStatus(currentGPA)}
            </div>
          </div>
          
          {/* Low Performing Subjects */}
          {lowPerformingSubjects?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-text-primary flex items-center">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mr-2" />
                Needs Attention
              </h4>
              {lowPerformingSubjects?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-warning/10 rounded border border-warning/20">
                  <span className="text-sm text-text-primary">{subject?.name}</span>
                  <span className="text-sm font-medium text-warning">{subject?.grade}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Subject Performance Chart */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary">Subject-wise Performance</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  domain={[0, 10]}
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="grade" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Semester Trend */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Semester Progress</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={semesterTrend} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                domain={[0, 10]}
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              <YAxis 
                type="category" 
                dataKey="semester"
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="gpa" fill="var(--color-secondary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AcademicPerformanceCard;