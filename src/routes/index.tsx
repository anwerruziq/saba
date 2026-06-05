import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Plane, Clock, Shield, Star, ChevronDown, RefreshCw } from "lucide-react";
import logo from "../assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "سبأ للطيران" },
      { name: "description", content: "سبأ للطيران - نصلك بأهم الوجهات الإقليمية والدولية بخدمة مميزة" },
      { property: "og:title", content: "سبأ للطيران" },
      { property: "og:description", content: "سبأ للطيران - نصلك بأهم الوجهات الإقليمية والدولية بخدمة مميزة" },
    ],
  }),
  component: Index,
} as any));

const NAV_ITEMS = ["الرئيسية", "قصتنا", "الوجهات", "مزايانا", "الأسئلة", "الحجز"];
const NAV_HREFS  = ["start",   "story",  "destinations",   "benefits", "faq", "booking"];
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

const RevealOnScroll = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const IATA_CITY: Record<string, string> = {
  "SAH": "صنعاء", "AMM": "عمّان", "JED": "جدة", "ADE": "عدن",
  "CAI": "القاهرة", "IST": "إسطنبول", "MCT": "مسقط", "RUH": "الرياض",
  "DXB": "دبي", "KWI": "الكويت", "BAH": "البحرين", "DOH": "الدوحة",
  "GYD": "باكو", "BEY": "بيروت", "DAM": "دمشق", "BGW": "بغداد",
  "TUN": "تونس", "ALG": "الجزائر", "CMN": "الدار البيضاء",
  "HBE": "الإسكندرية", "LHR": "لندن", "CDG": "باريس", "FRA": "فرانكفورت",
  "ADD": "أديس أبابا", "NBO": "نيروبي", "TIF": "الطائف", "MED": "المدينة المنورة",
  "ABT": "الباحة", "AHB": "أبها", "TUF": "تبوك", "BHH": "بيشة",
  "GIZ": "جيزان", "HOF": "الهفوف", "RAE": "عرعر",
  "SHA": "شنغهاي", "PEK": "بكين", "SIN": "سنغافورة", "BOM": "مومباي",
  "DEL": "دلهي", "KHI": "كراتشي", "MNL": "مانيلا", "BKK": "بانكوك",
  "AUH": "أبوظبي", "SHJ": "الشارقة", "FJR": "الفجيرة",
};

const statusLabel = (s: string) => {
  if (s === "en-route")  return { label: "في الجو",   color: "bg-emerald-100 text-emerald-700" };
  if (s === "landed")    return { label: "هبطت",      color: "bg-blue-100   text-blue-700"    };
  if (s === "scheduled") return { label: "مجدولة",    color: "bg-amber-100  text-amber-700"   };
  return                        { label: s,            color: "bg-gray-100   text-gray-600"    };
};

const ARAB_AIRLINES = [
  { iata: "IY", name: "سبأ للطيران",         flag: "🇾🇪" },
  { iata: "EK", name: "طيران الإمارات",       flag: "🇦🇪" },
  { iata: "EY", name: "الاتحاد للطيران",     flag: "🇦🇪" },
  { iata: "FZ", name: "فلاي دبي",            flag: "🇦🇪" },
  { iata: "G9", name: "العربية للطيران",      flag: "🇦🇪" },
  { iata: "QR", name: "القطرية",              flag: "🇶🇦" },
  { iata: "SV", name: "الخطوط السعودية",     flag: "🇸🇦" },
  { iata: "XY", name: "فلاي ناس",            flag: "🇸🇦" },
  { iata: "WY", name: "عُمان للطيران",        flag: "🇴🇲" },
  { iata: "GF", name: "طيران الخليج",        flag: "🇧🇭" },
  { iata: "KU", name: "الخطوط الكويتية",    flag: "🇰🇼" },
  { iata: "J9", name: "طيران الجزيرة",       flag: "🇰🇼" },
  { iata: "MS", name: "مصر للطيران",         flag: "🇪🇬" },
  { iata: "RJ", name: "الملكية الأردنية",    flag: "🇯🇴" },
  { iata: "ME", name: "الشرق الأوسط",        flag: "🇱🇧" },
  { iata: "IA", name: "الخطوط العراقية",     flag: "🇮🇶" },
  { iata: "8U", name: "أفريقية",              flag: "🇱🇾" },
  { iata: "TU", name: "تونيسار",             flag: "🇹🇳" },
];

const API_KEY = "779b3cae-16bb-4765-bb6c-6af70f958986";
const flightCache: Record<string, { data: any[]; ts: number }> = {};

function FlightTable() {
  const [activeAirline, setActiveAirline]     = useState(ARAB_AIRLINES[0]);
  const [flights, setFlights]                 = useState<any[]>([]);
  const [loading, setLoading]                 = useState(false);
  const [lastUpdated, setLastUpdated]         = useState<Date | null>(null);
  const [selectedFlight, setSelectedFlight]   = useState<any>(null);
  const [error, setError]                     = useState<string | null>(null);

  const fetchFlights = (airline: typeof ARAB_AIRLINES[0], force = false) => {
    const cached = flightCache[airline.iata];
    if (!force && cached && Date.now() - cached.ts < 5 * 60 * 1000) {
      setFlights(cached.data);
      setLastUpdated(new Date(cached.ts));
      return;
    }
    setLoading(true);
    setError(null);
    setSelectedFlight(null);
    fetch(`https://airlabs.co/api/v9/flights?api_key=${API_KEY}&airline_iata=${airline.iata}`)
      .then(r => r.json())
      .then(data => {
        const list = data?.response ?? [];
        flightCache[airline.iata] = { data: list, ts: Date.now() };
        setFlights(list);
        setLastUpdated(new Date());
        setLoading(false);
      })
      .catch(() => { setError("تعذّر الاتصال بالخادم."); setLoading(false); });
  };

  useEffect(() => { fetchFlights(activeAirline); }, [activeAirline]);

  const now = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="w-full flex flex-col gap-3" dir="rtl">

      {/* Airline tabs — scrollable */}
      <div
        className="flex gap-1.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {ARAB_AIRLINES.map(a => (
          <button
            key={a.iata}
            onClick={() => setActiveAirline(a)}
            className={`flex-none flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all whitespace-nowrap ${
              activeAirline.iata === a.iata
                ? "bg-[#202A36] text-white border-[#202A36] shadow-md"
                : "bg-white/50 text-[#202A36] border-white/40 hover:bg-white/70"
            }`}
          >
            <span className="text-sm leading-none">{a.flag}</span>
            <span>{a.name}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-[#202A36]">
            {activeAirline.flag} {activeAirline.name}
          </h2>
          <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
            {lastUpdated
              ? `آخر تحديث: ${lastUpdated.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}`
              : "جارٍ التحميل..."}
          </p>
        </div>
        <button
          onClick={() => fetchFlights(activeAirline, true)}
          className="flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/50 rounded-full px-3 py-1.5 text-[10px] font-bold text-[#202A36] hover:bg-white/80 transition-all shadow-sm"
        >
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} /> تحديث
        </button>
      </div>

      {/* Live badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50/80 border border-emerald-200 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          مباشر — {now}
        </span>
        {!loading && (
          <span className="text-[10px] text-gray-600 font-semibold">{flights.length} رحلة نشطة</span>
        )}
      </div>

      {/* Content area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-9 h-9 rounded-full border-4 border-[#202A36]/20 border-t-[#202A36] animate-spin" />
          <p className="text-sm font-bold text-gray-700">جارٍ تحميل رحلات {activeAirline.name}...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <p className="text-sm font-bold text-red-500">{error}</p>
          <button
            onClick={() => fetchFlights(activeAirline, true)}
            className="text-xs underline text-[#202A36] font-bold"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : flights.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2">
          <Plane className="text-gray-300" size={36} />
          <p className="text-sm font-bold text-gray-500">لا توجد رحلات نشطة حالياً</p>
          <p className="text-[10px] text-gray-400">جرّب شركة طيران أخرى أو أعد التحديث</p>
        </div>
      ) : (
        <div
          className="space-y-2 overflow-y-auto pr-1"
          style={{ maxHeight: "60vh", scrollbarWidth: "thin" }}
        >
          {flights.map((f: any, i: number) => {
            const dep     = f.dep_iata || "---";
            const arr     = f.arr_iata || "---";
            const depName = IATA_CITY[dep] || dep;
            const arrName = IATA_CITY[arr] || arr;
            const st      = statusLabel(f.status || "en-route");
            const isSel   = selectedFlight?.flight_iata === f.flight_iata;

            return (
              <button
                key={i}
                onClick={() => setSelectedFlight(isSel ? null : f)}
                className={`w-full text-right rounded-xl border transition-all duration-200 overflow-hidden ${
                  isSel
                    ? "bg-[#202A36]/10 border-[#202A36]/30 shadow-md"
                    : "bg-white/40 border-white/40 hover:bg-white/60"
                }`}
              >
                {/* Row */}
                <div className="flex items-center justify-between px-3.5 py-2.5 gap-2">
                  {/* Flight # */}
                  <div className="flex flex-col items-start min-w-[60px]">
                    <span className="text-[11px] font-black text-[#202A36]">{f.flight_iata}</span>
                    <span className="text-[9px] text-gray-500 font-semibold mt-0.5">{f.aircraft_icao || "---"}</span>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-[#202A36]">{dep}</span>
                      <span className="text-[8px] text-gray-600 font-semibold max-w-[40px] truncate">{depName}</span>
                    </div>
                    <div className="flex-1 px-1 relative flex items-center justify-center min-w-[24px]">
                      <div className="absolute w-full border-t border-dashed border-gray-400/60" />
                      <Plane size={10} className="text-[#202A36] -rotate-90 z-10" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-[#202A36]">{arr}</span>
                      <span className="text-[8px] text-gray-600 font-semibold max-w-[40px] truncate">{arrName}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-1 min-w-[56px]">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                    {f.alt > 0 && (
                      <span className="text-[8px] text-gray-500">{Math.round(f.alt * 3.281).toLocaleString()} ft</span>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isSel && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/40 bg-white/20 grid grid-cols-3 gap-3 text-center">
                    {[
                      ["الارتفاع",      f.alt   ? `${f.alt.toLocaleString()} م` : "---"],
                      ["السرعة",        f.speed ? `${Math.round(f.speed)} كم/س` : "---"],
                      ["الاتجاه",       f.dir   ? `${f.dir}°`                   : "---"],
                      ["رقم الرحلة",    f.flight_iata   || "---"],
                      ["تسجيل الطائرة", f.reg_number    || "---"],
                      ["نوع الطائرة",   f.aircraft_icao || "---"],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <div className="text-[9px] text-gray-500 font-bold uppercase">{label}</div>
                        <div className="text-[11px] font-black text-[#202A36] mt-0.5">{val}</div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroTranslateY = scrollY * 0.4;

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTimeRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const durationRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);

  // Scroll-driven video playback — reacts to scroll velocity with inertia.
  // Forward motion uses native video playback; reverse uses tiny exact seeks.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const movementScale = () => ((durationRef.current || 1) / maxScroll()) * 4.5;

    const setVideoTime = (time: number) => {
      try { video.currentTime = time; } catch { /* ignore seek races */ }
    };

    const captureScrollImpulse = () => {
      const scrollY = window.scrollY || 0;
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;
      if (!durationRef.current || Math.abs(delta) < 0.5) return;

      const impulse = delta * movementScale();
      scrollVelocityRef.current = clamp(scrollVelocityRef.current + impulse, -1.6, 1.6);
    };

    const tick = (ts: number) => {
      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0.016;
      lastTsRef.current = ts;

      const duration = durationRef.current;
      const maxTime = Math.max(0, duration - 0.08);
      const velocity = scrollVelocityRef.current;

      if (duration > 0 && Math.abs(velocity) >= 0.012) {
        if (velocity > 0 && Math.abs(video.currentTime - videoTimeRef.current) < 0.28) {
          video.playbackRate = clamp(velocity, 0.35, 1.35);
          if (video.paused) video.play().catch(() => {});
          videoTimeRef.current = clamp(video.currentTime || videoTimeRef.current, 0, maxTime);
        } else {
          if (!video.paused) video.pause();
          const next = clamp(videoTimeRef.current + velocity * dt, 0, maxTime);
          videoTimeRef.current = next;
          if (Math.abs(video.currentTime - next) > 0.006) setVideoTime(next);
        }

        scrollVelocityRef.current *= Math.exp(-dt * 4.5);
      } else {
        scrollVelocityRef.current = 0;
        if (!video.paused) video.pause();
        videoTimeRef.current = clamp(video.currentTime || videoTimeRef.current, 0, maxTime);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      videoTimeRef.current = video.currentTime || 0;
      lastScrollYRef.current = window.scrollY || 0;
      if (rafRef.current == null) {
        lastTsRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    window.addEventListener("scroll", captureScrollImpulse, { passive: true });
    window.addEventListener("resize", captureScrollImpulse);

    return () => {
      window.removeEventListener("scroll", captureScrollImpulse);
      window.removeEventListener("resize", captureScrollImpulse);
      video.removeEventListener("loadedmetadata", onMeta);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);


  return (
    <div className="relative min-h-screen">
      {/* Fixed video background for the entire page */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          className="min-h-full min-w-full object-cover object-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
      </div>

      {/* Sticky navigation */}
      <header className="sticky top-0 z-30" dir="rtl">
        <nav className="mx-auto w-full max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between rounded-full bg-white/60 px-5 py-2.5 backdrop-blur-md shadow-sm">
            <a href="#start" className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <img src={logo} alt="سبأ للطيران" className="h-10 w-auto" />
              سبأ للطيران
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {NAV_ITEMS.map((item, i) => (
                <li key={item}>
                  <a
                    href={`#${NAV_HREFS[i]}`}
                    className="text-gray-900 transition-colors hover:text-gray-700"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="text-gray-900 transition-colors hover:text-gray-700 md:hidden"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {open && (
            <div className="mt-3 rounded-2xl bg-white/90 p-4 backdrop-blur md:hidden">
              <ul className="flex flex-col gap-3">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item}>
                    <a
                      href={`#${NAV_HREFS[i]}`}
                      onClick={() => setOpen(false)}
                      className="block px-2 py-1 text-gray-900 transition-colors hover:text-gray-700"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>

      {/* Hero */}
      <section id="start" dir="rtl" className="relative -mt-24 flex min-h-screen md:min-h-[900px] flex-col items-center justify-center overflow-hidden pt-12 md:pt-0">
        
        {/* Subtle Radial Gradient for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_75%)] pointer-events-none z-0 transition-opacity" style={{ opacity: heroOpacity }} />

        <div className="w-full h-full flex flex-col items-center justify-center transition-transform duration-75" style={{ opacity: heroOpacity, transform: `translateY(${heroTranslateY}px)` }}>

        {/* Floating Elements (Refined) - Visible on all screens */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-70 md:opacity-100">
          <div className="absolute top-[20%] right-[10%] w-20 h-28 md:w-32 md:h-40 bg-white/80 backdrop-blur-md rounded-2xl p-1.5 md:p-2 shadow-2xl rotate-[-6deg] animate-[bounce_6s_infinite]">
            <img src="/dest-istanbul.jpg" className="w-full h-full object-cover rounded-xl shadow-inner" alt="Istanbul" />
          </div>
          <div className="absolute top-[40%] right-[3%] w-16 h-20 md:w-28 md:h-36 bg-white/80 backdrop-blur-md rounded-2xl p-1 md:p-2 shadow-2xl rotate-[8deg] animate-[bounce_5s_infinite_reverse]">
            <img src="/dest-riyadh.jpg" className="w-full h-full object-cover rounded-xl shadow-inner" alt="Riyadh" />
          </div>
          <div className="absolute top-[25%] left-[10%] w-24 h-32 md:w-36 md:h-48 bg-white/80 backdrop-blur-md rounded-2xl p-1.5 md:p-2.5 shadow-2xl rotate-[5deg] animate-[bounce_7s_infinite]">
            <img src="/dest-mecca-card.jpg" className="w-full h-full object-cover rounded-xl shadow-inner" alt="Mecca" />
          </div>
          <div className="absolute top-[50%] left-[4%] w-20 h-28 md:w-32 md:h-40 bg-white/80 backdrop-blur-md rounded-2xl p-1.5 md:p-2 shadow-2xl rotate-[-8deg] animate-[bounce_8s_infinite_reverse]">
            <img src="/dest-muscat.jpg" className="w-full h-full object-cover rounded-xl shadow-inner" alt="Muscat" />
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex flex-col items-center justify-center px-4 md:px-6 text-center z-20 w-full max-w-5xl mx-auto flex-1 mt-48 md:mt-64">
          <h1 className="leading-[1.05] tracking-tight text-[#1a2229]">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-light">
              اكتشف العالم
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-semibold mt-1 md:mt-3">
              من منظور مختلف.
            </span>
          </h1>

          <p className="mt-5 md:mt-8 max-w-xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            وانطلق بثقة مع شركة طيران تضع راحتك وأمانك في مقدمة أولوياتها.
          </p>
        </div>

        {/* Flight Booking Bar */}
        <div className="z-30 mt-48 md:mt-4 w-full max-w-4xl px-4 md:px-6 mb-24 md:mb-0">
          <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-full p-2 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            
            <div className="flex-1 w-full px-4 md:px-5 py-3 flex flex-col items-start cursor-pointer hover:bg-white/50 rounded-xl md:rounded-full transition-colors">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">من</span>
              <span className="text-sm font-semibold text-[#1a2229]">صنعاء، اليمن</span>
            </div>
            
            <div className="flex-1 w-full px-4 md:px-5 py-3 flex flex-col items-start cursor-pointer hover:bg-white/50 rounded-xl md:rounded-full transition-colors">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">إلى</span>
              <span className="text-sm font-semibold text-gray-400">وجهة الوصول</span>
            </div>
            
            <div className="flex-1 w-full px-4 md:px-5 py-3 flex flex-col items-start cursor-pointer hover:bg-white/50 rounded-xl md:rounded-full transition-colors">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">التاريخ</span>
              <span className="text-sm font-semibold text-[#1a2229]">2024/12/20</span>
            </div>
            
            <div className="flex-1 w-full px-4 md:px-5 py-3 flex flex-col items-start cursor-pointer hover:bg-white/50 rounded-xl md:rounded-full transition-colors">
              <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">الأشخاص</span>
              <span className="text-sm font-semibold text-[#1a2229]"><i className='bx bx-user mr-1'></i> 05</span>
            </div>

            <div className="w-full md:w-auto p-1.5 flex flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex-1 md:flex-none w-full md:w-auto bg-white/40 text-[#1a2229] border border-white/50 rounded-full px-5 py-3.5 text-sm font-bold hover:bg-white/60 transition-colors shadow-sm">
                    جدول الرحلات
                  </button>
                </DialogTrigger>
                <DialogContent
                  className="w-full sm:max-w-3xl bg-white/30 backdrop-blur-3xl border border-white/50 shadow-2xl p-4 sm:p-6"
                  dir="rtl"
                >
                  <DialogHeader className="pb-4">
                    <DialogTitle className="flex items-center gap-3 text-xl font-black" style={{ color: "#202A36" }}>
                      <img src={logo} className="h-7 w-auto" alt="سبأ" />
                      جدول رحلات الطيران
                    </DialogTitle>
                  </DialogHeader>
                  <FlightTable />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex-1 md:flex-none w-full md:w-auto bg-[#1a2229] text-white rounded-full px-8 py-3.5 text-sm font-medium hover:bg-black transition-colors shadow-lg whitespace-nowrap">
                    احجز الآن
                  </button>
                </DialogTrigger>
                <DialogContent className="w-full sm:max-w-lg bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl overflow-y-auto" dir="rtl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl font-black" style={{ color: "#202A36" }}>
                      <img src={logo} className="h-7 w-auto" alt="سبأ" />
                      تفاصيل الحجز
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="mt-2 space-y-4">
                    {/* Flight summary card */}
                    <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 p-4 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-[#202A36] text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                          مباشرة
                        </span>
                        <span className="text-sm font-black text-[#202A36]">IY 640</span>
                      </div>
                      
                      <div className="flex items-center justify-between relative">
                        <div className="flex flex-col text-right z-10">
                          <span className="text-2xl font-black text-[#202A36] drop-shadow-sm">08:30</span>
                          <span className="text-xs font-bold text-gray-700 mt-0.5">صنعاء (SAH)</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
                          <div className="text-[10px] text-gray-600 font-bold mb-1 bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">2h 45m</div>
                          <div className="w-full flex items-center">
                            <div className="w-2 h-2 rounded-full bg-[#202A36] shadow-[0_0_8px_rgba(32,42,54,0.5)]"></div>
                            <div className="flex-1 border-t-2 border-dashed border-[#202A36]/30"></div>
                            <div className="w-2 h-2 rounded-full border-2 border-[#202A36] bg-white"></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col text-left z-10">
                          <span className="text-2xl font-black text-[#202A36] drop-shadow-sm">11:15</span>
                          <span className="text-xs font-bold text-gray-700 mt-0.5">عمّان (AMM)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 p-3 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-inner">
                          <i className='bx bx-briefcase text-xl text-[#202A36]'></i>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold">الأمتعة</div>
                          <div className="text-xs font-black text-[#202A36]">2x 23kg</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 p-3 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center shadow-inner">
                          <i className='bx bx-money text-xl text-[#202A36]'></i>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500 font-bold">الإجمالي</div>
                          <div className="text-xs font-black text-[#202A36]">$450.00</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Form */}
                    <form className="space-y-4 pt-2" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-800 mb-1.5 drop-shadow-sm">الاسم الكامل للمسافر الرئيسي</label>
                          <input type="text" className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-3.5 outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#202A36] transition-all shadow-sm placeholder:text-gray-600 font-medium text-sm" placeholder="أدخل اسمك الكامل كما في الجواز" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-800 mb-1.5 drop-shadow-sm">رقم الهاتف</label>
                          <input type="tel" className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-3.5 outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#202A36] transition-all shadow-sm placeholder:text-gray-600 font-medium text-sm" placeholder="+967 ..." />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-800 mb-1.5 drop-shadow-sm">البريد الإلكتروني</label>
                          <input type="email" className="w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md p-3.5 outline-none focus:bg-white/70 focus:ring-2 focus:ring-[#202A36] transition-all shadow-sm placeholder:text-gray-600 font-medium text-sm" placeholder="example@email.com" />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button className="w-full rounded-xl bg-[#202A36] px-4 py-4 font-bold text-white transition-all hover:bg-black hover:shadow-lg active:scale-[0.98] text-base">
                          متابعة الحجز
                        </button>
                      </div>
                      <p className="text-center text-[11px] text-gray-800 mt-4 drop-shadow-sm font-bold">
                        بضغطك على متابعة، فإنك توافق على الشروط والأحكام الخاصة بسبأ للطيران.
                      </p>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

          </div>
        </div>


        </div>
      </section>

      {/* Story */}
      <section id="story" dir="rtl" className="relative py-24">
        <RevealOnScroll className="mx-auto max-w-7xl px-8">
          <div className="rounded-3xl bg-white/30 p-10 backdrop-blur-xl border border-white/50 md:p-14">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">قصتنا</span>
            <h2 className="mt-3 max-w-3xl text-4xl font-normal tracking-tight md:text-5xl" style={{ color: "#202A36" }}>
              تاريخ عريق يربط اليمن بالعالم.
            </h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-gray-700">
                تأسست سبأ للطيران من إيمان راسخ بأن السفر الراقي يجب أن يكون متاحاً.
                على مدى عقود، قمنا ببناء أسطول حديث وتدريب طواقمنا لتقديم أفضل خدمة
                للمسافرين من وإلى اليمن.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                نحن نهتم بأدق التفاصيل في كل رحلة: المسار، والضيافة، وأجواء المقصورة.
                من صالات الانتظار الخاصة إلى وصولك المريح — نجعل من الفخامة أمراً سهلاً.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <div className="relative z-10">
        {/* Destinations */}
        <section id="destinations" dir="rtl" className="relative py-24">
          <RevealOnScroll className="mx-auto max-w-7xl px-8">
            <div className="rounded-3xl bg-white/30 p-10 backdrop-blur-xl border border-white/50 md:p-14">
              <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">وجهاتنا</span>
              <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="text-4xl font-normal tracking-tight md:text-5xl" style={{ color: "#202A36" }}>
                  اكتشف العالم مع سبأ.
                </h2>
              </div>
              
              <div className="mt-12 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 pb-16">
                {[
                  { name: "إسطنبول، تركيا", img: "/dest-istanbul.jpg", cls: "lg:translate-y-0 lg:-rotate-2" },
                  { name: "مسقط، عُمان", img: "/dest-muscat.jpg", cls: "lg:translate-y-8 lg:rotate-2" },
                  { name: "الرياض، السعودية", img: "/dest-riyadh.jpg", cls: "lg:translate-y-8 lg:-rotate-2" },
                  { name: "القاهرة، مصر", img: "/dest-cairo.jpg", cls: "lg:translate-y-0 lg:rotate-2" },
                ].map((dest, i) => (
                  <div key={i} className={`group relative bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-3 pb-16 transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:z-20 ${dest.cls}`}>
                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                      <img src={dest.img} alt={dest.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <p className="absolute bottom-5 left-0 right-0 text-center text-lg font-bold" style={{ color: "#202A36" }}>{dest.name}</p>
                  </div>
                ))}
              </div>

              {/* Hajj and Umrah Banner */}
              <div className="mt-16 overflow-hidden rounded-2xl bg-[#202A36]/80 backdrop-blur-xl text-white">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-sm font-semibold tracking-wider text-yellow-500 uppercase">خدمات مخصصة</span>
                    <h3 className="mt-2 text-3xl font-semibold">رحلات الحج والعمرة</h3>
                    <p className="mt-4 text-gray-300 leading-relaxed">
                      نفخر بتقديم خدمات طيران مخصصة لضيوف الرحمن. رحلات مباشرة إلى جدة والمدينة المنورة مع عناية خاصة، أوزان إضافية لماء زمزم، وإرشاد متكامل طوال الرحلة لتتفرغ لعبادتك بطمأنينة.
                    </p>
                    <div className="mt-8">
                      <button className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#202A36] transition-colors hover:bg-gray-100">
                        احجز رحلتك الإيمانية
                      </button>
                    </div>
                  </div>
                  <div className="md:w-2/5">
                    <img 
                      src="/dest-hajj-umrah.jpg" 
                      alt="مكة المكرمة" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </RevealOnScroll>
        </section>

      {/* Benefits */}
      <section id="benefits" dir="rtl" className="relative py-24">
        <RevealOnScroll className="mx-auto max-w-7xl px-8">
          <div className="rounded-3xl bg-white/30 p-10 backdrop-blur-xl border border-white/50 md:p-14">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">مزايانا</span>
            <h2 className="mt-3 text-4xl font-normal tracking-tight md:text-5xl" style={{ color: "#202A36" }}>
              لماذا تختار سبأ للطيران.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Plane, title: "شبكة واسعة", desc: "نصلك بأهم الوجهات الإقليمية والدولية." },
                { icon: Clock, title: "دقة المواعيد", desc: "نلتزم بجدول رحلات دقيق وموثوق." },
                { icon: Shield, title: "معايير السلامة", desc: "أعلى معايير الأمان الدولية في جميع رحلاتنا." },
                { icon: Star, title: "خدمة مميزة", desc: "طاقم ضيافة يمني محترف بخدمتك دائماً." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl bg-white/40 p-6 backdrop-blur-md border border-white/50">
                  <Icon size={28} style={{ color: "#202A36" }} />
                  <h3 className="mt-4 text-lg font-semibold" style={{ color: "#202A36" }}>{title}</h3>
                  <p className="mt-2 text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ */}
      <section id="faq" dir="rtl" className="relative py-24">
        <RevealOnScroll className="mx-auto max-w-4xl px-8">
          <div className="rounded-3xl bg-white/30 p-10 backdrop-blur-xl border border-white/50 md:p-14">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">الأسئلة</span>
            <h2 className="mt-3 text-4xl font-normal tracking-tight md:text-5xl" style={{ color: "#202A36" }}>
              الأسئلة الشائعة.
            </h2>
            <div className="mt-12 divide-y divide-gray-200">
              {[
                { q: "كيف يمكنني حجز تذكرة؟", a: "يمكنك الحجز عبر موقعنا الإلكتروني، تطبيق الهاتف، أو زيارة أقرب وكيل معتمد." },
                { q: "هل هناك رسوم مخفية؟", a: "لا، جميع أسعارنا تشمل الضرائب والرسوم الأساسية لضمان الشفافية." },
                { q: "ما هو وزن الأمتعة المسموح به؟", a: "يسمح بـ 23 كجم للدرجة السياحية و32 كجم لدرجة الأعمال، بالإضافة لحقيبة يد." },
                { q: "هل تقدمون خدمات خاصة لذوي الاحتياجات؟", a: "نعم، نوفر كراسي متحركة وخدمات مرافقة عند الطلب المسبق." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium" style={{ color: "#202A36" }}>
                    {item.q}
                    <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
                  </summary>
                  <p className="mt-3 text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Booking and Contact */}
      <section id="booking" dir="rtl" className="relative py-24">
        <RevealOnScroll className="mx-auto max-w-4xl px-8">
          <div className="rounded-3xl bg-white/30 p-10 backdrop-blur-xl border border-white/50 md:p-14">
            <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">الحجز والتواصل</span>
            <h2 className="mt-3 text-4xl font-normal tracking-tight md:text-5xl" style={{ color: "#202A36" }}>
              نحن هنا لخدمتك.
            </h2>
            <div className="mt-10 flex flex-col md:flex-row gap-8">
              <form className="flex-1 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                  <input type="text" className="mt-1 w-full rounded-md border-gray-300 bg-white/50 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#202A36]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <input type="tel" className="mt-1 w-full rounded-md border-gray-300 bg-white/50 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#202A36]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الرسالة أو الاستفسار</label>
                  <textarea rows={4} className="mt-1 w-full rounded-md border-gray-300 bg-white/50 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#202A36]"></textarea>
                </div>
                <button className="w-full rounded-md bg-[#202A36] px-4 py-3 font-medium text-white transition-colors hover:bg-[#1a2229]">
                  إرسال الطلب
                </button>
              </form>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">أرقام التواصل</h4>
                  <p className="mt-2 text-gray-700" dir="ltr">+967 1 234 567</p>
                  <p className="text-gray-700" dir="ltr">+967 1 987 654</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">البريد الإلكتروني</h4>
                  <p className="mt-2 text-gray-700">info@skyelite-yemen.com</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">أوقات العمل</h4>
                  <p className="mt-2 text-gray-700">السبت - الخميس: 8 صباحاً - 8 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <footer className="relative bg-[#1a2229]/70 backdrop-blur-2xl border-t border-white/10 text-white pt-10 pb-6 overflow-hidden" dir="rtl">
        <RevealOnScroll className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
            
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="flex items-center gap-3">
                <img src={logo} alt="سبأ للطيران" className="h-10 w-auto brightness-0 invert" />
                <span className="text-xl font-semibold">سبأ للطيران</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs text-center lg:text-right">
                اليمن إلى العالم — بلا حدود. تجربة سفر فاخرة ومريحة.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-medium">
              <a href="#start" className="text-gray-400 hover:text-white transition-colors">الرئيسية</a>
              <a href="#story" className="text-gray-400 hover:text-white transition-colors">قصتنا</a>
              <a href="#destinations" className="text-gray-400 hover:text-white transition-colors">الوجهات</a>
              <a href="#benefits" className="text-gray-400 hover:text-white transition-colors">مزايانا</a>
              <a href="#faq" className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</a>
              <a href="#booking" className="text-gray-400 hover:text-white transition-colors">تواصل معنا</a>
            </div>
            
            <div className="flex items-center justify-center gap-5">
              <a href="#" className="text-gray-400 hover:text-[#1DA1F2] hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <i className='bx bxl-twitter text-3xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E1306C] hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                <i className='bx bxl-instagram text-3xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4267B2] hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                <i className='bx bxl-facebook text-3xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0077B5] hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
                <i className='bx bxl-linkedin text-3xl'></i>
              </a>
            </div>

          </div>
          
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} سبأ للطيران. جميع الحقوق محفوظة.</span>
            <span>تصميم وتطوير بكل فخر.</span>
          </div>
        </RevealOnScroll>
      </footer>
      </div>
    </div>
  );
}
