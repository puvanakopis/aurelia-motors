export type UserRole = 'CUSTOMER' | 'SALES_STAFF' | 'MANAGER' | 'ADMIN' | 'SUPER_ADMIN';

export type FuelType = 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';
export type Transmission = 'AUTOMATIC' | 'MANUAL' | 'CVT' | 'DCT';
export type StockStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'IN_TRANSIT';

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'FOLLOW_UP' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED';
export type TestDriveStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type QuotationStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  country?: string | null;
  description?: string | null;
  vehicleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  vehicleCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleImage {
  id: string;
  vehicleId: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface VehicleSpecification {
  id: string;
  vehicleId: string;
  category: string; 
  name: string;
  value: string;
}

export interface Vehicle {
  id: string;
  brandId: string;
  categoryId: string;
  name: string;
  model: string;
  variant?: string | null;
  year: number;
  price: number;
  discountPrice?: number | null;
  description: string;
  fuelType: FuelType;
  transmission: Transmission;
  engine?: string | null;
  engineCapacity?: string | null; 
  horsepower?: number | null; 
  torque?: number | null; 
  mileage: number; 
  color: string;
  doors: number;
  seats: number;
  stockStatus: StockStatus;
  featured: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  brand?: Brand;
  category?: Category;
  images?: VehicleImage[];
  specifications?: VehicleSpecification[];
  inventory?: InventoryItem[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingHours: string;
  latitude?: number | null;
  longitude?: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  vehicleId: string;
  branchId: string;
  quantity: number;
  reserved: number;
  available: number;
  status: StockStatus;
  vin?: string | null;
  branch?: Branch;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  vehicleId?: string | null;
  userId?: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: EnquiryStatus;
  assignedStaffId?: string | null;
  notes?: string | null;
  vehicle?: Vehicle | null;
  user?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface TestDriveRequest {
  id: string;
  vehicleId: string;
  userId?: string | null;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  status: TestDriveStatus;
  assignedStaffId?: string | null;
  notes?: string | null;
  vehicle?: Vehicle;
  branch?: Branch;
  user?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRequest {
  id: string;
  vehicleId: string;
  userId?: string | null;
  name: string;
  email: string;
  phone: string;
  financingPreference?: 'CASH' | 'LEASE' | 'FINANCE' | null;
  tradeInDetails?: string | null;
  downPayment?: number | null;
  termMonths?: number | null;
  status: QuotationStatus;
  finalPrice?: number | null;
  discount?: number | null;
  fees?: number | null;
  validUntil?: string | null;
  notes?: string | null;
  vehicle?: Vehicle;
  user?: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  startDate: string;
  endDate: string;
  active: boolean;
  bannerUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface VehicleFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  minYear?: number;
  maxYear?: number;
  stockStatus?: StockStatus;
  featured?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc' | 'newest';
}
