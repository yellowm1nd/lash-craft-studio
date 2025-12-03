import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useContent, type PriceCategory, type PriceItem } from '@/contexts/ContentContext';
import { pricesAPI } from '@/lib/supabase-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
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
import { ArrowLeft, Plus, Edit, Trash2, Save, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminPrices = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { content, refreshContent } = useContent();
  const navigate = useNavigate();
  const [prices, setPrices] = useState<any[]>([]);
  const [editingPrice, setEditingPrice] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
    } else {
      loadPrices();
    }
  }, [isAuthenticated, navigate]);

  const loadPrices = async () => {
    try {
      setIsLoading(true);
      const data = await pricesAPI.getAll();
      if (data) {
        setPrices(data);
      }
    } catch (error) {
      console.error('Error loading prices:', error);
      toast.error('Fehler beim Laden der Preise');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (price: any) => {
    setEditingPrice({ ...price });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Preiskategorie wirklich löschen?')) return;

    try {
      setIsSaving(true);
      await pricesAPI.delete(id);
      setPrices(prices.filter((p) => p.id !== id));
      await refreshContent();
      toast.success('Preiskategorie gelöscht!');
    } catch (error) {
      console.error('Error deleting price:', error);
      toast.error('Fehler beim Löschen der Preiskategorie');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePrice = async () => {
    if (!editingPrice) return;

    try {
      setIsSaving(true);
      const priceData = {
        service_id: editingPrice.service_id,
        category: editingPrice.category,
        duration_range: editingPrice.duration_range,
        starting_price: editingPrice.starting_price,
        description: editingPrice.description || '',
        items: editingPrice.items,
        order: editingPrice.order || 0,
      };

      const existingPrice = prices.find((p) => p.id === editingPrice.id);

      if (existingPrice) {
        await pricesAPI.update(editingPrice.id, priceData);
        setPrices(prices.map((p) => (p.id === editingPrice.id ? { ...editingPrice } : p)));
        toast.success('Preiskategorie aktualisiert!');
      } else {
        const newPrice = await pricesAPI.create(priceData);
        setPrices([...prices, newPrice]);
        toast.success('Preiskategorie erstellt!');
      }

      await refreshContent();
      setDialogOpen(false);
      setEditingPrice(null);
    } catch (error) {
      console.error('Error saving price:', error);
      toast.error('Fehler beim Speichern der Preiskategorie');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    setEditingPrice({
      id: null,
      service_id: content.services[0]?.id || '',
      category: '',
      duration_range: '',
      starting_price: 0,
      description: '',
      items: [],
      order: prices.length + 1,
    });
    setDialogOpen(true);
  };

  const handleAddItem = () => {
    if (!editingPrice) return;
    setEditingPrice({
      ...editingPrice,
      items: [
        ...editingPrice.items,
        { name: '', amount: 0, duration: 0, badge: '', description: '' },
      ],
    });
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    if (!editingPrice) return;
    const newItems = [...editingPrice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingPrice({ ...editingPrice, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    if (!editingPrice) return;
    const newItems = editingPrice.items.filter((_: any, i: number) => i !== index);
    setEditingPrice({ ...editingPrice, items: newItems });
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
            <h1 className="font-serif text-2xl font-bold">Preise verwalten</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNew} size="sm" disabled={isSaving || isLoading}>
              <Plus className="mr-2 h-4 w-4" />
              Neue Preiskategorie
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
            <span className="ml-3 text-lg">Preise werden geladen...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {prices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Noch keine Preiskategorien vorhanden
                </p>
                <Button onClick={handleNew} size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Erste Preiskategorie erstellen
                </Button>
              </div>
            ) : (
              prices
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((price) => (
                  <Card key={price.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="mb-2">{price.category}</CardTitle>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Service: {price.service_id}</p>
                            {price.duration_range && <p>Dauer: {price.duration_range}</p>}
                            {price.starting_price !== undefined && (
                              <p className="text-primary font-semibold">
                                ab {price.starting_price}€
                              </p>
                            )}
                            <p>{price.items?.length || 0} Unterelemente</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(price)}
                            variant="outline"
                            size="sm"
                            disabled={isSaving}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(price.id)}
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPrice?.id ? 'Preiskategorie bearbeiten' : 'Neue Preiskategorie'}
            </DialogTitle>
            <DialogDescription>
              Füllen Sie alle Felder aus und fügen Sie Unterelemente hinzu
            </DialogDescription>
          </DialogHeader>
          {editingPrice && (
            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Service</label>
                <Select
                  value={editingPrice.service_id}
                  onValueChange={(value) =>
                    setEditingPrice({ ...editingPrice, service_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Service auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Kategorie Name</label>
                <Input
                  value={editingPrice.category}
                  onChange={(e) =>
                    setEditingPrice({ ...editingPrice, category: e.target.value })
                  }
                  placeholder="z.B. Wimpernverlängerung - Volumen"
                />
              </div>

              {/* Duration Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Zeitspanne</label>
                <Input
                  value={editingPrice.duration_range || ''}
                  onChange={(e) =>
                    setEditingPrice({ ...editingPrice, duration_range: e.target.value })
                  }
                  placeholder="z.B. 1 Std. 15 Min. - 2 Std."
                />
              </div>

              {/* Starting Price */}
              <div>
                <label className="block text-sm font-medium mb-2">Startpreis (ab)</label>
                <Input
                  type="number"
                  value={editingPrice.starting_price || 0}
                  onChange={(e) =>
                    setEditingPrice({
                      ...editingPrice,
                      starting_price: parseFloat(e.target.value),
                    })
                  }
                  placeholder="50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Beschreibung</label>
                <MarkdownEditor
                  value={editingPrice.description || ''}
                  onChange={(value) =>
                    setEditingPrice({ ...editingPrice, description: value })
                  }
                  placeholder="Kurze Beschreibung der Kategorie mit Formatierung..."
                  rows={5}
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium mb-2">Reihenfolge</label>
                <Input
                  type="number"
                  value={editingPrice.order || 0}
                  onChange={(e) =>
                    setEditingPrice({ ...editingPrice, order: parseInt(e.target.value) })
                  }
                  min={0}
                />
              </div>

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium">
                    Unterelemente ({editingPrice.items?.length || 0})
                  </label>
                  <Button onClick={handleAddItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Hinzufügen
                  </Button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {editingPrice.items?.map((item: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium text-muted-foreground">
                            Element #{index + 1}
                          </span>
                          <Button
                            onClick={() => handleRemoveItem(index)}
                            size="sm"
                            variant="ghost"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="col-span-2">
                            <Input
                              placeholder="Name (z.B. Refill 5-14 Tage)"
                              value={item.name}
                              onChange={(e) =>
                                handleUpdateItem(index, 'name', e.target.value)
                              }
                            />
                          </div>
                          <Input
                            type="number"
                            placeholder="Preis (€)"
                            value={item.amount}
                            onChange={(e) =>
                              handleUpdateItem(index, 'amount', parseFloat(e.target.value))
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Dauer (Min.)"
                            value={item.duration}
                            onChange={(e) =>
                              handleUpdateItem(index, 'duration', parseInt(e.target.value))
                            }
                          />
                          <Input
                            placeholder="Badge (optional)"
                            value={item.badge || ''}
                            onChange={(e) =>
                              handleUpdateItem(index, 'badge', e.target.value)
                            }
                          />
                          <Input
                            placeholder="Beschreibung (optional)"
                            value={item.description || ''}
                            onChange={(e) =>
                              handleUpdateItem(index, 'description', e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Button onClick={handleSavePrice} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Preiskategorie speichern
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

export default AdminPrices;
