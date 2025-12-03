/**
 * Lashes by Danesh - Main Application
 *
 * Developed by: Red Rabbit Media
 * Website: https://redrabbit.media/
 * Expertise: KI Agentur, Web Development, Digital Solutions
 *
 * Copyright (c) 2025 Red Rabbit Media
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContentProvider } from "./contexts/ContentContext";
import { AdminProvider } from "./contexts/AdminContext";
import { CookieProvider } from "./contexts/CookieContext";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Referral from "./pages/Referral";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Legal from "./pages/Legal";
import AdminLogin from "./pages/AdminLogin";
import AdminPasswordReset from "./pages/AdminPasswordReset";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import AdminServices from "./pages/AdminServices";
import AdminPrices from "./pages/AdminPrices";
import AdminGallery from "./pages/AdminGallery";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminPromotions from "./pages/AdminPromotions";
import AdminMigration from "./pages/AdminMigration";
import CookieSettings from "./pages/CookieSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CookieProvider>
            <ContentProvider>
              <AdminProvider>
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/behandlungen" element={<Services />} />
                <Route path="/behandlungen/:slug" element={<ServiceDetail />} />
                <Route path="/ueber-mich" element={<About />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/empfehle-mich-weiter" element={<Referral />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/cookie-einstellungen" element={<CookieSettings />} />

                {/* Admin Login Routes (Public) */}
                <Route path="/l-787" element={<AdminLogin />} />
                <Route path="/l-787/reset-password" element={<AdminPasswordReset />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/l-787/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/settings"
                  element={
                    <ProtectedRoute>
                      <AdminSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/services"
                  element={
                    <ProtectedRoute>
                      <AdminServices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/prices"
                  element={
                    <ProtectedRoute>
                      <AdminPrices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/gallery"
                  element={
                    <ProtectedRoute>
                      <AdminGallery />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/testimonials"
                  element={
                    <ProtectedRoute>
                      <AdminTestimonials />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/promotions"
                  element={
                    <ProtectedRoute>
                      <AdminPromotions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/l-787/migration"
                  element={
                    <ProtectedRoute>
                      <AdminMigration />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <WhatsAppButton />
              <CookieConsent />
            </AdminProvider>
          </ContentProvider>
        </CookieProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
