import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/about.css";

const timeline = [
  { year: "1994", text: "MMS was founded at the summit of Mt. Makiling by eight passionate mountaineers." },
  { year: "1996", text: "First Basic Mountaineering Course conducted." },
  { year: "2005", text: "Reached 500 active members across Metro Manila." },
  { year: "2010", text: "Launched environmental conservation programs and the Leave No Trace advocacy." },
  { year: "2020", text: "Adapted to virtual training during the pandemic, keeping the community active and connected." },
  { year: "2024", text: "Celebrated 1,000+ successful climbs and the society's 30th anniversary." },
];

const objectives = [
  "Organize regular climbs and outdoor activities",
  "Provide quality mountaineering education through BMC",
  "Promote Leave No Trace principles",
  "Build a strong community of mountaineers",
  "Contribute to mountain conservation efforts",
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function About() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <Navbar />

      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <h1>About MMS</h1>
          <p>Building a community of responsible mountaineers</p>
        </div>
      </section>

      <section className="mv-section">
        <div className="mv-grid">
          <div className="mv-card reveal" ref={addReveal}>
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="11"/>
              </svg>
            </div>
            <h3>Mission</h3>
            <p>To promote mountaineering as a sport and advocate for environment conservation through responsible outdoor activities.</p>
          </div>
          <div className="mv-card reveal" ref={addReveal}>
            <div className="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
                <path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3>Vision</h3>
            <p>To be the leading mountaineering organization in the Philippines, fostering a community of passionate and responsible outdoor enthusiasts.</p>
          </div>
        </div>
      </section>

      <section className="objectives-section">
        <h2 className="section-heading reveal" ref={addReveal}>Our Objectives</h2>
        <div className="objectives-grid reveal" ref={addReveal}>
          {objectives.map((obj, i) => (
            <div className="objective-item" key={i}>
              <div className="objective-check"><CheckIcon /></div>
              <span>{obj}</span>
            </div>
          ))}
        </div>

        <div className="creed-card reveal" ref={addReveal}>
          <div className="creed-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <span>MMS Creed</span>
          </div>
          <p className="creed-text">"We are mountaineers. We respect nature, we help fellow climbers, and we leave no trace. We climb not to conquer mountains, but to conquer ourselves."</p>
        </div>
      </section>

      <section className="journey-section">
        <h2 className="section-heading reveal" ref={addReveal}>Our Journey</h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-item reveal" key={i} ref={addReveal}>
              <div className="timeline-left">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-card">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}