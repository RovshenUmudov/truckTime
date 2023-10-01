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
}

const InputSelect: FC<IInputSelect> = ({
  options,
  placeholder = 'Select',
  defaultValue = '',
  label,
  handleChange,
  disabled = false,
  name,
}) => (
  <div>
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
        {options?.map(({ value, label }) => (
          <SelectItem key={crypto.randomUUID()} value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

);

export default InputSelect;
