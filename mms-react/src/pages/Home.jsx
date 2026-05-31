import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/style.css";

export default function Home() {
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

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Metropolitan Mountaineering Society</h1>
          <p className="hero-sub">Discover. Climb. Preserve. Join us in exploring the great outdoors.</p>
          <div className="hero-btns">
            <Link to="/climbs" className="btn-white">Join Open Climbs</Link>
            <Link to="/about" className="btn-outline-white">Learn More</Link>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-grid">
          <div className="stat-card reveal" ref={addReveal}>
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-num">50+</div>
            <div className="stat-label">Mountains Conquered</div>
          </div>
          <div className="stat-card reveal" ref={addReveal}>
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="9" cy="7" r="3"/>
                <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/>
                <circle cx="17" cy="7" r="3"/>
                <path d="M17 12c2.7 0 5 2 5 5"/>
              </svg>
            </div>
            <div className="stat-num">1,000+</div>
            <div className="stat-label">Active Members</div>
          </div>
          <div className="stat-card reveal" ref={addReveal}>
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="8" r="5"/>
                <path d="M8 13l-3 7h14l-3-7"/>
              </svg>
            </div>
            <div className="stat-num">45+</div>
            <div className="stat-label">BMC Batches</div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="reveal" ref={addReveal}>
            <p className="about-label">Who We Are</p>
            <h2>About MMS</h2>
            <p>The Metropolitan Mountaineering Society is a community of passionate outdoor enthusiasts dedicated to promoting mountaineering as a sport while advocating for environmental conservation. Since 1994, we've been organizing climbs, training programs, and conservation initiatives across the Philippines.</p>
            <p>Our mission is to foster a community of responsible mountaineers who respect nature, practice Leave No Trace principles, and inspire others to experience the transformative power of the mountains.</p>
            <Link to="/about" className="btn-green">
              Read More
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="about-photos reveal" ref={addReveal}>
            <div className="about-photo-1">
              <img src="/images/about.jpg" alt="MMS members hiking" />
            </div>
            <div className="about-photo-2">
              <img src="/images/hero.jpeg" alt="Mountain scenery" />
            </div>
          </div>
        </div>
      </section>

      {/* BMC */}
      <section className="bmc" id="bmc">
        <div className="bmc-inner">
          <div className="bmc-photo reveal" ref={addReveal}>
            <img src="/images/bmc.jpg" alt="BMC training" />
          </div>
          <div className="bmc-content reveal" ref={addReveal}>
            <span className="bmc-badge">Training Program</span>
            <h2>Basic Mountaineering Course</h2>
            <p>Our BMC is a comprehensive training program designed for beginners. Learn essential mountaineering skills including outdoor cooking, tent pitching, navigation, first aid, and Leave No Trace principles from experienced instructors.</p>
            <div className="bmc-highlights">
              <div className="bmc-highlight">
                <div className="bmc-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor"/>
                  </svg>
                </div>
                <div>
                  <div className="bmc-highlight-title">3-Day Course</div>
                  <div className="bmc-highlight-sub">Intensive training</div>
                </div>
              </div>
              <div className="bmc-highlight">
                <div className="bmc-highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor"/>
                  </svg>
                </div>
                <div>
                  <div className="bmc-highlight-title">Expert Led</div>
                  <div className="bmc-highlight-sub">Professional instructors</div>
                </div>
              </div>
            </div>
            <div className="bmc-next">
              <div className="bmc-next-label">Next Batch</div>
              <div className="bmc-next-date">September 10–12, 2026</div>
            </div>
            <Link to="/bmc" className="btn-green">
              View BMC Schedule
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* OPEN CLIMBS */}
      <section className="climbs" id="climbs">
        <div className="climbs-header reveal" ref={addReveal}>
          <h2>Upcoming Open Climbs</h2>
          <p>Join our community on these exciting adventures</p>
        </div>
        <div className="climbs-grid">
          {[
            { img: "/images/MtKapigpiglatan.jpg", name: "Mt. Kapigpiglatan", loc: "Benguet", masl: "1,028 MASL", joined: "12/20", date: "June 15–16, 2026", diff: "4/9", id: "kapig" },
            { img: "/images/MtPulagjpg.jpg", name: "Mt. Pulag", loc: "Benguet", masl: "2,922 MASL", joined: "18/25", date: "July 20–22, 2026", diff: "5/9", id: "pulag" },
            { img: "/images/MtUlap.jpg", name: "Mt. Ulap", loc: "Benguet", masl: "1,846 MASL", joined: "8/30", date: "August 5–6, 2026", diff: "3/9", id: "ulap" },
          ].map(climb => (
            <div className="climb-card reveal" key={climb.id} ref={addReveal}>
              <div className="climb-img">
                <img src={climb.img} alt={climb.name} />
                <span className="climb-slots">{climb.diff}</span>
              </div>
              <div className="climb-body">
                <div className="climb-name">{climb.name}</div>
                <div className="climb-loc">{climb.loc}</div>
                <div className="climb-masl">{climb.masl}</div>
                <div className="climb-meta">
                  <span className="climb-joined">{climb.joined} joined</span>
                  <span className="climb-meta-date">{climb.date}</span>
                </div>
                <Link to={`/climbs?open=${climb.id}`} className="climb-details">
                  View Details
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="climbs-cta reveal" ref={addReveal}>
          <Link to="/climbs" className="btn-green">
            View All Climbs
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}