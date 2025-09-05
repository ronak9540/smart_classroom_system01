import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh.kumar@college.edu", role: "Faculty", department: "Computer Science", status: "active", lastLogin: "2 hours ago" },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@student.edu", role: "Student", department: "Electronics", status: "active", lastLogin: "1 hour ago" },
    { id: 3, name: "Prof. Anita Singh", email: "anita.singh@college.edu", role: "Faculty", department: "Mechanical", status: "active", lastLogin: "30 min ago" },
    { id: 4, name: "Rahul Verma", email: "rahul.verma@student.edu", role: "Student", department: "Civil", status: "inactive", lastLogin: "2 days ago" },
    { id: 5, name: "Dr. Suresh Patel", email: "suresh.patel@college.edu", role: "Admin", department: "Administration", status: "active", lastLogin: "5 min ago" },
    { id: 6, name: "Neha Gupta", email: "neha.gupta@student.edu", role: "Student", department: "Biotechnology", status: "active", lastLogin: "45 min ago" },
    { id: 7, name: "Amit Joshi", email: "amit.joshi@parent.edu", role: "Parent", department: "N/A", status: "active", lastLogin: "1 day ago" },
    { id: 8, name: "Prof. Kavita Rao", email: "kavita.rao@college.edu", role: "Faculty", department: "Chemical", status: "active", lastLogin: "15 min ago" }
  ];

  const userStats = [
    { label: "Total Users", value: "2,847", icon: "Users", color: "primary" },
    { label: "Active Students", value: "2,080", icon: "GraduationCap", color: "success" },
    { label: "Faculty Members", value: "112", icon: "UserCheck", color: "secondary" },
    { label: "Parents", value: "1,850", icon: "Heart", color: "accent" },
    { label: "Administrators", value: "15", icon: "Shield", color: "warning" }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = selectedRole === 'all' || user?.role?.toLowerCase() === selectedRole?.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-error/10 text-error border-error/20',
      'Faculty': 'bg-primary/10 text-primary border-primary/20',
      'Student': 'bg-success/10 text-success border-success/20',
      'Parent': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[role] || 'bg-muted text-text-secondary border-border';
  };

  const getStatusColor = (status) => {
    return status === 'active' ?'bg-success/10 text-success border-success/20' :'bg-error/10 text-error border-error/20';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
          <p className="text-sm text-text-secondary">Manage users across the platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add User
          </Button>
        </div>
      </div>
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {userStats?.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={stat?.icon} size={16} className={`text-${stat?.color}`} />
              <span className="text-sm font-medium text-text-primary">{stat?.label}</span>
            </div>
            <p className="text-xl font-bold text-text-primary">{stat?.value}</p>
          </div>
        ))}
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedRole === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('all')}
          >
            All
          </Button>
          <Button
            variant={selectedRole === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('student')}
          >
            Students
          </Button>
          <Button
            variant={selectedRole === 'faculty' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('faculty')}
          >
            Faculty
          </Button>
          <Button
            variant={selectedRole === 'parent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('parent')}
          >
            Parents
          </Button>
        </div>
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-text-secondary">User</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Role</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Department</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Status</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Last Login</th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{user?.name}</p>
                      <p className="text-sm text-text-secondary">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-text-primary">{user?.department}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-text-secondary">{user?.lastLogin}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                      More
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No users found matching your criteria</p>
        </div>
      )}
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-text-secondary">
          Showing {filteredUsers?.length} of {users?.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="default" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;