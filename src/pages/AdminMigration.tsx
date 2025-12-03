import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { migrateData, checkMigrationStatus } from '@/lib/migrate-data';

const AdminMigration = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [migrating, setMigrating] = useState(false);
  const [checking, setChecking] = useState(true);
  const [migrationStatus, setMigrationStatus] = useState<{
    needsMigration: boolean;
    servicesCount: number;
    galleryCount: number;
  } | null>(null);
  const [migrationResult, setMigrationResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/l-787');
      return;
    }
    checkStatus();
  }, [isAuthenticated, navigate]);

  const checkStatus = async () => {
    setChecking(true);
    try {
      const status = await checkMigrationStatus();
      setMigrationStatus(status);
    } catch (error) {
      console.error('Error checking status:', error);
      toast.error('Fehler beim Prüfen des Migrationsstatus');
    } finally {
      setChecking(false);
    }
  };

  const handleMigrate = async () => {
    if (!confirm('Daten jetzt migrieren? Dies sollte nur einmal ausgeführt werden!')) {
      return;
    }

    setMigrating(true);
    setMigrationResult(null);

    try {
      const result = await migrateData();
      setMigrationResult(result);

      if (result.success) {
        toast.success('Migration erfolgreich!');
        checkStatus(); // Refresh status
      } else {
        toast.error('Migration fehlgeschlagen: ' + result.error);
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Fehler bei der Migration');
      setMigrationResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unbekannter Fehler',
      });
    } finally {
      setMigrating(false);
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
            <h1 className="font-serif text-2xl font-bold">Datenmigration</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Daten nach Supabase migrieren
            </CardTitle>
            <CardDescription>
              Bestehende Daten aus content.json in die Supabase-Datenbank übertragen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {checking ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Status */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Aktueller Status:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Services</p>
                      <p className="text-2xl font-bold">{migrationStatus?.servicesCount || 0}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Galerie</p>
                      <p className="text-2xl font-bold">{migrationStatus?.galleryCount || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Migration needed? */}
                {migrationStatus?.needsMigration ? (
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900">Migration empfohlen</p>
                      <p className="text-sm text-yellow-700">
                        Die Datenbank ist leer. Führen Sie die Migration aus, um die
                        bestehenden Daten zu übertragen.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Daten vorhanden</p>
                      <p className="text-sm text-green-700">
                        Die Datenbank enthält bereits Daten. Eine Migration ist nicht
                        notwendig.
                      </p>
                    </div>
                  </div>
                )}

                {/* Migration Result */}
                {migrationResult && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-lg border ${
                      migrationResult.success
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    {migrationResult.success ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900">Migration erfolgreich!</p>
                          <p className="text-sm text-green-700">
                            {migrationResult.message}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900">Migration fehlgeschlagen</p>
                          <p className="text-sm text-red-700">{migrationResult.error}</p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Migration Info */}
                <div className="space-y-2 text-sm">
                  <h3 className="font-semibold">Was wird migriert?</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Services/Behandlungen ({import.meta.env.DEV ? '3' : 'X'} Einträge)</li>
                    <li>Galerie-Bilder ({import.meta.env.DEV ? '6' : 'X'} Bilder)</li>
                    <li>Testimonials ({import.meta.env.DEV ? '3' : 'X'} Bewertungen)</li>
                    <li>Preiskategorien ({import.meta.env.DEV ? '6' : 'X'} Kategorien)</li>
                    <li>Einstellungen (Kontakt, Öffnungszeiten, etc.)</li>
                  </ul>
                </div>

                {/* Migration Button */}
                <Button
                  onClick={handleMigrate}
                  disabled={migrating || !migrationStatus?.needsMigration}
                  className="w-full"
                  size="lg"
                >
                  {migrating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Migriere Daten...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Migration starten
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  ⚠️ Führen Sie die Migration nur einmal aus! Bei erneutem Ausführen
                  werden Daten doppelt angelegt.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminMigration;
