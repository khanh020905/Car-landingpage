import { ViewingAppointment } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface ActiveBookingsProps {
  bookings: ViewingAppointment[];
  onCancelBooking: (id: string) => void;
  onRescheduleTime: (id: string, newTime: string) => void;
}

export default function ActiveBookings({ bookings, onCancelBooking, onRescheduleTime }: ActiveBookingsProps) {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 bg-black/60 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-custom tracking-[0.2em] text-[10px] uppercase font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nhật Ký Phiên Bản</span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Đặc quyền Phòng chờ của bạn
            </h3>
          </div>
          <p className="text-white/50 text-xs md:text-sm max-w-sm">
            Xem lại, thay đổi khung giờ họp, hoặc hủy lời mời chờ xử lý trực tiếp. Các cuộc hẹn được lưu cục bộ trên thiết bị của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold-custom/30 transition-all duration-300 relative group"
              >
                {/* ID badge and status indicator */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs font-bold text-gold-custom bg-gold-custom/10 border border-gold-custom/20 px-2.5 py-1 rounded-md">
                    Mã hẹn: {booking.id}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full animate-pulse">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{booking.status === 'Confirmed' ? 'Đã xác nhận' : booking.status}</span>
                  </span>
                </div>

                {/* Car Spec details */}
                <h4 className="text-sm font-extrabold text-white mb-1">
                  {booking.preferredModelName}
                </h4>
                <p className="text-[11px] text-white/50 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-gold-custom" />
                  <span>{booking.visitType === 'Exclusive Lounge Walkthrough' ? 'Trực tiếp tại Phòng chờ VIP' : booking.visitType === 'Virtual Dynamic Spec Consultation' ? 'Tư vấn Trực tuyến 1:1' : booking.visitType}</span>
                </p>

                {/* Time selectors & Rescheduling tool */}
                <div className="p-3 bg-black/40 border border-white/5 rounded-2xl mb-4 font-mono text-[11px] flex flex-col gap-2">
                  <div className="flex justify-between text-white/60">
                    <span>Ngày hẹn:</span>
                    <strong className="text-white">{booking.preferredDate}</strong>
                  </div>
                  <div className="flex justify-between items-center text-white/60">
                    <span>Khung giờ:</span>
                    <select
                      value={booking.preferredTime}
                      onChange={(e) => onRescheduleTime(booking.id, e.target.value)}
                      className="bg-black border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-gold-custom font-semibold outline-none focus:border-gold-custom"
                    >
                      <option value="09:00">09:00 sáng</option>
                      <option value="11:30">11:30 trưa</option>
                      <option value="14:00">14:00 chiều</option>
                      <option value="16:30">16:30 chiều</option>
                      <option value="19:00">19:00 tối</option>
                    </select>
                  </div>
                </div>

                {/* Info about client */}
                <div className="border-t border-white/10 pt-4 mt-2 flex items-center justify-between">
                  <div className="text-[10px] text-white/40 leading-normal">
                    <div>Khách hàng: <b className="text-white/70">{booking.userName}</b></div>
                    <div>Thư điện tử: <span className="text-white/70">{booking.userEmail}</span></div>
                  </div>

                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                    title="Hủy lịch hẹn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
