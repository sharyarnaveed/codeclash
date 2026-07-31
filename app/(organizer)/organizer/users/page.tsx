'use client';

import { useMemo, useState } from 'react';
import { MOCK_USERS } from '@/lib/mock/users';
import type { User, UserRole } from '@/lib/types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { UserDetailDialog } from '@/components/organizer/user-detail-dialog';
import { ConfirmDialog } from '@/components/organizer/confirm-dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const ROLE_TABS = [
  { value: 'participants', label: 'Participants', role: 'participant' as UserRole },
  { value: 'judge', label: 'Judges', role: 'judge' as UserRole },
  { value: 'mentor', label: 'Mentors', role: 'mentor' as UserRole },
  { value: 'organizer', label: 'Organizers', role: 'organizer' as UserRole },
];

export default function OrganizerUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('participants');
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    () => Object.fromEntries(MOCK_USERS.map((u) => [u.id, true]))
  );

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<UserRole>('participant');
  const [editActive, setEditActive] = useState(true);

  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [deactivateUserId, setDeactivateUserId] = useState<string | null>(null);

  const roleFilter = ROLE_TABS.find((t) => t.value === activeTab)?.role ?? 'participant';

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = u.role === roleFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, search]);

  const openUserDetail = (user: User) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditActive(activeStates[user.id] ?? true);
    setDetailOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, role: editRole } : u))
    );
    setActiveStates((prev) => ({ ...prev, [selectedUser.id]: editActive }));
    toast.success('User updated', { description: `@${selectedUser.username}` });
    setDetailOpen(false);
  };

  const handleToggleActive = (userId: string, checked: boolean) => {
    if (!checked) {
      setDeactivateUserId(userId);
      setDeactivateOpen(true);
    } else {
      setActiveStates((prev) => ({ ...prev, [userId]: true }));
      const user = users.find((u) => u.id === userId);
      toast.success('User activated', { description: user ? `@${user.username}` : undefined });
    }
  };

  const confirmDeactivate = () => {
    if (deactivateUserId) {
      setActiveStates((prev) => ({ ...prev, [deactivateUserId]: false }));
      const user = users.find((u) => u.id === deactivateUserId);
      toast.success('User deactivated', { description: user ? `@${user.username}` : undefined });
    }
    setDeactivateOpen(false);
    setDeactivateUserId(null);
  };

  const renderUserTable = () => (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((u) => (
              <TableRow key={u.id} className="border-white/10 hover:bg-white/5">
                <TableCell>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">@{u.username}</p>
                </TableCell>
                <TableCell>{u.country}</TableCell>
                <TableCell className="font-mono text-lime">
                  {u.role === 'participant' ? u.rating : '—'}
                </TableCell>
                <TableCell><Badge variant="outline" className="capitalize">{u.role}</Badge></TableCell>
                <TableCell>
                  <Switch
                    checked={activeStates[u.id] ?? true}
                    onCheckedChange={(checked) => handleToggleActive(u.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="h-7" onClick={() => openUserDetail(u)}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-mono">User Management</h1>
        <Button variant="outline" onClick={() => toast.info('Invite flow coming soon')}>
          <Plus className="h-4 w-4 mr-1" /> Invite User
        </Button>
      </div>

      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm bg-white/5 border-white/10 mb-6"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          {ROLE_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ROLE_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {renderUserTable()}
          </TabsContent>
        ))}
      </Tabs>

      <UserDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        user={selectedUser ? { ...selectedUser, role: editRole } : null}
        active={editActive}
        onActiveChange={setEditActive}
        onRoleChange={setEditRole}
        onSave={handleSaveUser}
      />

      <ConfirmDialog
        open={deactivateOpen}
        onOpenChange={setDeactivateOpen}
        title="Deactivate User"
        description="This user will lose access to the platform. You can reactivate them later."
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={confirmDeactivate}
      />
    </div>
  );
}
