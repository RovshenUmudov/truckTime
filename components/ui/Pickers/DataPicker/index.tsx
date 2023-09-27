'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { clsx } from 'clsx';
import { Label } from '@/components/ui/label';

interface IDatePicker {
    name: string;
    placeholder?: string;
    onChange: (payload: Date | undefined) => void;
    error?: string | null;
    value: Date | undefined;
    fromDate?: Date | undefined;
    label?: string;
    disabled?: boolean;
    onBlur: (e: { target: { name: string; }; }) => void;
}

const DatePicker: FC<IDatePicker> = ({
  name,
  value,
  onChange,
  label,
  placeholder = 'Pick a date',
  disabled = false,
  error,
  fromDate,
  onBlur,
}) => (
  <div>
    <Popover>
      <Label>{label}</Label>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={clsx(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          fromDate={fromDate}
          onDayBlur={() => onBlur({ target: { name } })}
        />
      </PopoverContent>
    </Popover>
    {error?.length ? <div className="text-error text-sm mt-1">{error}</div> : null}
  </div>
);

export default DatePicker;
