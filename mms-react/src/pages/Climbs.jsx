import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/climbs.css";

const climbData = {
  kapig: {
    name: "Mt. Kapigpiglatan", loc: "Benguet", difficulty: "Difficulty: 4/9",
    elevation: "1,028 MASL", schedule: "June 15–16, 2026", location: "Benguet",
    participants: "12/20", slotsPct: 60, bg: "/mtkapig.jpg",
    about: "A beginner-friendly mountain perfect for first-time hikers. Features scenic grasslands and pine forests.",
    itinerary: {
      "Day 1": ["6:00 AM - Assembly point at MMS Office","7:00 AM - ETD to Benguet","12:00 PM - Lunch at jump-off","1:00 PM - Start trek","5:00 PM - Set up camp","6:00 PM - Dinner and socials"],
      "Day 2": ["5:00 AM - Wake up call","6:00 AM - Summit assault","8:00 AM - Breakfast at summit","10:00 AM - Descend","2:00 PM - Arrive at jump-off","3:00 PM - ETD back to Manila"],
    },
    water: ["Water source at campsite","Bring 2–3L for the trail"],
    bring: ["Backpack (40–50L)","Tent and sleeping bag","Headlamp with extra batteries","Rain gear","Personal medications","Trail food and snacks","Water container (2–3L capacity)"],
    expenses: [["Transportation","₱800"],["Registration Fee","₱500"],["Guide Fee","₱300"],["Food","₱600"],["Miscellaneous","₱300"]],
    total: "₱2,500",
    officers: [{name:"Juan Dela Cruz",role:"Climb Leader",phone:"0917-123-4567"},{name:"Maria Santos",role:"Assistant Leader",phone:"0918-234-5678"}],
  },
  pulag: {
    name: "Mt. Pulag", loc: "Benguet", difficulty: "Difficulty: 5/9",
    elevation: "2,922 MASL", schedule: "July 20–22, 2026", location: "Benguet",
    participants: "18/25", slotsPct: 72, bg: "/pulag1.jpg",
    about: "The third highest peak in the Philippines. Famous for its sea of clouds and stunning sunrise views.",
    itinerary: {
      "Day 1": ["5:00 AM - Assembly at MMS Office","6:00 AM - ETD to Benguet","2:00 PM - Arrive at ranger station","3:00 PM - Start trek to campsite","6:00 PM - Set up camp","7:00 PM - Dinner and briefing"],
      "Day 2": ["3:00 AM - Wake up call","4:00 AM - Summit assault","6:00 AM - Sunrise at summit","8:00 AM - Descend","12:00 PM - Lunch at campsite","2:00 PM - Continue descent"],
      "Day 3": ["6:00 AM - Final descent","10:00 AM - Arrive at jump-off","11:00 AM - ETD back to Manila"],
    },
    water: ["Water source at campsite","Bring 3–4L for the summit assault"],
    bring: ["Backpack (50–60L)","Cold weather gear","Headlamp with extra batteries","Rain gear","Personal medications","High-energy trail food","Water container (3–4L capacity)","Extra batteries"],
    expenses: [["Transportation","₱1,200"],["Registration Fee","₱800"],["Guide Fee","₱500"],["Food","₱900"],["Miscellaneous","₱400"]],
    total: "₱3,800",
    officers: [{name:"Juan Dela Cruz",role:"Climb Leader",phone:"0917-123-4567"},{name:"Maria Santos",role:"Assistant Leader",phone:"0918-234-5678"}],
  },
  ulap: {
    name: "Mt. Ulap", loc: "Benguet", difficulty: "Difficulty: 3/9",
    elevation: "1,846 MASL", schedule: "August 5–6, 2026", location: "Benguet",
    participants: "8/30", slotsPct: 27, bg: "/MtUlap.jpg",
    about: "Known for its Godzilla-like mountain ridges and rolling hills. Perfect for beginners who want a scenic adventure.",
    itinerary: {
      "Day 1": ["6:00 AM - Assembly at MMS Office","7:00 AM - ETD to Benguet","12:00 PM - Arrive at jump-off","1:00 PM - Start trek","5:00 PM - Set up camp at ridge","6:30 PM - Dinner and socials"],
      "Day 2": ["5:00 AM - Wake up and sunrise viewing","7:00 AM - Breakfast","8:00 AM - Continue trek and descend","12:00 PM - Arrive at jump-off","1:00 PM - ETD back to Manila"],
    },
    water: ["Water source at campsite","Bring 2L for the trail"],
    bring: ["Backpack (40–50L)","Tent and sleeping bag","Headlamp with extra batteries","Rain gear","Personal medications","Trail food and snacks","Water container (2L capacity)"],
    expenses: [["Transportation","₱700"],["Registration Fee","₱400"],["Guide Fee","₱250"],["Food","₱500"],["Miscellaneous","₱250"]],
    total: "₱2,100",
    officers: [{name:"Paolo Mendoza",role:"Climb Leader",phone:"0916-567-8901"},{name:"Ana Garcia",role:"Assistant Leader",phone:"0917-678-9012"}],
  },
};

const climbCards = [
  { id: "kapig", img: "/mtkapig.jpg", name: "Mt. Kapigpiglatan", loc: "Benguet", masl: "1,028 MASL", date: "June 15–16, 2026", joined: "12/20", diff: "Difficulty: 4/9", pct: 60 },
  { id: "pulag", img: "/pulag1.jpg", name: "Mt. Pulag", loc: "Benguet", masl: "2,922 MASL", date: "July 20–22, 2026", joined: "18/25", diff: "Difficulty: 5/9", pct: 72 },
  { id: "ulap", img: "/MtUlap.jpg", name: "Mt. Ulap", loc: "Benguet", masl: "1,846 MASL", date: "August 5–6, 2026", joined: "8/30", diff: "Difficulty: 3/9", pct: 27 },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Climbs() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId && climbData[openId]) {
      setTimeout(() => setActiveModal(openId), 300);
    }
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function getRegistrations() {
    try {
      return JSON.parse(localStorage.getItem("mms_registrations") || "[]");
    } catch { return []; }
  }

  function isRegistered(climbId) {
    if (!user) return false;
    return getRegistrations().some(r => r.climbId === climbId && r.username === user.username);
  }

  function registerForClimb(climbId) {
    if (!user) return;
    const regs = getRegistrations();
    if (regs.some(r => r.climbId === climbId && r.username === user.username)) return;
    regs.push({
      climbId, username: user.username, fullName: user.fullName,
      status: "pending", paymentStatus: "unpaid",
      registeredAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    });
    localStorage.setItem("mms_registrations", JSON.stringify(regs));
    setActiveModal(null);
    setTimeout(() => setActiveModal(climbId), 50);
  }

  function RegisterButton({ climbId }) {
    if (!user) return (
      <>
        <Link to="/login" className="detail-register-btn" style={{display:"block",textAlign:"center",textDecoration:"none"}}>Login to Register</Link>
        <p className="detail-register-note">You need to login or sign up to register for this climb.</p>
      </>
    );
    if (user.role === "admin") return (
      <>
        <button className="detail-register-btn" disabled style={{opacity:0.6}}>Admin View</button>
        <p className="detail-register-note">Admins cannot register as participants.</p>
      </>
    );
    if (isRegistered(climbId)) return (
      <>
        <button className="detail-register-btn" disabled style={{background:"#4caf50"}}>✓ Already Registered</button>
        <p className="detail-register-note">You are registered. Check My Climbs for details.</p>
      </>
    );
    return (
      <>
        <button className="detail-register-btn" onClick={() => registerForClimb(climbId)}>Register for this Climb</button>
        <p className="detail-register-note">Secure your slot now before it fills up!</p>
      </>
    );
  }

  const d = activeModal ? climbData[activeModal] : null;

  return (
    <>
      <Navbar />

      <section className="climbs-hero">
        <div className="climbs-hero-bg"></div>
        <div className="climbs-hero-content">
          <h1>Open Climbs</h1>
          <p>Join us on our upcoming mountain adventures</p>
        </div>
      </section>

      <section className="climbs-section">
        <div className="climbs-grid">
          {climbCards.map(c => (
            <div className="climb-card" key={c.id}>
              <div className="climb-img">
                <img src={c.img} alt={c.name} />
                <span className="climb-difficulty">{c.diff}</span>
                <div className="climb-img-overlay">
                  <h3 className="climb-name">{c.name}</h3>
                  <p className="climb-loc">{c.loc}</p>
                </div>
              </div>
              <div className="climb-body">
                <div className="climb-meta-row">
                  <span className="climb-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {c.masl}
                  </span>
                  <span className="climb-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {c.date}
                  </span>
                  <span className="climb-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="17" cy="7" r="3"/><path d="M17 12c2.7 0 5 2 5 5"/></svg>
                    {c.joined} joined
                  </span>
                </div>
                <div className="climb-progress-wrap">
                  <div className="climb-progress-bar">
                    <div className="climb-progress-fill" style={{width:`${c.pct}%`}}></div>
                  </div>
                </div>
                <div className="climb-footer">
                  <button className="climb-view-btn" onClick={() => setActiveModal(c.id)}>View Details →</button>
                  <span className="climb-slots-badge">Slots Available</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* DETAIL MODAL */}
      {d && (
        <div className="detail-overlay active" id="climbModal" onClick={e => { if (e.target.id === "climbModal") setActiveModal(null); }}>
          <div className="detail-modal">
            <div className="detail-hero">
              <div className="detail-hero-bg" style={{backgroundImage:`url('${d.bg}')`}}></div>
              <button className="detail-back" onClick={() => setActiveModal(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Open Climbs
              </button>
              <div className="detail-hero-info">
                <span className="detail-difficulty">{d.difficulty}</span>
                <h2 className="detail-mountain-name">{d.name}</h2>
                <p className="detail-mountain-loc">{d.loc}</p>
              </div>
              <div className="detail-elevation-badge">
                <div className="detail-elevation-label">Elevation</div>
                <div className="detail-elevation-value">{d.elevation}</div>
              </div>
            </div>

            <div className="detail-body">
              <div className="detail-left">
                <div className="detail-card">
                  <h3 className="detail-section-title">About This Climb</h3>
                  <p className="detail-about-text">{d.about}</p>
                </div>

                <div className="detail-card">
                  <h3 className="detail-section-title">Itinerary</h3>
                  {Object.entries(d.itinerary).map(([day, items]) => (
                    <div key={day}>
                      <div className="detail-day-title">{day}</div>
                      <ul className="detail-checklist">
                        {items.map((item, i) => <li key={i}><CheckIcon />{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="detail-card">
                  <h3 className="detail-section-title">Water Sources</h3>
                  <ul className="detail-checklist">
                    {d.water.map((w, i) => <li key={i}><CheckIcon />{w}</li>)}
                  </ul>
                </div>

                <div className="detail-card">
                  <h3 className="detail-section-title">Things to Bring</h3>
                  <div className="detail-bring-grid">
                    {d.bring.map((b, i) => <div className="detail-bring-item" key={i}><CheckIcon />{b}</div>)}
                  </div>
                </div>

                <div className="detail-card">
                  <h3 className="detail-section-title">Estimated Expenses</h3>
                  <table className="detail-expenses">
                    <tbody>
                      {d.expenses.map(([label, amt], i) => <tr key={i}><td>{label}</td><td>{amt}</td></tr>)}
                      <tr className="total"><td>Total Estimate</td><td>{d.total}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="detail-card">
                  <h3 className="detail-section-title">Climb Officers</h3>
                  <div className="detail-officers-grid">
                    {d.officers.map((o, i) => (
                      <div className="detail-officer-card" key={i}>
                        <div className="detail-officer-name">{o.name}</div>
                        <div className="detail-officer-role">{o.role}</div>
                        <div className="detail-officer-phone">{o.phone}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="detail-sidebar">
                <div className="detail-sidebar-card">
                  <div className="detail-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    <div><div className="detail-sidebar-label">Schedule</div><div className="detail-sidebar-value">{d.schedule}</div></div>
                  </div>
                  <div className="detail-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div><div className="detail-sidebar-label">Location</div><div className="detail-sidebar-value">{d.location}</div></div>
                  </div>
                  <div className="detail-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div><div className="detail-sidebar-label">Elevation</div><div className="detail-sidebar-value">{d.elevation}</div></div>
                  </div>
                  <div className="detail-sidebar-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><circle cx="17" cy="7" r="3"/><path d="M17 12c2.7 0 5 2 5 5"/></svg>
                    <div><div className="detail-sidebar-label">Participants</div><div className="detail-sidebar-value">{d.participants}</div></div>
                  </div>
                  <div className="detail-slots-section">
                    <div className="detail-slots-row">
                      <span className="detail-slots-label">Slots filled</span>
                      <span className="detail-slots-pct">{d.slotsPct}%</span>
                    </div>
                    <div className="detail-progress-bar">
                      <div className="detail-progress-fill" style={{width:`${d.slotsPct}%`}}></div>
                    </div>
                  </div>
                  <div className="detail-lnt-card">
                    <div className="detail-lnt-title">Leave No Trace</div>
                    <p className="detail-lnt-text">We follow strict environmental guidelines. All participants must respect nature and leave no trace behind.</p>
                  </div>
                  <RegisterButton climbId={activeModal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}