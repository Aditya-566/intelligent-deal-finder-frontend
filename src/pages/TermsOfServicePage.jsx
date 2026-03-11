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

export default function TermsOfServicePage() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to home</Link>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#f1f5f9', marginTop: '16px', marginBottom: '8px' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#64748b' }}>Last updated: March 2026</p>
        <div style={{ height: 2, background: 'linear-gradient(90deg, #8b5cf6, transparent)', marginTop: '16px' }} />
      </div>

      <div style={{
        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '12px', padding: '20px', marginBottom: '36px',
      }}>
        <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
          By using Intelligent Deal Finder, you agree to these terms. Please read them carefully.
          <br /><strong style={{ color: '#f1f5f9' }}>Note:</strong> This service aggregates publicly available pricing data. We are not a retailer and do not guarantee price accuracy.
        </p>
      </div>

      <Section title="1. Acceptance of Terms">
        <p>By accessing Intelligent Deal Finder ("the Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the Service.</p>
      </Section>

      <Section title="2. Description of Service">
        <p>Intelligent Deal Finder automatically searches multiple e-commerce websites and aggregates publicly available product listings to help users find competitive prices. We are not affiliated with Amazon, eBay, Walmart, or any other retailer.</p>
        <p style={{ marginTop: 8 }}>
          <strong style={{ color: '#ef4444' }}>Price Disclaimer:</strong> Prices, availability, and deal accuracy shown may differ from those on the retailer's website due to scraping delays, regional pricing, or data errors. Always verify prices before purchasing.
        </p>
      </Section>

      <Section title="3. User Accounts">
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>You must be at least 13 years old to create an account</li>
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You must not share your account with others</li>
          <li>You must provide accurate information during registration</li>
        </ul>
      </Section>

      <Section title="4. Acceptable Use">
        <p>You agree NOT to:</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 8 }}>
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to scrape, crawl, or overload our own servers</li>
          <li>Reverse engineer or attempt to extract our source code</li>
          <li>Use automated tools to abuse the search feature</li>
          <li>Violate any applicable law or regulation</li>
        </ul>
      </Section>

      <Section title="5. Scraped Data Disclaimer">
        <p>Product information, images, and prices displayed on the Service are scraped from third-party public websites. This data is provided for informational purposes only. We make no warranties regarding the accuracy, completeness, or timeliness of any data. <strong style={{ color: '#f1f5f9' }}>Always click through to the retailer's website to confirm pricing and availability before making a purchase.</strong></p>
      </Section>

      <Section title="6. Price Alert Feature">
        <p>Price alerts are sent as a convenience feature. We do not guarantee alerts will be triggered at exactly the target price, or that the price will remain available at the time you visit the retailer. Alert delivery may be delayed due to scraping schedules.</p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>All content, branding, and code of the Service are owned by <strong style={{ color: '#f1f5f9' }}>Intelligent Deal Finder</strong>. Product images and names remain the property of their respective retailers.</p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>To the fullest extent permitted by law, <strong style={{ color: '#f1f5f9' }}>Intelligent Deal Finder</strong> shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, including but not limited to loss of profits or data.</p>
      </Section>

      <Section title="9. Changes to Terms">
        <p>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance. We will notify registered users of material changes via email.</p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions? Contact us at: <strong style={{ color: '#6366f1' }}>aditya566sharma@gmail.com</strong>
        </p>
        <p style={{ marginTop: 12, fontSize: '0.85rem', color: '#64748b' }}>
          📌 <em>These terms apply to all users of the Intelligent Deal Finder service.</em>
        </p>
      </Section>
    </div>
  );
}
