import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 18 L12 6 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 18 L12 11 L17 18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="footer-brand-name">MMS</div>
          <div className="footer-brand-desc">Metropolitan Mountaineering Society — Your gateway to adventure and nature.</div>
        </div>
        <div>
          <div className="footer-col-title">Quick Links</div>
          <ul className="footer-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About MMS</Link></li>
            <li><Link to="/bmc">BMC</Link></li>
            <li><Link to="/climbs">Open Climbs</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact Us</div>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.1 13.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              (02) 8123-4567
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              info@mms.org
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              123 Mountain St., Quezon City, Metro Manila
            </div>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Follow Us</div>
          <div className="footer-socials">
            <a href="#" className="footer-social">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#" className="footer-social">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Metropolitan Mountaineering Society. All rights reserved.
      </div>
    </footer>
  );
}