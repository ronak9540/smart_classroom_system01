import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import QRLoginSection from './components/QRLoginSection';
import LanguageToggle from './components/LanguageToggle';
import CredentialsHelper from './components/CredentialsHelper';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Login = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedRole, setSelectedRole] = useState('');
  const [loginMethod, setLoginMethod] = useState('form'); // 'form' or 'qr'

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <Helmet>
        <title>
          {currentLanguage === 'hi' ?'लॉगिन - स्मार्ट क्लासरूम सिस्टम' :'Login - Smart Classroom System'
          }
        </title>
        <meta 
          name="description" 
          content={currentLanguage === 'hi' ?'स्मार्ट क्लासरूम शिक्षा प्रबंधन प्रणाली में लॉग इन करें। छात्र, शिक्षक, प्रशासक और अभिभावक डैशबोर्ड तक पहुंच प्राप्त करें।' :'Login to Smart Classroom Education Management System. Access student, faculty, administrator and parent dashboards.'
          } 
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        {/* Language Toggle */}
        <LanguageToggle 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8">
                <LoginHeader currentLanguage={currentLanguage} />

                {/* Login Method Toggle */}
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Button
                    variant={loginMethod === 'form' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => setLoginMethod('form')}
                  >
                    {currentLanguage === 'hi' ? 'ईमेल लॉगिन' : 'Email Login'}
                  </Button>
                  <Button
                    variant={loginMethod === 'qr' ? 'default' : 'ghost'}
                    size="sm"
                    iconName="QrCode"
                    iconPosition="left"
                    onClick={() => setLoginMethod('qr')}
                  >
                    {currentLanguage === 'hi' ? 'QR लॉगिन' : 'QR Login'}
                  </Button>
                </div>

                {/* Login Content */}
                {loginMethod === 'form' ? (
                  <LoginForm
                    selectedRole={selectedRole}
                    onRoleChange={handleRoleChange}
                    currentLanguage={currentLanguage}
                  />
                ) : (
                  <QRLoginSection currentLanguage={currentLanguage} />
                )}

                {/* Demo Credentials Helper */}
                {loginMethod === 'form' && (
                  <CredentialsHelper currentLanguage={currentLanguage} />
                )}
              </div>
            </div>

            {/* Right Side - Features & Benefits */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                  {currentLanguage === 'hi' ?'शिक्षा का भविष्य' :'Future of Education'
                  }
                </h2>
                <p className="text-xl text-text-secondary mb-8">
                  {currentLanguage === 'hi' ?'AI-संचालित स्मार्ट क्लासरूम प्रबंधन प्रणाली के साथ शिक्षा को बेहतर बनाएं।' :'Transform education with AI-powered smart classroom management system.'
                  }
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'स्वचालित उपस्थिति' : 'Automated Attendance'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'hi' ?'QR कोड, फेस रिकग्निशन और GPS के साथ स्मार्ट उपस्थिति ट्रैकिंग।' :'Smart attendance tracking with QR codes, face recognition, and GPS.'
                    }
                  </p>
                </div>

                <div className="bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Brain" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'AI-संचालित नोट्स' : 'AI-Powered Notes'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'hi' ?'व्याख्यान से स्वचालित नोट्स सारांश और स्मार्ट साझाकरण।' :'Automatic notes summarization from lectures and smart sharing.'
                    }
                  </p>
                </div>

                <div className="bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="BarChart3" size={24} className="text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'रियल-टाइम एनालिटिक्स' : 'Real-time Analytics'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'hi' ?'प्रदर्शन डैशबोर्ड और व्यापक रिपोर्टिंग सिस्टम।' :'Performance dashboards and comprehensive reporting system.'
                    }
                  </p>
                </div>

                <div className="bg-surface/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="MessageSquare" size={24} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'स्मार्ट अलर्ट' : 'Smart Alerts'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'hi' ?'WhatsApp/SMS के माध्यम से स्वचालित कक्षा रिमाइंडर और अपडेट।' :'Automated class reminders and updates via WhatsApp/SMS.'
                    }
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-surface/40 backdrop-blur-sm border border-border rounded-xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'छात्र' : 'Students'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">2K+</div>
                    <div className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'शिक्षक' : 'Faculty'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">100+</div>
                    <div className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'संस्थान' : 'Institutions'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-4 left-4 right-4 text-center">
          <p className="text-xs text-text-secondary">
            © {new Date()?.getFullYear()} Smart Classroom System. 
            {currentLanguage === 'hi' ? ' सभी अधिकार सुरक्षित।' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;