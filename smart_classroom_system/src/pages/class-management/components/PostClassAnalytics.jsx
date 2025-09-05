import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PostClassAnalytics = ({ classData, onGenerateReport, onCollectFeedback }) => {
  const [activeMetric, setActiveMetric] = useState('engagement');

  const engagementData = [
    { time: '0-10min', engagement: 85, attention: 90 },
    { time: '10-20min', engagement: 78, attention: 82 },
    { time: '20-30min', engagement: 65, attention: 70 },
    { time: '30-40min', engagement: 72, attention: 75 },
    { time: '40-50min', engagement: 68, attention: 72 },
    { time: '50-60min', engagement: 60, attention: 65 }
  ];

  const participationData = [
    { name: 'Active Participants', value: 18, color: '#10B981' },
    { name: 'Passive Viewers', value: 10, color: '#F59E0B' },
    { name: 'Distracted', value: 4, color: '#EF4444' }
  ];

  const performanceMetrics = [
    { label: 'Average Engagement', value: '72%', change: '+5%', trend: 'up', icon: 'TrendingUp' },
    { label: 'Attention Score', value: '76%', change: '+3%', trend: 'up', icon: 'Eye' },
    { label: 'Questions Asked', value: '12', change: '+2', trend: 'up', icon: 'MessageCircle' },
    { label: 'Video Completion', value: '89%', change: '-2%', trend: 'down', icon: 'Play' }
  ];

  const studentFeedback = [
    {
      id: 1,
      student: 'Priya Sharma',
      rating: 5,
      feedback: `Excellent explanation of data structures. The visual examples really helped understand the concepts better.`,
      timestamp: '2025-01-05T15:30:00'
    },
    {
      id: 2,
      student: 'Rahul Kumar',
      rating: 4,
      feedback: `Good session overall. Would appreciate more practice problems during the class.`,
      timestamp: '2025-01-05T15:32:00'
    },
    {
      id: 3,
      student: 'Anita Patel',
      rating: 5,
      feedback: `Very interactive session. The AI-generated summary was particularly helpful for revision.`,
      timestamp: '2025-01-05T15:35:00'
    }
  ];

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Post-Class Analytics</h2>
            <p className="text-text-secondary mt-1">
              Class ended at {new Date()?.toLocaleTimeString('en-IN')} • Duration: 60 minutes
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
              onClick={onCollectFeedback}
            >
              Collect Feedback
            </Button>
            <Button
              variant="default"
              iconName="FileText"
              iconPosition="left"
              iconSize={16}
              onClick={onGenerateReport}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics?.map((metric, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
                <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
                  <Icon name={getTrendIcon(metric?.trend)} size={14} />
                  <span className="text-sm font-medium">{metric?.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-text-primary">{metric?.value}</div>
              <div className="text-sm text-text-secondary">{metric?.label}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Over Time */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-4">Engagement Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
                  <YAxis stroke="var(--color-text-secondary)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-surface)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    name="Engagement %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attention" 
                    stroke="var(--color-secondary)" 
                    strokeWidth={2}
                    name="Attention %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Participation */}
          <div className="border border-border rounded-lg p-4">
            <h3 className="font-medium text-text-primary mb-4">Student Participation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {participationData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {participationData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    />
                    <span className="text-sm text-text-primary">{item?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-text-primary">{item?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Feedback */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">Student Feedback</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(5)}
                <span className="text-sm text-text-secondary ml-2">4.7 avg rating</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {studentFeedback?.map((feedback) => (
              <div key={feedback?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {feedback?.student?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{feedback?.student}</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback?.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {new Date(feedback.timestamp)?.toLocaleTimeString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{feedback?.feedback}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Feedback ({studentFeedback?.length + 5} more)
            </Button>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-text-primary mb-3">Recommended Actions</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
              <span className="text-sm text-text-primary">
                Engagement dropped after 30 minutes - consider adding interactive elements
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-primary">
                High participation rate - continue current teaching approach
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} color="var(--color-primary)" />
              <span className="text-sm text-text-primary">
                Students requested more practice problems - plan additional exercises
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostClassAnalytics;