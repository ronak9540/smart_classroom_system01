import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CredentialsHelper = ({ currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      role: currentLanguage === 'hi' ? 'छात्र' : 'Student',
      email: 'student@smartclass.edu',
      password: 'student123',
      icon: 'GraduationCap',
      color: 'text-blue-600'
    },
    {
      role: currentLanguage === 'hi' ? 'शिक्षक' : 'Faculty',
      email: 'faculty@smartclass.edu',
      password: 'faculty123',
      icon: 'Users',
      color: 'text-green-600'
    },
    {
      role: currentLanguage === 'hi' ? 'प्रशासक' : 'Administrator',
      email: 'admin@smartclass.edu',
      password: 'admin123',
      icon: 'Shield',
      color: 'text-purple-600'
    },
    {
      role: currentLanguage === 'hi' ? 'अभिभावक' : 'Parent',
      email: 'parent@smartclass.edu',
      password: 'parent123',
      icon: 'Heart',
      color: 'text-pink-600'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Button
        variant="ghost"
        size="sm"
        iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
        iconPosition="right"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-text-secondary hover:text-text-primary"
      >
        {currentLanguage === 'hi' ? 'डेमो क्रेडेंशियल देखें' : 'View Demo Credentials'}
      </Button>
      {isExpanded && (
        <div className="mt-4 bg-muted/50 border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-sm text-text-secondary">
              {currentLanguage === 'hi' ?'परीक्षण के लिए इन क्रेडेंशियल का उपयोग करें:' :'Use these credentials for testing:'
              }
            </p>
          </div>

          {mockCredentials?.map((cred, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name={cred?.icon} size={16} className={cred?.color} />
                <span className="text-sm font-medium text-text-primary">{cred?.role}</span>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {currentLanguage === 'hi' ? 'ईमेल:' : 'Email:'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <code className="bg-muted px-2 py-1 rounded text-text-primary">
                      {cred?.email}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred?.email)}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">
                    {currentLanguage === 'hi' ? 'पासवर्ड:' : 'Password:'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <code className="bg-muted px-2 py-1 rounded text-text-primary">
                      {cred?.password}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred?.password)}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-xs text-warning">
              {currentLanguage === 'hi' ?'⚠️ ये केवल डेमो क्रेडेंशियल हैं। वास्तविक उत्पादन में उपयोग न करें।' :'⚠️ These are demo credentials only. Do not use in production.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;