import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: { value: number; label: string; positive: boolean };
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/20 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className="text-xs mt-2 flex items-center gap-1">
            <span className={trend.positive ? "text-primary" : "text-destructive"}>
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
