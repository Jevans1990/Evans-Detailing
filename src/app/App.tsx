import { useState } from "react";
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin, Clock,
  Shield, Zap, Droplets, Sparkles, Car, CheckCircle,
  AlertCircle, Printer, ArrowRight,
} from "lucide-react";

/* ── Data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "wash-wax",
    icon: <Droplets size={22} />,
    name: "Exterior Wash & Wax",
    desc: "Hand wash, clay bar, iron decontamination, and carnauba wax for a deep, wet shine.",
    price: "From $120",
    duration: "3–4 hrs",
    features: ["Hand wash & dry", "Clay bar treatment", "Iron decontamination", "Carnauba wax", "Tire & trim dressing"],
  },
  {
    id: "interior",
    icon: <Sparkles size={22} />,
    name: "Interior Detail",
    desc: "Full vacuum, steam clean, leather conditioning, and odor elimination — every surface, every crevice.",
    price: "From $150",
    duration: "3–5 hrs",
    features: ["Full vacuum", "Steam cleaning", "Leather conditioning", "Odor elimination", "Glass & trim polish"],
  },
  {
    id: "paint-correction",
    icon: <Shield size={22} />,
    name: "Paint Correction",
    desc: "Machine polish to eliminate swirl marks, light scratches, water spots, and oxidation.",
    price: "From $350",
    duration: "6–10 hrs",
    features: ["Paint inspection", "Multi-stage polish", "Swirl & scratch removal", "Water spot treatment", "Protective sealant"],
  },
  {
    id: "ceramic",
    icon: <Zap size={22} />,
    name: "Ceramic Coating",
    desc: "9H ceramic coating bonded to the paint for years of hydrophobic protection and gloss.",
    price: "From $800",
    duration: "1–2 days",
    features: ["Full paint correction prep", "9H ceramic application", "Cure & inspection", "2-year warranty", "Aftercare kit included"],
  },
  {
    id: "full-detail",
    icon: <Car size={22} />,
    name: "Full Detail Package",
    desc: "Our most comprehensive package — exterior and interior combined for a complete transformation.",
    price: "From $250",
    duration: "6–8 hrs",
    features: ["Exterior wash & clay", "Machine polish", "Interior deep clean", "Glass treatment", "All surfaces dressed"],
  },
];

const NAV_LINKS = [
  { label: "Home",     page: "home" },
  { label: "Services", page: "services" },
  { label: "About",    page: "about" },
  { label: "Contact",  page: "contact" },
];

/* ── Helpers ─────────────────────────────────────────────── */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function isValidPhone(val) {
  if (!val) return true;
  return /^[\d\s\-().+]{7,}$/.test(val);
}

/* ── Nav ─────────────────────────────────────────────────── */
function Nav({ current, onNav }) {
  const [open, setOpen] = useState(false);

  if (current === "wireframes") return null;

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => { onNav("home"); setOpen(false); }} aria-label="Evans Detailing home">
          <span className="nav-logo-mark">EVANS</span>
          <span className="nav-logo-sub">Detailing</span>
        </button>

        <nav className="nav-desktop">
          {NAV_LINKS.map(({ label, page }) => (
            <button key={page} className={`nav-link${current === page ? " active" : ""}`} onClick={() => onNav(page)}>
              {label}
            </button>
          ))}
          <button className="btn btn-primary nav-cta" onClick={() => onNav("contact")}>Book Now</button>
        </nav>

        <div className="nav-mobile">
          <button className="btn btn-primary nav-cta" onClick={() => { onNav("contact"); setOpen(false); }}>Book</button>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-dropdown">
          {NAV_LINKS.map(({ label, page }) => (
            <button key={page} className={`nav-dropdown-link${current === page ? " active" : ""}`} onClick={() => { onNav(page); setOpen(false); }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ── Home ────────────────────────────────────────────────── */
function HomePage({ onNav }) {
  return (
    <div>
      <section className="hero">
        <div className="hero-bg">
          <img className="hero-photo" src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1600&h=900&fit=crop&auto=format" alt="Professional car detailing in progress" />
          <div className="hero-grad-lr" />
          <div className="hero-grad-tb" />
        </div>

        <div className="hero-content">
          <span className="eyebrow">Richmond, VA · Professional Auto Detailing</span>
          <h1 className="hero-title">
            Your Car.<br />
            <span className="hero-title-red">Our Standard.</span>
          </h1>
          <p className="hero-sub">Studio-grade detailing that protects your investment. Every vehicle treated like our own.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNav("contact")}>
              Book a Detail <ArrowRight size={15} />
            </button>
            <button className="btn btn-outline" onClick={() => onNav("services")}>
              View Services
            </button>
          </div>
        </div>

        <div className="stat-strip">
          <div className="stat-strip-inner">
            {[
              { num: "900+", label: "Cars Detailed" },
              { num: "6 yrs", label: "In Business" },
              { num: "4.9★", label: "Google Rating" },
              { num: "Free", label: "Inspection" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Most Popular</span>
              <h2 className="section-title">Our Services</h2>
            </div>
            <button className="btn-ghost" onClick={() => onNav("services")}>
              All services <ChevronRight size={13} />
            </button>
          </div>
          <div className="card-grid">
            {SERVICES.slice(0, 3).map((svc) => (
              <div key={svc.id} className="svc-card">
                <div className="svc-icon">{svc.icon}</div>
                <h3 className="svc-name">{svc.name}</h3>
                <p className="svc-desc">{svc.desc}</p>
                <div className="svc-footer">
                  <div>
                    <div className="svc-price">{svc.price}</div>
                    <div className="svc-duration">{svc.duration}</div>
                  </div>
                  <button className="btn-book" onClick={() => onNav("contact", svc.id)}>Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border-top">
        <div className="wrap">
          <span className="eyebrow">Simple Process</span>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>How It Works</h2>
          <div className="steps-grid">
            {[
              { step: "01", title: "Book Online",        desc: "Choose your service and fill out a quick form. We confirm within one business day." },
              { step: "02", title: "Drop Off Your Car",  desc: "Bring your vehicle to our Richmond studio. We do a free walk-around inspection first." },
              { step: "03", title: "Pick Up Perfected",  desc: "We text you when it's ready. Drive away with a showroom finish, guaranteed." },
            ].map((item) => (
              <div key={item.step} className="step">
                <div className="step-num">{item.step}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <div>
            <h2 className="cta-band-title">Ready to Book?</h2>
            <p className="cta-band-sub">Mon–Sat · Same-week bookings welcome</p>
          </div>
          <button className="btn btn-white btn-full" onClick={() => onNav("contact")}>Schedule Now</button>
        </div>
      </div>
    </div>
  );
}

/* ── Services ────────────────────────────────────────────── */
function ServicesPage({ onNav }) {
  return (
    <div>
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <span className="eyebrow">What We Offer</span>
          <h1 className="page-title">Our Services</h1>
          <p className="page-desc">Every package is performed by trained technicians using professional-grade products. Free inspection included with every visit.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="svc-list">
            {SERVICES.map((svc) => (
              <div key={svc.id} className="svc-row">
                <div className="svc-row-inner">
                  <div className="svc-row-info">
                    <div className="svc-row-icon">{svc.icon}</div>
                    <div className="svc-row-body">
                      <div className="svc-row-meta">
                        <span className="svc-row-name">{svc.name}</span>
                        <span className="svc-row-price">{svc.price}</span>
                        <span className="svc-row-dur">· {svc.duration}</span>
                      </div>
                      <p className="svc-row-desc">{svc.desc}</p>
                      <div className="svc-features">
                        {svc.features.map((f) => (
                          <span key={f} className="svc-feature">
                            <span className="feature-dot" />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-full" style={{ flexShrink: 0 }} onClick={() => onNav("contact", svc.id)}>
                    Book This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-border-top">
        <div className="wrap">
          <div className="guarantee-strip">
            {[
              { icon: <Shield size={20} />,       title: "Satisfaction Guaranteed", desc: "Not satisfied? We redo it free." },
              { icon: <CheckCircle size={20} />,   title: "Free Inspection",         desc: "Every vehicle gets a walk-around before we start." },
              { icon: <Clock size={20} />,         title: "On-Time Promise",         desc: "Ready by the quoted time, always." },
            ].map((item) => (
              <div key={item.title} className="guarantee-item">
                <div className="guarantee-icon">{item.icon}</div>
                <h4 className="guarantee-title">{item.title}</h4>
                <p className="guarantee-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── About ───────────────────────────────────────────────── */
function AboutPage({ onNav }) {
  return (
    <div>
      <div className="about-hero">
        <div className="about-hero-inner">
          <div className="about-copy">
            <span className="eyebrow">Our Story</span>
            <h1 className="page-title" style={{ marginBottom: "1.25rem" }}>About Evans</h1>
            <p className="about-copy-p">
              Evans Detailing started in 2018 as a one-person operation run out of a two-car garage in Richmond, VA. Founder Marcus Evans had spent years working at dealerships and grew frustrated watching cars leave the lot in mediocre condition. He believed every vehicle deserved better.
            </p>
            <p className="about-copy-p">
              Today we are a three-person team with a dedicated studio, a loyal client base, and the same obsession with precision that started it all. We use only professional-grade products and we never rush a job.
            </p>
          </div>
          <div className="about-img-wrap">
            <img className="about-img" src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop&auto=format" alt="Evans Detailing studio" />
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stats-bar-inner">
          {[
            { num: "2018",  label: "Founded" },
            { num: "900+",  label: "Cars Detailed" },
            { num: "3",     label: "Technicians" },
            { num: "4.9★", label: "Google Rating" },
          ].map((s) => (
            <div key={s.label} className="stat-cell">
              <div className="stat-cell-num">{s.num}</div>
              <div className="stat-cell-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="section section-muted">
        <div className="wrap">
          <span className="eyebrow">The Team</span>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>Meet the Crew</h2>
          <div className="team-grid">
            {[
              { name: "Jerrod Evans", role: "Founder & Lead Detailer",      bio: "15 years in the trade. Started with a bucket and a dream — now runs one of Richmond's most trusted detail studios.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&auto=format" },
              { name: "Priya Shah",   role: "Paint Correction Specialist",   bio: "Certified in Gtechniq and Gyeon coatings. Has corrected over 600 vehicles and counting.",                           img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=480&fit=crop&auto=format" },
              { name: "Carlos Reyes", role: "Interior & Upholstery Tech",    bio: "Former luxury upholstery specialist. If the interior looks or smells rough, Carlos makes it right.",                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&auto=format" },
            ].map((m) => (
              <div key={m.name} className="team-member">
                <div className="team-photo-wrap">
                  <img className="team-photo" src={m.img} alt={m.name} />
                </div>
                <div className="team-role">{m.role}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="cta-band-inner">
          <h2 className="cta-band-title">Ready to Book?</h2>
          <button className="btn btn-white btn-full" onClick={() => onNav("contact")}>Get in Touch</button>
        </div>
      </div>
    </div>
  );
}

/* ── Contact ─────────────────────────────────────────────── */
function ContactPage({ preselectedService }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", vehicle: "",
    service: preselectedService || "",
    message: "",
  });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const e: any = {};
    if (!form.name.trim())                       e.name    = "Full name is required.";
    else if (form.name.trim().length < 2)        e.name    = "Please enter your full name.";
    if (!form.email.trim())                      e.email   = "Email address is required.";
    else if (!isValidEmail(form.email))          e.email   = "Please enter a valid email address.";
    if (form.phone && !isValidPhone(form.phone)) e.phone   = "Please enter a valid phone number.";
    if (!form.vehicle.trim())                    e.vehicle = "Vehicle info is required so we can prepare.";
    if (!form.message.trim())                    e.message = "Please tell us a bit about what you need.";
    else if (form.message.trim().length < 10)    e.message = "Please add a few more details.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.querySelector("[data-err]")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1000);
  }

  function FieldError({ msg }) {
    if (!msg) return null;
    return (
      <div className="field-err" data-err="true">
        <AlertCircle size={12} className="field-err-icon" />
        <span className="field-err-text">{msg}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <span className="eyebrow">Book a Detail</span>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-desc">Fill out the form and we will confirm your booking within one business day.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="contact-layout">
            <div className="studio-info">
              <h2 className="studio-info-title">Studio Info</h2>
              <div className="info-list">
                {[
                  { icon: <MapPin size={16} />, label: "Location", val: "482 Industrial Blvd, Suite 7\nRichmond, VA 23224" },
                  { icon: <Phone  size={16} />, label: "Phone",    val: "(804) 555-0187" },
                  { icon: <Mail   size={16} />, label: "Email",    val: "hello@evansdetailing.com" },
                  { icon: <Clock  size={16} />, label: "Hours",    val: "Mon–Fri: 8am – 6pm\nSat: 9am – 4pm\nSun: Closed" },
                ].map((item) => (
                  <div key={item.label} className="info-item">
                    <div className="info-icon">{item.icon}</div>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="know-box">
                <div className="know-label">Good to Know</div>
                <p className="know-text">Every vehicle gets a free walk-around inspection before we start. No surprise fees — we quote you up front based on the actual condition.</p>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon"><CheckCircle size={44} /></div>
                  <h3 className="success-title">Booking Request Sent</h3>
                  <p className="success-msg">Thanks, {form.name.split(" ")[0]}! We will review your request and confirm within one business day.</p>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">Full Name <span className="field-req">*</span></label>
                      <input type="text" className={`field-input${errors.name ? " err" : ""}`} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Marcus Evans" autoComplete="name" />
                      <FieldError msg={errors.name} />
                    </div>
                    <div className="field">
                      <label className="field-label">Email <span className="field-req">*</span></label>
                      <input type="email" className={`field-input${errors.email ? " err" : ""}`} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" />
                      <FieldError msg={errors.email} />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label className="field-label">Phone <span className="field-opt">(optional)</span></label>
                      <input type="tel" className={`field-input${errors.phone ? " err" : ""}`} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(804) 555-0100" autoComplete="tel" />
                      <FieldError msg={errors.phone} />
                    </div>
                    <div className="field">
                      <label className="field-label">Vehicle <span className="field-req">*</span></label>
                      <input type="text" className={`field-input${errors.vehicle ? " err" : ""}`} value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} placeholder="2022 BMW M3 Competition" />
                      <FieldError msg={errors.vehicle} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="field-label">Service <span className="field-opt">(optional)</span></label>
                    <select className="field-input" value={form.service} onChange={(e) => update("service", e.target.value)}>
                      <option value="">Not sure yet — let us recommend</option>
                      {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name} · {s.price}</option>)}
                    </select>
                  </div>

                  <div className="field">
                    <label className="field-label">Message <span className="field-req">*</span></label>
                    <textarea className={`field-input${errors.message ? " err" : ""}`} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your vehicle's condition and what you are hoping to achieve..." />
                    <FieldError msg={errors.message} />
                  </div>

                  {Object.keys(errors).length > 1 && (
                    <div className="err-summary">
                      <AlertCircle size={14} className="field-err-icon" />
                      <span className="err-summary-text">Please fix the highlighted fields above before submitting.</span>
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? <><span className="spinner" /> Sending…</> : "Send Booking Request"}
                  </button>

                  <p className="form-note">We respond within one business day. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Wireframes ──────────────────────────────────────────── */
function WBox({ label, h = null, cx = "", style: s = {} }) {
  return (
    <div className={`w-box${cx ? " " + cx : ""}`} style={{ ...(h ? { height: h } : {}), ...s }}>
      <span>{label}</span>
    </div>
  );
}

function WNote({ children }) {
  return (
    <div className="w-note">
      <span className="w-arr">→</span>
      <span className="w-note-txt">{children}</span>
    </div>
  );
}

function WZone({ title, note = "", children }) {
  return (
    <div className="w-zone">
      <div className="w-zone-hdr">
        <span className="w-zone-title">{title}</span>
        {note && <span className="w-zone-note">{note}</span>}
      </div>
      {children}
    </div>
  );
}

function WPageBreak({ num, title, route }) {
  return (
    <div className="w-pbreak">
      <div className="w-pnum">{num}</div>
      <div className="w-pinfo">
        <div className="w-ptitle">{title}</div>
        <div className="w-proute">{route}</div>
      </div>
      <div className="w-prule" />
    </div>
  );
}

function SharedWireNav() {
  return (
    <WZone title="Nav — fixed top bar" note="Global · all pages">
      <div className="w-row w-bg" style={{ padding: "0.375rem 0.625rem" }}>
        <WBox label="EVANS logo" h="1.75rem" style={{ width: "5rem" }} />
        <div style={{ flex: 1 }} />
        {["Home","Services","About","Contact"].map(n => <WBox key={n} label={n} h="1.5rem" style={{ width: "3.5rem" }} />)}
        <WBox label="Book Now" h="2rem" cx="w-box-cta" style={{ width: "5.5rem" }} />
      </div>
      <WNote>Fixed · semi-transparent dark bg. Active page link highlighted in red.</WNote>
      <WNote>Mobile: full nav replaced by Book button + hamburger → full-width dropdown.</WNote>
    </WZone>
  );
}

function SharedWireFooter() {
  return (
    <WZone title="Footer — shared across all pages" note="Global">
      <div className="w-row w-bg" style={{ justifyContent: "space-between", padding: "0.5rem 0.75rem" }}>
        <WBox label="EVANS logo" h="1.5rem" style={{ width: "5rem" }} />
        <div className="w-row" style={{ gap: "0.25rem" }}>
          {["Home","Services","About","Contact"].map(n => <WBox key={n} label={n} h="1.5rem" style={{ width: "3.5rem" }} />)}
        </div>
        <WBox label="© 2025 Evans" h="1.5rem" style={{ width: "5.5rem" }} />
      </div>
      <WNote>Logo left · nav center · copyright right. Dark bg, hairline top border.</WNote>
    </WZone>
  );
}

function WireframesPage({ onNav }) {
  return (
    <div className="w-doc">
      <div className="w-hdr">
        <div>
          <div className="w-hdr-tag">MVP Wireframe Document</div>
          <div className="w-hdr-title">Evans Detailing</div>
          <div className="w-hdr-meta">4-Page Website · MVP Rev 1.0 · {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          <div className="w-hdr-actions">
            <button className="w-btn-back" onClick={() => onNav("home")}>← Back to Site</button>
            <button className="w-btn-print" onClick={() => window.print()}><Printer size={13} /> Print / PDF</button>
          </div>
        </div>
      </div>

      <div className="w-bar">
        <div className="w-bar-label">Core MVP User Flow</div>
        <div className="w-flow">
          {["Home (hero + services preview)", "→", "Services (full list + Book button)", "→", "Contact (pre-filled service + form)", "→", "Success confirmation"].map((s, i) =>
            s === "→"
              ? <span key={i} className="w-flow-arr">→</span>
              : <span key={i} className="w-flow-step">{s}</span>
          )}
        </div>
      </div>

      <div className="w-legend">
        {[
          { cls: "",            label: "UI element / component" },
          { cls: "w-box-cta",  label: "Primary CTA (filled)" },
          { cls: "w-box-outline", label: "Secondary CTA (outline)" },
          { cls: "w-box-err",  label: "Error / validation state" },
        ].map((item) => (
          <div key={item.label} className="w-legend-item">
            <div className={`w-legend-sw w-box ${item.cls}`} style={{ height: "0.875rem", padding: 0 }} />
            <span className="w-legend-txt">{item.label}</span>
          </div>
        ))}
        <div className="w-legend-item">
          <div className="w-legend-sw" style={{ border: "1px dashed #d1d5db", height: "0.875rem" }} />
          <span className="w-legend-txt">Section boundary</span>
        </div>
      </div>

      <div className="w-body">
        {/* ── Page 01 ── */}
        <WPageBreak num="01" title="Home" route="Route: / · Entry point of the core user flow" />
        <SharedWireNav />

        <WZone title="Hero — viewport height" note="Section 1">
          <div className="w-bg" style={{ minHeight: "12rem" }}>
            <WBox label="Background photo (car detail) · opacity 25%" h="4.5rem" cx="w-w-full" />
            <div className="w-g2" style={{ marginTop: "0.5rem", gap: "0.5rem" }}>
              <div className="w-col">
                <WBox label="Eyebrow: 'Richmond, VA · Pro Detailing'" h="1.125rem" cx="w-w-full" />
                <WBox label="H1 Display — 2-line headline" h="3.5rem" cx="w-w-full" />
                <WBox label="Subheadline (1–2 lines)" h="2rem" cx="w-w-full" />
                <div className="w-row">
                  <WBox label="Book a Detail → [primary]" h="2.75rem" cx="w-box-cta" style={{ flex: 1 }} />
                  <WBox label="View Services [outline]" h="2.75rem" cx="w-box-outline" style={{ flex: 1 }} />
                </div>
              </div>
              <WBox label="Photo bleeds right edge" cx="w-hf" />
            </div>
          </div>
          <WNote>Both CTAs min-height 48px (touch target). Primary → Contact, secondary → Services.</WNote>
          <WNote>Gradient L→R over photo. Bottom gradient fades into stat strip.</WNote>
        </WZone>

        <WZone title="Stat Strip — pinned bottom of hero" note="Section 1b">
          <div className="w-g4 w-bg" style={{ padding: "0.25rem" }}>
            {["900+ Cars","6 yrs","4.9★ Rating","Free Inspect"].map(s => <WBox key={s} label={s} h="2.75rem" cx="w-w-full" />)}
          </div>
          <WNote>4-col · collapses to 2×2 on mobile.</WNote>
        </WZone>

        <WZone title="Services Preview — 3 cards" note="Section 2">
          <div className="w-row" style={{ justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <WBox label="H2 'Our Services'" h="2rem" style={{ width: "10rem" }} />
            <WBox label="All services →" h="1.5rem" cx="w-box-outline" style={{ width: "6rem" }} />
          </div>
          <div className="w-g3">
            {["Exterior Wash & Wax","Interior Detail","Paint Correction"].map(name => (
              <div key={name} className="w-col w-bg" style={{ padding: "0.5rem" }}>
                <WBox label="[Icon]" h="1.5rem" style={{ width: "2rem" }} />
                <WBox label={name} h="1.75rem" cx="w-w-full" />
                <WBox label="Short desc (2 lines)" h="2.25rem" cx="w-w-full" />
                <div className="w-row">
                  <WBox label="Price · Time" h="2rem" style={{ flex: 1 }} />
                  <WBox label="Book" h="2.25rem" cx="w-box-outline" style={{ width: "3.5rem" }} />
                </div>
              </div>
            ))}
          </div>
          <WNote>"Book" → Contact with service pre-selected in dropdown.</WNote>
          <WNote>3-col (desktop) → 2-col (tablet) → 1-col (mobile).</WNote>
        </WZone>

        <WZone title="How It Works — 3 steps" note="Section 3">
          <div className="w-g3 w-bg" style={{ padding: "0.5rem", gap: 0 }}>
            {["01 Book Online","02 Drop Off Car","03 Pick Up Perfected"].map((s, i) => (
              <div key={s} className={`w-col${i < 2 ? " w-divr" : ""}`} style={{ padding: "0.5rem", gap: "0.375rem" }}>
                <div style={{ color: "#d1d5db", fontSize: "1.75rem", fontWeight: 900, fontFamily: "var(--font-display)", lineHeight: 1 }}>{s.split(" ")[0]}</div>
                <WBox label={s.replace(/^\d+ /,"")} h="1.75rem" cx="w-w-full" />
                <WBox label="Short step description" h="2.5rem" cx="w-w-full" />
              </div>
            ))}
          </div>
          <WNote>Step number large and faded. Mobile: stacks vertically.</WNote>
        </WZone>

        <WZone title="CTA Band" note="Section 4">
          <div className="w-row w-box-cta" style={{ padding: "0.75rem 1rem", justifyContent: "space-between" }}>
            <div className="w-col" style={{ gap: "0.25rem", flex: 1 }}>
              <div style={{ height: "1.75rem", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}><span style={{ color: "#fff", fontSize: "0.55rem" }}>"Ready to Book?" heading</span></div>
              <div style={{ height: "1.25rem", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}><span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55rem" }}>Subtext: Mon–Sat · same-week ok</span></div>
            </div>
            <WBox label="Schedule Now" h="2.75rem" cx="w-box-outline" style={{ width: "8rem", marginLeft: "0.75rem", flexShrink: 0 }} />
          </div>
          <WNote>Full-width red band. Full-width white CTA button on mobile.</WNote>
        </WZone>
        <SharedWireFooter />

        {/* ── Page 02 ── */}
        <WPageBreak num="02" title="Services" route="Route: /services · Full service list — step 2 of core flow" />
        <SharedWireNav />

        <WZone title="Page Header" note="Section 1">
          <div className="w-col w-bg" style={{ padding: "0.75rem", gap: "0.375rem" }}>
            <WBox label="Eyebrow 'What We Offer'" h="1.125rem" style={{ width: "7rem" }} />
            <WBox label="H1 'Our Services'" h="2.75rem" style={{ width: "14rem" }} />
            <WBox label="Supporting paragraph — 2 lines" h="1.75rem" style={{ width: "65%" }} />
          </div>
        </WZone>

        <WZone title="Service List — stacked rows (5 total)" note="Section 2">
          {["Exterior Wash & Wax · $120","Interior Detail · $150","Paint Correction · $350","Ceramic Coating · $800","Full Detail Package · $250"].map((name, i) => (
            <div key={i} className="w-bg" style={{ marginBottom: "0.375rem", padding: "0.5rem" }}>
              <div className="w-row" style={{ gap: "0.5rem", alignItems: "flex-start" }}>
                <div className="w-col" style={{ flex: 1, gap: "0.3rem" }}>
                  <WBox label={name} h="1.75rem" cx="w-w-full" />
                  <WBox label="Description + feature tags" h="2.25rem" cx="w-w-full" />
                </div>
                <WBox label="Book This" h="2.75rem" cx="w-box-cta" style={{ width: "6rem", flexShrink: 0 }} />
              </div>
            </div>
          ))}
          <WNote>"Book This" → Contact with service pre-selected. Mobile: button full-width below info.</WNote>
          <WNote>Hover: border shifts to red.</WNote>
        </WZone>

        <WZone title="Guarantee Strip — 3 columns" note="Section 3">
          <div className="w-g3 w-bg" style={{ padding: "0.5rem" }}>
            {["Satisfaction Guaranteed","Free Inspection","On-Time Promise"].map(t => (
              <div key={t} className="w-col" style={{ alignItems: "center", gap: "0.25rem", textAlign: "center", padding: "0.375rem" }}>
                <WBox label="[Icon]" h="1.5rem" style={{ width: "2rem" }} />
                <WBox label={t} h="1.625rem" cx="w-w-full" />
                <WBox label="Short descriptor" h="1.375rem" cx="w-w-full" />
              </div>
            ))}
          </div>
          <WNote>Reassurance only — no CTA. 3-col → 1-col on mobile.</WNote>
        </WZone>
        <SharedWireFooter />

        {/* ── Page 03 ── */}
        <WPageBreak num="03" title="About Us" route="Route: /about · Brand story + team" />
        <SharedWireNav />

        <WZone title="Story Section — 2-col split" note="Section 1">
          <div className="w-g2 w-bg" style={{ padding: "0.625rem" }}>
            <div className="w-col" style={{ gap: "0.375rem" }}>
              <WBox label="Eyebrow 'Our Story'" h="1.125rem" style={{ width: "6rem" }} />
              <WBox label="H1 'About Evans'" h="2.75rem" style={{ width: "12rem" }} />
              <WBox label="Brand story paragraph 1 (4–5 lines)" h="4rem" cx="w-w-full" />
              <WBox label="Brand story paragraph 2 (3–4 lines)" h="3.25rem" cx="w-w-full" />
            </div>
            <WBox label="Studio photo" cx="w-hf" />
          </div>
          <WNote>Stacks to 1-col on mobile — photo below copy.</WNote>
        </WZone>

        <WZone title="Stats Bar — 4 cells" note="Section 2">
          <div className="w-g4" style={{ gap: 0, background: "#e5e7eb" }}>
            {["2018 Founded","900+ Detailed","3 Techs","4.9★ Rating"].map((s, i) => (
              <div key={s} className={`w-col${i < 3 ? " w-divr" : ""}`} style={{ padding: "0.625rem 0.375rem", textAlign: "center", gap: "0.25rem" }}>
                <div style={{ height: "2rem", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(200,16,46,0.15)", color: "var(--accent)", fontWeight: 900, fontSize: "0.6rem", fontFamily: "var(--font-display)" }}>{s.split(" ")[0]}</div>
                <div style={{ height: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: "#9ca3af" }}>{s.replace(/^\S+ /,"")}</div>
              </div>
            ))}
          </div>
          <WNote>Collapses to 2×2 on mobile.</WNote>
        </WZone>

        <WZone title="Team — 3 cards" note="Section 3">
          <div className="w-g3" style={{ gap: "0.75rem" }}>
            {["Marcus Evans · Founder","Priya Shah · Paint Spec.","Carlos Reyes · Interior"].map(m => (
              <div key={m} className="w-col" style={{ gap: "0.3rem" }}>
                <WBox label="Portrait photo (grayscale → color on hover)" h="7rem" cx="w-w-full" />
                <WBox label="Role label (small red)" h="1rem" cx="w-w-full" />
                <WBox label={m.split("·")[0].trim()} h="1.75rem" cx="w-w-full" />
                <WBox label="Bio (2–3 lines)" h="2.25rem" cx="w-w-full" />
              </div>
            ))}
          </div>
          <WNote>3-col → 2-col (tablet) → 1-col (mobile). CSS filter grayscale removed on hover.</WNote>
        </WZone>

        <WZone title="CTA Band" note="Section 4">
          <div className="w-row w-box-cta" style={{ padding: "0.75rem 1rem", justifyContent: "space-between" }}>
            <div style={{ height: "2rem", flex: 1, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", paddingLeft: "0.5rem" }}>
              <span style={{ color: "#fff", fontSize: "0.55rem" }}>"Ready to Book?" heading</span>
            </div>
            <WBox label="Get in Touch" h="2.75rem" cx="w-box-outline" style={{ width: "7rem", marginLeft: "0.75rem", flexShrink: 0 }} />
          </div>
        </WZone>
        <SharedWireFooter />

        {/* ── Page 04 ── */}
        <WPageBreak num="04" title="Contact Us" route="Route: /contact · Booking form — end of core user flow" />
        <SharedWireNav />

        <WZone title="Page Header" note="Section 1">
          <div className="w-col w-bg" style={{ padding: "0.75rem", gap: "0.375rem" }}>
            <WBox label="Eyebrow 'Book a Detail'" h="1.125rem" style={{ width: "6.5rem" }} />
            <WBox label="H1 'Contact Us'" h="2.75rem" style={{ width: "12rem" }} />
            <WBox label="Supporting paragraph" h="1.625rem" style={{ width: "60%" }} />
          </div>
        </WZone>

        <WZone title="Main Content — Info (2 cols) + Form (3 cols)" note="Section 2">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "0.75rem" }}>
            <div className="w-col" style={{ gap: "0.5rem" }}>
              <WBox label="'Studio Info' heading" h="1.75rem" cx="w-w-full" />
              {["Location · address","Phone · number","Email · address","Hours · schedule"].map(item => (
                <div key={item} className="w-row" style={{ gap: "0.25rem" }}>
                  <WBox label="[Icon]" h="1.25rem" style={{ width: "1.25rem", flexShrink: 0 }} />
                  <WBox label={item} h="2.25rem" style={{ flex: 1 }} />
                </div>
              ))}
              <WBox label="'Good to Know' note box" h="3.5rem" cx="w-w-full" />
            </div>
            <div className="w-col" style={{ gap: "0.5rem" }}>
              <div className="w-g2">
                <div className="w-col" style={{ gap: "0.2rem" }}><WBox label="Full Name *" h="1rem" cx="w-w-full" /><WBox label="[text input]" h="2.75rem" cx="w-w-full" /></div>
                <div className="w-col" style={{ gap: "0.2rem" }}><WBox label="Email *" h="1rem" cx="w-w-full" /><WBox label="[email input]" h="2.75rem" cx="w-w-full" /></div>
              </div>
              <div className="w-g2">
                <div className="w-col" style={{ gap: "0.2rem" }}><WBox label="Phone (optional)" h="1rem" cx="w-w-full" /><WBox label="[tel input]" h="2.75rem" cx="w-w-full" /></div>
                <div className="w-col" style={{ gap: "0.2rem" }}><WBox label="Vehicle *" h="1rem" cx="w-w-full" /><WBox label="[year/make/model]" h="2.75rem" cx="w-w-full" /></div>
              </div>
              <div className="w-col" style={{ gap: "0.2rem" }}>
                <WBox label="Service (optional — pre-fills from Services page)" h="1rem" cx="w-w-full" />
                <WBox label="[select dropdown]" h="2.75rem" cx="w-w-full" />
              </div>
              <div className="w-col" style={{ gap: "0.2rem" }}>
                <WBox label="Message *" h="1rem" cx="w-w-full" />
                <WBox label="[textarea — 5 rows]" h="5.5rem" cx="w-w-full" />
              </div>
              <div style={{ border: "1px dashed #fca5a5", padding: "0.5rem", background: "#fff7f7" }}>
                <div style={{ color: "#ef4444", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.375rem" }}>Validation / Error States</div>
                <div className="w-col" style={{ gap: "0.25rem" }}>
                  <WBox label="[input with red border — inline ⚠ icon + error message below]" h="2.75rem" cx="w-box-err w-w-full" />
                  <WBox label="Error summary banner (if multiple fields fail at once)" h="1.75rem" cx="w-box-err w-w-full" />
                </div>
              </div>
              <WBox label="Send Booking Request [submit · spinner during async]" h="3rem" cx="w-box-cta w-w-full" />
              <WBox label="Privacy note · centered · small" h="1.25rem" cx="w-w-full" />
            </div>
          </div>
          <WNote>Service dropdown pre-fills if user arrives via "Book" / "Book This" button — state passed via navigate().</WNote>
          <WNote>Validation fires on submit. Required: Name, Email, Vehicle, Message. Phone optional, validated if provided.</WNote>
          <WNote>Submit: spinner + "Sending…" during 1s async delay, then form replaced by success state.</WNote>
          <WNote>Mobile: info col stacks below form. All field-rows collapse to 1-col.</WNote>
        </WZone>

        <WZone title="Success State — replaces form on submit" note="Section 2b">
          <div className="w-col w-bg" style={{ alignItems: "center", padding: "2rem", gap: "0.625rem" }}>
            <WBox label="✓ Checkmark icon (red, large)" h="2.75rem" style={{ width: "2.75rem", borderRadius: "50%" }} />
            <WBox label="H3 'Booking Request Sent'" h="2rem" style={{ width: "14rem" }} />
            <WBox label="Confirmation with user's first name" h="1.75rem" style={{ width: "16rem" }} />
          </div>
          <WNote>Entire form area replaced — no page reload. First name extracted from Name field.</WNote>
        </WZone>
        <SharedWireFooter />

        {/* Spec notes */}
        <div className="w-spec">
          <div className="w-spec-title">MVP Specification Notes</div>
          <div className="w-spec-grid">
            {[
              ["Core User Flow",    "Home → Services (optional) → Contact (pre-selected service) → Success. Every CTA routes correctly end-to-end."],
              ["Form Validation",   "Client-side only for MVP. Required: Name, Email, Vehicle, Message. Phone optional but validated if provided. Email regex checked. Inline errors per field on submit attempt."],
              ["Pre-fill Behavior", "Service dropdown pre-fills when user arrives via Book / Book This. Service ID passed through navigate(page, serviceId) and read from parent state."],
              ["Mobile Strategy",   "Min tap target 48px on all buttons and inputs. Grids collapse at 640px breakpoint. Nav → hamburger. Contact info stacks below form on mobile."],
              ["Error UX",          "Errors clear on field change. Multiple errors show summary banner. On failed submit: scroll to first invalid field. Submit disabled + spinner while async request runs."],
              ["Styling",           "Single CSS file (index.css) — no Tailwind utilities in markup. Design tokens as CSS custom properties. Named semantic class names throughout."],
              ["Typography",        "Display: Barlow Condensed 700/900. Body: Inter 400/500/600. Loaded from Google Fonts."],
              ["Out of Scope",      "Backend form submission, authentication, CMS, payments, map embed, admin dashboard."],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="w-spec-k">{k}</div>
                <div className="w-spec-v">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer({ onNav }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <button className="footer-logo" onClick={() => onNav("home")}>
          <span className="footer-logo-mark">EVANS</span>
          <span className="footer-logo-sub">Detailing</span>
        </button>
        <nav className="footer-nav">
          {NAV_LINKS.map(({ label, page }) => (
            <button key={page} className="footer-link" onClick={() => onNav(page)}>{label}</button>
          ))}
        </nav>
        <span className="footer-copy">© {new Date().getFullYear()} Evans Detailing</span>
      </div>
    </footer>
  );
}

/* ── App Root ─────────────────────────────────────────────── */
export default function App() {
  const [page, setPage]                       = useState("home");
  const [preselectedService, setPreselected]  = useState(undefined);

  function navigate(p, service = undefined) {
    setPreselected(service);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (page === "wireframes") return <WireframesPage onNav={navigate} />;

  return (
    <div className="site">
      <Nav current={page} onNav={navigate} />
      <main>
        {page === "home"     && <HomePage     onNav={navigate} />}
        {page === "services" && <ServicesPage onNav={navigate} />}
        {page === "about"    && <AboutPage    onNav={navigate} />}
        {page === "contact"  && <ContactPage  preselectedService={preselectedService} />}
      </main>
      <Footer onNav={navigate} />
    </div>
  );
}
