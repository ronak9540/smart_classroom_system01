import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentManager = ({ onUploadNotes, onShareResource, onPostAssignment }) => {
  const [activeTab, setActiveTab] = useState('notes');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const mockNotes = [
    {
      id: 1,
      title: "Introduction to Data Structures",
      type: "pdf",
      size: "2.4 MB",
      uploadedAt: "2025-01-05T10:30:00",
      aiSummary: "Covers basic concepts of arrays, linked lists, and their implementations with time complexity analysis.",
      downloadCount: 24,
      status: "processed"
    },
    {
      id: 2,
      title: "Algorithm Analysis Lecture",
      type: "pptx",
      size: "5.1 MB",
      uploadedAt: "2025-01-05T09:15:00",
      aiSummary: "Detailed explanation of Big O notation, time and space complexity with practical examples.",
      downloadCount: 18,
      status: "processing"
    }
  ];

  const mockAssignments = [
    {
      id: 1,
      title: "Binary Search Implementation",
      dueDate: "2025-01-12",
      submissions: 15,
      totalStudents: 32,
      status: "active"
    },
    {
      id: 2,
      title: "Sorting Algorithms Comparison",
      dueDate: "2025-01-15",
      submissions: 8,
      totalStudents: 32,
      status: "active"
    }
  ];

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onUploadNotes(file);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'pptx': return 'Presentation';
      case 'docx': return 'FileText';
      default: return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'bg-success/10 text-success border-success/20';
      case 'processing': return 'bg-warning/10 text-warning border-warning/20';
      case 'failed': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Content Management</h2>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { id: 'notes', label: 'Notes & Materials', icon: 'FileText' },
            { id: 'assignments', label: 'Assignments', icon: 'ClipboardList' },
            { id: 'resources', label: 'Shared Resources', icon: 'Share2' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Upload Class Notes</h3>
              <p className="text-text-secondary mb-4">
                Upload PDF, PowerPoint, or Word documents. AI will automatically generate summaries.
              </p>
              
              {isUploading ? (
                <div className="space-y-2">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-text-secondary">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.pptx,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
              )}
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              <h3 className="font-medium text-text-primary">Recent Notes</h3>
              {mockNotes?.map((note) => (
                <div key={note?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={getFileIcon(note?.type)} size={20} color="var(--color-primary)" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{note?.title}</h4>
                        <p className="text-sm text-text-secondary mt-1">{note?.size} • {note?.downloadCount} downloads</p>
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(note?.status)}`}>
                            {note?.status === 'processing' ? 'AI Processing...' : 'Ready'}
                          </span>
                        </div>
                        {note?.status === 'processed' && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm text-text-secondary">
                              <strong>AI Summary:</strong> {note?.aiSummary}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" iconName="Download" iconSize={16} />
                      <Button variant="ghost" size="icon" iconName="Share2" iconSize={16} />
                      <Button variant="ghost" size="icon" iconName="MoreVertical" iconSize={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary">Active Assignments</h3>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={onPostAssignment}
              >
                Create Assignment
              </Button>
            </div>

            <div className="space-y-4">
              {mockAssignments?.map((assignment) => (
                <div key={assignment?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{assignment?.title}</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Due: {new Date(assignment.dueDate)?.toLocaleDateString('en-IN')}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-text-secondary">
                          {assignment?.submissions}/{assignment?.totalStudents} submitted
                        </span>
                        <div className="w-24 bg-border rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(assignment?.submissions / assignment?.totalStudents) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye" iconSize={16}>
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit" iconSize={16}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text-primary">Shared Resources</h3>
              <Button
                variant="default"
                iconName="Share2"
                iconPosition="left"
                iconSize={16}
                onClick={onShareResource}
              >
                Share Resource
              </Button>
            </div>

            <div className="text-center py-12">
              <Icon name="Share2" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Shared Resources</h3>
              <p className="text-text-secondary mb-4">
                Share useful links, documents, or external resources with your students.
              </p>
              <Button variant="outline" iconName="Plus" iconPosition="left" iconSize={16}>
                Add First Resource
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManager;