import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '36px' }}>
    <h2 style={{ color: '#6366f1', fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', marginBottom: '12px' }}>
      {title}
    </h2>
    <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to home</Link>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#f1f5f9', marginTop: '16px', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#64748b' }}>Last updated: March 2026</p>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #6366f1, transparent)', marginTop: '16px' }} />
      </div>

      <div style={{
        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '12px', padding: '20px', marginBottom: '36px',
      }}>
        <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
          <strong style={{ color: '#f1f5f9' }}>Summary:</strong> Intelligent Deal Finder collects minimal data to provide
          its service. We do not sell your personal information to third parties. Read below for details.
        </p>
      </div>

      <Section title="1. Information We Collect">
        <p><strong style={{ color: '#f1f5f9' }}>Account Data:</strong> When you register, we collect your name, email address, and (if using Google Sign-In) your Google account ID and profile photo.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: '#f1f5f9' }}>Usage Data:</strong> We collect search queries, bookmark activity, and price alert settings to provide personalised features.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: '#f1f5f9' }}>Log Data:</strong> Our servers automatically record your IP address, browser type, and pages visited for security and debugging.</p>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Provide, maintain, and improve our services</li>
          <li>Send price alert emails when product prices drop below your target</li>
          <li>Respond to your feedback and support requests</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="3. Third-Party Services">
        <p>We integrate with the following services, each governed by their own privacy policies:</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 8 }}>
          <li><strong style={{ color: '#f1f5f9' }}>MongoDB Atlas</strong> — database hosting</li>
          <li><strong style={{ color: '#f1f5f9' }}>Google OAuth</strong> — optional sign-in method</li>
          <li><strong style={{ color: '#f1f5f9' }}>SendGrid</strong> — transactional email delivery</li>
          <li><strong style={{ color: '#f1f5f9' }}>Sentry</strong> — error tracking (anonymised)</li>
        </ul>
        <p style={{ marginTop: 8 }}>
          We scrape publicly available product data from e-commerce sites (Amazon, eBay, Walmart). 
          We do not store or sell individual retailer pricing data.
        </p>
      </Section>

      <Section title="4. Data Retention">
        <p>We retain your account data for as long as your account is active. Price alert history is kept for 90 days after an alert is triggered. You may request deletion of your account at any time.</p>
      </Section>

      <Section title="5. Cookies">
        <p>We use only essential cookies for authentication session management. We do not use tracking or advertising cookies.</p>
      </Section>

      <Section title="6. Your Rights">
        <p>Depending on your location, you may have rights to access, correct, or delete your personal data; port your data; or withdraw consent. Contact us at <strong style={{ color: '#6366f1' }}>[YOUR_EMAIL]</strong> to exercise these rights.</p>
      </Section>

      <Section title="7. Security">
        <p>We use industry-standard measures including HTTPS, bcrypt password hashing, JWT authentication, and MongoDB Atlas encryption at rest. No method of transmission over the internet is 100% secure.</p>
      </Section>

      <Section title="8. Contact">
        <p>If you have questions about this policy, please contact us at:</p>
        <p style={{ marginTop: 8 }}>
          <strong style={{ color: '#f1f5f9' }}>[YOUR_BUSINESS_NAME]</strong><br />
          Email: <strong style={{ color: '#6366f1' }}>[YOUR_EMAIL]</strong><br />
          {/* Add your address if required by GDPR */}
        </p>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: '#64748b' }}>
          ⚠️ <em>Customise the placeholders in brackets above with your actual business details before going live.</em>
        </p>
      </Section>
    </div>
  );
}
