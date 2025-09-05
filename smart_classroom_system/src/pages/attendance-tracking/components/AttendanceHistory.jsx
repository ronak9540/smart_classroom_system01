import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceHistory = ({ attendanceData }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const subjectOptions = [
    { value: '', label: 'All Subjects' },
    ...Array.from(new Set(attendanceData.map(item => item.subject)))?.map(subject => ({ value: subject, label: subject }))
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'subject', label: 'Subject' },
    { value: 'status', label: 'Status' }
  ];

  const filteredData = attendanceData?.filter(item => {
      const dateMatch = !filterDate || item?.date?.includes(filterDate);
      const subjectMatch = !filterSubject || item?.subject === filterSubject;
      return dateMatch && subjectMatch;
    })?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'Absent':
        return { icon: 'XCircle', color: 'text-error' };
      case 'Late':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'QR Code':
        return 'QrCode';
      case 'Face Recognition':
        return 'Camera';
      case 'GPS Location':
        return 'MapPin';
      default:
        return 'Check';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Attendance History</h3>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            size="sm"
          >
            Export
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="date"
            label="Filter by Date"
            value={filterDate}
            onChange={(e) => setFilterDate(e?.target?.value)}
            className="w-full"
          />
          
          <Select
            label="Filter by Subject"
            options={subjectOptions}
            value={filterSubject}
            onChange={setFilterSubject}
          />
          
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
          
          <div className="flex items-end">
            <Button
              variant="outline"
              iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
              iconPosition="left"
              iconSize={16}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="w-full"
            >
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Date</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Subject</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Time</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Method</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Faculty</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((record, index) => {
              const statusConfig = getStatusIcon(record?.status);
              return (
                <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-medium text-text-primary">{record?.date}</div>
                    <div className="text-xs text-text-secondary">{record?.day}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-text-primary">{record?.subject}</div>
                    <div className="text-xs text-text-secondary">{record?.code}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-text-primary">{record?.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={getMethodIcon(record?.method)} size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{record?.method}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={statusConfig?.icon} size={16} className={statusConfig?.color} />
                      <span className={`text-sm font-medium ${statusConfig?.color}`}>
                        {record?.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-text-primary">{record?.faculty}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredData?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-text-secondary">No attendance records found</p>
          </div>
        )}
      </div>
      {filteredData?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>Showing {filteredData?.length} of {attendanceData?.length} records</span>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" iconName="ChevronLeft" iconSize={16}>
                Previous
              </Button>
              <span className="text-text-primary">Page 1 of 1</span>
              <Button variant="ghost" size="sm" iconName="ChevronRight" iconSize={16}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;