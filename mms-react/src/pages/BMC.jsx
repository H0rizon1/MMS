import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/bmc.css";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
  </svg>
);

const batches = [
  {
    id: "batch45",
    title: "Basic Mountaineering Course - Batch 45",
    date: "September 10–12, 2026",
    img1: "/images/about.jpg",
    img2: "/images/bmc.jpg",
    desc: "A comprehensive 3-day training covering fundamental mountaineering skills including outdoor cooking, tent pitching, navigation, and Leave No Trace principles.",
  },
  {
    id: "batch46",
    title: "Basic Mountaineering Course - Batch 46",
    date: "November 15–17, 2026",
    img1: "/images/bmc.jpg",
    img2: "/images/about.jpg",
    desc: "Learn essential mountaineering skills in this intensive 3-day course designed for beginners.",
  },
];

const requirements = [
  "Physically fit and healthy",
  "At least 18 years old",
  "Willing to participate in outdoor activities",
  "No prior mountaineering experience required",
];

const instructors = [
  "Sir Roberto Cruz - Lead Instructor",
  "Ms. Linda Fernandez - Navigation Specialist",
  "Mr. Ramon Torres - First Aid Expert",
];

export default function BMC() {
  const [activeModal, setActiveModal] = useState(null);
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

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <Navbar />

      <section className="bmc-hero">
        <div className="bmc-hero-bg"></div>
        <div className="bmc-hero-content">
          <h1>Basic Mountaineering Course</h1>
          <p>Learn the fundamentals of safe and responsible mountaineering</p>
        </div>
      </section>

      <section className="bmc-about">
        <h2 className="section-heading reveal" ref={addReveal}>About BMC</h2>
        <div className="bmc-about-text reveal" ref={addReveal}>
          <p>Our Basic Mountaineering Course is a comprehensive 3-day training program designed for beginners who want to learn essential mountaineering skills. The course covers everything from outdoor cooking and tent pitching to navigation, first aid, and Leave No Trace principles.</p>
          <p>Led by experienced instructors, this intensive training will prepare you for your first mountain adventure and set you on the path to becoming a responsible mountaineer.</p>
        </div>
      </section>

      <section className="batches-section">
        <h2 className="section-heading reveal" ref={addReveal}>Upcoming Batches</h2>
        <div className="batches-grid">
          {batches.map(batch => (
            <div className="batch-card reveal" key={batch.id} ref={addReveal}>
              <div className="batch-img">
                <img src={batch.img1} alt={batch.title} />
              </div>
              <div className="batch-body">
                <h3 className="batch-title">{batch.title}</h3>
                <div className="batch-meta">
                  <div className="batch-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    {batch.date}
                  </div>
                  <div className="batch-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    MMS Training Grounds, Rizal
                  </div>
                </div>
                <p className="batch-desc">{batch.desc}</p>
                <button className="btn-register" onClick={() => setActiveModal(batch.id)}>
                  View Details & Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      {batches.map(batch => (
        <div
          key={batch.id}
          className={`modal-overlay${activeModal === batch.id ? " active" : ""}`}
          onClick={e => { if (e.target === e.currentTarget) setActiveModal(null); }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>{batch.title}</h2>
              <button className="modal-close" onClick={() => setActiveModal(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-photos">
                <img src={batch.img1} alt={batch.title} />
                <img src={batch.img2} alt={batch.title} />
              </div>
              <h3 className="modal-section-title">Description</h3>
              <p className="modal-desc">{batch.desc}</p>
              <div className="modal-info-grid">
                <div>
                  <div className="modal-info-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                    Schedule
                  </div>
                  <div className="modal-info-value">{batch.date}</div>
                </div>
                <div>
                  <div className="modal-info-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    Venue
                  </div>
                  <div className="modal-info-value">MMS Training Grounds, Rizal</div>
                </div>
              </div>
              <h3 className="modal-section-title">Requirements</h3>
              <ul className="modal-checklist">
                {requirements.map((req, i) => (
                  <li key={i}><CheckIcon />{req}</li>
                ))}
              </ul>
              <h3 className="modal-section-title">Instructors</h3>
              <ul className="modal-instructors">
                {instructors.map((inst, i) => (
                  <li key={i}><PersonIcon />{inst}</li>
                ))}
              </ul>
              <div className="modal-fee">
                <div className="modal-fee-label">Registration Fee</div>
                <div className="modal-fee-amount">₱2,500</div>
                <div className="modal-fee-desc">Includes training materials, certificates, meals during training, and venue use.</div>
                <button className="btn-register-now">Register Now</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </>
  );
}