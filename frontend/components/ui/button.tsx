import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'champagne' | 'dark' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none active:scale-[0.99]';
    
    const variants = {
      // Carent Signature Yellow button
      champagne: 'bg-[#FEE123] text-black hover:bg-[#FDD835] active:bg-[#F5CB23] border border-transparent shadow-sm',
      yellow: 'bg-[#FEE123] text-black hover:bg-[#FDD835] active:bg-[#F5CB23] border border-transparent shadow-sm',
      // Pitch Dark button with white text
      primary: 'bg-[#121316] text-white hover:bg-black active:bg-black border border-transparent shadow-sm',
      // Translucent obsidian button with border
      dark: 'bg-[#141517] text-white hover:bg-black active:bg-[#0D0E10] border border-white/10 shadow-sm',
      // Light background button
      secondary: 'bg-[#F4F4F6] text-[#121316] hover:bg-[#EAEAEA] border border-[#E5E5E8]',
      // Pure hairline outline
      outline: 'bg-transparent text-foreground border border-[#D1D1D6] hover:border-black hover:bg-black/5',
      // Clean ghost
      ghost: 'bg-transparent text-foreground hover:bg-black/5 border-transparent',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-6 text-xs sm:text-sm',
      lg: 'h-12 px-8 text-sm sm:text-base py-3',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
