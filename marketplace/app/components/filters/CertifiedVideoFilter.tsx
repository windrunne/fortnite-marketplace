import React from 'react';
import ToggleSwitch from '../ToggleSwitch';

interface CertifiedVideoFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const CertifiedVideoFilter: React.FC<CertifiedVideoFilterProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="flex items-center py-1 gap-6">
        <div>
            <div className="text-gray-400 text-xs mb-1">Certified Video</div>
            <div className="text-white text-sm whitespace-nowrap">View all</div>
        </div>
        <ToggleSwitch 
          isOn={value}
          onToggle={() => onChange(!value)}
        />
      </div>
    </div>
  );
};

export default CertifiedVideoFilter; 