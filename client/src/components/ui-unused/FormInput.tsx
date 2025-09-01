import React from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

// Matches existing auth page input styling (label above, rounded, gray border, focus ring)
const FormInput: React.FC<FormInputProps> = ({ label, error, icon, className, ...rest }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
          error && 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
        )}
      >
        <input
          className={cn('w-full bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400', className)}
          {...rest}
        />
        {icon && <span className="ml-2 text-gray-400 flex items-center">{icon}</span>}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
