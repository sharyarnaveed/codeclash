'use client';
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

export default function Settings() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold font-mono tracking-tight mb-8">Settings</h1>

      <Tabs defaultValue="editor" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-col w-full md:w-48 h-auto bg-transparent items-start space-y-2 p-0">
          <TabsTrigger value="account" className="w-full justify-start font-mono data-[state=active]:bg-card border border-transparent data-[state=active]:border-border/50 h-10">Account</TabsTrigger>
          <TabsTrigger value="editor" className="w-full justify-start font-mono data-[state=active]:bg-card border border-transparent data-[state=active]:border-border/50 h-10">Editor</TabsTrigger>
          <TabsTrigger value="appearance" className="w-full justify-start font-mono data-[state=active]:bg-card border border-transparent data-[state=active]:border-border/50 h-10">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start font-mono data-[state=active]:bg-card border border-transparent data-[state=active]:border-border/50 h-10">Notifications</TabsTrigger>
        </TabsList>

        <div className="flex-1 space-y-6">
          <TabsContent value="account" className="m-0 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono">Profile Information</CardTitle>
                <CardDescription>Update your account details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="alicec" className="font-mono bg-background/50" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Competitive programmer & open source contributor" className="bg-background/50" />
                </div>
                <Button className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-destructive/30">
              <CardHeader>
                <CardTitle className="font-mono text-destructive">Danger Zone</CardTitle>
                <CardDescription>Actions here are permanent or will end your session.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium font-mono">Sign out</p>
                    <p className="text-xs text-muted-foreground">You will be returned to the sign-in page.</p>
                  </div>
                  <Button
                    data-testid="button-logout"
                    variant="destructive"
                    size="sm"
                    className="gap-2 font-mono"
                    onClick={() => router.push("/get-started")}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="m-0 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono">Editor Preferences</CardTitle>
                <CardDescription>Customize your coding environment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Font Size</Label>
                    <span className="font-mono text-sm text-muted-foreground">14px</span>
                  </div>
                  <Slider defaultValue={[14]} max={24} min={10} step={1} />
                </div>
                
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <Select defaultValue="vs-dark">
                    <SelectTrigger className="bg-background/50 font-mono">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vs-dark">VS Dark</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                      <SelectItem value="github-dark">GitHub Dark</SelectItem>
                      <SelectItem value="dracula">Dracula</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vim Keybindings</Label>
                    <p className="text-sm text-muted-foreground">Enable Vim mode in the editor.</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Line Numbers</Label>
                    <p className="text-sm text-muted-foreground">Show line numbers in the gutter.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Button>Apply Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="m-0 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono">Theme</CardTitle>
                <CardDescription>CodeClash is always dark, but you can pick your accent color.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-xl bg-background border-2 border-emerald-500 flex items-center justify-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-24 rounded-xl bg-background border-2 border-transparent hover:border-blue-500/50 flex items-center justify-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-blue-500" />
                  </div>
                  <div className="h-24 rounded-xl bg-background border-2 border-transparent hover:border-purple-500/50 flex items-center justify-center cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="m-0 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="font-mono">Alerts</CardTitle>
                <CardDescription>Manage how we notify you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Match Invites</Label>
                    <p className="text-sm text-muted-foreground">When a friend challenges you.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rank Changes</Label>
                    <p className="text-sm text-muted-foreground">When your Elo rating updates.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}