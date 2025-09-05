import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemMonitoring = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [systemData, setSystemData] = useState([]);

  useEffect(() => {
    // Mock real-time data generation
    const generateData = () => {
      const now = new Date();
      const data = [];
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data?.push({
          time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          cpu: Math.floor(Math.random() * 30) + 20,
          memory: Math.floor(Math.random() * 25) + 40,
          activeUsers: Math.floor(Math.random() * 200) + 800,
          apiCalls: Math.floor(Math.random() * 1000) + 2000
        });
      }
      return data;
    };

    setSystemData(generateData());
    const interval = setInterval(() => {
      setSystemData(generateData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const systemStatus = [
    { name: "Database", status: "healthy", uptime: "99.9%", responseTime: "12ms" },
    { name: "API Gateway", status: "healthy", uptime: "99.8%", responseTime: "45ms" },
    { name: "WhatsApp Service", status: "warning", uptime: "98.5%", responseTime: "120ms" },
    { name: "SMS Service", status: "healthy", uptime: "99.7%", responseTime: "80ms" },
    { name: "File Storage", status: "healthy", uptime: "99.9%", responseTime: "25ms" },
    { name: "Video Processing", status: "error", uptime: "95.2%", responseTime: "300ms" }
  ];

  const activeAlerts = [
    { id: 1, type: "warning", message: "High memory usage on server-02", time: "2 min ago" },
    { id: 2, type: "error", message: "Video processing service down", time: "5 min ago" },
    { id: 3, type: "info", message: "Scheduled maintenance in 2 hours", time: "10 min ago" },
    { id: 4, type: "warning", message: "WhatsApp API rate limit approaching", time: "15 min ago" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: "text-success bg-success/10 border-success/20",
      warning: "text-warning bg-warning/10 border-warning/20",
      error: "text-error bg-error/10 border-error/20"
    };
    return colors?.[status] || colors?.healthy;
  };

  const getAlertIcon = (type) => {
    const icons = {
      error: "AlertCircle",
      warning: "AlertTriangle",
      info: "Info"
    };
    return icons?.[type] || "Info";
  };

  const getAlertColor = (type) => {
    const colors = {
      error: "text-error",
      warning: "text-warning",
      info: "text-primary"
    };
    return colors?.[type] || "text-primary";
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">System Monitoring</h3>
          <p className="text-sm text-text-secondary">Real-time system performance and alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'performance' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </Button>
          <Button
            variant={activeTab === 'services' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('services')}
          >
            Services
          </Button>
          <Button
            variant={activeTab === 'alerts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('alerts')}
          >
            Alerts
          </Button>
        </div>
      </div>
      {activeTab === 'performance' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Cpu" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">CPU Usage</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">24%</p>
              <p className="text-sm text-success">Normal</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="HardDrive" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-text-primary">Memory</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">68%</p>
              <p className="text-sm text-warning">Moderate</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-success" />
                <span className="text-sm font-medium text-text-primary">Active Users</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">1,247</p>
              <p className="text-sm text-success">+12% from yesterday</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-accent" />
                <span className="text-sm font-medium text-text-primary">API Calls</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">2,847</p>
              <p className="text-sm text-success">Per minute</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#1E40AF" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#7C3AED" strokeWidth={2} name="Memory %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {activeTab === 'services' && (
        <div className="space-y-4">
          {systemStatus?.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  service?.status === 'healthy' ? 'bg-success' : 
                  service?.status === 'warning' ? 'bg-warning' : 'bg-error'
                }`} />
                <div>
                  <h4 className="font-medium text-text-primary">{service?.name}</h4>
                  <p className="text-sm text-text-secondary">Response time: {service?.responseTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">Uptime: {service?.uptime}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service?.status)}`}>
                    {service?.status}
                  </span>
                </div>
                <Button variant="ghost" size="sm" iconName="Settings">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {activeAlerts?.map((alert) => (
            <div key={alert?.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
              <Icon 
                name={getAlertIcon(alert?.type)} 
                size={20} 
                className={getAlertColor(alert?.type)} 
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{alert?.message}</p>
                <p className="text-xs text-text-secondary">{alert?.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
                <Button variant="ghost" size="sm" iconName="X">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
          {activeAlerts?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <p className="text-text-secondary">No active alerts</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SystemMonitoring;