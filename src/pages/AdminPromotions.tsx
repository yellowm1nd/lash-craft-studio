import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { promotionsAPI, uploadAPI } from '@/lib/supabase-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, Save, LogOut, Loader2, AlertCircle, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image_url: string;
  active: boolean;
  order: number;
}

const MAX_PROMOTIONS = 3;

const AdminPromotions = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Promotion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
      return;
    }
    loadPromotions();
  }, [isAuthenticated, navigate]);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      const data = await promotionsAPI.getAllAdmin();
      setPromotions(data || []);
    } catch (error: any) {
      console.error('Error loading promotions:', error);

      // Check if it's a database table error
      if (error?.message?.includes('relation "promotions" does not exist')) {
        toast.error(
          'Datenbank-Tabelle fehlt! Bitte führen Sie das SQL-Schema in Supabase aus.',
          { duration: 10000 }
        );
      } else {
        toast.error(`Fehler beim Laden der Aktionen: ${error?.message || 'Unbekannter Fehler'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    if (promotions.length >= MAX_PROMOTIONS) {
      toast.error(`Maximum ${MAX_PROMOTIONS} Aktionen erreicht`);
      return;
    }

    setEditingItem({
      id: '',
      title: '',
      description: '',
      image_url: '',
      active: true,
      order: promotions.length + 1,
    });
    setDialogOpen(true);
  };

  const handleEdit = (item: Promotion) => {
    setEditingItem({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.image_url || !editingItem.title || !editingItem.description) {
      toast.error('Bitte Bild, Titel und Beschreibung angeben');
      return;
    }

    try {
      if (editingItem.id) {
        // Update existing
        await promotionsAPI.update(editingItem.id, {
          title: editingItem.title,
          description: editingItem.description,
          image_url: editingItem.image_url,
          active: editingItem.active,
          order: editingItem.order,
        });
        toast.success('Aktion aktualisiert!');
      } else {
        // Create new - check limit
        if (promotions.length >= MAX_PROMOTIONS) {
          toast.error(`Maximum ${MAX_PROMOTIONS} Aktionen erreicht`);
          return;
        }

        await promotionsAPI.create({
          title: editingItem.title,
          description: editingItem.description,
          image_url: editingItem.image_url,
          active: editingItem.active,
          order: editingItem.order,
        });
        toast.success('Aktion hinzugefügt!');
      }
      setDialogOpen(false);
      setEditingItem(null);
      loadPromotions();
    } catch (error: any) {
      console.error('Error saving:', error);

      // Better error messages
      if (error?.message?.includes('relation "promotions" does not exist')) {
        toast.error(
          'Datenbank-Tabelle fehlt! Bitte führen Sie das SQL-Schema in Supabase aus.',
          { duration: 10000 }
        );
      } else if (error?.message?.includes('JWT')) {
        toast.error('Sitzung abgelaufen. Bitte melden Sie sich erneut an.');
      } else {
        toast.error(`Fehler beim Speichern: ${error?.message || 'Unbekannter Fehler'}`);
      }
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Aktion wirklich löschen?')) return;

    try {
      // Delete from database
      await promotionsAPI.delete(id);

      // Delete from storage
      try {
        await uploadAPI.deleteImage(imageUrl);
      } catch (error) {
        console.warn('Could not delete image from storage:', error);
      }

      toast.success('Aktion gelöscht!');
      loadPromotions();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  if (!isAuthenticated) return null;

  const activePromotions = promotions.filter(p => p.active).length;

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
            <div>
              <h1 className="font-serif text-2xl font-bold">Aktionen verwalten</h1>
              <p className="text-sm text-muted-foreground">
                {promotions.length} / {MAX_PROMOTIONS} Aktionen · {activePromotions} aktiv
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleNew}
              size="sm"
              disabled={promotions.length >= MAX_PROMOTIONS}
            >
              <Plus className="mr-2 h-4 w-4" />
              Neue Aktion
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {promotions.length >= MAX_PROMOTIONS && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Maximum erreicht:</strong> Sie können maximal {MAX_PROMOTIONS} Aktionen erstellen.
              Löschen Sie eine bestehende Aktion, um eine neue zu erstellen.
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : promotions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Megaphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Noch keine Aktionen erstellt
              </p>
              <Button onClick={handleNew}>
                <Plus className="mr-2 h-4 w-4" />
                Erste Aktion erstellen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {promotions.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-lift">
                <div className="grid md:grid-cols-5 gap-4">
                  {/* Image */}
                  <div className="md:col-span-2 min-h-[200px] max-h-[300px] relative group bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                    {!item.active && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold">Inaktiv</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="secondary"
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id, item.image_url)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Reihenfolge: {item.order}</span>
                      <span className="flex items-center gap-2">
                        Status:
                        <span className={item.active ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                          {item.active ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? 'Aktion bearbeiten' : 'Neue Aktion'}
            </DialogTitle>
            <DialogDescription>
              Erstellen Sie eine Aktion mit Bild und Text. Maximum {MAX_PROMOTIONS} Aktionen.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Image */}
                <div>
                  <ImageUpload
                    currentImage={editingItem.image_url}
                    onUploadComplete={(url) =>
                      setEditingItem({ ...editingItem, image_url: url })
                    }
                    onRemove={() => setEditingItem({ ...editingItem, image_url: '' })}
                    folder="promotions"
                    label="Bild (Alle Formate unterstützt)"
                    aspectRatio="aspect-auto"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Hochformat, Querformat oder Quadrat - alle Bildformate werden automatisch angepasst
                  </p>
                </div>

                {/* Right: Content */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titel*</Label>
                    <Input
                      id="title"
                      value={editingItem.title}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, title: e.target.value })
                      }
                      placeholder="z.B. Sommer-Special: 20% Rabatt"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Beschreibung*</Label>
                    <Textarea
                      id="description"
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, description: e.target.value })
                      }
                      placeholder="Beschreiben Sie Ihre Aktion..."
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 px-4 bg-muted rounded-lg">
                    <div className="flex flex-col">
                      <Label htmlFor="active">Aktion aktiv</Label>
                      <span className="text-xs text-muted-foreground">
                        Nur aktive Aktionen werden auf der Startseite angezeigt
                      </span>
                    </div>
                    <Switch
                      id="active"
                      checked={editingItem.active}
                      onCheckedChange={(checked) =>
                        setEditingItem({ ...editingItem, active: checked })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="order">Reihenfolge</Label>
                    <Input
                      id="order"
                      type="number"
                      value={editingItem.order}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          order: parseInt(e.target.value) || 1,
                        })
                      }
                      min={1}
                      max={MAX_PROMOTIONS}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full" size="lg">
                <Save className="mr-2 h-4 w-4" />
                Speichern
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromotions;
