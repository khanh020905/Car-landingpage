import { motion } from 'motion/react';
import { Sparkles, Calendar, Menu, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenBooking: () => void;
  bookingCount: number;
}

export default function Header({ onOpenBooking, bookingCount }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Dynamic elegant local showroom clock
    const interval = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-5 left-1/2 -translate-x-1/2 w-[92%] md:w-[88%] max-w-7xl h-20 px-6 md:px-10 z-[60] flex items-center justify-between rounded-full transition-all duration-500 border border-white/10 ${
        scrolled 
          ? 'bg-black/60 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl py-3 border-white/15' 
          : 'bg-[#050505]/40 backdrop-blur-md'
      }`}
    >
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-cream-custom transition-all duration-300">
          AVANTA<span className="text-gold-custom group-hover:text-white transition-colors">.</span>
        </span>
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-mono tracking-wider text-gold-custom">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Showroom Thượng lưu</span>
        </div>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-white/70 uppercase">
        <a href="#experience" className="hover:text-gold-custom transition-colors relative py-1 group">
          Trải nghiệm
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-custom transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#models" className="hover:text-gold-custom transition-colors relative py-1 group">
          Dòng xe
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-custom transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#interior" className="hover:text-gold-custom transition-colors relative py-1 group">
          Chế tác Cabin
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-custom transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#ownership" className="hover:text-gold-custom transition-colors relative py-1 group">
          Đặc quyền VIP
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-custom transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      {/* Active Session Stats / CTA */}
      <div className="flex items-center gap-3">
        {/* GMT Clock */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono tracking-wider text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-gold-custom" />
          <span>Giờ Showroom: <strong className="text-white text-stroke-[0.3px] font-bold">{timeStr || '09:24'}</strong></span>
        </div>

        <button 
          onClick={onOpenBooking}
          className="relative inline-flex items-center gap-2.5 px-5 md:px-6 py-2.5 bg-cream-custom hover:bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full transition-transform active:scale-95 group font-mono shadow-lg shadow-gold-custom/5"
        >
          <Calendar className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          <span>Đặt Phòng Chờ</span>
          {bookingCount > 0 && (
            <span className="absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-custom text-[10px] font-extrabold text-black ring-2 ring-black animate-bounce">
              {bookingCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
