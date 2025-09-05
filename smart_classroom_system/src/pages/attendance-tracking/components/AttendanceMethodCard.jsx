import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceMethodCard = ({ method, onMethodSelect, isActive, currentClass }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [locationStatus, setLocationStatus] = useState('checking');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const methodConfig = {
    qr: {
      title: 'QR Code Scanner',
      icon: 'QrCode',
      description: 'Scan the QR code displayed in classroom',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    face: {
      title: 'Face Recognition',
      icon: 'Camera',
      description: 'Use facial recognition for attendance',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    gps: {
      title: 'GPS Location',
      icon: 'MapPin',
      description: 'Verify your location in classroom',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  };

  const config = methodConfig?.[method];

  useEffect(() => {
    if (method === 'gps' && isActive) {
      checkLocation();
    }
  }, [method, isActive]);

  const checkLocation = () => {
    setLocationStatus('checking');
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          // Mock location verification
          const distance = Math.random() * 100;
          if (distance < 50) {
            setLocationStatus('verified');
          } else {
            setLocationStatus('out_of_range');
          }
        },
        () => {
          setLocationStatus('error');
        }
      );
    } else {
      setLocationStatus('not_supported');
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    setScanResult(null);

    if (method === 'qr') {
      // Mock QR scanning
      setTimeout(() => {
        const success = Math.random() > 0.3;
        setScanResult(success ? 'success' : 'invalid');
        setIsScanning(false);
      }, 3000);
    } else if (method === 'face') {
      try {
        const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
        if (videoRef?.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Mock face recognition
        setTimeout(() => {
          const success = Math.random() > 0.2;
          setScanResult(success ? 'success' : 'not_recognized');
          setIsScanning(false);
          if (stream) {
            stream?.getTracks()?.forEach(track => track?.stop());
          }
        }, 4000);
      } catch (error) {
        setScanResult('camera_error');
        setIsScanning(false);
      }
    }
  };

  const getStatusMessage = () => {
    if (method === 'gps') {
      switch (locationStatus) {
        case 'checking':
          return { text: 'Checking your location...', color: 'text-warning' };
        case 'verified':
          return { text: 'Location verified - You are in classroom', color: 'text-success' };
        case 'out_of_range':
          return { text: 'You are not in the classroom range', color: 'text-error' };
        case 'error':
          return { text: 'Unable to access location', color: 'text-error' };
        case 'not_supported':
          return { text: 'Location services not supported', color: 'text-error' };
        default:
          return { text: '', color: '' };
      }
    }

    if (scanResult) {
      switch (scanResult) {
        case 'success':
          return { text: 'Attendance marked successfully!', color: 'text-success' };
        case 'invalid':
          return { text: 'Invalid QR code. Please try again.', color: 'text-error' };
        case 'not_recognized':
          return { text: 'Face not recognized. Please try again.', color: 'text-error' };
        case 'camera_error':
          return { text: 'Camera access denied or unavailable.', color: 'text-error' };
        default:
          return { text: '', color: '' };
      }
    }

    return { text: '', color: '' };
  };

  const statusMessage = getStatusMessage();
  const canMarkAttendance = method === 'gps' ? locationStatus === 'verified' : true;

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 transition-all duration-300 ${
      isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg ${config?.bgColor} flex items-center justify-center`}>
          <Icon name={config?.icon} size={24} className={config?.color} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">{config?.title}</h3>
          <p className="text-sm text-text-secondary mb-4">{config?.description}</p>
          
          {statusMessage?.text && (
            <div className={`text-sm font-medium mb-4 ${statusMessage?.color}`}>
              {statusMessage?.text}
            </div>
          )}

          {isActive && (
            <div className="space-y-4">
              {method === 'qr' && (
                <div className="bg-muted rounded-lg p-4">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-background border-2 border-dashed border-primary rounded-lg flex items-center justify-center mb-3">
                        <Icon name="QrCode" size={48} className="text-primary animate-pulse" />
                      </div>
                      <p className="text-sm text-text-secondary">Scanning QR code...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-text-secondary">Click scan to start QR code detection</p>
                    </div>
                  )}
                </div>
              )}

              {method === 'face' && (
                <div className="bg-muted rounded-lg p-4">
                  {isScanning ? (
                    <div className="text-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full max-w-xs h-48 bg-background rounded-lg mx-auto mb-3"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <p className="text-sm text-text-secondary">Analyzing face...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-text-secondary">Click scan to start face recognition</p>
                    </div>
                  )}
                </div>
              )}

              {method === 'gps' && (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={locationStatus === 'verified' ? 'CheckCircle' : locationStatus === 'checking' ? 'Loader2' : 'AlertCircle'} 
                      size={24} 
                      className={`${
                        locationStatus === 'verified' ? 'text-success' : 
                        locationStatus === 'checking' ? 'text-warning animate-spin' : 'text-error'
                      }`} 
                    />
                    <div>
                      <p className="text-sm font-medium text-text-primary">Classroom: {currentClass?.room || 'Room 101'}</p>
                      <p className="text-xs text-text-secondary">Distance: {locationStatus === 'verified' ? '15m' : 'Calculating...'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                {method !== 'gps' && (
                  <Button
                    variant="default"
                    iconName={isScanning ? 'Loader2' : 'Scan'}
                    iconPosition="left"
                    iconSize={16}
                    onClick={startScanning}
                    disabled={isScanning}
                    className={isScanning ? 'animate-pulse' : ''}
                  >
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                  </Button>
                )}
                
                {((method === 'gps' && locationStatus === 'verified') || scanResult === 'success') && (
                  <Button
                    variant="success"
                    iconName="Check"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => onMethodSelect(method)}
                  >
                    Mark Attendance
                  </Button>
                )}
                
                {method === 'gps' && locationStatus !== 'verified' && locationStatus !== 'checking' && (
                  <Button
                    variant="outline"
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                    onClick={checkLocation}
                  >
                    Retry Location
                  </Button>
                )}
              </div>
            </div>
          )}

          {!isActive && canMarkAttendance && (
            <Button
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
              onClick={() => onMethodSelect(method)}
            >
              Select Method
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceMethodCard;