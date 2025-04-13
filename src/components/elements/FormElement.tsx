
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckboxCheckedIcon } from '@radix-ui/react-icons';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

interface FormElementProps {
  fields: FormField[];
  submitLabel: string;
  onSubmit?: (data: Record<string, any>) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  spacing?: 'tight' | 'normal' | 'loose';
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const FormElement: React.FC<FormElementProps> = ({
  fields,
  submitLabel = 'Submit',
  onSubmit,
  className = '',
  layout = 'vertical',
  spacing = 'normal',
  buttonVariant = 'default',
}) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };
  
  const handleChange = (id: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4',
    loose: 'space-y-6'
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`form-element ${spacingClasses[spacing]} ${className}`}
    >
      {fields.map((field) => (
        <div 
          key={field.id}
          className={layout === 'horizontal' ? 'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start' : ''}
        >
          <Label 
            htmlFor={field.id}
            className={layout === 'horizontal' ? 'sm:pt-2' : 'mb-1 block'}
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          <div className={layout === 'horizontal' ? 'sm:col-span-2 mt-1 sm:mt-0' : ''}>
            {field.type === 'textarea' ? (
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue={field.defaultValue}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full"
              />
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={field.id}
                  required={field.required}
                  defaultChecked={field.defaultValue === 'true'}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
                  {field.placeholder || 'Yes, I agree'}
                </label>
              </div>
            ) : (
              <Input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                defaultValue={field.defaultValue}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full"
              />
            )}
          </div>
        </div>
      ))}
      
      <div className={layout === 'horizontal' ? 'sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start' : ''}>
        <div className={layout === 'horizontal' ? 'sm:col-span-2 sm:col-start-2' : ''}>
          <Button type="submit" variant={buttonVariant as any} className="w-full sm:w-auto">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormElement;
