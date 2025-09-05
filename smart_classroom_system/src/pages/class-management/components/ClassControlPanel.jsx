import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassControlPanel = ({ 
  isRecording, 
  onToggleRecording, 
  attendanceCount, 
  totalStudents,
  engagementScore,
  onStartClass,
  onEndClass,
  isClassActive 
}) => {
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [faceDetectionActive, setFaceDetectionActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const attendancePercentage = totalStudents > 0 ? Math.round((attendanceCount / totalStudents) * 100) : 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Class Control Panel</h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isClassActive 
            ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
        }`}>
          {isClassActive ? 'Class Active' : 'Class Inactive'}
        </div>
      </div>

      {/* Recording Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Recording</h3>
            <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-error animate-pulse' : 'bg-muted-foreground'}`} />
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-text-primary">
              {isRecording ? formatDuration(recordingDuration) : '00:00'}
            </div>
            <Button
              variant={isRecording ? "destructive" : "default"}
              size="sm"
              iconName={isRecording ? "Square" : "Play"}
              iconPosition="left"
              iconSize={16}
              onClick={onToggleRecording}
              className="w-full"
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Attendance</h3>
            <Icon name="Users" size={16} color="var(--color-text-secondary)" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-text-primary">
              {attendanceCount}/{totalStudents}
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>
            <div className="text-sm text-text-secondary">
              {attendancePercentage}% Present
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Engagement</h3>
            <Icon name="Activity" size={16} color="var(--color-text-secondary)" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-text-primary">
              {engagementScore}%
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  engagementScore >= 80 ? 'bg-success' : 
                  engagementScore >= 60 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${engagementScore}%` }}
              />
            </div>
            <div className="text-sm text-text-secondary">
              {engagementScore >= 80 ? 'Excellent' : 
               engagementScore >= 60 ? 'Good' : 'Needs Attention'}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <h3 className="font-medium text-text-primary">Face Detection</h3>
          <div className="flex items-center space-x-3">
            <Button
              variant={faceDetectionActive ? "default" : "outline"}
              size="sm"
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
              onClick={() => setFaceDetectionActive(!faceDetectionActive)}
            >
              {faceDetectionActive ? 'Active' : 'Inactive'}
            </Button>
            <span className="text-sm text-text-secondary">
              {faceDetectionActive ? 'Monitoring student attention' : 'Click to enable'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-text-primary">Cheating Detection</h3>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              iconSize={16}
            >
              Monitor
            </Button>
            <span className="text-sm text-text-secondary">
              No suspicious activity detected
            </span>
          </div>
        </div>
      </div>

      {/* Class Control Actions */}
      <div className="flex flex-wrap gap-3">
        {!isClassActive ? (
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            iconSize={16}
            onClick={onStartClass}
          >
            Start Class
          </Button>
        ) : (
          <Button
            variant="destructive"
            iconName="Square"
            iconPosition="left"
            iconSize={16}
            onClick={onEndClass}
          >
            End Class
          </Button>
        )}
        
        <Button
          variant="outline"
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={16}
        >
          Send Notification
        </Button>
        
        <Button
          variant="outline"
          iconName="FileText"
          iconPosition="left"
          iconSize={16}
        >
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default ClassControlPanel;