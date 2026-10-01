import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'dark';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-900 border border-stone-200',
    secondary: 'bg-[#EAE5DD] text-[#111215] border border-transparent',
    outline: 'border border-border text-foreground bg-transparent',
    success: 'bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
    dark: 'bg-obsidian text-white border border-neutral-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-tracked transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
