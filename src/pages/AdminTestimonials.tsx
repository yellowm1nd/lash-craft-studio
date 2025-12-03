import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useContent, type Testimonial } from '@/contexts/ContentContext';
import { testimonialsAPI } from '@/lib/supabase-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Save, LogOut, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

const AdminTestimonials = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { refreshContent } = useContent();
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
    } else {
      loadTestimonials();
    }
  }, [isAuthenticated, navigate]);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await testimonialsAPI.getAll();
      if (data) {
        const mappedTestimonials: Testimonial[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          text: item.text,
          stars: item.rating,
          imageUrl: item.image_url || '',
        }));
        setTestimonials(mappedTestimonials);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast.error('Fehler beim Laden der Testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Testimonial wirklich löschen?')) return;

    try {
      setIsSaving(true);
      await testimonialsAPI.delete(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
      await refreshContent(); // Refresh frontend content
      toast.success('Testimonial gelöscht!');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Fehler beim Löschen des Testimonials');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTestimonial = async () => {
    if (!editingTestimonial) return;

    // Validation
    if (!editingTestimonial.name.trim()) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }
    if (!editingTestimonial.text.trim()) {
      toast.error('Bitte geben Sie einen Text ein');
      return;
    }
    if (editingTestimonial.stars < 1 || editingTestimonial.stars > 5) {
      toast.error('Bitte wählen Sie 1-5 Sterne');
      return;
    }

    try {
      setIsSaving(true);
      const testimonialData = {
        name: editingTestimonial.name.trim(),
        text: editingTestimonial.text.trim(),
        rating: editingTestimonial.stars,
        image_url: editingTestimonial.imageUrl?.trim() || null,
      };

      const existingTestimonial = testimonials.find((t) => t.id === editingTestimonial.id);

      if (existingTestimonial) {
        // Update existing testimonial in Supabase
        await testimonialsAPI.update(editingTestimonial.id, testimonialData);
        setTestimonials(
          testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t))
        );
        toast.success('Testimonial aktualisiert!');
      } else {
        // Create new testimonial in Supabase
        const newTestimonial = await testimonialsAPI.create(testimonialData);
        setTestimonials([
          {
            id: newTestimonial.id,
            name: newTestimonial.name,
            text: newTestimonial.text,
            stars: newTestimonial.rating,
            imageUrl: newTestimonial.image_url || '',
          },
          ...testimonials,
        ]);
        toast.success('Testimonial erstellt!');
      }

      await refreshContent(); // Refresh frontend content
      setDialogOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Fehler beim Speichern des Testimonials');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    setEditingTestimonial({
      id: `testimonial-${Date.now()}`,
      name: '',
      text: '',
      stars: 5,
      imageUrl: '',
    });
    setDialogOpen(true);
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
            <h1 className="font-serif text-2xl font-bold">Testimonials verwalten</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNew} size="sm" disabled={isSaving || isLoading}>
              <Plus className="mr-2 h-4 w-4" />
              Neues Testimonial
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Testimonials werden geladen...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Noch keine Testimonials vorhanden
                </p>
                <Button onClick={handleNew} size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Erstes Testimonial erstellen
                </Button>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{testimonial.name}</CardTitle>
                          <div className="flex">
                            {Array.from({ length: testimonial.stars }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(testimonial)}
                          variant="outline"
                          size="sm"
                          disabled={isSaving}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(testimonial.id)}
                          variant="outline"
                          size="sm"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {testimonials.find((t) => t.id === editingTestimonial?.id)
                ? 'Testimonial bearbeiten'
                : 'Neues Testimonial'}
            </DialogTitle>
            <DialogDescription>
              Füllen Sie alle Felder aus und speichern Sie
            </DialogDescription>
          </DialogHeader>
          {editingTestimonial && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  value={editingTestimonial.name}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                  }
                  placeholder="z.B. Sarah M."
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bewertung <span className="text-destructive">*</span>
                </label>
                <Select
                  value={editingTestimonial.stars.toString()}
                  onValueChange={(value) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      stars: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sterne auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">⭐ 1 Stern</SelectItem>
                    <SelectItem value="2">⭐⭐ 2 Sterne</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ 3 Sterne</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ 4 Sterne</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Sterne</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Ausgewählt: {editingTestimonial.stars} Stern{editingTestimonial.stars !== 1 ? 'e' : ''}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Testimonial-Text <span className="text-destructive">*</span>
                </label>
                <Textarea
                  value={editingTestimonial.text}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      text: e.target.value,
                    })
                  }
                  placeholder="Beschreiben Sie die Erfahrung..."
                  rows={5}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {editingTestimonial.text.length} / 500 Zeichen
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Bild-URL (optional)
                </label>
                <Input
                  type="url"
                  value={editingTestimonial.imageUrl}
                  onChange={(e) =>
                    setEditingTestimonial({
                      ...editingTestimonial,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Optional: Bild des Kunden (falls vorhanden)
                </p>
              </div>

              <Button onClick={handleSaveTestimonial} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Testimonial speichern
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
