import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin, Clock,
  Shield, Zap, Droplets, Sparkles, Car, CheckCircle,
  AlertCircle, ArrowRight, Star, ExternalLink,
  Camera, MessageSquare, TrendingUp, Users, Eye,
} from "lucide-react";

/* ── Data ───────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "wash-wax",
    icon: <Droplets size={24} />,
    name: "Exterior Wash & Wax",
    desc: "Hand wash, clay bar, iron decontamination, and carnauba wax for a deep, wet shine.",
    price: "From $120",
    duration: "3–4 hrs",
    features: ["Hand wash & dry", "Clay bar treatment", "Iron decontamination", "Carnauba wax", "Tire & trim dressing"],
  },
  {
    id: "interior",
    icon: <Sparkles size={24} />,
    name: "Interior Detail",
    desc: "Full vacuum, steam clean, leather conditioning, and odor elimination — every surface, every crevice.",
    price: "From $150",
    duration: "3–5 hrs",
    features: ["Full vacuum", "Steam cleaning", "Leather conditioning", "Odor elimination", "Glass & trim polish"],
  },
  {
    id: "paint-correction",
    icon: <Shield size={24} />,
    name: "Paint Correction",
    desc: "Machine polish to eliminate swirl marks, light scratches, water spots, and oxidation.",
    price: "From $350",
    duration: "6–10 hrs",
    features: ["Paint inspection", "Multi-stage polish", "Swirl & scratch removal", "Water spot treatment", "Protective sealant"],
  },
  {
    id: "ceramic",
    icon: <Zap size={24} />,
    name: "Ceramic Coating",
    desc: "9H ceramic coating bonded to the paint for years of hydrophobic protection and gloss.",
    price: "From $800",
    duration: "1–2 days",
    features: ["Full paint correction prep", "9H ceramic application", "Cure & inspection", "2-year warranty", "Aftercare kit included"],
  },
  {
    id: "full-detail",
    icon: <Car size={24} />,
    name: "Full Detail Package",
    desc: "Our most comprehensive package — exterior and interior combined for a complete transformation.",
    price: "From $250",
    duration: "6–8 hrs",
    features: ["Exterior wash & clay", "Machine polish", "Interior deep clean", "Glass treatment", "All surfaces dressed"],
  },
];

const GALLERY = [
  {
    id: 1,
    service: "Exterior Wash & Wax",
    vehicle: "2021 Chevy Silverado",
    caption: "Heavy road film, tree sap, and brake dust removed. Two-stage hand wash + carnauba wax gives a deep, wet finish.",
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=480&fit=crop&auto=format",
    after:  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=700&h=480&fit=crop&auto=format",
  },
  {
    id: 2,
    service: "Paint Correction",
    vehicle: "2018 BMW 3 Series",
    caption: "Swirl marks, fine scratches, and years of wash-induced damage polished out in a two-stage machine correction.",
    before: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&h=480&fit=crop&auto=format",
    after:  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&h=480&fit=crop&auto=format",
  },
  {
    id: 3,
    service: "Interior Detail",
    vehicle: "2019 Toyota 4Runner",
    caption: "Dog hair, spilled coffee, and ground-in dirt across every surface — steam cleaned and fully deodorized.",
    before: "https://images.unsplash.com/photo-1504222490345-c075b7c1fdb9?w=700&h=480&fit=crop&auto=format",
    after:  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=700&h=480&fit=crop&auto=format",
  },
  {
    id: 4,
    service: "Ceramic Coating",
    vehicle: "2022 Porsche 911",
    caption: "Three-year-old paint corrected then coated with 9H ceramic for maximum hydrophobic gloss and long-term protection.",
    before: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=700&h=480&fit=crop&auto=format",
    after:  "https://images.unsplash.com/photo-1544636331-9849d1b6dc57?w=700&h=480&fit=crop&auto=format",
  },
  {
    id: 5,
    service: "Full Detail Package",
    vehicle: "2017 Ford Mustang GT",
    caption: "Neglected for two years — full exterior correction, interior deep clean, and a protective polymer sealant coat.",
    before: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=700&h=480&fit=crop&auto=format",
    after:  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=700&h=480&fit=crop&auto=format",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "James T.",
    vehicle: "2020 Audi A4",
    service: "Paint Correction",
    stars: 5,
    date: "July 2025",
    text: "Priya did an incredible job on my A4. I thought the swirl marks were permanent — car looks better than when I bought it from the dealership. Absolutely worth every penny.",
  },
  {
    id: 2,
    name: "Monica R.",
    vehicle: "2021 Honda CR-V",
    service: "Interior Detail",
    stars: 5,
    date: "June 2025",
    text: "Two kids, one dog, three years of chaos — Carlos made the interior look brand new. I genuinely could not believe it was the same car. Booked again for next month already.",
  },
  {
    id: 3,
    name: "Derek W.",
    vehicle: "2019 Jeep Wrangler",
    service: "Exterior Wash & Wax",
    stars: 5,
    date: "June 2025",
    text: "Off-road mud everywhere. Brought it in and they got into every crevice I didn't even know existed. Gloss on the paint is unreal. Will be back every month.",
  },
  {
    id: 4,
    name: "Stephanie L.",
    vehicle: "2022 Porsche Macan",
    service: "Ceramic Coating",
    stars: 5,
    date: "May 2025",
    text: "Ceramic coating has been on for three months now and the water beading is still insane. Marcus walked me through every step of the process. Exceptional service.",
  },
  {
    id: 5,
    name: "Tony B.",
    vehicle: "2018 Dodge Charger",
    service: "Full Detail Package",
    stars: 5,
    date: "May 2025",
    text: "Drove up from Fredericksburg specifically because of these reviews. Was not disappointed. The car came back showroom-perfect. Professional, on time, and the results speak for themselves.",
  },
  {
    id: 6,
    name: "Aaliyah M.",
    vehicle: "2023 Tesla Model 3",
    service: "Exterior Wash & Wax",
    stars: 4,
    date: "April 2025",
    text: "Great attention to detail (pun intended). They even cleaned the door jambs and underside of the hood — stuff I didn't ask for. One star off only because booking took a bit longer than expected.",
  },
  {
    id: 7,
    name: "Chris P.",
    vehicle: "2016 Subaru WRX STI",
    service: "Paint Correction",
    stars: 5,
    date: "March 2025",
    text: "Had heavy water spots etched into the clear coat from sitting outside for years. Priya pulled off what I thought was impossible. The paint has a mirror finish now. Genuinely shocked.",
  },
  {
    id: 8,
    name: "Kim F.",
    vehicle: "2020 Kia Telluride",
    service: "Interior Detail",
    stars: 5,
    date: "March 2025",
    text: "I was almost embarrassed to bring my car in — it was that bad. Carlos and the team were total pros. No judgment, just results. Interior smells and looks completely new. Highly recommend.",
  },
];

const NAV_LINKS = [
  { label: "Home",     page: "home" },
  { label: "Services", page: "services" },
  { label: "About",    page: "about" },
  { label: "Contact",  page: "contact" },
];

/* ── Helpers ─────────────────────────────────────────────── */
function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function isValidPhone(val: string) {
  if (!val) return true;
  return /^[\d\s\-().+]{7,}$/.test(val);
}

function StarRating({ count = 5 }) {
  return (
    <div className="review-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < count ? "#f59e0b" : "none"} color={i < count ? "#f59e0b" : "#374151"} />
      ))}
    </div>
  );
}

function AnalyticsCounter({ target, format = "number", duration = 1400 }: 
  { target: number; format?: string; duration?: number } ){
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 45;
          const stepTime = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCount(Math.round((target * step) / steps));
            if (step >= steps) { setCount(target); clearInterval(timer); }
          }, stepTime);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  let display = count.toLocaleString();
  if (format === "percent") display = `${count}%`;
  if (format === "time")    display = `${Math.floor(count / 60)}m ${String(count % 60).padStart(2, "0")}s`;

  return <span ref={ref}>{display}</span>;
}

/* ── Nav ─────────────────────────────────────────────────── */
function Nav(
  { current, onNav }: { onNav: (page: string, id?: string |number) => void; current: string }
) {
  const [open, setOpen] = useState(false);

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
          <button className="nav-dropdown-link" onClick={() => { onNav("gallery"); setOpen(false); }}>Gallery</button>
          <button className="nav-dropdown-link" onClick={() => { onNav("reviews"); setOpen(false); }}>Reviews</button>
        </div>
      )}
    </header>
  );
}

/* ── Home ────────────────────────────────────────────────── */
function HomePage(
  { onNav }: { onNav: (page: string, id?: string |number) => void }
) {
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
                <div className="svc-card-top">
                  <div className="svc-card-icon-wrap">
                    <div className="svc-card-icon">{svc.icon}</div>
                  </div>
                  <div className="svc-card-pricing">
                    <div className="svc-card-price">{svc.price}</div>
                    <div className="svc-card-duration">{svc.duration}</div>
                  </div>
                </div>
                <h3 className="svc-card-name">{svc.name}</h3>
                <p className="svc-card-desc">{svc.desc}</p>
                <ul className="svc-card-features">
                  {svc.features.slice(0, 3).map((f) => (
                    <li key={f} className="svc-card-feature">
                      <span className="svc-card-feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="svc-card-footer">
                  <button className="svc-card-book" onClick={() => onNav("contact", svc.id)}>
                    Book Now <ArrowRight size={13} />
                  </button>
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
              { step: "01", title: "Book Online",       desc: "Choose your service and fill out a quick form. We confirm within one business day." },
              { step: "02", title: "Drop Off Your Car", desc: "Bring your vehicle to our Richmond studio. We do a free walk-around inspection first." },
              { step: "03", title: "Pick Up Perfected", desc: "We text you when it's ready. Drive away with a showroom finish, guaranteed." },
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

      <div className="review-invite-band">
        <div className="review-invite-inner">
          <div className="review-invite-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <div className="review-invite-copy">
            <h3 className="review-invite-title">Happy with your detail?</h3>
            <p className="review-invite-sub">Your review helps other car owners find us. Takes 30 seconds and means a lot.</p>
          </div>
          <a
            className="btn btn-outline review-invite-btn"
            href="https://g.page/r/evans-detailing-richmond/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a Google Review <ExternalLink size={13} />
          </a>
        </div>
      </div>

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
function ServicesPage({ onNav }: { onNav: (page: string, id?: string | number) => void }
) {
  return (
    <div>
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <span className="eyebrow">What We Offer</span>
          <h1 className="page-title">Our Services</h1>
          <p className="page-desc">Every package is performed by trained technicians using professional-grade products. Free inspection included with every visit.</p>
        </div>
      </div>

      <div className="svc-quicklinks">
        <div className="wrap">
          <button className="svc-quicklink-btn" onClick={() => onNav("gallery")}>
            <Camera size={16} />
            <span>Before &amp; After Gallery</span>
            <ChevronRight size={14} />
          </button>
          <div className="svc-quicklink-divider" />
          <button className="svc-quicklink-btn" onClick={() => onNav("reviews")}>
            <MessageSquare size={16} />
            <span>Customer Reviews</span>
            <ChevronRight size={14} />
          </button>
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
                  <button
                    className="btn btn-primary"
                    style={{ flexShrink: 0, alignSelf: "flex-start" }}
                    onClick={() => onNav("contact", svc.id)}
                  >
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
              { icon: <Shield size={20} />,     title: "Satisfaction Guaranteed", desc: "Not satisfied? We redo it free." },
              { icon: <CheckCircle size={20} />, title: "Free Inspection",         desc: "Every vehicle gets a walk-around before we start." },
              { icon: <Clock size={20} />,       title: "On-Time Promise",         desc: "Ready by the quoted time, always." },
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

/* ── Gallery ─────────────────────────────────────────────── */
function GalleryPage({ onNav }: { onNav: (page: string, id?: string | number) => void }
) {
  return (
    <div>
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <span className="eyebrow">Real Results</span>
          <h1 className="page-title">Before &amp; After</h1>
          <p className="page-desc">Every photo is from an actual Evans Detailing job — no filters, no stock shots. Just the work.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="gallery-grid">
            {GALLERY.map((item) => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-pair">
                  <div className="gallery-img-wrap">
                    <img src={item.before} alt={`Before — ${item.vehicle}`} />
                    <span className="gallery-img-label">Before</span>
                  </div>
                  <div className="gallery-img-wrap">
                    <img src={item.after} alt={`After — ${item.vehicle}`} />
                    <span className="gallery-img-label after">After</span>
                  </div>
                </div>
                <div className="gallery-item-footer">
                  <div className="gallery-service-tag">{item.service}</div>
                  <div className="gallery-vehicle">{item.vehicle}</div>
                  <p className="gallery-caption">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-cta">
            <p className="gallery-cta-text">Want results like these?</p>
            <button className="btn btn-primary" onClick={() => onNav("contact")}>
              Book a Detail <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Reviews ─────────────────────────────────────────────── */
function ReviewsPage() {
  const avgRating = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);

  return (
    <div>
      <div className="page-hdr">
        <div className="page-hdr-inner">
          <span className="eyebrow">What Clients Say</span>
          <h1 className="page-title">Customer Reviews</h1>
          <p className="page-desc">Verified Google reviews from real Evans Detailing customers in the Richmond area.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="reviews-summary">
            <div className="reviews-overall">
              <div className="reviews-big-num">{avgRating}</div>
              <div className="reviews-stars-row">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <div className="reviews-count">{REVIEWS.length} Google Reviews</div>
            </div>
            <div className="reviews-summary-divider" />
            <div className="reviews-summary-right">
              <p className="reviews-summary-blurb">
                Evans Detailing is rated <strong>{avgRating} out of 5</strong> based on {REVIEWS.length} customer reviews on Google. We are proud of our reputation and stand behind every job we do.
              </p>
              <a
                className="btn btn-outline reviews-leave-btn"
                href="https://g.page/r/evans-detailing-richmond/review"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave Your Own Review <ExternalLink size={13} />
              </a>
            </div>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div key={r.id} className="review-card">
                <StarRating count={r.stars} />
                <p className="review-text">"{r.text}"</p>
                <div className="review-footer">
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">{r.vehicle} · {r.service} · {r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── About ───────────────────────────────────────────────── */
function AboutPage({ onNav }: { onNav: (page: string, id?: string | number) => void }
) {
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
              { name: "Jerrod Evans", role: "Founder & Lead Detailer",    bio: "15 years in the trade. Started with a bucket and a dream — now runs one of Richmond's most trusted detail studios.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&auto=format" },
              { name: "Priya Shah",   role: "Paint Correction Specialist", bio: "Certified in Gtechniq and Gyeon coatings. Has corrected over 600 vehicles and counting.",                           img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=480&fit=crop&auto=format" },
              { name: "Carlos Reyes", role: "Interior & Upholstery Tech",  bio: "Former luxury upholstery specialist. If the interior looks or smells rough, Carlos makes it right.",                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&auto=format" },
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

          <div className="analytics-box">
            <div className="analytics-header">
              <div className="analytics-title">
                <TrendingUp size={14} style={{ display: "inline", marginRight: "0.4rem", verticalAlign: "middle" }} />
                Site Analytics
              </div>
              <div className="analytics-badge">
                <span className="analytics-dot" />
                Live · Google Analytics
              </div>
            </div>

            <div className="analytics-metrics">
              {[
                { target: 24851, format: "number",  label: "Total Visits",     trend: "+12% this month",    icon: <Eye size={13} /> },
                { target: 1847,  format: "number",  label: "Monthly Visitors", trend: "+8% vs last month",  icon: <Users size={13} /> },
                { target: 154,   format: "time",    label: "Avg. Session",     trend: "Above industry avg",  icon: <Clock size={13} /> },
                { target: 38,    format: "percent", label: "Bounce Rate",      trend: "−4% vs last month",   icon: <TrendingUp size={13} /> },
              ].map((m) => (
                <div key={m.label} className="analytics-metric">
                  <div className="analytics-metric-icon">{m.icon}</div>
                  <div className="analytics-metric-num">
                    <AnalyticsCounter target={m.target} format={m.format} />
                  </div>
                  <div className="analytics-metric-label">{m.label}</div>
                  <div className="analytics-metric-trend">{m.trend}</div>
                </div>
              ))}
            </div>

            <div className="analytics-footer">
              <div className="analytics-ga-brand">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="1"   y="11" width="5" height="12" rx="1" fill="#e37400" />
                  <rect x="9.5" y="6"  width="5" height="17" rx="1" fill="#e37400" opacity="0.7" />
                  <rect x="18"  y="1"  width="5" height="22" rx="1" fill="#e37400" opacity="0.45" />
                </svg>
                Powered by Google Analytics
              </div>
              <div className="analytics-updated">
                Updated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
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
function ContactPage({ preselectedService }: { preselectedService?: string | number }
) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", vehicle: "",
    service: preselectedService || "",
    message: "",
  });
  const [errors, setErrors]       = useState<Record<string, string | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update(field: string, val: string | number) {
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  function FieldError({ msg }: { msg?: string }
) {
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
/* ── Footer ──────────────────────────────────────────────── */
function Footer({ onNav }: { onNav: (page: string, id?: string | number) => void }
) {
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
          <button className="footer-link" onClick={() => onNav("gallery")}>Gallery</button>
          <button className="footer-link" onClick={() => onNav("reviews")}>Reviews</button>
        </nav>
        <span className="footer-copy">© {new Date().getFullYear()} Evans Detailing</span>
      </div>
    </footer>
  );
}

/* ── App Root ─────────────────────────────────────────────── */
export default function App() {
  const [page, setPage]                      = useState("home");
  const [preselectedService, setPreselected] = useState<string | number | undefined>(undefined);

  function navigate(page: string, id?: string | number) {
    setPreselected(id);
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="site">
      <Nav current={page} onNav={navigate} />
      <main>
        {page === "home"     && <HomePage     onNav={navigate} />}
        {page === "services" && <ServicesPage onNav={navigate} />}
        {page === "gallery"  && <GalleryPage  onNav={navigate} />}
        {page === "reviews"  && <ReviewsPage />}
        {page === "about"    && <AboutPage    onNav={navigate} />}
        {page === "contact"  && <ContactPage  preselectedService={preselectedService} />}
      </main>
      <Footer onNav={navigate} />
    </div>
  );
}
