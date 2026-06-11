export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  acceleration: string; // e.g., "3.2s"
  power: string;       // e.g., "680HP"
  topSpeed: string;    // e.g., "310 km/h"
  transmission: string; // e.g., "8-Speed Dual-Clutch"
  engine: string;      // e.g., "4.0L Twin-Turbo V8"
  priceVND: string;    // e.g., "4.8 tỷ"
  approxValue: number; // numeric value for budget comparisons
  image: string;
  interiorImage: string;
  availableColors: { name: string; hex: string }[];
}

export interface ServiceBenefit {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface ViewingAppointment {
  id: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  preferredModelId: string;
  preferredModelName: string;
  budgetRange: string;
  visitType: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending Approval' | 'Confirmed' | 'Rescheduled';
  createdAt: string;
}
