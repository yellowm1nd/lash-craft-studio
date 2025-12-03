import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { galleryAPI, uploadAPI } from '@/lib/supabase-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { ArrowLeft, Plus, Edit, Trash2, Save, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
  order: number;
}

const AdminGallery = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
      return;
    }
    loadGallery();
  }, [isAuthenticated, navigate]);

  const loadGallery = async () => {
    try {
      setLoading(true);
      const data = await galleryAPI.getAll();
      setGallery(data || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
      toast.error('Fehler beim Laden der Galerie');
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setEditingItem({
      id: '',
      image_url: '',
      title: '',
      description: null,
      order: gallery.length + 1,
    });
    setDialogOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem || !editingItem.image_url || !editingItem.title) {
      toast.error('Bitte Bild und Titel angeben');
      return;
    }

    try {
      if (editingItem.id) {
        // Update existing
        await galleryAPI.update(editingItem.id, {
          image_url: editingItem.image_url,
          title: editingItem.title,
          description: editingItem.description,
          order: editingItem.order,
        });
        toast.success('Bild aktualisiert!');
      } else {
        // Create new
        await galleryAPI.create({
          image_url: editingItem.image_url,
          title: editingItem.title,
          description: editingItem.description || undefined,
          order: editingItem.order,
        });
        toast.success('Bild hinzugefügt!');
      }
      setDialogOpen(false);
      setEditingItem(null);
      loadGallery();
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Bild wirklich löschen?')) return;

    try {
      // Delete from database
      await galleryAPI.delete(id);

      // Delete from storage
      try {
        await uploadAPI.deleteImage(imageUrl);
      } catch (error) {
        console.warn('Could not delete image from storage:', error);
      }

      toast.success('Bild gelöscht!');
      loadGallery();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Fehler beim Löschen');
    }
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
            <h1 className="font-serif text-2xl font-bold">Galerie verwalten</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNew} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Neues Bild
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : gallery.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Noch keine Bilder in der Galerie
              </p>
              <Button onClick={handleNew}>
                <Plus className="mr-2 h-4 w-4" />
                Erstes Bild hochladen
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gallery.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-lift">
                <div className="aspect-square relative group">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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
                <CardContent className="pt-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {item.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? 'Bild bearbeiten' : 'Neues Bild'}
            </DialogTitle>
            <DialogDescription>
              Bild hochladen und Details eingeben
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <ImageUpload
                currentImage={editingItem.image_url}
                onUploadComplete={(url) =>
                  setEditingItem({ ...editingItem, image_url: url })
                }
                onRemove={() => setEditingItem({ ...editingItem, image_url: '' })}
                folder="gallery"
                label="Bild"
                aspectRatio="aspect-square"
              />
              <div>
                <label className="block text-sm font-medium mb-2">Titel*</label>
                <Input
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="z.B. Classic Lashes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Beschreibung (optional)
                </label>
                <Input
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Kurze Beschreibung..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reihenfolge</label>
                <Input
                  type="number"
                  value={editingItem.order}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  min={1}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
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

export default AdminGallery;
