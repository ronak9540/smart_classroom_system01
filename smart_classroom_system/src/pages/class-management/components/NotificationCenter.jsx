import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationCenter = ({ onSendNotification }) => {
  const [notificationType, setNotificationType] = useState('reminder');
  const [message, setMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(['whatsapp']);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [scheduleTime, setScheduleTime] = useState('');

  const notificationTypes = [
    { id: 'reminder', label: 'Class Reminder', icon: 'Clock', color: 'text-primary' },
    { id: 'cancellation', label: 'Class Cancellation', icon: 'X', color: 'text-error' },
    { id: 'assignment', label: 'Assignment Alert', icon: 'FileText', color: 'text-warning' },
    { id: 'announcement', label: 'General Announcement', icon: 'Megaphone', color: 'text-secondary' }
  ];

  const communicationChannels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', available: true },
    { id: 'sms', label: 'SMS', icon: 'Smartphone', available: true },
    { id: 'email', label: 'Email', icon: 'Mail', available: true },
    { id: 'push', label: 'Push Notification', icon: 'Bell', available: true }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'reminder',
      message: 'Data Structures class starting in 15 minutes - Room 301',
      sentAt: '2025-01-05T14:45:00',
      recipients: 32,
      channels: ['whatsapp', 'push'],
      status: 'delivered'
    },
    {
      id: 2,
      type: 'cancellation',
      message: 'Tomorrow\'s Algorithm class has been cancelled due to faculty meeting',
      sentAt: '2025-01-05T16:30:00',
      recipients: 32,
      channels: ['whatsapp', 'sms', 'email'],
      status: 'delivered'
    },
    {
      id: 3,
      type: 'assignment',
      message: 'New assignment posted: Binary Search Implementation - Due Jan 12',
      sentAt: '2025-01-05T11:20:00',
      recipients: 32,
      channels: ['email', 'push'],
      status: 'delivered'
    }
  ];

  const handleChannelToggle = (channelId) => {
    setSelectedChannels(prev => 
      prev?.includes(channelId) 
        ? prev?.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSendNotification = () => {
    const notification = {
      type: notificationType,
      message,
      channels: selectedChannels,
      students: selectedStudents,
      scheduleTime: scheduleTime || null
    };
    onSendNotification(notification);
    setMessage('');
    setScheduleTime('');
  };

  const getTypeColor = (type) => {
    const typeObj = notificationTypes?.find(t => t?.id === type);
    return typeObj?.color || 'text-text-secondary';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'failed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary">Notification Center</h2>
        <p className="text-text-secondary mt-1">Send automated notifications to students</p>
      </div>
      <div className="p-6 space-y-6">
        {/* Notification Type Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Notification Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {notificationTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setNotificationType(type?.id)}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  notificationType === type?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <Icon name={type?.icon} size={20} className={`mx-auto mb-2 ${type?.color}`} />
                <div className="text-sm font-medium text-text-primary">{type?.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <Input
            label="Message"
            type="text"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            description="Keep messages clear and concise for better engagement"
          />
        </div>

        {/* Communication Channels */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Communication Channels
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {communicationChannels?.map((channel) => (
              <div key={channel?.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedChannels?.includes(channel?.id)}
                  onChange={() => handleChannelToggle(channel?.id)}
                  disabled={!channel?.available}
                />
                <div className="flex items-center space-x-2">
                  <Icon name={channel?.icon} size={16} />
                  <span className="text-sm text-text-primary">{channel?.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Option */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Schedule Time (Optional)"
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e?.target?.value)}
            description="Leave empty to send immediately"
          />
          <div className="flex items-end">
            <Button
              variant="default"
              iconName="Send"
              iconPosition="left"
              iconSize={16}
              onClick={handleSendNotification}
              disabled={!message?.trim() || selectedChannels?.length === 0}
              className="w-full"
            >
              {scheduleTime ? 'Schedule Notification' : 'Send Now'}
            </Button>
          </div>
        </div>

        {/* Quick Templates */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Quick Templates
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessage('Class starting in 15 minutes - Room 301')}
            >
              Class Reminder
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessage('Class has been cancelled. Will notify about rescheduling.')}
            >
              Cancellation Notice
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessage('New assignment posted. Check your dashboard for details.')}
            >
              Assignment Alert
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMessage('Important announcement regarding upcoming exams.')}
            >
              Exam Notice
            </Button>
          </div>
        </div>
      </div>
      {/* Recent Notifications */}
      <div className="border-t border-border">
        <div className="p-6">
          <h3 className="font-medium text-text-primary mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {recentNotifications?.map((notification) => (
              <div key={notification?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={notificationTypes?.find(t => t?.id === notification?.type)?.icon || 'Bell'} 
                        size={16} 
                        className={getTypeColor(notification?.type)}
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {notificationTypes?.find(t => t?.id === notification?.type)?.label}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(notification?.status)}`}>
                        {notification?.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary mb-2">{notification?.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>{notification?.recipients} recipients</span>
                      <span>•</span>
                      <span>{new Date(notification.sentAt)?.toLocaleString('en-IN')}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        {notification?.channels?.map((channel) => (
                          <Icon 
                            key={channel}
                            name={communicationChannels?.find(c => c?.id === channel)?.icon || 'Bell'} 
                            size={12} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" iconName="MoreVertical" iconSize={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;