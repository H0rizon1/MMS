import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/myclimbs.css";

const allClimbs = {
  kapig: { id:"kapig", name:"Mt. Kapigpiglatan", loc:"Benguet", date:"June 15–16, 2026", masl:"1,028 MASL", img:"/mtkapig.jpg", desc:"A beginner-friendly mountain perfect for first-time hikers." },
  pulag: { id:"pulag", name:"Mt. Pulag", loc:"Benguet", date:"July 20–22, 2026", masl:"2,922 MASL", img:"/pulag1.jpg", desc:"The third highest peak in the Philippines. Famous for its sea of clouds." },
  ulap:  { id:"ulap",  name:"Mt. Ulap", loc:"Benguet", date:"August 5–6, 2026", masl:"1,846 MASL", img:"/MtUlap.jpg", desc:"Known for its Godzilla-like mountain ridges and rolling hills." },
};

export default function MyClimbs() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [showECModal, setShowECModal] = useState(false);
  const [ec, setEc] = useState({ name: "", relation: "", phone: "" });
  const [ecSaved, setEcSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem("mms_registrations") || "[]");
    setRegistrations(all.filter(r => r.username === user.username));

    const saved = JSON.parse(localStorage.getItem(`mms_emergency_${user.username}`) || "null");
    if (saved) setEc(saved);
  }, [user]);

  function saveEC() {
    if (!ec.name || !ec.phone) { alert("Please fill in at least the name and phone number."); return; }
    localStorage.setItem(`mms_emergency_${user.username}`, JSON.stringify(ec));
    setEcSaved(true);
    setTimeout(() => { setShowECModal(false); setEcSaved(false); }, 1200);
  }

  const upcoming  = registrations.length;
  const confirmed = registrations.filter(r => r.status === "confirmed").length;
  const pending   = registrations.filter(r => r.paymentStatus === "unpaid").length;

  return (
    <>
      <Navbar />

      <section className="welcome-banner">
        <div className="welcome-inner">
          <div className="welcome-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="welcome-title">Welcome back, {user?.fullName}!</h1>
            <p className="welcome-sub">Track your climbing journey</p>
          </div>
        </div>
      </section>

      <div className="myclimbs-content">
        {/* STATS */}
        <div className="stats-row">
          {[
            { label: "Upcoming Climbs", val: upcoming, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { label: "Confirmed", val: confirmed, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            { label: "Pending Payment", val: pending, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon-wrap">{s.icon}</div>
              <div><div className="stat-big">{s.val}</div><div className="stat-label">{s.label}</div></div>
            </div>
          ))}
        </div>

        {/* CLIMBS LIST */}
        <div className="section-block">
          <h2 className="section-block-title">My Upcoming Climbs</h2>
          {registrations.length === 0 ? (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>You haven't registered for any climbs yet.</p>
              <Link to="/climbs" className="btn-green-sm">Browse Open Climbs</Link>
            </div>
          ) : (
            <div id="climbList">
              {registrations.map((reg, i) => {
                const climb = allClimbs[reg.climbId];
                if (!climb) return null;
                return (
                  <div className="climb-item" key={i}>
                    <div className="climb-item-img">
                      <img src={climb.img} alt={climb.name} />
                    </div>
                    <div className="climb-item-body">
                      <div className="climb-item-top">
                        <div className="climb-item-name">{climb.name}</div>
                        <div className="climb-item-badges">
                          <span className={`badge badge-${reg.status}`}>{reg.status}</span>
                          <span className={`badge badge-${reg.paymentStatus}`}>{reg.paymentStatus}</span>
                        </div>
                      </div>
                      <div className="climb-item-meta">
                        <span className="climb-item-meta-item">{climb.loc}</span>
                        <span className="climb-item-meta-item">{climb.date}</span>
                        <span className="climb-item-meta-item">{climb.masl}</span>
                      </div>
                      <p className="climb-item-desc">{climb.desc}</p>
                      <div className="climb-item-footer">
                        <span className="climb-item-registered">Registered: {reg.registeredAt}</span>
                        <Link to={`/climbs?open=${climb.id}`} className="btn-green-sm">View Details</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="section-block">
          <div className="emergency-card">
            <div className="emergency-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.1 13.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <div>
                <div className="emergency-title">Emergency Contact</div>
                <div className="emergency-desc">Make sure to update your emergency contact information before you climb.</div>
              </div>
            </div>
            <button className="btn-green-sm" onClick={() => setShowECModal(true)}>Update Contact Info</button>
          </div>
        </div>
      </div>

      <Footer />

      {/* EMERGENCY CONTACT MODAL */}
      {showECModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"1rem"}}
          onClick={e => { if (e.target === e.currentTarget) setShowECModal(false); }}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"440px",boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
            <h2 style={{margin:"0 0 0.25rem",fontSize:"1.2rem"}}>Emergency Contact</h2>
            <p style={{margin:"0 0 1.5rem",color:"#666",fontSize:"0.9rem"}}>This info will be shared with climb officers in case of emergency.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              {[
                { label:"Contact Name", key:"name", placeholder:"Full name", type:"text" },
                { label:"Relationship", key:"relation", placeholder:"e.g. Mother, Spouse, Friend", type:"text" },
                { label:"Phone Number", key:"phone", placeholder:"e.g. 0917-123-4567", type:"tel" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{display:"block",fontSize:"0.85rem",fontWeight:600,marginBottom:"0.4rem"}}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={ec[f.key]}
                    onChange={e => setEc({...ec, [f.key]: e.target.value})}
                    style={{width:"100%",padding:"0.6rem 0.8rem",border:"1.5px solid #ddd",borderRadius:"8px",fontSize:"0.95rem",boxSizing:"border-box"}} />
                </div>
              ))}
            </div>
            {ecSaved && <div style={{marginTop:"0.75rem",fontSize:"0.85rem",color:"#2e7d32"}}>✓ Contact info saved!</div>}
            <div style={{display:"flex",gap:"0.75rem",marginTop:"1.5rem"}}>
              <button onClick={saveEC} style={{flex:1,padding:"0.7rem",background:"#2d6a4f",color:"#fff",border:"none",borderRadius:"8px",fontSize:"0.95rem",fontWeight:600,cursor:"pointer"}}>Save</button>
              <button onClick={() => setShowECModal(false)} style={{flex:1,padding:"0.7rem",background:"#f5f5f5",color:"#333",border:"none",borderRadius:"8px",fontSize:"0.95rem",cursor:"pointer"}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}