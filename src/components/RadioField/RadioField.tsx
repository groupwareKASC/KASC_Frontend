import React from 'react';

interface RadioFieldProps {
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;   
  value: string;  
  disabled?: boolean;
}

export const RadioField = ({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
}: RadioFieldProps) => {
  return (
    <label
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'relative',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <span
        style={{
          width: '1.75rem',
          height: '1.75rem',
          border: '2px solid #D0D0D0',
          borderRadius: '50%',
          position: 'relative',
          display: 'inline-block',
          background: disabled ? '#F0F0F0' : 'transparent',
        }}
      >
        {checked && (
          <span
            style={{
              width: '1.125rem',
              height: '1.125rem',
              background: 'var(--Blue-3, #182E64)',
              borderRadius: '50%',
              border: '1.5px solid var(--Blue-3, #182E64);',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </span>
      <span
        style={{
          color: checked ? '#202020' : '#D0D0D0',
          fontFamily: 'KoPubWorld_m',
          fontSize: '1.7rem',
          fontWeight: 500,
          lineHeight: '1.875rem',
          letterSpacing: '0.4rem',
        }}
      >
        {label}
      </span>
    </label>
  );
};
