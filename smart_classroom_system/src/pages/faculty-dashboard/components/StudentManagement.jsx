import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const students = [
    {
      id: 1,
      name: "Arjun Sharma",
      studentId: "CS2021001",
      email: "arjun.sharma@college.edu",
      phone: "+91 9876543210",
      subjects: ["DSA", "DBMS", "SE"],
      attendance: 92,
      avgScore: 87,
      status: "active",
      lastSeen: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      performance: "excellent",
      parentContact: "+91 9876543211"
    },
    {
      id: 2,
      name: "Priya Patel",
      studentId: "CS2021002",
      email: "priya.patel@college.edu",
      phone: "+91 9876543212",
      subjects: ["DSA", "CN", "SE"],
      attendance: 88,
      avgScore: 91,
      status: "active",
      lastSeen: "1 hour ago",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      performance: "excellent",
      parentContact: "+91 9876543213"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      studentId: "CS2021003",
      email: "rahul.kumar@college.edu",
      phone: "+91 9876543214",
      subjects: ["DBMS", "CN"],
      attendance: 76,
      avgScore: 73,
      status: "warning",
      lastSeen: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      performance: "needs_attention",
      parentContact: "+91 9876543215"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      studentId: "CS2021004",
      email: "sneha.gupta@college.edu",
      phone: "+91 9876543216",
      subjects: ["DSA", "DBMS", "CN", "SE"],
      attendance: 95,
      avgScore: 94,
      status: "active",
      lastSeen: "30 minutes ago",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      performance: "excellent",
      parentContact: "+91 9876543217"
    },
    {
      id: 5,
      name: "Amit Singh",
      studentId: "CS2021005",
      email: "amit.singh@college.edu",
      phone: "+91 9876543218",
      subjects: ["DSA", "SE"],
      attendance: 65,
      avgScore: 68,
      status: "critical",
      lastSeen: "3 days ago",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      performance: "critical",
      parentContact: "+91 9876543219"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Students', count: students?.length },
    { value: 'excellent', label: 'Excellent', count: students?.filter(s => s?.performance === 'excellent')?.length },
    { value: 'needs_attention', label: 'Needs Attention', count: students?.filter(s => s?.performance === 'needs_attention')?.length },
    { value: 'critical', label: 'Critical', count: students?.filter(s => s?.performance === 'critical')?.length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'critical': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'excellent': return { icon: 'TrendingUp', color: 'text-success' };
      case 'needs_attention': return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'critical': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const filteredStudents = students?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || student?.performance === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for students:`, selectedStudents);
  };

  const handleIndividualAction = (action, studentId) => {
    console.log(`Individual action: ${action} for student:`, studentId);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Student Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="default" size="sm" iconName="UserPlus">
            Add Student
          </Button>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={selectedFilter === option?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedFilter(option?.value)}
            >
              {option?.label} ({option?.count})
            </Button>
          ))}
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedStudents?.length > 0 && (
        <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span className="text-sm text-primary font-medium">
                {selectedStudents?.length} student{selectedStudents?.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="MessageSquare" onClick={() => handleBulkAction('message')}>
                Send Message
              </Button>
              <Button variant="outline" size="sm" iconName="Mail" onClick={() => handleBulkAction('email')}>
                Send Email
              </Button>
              <Button variant="outline" size="sm" iconName="Phone" onClick={() => handleBulkAction('call_parents')}>
                Contact Parents
              </Button>
              <Button variant="ghost" size="sm" iconName="X" onClick={() => setSelectedStudents([])}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Student List */}
      <div className="space-y-4">
        {filteredStudents?.map((student) => {
          const performanceInfo = getPerformanceIcon(student?.performance);
          const isSelected = selectedStudents?.includes(student?.id);
          
          return (
            <div key={student?.id} className={`bg-muted/30 rounded-lg p-4 border transition-all duration-200 ${
              isSelected ? 'border-primary bg-primary/5' : 'border-border/50'
            }`}>
              <div className="flex items-start space-x-4">
                {/* Selection Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleStudentSelect(student?.id)}
                    className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                  />
                </div>

                {/* Student Avatar */}
                <img
                  src={student?.avatar}
                  alt={student?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium text-text-primary">{student?.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student?.status)}`}>
                          {student?.status?.charAt(0)?.toUpperCase() + student?.status?.slice(1)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Icon name={performanceInfo?.icon} size={14} className={performanceInfo?.color} />
                          <span className={`text-xs ${performanceInfo?.color}`}>
                            {student?.performance?.replace('_', ' ')?.charAt(0)?.toUpperCase() + student?.performance?.replace('_', ' ')?.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{student?.studentId} • {student?.email}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-text-secondary">Subjects: </span>
                          <span className="text-text-primary">{student?.subjects?.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Attendance: </span>
                          <span className={`font-medium ${student?.attendance >= 85 ? 'text-success' : student?.attendance >= 75 ? 'text-warning' : 'text-error'}`}>
                            {student?.attendance}%
                          </span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Avg Score: </span>
                          <span className={`font-medium ${student?.avgScore >= 85 ? 'text-success' : student?.avgScore >= 75 ? 'text-warning' : 'text-error'}`}>
                            {student?.avgScore}%
                          </span>
                        </div>
                        <div>
                          <span className="text-text-secondary">Last Seen: </span>
                          <span className="text-text-primary">{student?.lastSeen}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageCircle"
                        onClick={() => handleIndividualAction('message', student?.id)}
                      >
                        Message
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Phone"
                        onClick={() => handleIndividualAction('call', student?.id)}
                      >
                        Call
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Users"
                        onClick={() => handleIndividualAction('contact_parent', student?.id)}
                      >
                        Parent
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleIndividualAction('view_profile', student?.id)}
                      >
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Progress Indicators */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Attendance Progress</span>
                      <span className="font-medium">{student?.attendance}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${student?.attendance >= 85 ? 'bg-success' : student?.attendance >= 75 ? 'bg-warning' : 'bg-error'}`}
                        style={{ width: `${student?.attendance}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Academic Performance</span>
                      <span className="font-medium">{student?.avgScore}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${student?.avgScore >= 85 ? 'bg-success' : student?.avgScore >= 75 ? 'bg-warning' : 'bg-error'}`}
                        style={{ width: `${student?.avgScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredStudents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No students found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;