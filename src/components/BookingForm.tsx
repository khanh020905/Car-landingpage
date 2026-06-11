import React, { useState, useEffect } from 'react';
import { CAR_MODELS } from '../data';
import { CarModel, ViewingAppointment } from '../types';
import { Sparkles, CalendarRange, Clock, ShieldAlert, BadgeCheck, Check } from 'lucide-react';

interface BookingFormProps {
  preselectedModelId: string;
  preselectedColor?: string;
  onBookingSuccess: (newBooking: ViewingAppointment) => void;
}

export default function BookingForm({ 
  preselectedModelId, 
  preselectedColor = '',
  onBookingSuccess 
}: BookingFormProps) {
  const [modelId, setModelId] = useState(preselectedModelId);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [budgetRange, setBudgetRange] = useState('3B - 5B');
  const [visitType, setVisitType] = useState('Private showroom');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00');
  
  // Custom states
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Sync with prop changes when parent updates preselected car
  useEffect(() => {
    if (preselectedModelId) {
      setModelId(preselectedModelId);
    }
  }, [preselectedModelId]);

  const selectedCar = CAR_MODELS.find(c => c.id === modelId) || CAR_MODELS[0];

  // Helper check for budget alignment
  // AVANTA S = 3.2B, GT Black = 4.8B, R = 5.6B
  // Ranges: "Under 3B", "3B - 5B", "Above 5B"
  const isBudgetAligned = () => {
    const cost = selectedCar.approxValue;
    if (budgetRange === 'Under 3B') {
      return cost <= 3200000000;
    } else if (budgetRange === '3B - 5B') {
      return cost <= 4800000000;
    }
    return true; // Above 5B is aligned for all
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!userName.trim()) {
      setErrorText('Please enter your full name for credentials.');
      return;
    }
    if (!userPhone.trim() || userPhone.length < 8) {
      setErrorText('Please enter a valid luxury-line contact number.');
      return;
    }
    if (!userEmail.includes('@')) {
      setErrorText('Please specify a secure matching email address.');
      return;
    }
    if (!preferredDate) {
      setErrorText('Please select an appointment viewing date.');
      return;
    }

    // Verify future date
    const selectedDateTime = new Date(preferredDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDateTime < today) {
      setErrorText('Thời gian hẹn đã qua. Vui lòng chọn một ngày trong tương lai.');
      return;
    }

    // Generate viewing record
    const newAppointment: ViewingAppointment = {
      id: 'AV-' + Math.floor(Math.random() * 89999 + 10000),
      userName,
      userPhone,
      userEmail,
      preferredModelId: modelId,
      preferredModelName: `${selectedCar.name} ${preselectedColor ? `(${preselectedColor})` : ''}`,
      budgetRange,
      visitType,
      preferredDate,
      preferredTime,
      status: 'Pending Approval',
      createdAt: new Date().toISOString()
    };

    onBookingSuccess(newAppointment);
    setSuccess(true);
    
    // Clear inputs
    setUserName('');
    setUserPhone('');
    setUserEmail('');
    setPreferredDate('');
  };

  const handleReset = () => {
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="p-8 md:p-10 rounded-[36px] bg-white/5 border border-gold-custom/30 text-center flex flex-col items-center justify-center min-h-[460px] backdrop-blur-3xl shadow-[0_20px_50px_rgba(215,180,106,0.15)]">
        <div className="w-16 h-16 rounded-full bg-gold-custom/10 border border-gold-custom flex items-center justify-center mb-6 animate-pulse">
          <Check className="w-8 h-8 text-gold-custom" />
        </div>
        <h3 className="font-serif text-3xl font-extrabold text-cream-custom mb-3">
          Đặt Lịch Thành Công
        </h3>
        <p className="text-white/70 text-xs md:text-sm max-w-sm mx-auto leading-relaxed mb-8">
          Yêu cầu trải nghiệm riêng tư của quý khách đã được ghi nhận bảo mật trên hệ thống. Chuyên viên tư vấn cao cấp sẽ liên hệ với quý khách trong vòng 1 giờ để xác nhận thông tin tuyển lựa.
        </p>

        <button 
          onClick={handleReset}
          className="px-6 py-3 bg-cream-custom hover:bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full transition-all active:scale-95"
        >
          Đặt Lịch Hẹn Khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_45px_100px_-30px_rgba(0,0,0,0.8)] relative">
      <div className="absolute right-6 top-6">
        <CalendarRange className="w-6 h-6 text-gold-custom/40" />
      </div>

      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-cream-custom mb-2">
        Đăng Ký Đón Tiếp
      </h3>
      <p className="text-white/50 text-[11px] uppercase tracking-widest font-mono mb-6">
        Đặt Lịch Phòng Chờ Độc Quyền Trực Tiếp
      </p>

      {/* Model Selection */}
      <div className="mb-4">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
          Dòng Xe Mong Muốn
        </label>
        <select 
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white outline-none focus:border-gold-custom text-xs md:text-sm font-semibold transition-colors"
        >
          {CAR_MODELS.map(car => (
            <option key={car.id} value={car.id}>
              {car.name} ({car.tagline})
            </option>
          ))}
        </select>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Họ và Tên
          </label>
          <input 
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Quốc Khánh"
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white placeholder:text-white/20 outline-none focus:border-gold-custom text-xs md:text-sm transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Số Điện Thoại Liên Hệ
          </label>
          <input 
            type="tel"
            required
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="Ví dụ: 0909 123 456"
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white placeholder:text-white/20 outline-none focus:border-gold-custom text-xs md:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
          Địa Chỉ Thư Điện Tử
        </label>
        <input 
          type="email"
          required
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="email.cua.ban@gmail.com"
          className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white placeholder:text-white/20 outline-none focus:border-gold-custom text-xs md:text-sm transition-colors"
        />
      </div>

      {/* Date & Time Select */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Ngày Hẹn Ưu Tiên
          </label>
          <input 
            type="date"
            required
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white outline-none focus:border-gold-custom text-xs font-semibold transition-colors"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Khung Giờ Đón Tiếp
          </label>
          <select 
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white outline-none focus:border-gold-custom text-xs font-semibold transition-colors"
          >
            <option value="09:00">09:00 Sáng (Đặc quyền Sớm)</option>
            <option value="11:30">11:30 Trưa (Yên tĩnh Thư thái)</option>
            <option value="14:00">14:00 Chiều (Trải nghiệm Chiều)</option>
            <option value="16:30">16:30 Chiều (Khoảnh khắc Hoàng hôn)</option>
            <option value="19:00">19:00 Tối (Dạ tiệc Độc bản)</option>
          </select>
        </div>
      </div>

      {/* Budget & Visit Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Ngân Sách Đầu Tư Dự Kiến
          </label>
          <select 
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white outline-none focus:border-gold-custom text-xs md:text-sm font-semibold transition-colors"
          >
            <option value="Under 3B">Dưới 3.0 Tỷ (Trải nghiệm Tiêu chuẩn)</option>
            <option value="3B - 5B">3.0 - 5.0 Tỷ (Phân khúc Cao cấp)</option>
            <option value="Above 5B">Trên 5.0 Tỷ (Tuyệt tác Thượng lưu)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 font-mono">
            Phương Thức Trải Nghiệm
          </label>
          <select 
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            className="w-full h-13 px-4 rounded-xl border border-white/10 bg-black/60 text-white outline-none focus:border-gold-custom text-xs md:text-sm font-semibold transition-colors"
          >
            <option value="Private showroom">Tham quan Showroom Riêng Tư</option>
            <option value="VIP Club Track Day">Trải nghiệm Đường đua VIP Club</option>
            <option value="Secure Home Delivery">Bàn giao & Trải nghiệm tại Tư Gia</option>
            <option value="Virtual 1:1 Call">Tương tác Video Cao cấp 1:1</option>
          </select>
        </div>
      </div>

      {/* Dynamic Intelligence Warning / Alignment message */}
      <div className="mb-6">
        {isBudgetAligned() ? (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-[11px] text-emerald-400">
            <BadgeCheck className="w-4 h-4 shrink-0" />
            <span className="leading-tight">Sự Phù Hợp Hoàn Hảo: Ngân sách dự kiến của quý khách hoàn toàn tương xứng với dòng xe {selectedCar.name}.</span>
          </div>
        ) : (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-[11px] text-amber-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="leading-tight">Lưu ý: Mức giá của dòng xe được chọn là {selectedCar.priceVND}. Hãy liên hệ chúng tôi để thỏa thuận về các phương thức sở hữu linh hoạt dành riêng cho quý khách.</span>
          </div>
        )}
      </div>

      {errorText && (
        <div className="mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          {errorText}
        </div>
      )}

      <button
        type="submit"
        className="w-full h-14 bg-cream-custom hover:bg-white text-black font-extrabold text-xs tracking-widest uppercase rounded-full transition-transform active:scale-98 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-black" />
        <span>Gửi Lời Mời Đặc Quyền VIP</span>
      </button>
    </form>
  );
}
