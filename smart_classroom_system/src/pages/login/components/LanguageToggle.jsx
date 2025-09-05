import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
  ];

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    onLanguageChange(newLanguage);
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);
  const otherLang = languages?.find(lang => lang?.code !== currentLanguage);

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="bg-surface/90 backdrop-blur-sm border-border hover:bg-surface"
      >
        <span className="mr-2">{otherLang?.flag}</span>
        <span className="text-sm font-medium">{otherLang?.label}</span>
        <Icon name="Globe" size={14} className="ml-2" />
      </Button>
    </div>
  );
};

export default LanguageToggle;