import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/student-dashboard',
      submenu: [
        { label: 'Student Overview', path: '/student-dashboard', icon: 'GraduationCap' },
        { label: 'Faculty Overview', path: '/faculty-dashboard', icon: 'Users' },
        { label: 'Admin Overview', path: '/admin-dashboard', icon: 'Shield' }
      ]
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: 'CheckSquare',
      path: '/attendance-tracking',
      submenu: [
        { label: 'Mark Attendance', path: '/attendance-tracking', icon: 'Check' },
        { label: 'Attendance Reports', path: '/attendance-reports', icon: 'BarChart3' },
        { label: 'Attendance History', path: '/attendance-history', icon: 'History' }
      ]
    },
    {
      id: 'classes',
      label: 'Class Management',
      icon: 'BookOpen',
      path: '/class-management',
      submenu: [
        { label: 'My Classes', path: '/class-management', icon: 'Book' },
        { label: 'Schedule', path: '/class-schedule', icon: 'Calendar' },
        { label: 'Assignments', path: '/assignments', icon: 'FileText' }
      ]
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'Users',
      path: '/students',
      submenu: [
        { label: 'Student List', path: '/students', icon: 'UserCheck' },
        { label: 'Performance', path: '/student-performance', icon: 'TrendingUp' },
        { label: 'Enrollment', path: '/enrollment', icon: 'UserPlus' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/analytics',
      submenu: [
        { label: 'Performance Analytics', path: '/analytics', icon: 'LineChart' },
        { label: 'Attendance Analytics', path: '/attendance-analytics', icon: 'PieChart' },
        { label: 'Class Analytics', path: '/class-analytics', icon: 'Activity' }
      ]
    }
  ];

  const quickActions = [
    { label: 'Mark Attendance', icon: 'CheckSquare', action: () => navigate('/attendance-tracking') },
    { label: 'Create Assignment', icon: 'Plus', action: () => navigate('/assignments/create') },
    { label: 'Schedule Class', icon: 'Calendar', action: () => navigate('/class-schedule/create') },
    { label: 'Send Notification', icon: 'Bell', action: () => navigate('/notifications/send') }
  ];

  const handleMenuClick = (item) => {
    if (item?.submenu) {
      setActiveSubmenu(activeSubmenu === item?.id ? null : item?.id);
    } else {
      navigate(item?.path);
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (path) => {
    navigate(path);
    setActiveSubmenu(null);
  };

  const isActive = (path) => location?.pathname === path;
  const isParentActive = (item) => {
    if (item?.submenu) {
      return item?.submenu?.some(subItem => location?.pathname === subItem?.path);
    }
    return location?.pathname === item?.path;
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={16}
              onClick={onToggle}
              className="w-full"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {menuItems?.map((item) => (
                <div key={item?.id}>
                  <Button
                    variant={isParentActive(item) ? "default" : "ghost"}
                    size="sm"
                    iconName={item?.icon}
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleMenuClick(item)}
                    className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'}`}
                  >
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item?.label}</span>
                        {item?.submenu && (
                          <Icon 
                            name={activeSubmenu === item?.id ? "ChevronDown" : "ChevronRight"} 
                            size={14} 
                          />
                        )}
                      </>
                    )}
                  </Button>

                  {/* Submenu */}
                  {!isCollapsed && item?.submenu && activeSubmenu === item?.id && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item?.submenu?.map((subItem) => (
                        <Button
                          key={subItem?.path}
                          variant={isActive(subItem?.path) ? "secondary" : "ghost"}
                          size="sm"
                          iconName={subItem?.icon}
                          iconPosition="left"
                          iconSize={14}
                          onClick={() => handleSubmenuClick(subItem?.path)}
                          className="w-full justify-start px-3 py-2 text-sm"
                        >
                          {subItem?.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    iconName={action?.icon}
                    iconPosition="left"
                    iconSize={14}
                    onClick={action?.action}
                    className="w-full justify-start px-3 py-2 text-sm"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Status Indicator */}
          <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
            <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle" />
              {!isCollapsed && (
                <span className="text-xs text-text-secondary">System Online</span>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;