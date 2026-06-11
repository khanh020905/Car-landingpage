import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAR_MODELS, SERVICE_BENEFITS } from './data';
import { CarModel, ViewingAppointment } from './types';
import Header from './components/Header';
import ModelShowcase from './components/ModelShowcase';
import BookingForm from './components/BookingForm';
import ActiveBookings from './components/ActiveBookings';
import VehicleSpecModal from './components/VehicleSpecModal';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Award, 
  AudioLines, 
  Compass, 
  Gem,
  Bell
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  // Local persistence cache for appointments
  const [bookings, setBookings] = useState<ViewingAppointment[]>([]);
  const [inspectingModel, setInspectingModel] = useState<CarModel | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<'gt-black' | 'avanta-s' | 'avanta-r'>('gt-black');
  const [selectedPaintColor, setSelectedPaintColor] = useState<string>('');
  const [alertNotification, setAlertNotification] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Initial local load safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem('avanta_showroom_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        // Hydrate with one generic beautiful default showcase appointment to look gorgeous
        const defaultAppt: ViewingAppointment = {
          id: 'AV-49210',
          userName: 'Khách Quý (Mẫu)',
          userPhone: '0909 888 777',
          userEmail: 'khach.quy@avanta.vn',
          preferredModelId: 'gt-black',
          preferredModelName: 'AVANTA GT Black (Đen Obsidian Ánh kim)',
          budgetRange: 'Above 5B',
          visitType: 'Private showroom',
          preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days in future
          preferredTime: '14:00',
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };
        setBookings([defaultAppt]);
        localStorage.setItem('avanta_showroom_bookings', JSON.stringify([defaultAppt]));
      }
    } catch (e) {
      console.warn('Local storage reading error: ', e);
    }
  }, []);

  // GSAP animation definitions on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Content Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.4 } });

      tl.fromTo('.gsap-hero-eyebrow', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, delay: 0.3 }
      )
      .fromTo('.gsap-hero-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=1.0'
      )
      .fromTo('.gsap-hero-desc',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=1.1'
      )
      .fromTo('.gsap-hero-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=1.2'
      )
      .fromTo('.gsap-hero-panel',
        { scale: 0.96, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1 },
        '-=1.3'
      );

      // 2. Parallax background scroll on Hero
      gsap.to('.gsap-hero-bg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gsap-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 3. Infinite marquee slide
      gsap.to('.gsap-marquee-span', {
        xPercent: -50,
        repeat: -1,
        duration: 35,
        ease: 'none'
      });

      // 4. Reveal Animation for Brand Philosophy on scroll
      gsap.fromTo('.gsap-feel-reveal',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 75%'
          }
        }
      );

      // 5. Parallax effect for the Showroom Collage pictures
      gsap.fromTo('.gsap-collage-img-one',
        { y: 80, opacity: 0 },
        {
          y: -20,
          opacity: 1,
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );

      gsap.fromTo('.gsap-collage-img-two',
        { y: -60, opacity: 0 },
        {
          y: 30,
          opacity: 1,
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // Float badge entry
      gsap.fromTo('.gsap-collage-badge',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 50%'
          }
        }
      );

      // 6. Cabin detail image slide and reveal
      gsap.fromTo('.gsap-cabin-img-reveal',
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#interior',
            start: 'top 70%'
          }
        }
      );

      // Cabin copy reveal
      gsap.fromTo('.gsap-cabin-text-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#interior',
            start: 'top 75%'
          }
        }
      );

      // 7. Concierge description section stagger reveal
      gsap.fromTo('.gsap-concierge-sticky',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#ownership',
            start: 'top 70%'
          }
        }
      );

      // Concierge cards reveal
      gsap.fromTo('.gsap-service-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#ownership',
            start: 'top 75%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const saveBookings = (updatedList: ViewingAppointment[]) => {
    setBookings(updatedList);
    try {
      localStorage.setItem('avanta_showroom_bookings', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Local storage writing error:', e);
    }
  };

  // Callback triggers from showcase
  const handleSelectModel = (model: CarModel, customColor: string) => {
    setSelectedModelId(model.id as any);
    setSelectedPaintColor(customColor);
    
    // Smooth scroll down to the request booking container
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Quick elegant notification alert
    triggerAlert(`Lựa chọn có sẵn: Đã chọn dòng ${model.name} với màu sơn ngoại thất ${customColor}.`);
  };

  // Appointments actions
  const handleBookingSuccess = (newBooking: ViewingAppointment) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    triggerAlert(`Gửi yêu cầu thành công. Mã đặt chỗ của quý khách là: ${newBooking.id}`);
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = bookings.filter(b => b.id !== id);
    saveBookings(filtered);
    triggerAlert(`Đã hủy bỏ phiên đặt giờ phòng chờ.`);
  };

  const handleReschedule = (id: string, newTime: string) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, preferredTime: newTime };
      }
      return b;
    });
    saveBookings(updated);
    triggerAlert(`Khung giờ đặt chỗ đã đổi sang ${newTime}.`);
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerAlert = (message: string) => {
    setAlertNotification(message);
    setTimeout(() => {
      setAlertNotification('');
    }, 4500);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-gold-custom selection:text-black overflow-x-hidden relative font-sans antialiased">
      {/* Cinematic noise film overlay */}
      <div className="grain-overlay" />

      {/* Interactive global floating alert toast */}
      {alertNotification && (
        <div className="fixed bottom-6 left-6 z-[80] max-w-sm px-5 py-4 rounded-2xl bg-black/80 border border-gold-custom/30 text-white backdrop-blur-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-gold-custom/10 border border-gold-custom flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-gold-custom" />
          </div>
          <span className="text-xs font-semibold leading-relaxed font-sans">{alertNotification}</span>
        </div>
      )}

      {/* Floating Header */}
      <Header onOpenBooking={scrollToBooking} bookingCount={bookings.length} />

      {/* SECTION 1: CINEMATIC HERO */}
      <section className="gsap-hero-section relative min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 flex items-end overflow-hidden">
        {/* Dynamic backdrop layering layout */}
        <div className="absolute inset-0 z-0">
          <div 
            className="gsap-hero-bg w-full h-[120%] -top-[10%] absolute bg-cover bg-center opacity-65" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=90')` }} 
          />
          {/* Radial gold glowing lens flared accent */}
          <div className="absolute inset-0 bg-radial-gradient from-gold-custom/15 via-black/40 to-black/95 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 z-10" />
        </div>

        {/* Hero Interactive specs & grid */}
        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="gsap-hero-eyebrow inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-extrabold mb-5 opacity-0">
              <Sparkles className="w-4 h-4 text-gold-custom" />
              <span>Phòng chờ Đón tiếp Thượng lưu</span>
            </div>

            <h1 className="gsap-hero-title font-serif text-6xl md:text-8xl xl:text-[105px] font-black leading-[0.85] tracking-tighter text-white m-0 uppercase opacity-0">
              Elegance <br />
              <span className="text-stroke">In Motion</span> <br />
              Poise In Power<span className="text-gold-custom">.</span>
            </h1>

            <p className="gsap-hero-desc max-w-xl text-white/65 text-sm md:text-base leading-relaxed mt-6 mb-8 font-sans opacity-0">
              Chào mừng quý chủ nhân đến với <b>AVANTA Motors</b>—không gian tĩnh lặng để chiêm ngưỡng nghệ thuật ô tô thượng hạng. Khám phá kiệt tác cơ khí thủ công đỉnh cao, may đo diện mạo cá nhân và đăng ký một lịch gặp gỡ chuyên gia riêng biệt.
            </p>

            <div className="gsap-hero-actions flex flex-wrap items-center gap-4 opacity-0">
              <a 
                href="#models" 
                className="px-8 py-4.5 bg-cream-custom hover:bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full transition-transform active:scale-95 flex items-center gap-2 group shadow-xl"
              >
                <span>Khám Phá Dòng Xe</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button 
                onClick={scrollToBooking}
                className="px-8 py-4.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors border border-white/10 font-mono"
              >
                Đặt Phòng Chờ VIP
              </button>
            </div>
          </div>

          {/* Featured Car Panel overlay */}
          <div className="lg:col-span-4 justify-self-stretch lg:justify-self-end">
            <div className="gsap-hero-panel p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_45px_100px_rgba(0,0,0,0.7)] opacity-0">
              <h3 className="font-serif text-3xl font-extrabold text-cream-custom mb-2">
                AVANTA GT Black
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-6">
                Kiệt tác xe thể thao sang trọng được định danh bởi kết cấu vỏ khí động học sợi carbon carbon khâu tay và phong thái cơ khí tuyệt hảo.
              </p>

              {/* Specs parameters */}
              <div className="border-t border-white/10 pt-5 grid grid-cols-3 gap-4 font-mono">
                <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1">0-100 km/h</span>
                  <strong className="text-xl font-bold text-gold-custom tracking-tight">3.2 giây</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1">Công suất</span>
                  <strong className="text-xl font-bold text-gold-custom tracking-tight">680HP</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase tracking-wider mb-1 font-sans">Giá từ</span>
                  <strong className="text-xl font-bold text-[#f5f5fa] tracking-tight font-bold">4.8 Tỷ</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee footer text element running automatically with GSAP */}
        <div className="absolute left-0 bottom-4 w-[200%] overflow-hidden whitespace-nowrap z-10 pointer-events-none opacity-8">
          <div className="gsap-marquee-span inline-block font-serif text-[110px] font-black text-white/40 tracking-wider uppercase">
            AVANTA MOTORS — KHÔNG GIAN DÀNH CHO KHÁCH VIP — ĐÓN TIẾP KHÉP KÍN — KIỆT TÁC CHẾ TÁC THỦ CÔNG — AVANTA MOTORS — KHÔNG GIAN DÀNH CHO KHÁCH VIP — ĐÓN TIẾP KHÉP KÍN — 
          </div>
        </div>
      </section>

      {/* SECTION 2: BRAND EXPERIENCES */}
      <section id="experience" className="py-24 px-6 md:px-12 lg:px-20 bg-[#070707] relative overflow-hidden">
        {/* Spot light overlay */}
        <div className="absolute left-[-200px] top-1/3 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="gsap-feel-reveal inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-bold">
              <span className="w-8 h-[1px] bg-gold-custom"></span>
              <span>Triết lý thương hiệu</span>
            </div>

            <h2 className="gsap-feel-reveal font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Thành trì của <br />
              nghệ thuật cơ khí<span className="text-gold-custom">.</span>
            </h2>

            <p className="gsap-feel-reveal text-white/60 text-sm md:text-base leading-relaxed">
              Chúng tôi kính mời quý chủ nhân bước vào không gian tinh tế nơi trú ẩn của cảm xúc, trải nghiệm những tinh tuyển may đo riêng biệt cùng các cố vấn đỉnh cao.
            </p>

            <div className="space-y-4">
              <div className="gsap-feel-reveal flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gold-custom/10 border border-gold-custom/20 flex items-center justify-center shrink-0">
                  <Gem className="w-5 h-5 text-gold-custom" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Kiệt Tác Thiết Kế Nguyên Bản</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Mỗi sản phẩm đều trải qua các vòng vi chỉnh tinh chỉnh diện mạo láng mịn hoàn mỹ nhất trước khi giao đến chủ nhân.</p>
                </div>
              </div>

              <div className="gsap-feel-reveal flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gold-custom/10 border border-gold-custom/20 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-gold-custom" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Buổi Thưởng Lãm Khép Kín</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Quy trình đón tiếp tối mật tuần tự đảm bảo sự tập trung cao độ và trải nghiệm tĩnh lặng thư thái trọn vẹn.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium layered visual collage with GSAP Scroll parallax */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[600px] w-full flex items-center justify-center">
            {/* Top right image */}
            <div className="gsap-collage-img-one absolute right-0 top-0 w-[55%] h-[80%] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-102 duration-500">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=90" 
                alt="Showroom Lounge" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom left image */}
            <div className="gsap-collage-img-two absolute left-0 bottom-4 w-[50%] h-[48%] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl transition-transform hover:scale-102 duration-500 z-10 bg-black">
              <img 
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=90" 
                alt="Supercar carbon details" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Float badge widget with bouncy entrance */}
            <div className="gsap-collage-badge absolute left-[20%] top-[40%] p-6 rounded-2xl bg-black/85 border border-gold-custom/40 backdrop-blur-md z-20 shadow-2xl max-w-[210px] pointer-events-none opacity-0">
              <span className="text-[26px] font-serif font-black text-gold-custom leading-tight">1:1</span>
              <p className="text-[11px] text-white/60 leading-normal mt-1">
                Tư vấn trực tiếp 1-đối-1 cùng các cố vấn chuyên trách của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: AVAILABLE FLEET SHOWCASE */}
      <ModelShowcase 
        onSelectModelForBooking={handleSelectModel} 
        onOpenSpecsModal={setInspectingModel} 
      />

      {/* SECTION 4: LUXURY CABIN DETAIL */}
      <section id="interior" className="py-24 px-6 md:px-12 lg:px-20 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 h-[420px] md:h-[580px] rounded-[52px] overflow-hidden border border-white/10 group relative bg-black shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=90" 
              alt="Bespoke Cabin Craft" 
              className="gsap-cabin-img-reveal w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="gsap-cabin-text-reveal inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-bold">
              <span className="w-8 h-[1px] bg-gold-custom"></span>
              <span>Chế tác tỉ mỉ</span>
            </div>

            <h2 className="gsap-cabin-text-reveal font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Không gian tĩnh lặng, đánh thức xúc giác<span className="text-gold-custom">.</span>
            </h2>

            <p className="gsap-cabin-text-reveal text-white/60 text-sm md:text-base leading-relaxed">
              Các thiết kế khoang hành khách cao cấp ôm trọn quý chủ nhân trong lớp bảo vệ âm thanh, phối hợp với chất liệu gỗ tự nhiên ấm áp và đường viền công thái học đỉnh cao.
            </p>

            {/* Spec lines */}
            <div className="border-t border-white/10 divide-y divide-white/10">
              <div className="gsap-cabin-text-reveal py-4 grid grid-cols-12 gap-4">
                <span className="col-span-4 font-mono text-[10px] uppercase tracking-wider text-gold-custom font-extrabold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Da Saddle</span>
                </span>
                <p className="col-span-8 text-xs text-white/60 leading-normal">
                  Da thượng hạng được tinh chọn đồng đều vân sinh học tuyệt đối, khâu chỉ phẳng thủ công mềm mại như lụa.
                </p>
              </div>

              <div className="gsap-cabin-text-reveal py-4 grid grid-cols-12 gap-4">
                <span className="col-span-4 font-mono text-[10px] uppercase tracking-wider text-gold-custom font-extrabold flex items-center gap-1.5">
                  <AudioLines className="w-3.5 h-3.5" />
                  <span>Âm trường</span>
                </span>
                <p className="col-span-8 text-xs text-white/60 leading-normal">
                  Hệ thống màng loa đa dải phân bổ không gian được tinh toán lý thuyết sâu đem lại độ méo âm cực thấp.
                </p>
              </div>

              <div className="gsap-cabin-text-reveal py-4 grid grid-cols-12 gap-4">
                <span className="col-span-4 font-mono text-[10px] uppercase tracking-wider text-gold-custom font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Thư thái</span>
                </span>
                <p className="col-span-8 text-xs text-white/60 leading-normal">
                  Trị lưu khí dịu nhẹ phối hợp các xung nhiệt hồng ngoại thông minh khôi phục sinh lực cơ thể tuyệt hảo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OWNERSHIP BENEFIT DETAILS */}
      <section id="ownership" className="py-24 px-6 md:px-12 lg:px-20 bg-[#0c0b09] relative overflow-hidden">
        {/* Lights */}
        <div className="absolute right-[-100px] bottom-0 w-[500px] h-[500px] bg-red-400/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="gsap-concierge-sticky lg:col-span-5 lg:sticky lg:top-36 space-y-4">
            <div className="inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-bold">
              <span className="w-8 h-[1px] bg-gold-custom"></span>
              <span>Cố vấn VIP</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Đặc quyền Sở hữu vượt chuẩn.
            </h2>

            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans">
              Mối gắn kết của chúng tôi không dừng lại sau khi trao khóa. Bản lĩnh đồng hành cùng giới tinh anh sưu tầm thông qua các đặc quyền dịch vụ thượng hạng khép kín nhất.
            </p>
          </div>

          {/* Cards collection of services with staggered GSAP reveal */}
          <div className="lg:col-span-7 space-y-6">
            {SERVICE_BENEFITS.map((serv) => (
              <div 
                key={serv.id}
                className="gsap-service-card p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white-[0.06] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-2 font-serif text-4xl md:text-6xl text-stroke-gold font-extrabold leading-none">
                  {serv.num}
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-serif text-2xl font-bold text-cream-custom mb-2">
                    {serv.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: SERVICE TICKETS DASHBOARD */}
      <ActiveBookings 
        bookings={bookings} 
        onCancelBooking={handleDeleteBooking} 
        onRescheduleTime={handleReschedule} 
      />

      {/* SECTION 7: LUXURY CTA / BOOKING INTAKE SECTION */}
      <footer id="booking" className="py-24 px-6 md:px-12 lg:px-20 bg-cover bg-center border-t border-white/10 relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.45), rgba(0,0,0,0.95)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90')` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-bold mb-4">
              <span className="w-8 h-[1px] bg-gold-custom"></span>
              <span>Thư Mời Phòng Chờ</span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl font-black leading-[0.9] tracking-tight text-white mb-6">
              Sẵn sàng sở hữu <br />
              một khoảnh khắc <span className="text-stroke italic font-bold">an yên?</span>
            </h2>

            <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-xl mb-8 font-sans">
              Lựa chọn khung lịch đón tiếp kín tại căn phòng sảnh của chúng tôi. Các chuyên viên phối hợp sẽ liên lạc trực tiếp trong 24 giờ tiếp theo để xác nhận các quyền hạn đón tiếp.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 font-mono text-[11px] border-t border-white/10 pt-6 max-w-md">
              <div>
                <span className="block text-white/40 mb-1">Công suất tiếp đón</span>
                <strong className="text-white">Tối đa 6 Lượt / Ngày</strong>
              </div>
              <div>
                <span className="block text-white/40 mb-1">Đặc quyền Sảnh chờ</span>
                <strong className="text-white">Thành viên VIP Club</strong>
              </div>
              <div>
                <span className="block text-white/40 mb-1">Thời gian phản hồi</span>
                <strong className="text-white">Dưới 1 giờ</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 w-full max-w-lg justify-self-center lg:justify-self-end">
            <BookingForm 
              preselectedModelId={selectedModelId} 
              preselectedColor={selectedPaintColor} 
              onBookingSuccess={handleBookingSuccess} 
            />
          </div>
        </div>

        {/* Humble copyright block */}
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-10 mt-20 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono tracking-widest text-white/30 relative z-20 gap-4">
          <div>© {new Date().getFullYear()} AVANTA SHOWROOM INC. ĐÃ ĐĂNG KÝ BẢO HỘ.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-custom transition-colors">CHÍNH SÁCH BẢO MẬT</a>
            <a href="#" className="hover:text-gold-custom transition-colors">CẨM NANG SỞ HỮU</a>
            <a href="#" className="hover:text-gold-custom transition-colors">TẦM NHÌN THƯƠNG HIỆU</a>
          </div>
        </div>
      </footer>

      {/* Specs calculator overlay modal */}
      <VehicleSpecModal 
        model={inspectingModel} 
        onClose={() => setInspectingModel(null)} 
      />
    </div>
  );
}
