import { CarModel } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Shield, Cpu, Activity, Circle, Percent, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface VehicleSpecModalProps {
  model: CarModel | null;
  onClose: () => void;
}

export default function VehicleSpecModal({ model, onClose }: VehicleSpecModalProps) {
  const [downpaymentPercent, setDownpaymentPercent] = useState(20); // 20% down
  const [leaseTermMonths, setLeaseTermMonths] = useState(36); // 36 months

  if (!model) return null;

  // Simple leasing logic:
  // Down payment = 10% - 50%
  // Interest rate ~ 6.5% annually
  // Approximate vehicle price as parsed numeric
  const totalCost = model.approxValue;
  const downpaymentAmount = Math.round(totalCost * (downpaymentPercent / 100));
  const principalToFinance = totalCost - downpaymentAmount;
  const annualInterestRate = 0.065;
  const monthlyInterestRate = annualInterestRate / 12;
  
  // Amortization formula
  const monthlyPaymentRaw = (principalToFinance * monthlyInterestRate) / 
    (1 - Math.pow(1 + monthlyInterestRate, -leaseTermMonths));
  
  const formattedMonthlyPay = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(monthlyPaymentRaw);

  const formattedDownPay = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(downpaymentAmount);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto block">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl cursor-zoom-out"
        />

        {/* Modal body */}
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl rounded-[40px] bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Photo & Material Previews */}
              <div className="relative min-h-[350px] lg:min-h-full bg-black flex flex-col justify-between">
                <img
                  src={model.interiorImage}
                  alt={model.name + ' Cabin'}
                  className="w-full h-full object-cover opacity-70 absolute inset-0 z-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 z-10" />

                {/* Top dynamic info */}
                <div className="relative z-20 p-8">
                  <span className="font-mono text-[10px] text-gold-custom tracking-[0.2em] uppercase font-bold">
                    Khoang Động Cơ & Cabin Chế tác
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-white mt-2">
                    Thông Số Mỹ Nghệ Thiết Kế
                  </h3>
                  <p className="text-white/60 text-xs mt-2 leading-relaxed max-w-sm">
                    Quy trình tuyển lựa vật liệu cao cấp khắt khe nhất. Cabin sang trọng hoàn thiện thủ công của chúng tôi được tiêu âm triệt để bằng vật liệu âm học thích ứng.
                  </p>
                </div>

                {/* Dynamic features block */}
                <div className="relative z-20 p-8 mt-auto flex flex-col gap-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-gold-custom shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Di Sản Đường Đua Huyền Thoại</h4>
                      <p className="text-[10px] text-white/60">Sử dụng các hợp kim titan rèn cơ khí siêu nhẹ cùng thanh cân bằng trục chủ động linh hoạt.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gold-custom shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Chế Độ Bảo Dưỡng Thượng Hạng</h4>
                      <p className="text-[10px] text-white/60">Gói đặc quyền bảo hành và kiểm chuẩn kỹ thuật toàn diện 5 năm không giới hạn chi phí phát sinh.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs & Interactive Finance Calculator */}
              <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                <div className="mb-6">
                  <span className="text-gold-custom text-[10px] font-mono tracking-widest uppercase font-bold">
                    Phương Thức Sở Hữu Riêng Biệt
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-white mt-1">
                    {model.name}
                  </h1>
                  <span className="text-white/50 text-xs tracking-wider">{model.tagline}</span>
                </div>

                {/* Core Specifications */}
                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3.5">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                    <span className="text-white/50">Cấu trúc Động cơ:</span>
                    <strong className="text-white text-right">{model.engine}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                    <span className="text-white/50">Hộp số truyền động:</span>
                    <strong className="text-white text-right">{model.transmission}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/50">Giá niêm yết tiêu chuẩn:</span>
                    <strong className="text-gold-custom text-sm font-extrabold">{model.priceVND}</strong>
                  </div>
                </div>

                {/* Interactive Payment Estimator */}
                <div className="p-6 rounded-2xl bg-white/5 border border-gold-custom/20">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gold-custom mb-4 flex items-center gap-1.5">
                    <Percent className="w-4 h-4" />
                    <span>Dự Tính Chi Phí Sở Hữu</span>
                  </h4>

                  {/* Downpayment Range */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/70 mb-1.5 font-mono">
                      <span>Thanh toán trước:</span>
                      <strong className="text-white">{downpaymentPercent}% ({formattedDownPay})</strong>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={downpaymentPercent}
                      onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
                      className="w-full accent-gold-custom h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Lease term selection */}
                  <div className="mb-5">
                    <span className="block text-xs text-white/70 mb-2 font-mono">Thời gian thanh toán:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[24, 36, 48].map((months) => (
                        <button
                          key={months}
                          onClick={() => setLeaseTermMonths(months)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
                            leaseTermMonths === months
                              ? 'bg-gold-custom text-black'
                              : 'bg-white/5 hover:bg-white/10 text-white/80'
                          }`}
                        >
                          {months} Tháng
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Output */}
                  <div className="p-4 bg-black/50 border border-white/5 rounded-xl text-center">
                    <span className="block text-[10px] text-white/50 uppercase tracking-widest font-mono mb-1">
                      Ước Tính Hàng Tháng (Lợi suất 6.5%)
                    </span>
                    <strong className="text-2xl md:text-3xl font-extrabold text-gold-custom font-mono font-bold">
                      {formattedMonthlyPay} / tháng
                    </strong>
                    <p className="text-[9px] text-white/40 mt-1.5 leading-normal">
                      Số liệu chỉ mang tính chất tham khảo dựa trên lãi suất ngân hàng tiêu chuẩn. Các chi phí đăng ký chính thức sẽ được áp dụng khi bàn giao thực tế.
                    </p>
                  </div>
                </div>

                {/* Close modal action */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-full transition-colors font-mono cursor-pointer"
                  >
                    Đóng Bảng Thông Tin
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
