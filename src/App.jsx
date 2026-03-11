import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedSearchesPage from './pages/SavedSearchesPage';
import BookmarksPage from './pages/BookmarksPage';
import PriceAlertsPage from './pages/PriceAlertsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
                <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
                  <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', color: '#f1f5f9', marginBottom: '8px' }}>404 — Page not found</h1>
                  <a href="/" style={{ color: '#6366f1', textDecoration: 'none' }}>← Go home</a>
                </div>
              } />
            </Routes>
          </main>
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
