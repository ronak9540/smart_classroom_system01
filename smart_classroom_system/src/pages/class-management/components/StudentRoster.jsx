import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StudentRoster = ({ students, onContactStudent, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredStudents = students?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesFilter = filterStatus === 'all' || student?.attendanceStatus === filterStatus;
      return matchesSearch && matchesFilter;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'engagement':
          return b?.engagementScore - a?.engagementScore;
        case 'attendance':
          return b?.attendancePercentage - a?.attendancePercentage;
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success border-success/20';
      case 'absent':
        return 'bg-error/10 text-error border-error/20';
      case 'late':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-text-primary">Student Roster</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              {filteredStudents?.length} of {students?.length} students
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="engagement">Sort by Engagement</option>
            <option value="attendance">Sort by Attendance</option>
          </select>
        </div>
      </div>
      {/* Student List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredStudents?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-text-secondary">No students found matching your criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredStudents?.map((student) => (
              <div key={student?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={student?.avatar}
                        alt={student?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
                        student?.attendanceStatus === 'present' ? 'bg-success' :
                        student?.attendanceStatus === 'late' ? 'bg-warning' : 'bg-error'
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-text-primary truncate">{student?.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(student?.attendanceStatus)}`}>
                          {student?.attendanceStatus}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">Roll: {student?.rollNumber}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-text-secondary">
                          Attendance: {student?.attendancePercentage}%
                        </span>
                        <span className={`text-xs font-medium ${getEngagementColor(student?.engagementScore)}`}>
                          Engagement: {student?.engagementScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MessageCircle"
                      iconSize={16}
                      onClick={() => onContactStudent(student)}
                      className="h-8 w-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      iconSize={16}
                      onClick={() => onViewDetails(student)}
                      className="h-8 w-8"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreVertical"
                      iconSize={16}
                      className="h-8 w-8"
                    />
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{student?.videoWatchTime}%</div>
                    <div className="text-text-secondary">Video Watch</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{student?.questionsAsked}</div>
                    <div className="text-text-secondary">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-text-primary">{student?.participationScore}%</div>
                    <div className="text-text-secondary">Participation</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRoster;