import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Search } from 'lucide-react';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

// ── Code-split all pages via React.lazy ────────────────────────────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SavedSearchesPage = lazy(() => import('./pages/SavedSearchesPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const PriceAlertsPage = lazy(() => import('./pages/PriceAlertsPage'));
const OAuthRedirect = lazy(() => import('./pages/OAuthRedirect'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));

// ── Suspense fallback ──────────────────────────────────────────────────────────
const PageLoader = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{
      width: 40, height: 40, border: '4px solid rgba(99,102,241,0.3)',
      borderTop: '4px solid #6366f1', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/oauth-redirect" element={<OAuthRedirect />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/saved-searches" element={
                  <ProtectedRoute><SavedSearchesPage /></ProtectedRoute>
                } />
                <Route path="/bookmarks" element={
                  <ProtectedRoute><BookmarksPage /></ProtectedRoute>
                } />
                <Route path="/price-alerts" element={
                  <ProtectedRoute><PriceAlertsPage /></ProtectedRoute>
                } />
                <Route path="*" element={
                  <div style={{ textAlign: 'center', padding: '80px 24px', background: '#f8fafc', minHeight: '80vh' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '16px', color: '#cbd5e1' }}>
                      <Search size={64} style={{ margin: '0 auto' }} strokeWidth={1.5} />
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', color: '#0f172a', marginBottom: '8px', fontWeight: 600 }}>
                      404 — Page not found
                    </h1>
                    <a href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 500 }}>← Go home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#f1f5f9',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '12px',
              fontSize: '0.88rem',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#f1f5f9' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' } },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
