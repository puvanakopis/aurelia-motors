'use client';

import * as React from 'react';
import { Tag, Plus, Trash2, Edit, Search, X, Sparkles, Globe } from 'lucide-react';
import { getBrands, createBrand, updateBrand, deleteBrand } from '@/lib/api';
import { Brand } from '@/types';

export default function AdminBrandsPage() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingBrand, setEditingBrand] = React.useState<Brand | null>(null);
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('Germany');
  const [description, setDescription] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getBrands()
      .then((res) => {
        setBrands(res || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingBrand(null);
    setName('');
    setCountry('Germany');
    setDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Brand) => {
    setEditingBrand(b);
    setName(b.name);
    setCountry(b.country || 'Germany');
    setDescription(b.description || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingBrand) {
        await updateBrand(editingBrand.id, { name, country, description });
      } else {
        await createBrand({ name, country, description });
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to save brand');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this marque brand?')) return;
    try {
      await deleteBrand(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = brands.filter((b) => {
    return (
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.country || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <Tag className="w-3.5 h-3.5 text-black" />
            <span>Automotive Marques</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Marques & Heritage Brands
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Curate represented luxury and high-performance automotive manufacturers.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Brand</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search marques by name or country of origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E8] rounded-xl text-xs font-semibold text-stone-600 shadow-sm self-start sm:self-auto">
          <span>Total Marques:</span>
          <span className="font-bold text-stone-900">{filtered.length} brands</span>
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Brand / Marque</th>
                <th className="p-4">Country of Origin</th>
                <th className="p-4">Heritage Overview</th>
                <th className="p-4">Fleet Allocation</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading marques...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#121316] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                          {b.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#111215] text-sm">{b.name}</p>
                          <p className="text-[10px] text-stone-400">Marque Code: {b.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4F4F6] border border-[#E5E5E8] rounded-full text-xs font-semibold text-stone-800">
                        <Globe className="w-3 h-3 text-stone-500" />
                        {b.country || 'Global'}
                      </span>
                    </td>

                    <td className="p-4 max-w-md">
                      <p className="text-stone-600 line-clamp-2">
                        {b.description || 'Curated luxury manufacturer represented in the Aurelia collection.'}
                      </p>
                    </td>

                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-bold text-stone-800">
                        {b.vehicleCount || 0} listings
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Marque"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Marque"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-stone-500">
                    No marques found matching search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E5E8] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl text-[#111215]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Marque Configuration
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  {editingBrand ? 'Edit Marque Brand' : 'Add New Marque Brand'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Brand / Manufacturer Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Porsche, Bentley, Aston Martin"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Country of Origin
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Germany, Italy, United Kingdom"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Heritage & Brand Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of marque engineering philosophy..."
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl p-3 text-xs text-[#111215] outline-none"
                />
              </div>

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
                  {isSaving ? 'Saving...' : 'Save Marque'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
