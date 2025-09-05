import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/student-dashboard', label: 'Student', icon: 'GraduationCap' },
    { path: '/faculty-dashboard', label: 'Faculty', icon: 'Users' },
    { path: '/attendance-tracking', label: 'Attendance', icon: 'CheckSquare' },
    { path: '/class-management', label: 'Classes', icon: 'BookOpen' },
    { path: '/admin-dashboard', label: 'Admin', icon: 'Settings' }
  ];

  const notifications = [
    { id: 1, title: 'Class Schedule Updated', message: 'Mathematics class moved to 10:00 AM', time: '5 min ago', unread: true },
    { id: 2, title: 'Assignment Due', message: 'Physics assignment due tomorrow', time: '1 hour ago', unread: true },
    { id: 3, title: 'Attendance Marked', message: 'Your attendance has been recorded', time: '2 hours ago', unread: false }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="GraduationCap" size={24} color="white" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-text-primary">Smart Classroom</span>
        <span className="text-xs text-text-secondary">Education System</span>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                onClick={() => handleNavigation(item?.path)}
                className="px-3 py-2"
              >
                {item?.label}
              </Button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                More
              </Button>
              
              {isProfileOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal py-2 z-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => handleNavigation('/admin-dashboard')}
                    className="w-full justify-start px-4 py-2"
                  >
                    Admin Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start px-4 py-2"
                  >
                    Help & Support
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="Bell"
              iconSize={20}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            
            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-medium text-text-primary">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="px-4 py-3 hover:bg-muted transition-smooth">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification?.unread ? 'bg-primary' : 'bg-muted-foreground'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{notification?.title}</p>
                          <p className="text-sm text-text-secondary">{notification?.message}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              iconPosition="left"
              iconSize={16}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="px-3"
            >
              <span className="hidden sm:inline">John Doe</span>
            </Button>
            
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">John Doe</p>
                  <p className="text-xs text-text-secondary">Faculty Member</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start px-4 py-2"
                >
                  Profile Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start px-4 py-2"
                >
                  Preferences
                </Button>
                <div className="border-t border-border my-2" />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleLogout}
                  className="w-full justify-start px-4 py-2 text-error hover:text-error hover:bg-error/10"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            iconName="Menu"
            iconSize={20}
            onClick={onToggleSidebar}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {!isCollapsed && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40">
          <div className="bg-surface border-b border-border p-4">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={location?.pathname === item?.path ? "default" : "ghost"}
                  size="sm"
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => {
                    handleNavigation(item?.path);
                    onToggleSidebar?.();
                  }}
                  className="w-full justify-start"
                >
                  {item?.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;