import { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IOption } from '@/types';
import { Label } from '@/components/ui/label';

interface IInputSelect {
    name: string;
    options: IOption[];
    placeholder?: string;
    defaultValue?: string;
    label?: string;
    disabled?: boolean;
    handleChange: (value: string) => void;
    className?: string;
}

const InputSelect: FC<IInputSelect> = ({
  options,
  placeholder = 'Select',
  defaultValue = '',
  label,
  handleChange,
  disabled = false,
  name,
  className = '',
}) => (
  <div className={className}>
    {label ? <Label>{label}</Label> : null}
    <Select
      name={name}
      onValueChange={(e: string) => handleChange(e)}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map(({ value, label, disabled = false }) => (
          <SelectItem key={crypto.randomUUID()} value={value} disabled={disabled}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

);

export default InputSelect;
