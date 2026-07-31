'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { User, UserRole } from '@/lib/types/user';

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  active: boolean;
  onActiveChange: (active: boolean) => void;
  onRoleChange: (role: UserRole) => void;
  onSave: () => void;
}

export function UserDetailDialog({
  open,
  onOpenChange,
  user,
  active,
  onActiveChange,
  onRoleChange,
  onSave,
}: UserDetailDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>@{user.username} · {user.email}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Country</p>
              <p>{user.country}</p>
            </div>
            {user.university && (
              <div>
                <p className="text-muted-foreground">University</p>
                <p>{user.university}</p>
              </div>
            )}
            {user.role === 'participant' && (
              <div>
                <p className="text-muted-foreground">Rating</p>
                <p className="font-mono text-lime">{user.rating}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Current Role</p>
              <Badge variant="outline" className="capitalize mt-1">{user.role}</Badge>
            </div>
          </div>
          {user.bio && <p className="text-sm text-muted-foreground">{user.bio}</p>}
          <div>
            <Label>Change Role</Label>
            <Select value={user.role} onValueChange={(v) => onRoleChange(v as UserRole)}>
              <SelectTrigger className="bg-white/5 border-white/10 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="participant">Participant</SelectItem>
                <SelectItem value="judge">Judge</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="organizer">Organizer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div>
              <p className="text-sm font-medium">Account Active</p>
              <p className="text-xs text-muted-foreground">Disable to suspend access</p>
            </div>
            <Switch checked={active} onCheckedChange={onActiveChange} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
