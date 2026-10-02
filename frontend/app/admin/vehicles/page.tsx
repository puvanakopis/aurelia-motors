'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Car,
  Search,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Sparkles,
  X,
  Tag,
  Layers,
  Fuel,
  Gauge,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import {
  getVehicles,
  getBrands,
  getCategories,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '@/lib/api';
import { Vehicle, Brand, Category, FuelType, Transmission, StockStatus } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingVehicle, setEditingVehicle] = React.useState<Vehicle | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Form State
  const [brandId, setBrandId] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [name, setName] = React.useState('');
  const [model, setModel] = React.useState('');
  const [variant, setVariant] = React.useState('');
  const [year, setYear] = React.useState<number>(2024);
  const [price, setPrice] = React.useState<number>(120000);
  const [discountPrice, setDiscountPrice] = React.useState<number | undefined>(undefined);
  const [fuelType, setFuelType] = React.useState<FuelType>('PETROL');
  const [transmission, setTransmission] = React.useState<Transmission>('AUTOMATIC');
  const [engine, setEngine] = React.useState('');
  const [engineCapacity, setEngineCapacity] = React.useState('');
  const [horsepower, setHorsepower] = React.useState<number>(400);
  const [torque, setTorque] = React.useState<number>(500);
  const [mileage, setMileage] = React.useState<number>(0);
  const [color, setColor] = React.useState('Black');
  const [description, setDescription] = React.useState('');
  const [featured, setFeatured] = React.useState(false);
  const [stockStatus, setStockStatus] = React.useState<StockStatus>('AVAILABLE');
  const [imageUrl, setImageUrl] = React.useState('/images/vehicles/bmw-x5-1.jpg');

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const [vehRes, brandsRes, catRes] = await Promise.all([
        getVehicles({ limit: 100 }),
        getBrands(),
        getCategories(),
      ]);
      setVehicles(vehRes.data || []);
      setBrands(brandsRes || []);
      setCategories(catRes || []);
      if (brandsRes.length > 0 && !brandId) setBrandId(brandsRes[0].id);
      if (catRes.length > 0 && !categoryId) setCategoryId(catRes[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [brandId, categoryId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenCreate = () => {
    setEditingVehicle(null);
    setName('');
    setModel('');
    setVariant('');
    setYear(2024);
    setPrice(120000);
    setDiscountPrice(undefined);
    setFuelType('PETROL');
    setTransmission('AUTOMATIC');
    setEngine('3.0L Turbocharged Inline-6');
    setEngineCapacity('3.0L');
    setHorsepower(400);
    setTorque(500);
    setMileage(1500);
    setColor('Onyx Black');
    setDescription('Curated executive vehicle in showroom condition with certified service history.');
    setFeatured(false);
    setStockStatus('AVAILABLE');
    setImageUrl('/images/vehicles/bmw-x5-1.jpg');
    if (brands.length > 0) setBrandId(brands[0].id);
    if (categories.length > 0) setCategoryId(categories[0].id);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setName(v.name);
    setModel(v.model);
    setVariant(v.variant || '');
    setYear(v.year);
    setPrice(Number(v.price));
    setDiscountPrice(v.discountPrice ? Number(v.discountPrice) : undefined);
    setFuelType(v.fuelType);
    setTransmission(v.transmission);
    setEngine(v.engine || '');
    setEngineCapacity(v.engineCapacity || '');
    setHorsepower(v.horsepower || 0);
    setTorque(v.torque || 0);
    setMileage(v.mileage || 0);
    setColor(v.color || 'Black');
    setDescription(v.description || '');
    setFeatured(v.featured);
    setStockStatus(v.stockStatus);
    setImageUrl(v.images?.[0]?.url || '/images/vehicles/bmw-x5-1.jpg');
    setBrandId(v.brandId);
    setCategoryId(v.categoryId);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: any = {
        name,
        brandId,
        categoryId,
        model,
        variant,
        year: Number(year),
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        fuelType,
        transmission,
        engine,
        engineCapacity,
        horsepower: Number(horsepower),
        torque: Number(torque),
        mileage: Number(mileage),
        color,
        description,
        featured: Boolean(featured),
        stockStatus,
        images: imageUrl ? [{ url: imageUrl, isPrimary: true, sortOrder: 0 }] : [],
      };

      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, payload);
      } else {
        await createVehicle(payload);
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to save vehicle');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this vehicle listing?')) return;
    try {
      await deleteVehicle(id);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete vehicle');
    }
  };

  const filtered = vehicles.filter((v) => {
    return (
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.brand?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <Car className="w-3.5 h-3.5 text-black" />
            <span>Salon Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Vehicle Allocations Fleet
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage showroom allocations, technical specifications, and inventory availability.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search by model, brand, or specification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E8] rounded-xl text-xs font-semibold text-stone-600 shadow-sm self-start sm:self-auto">
          <span>Showing:</span>
          <span className="font-bold text-stone-900">{filtered.length} vehicles</span>
        </div>
      </div>

      {/* Vehicles Table Card */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Vehicle</th>
                <th className="p-4">Marque & Style</th>
                <th className="p-4">Pricing & Year</th>
                <th className="p-4">Powertrain</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading vehicle allocations...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-16 h-12 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-[#E5E5E8]">
                          <Image
                            src={v.images?.[0]?.url || '/images/vehicles/bmw-x5-1.jpg'}
                            alt={v.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[#111215] text-sm">{v.name}</p>
                            {v.featured && (
                              <span className="bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-[9px] font-bold px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500">
                            {formatMileage(v.mileage)} · {v.color}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-[#111215]">{v.brand?.name}</p>
                      <p className="text-[11px] text-stone-500">{v.category?.name}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-extrabold text-[#111215] text-sm">
                        {formatCurrency(v.price)}
                      </p>
                      {v.discountPrice && (
                        <p className="text-[10px] text-emerald-600 font-semibold">
                          Sale: {formatCurrency(v.discountPrice)}
                        </p>
                      )}
                      <p className="text-[10px] text-stone-400">Year {v.year}</p>
                    </td>

                    <td className="p-4 text-[11px]">
                      <p className="font-semibold text-stone-900">{v.fuelType} · {v.transmission}</p>
                      <p className="text-[10px] text-stone-500">{v.horsepower} HP · {v.torque} Nm</p>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          v.stockStatus === 'AVAILABLE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : v.stockStatus === 'RESERVED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {v.stockStatus}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Vehicle"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-stone-500">
                    No vehicles found matching &quot;{searchTerm}&quot;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E5E5E8] w-full max-w-4xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 text-[#111215]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Salon Fleet Management
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111215]">
                  {editingVehicle ? 'Edit Vehicle Listing' : 'Create New Vehicle Listing'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold text-stone-700">Vehicle Display Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. BMW X5 xDrive40i M Sport"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Model *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. X5"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Marque / Brand *</label>
                  <select
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Body Style / Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Model Year *</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              {/* Pricing & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E5E8]">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Listing Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Special Offer Price ($)</label>
                  <input
                    type="number"
                    value={discountPrice || ''}
                    onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional promotional price"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Stock Status *</label>
                  <select
                    value={stockStatus}
                    onChange={(e) => setStockStatus(e.target.value as StockStatus)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    <option value="AVAILABLE">AVAILABLE (In Showroom)</option>
                    <option value="RESERVED">RESERVED (Deposit Received)</option>
                    <option value="SOLD">SOLD (Allocated)</option>
                  </select>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#E5E5E8]">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as FuelType)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    <option value="PETROL">PETROL</option>
                    <option value="DIESEL">DIESEL</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="ELECTRIC">ELECTRIC</option>
                    <option value="PLUG_IN_HYBRID">PLUG-IN HYBRID</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value as Transmission)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    <option value="AUTOMATIC">AUTOMATIC</option>
                    <option value="MANUAL">MANUAL</option>
                    <option value="SEMI_AUTOMATIC">SEMI AUTOMATIC</option>
                    <option value="DUAL_CLUTCH">DUAL CLUTCH</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Horsepower (HP)</label>
                  <input
                    type="number"
                    value={horsepower}
                    onChange={(e) => setHorsepower(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Torque (Nm)</label>
                  <input
                    type="number"
                    value={torque}
                    onChange={(e) => setTorque(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Mileage (KM)</label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Exterior Color</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700">Engine Description</label>
                  <input
                    type="text"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                    placeholder="e.g. 3.0L TwinPower Turbo Inline 6-Cylinder"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              {/* Primary Image & Description */}
              <div className="space-y-4 pt-2 border-t border-[#E5E5E8]">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Primary Image URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/vehicles/bmw-x5-1.jpg"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">Curated Overview / Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl p-3 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs font-bold text-stone-800 cursor-pointer">
                    Feature on Homepage Hero & Curated Showcase
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E5E8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? 'Saving Vehicle...' : 'Save Vehicle Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
