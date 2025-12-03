import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useContent, type Service } from '@/contexts/ContentContext';
import { servicesAPI } from '@/lib/supabase-api';
import {
  validateSlug,
  checkDuplicateService,
  validateService,
  generateSlugFromTitle,
  suggestNextOrder,
} from '@/lib/service-helpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Save, LogOut, Loader2, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const AdminServices = () => {
  const { isAuthenticated, logout } = useAdmin();
  const { refreshContent, content } = useContent();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [originalServiceId, setOriginalServiceId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
    } else {
      loadServices();
    }
  }, [isAuthenticated, navigate]);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await servicesAPI.getAll();
      if (data) {
        const mappedServices: Service[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          description: item.description,
          imageUrl: item.image_url,
          order: item.order,
          seoSectionTitle: item.seo_section_title,
          seoSectionContent: item.seo_section_content,
          seoSectionImageUrl: item.seo_section_image_url,
        }));
        setServices(mappedServices);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Fehler beim Laden der Services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService({ ...service });
    setOriginalServiceId(service.id);
    setValidationErrors({});
    setSlugTouched(true); // When editing, slug is already set
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Service wirklich löschen?')) return;

    try {
      setIsSaving(true);
      await servicesAPI.delete(id);
      setServices(services.filter((s) => s.id !== id));
      await refreshContent(); // Refresh frontend content
      toast.success('Service gelöscht!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Fehler beim Löschen des Services');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    // Validate service
    const validation = validateService(editingService);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      toast.error('Bitte beheben Sie die Fehler im Formular');
      return;
    }

    // Check for duplicate slug
    if (checkDuplicateService(editingService.id, services, originalServiceId)) {
      setValidationErrors({
        ...validationErrors,
        id: 'Ein Service mit dieser ID existiert bereits'
      });
      toast.error('Service-ID bereits vergeben');
      return;
    }

    try {
      setIsSaving(true);
      const existingService = services.find((s) => s.id === originalServiceId);

      if (existingService && originalServiceId) {
        // Update existing service in Supabase
        const updateData = {
          title: editingService.title,
          excerpt: editingService.excerpt,
          description: editingService.description,
          image_url: editingService.imageUrl,
          order: editingService.order,
          seo_section_title: editingService.seoSectionTitle || null,
          seo_section_content: editingService.seoSectionContent || null,
          seo_section_image_url: editingService.seoSectionImageUrl || null,
        };
        await servicesAPI.update(originalServiceId, updateData);
        setServices(
          services.map((s) => (s.id === originalServiceId ? editingService : s))
        );
        toast.success('Service erfolgreich aktualisiert!');
      } else {
        // Create new service in Supabase (with id field)
        const createData = {
          id: editingService.id, // Include id for create
          title: editingService.title,
          excerpt: editingService.excerpt,
          description: editingService.description,
          image_url: editingService.imageUrl,
          order: editingService.order,
          seo_section_title: editingService.seoSectionTitle || null,
          seo_section_content: editingService.seoSectionContent || null,
          seo_section_image_url: editingService.seoSectionImageUrl || null,
        };
        const newService = await servicesAPI.create(createData);
        setServices([...services, {
          id: newService.id,
          title: newService.title,
          excerpt: newService.excerpt,
          description: newService.description,
          imageUrl: newService.image_url,
          order: newService.order,
          seoSectionTitle: newService.seo_section_title,
          seoSectionContent: newService.seo_section_content,
          seoSectionImageUrl: newService.seo_section_image_url,
        }]);
        toast.success('Service erfolgreich erstellt! Fügen Sie jetzt Preise hinzu.', {
          action: {
            label: 'Zu Preisen',
            onClick: () => navigate('/l-787/prices'),
          },
          duration: 6000,
        });
      }

      await refreshContent(); // Refresh frontend content
      setDialogOpen(false);
      setEditingService(null);
      setOriginalServiceId(null);
      setValidationErrors({});
      setSlugTouched(false);
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Fehler beim Speichern des Services. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNew = () => {
    const suggestedOrder = suggestNextOrder(services);
    setEditingService({
      id: '',
      title: '',
      excerpt: '',
      description: '',
      imageUrl: '',
      order: suggestedOrder,
      seoSectionTitle: '',
      seoSectionContent: '',
      seoSectionImageUrl: '',
    });
    setOriginalServiceId(null);
    setValidationErrors({});
    setSlugTouched(false); // New service, allow auto-generation
    setDialogOpen(true);
  };

  // Auto-generate slug from title if not manually touched
  const handleTitleChange = (title: string) => {
    if (!editingService) return;

    setEditingService({ ...editingService, title });

    // Auto-generate slug if user hasn't manually edited it
    if (!slugTouched) {
      const generatedSlug = generateSlugFromTitle(title);
      setEditingService({ ...editingService, title, id: generatedSlug });
    }
  };

  // Validate and update slug
  const handleSlugChange = (slug: string) => {
    if (!editingService) return;

    setSlugTouched(true); // Mark as manually edited
    const validation = validateSlug(slug);

    if (!validation.valid && validation.error) {
      setValidationErrors({ ...validationErrors, id: validation.error });
    } else {
      // Remove error if valid
      const { id, ...rest } = validationErrors;
      setValidationErrors(rest);
    }

    setEditingService({ ...editingService, id: validation.sanitized });
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
            <h1 className="font-serif text-2xl font-bold">Services verwalten</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNew} size="sm" disabled={isSaving || isLoading}>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Service
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
            <span className="ml-3 text-lg">Services werden geladen...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Noch keine Services vorhanden
                </p>
                <Button onClick={handleNew} size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Ersten Service erstellen
                </Button>
              </div>
            ) : (
              services
                .sort((a, b) => a.order - b.order)
                .map((service) => {
                  const hasPrices = content.prices.some(p => p.serviceId === service.id);
                  const priceCount = content.prices.filter(p => p.serviceId === service.id).length;

                  return (
                    <Card key={service.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle>{service.title}</CardTitle>
                              {!hasPrices && (
                                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Keine Preise
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {service.excerpt}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-mono bg-muted px-2 py-1 rounded">
                                /behandlungen/{service.id}
                              </span>
                              <span>•</span>
                              <span>Reihenfolge: {service.order}</span>
                              <span>•</span>
                              <span className={hasPrices ? 'text-green-600 font-medium' : ''}>
                                {priceCount} Preiskategorie{priceCount !== 1 ? 'n' : ''}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!hasPrices && (
                              <Button
                                onClick={() => navigate('/l-787/prices')}
                                variant="outline"
                                size="sm"
                                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                title="Preise hinzufügen"
                              >
                                <DollarSign className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              onClick={() => handleEdit(service)}
                              variant="outline"
                              size="sm"
                              disabled={isSaving}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(service.id)}
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
                  );
                })
            )}
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService?.title ? 'Service bearbeiten' : 'Neuer Service'}
            </DialogTitle>
            <DialogDescription>
              Füllen Sie alle Felder aus und speichern Sie
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Titel <span className="text-destructive">*</span>
                </label>
                <Input
                  value={editingService.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="z.B. Wimpernverlängerung"
                  className={validationErrors.title ? 'border-destructive' : ''}
                />
                {validationErrors.title && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Slug (URL) <span className="text-destructive">*</span>
                </label>
                <Input
                  value={editingService.id}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="z.B. wimpernverlaengerung"
                  className={validationErrors.id ? 'border-destructive' : ''}
                />
                {validationErrors.id ? (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.id}
                  </p>
                ) : editingService.id ? (
                  <div className="mt-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      Vorschau: <span className="font-mono text-primary">/behandlungen/{editingService.id}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    Wird automatisch aus dem Titel generiert
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kurzbeschreibung <span className="text-destructive">*</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({editingService.excerpt.length}/200 Zeichen)
                  </span>
                </label>
                <Textarea
                  value={editingService.excerpt}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      excerpt: e.target.value,
                    })
                  }
                  placeholder="Kurze Beschreibung für die Übersicht (erscheint auf Karten)"
                  rows={2}
                  maxLength={200}
                  className={validationErrors.excerpt ? 'border-destructive' : ''}
                />
                {validationErrors.excerpt && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.excerpt}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Beschreibung <span className="text-destructive">*</span>
                </label>
                <MarkdownEditor
                  value={editingService.description}
                  onChange={(value) =>
                    setEditingService({
                      ...editingService,
                      description: value,
                    })
                  }
                  placeholder="Ausführliche Beschreibung mit Formatierung (mindestens 50 Zeichen)..."
                  rows={12}
                />
                {validationErrors.description && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.description}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bild-URL <span className="text-destructive">*</span>
                </label>
                <Input
                  type="url"
                  value={editingService.imageUrl}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://images.unsplash.com/photo-..."
                  className={validationErrors.imageUrl ? 'border-destructive' : ''}
                />
                {validationErrors.imageUrl && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.imageUrl}
                  </p>
                )}
                <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs font-medium mb-2">💡 So bekommen Sie die richtige Bild-URL:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li>• <strong>Unsplash:</strong> Rechtsklick auf Bild → "Bildadresse kopieren"</li>
                    <li>• <strong>Oder:</strong> URL muss mit <code className="bg-background px-1 rounded">https://images.unsplash.com/photo-</code> beginnen</li>
                    <li>• <strong>Beispiel:</strong> https://images.unsplash.com/photo-xyz?w=800&q=80</li>
                  </ul>
                </div>
                {editingService.imageUrl && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Vorschau:</p>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={editingService.imageUrl}
                        alt="Vorschau"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const errorDiv = e.currentTarget.nextElementSibling;
                          if (errorDiv) errorDiv.classList.remove('hidden');
                        }}
                        onLoad={(e) => {
                          e.currentTarget.style.display = 'block';
                          const errorDiv = e.currentTarget.nextElementSibling;
                          if (errorDiv) errorDiv.classList.add('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 flex items-center justify-center bg-muted p-4 text-center">
                        <div>
                          <p className="text-sm font-medium text-destructive">❌ Bild konnte nicht geladen werden</p>
                          <p className="text-xs text-muted-foreground mt-1">Bitte überprüfen Sie die URL</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reihenfolge
                </label>
                <Input
                  type="number"
                  value={editingService.order}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      order: parseInt(e.target.value),
                    })
                  }
                  min={1}
                />
              </div>

              {/* SEO Section Fields */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">SEO Informations-Bereich (optional)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Dieser Bereich wird zwischen der Beschreibung und den Vorteilen angezeigt
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SEO Bereich Titel
                    </label>
                    <Input
                      value={editingService.seoSectionTitle || ''}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          seoSectionTitle: e.target.value,
                        })
                      }
                      placeholder="z.B. Was ist Wimpernverlängerung?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SEO Bereich Inhalt
                    </label>
                    <MarkdownEditor
                      value={editingService.seoSectionContent || ''}
                      onChange={(value) =>
                        setEditingService({
                          ...editingService,
                          seoSectionContent: value,
                        })
                      }
                      placeholder="SEO-optimierter Text über die Behandlung..."
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SEO Bereich Bild-URL
                    </label>
                    <Input
                      type="url"
                      value={editingService.seoSectionImageUrl || ''}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          seoSectionImageUrl: e.target.value,
                        })
                      }
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    {editingService.seoSectionImageUrl && (
                      <div className="mt-3">
                        <p className="text-xs font-medium mb-2">Vorschau:</p>
                        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={editingService.seoSectionImageUrl}
                            alt="SEO Bereich Vorschau"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const errorDiv = e.currentTarget.nextElementSibling;
                              if (errorDiv) errorDiv.classList.remove('hidden');
                            }}
                            onLoad={(e) => {
                              e.currentTarget.style.display = 'block';
                              const errorDiv = e.currentTarget.nextElementSibling;
                              if (errorDiv) errorDiv.classList.add('hidden');
                            }}
                          />
                          <div className="hidden absolute inset-0 flex items-center justify-center bg-muted p-4 text-center">
                            <div>
                              <p className="text-sm font-medium text-destructive">❌ Bild konnte nicht geladen werden</p>
                              <p className="text-xs text-muted-foreground mt-1">Bitte überprüfen Sie die URL</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveService} className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird gespeichert...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Service speichern
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

export default AdminServices;
