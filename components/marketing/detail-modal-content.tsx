import * as React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function DetailModalContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        '!flex max-h-[min(calc(100dvh-2rem),900px)] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden',
        'top-4 translate-x-[-50%] translate-y-0',
        'sm:top-[50%] sm:-translate-y-1/2',
        'border-border bg-background/95 p-0 text-foreground backdrop-blur-xl sm:w-full',
        className,
      )}
      {...props}
    >
      {children}
    </DialogContent>
  );
}

export function DetailModalBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain', className)} {...props}>
      {children}
    </div>
  );
}

export function DetailModalInner({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-5 p-6', className)} {...props}>
      {children}
    </div>
  );
}
