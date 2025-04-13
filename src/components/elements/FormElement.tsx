
import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FormElementProps {
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'form';
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  className?: string;
  formConfig?: {
    submitText?: string;
    fields?: {
      name: string;
      type: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';
      label?: string;
      placeholder?: string;
      required?: boolean;
      options?: { label: string; value: string }[];
    }[];
  };
}

const FormElement: React.FC<FormElementProps> = ({
  type,
  label,
  placeholder,
  required = false,
  options = [],
  className = '',
  formConfig,
}) => {
  if (type === 'form' && formConfig) {
    return (
      <form 
        className={`space-y-4 ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted');
        }}
      >
        {formConfig.fields?.map((field, index) => (
          <FormElement
            key={index}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            options={field.options}
          />
        ))}
        
        <Button type="submit" className="w-full">
          {formConfig.submitText || 'Submit'}
        </Button>
      </form>
    );
  }
  
  if (type === 'input') {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <Label>{label}{required && <span className="text-red-500">*</span>}</Label>}
        <Input 
          placeholder={placeholder || ''} 
          required={required}
        />
      </div>
    );
  }
  
  if (type === 'textarea') {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <Label>{label}{required && <span className="text-red-500">*</span>}</Label>}
        <Textarea 
          placeholder={placeholder || ''} 
          required={required}
        />
      </div>
    );
  }
  
  if (type === 'select') {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <Label>{label}{required && <span className="text-red-500">*</span>}</Label>}
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={placeholder || 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  
  if (type === 'checkbox') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Checkbox id={`checkbox-${label}`} />
        {label && (
          <Label htmlFor={`checkbox-${label}`}>
            {label}{required && <span className="text-red-500">*</span>}
          </Label>
        )}
      </div>
    );
  }
  
  if (type === 'radio') {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && <Label>{label}{required && <span className="text-red-500">*</span>}</Label>}
        <div className="space-y-1">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input 
                type="radio" 
                id={`radio-${option.value}`} 
                name={label} 
                value={option.value}
                className="h-4 w-4 text-primary"
              />
              <Label htmlFor={`radio-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return null;
};

export default FormElement;
