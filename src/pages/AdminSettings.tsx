import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { settingsAPI } from '@/lib/supabase-api';

const AdminSettings = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { content, updateContent } = useContent();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(content.siteSettings);
  const [openingHours, setOpeningHours] = useState(content.openingHours);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
    }
  }, [isAuthenticated, navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update localStorage first for immediate feedback
      updateContent({
        ...content,
        siteSettings: settings,
        openingHours: openingHours,
      });

      // Save to Supabase for persistence
      await settingsAPI.upsert('siteSettings', settings);
      await settingsAPI.upsert('openingHours', openingHours);

      toast.success('Einstellungen erfolgreich gespeichert!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Fehler beim Speichern der Einstellungen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    link.click();
    toast.success('JSON-Datei wurde heruntergeladen!');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/l-787/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <h1 className="font-serif text-2xl font-bold">Einstellungen</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleExportJSON} variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              JSON exportieren
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Allgemein</TabsTrigger>
            <TabsTrigger value="contact">Kontakt</TabsTrigger>
            <TabsTrigger value="hours">Öffnungszeiten</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Allgemeine Einstellungen</CardTitle>
                <CardDescription>
                  Booking-URL und Markenfarben
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Booking-URL (Treatwell)
                  </label>
                  <Input
                    type="url"
                    value={settings.bookingUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, bookingUrl: e.target.value })
                    }
                    placeholder="https://www.treatwell.at/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo-URL (optional)
                  </label>
                  <Input
                    type="url"
                    value={settings.logoUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, logoUrl: e.target.value })
                    }
                    placeholder="https://res.cloudinary.com/.../logo.png"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leer lassen für Text-Logo
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktinformationen</CardTitle>
                <CardDescription>
                  Telefon, E-Mail und Adresse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <Input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    placeholder="+43 123 456 7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-Mail
                  </label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    placeholder="info@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Adresse
                  </label>
                  <Textarea
                    value={settings.address}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    placeholder="Straße Hausnummer\nPLZ Ort, Land"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Öffnungszeiten</CardTitle>
                <CardDescription>
                  Öffnungszeiten für jeden Wochentag
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {openingHours.map((hour, index) => (
                    <div key={hour.day} className="grid grid-cols-4 gap-4 items-center">
                      <div className="font-medium">{hour.day}</div>
                      <Input
                        type="time"
                        value={hour.open}
                        onChange={(e) => {
                          const newHours = [...openingHours];
                          newHours[index].open = e.target.value;
                          setOpeningHours(newHours);
                        }}
                        disabled={hour.closed}
                      />
                      <Input
                        type="time"
                        value={hour.close}
                        onChange={(e) => {
                          const newHours = [...openingHours];
                          newHours[index].close = e.target.value;
                          setOpeningHours(newHours);
                        }}
                        disabled={hour.closed}
                      />
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`closed-${index}`}
                          checked={hour.closed}
                          onCheckedChange={(checked) => {
                            const newHours = [...openingHours];
                            newHours[index].closed = checked as boolean;
                            setOpeningHours(newHours);
                          }}
                        />
                        <label htmlFor={`closed-${index}`} className="text-sm">
                          Geschlossen
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Links zu Ihren Social-Media-Profilen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Instagram-URL
                  </label>
                  <Input
                    type="url"
                    value={settings.instagram}
                    onChange={(e) =>
                      setSettings({ ...settings, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/lashesbydanesh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Facebook-URL
                  </label>
                  <Input
                    type="url"
                    value={settings.facebook}
                    onChange={(e) =>
                      setSettings({ ...settings, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/lashesbydanesh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    TikTok-URL
                  </label>
                  <Input
                    type="url"
                    value={settings.tiktok}
                    onChange={(e) =>
                      setSettings({ ...settings, tiktok: e.target.value })
                    }
                    placeholder="https://tiktok.com/@lashesbydanesh"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSave} size="lg" disabled={isSaving}>
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? 'Wird gespeichert...' : 'Alle Änderungen speichern'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
