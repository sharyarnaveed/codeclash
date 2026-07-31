'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ConfirmDialog } from '@/components/organizer/confirm-dialog';
import { ApiKeyDialog } from '@/components/organizer/api-key-dialog';
import { toast } from 'sonner';

interface ApiKey {
  id: string;
  masked: string;
  name: string;
  createdAt: string;
}

export default function OrganizerSettingsPage() {
  const [orgName, setOrgName] = useState('CodeClash');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#7D39EB');
  const [regTemplate, setRegTemplate] = useState('Welcome to {{event_name}}! Your registration is confirmed.');
  const [reminderTemplate, setReminderTemplate] = useState('{{contest_name}} starts in 1 hour. Good luck!');

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 'k1', masked: 'cc_live_••••••••••••4f2a', name: 'Production', createdAt: 'Aug 1, 2026' },
  ]);

  const [revokeOpen, setRevokeOpen] = useState(false);
  const [revokeKeyId, setRevokeKeyId] = useState<string | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);

  const handleSaveBranding = () => {
    toast.success('Branding saved', { description: orgName });
  };

  const handleSaveTemplates = () => {
    toast.success('Email templates saved');
  };

  const openRevoke = (keyId: string) => {
    setRevokeKeyId(keyId);
    setRevokeOpen(true);
  };

  const confirmRevoke = () => {
    if (revokeKeyId) {
      setApiKeys((prev) => prev.filter((k) => k.id !== revokeKeyId));
      toast.success('API key revoked');
    }
    setRevokeOpen(false);
    setRevokeKeyId(null);
  };

  const handleGenerateKey = (name: string) => {
    const suffix = Math.random().toString(36).slice(2, 6);
    const fullKey = `cc_live_${Math.random().toString(36).slice(2, 18)}${suffix}`;
    const masked = `cc_live_••••••••••••${suffix}`;
    setApiKeys((prev) => [
      ...prev,
      { id: `k${Date.now()}`, masked, name, createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    ]);
    toast.success('API key generated', { description: name });
    return fullKey;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold font-mono mb-6">Organizer Settings</h1>

      <Tabs defaultValue="branding">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <Card className="glass-card">
            <CardHeader><CardTitle>Brand Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Organization Name</Label>
                <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="bg-white/5 border-white/10 mt-1" />
              </div>
              <div>
                <Label>Logo URL</Label>
                <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="bg-white/5 border-white/10 mt-1" />
              </div>
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="bg-white/5 border-white/10 flex-1" />
                  <div className="h-10 w-10 rounded-lg border border-white/10 shrink-0" style={{ backgroundColor: primaryColor }} />
                </div>
              </div>
              <Button onClick={handleSaveBranding}>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails">
          <Card className="glass-card">
            <CardHeader><CardTitle>Email Templates</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Registration Confirmation</Label>
                <Textarea value={regTemplate} onChange={(e) => setRegTemplate(e.target.value)} className="bg-white/5 border-white/10 mt-1" rows={3} />
              </div>
              <div>
                <Label>Contest Reminder</Label>
                <Textarea value={reminderTemplate} onChange={(e) => setReminderTemplate(e.target.value)} className="bg-white/5 border-white/10 mt-1" rows={3} />
              </div>
              <Button onClick={handleSaveTemplates}>Save Templates</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="glass-card">
            <CardHeader><CardTitle>API Keys</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {apiKeys.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No API keys. Generate one to get started.</p>
              ) : (
                apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-sm font-medium">{key.name}</p>
                      <p className="text-sm font-mono">{key.masked}</p>
                      <p className="text-xs text-muted-foreground">Created {key.createdAt}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => openRevoke(key.id)}>Revoke</Button>
                  </div>
                ))
              )}
              <Button onClick={() => setGenerateOpen(true)}>Generate New Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={revokeOpen}
        onOpenChange={setRevokeOpen}
        title="Revoke API Key"
        description="This key will immediately stop working. Any integrations using it will break."
        confirmLabel="Revoke Key"
        variant="destructive"
        onConfirm={confirmRevoke}
      />

      <ApiKeyDialog
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        onGenerate={handleGenerateKey}
      />
    </div>
  );
}
