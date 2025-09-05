import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ selectedRole, onRoleChange, currentLanguage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const mockCredentials = {
    student: { email: 'student@smartclass.edu', password: 'student123' },
    faculty: { email: 'faculty@smartclass.edu', password: 'faculty123' },
    admin: { email: 'admin@smartclass.edu', password: 'admin123' },
    parent: { email: 'parent@smartclass.edu', password: 'parent123' }
  };

  const roleOptions = [
    { value: 'student', label: currentLanguage === 'hi' ? 'छात्र' : 'Student', icon: 'GraduationCap' },
    { value: 'faculty', label: currentLanguage === 'hi' ? 'शिक्षक' : 'Faculty', icon: 'Users' },
    { value: 'admin', label: currentLanguage === 'hi' ? 'प्रशासक' : 'Administrator', icon: 'Shield' },
    { value: 'parent', label: currentLanguage === 'hi' ? 'अभिभावक' : 'Parent', icon: 'Heart' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Please enter a valid email';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए' : 'Password must be at least 6 characters';
    }

    if (!selectedRole) {
      newErrors.role = currentLanguage === 'hi' ? 'भूमिका चुनें' : 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockCred = mockCredentials?.[selectedRole];
      
      if (formData?.email === mockCred?.email && formData?.password === mockCred?.password) {
        // Successful login
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to role-specific dashboard
        const dashboardRoutes = {
          student: '/student-dashboard',
          faculty: '/faculty-dashboard',
          admin: '/admin-dashboard',
          parent: '/student-dashboard' // Parents see student dashboard
        };
        
        navigate(dashboardRoutes?.[selectedRole]);
      } else {
        // Invalid credentials
        setErrors({
          general: currentLanguage === 'hi' ?'गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।' :'Invalid email or password. Please try again.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert(currentLanguage === 'hi' ?'पासवर्ड रीसेट लिंक आपके ईमेल पर भेजा जाएगा।' :'Password reset link will be sent to your email.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            {currentLanguage === 'hi' ? 'भूमिका चुनें' : 'Select Role'}
            <span className="text-error ml-1">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {roleOptions?.map((role) => (
              <button
                key={role?.value}
                type="button"
                onClick={() => onRoleChange(role?.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                  selectedRole === role?.value
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={role?.icon} size={20} />
                <span className="text-sm font-medium">{role?.label}</span>
              </button>
            ))}
          </div>
          {errors?.role && (
            <p className="text-sm text-error mt-1">{errors?.role}</p>
          )}
        </div>

        {/* Email Input */}
        <Input
          label={currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder={currentLanguage === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label={currentLanguage === 'hi' ? 'पासवर्ड' : 'Password'}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder={currentLanguage === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          className="w-full"
        >
          {currentLanguage === 'hi' ? 'लॉग इन करें' : 'Login'}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {currentLanguage === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
          </button>
        </div>

        {/* Create Account */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'नया उपयोगकर्ता?' : "Don't have an account?"}
            <button
              type="button"
              className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors"
              onClick={() => alert(currentLanguage === 'hi' ? 'रजिस्ट्रेशन पेज जल्द आएगा' : 'Registration coming soon')}
            >
              {currentLanguage === 'hi' ? 'खाता बनाएं' : 'Create Account'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;