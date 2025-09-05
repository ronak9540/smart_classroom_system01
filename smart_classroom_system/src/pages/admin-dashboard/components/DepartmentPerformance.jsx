import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DepartmentPerformance = () => {
  const [viewType, setViewType] = useState('bar');

  const departmentData = [
    { name: "Computer Science", attendance: 92, performance: 88, students: 450, faculty: 25 },
    { name: "Electronics", attendance: 89, performance: 85, students: 380, faculty: 20 },
    { name: "Mechanical", attendance: 87, performance: 82, students: 420, faculty: 22 },
    { name: "Civil", attendance: 85, performance: 80, students: 350, faculty: 18 },
    { name: "Chemical", attendance: 88, performance: 84, students: 280, faculty: 15 },
    { name: "Biotechnology", attendance: 91, performance: 87, students: 200, faculty: 12 }
  ];

  const pieData = departmentData?.map(dept => ({
    name: dept?.name?.split(' ')?.[0],
    value: dept?.students
  }));

  const COLORS = ['#1E40AF', '#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Department Performance</h3>
          <p className="text-sm text-text-secondary">Comparative analysis across departments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setViewType('bar')}
          >
            Bar Chart
          </Button>
          <Button
            variant={viewType === 'pie' ? 'default' : 'outline'}
            size="sm"
            iconName="PieChart"
            onClick={() => setViewType('pie')}
          >
            Distribution
          </Button>
        </div>
      </div>
      {viewType === 'bar' ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="attendance" fill="#1E40AF" name="Attendance %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="performance" fill="#7C3AED" name="Performance %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 flex items-center">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 pl-6">
            <h4 className="font-medium text-text-primary mb-4">Student Distribution</h4>
            <div className="space-y-3">
              {departmentData?.map((dept, index) => (
                <div key={dept?.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                    />
                    <span className="text-sm text-text-primary">{dept?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-text-secondary">{dept?.students}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">Top Performer</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">Computer Science</p>
          <p className="text-sm text-text-secondary">92% attendance, 88% performance</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Total Students</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">2,080</p>
          <p className="text-sm text-text-secondary">Across all departments</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="GraduationCap" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-text-primary">Total Faculty</span>
          </div>
          <p className="text-lg font-semibold text-text-primary">112</p>
          <p className="text-sm text-text-secondary">Active teaching staff</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;