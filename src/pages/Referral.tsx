import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTABar from '@/components/CTABar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users, Heart } from 'lucide-react';

const Referral = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  Empfehlen Sie mich weiter!
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Teilen Sie Ihre Freude und profitieren Sie beide von einem
                  exklusiven Rabatt
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <Card className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-serif text-2xl">
                        Für Sie
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Empfehlen Sie Lashes by Danesh einer Freundin und erhalten Sie
                      <strong className="text-primary"> 5€ Rabatt</strong> auf Ihre
                      nächste Behandlung.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                        <Heart className="h-6 w-6 text-secondary" />
                      </div>
                      <CardTitle className="font-serif text-2xl">
                        Für Ihre Freundin
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Ihre Freundin erhält ebenfalls
                      <strong className="text-secondary"> 5€ Rabatt</strong> bei
                      ihrer ersten Behandlung bei mir.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-center">
                  So funktioniert's
                </h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Empfehlen Sie mich weiter
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Erzählen Sie Ihren Freundinnen von Lashes by Danesh und
                        geben Sie ihnen meinen Namen durch.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Ihre Freundin bucht einen Termin
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ihre Freundin erwähnt bei der Buchung Ihren Namen als
                        Empfehlung.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Beide profitieren</h3>
                      <p className="text-sm text-muted-foreground">
                        Sie beide erhalten je 5€ Rabatt – Ihre Freundin bei der
                        ersten Behandlung, Sie bei Ihrer nächsten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  * Der Empfehlungsrabatt kann nicht mit anderen Aktionen kombiniert
                  werden. Pro erfolgreich geworbener Freundin gibt es einmalig 5€
                  Rabatt.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
};

export default Referral;
