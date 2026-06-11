import { CarModel, ServiceBenefit } from './types';

export const CAR_MODELS: CarModel[] = [
  {
    id: 'gt-black',
    name: 'AVANTA GT Black',
    tagline: 'Tuyệt tác Uy lực & Không gian Nghỉ dưỡng',
    description: 'Một biểu tượng đỉnh cao kết hợp giữa hiệu năng thuần khiết và sự xa xỉ vô tiền khoáng hậu. Được chế tác riêng cho những chủ nhân tìm kiếm sự khác biệt tinh tế, sở hữu gói thiết kế khí động học sợi carbon cao cấp, da thượng hạng khâu tay tỉ mỉ và khối động cơ tăng áp kép chuyển động vô cùng mượt mà.',
    acceleration: '3.2s',
    power: '680HP',
    topSpeed: '325 km/h',
    transmission: 'Hộp số Ly hợp kép 8 Cấp',
    engine: '4.0L V8 Tăng áp kép',
    priceVND: '4.8 tỷ',
    approxValue: 4800000000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1300&q=90',
    interiorImage: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=90',
    availableColors: [
      { name: 'Đen Obsidian Ánh kim', hex: '#0B0C10' },
      { name: 'Xám Carbon Thời thượng', hex: '#2C3539' },
      { name: 'Vàng Aurum Hoàng gia', hex: '#B89B5F' },
      { name: 'Trắng Polar Mịn màng', hex: '#F5F5FA' }
    ]
  },
  {
    id: 'avanta-s',
    name: 'AVANTA S',
    tagline: 'Vẻ đẹp Kiêu sa, Sự tĩnh lặng & Phong thái Sang trọng',
    description: 'Thuần túy tinh hoa hành trình xa xỉ được định nghĩa lại. Thu hút mọi góc nhìn với những đường điêu khắc uyển chuyển, cabin bọc kính cách âm tuyệt đối, các điểm nhấn bằng gỗ óc chó tự nhiên thượng hạng và lớp da thuộc mịn như lụa.',
    acceleration: '3.9s',
    power: '510HP',
    topSpeed: '300 km/h',
    transmission: 'Hộp số Tự động 9 Cấp',
    engine: '3.0L Động cơ sáu xi-lanh thẳng hàng',
    priceVND: '3.2 tỷ',
    approxValue: 3200000000,
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1000&q=90',
    interiorImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=90',
    availableColors: [
      { name: 'Xanh lục Emerald Tự nhiên', hex: '#12302D' },
      { name: 'Xanh dương Monaco Ánh ngọc', hex: '#1D2A44' },
      { name: 'Đen Obsidian Ánh kim', hex: '#0B0C10' },
      { name: 'Xám Satin Lịch lãm', hex: '#70777A' }
    ]
  },
  {
    id: 'avanta-r',
    name: 'AVANTA R',
    tagline: 'Khúc giao hưởng của Chuyển động & Cảm xúc',
    description: 'Sinh ra để kết nối xúc cảm lái chân thực nhất. Lấy cảm hứng từ những cỗ máy đua huyền thoại, nhưng được tinh chỉnh hoàn hảo cho những cung đường biển phóng khoáng. Kết hợp hệ thống dẫn hướng trục sau chủ động, hệ giảm xóc race-tuned siêu nhẹ và nhịp đập động cơ nạp khí tự nhiên đầy kiêu hãnh.',
    acceleration: '2.8s',
    power: '740HP',
    topSpeed: '345 km/h',
    transmission: 'Hộp số Đua Thể thao 8 Cấp',
    engine: '4.2L Động cơ V8 Hút khí Tự nhiên',
    priceVND: '5.6 tỷ',
    approxValue: 5600000000,
    image: 'https://images.unsplash.com/photo-1549927681-0b673b8243ab?auto=format&fit=crop&w=1000&q=90',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=90',
    availableColors: [
      { name: 'Đỏ Crimson Thể thao', hex: '#7B1315' },
      { name: 'Trắng Apex Ánh ngọc', hex: '#F8F9FA' },
      { name: 'Xám Nardo Gloss Cá tính', hex: '#5A6065' },
      { name: 'Đen Obsidian Bóng đêm', hex: '#0B0C10' }
    ]
  }
];

export const SERVICE_BENEFITS: ServiceBenefit[] = [
  {
    id: 'viewing',
    num: '01',
    title: 'Đón Tiếp Riêng Tư',
    description: 'Đặc quyền trải nghiệm không gian sảnh tiếp khách VIP khép kín của chúng tôi để chiêm ngưỡng tuyệt tác xe cùng chuyên gia cá nhân trong sự tĩnh lặng và bảo mật tối đa.'
  },
  {
    id: 'financing',
    num: '02',
    title: 'Giải Pháp Tài Chính May Đo',
    description: 'Các gói tài chính doanh nghiệp cao cấp, phương án trao đổi nâng cấp xe linh hoạt và cơ chế giao dịch được tùy biến bảo mật cao nhất dành riêng cho từng chủ nhân.'
  },
  {
    id: 'delivery',
    num: '03',
    title: 'Kiệt Tác Bàn Giao Thượng Hạng',
    description: 'Dịch vụ vận chuyển chuyên dụng kín đến tận tư gia của quý khách, đi kèm quy trình bàn giao chìa khóa đặc biệt và đặc quyền tham dự các ngày hội trải nghiệm đường đua VIP.'
  }
];
