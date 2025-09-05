import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRLoginSection = ({ currentLanguage }) => {
  const [qrCode, setQrCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = () => {
    setIsGenerating(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      const timestamp = Date.now();
      const qrData = `smartclass://login?token=${timestamp}&type=mobile`;
      // Using QR code API service
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
      setQrCode(qrCodeUrl);
      setIsGenerating(false);
    }, 1000);
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  const refreshQRCode = () => {
    setQrCode('');
    generateQRCode();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-surface border border-border rounded-xl p-6 text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Smartphone" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">
            {currentLanguage === 'hi' ? 'QR कोड लॉगिन' : 'QR Code Login'}
          </h3>
        </div>

        <p className="text-sm text-text-secondary mb-4">
          {currentLanguage === 'hi' ?'अपने मोबाइल ऐप से इस QR कोड को स्कैन करें' :'Scan this QR code with your mobile app'
          }
        </p>

        <div className="relative bg-white p-4 rounded-lg border-2 border-dashed border-border">
          {isGenerating ? (
            <div className="w-48 h-48 flex items-center justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
          ) : qrCode ? (
            <img 
              src={qrCode} 
              alt="QR Code for mobile login"
              className="w-48 h-48 mx-auto"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-text-secondary">
              <Icon name="QrCode" size={48} />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={refreshQRCode}
            disabled={isGenerating}
            className="w-full"
          >
            {currentLanguage === 'hi' ? 'नया QR कोड' : 'Refresh QR Code'}
          </Button>

          <div className="text-xs text-text-secondary space-y-1">
            <p>
              {currentLanguage === 'hi' ?'• मोबाइल ऐप डाउनलोड करें' :'• Download the mobile app'
              }
            </p>
            <p>
              {currentLanguage === 'hi' ?'• ऐप में लॉगिन करें' :'• Login to the app'
              }
            </p>
            <p>
              {currentLanguage === 'hi' ?'• QR स्कैनर का उपयोग करें' :'• Use the QR scanner'
              }
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-text-secondary">
            {currentLanguage === 'hi' ?'QR कोड 5 मिनट में समाप्त हो जाएगा' :'QR code expires in 5 minutes'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRLoginSection;