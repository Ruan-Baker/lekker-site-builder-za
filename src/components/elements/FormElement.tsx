
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type FormElementType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'textarea' 
  | 'checkbox' 
  | 'radio' 
  | 'select' 
  | 'submit';

export interface FormField {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string | boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  customStyles?: {
    labelStyles?: React.CSSProperties;
    inputStyles?: React.CSSProperties;
    containerStyles?: React.CSSProperties;
  };
}

interface FormElementProps {
  field: FormField;
  onChange?: (id: string, value: string | boolean) => void;
  className?: string;
}

const FormElement: React.FC<FormElementProps> = ({
  field,
  onChange,
  className = ''
}) => {
  const [value, setValue] = useState<string | boolean>(field.defaultValue || '');
  
  const handleChange = (newValue: string | boolean) => {
    setValue(newValue);
    if (onChange) {
      onChange(field.id, newValue);
    }
  };

  const renderField = () => {
    const {
      id, type, label, placeholder, required, options,
      validation, customStyles
    } = field;

    const containerStyles = customStyles?.containerStyles || {};
    const labelStyles = customStyles?.labelStyles || {};
    const inputStyles = customStyles?.inputStyles || {};

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <div className="space-y-2" style={containerStyles}>
            <Label 
              htmlFor={id}
              style={labelStyles}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value as string}
              onChange={(e) => handleChange(e.target.value)}
              required={required}
              min={validation?.min}
              max={validation?.max}
              minLength={validation?.minLength}
              maxLength={validation?.maxLength}
              pattern={validation?.pattern}
              style={inputStyles}
              className={className}
            />
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-2" style={containerStyles}>
            <Label 
              htmlFor={id}
              style={labelStyles}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={id}
              placeholder={placeholder}
              value={value as string}
              onChange={(e) => handleChange(e.target.value)}
              required={required}
              minLength={validation?.minLength}
              maxLength={validation?.maxLength}
              style={inputStyles}
              className={className}
            />
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2" style={containerStyles}>
            <Checkbox
              id={id}
              checked={value as boolean}
              onCheckedChange={handleChange}
              required={required}
              style={inputStyles}
              className={className}
            />
            <Label 
              htmlFor={id}
              style={labelStyles}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2" style={containerStyles}>
            <Label style={labelStyles}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup
              value={value as string}
              onValueChange={handleChange}
              required={required}
              className={className}
            >
              {options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`${id}-${option.value}`} 
                    style={inputStyles}
                  />
                  <Label htmlFor={`${id}-${option.value}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-2" style={containerStyles}>
            <Label 
              htmlFor={id}
              style={labelStyles}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={value as string}
              onValueChange={handleChange}
            >
              <SelectTrigger id={id} className={className} style={inputStyles}>
                <SelectValue placeholder={placeholder || `Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'submit':
        return (
          <Button
            id={id}
            type="submit"
            className={className}
            style={inputStyles}
          >
            {label}
          </Button>
        );
        
      default:
        return null;
    }
  };

  return renderField();
};

export default FormElement;
