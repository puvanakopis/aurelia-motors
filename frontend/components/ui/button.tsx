import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'champagne' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 uppercase tracking-tracked text-xs disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';
    
    const variants = {
      // Light ivory / cream button matching hero "EXPLORE VEHICLES →"
      champagne: 'bg-[#EAE5DD] text-[#111215] hover:bg-[#F3EFE9] active:bg-[#DFD9CE] border border-transparent shadow-sm',
      // Pitch obsidian button with light text
      primary: 'bg-[#111215] text-[#FAF8F5] hover:bg-[#22242A] active:bg-black border border-transparent',
      // Translucent obsidian button with hairline border matching hero "BOOK A TEST DRIVE ↘"
      dark: 'bg-[#121316]/80 text-[#FAF8F5] hover:bg-[#1E2026] active:bg-[#0D0E10] border border-neutral-700 backdrop-blur-sm',
      // Light background button
      secondary: 'bg-[#F2EFEB] text-[#111215] hover:bg-[#E8E4DC] border border-[#E5E2DC]',
      // Pure hairline outline
      outline: 'bg-transparent text-foreground border border-current hover:bg-foreground/5',
      // Clean ghost
      ghost: 'bg-transparent text-foreground hover:bg-foreground/5 border-transparent',
    };

    const sizes = {
      sm: 'h-9 px-4 text-[11px] tracking-[0.16em]',
      md: 'h-11 px-6 text-xs tracking-[0.18em]',
      lg: 'h-13 px-8 text-[13px] tracking-[0.2em] py-3.5',
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
            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
