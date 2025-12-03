import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  validatePassword,
  getPasswordStrengthColor,
  getPasswordStrengthText
} from '@/lib/password-validator';

const AdminPasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAdmin();
  const navigate = useNavigate();

  // Password strength validation
  const passwordStrength = validatePassword(newPassword);

  useEffect(() => {
    // Check if user came from a valid reset link
    const hash = window.location.hash;
    if (!hash.includes('access_token')) {
      toast.error('Ungültiger Reset-Link');
      navigate('/l-787');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password strength
    if (!passwordStrength.isValid) {
      const errorMsg = passwordStrength.feedback.join(', ');
      toast.error(`Passwort erfüllt nicht alle Anforderungen: ${errorMsg}`);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }

    setLoading(true);

    const result = await updatePassword(newPassword);

    if (result.success) {
      setSuccess(true);
      toast.success('Passwort erfolgreich geändert!');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/l-787');
      }, 3000);
    } else {
      toast.error(result.error || 'Fehler beim Ändern des Passworts');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold mb-2">Passwort erfolgreich geändert!</h2>
            <p className="text-muted-foreground mb-4">
              Sie werden in Kürze zur Login-Seite weitergeleitet...
            </p>
            <Button onClick={() => navigate('/l-787')} variant="outline">
              Jetzt zum Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Neues Passwort setzen</CardTitle>
          <CardDescription>
            Bitte geben Sie Ihr neues Passwort ein
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                Neues Passwort
              </label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mindestens 12 Zeichen"
                required
                autoFocus
                minLength={12}
              />

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.level)}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium min-w-[80px]">
                      {getPasswordStrengthText(passwordStrength.level)}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {passwordStrength.feedback.map((msg, i) => (
                        <li key={i}>• {msg}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Mindestens 12 Zeichen, inkl. Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen
              </p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                Passwort bestätigen
              </label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Passwort wiederholen"
                required
                minLength={12}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Passwort wird geändert...' : 'Passwort ändern'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/l-787')}
            >
              Zurück zum Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPasswordReset;
