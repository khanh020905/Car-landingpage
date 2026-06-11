import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAR_MODELS } from '../data';
import { CarModel } from '../types';
import { Zap, ShieldCheck, Cpu, Gauge, Maximize2, Palette, CheckCircle2 } from 'lucide-react';

interface ModelShowcaseProps {
  onSelectModelForBooking: (model: CarModel, customColor: string) => void;
  onOpenSpecsModal: (model: CarModel) => void;
}

export default function ModelShowcase({ onSelectModelForBooking, onOpenSpecsModal }: ModelShowcaseProps) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const currentModel = CAR_MODELS[selectedModelIndex];

  // Keep track of configured paint color per vehicle index
  const [configuredColors, setConfiguredColors] = useState<Record<string, string>>({
    'gt-black': currentModel.availableColors[0].name,
    'avanta-s': CAR_MODELS[1].availableColors[0].name,
    'avanta-r': CAR_MODELS[2].availableColors[0].name,
  });

  const activeColorName = configuredColors[currentModel.id];

  const handleColorSelect = (colorName: string) => {
    setConfiguredColors(prev => ({
      ...prev,
      [currentModel.id]: colorName
    }));
  };

  return (
    <section id="models" className="py-24 px-6 md:px-12 lg:px-20 bg-soft-black border-y border-white/5 relative overflow-hidden">
      {/* Decorative ambient background lights */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-gold-custom/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-[450px] h-[450px] bg-red-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Dynamic header row matching high-end layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 text-gold-custom tracking-[0.4em] text-[10px] uppercase font-mono font-extrabold mb-4">
              <span className="w-8 h-[1px] bg-gold-custom"></span>
              <span>Bộ Sưu Tập Độc Bản</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-black tracking-tight text-white m-0">
              Khẳng định <br />
              <span className="text-stroke font-serif italic font-bold">Vị thế cá nhân.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 text-sm md:text-base leading-relaxed font-sans">
            Bộ sưu tập kiệt tác tư nhân được tinh chỉnh cơ khí đỉnh cao đem lại uy lực mạnh mẽ. Khám phá các dòng xe, tùy chọn màu sơn kim loại thượng hạng và khởi động thiết kế cấu hình của bạn.
          </p>
        </div>

        {/* Model Tabs Selection */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {CAR_MODELS.map((model, idx) => (
            <button
              key={model.id}
              onClick={() => setSelectedModelIndex(idx)}
              className={`px-6 py-4 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-3 select-none ${
                selectedModelIndex === idx
                  ? 'bg-white/10 text-gold-custom border-b-2 border-gold-custom'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
              <span>{model.name}</span>
            </button>
          ))}
        </div>

        {/* Main interactive showcase grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModel.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[580px] lg:min-h-[640px]"
          >
            {/* Primary configured car visualization */}
            <div className="lg:col-span-8 group relative rounded-[40px] overflow-hidden border border-white/10 bg-black/40 shadow-[0_45px_100px_-30px_rgba(0,0,0,0.9)] flex flex-col justify-between">
              {/* Image with scaling transition */}
              <div className="absolute inset-0 z-0">
                <img
                  src={currentModel.image}
                  alt={currentModel.name}
                  className="w-full h-full object-cover opacity-85 transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/50 to-transparent z-10 hidden lg:block" />
              </div>

              {/* Top overlay pills */}
              <div className="relative z-20 p-6 md:p-8 flex justify-between items-start pointer-events-none">
                <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-gold-custom uppercase font-mono">
                  {currentModel.tagline}
                </span>

                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white/80 uppercase font-mono flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-gold-custom" />
                    <span>{activeColorName}</span>
                  </span>
                </div>
              </div>

              {/* Bottom overlay: info cards */}
              <div className="relative z-20 p-6 md:p-8 mt-auto">
                <div className="max-w-xl">
                  <h3 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                    {currentModel.name}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6">
                    {currentModel.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-2xl md:text-3xl font-extrabold text-gold-custom tracking-tight font-mono">
                      {currentModel.priceVND}
                    </div>

                    <button
                      onClick={() => onSelectModelForBooking(currentModel, activeColorName)}
                      className="px-6 py-3 bg-cream-custom hover:bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full transition-all hover:scale-[1.03] active:scale-95"
                    >
                      Cấu hình & Đặt lịch hẹn
                    </button>

                    <button
                      onClick={() => onOpenSpecsModal(currentModel)}
                      className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center border border-white/10"
                      title="Xem Thông Số Cơ Khí"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick configuration rail */}
            <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
              {/* Premium Specs overview widget */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between h-auto lg:h-[48%]">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 font-mono">
                    Thông số hiệu năng
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-mono tracking-wider mb-1">
                        <Gauge className="w-3.5 h-3.5 text-gold-custom" />
                        <span>0 - 100 km/h</span>
                      </div>
                      <div className="text-2xl font-black font-serif text-white tracking-tight">
                        {currentModel.acceleration}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-mono tracking-wider mb-1">
                        <Zap className="w-3.5 h-3.5 text-gold-custom" />
                        <span>Công suất</span>
                      </div>
                      <div className="text-2xl font-black font-serif text-white tracking-tight">
                        {currentModel.power}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-mono tracking-wider mb-1">
                        <Cpu className="w-3.5 h-3.5 text-gold-custom" />
                        <span>Động cơ</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate" title={currentModel.engine}>
                        {currentModel.engine}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-mono tracking-wider mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-custom" />
                        <span>Tốc độ tối đa</span>
                      </div>
                      <div className="text-lg font-black font-serif text-white">
                        {currentModel.topSpeed}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bespoke Exterior Paint Color Specifier */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between h-auto lg:h-[48%]">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3 font-mono flex items-center justify-between">
                    <span>Cấu hình diện mạo</span>
                    <span className="text-gold-custom text-[9px] lowercase font-normal italic font-sans">Chọn lớp sơn</span>
                  </h4>
                  <p className="text-xs text-white/60 mb-5 leading-normal">
                    Trải nghiệm tương tác tinh tế của ánh sáng lên các lớp sơn xa xỉ của chúng tôi. Lựa chọn màu sơn của riêng quý khách:
                  </p>

                  <div className="flex flex-col gap-3">
                    {currentModel.availableColors.map((color) => {
                      const isActive = activeColorName === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => handleColorSelect(color.name)}
                          className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all duration-300 border ${
                            isActive
                              ? 'bg-white/10 border-gold-custom text-white'
                              : 'bg-transparent border-white/5 hover:border-white/20 text-white/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span 
                              className="w-5 h-5 rounded-full border border-white/30 shadow-inner block shrink-0" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs font-semibold">{color.name}</span>
                          </div>
                          {isActive && <CheckCircle2 className="w-4 h-4 text-gold-custom" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
