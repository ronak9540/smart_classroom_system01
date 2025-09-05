import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'qr-attendance',
      title: 'QR Attendance',
      description: 'Scan QR code to mark attendance',
      icon: 'QrCode',
      color: 'bg-primary text-primary-foreground',
      action: () => navigate('/attendance-tracking')
    },
    {
      id: 'ai-doubt-solver',
      title: 'AI Doubt Solver',
      description: 'Get instant help with problems',
      icon: 'MessageCircleQuestion',
      color: 'bg-secondary text-secondary-foreground',
      action: () => console.log('Opening AI Doubt Solver')
    },
    {
      id: 'notes-library',
      title: 'Notes Library',
      description: 'Access summarized class notes',
      icon: 'BookOpen',
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('Opening Notes Library')
    },
    {
      id: 'goal-tracking',
      title: 'Goal Tracking',
      description: 'Monitor your learning goals',
      icon: 'Target',
      color: 'bg-success text-success-foreground',
      action: () => console.log('Opening Goal Tracking')
    },
    {
      id: 'face-recognition',
      title: 'Face Recognition',
      description: 'Mark attendance with face scan',
      icon: 'ScanFace',
      color: 'bg-warning text-warning-foreground',
      action: () => navigate('/attendance-tracking')
    },
    {
      id: 'class-recordings',
      title: 'Class Recordings',
      description: 'Watch recorded lectures',
      icon: 'Video',
      color: 'bg-error text-error-foreground',
      action: () => console.log('Opening Class Recordings')
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={20} color="var(--color-primary)" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            onClick={action?.action}
            className="h-auto p-4 flex flex-col items-center text-center space-y-3 hover:bg-muted transition-colors group"
          >
            <div className={`w-12 h-12 rounded-lg ${action?.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <div>
              <div className="font-medium text-text-primary text-sm">{action?.title}</div>
              <div className="text-xs text-text-secondary mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;