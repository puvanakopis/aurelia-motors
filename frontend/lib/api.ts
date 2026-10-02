import {
  Vehicle,
  Brand,
  Category,
  Branch,
  Offer,
  Enquiry,
  TestDriveRequest,
  QuotationRequest,
  PaginatedResponse,
  VehicleFilterParams,
  User,
} from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// --------------------------------------------------------
// Token Management
// --------------------------------------------------------
export const AUTH_TOKEN_KEY = 'aurelia_auth_token';
export const AUTH_USER_KEY = 'aurelia_auth_user';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthSession(token: string, user: User) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// --------------------------------------------------------
// Base Request Handler
// --------------------------------------------------------
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }

    const json = await response.json();
    if (json && typeof json === 'object' && 'meta' in json) {
      return { data: json.data, meta: json.meta } as unknown as T;
    }
    return (json.data !== undefined ? json.data : json) as T;
  } catch (error: any) {
    console.error(`API Error on [${options.method || 'GET'}] ${url}:`, error);
    throw error;
  }
}

// --------------------------------------------------------
// Authentication API
// --------------------------------------------------------
export async function login(email: string, password: string): Promise<{ user: User; accessToken: string }> {
  const res = await request<{ user: User; accessToken: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuthSession(res.accessToken, res.user);
  return res;
}

export async function getProfile(): Promise<User> {
  return request<User>('/auth/profile');
}

// --------------------------------------------------------
// Dashboard & Analytics API
// --------------------------------------------------------
export interface DashboardStats {
  metrics: {
    totalVehicles: number;
    availableVehicles: number;
    pendingTestDrives: number;
    totalTestDrives: number;
    newEnquiries: number;
    totalEnquiries: number;
    pendingQuotations: number;
    totalBrands: number;
    totalBranches: number;
    totalInventoryValue: number;
    averageVehiclePrice: number;
  };
  recentTestDrives: TestDriveRequest[];
  recentEnquiries: Enquiry[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return request<DashboardStats>('/dashboard/stats');
}

// --------------------------------------------------------
// Vehicles API
// --------------------------------------------------------
export async function getVehicles(
  params?: VehicleFilterParams,
): Promise<PaginatedResponse<Vehicle>> {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });
  }

  const endpoint = `/vehicles${query.toString() ? `?${query.toString()}` : ''}`;
  return request<PaginatedResponse<Vehicle>>(endpoint);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle> {
  return request<Vehicle>(`/vehicles/${slug}`);
}

export async function createVehicle(data: Partial<Vehicle>): Promise<Vehicle> {
  return request<Vehicle>('/vehicles', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
  return request<Vehicle>(`/vehicles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteVehicle(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/vehicles/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Brands API
// --------------------------------------------------------
export async function getBrands(): Promise<Brand[]> {
  return request<Brand[]>('/brands');
}

export async function getBrandBySlug(slug: string): Promise<Brand> {
  return request<Brand>(`/brands/${slug}`);
}

export async function createBrand(data: Partial<Brand>): Promise<Brand> {
  return request<Brand>('/brands', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBrand(id: string, data: Partial<Brand>): Promise<Brand> {
  return request<Brand>(`/brands/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteBrand(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/brands/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Categories API
// --------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  return request<Category[]>('/categories');
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
  return request<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category> {
  return request<Category>(`/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/categories/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Showroom Salons & Branches API
// --------------------------------------------------------
export async function getBranches(all: boolean = false): Promise<Branch[]> {
  return request<Branch[]>(`/branches${all ? '?all=true' : ''}`);
}

export async function createBranch(data: Partial<Branch>): Promise<Branch> {
  return request<Branch>('/branches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBranch(id: string, data: Partial<Branch>): Promise<Branch> {
  return request<Branch>(`/branches/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteBranch(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/branches/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Offers & Incentives API
// --------------------------------------------------------
export async function getOffers(all: boolean = false): Promise<Offer[]> {
  return request<Offer[]>(`/offers${all ? '?all=true' : ''}`);
}

export async function createOffer(data: Partial<Offer>): Promise<Offer> {
  return request<Offer>('/offers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOffer(id: string, data: Partial<Offer>): Promise<Offer> {
  return request<Offer>(`/offers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteOffer(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/offers/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Test Drive Appointments API
// --------------------------------------------------------
export interface CreateTestDriveInput {
  vehicleId: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

export async function bookTestDrive(
  data: CreateTestDriveInput,
): Promise<TestDriveRequest> {
  return request<TestDriveRequest>('/test-drives', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getTestDrives(page: number = 1, limit: number = 20): Promise<PaginatedResponse<TestDriveRequest>> {
  return request<PaginatedResponse<TestDriveRequest>>(`/test-drives?page=${page}&limit=${limit}`);
}

export async function updateTestDrive(
  id: string,
  data: { status?: string; assignedStaffId?: string; notes?: string },
): Promise<TestDriveRequest> {
  return request<TestDriveRequest>(`/test-drives/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteTestDrive(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/test-drives/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Concierge & Enquiries API
// --------------------------------------------------------
export interface CreateEnquiryInput {
  vehicleId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitEnquiry(
  data: CreateEnquiryInput,
): Promise<Enquiry> {
  return request<Enquiry>('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getEnquiries(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Enquiry>> {
  return request<PaginatedResponse<Enquiry>>(`/enquiries?page=${page}&limit=${limit}`);
}

export async function updateEnquiry(
  id: string,
  data: { status?: string; assignedStaffId?: string; notes?: string },
): Promise<Enquiry> {
  return request<Enquiry>(`/enquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteEnquiry(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/enquiries/${id}`, {
    method: 'DELETE',
  });
}

// --------------------------------------------------------
// Quotation & Bespoke Financing API
// --------------------------------------------------------
export interface CreateQuotationInput {
  vehicleId: string;
  name: string;
  email: string;
  phone: string;
  financingPreference?: 'CASH' | 'LEASE' | 'FINANCE';
  tradeInDetails?: string;
  downPayment?: number;
  termMonths?: number;
}

export async function requestQuotation(
  data: CreateQuotationInput,
): Promise<QuotationRequest> {
  return request<QuotationRequest>('/quotations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getQuotations(page: number = 1, limit: number = 20): Promise<PaginatedResponse<QuotationRequest>> {
  return request<PaginatedResponse<QuotationRequest>>(`/quotations?page=${page}&limit=${limit}`);
}

export async function updateQuotation(
  id: string,
  data: { status?: string; finalPrice?: number; discount?: number; fees?: number; notes?: string },
): Promise<QuotationRequest> {
  return request<QuotationRequest>(`/quotations/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteQuotation(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/quotations/${id}`, {
    method: 'DELETE',
  });
}
