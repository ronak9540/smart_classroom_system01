import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = ({ currentLanguage }) => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          {currentLanguage === 'hi' ? 'स्मार्ट क्लासरूम' : 'Smart Classroom'}
        </h1>
        <p className="text-lg text-text-secondary">
          {currentLanguage === 'hi' ?'शिक्षा प्रबंधन प्रणाली' :'Education Management System'
          }
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-primary font-medium">
          {currentLanguage === 'hi' ?'आपका स्वागत है! कृपया अपनी भूमिका चुनें और लॉग इन करें।' :'Welcome! Please select your role and login to continue.'
          }
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>
            {currentLanguage === 'hi' ? 'स्वचालित उपस्थिति' : 'Auto Attendance'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>
            {currentLanguage === 'hi' ? 'AI-संचालित नोट्स' : 'AI-Powered Notes'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>
            {currentLanguage === 'hi' ? 'रियल-टाइम एनालिटिक्स' : 'Real-time Analytics'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span>
            {currentLanguage === 'hi' ? 'स्मार्ट अलर्ट' : 'Smart Alerts'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;