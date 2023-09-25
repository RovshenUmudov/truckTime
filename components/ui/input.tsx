import React from 'react';
import { Label } from '@/components/ui/label';
import { clsx } from 'clsx';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // eslint-disable-next-line react/require-default-props
    error?: string | null;
    // eslint-disable-next-line react/require-default-props
    label?: string;
    // eslint-disable-next-line react/require-default-props
    icon?: React.ReactNode;
    // eslint-disable-next-line react/require-default-props
    helper?: string | React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      type,
      error = null,
      label,
      name,
      icon,
      helper,
      prefix,
      ...props },
    ref,
  ) => (
    <div>
      {label ? (
        <Label htmlFor={name}>
          {label}
        </Label>
      ) : null}
      <div className="relative">
        <input
          type={type}
          name={name}
          className={clsx(
            'flex h-10 w-full text-left rounded-md border border-input bg-background px-3 py-2 select-none '
          + 'text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium '
          + 'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
          + 'focus-visible:ring-offset-0 disabled:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 ',
            className,
          )}
          ref={ref}
          {...props}
        />
        {prefix || icon ? (
          <div className="absolute right-3 h-full flex top-0 items-center text-placeholder gap-2 max-w-[50px]">
            {prefix ? <div className="text-[13px]">{prefix}</div> : null}
            {icon || null}
          </div>
        ) : null}
      </div>
      {helper ? <div className="ml-1 mt-1 text-placeholder font-light text-xs">{helper}</div> : null}
      {error?.length ? <div className="text-error text-sm mt-1">{error}</div> : null}
    </div>

  ),
);

Input.displayName = 'Input';

export { Input };
