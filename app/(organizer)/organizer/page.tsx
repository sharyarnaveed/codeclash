'use client';

import { useState } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { MOCK_ORGANIZER_STATS, MOCK_ACTIVITY_TIMELINE, MOCK_RECENT_REGISTRATIONS, MOCK_NOTIFICATIONS } from '@/lib/mock/organizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Users, Code2, DollarSign, Trophy, Rocket, Activity, Bell, ExternalLink } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollReveal } from '@/components/shared/motion';
import { toast } from 'sonner';

export default function OrganizerOverviewPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<(typeof MOCK_NOTIFICATIONS)[number] | null>(null);
  const [regOpen, setRegOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<(typeof MOCK_RECENT_REGISTRATIONS)[number] | null>(null);

  const openNotification = (n: (typeof MOCK_NOTIFICATIONS)[number]) => {
    setSelectedNotif(n);
    setNotifOpen(true);
    if (!n.read) {
      setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)));
    }
  };

  const openRegistration = (r: (typeof MOCK_RECENT_REGISTRATIONS)[number]) => {
    setSelectedReg(r);
    setRegOpen(true);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-mono">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your contests and hackathons.</p>
          </div>
          {unreadCount > 0 && (
            <Badge className="badge-lime">{unreadCount} unread</Badge>
          )}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={MOCK_ORGANIZER_STATS.totalEvents} icon={<Calendar className="h-4 w-4" />} variant="violet" />
        <StatCard title="Active Participants" value={MOCK_ORGANIZER_STATS.activeParticipants.toLocaleString()} icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Teams" value={MOCK_ORGANIZER_STATS.totalTeams} icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Problems" value={MOCK_ORGANIZER_STATS.totalProblems} icon={<Code2 className="h-4 w-4" />} />
        <StatCard title="Registrations" value={MOCK_ORGANIZER_STATS.registrations.toLocaleString()} icon={<Activity className="h-4 w-4" />} trend={{ value: 8, label: 'this week', positive: true }} variant="lime" />
        <StatCard title="Revenue" value={MOCK_ORGANIZER_STATS.revenue} icon={<DollarSign className="h-4 w-4" />} description="Placeholder" />
        <StatCard title="Live Contests" value={MOCK_ORGANIZER_STATS.liveContests} icon={<Trophy className="h-4 w-4" />} variant="lime" />
        <StatCard title="Live Hackathons" value={MOCK_ORGANIZER_STATS.liveHackathons} icon={<Rocket className="h-4 w-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader><CardTitle>Activity Timeline</CardTitle></CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ACTIVITY_TIMELINE}>
                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="registrations" stroke="hsl(262 83% 58%)" fill="hsl(262 83% 58% / 0.1)" />
                <Area type="monotone" dataKey="submissions" stroke="hsl(72 100% 60%)" fill="hsl(72 100% 60% / 0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
              {unreadCount > 0 && <Badge variant="secondary" className="text-xs">{unreadCount}</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => openNotification(n)}
                className={`w-full text-left p-3 rounded-xl text-sm transition-colors hover:bg-white/10 ${
                  n.read ? 'bg-white/[0.02]' : 'bg-primary/5 border border-primary/10'
                }`}
              >
                <p>{n.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle>Recent Registrations</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {MOCK_RECENT_REGISTRATIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => openRegistration(r)}
                className="w-full flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-lg px-2 transition-colors text-left"
              >
                <div>
                  <span className="font-mono text-sm">@{r.user}</span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <span className="text-sm">{r.event}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">{r.type}</Badge>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={notifOpen} onOpenChange={setNotifOpen}>
        <DialogContent className="glass-card border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notification</DialogTitle>
            <DialogDescription>{selectedNotif?.time}</DialogDescription>
          </DialogHeader>
          <p className="text-sm">{selectedNotif?.title}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotifOpen(false)}>Dismiss</Button>
            <Button onClick={() => {
              toast.info('Opening related event...');
              setNotifOpen(false);
            }}>
              <ExternalLink className="h-3 w-3 mr-1" /> View Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={regOpen} onOpenChange={setRegOpen}>
        <DialogContent className="glass-card border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>Recent registration activity</DialogDescription>
          </DialogHeader>
          {selectedReg && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">User</span>
                <span className="font-mono">@{selectedReg.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event</span>
                <span>{selectedReg.event}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline" className="capitalize">{selectedReg.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered</span>
                <span>{selectedReg.time}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegOpen(false)}>Close</Button>
            <Button onClick={() => {
              toast.success('Registration approved');
              setRegOpen(false);
            }}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
