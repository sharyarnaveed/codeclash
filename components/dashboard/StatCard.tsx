import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: { value: number; label: string; positive: boolean };
  variant?: 'default' | 'lime' | 'violet';
}

export function StatCard({ title, value, description, icon, trend, variant = 'default' }: StatCardProps) {
  return (
    <Card className={cn(
      'glass-card hover:border-white/15 transition-all duration-300',
      variant === 'lime' && 'border-lime/20',
      variant === 'violet' && 'border-primary/20',
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className="text-xs mt-2 flex items-center gap-1">
            <span className={trend.positive ? 'text-lime' : 'text-destructive'}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
