import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Settings,
  ShoppingBag,
  DollarSign,
  Images,
  MessageSquare,
  FileText,
  LogOut,
  Megaphone,
} from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { content } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Services', value: content.services.length, icon: ShoppingBag },
    { label: 'Preiskategorien', value: content.prices.length, icon: DollarSign },
    { label: 'Galerie-Bilder', value: content.gallery.length, icon: Images },
    { label: 'Testimonials', value: content.testimonials.length, icon: MessageSquare },
    { label: 'Aktionen', value: content.promotions.length, icon: Megaphone },
  ];

  const quickLinks = [
    {
      title: 'Services',
      description: 'Behandlungen verwalten',
      icon: ShoppingBag,
      path: '/l-787/services',
    },
    {
      title: 'Preise',
      description: 'Preiskategorien & Details bearbeiten',
      icon: DollarSign,
      path: '/l-787/prices',
    },
    {
      title: 'Galerie',
      description: 'Bilder hochladen & verwalten',
      icon: Images,
      path: '/l-787/gallery',
    },
    {
      title: 'Testimonials',
      description: 'Kundenbewertungen verwalten',
      icon: MessageSquare,
      path: '/l-787/testimonials',
    },
    {
      title: 'Aktionen',
      description: 'Sonderangebote & Aktionen verwalten',
      icon: Megaphone,
      path: '/l-787/promotions',
    },
    {
      title: 'Einstellungen',
      description: 'Site-Einstellungen, Kontakt, Öffnungszeiten',
      icon: Settings,
      path: '/l-787/settings',
    },
    {
      title: 'Datenmigration',
      description: 'Daten nach Supabase übertragen',
      icon: FileText,
      path: '/l-787/migration',
      badge: 'Einmalig',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold mb-2">
            Willkommen im Admin-Bereich
          </h2>
          <p className="text-muted-foreground">
            Verwalten Sie hier alle Inhalte Ihrer Website
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <h3 className="font-serif text-2xl font-bold mb-4">Schnellzugriff</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <Card className="hover-lift h-full cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {link.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">💡 Tipp</h4>
            <p className="text-sm text-muted-foreground">
              Nach jeder Änderung können Sie die aktualisierte content.json-Datei
              exportieren und sichern, um die Änderungen dauerhaft zu speichern.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
