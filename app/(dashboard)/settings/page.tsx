'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-mono mb-8">Settings</h1>
      <Tabs defaultValue="account">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="glass-card">
            <CardHeader><CardTitle>Account</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Display Name</Label><Input defaultValue="Alice Chen" className="bg-white/5 border-white/10 mt-1" /></div>
              <div><Label>Email</Label><Input defaultValue="alice@example.com" className="bg-white/5 border-white/10 mt-1" /></div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="editor">
          <Card className="glass-card">
            <CardHeader><CardTitle>Editor Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Default Language</Label><Input defaultValue="Python" className="bg-white/5 border-white/10 mt-1" /></div>
              <div><Label>Font Size</Label><Input defaultValue="14" type="number" className="bg-white/5 border-white/10 mt-1" /></div>
              <div className="flex items-center justify-between"><Label>Auto Save</Label><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="glass-card">
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between"><Label>Dark Mode</Label><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="glass-card">
            <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><Label>Contest Reminders</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Hackathon Updates</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Rating Changes</Label><Switch /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
