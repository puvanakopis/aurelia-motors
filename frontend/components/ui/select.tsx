import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, options, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[11px] font-medium uppercase tracking-tracked text-stone-600 dark:text-stone-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex h-11 w-full appearance-none bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3.5 py-2 pr-9 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
              error && 'border-red-500',
              className
            )}
            ref={ref}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 pointer-events-none text-stone-500" />
        </div>
        {error && <p className="text-[11px] text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
