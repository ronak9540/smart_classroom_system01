import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('engagement');

  const engagementData = [
    { date: "01 Sep", students: 1850, faculty: 98, parents: 1200, classes: 145 },
    { date: "02 Sep", students: 1920, faculty: 102, parents: 1180, classes: 152 },
    { date: "03 Sep", students: 1780, faculty: 95, parents: 1250, classes: 138 },
    { date: "04 Sep", students: 2100, faculty: 108, parents: 1320, classes: 165 },
    { date: "05 Sep", students: 2050, faculty: 105, parents: 1290, classes: 158 }
  ];

  const performanceData = [
    { subject: "Mathematics", average: 78, attendance: 92 },
    { subject: "Physics", average: 82, attendance: 89 },
    { subject: "Chemistry", average: 75, attendance: 87 },
    { subject: "Biology", average: 85, attendance: 94 },
    { subject: "English", average: 88, attendance: 96 },
    { subject: "Computer Science", average: 91, attendance: 98 }
  ];

  const reportTypes = [
    { id: 'engagement', name: 'User Engagement', icon: 'Activity' },
    { id: 'performance', name: 'Academic Performance', icon: 'TrendingUp' },
    { id: 'attendance', name: 'Attendance Trends', icon: 'CheckSquare' },
    { id: 'system', name: 'System Usage', icon: 'Monitor' }
  ];

  const quickReports = [
    { name: "Daily Attendance Report", description: "Today\'s attendance across all departments", icon: "FileText", status: "ready" },
    { name: "Weekly Performance Summary", description: "Academic performance trends for this week", icon: "BarChart3", status: "generating" },
    { name: "Monthly Faculty Report", description: "Faculty engagement and teaching analytics", icon: "Users", status: "ready" },
    { name: "Parent Engagement Report", description: "Parent portal usage and communication stats", icon: "Heart", status: "ready" },
    { name: "System Health Report", description: "Technical performance and uptime statistics", icon: "Activity", status: "scheduled" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      ready: "text-success bg-success/10 border-success/20",
      generating: "text-warning bg-warning/10 border-warning/20",
      scheduled: "text-primary bg-primary/10 border-primary/20"
    };
    return colors?.[status] || colors?.ready;
  };

  const getStatusIcon = (status) => {
    const icons = {
      ready: "CheckCircle",
      generating: "Clock",
      scheduled: "Calendar"
    };
    return icons?.[status] || "CheckCircle";
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Reports & Analytics</h3>
          <p className="text-sm text-text-secondary">Comprehensive institutional reporting</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export All
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Create Report
          </Button>
        </div>
      </div>
      {/* Report Type Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {reportTypes?.map((type) => (
          <Button
            key={type?.id}
            variant={selectedReport === type?.id ? 'default' : 'outline'}
            size="sm"
            iconName={type?.icon}
            iconPosition="left"
            onClick={() => setSelectedReport(type?.id)}
          >
            {type?.name}
          </Button>
        ))}
      </div>
      {/* Period Selection */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-text-primary">Period:</span>
        <Button
          variant={selectedPeriod === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('week')}
        >
          Week
        </Button>
        <Button
          variant={selectedPeriod === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('month')}
        >
          Month
        </Button>
        <Button
          variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('quarter')}
        >
          Quarter
        </Button>
        <Button
          variant={selectedPeriod === 'year' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPeriod('year')}
        >
          Year
        </Button>
      </div>
      {/* Chart Display */}
      <div className="mb-8">
        {selectedReport === 'engagement' && (
          <div>
            <h4 className="font-medium text-text-primary mb-4">User Engagement Trends</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="students" stackId="1" stroke="#1E40AF" fill="#1E40AF" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="faculty" stackId="1" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="parents" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedReport === 'performance' && (
          <div>
            <h4 className="font-medium text-text-primary mb-4">Academic Performance by Subject</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="average" fill="#1E40AF" name="Average Score" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendance" fill="#10B981" name="Attendance %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {(selectedReport === 'attendance' || selectedReport === 'system') && (
          <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" />
              <p className="text-text-secondary">Chart data for {reportTypes?.find(r => r?.id === selectedReport)?.name} will be displayed here</p>
            </div>
          </div>
        )}
      </div>
      {/* Quick Reports */}
      <div>
        <h4 className="font-medium text-text-primary mb-4">Quick Reports</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickReports?.map((report, index) => (
            <div key={index} className="bg-muted rounded-lg p-4 hover:shadow-card transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={report?.icon} size={20} className="text-primary" />
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report?.status)}`}>
                    <Icon name={getStatusIcon(report?.status)} size={12} className="mr-1" />
                    {report?.status}
                  </span>
                </div>
              </div>
              <h5 className="font-medium text-text-primary mb-2">{report?.name}</h5>
              <p className="text-sm text-text-secondary mb-4">{report?.description}</p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Download"
                  disabled={report?.status === 'generating'}
                >
                  Download
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  iconName="Eye"
                >
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium text-text-primary mb-1">Bulk Export Options</h5>
            <p className="text-sm text-text-secondary">Export multiple reports in various formats</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="FileText">
              PDF
            </Button>
            <Button variant="outline" size="sm" iconName="FileSpreadsheet">
              Excel
            </Button>
            <Button variant="outline" size="sm" iconName="Database">
              CSV
            </Button>
            <Button variant="default" size="sm" iconName="Send">
              Email Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;