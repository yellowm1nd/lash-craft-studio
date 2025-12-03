import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkRateLimit, recordLoginAttempt, clearLoginAttempts, getRemainingAttempts } from '@/lib/rate-limiter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const { login, isAuthenticated, resetPassword } = useAdmin();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/l-787/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit before attempting login
    const rateLimit = checkRateLimit(email);
    if (!rateLimit.allowed) {
      toast.error(
        `Zu viele Anmeldeversuche. Bitte warten Sie ${rateLimit.remainingTime} Minuten.`,
        { duration: 5000 }
      );
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Clear login attempts on successful login
      clearLoginAttempts(email);
      toast.success('Erfolgreich angemeldet!');
      navigate('/l-787/dashboard');
    } else {
      // Record failed login attempt
      recordLoginAttempt(email);

      const remaining = getRemainingAttempts(email);
      if (remaining > 0) {
        toast.error(`${result.error || 'Login fehlgeschlagen'}. Noch ${remaining} Versuche übrig.`);
      } else {
        toast.error('Konto temporär gesperrt. Bitte warten Sie 15 Minuten.', { duration: 5000 });
      }

      setPassword('');
    }

    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    const result = await resetPassword(resetEmail);

    if (result.success) {
      toast.success('Passwort-Reset-Link wurde an Ihre E-Mail gesendet!');
      setResetDialogOpen(false);
      setResetEmail('');
    } else {
      toast.error(result.error || 'Fehler beim Senden des Reset-Links');
    }

    setResetLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Admin-Bereich</CardTitle>
          <CardDescription>
            Melden Sie sich an, um Inhalte zu verwalten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-Mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@beispiel.at"
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Passwort
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Wird angemeldet...' : 'Anmelden'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                  Passwort vergessen?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Passwort zurücksetzen
                  </DialogTitle>
                  <DialogDescription>
                    Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleResetPassword}>
                  <div className="space-y-4 py-4">
                    <div>
                      <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
                        E-Mail-Adresse
                      </label>
                      <Input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="admin@beispiel.at"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setResetDialogOpen(false)}
                      disabled={resetLoading}
                    >
                      Abbrechen
                    </Button>
                    <Button type="submit" disabled={resetLoading}>
                      {resetLoading ? 'Wird gesendet...' : 'Reset-Link senden'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
