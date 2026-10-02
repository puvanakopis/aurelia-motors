'use client';

import * as React from 'react';
import { Building2, Plus, Trash2, Edit, Phone, Mail, MapPin, X, Sparkles, Clock } from 'lucide-react';
import { getBranches, createBranch, updateBranch, deleteBranch } from '@/lib/api';
import { Branch } from '@/types';

export default function AdminBranchesPage() {
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingBranch, setEditingBranch] = React.useState<Branch | null>(null);

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [openingHours, setOpeningHours] = React.useState('');
  const [active, setActive] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getBranches(true)
      .then((res) => {
        setBranches(res || []);
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
    setEditingBranch(null);
    setName('');
    setAddress('');
    setCity('Colombo 03');
    setPhone('+94 11 258 9000');
    setEmail('colombo@aureliamotors.com');
    setOpeningHours('Mon - Sat: 9:00 AM - 7:00 PM');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Branch) => {
    setEditingBranch(b);
    setName(b.name);
    setAddress(b.address);
    setCity(b.city);
    setPhone(b.phone);
    setEmail(b.email);
    setOpeningHours(b.openingHours);
    setActive(b.active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingBranch) {
        await updateBranch(editingBranch.id, {
          name,
          address,
          city,
          phone,
          email,
          openingHours,
          active,
        });
      } else {
        await createBranch({
          name,
          address,
          city,
          phone,
          email,
          openingHours,
          active,
        });
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to save showroom branch');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this showroom location?')) return;
    try {
      await deleteBranch(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-black" />
            <span>Salon Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Showroom Salons & Locations
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage flagship salon destinations, customer service centers, and VIP hospitality suites.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Showroom Branch</span>
        </button>
      </div>

      {/* Showroom Branches Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Showroom Salon</th>
                <th className="p-4">Address & City</th>
                <th className="p-4">Direct Contact</th>
                <th className="p-4">Operating Hours</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading showroom salons...
                  </td>
                </tr>
              ) : branches.length > 0 ? (
                branches.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#121316] text-[#FEE123] flex items-center justify-center font-bold text-sm shadow-sm">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#111215] text-sm">{b.name}</p>
                          <p className="text-[10px] text-stone-400">Salon ID: {b.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-stone-900">{b.address}</p>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-stone-400" />
                        {b.city}
                      </p>
                    </td>

                    <td className="p-4 text-[11px]">
                      <p className="font-semibold text-stone-900">{b.phone}</p>
                      <p className="text-stone-500">{b.email}</p>
                    </td>

                    <td className="p-4 text-[11px] text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.openingHours}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          b.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {b.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Showroom"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Showroom"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-stone-500">
                    No showroom branches found.
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
                  Salon Configuration
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  {editingBranch ? 'Edit Showroom Branch' : 'Add New Showroom Branch'}
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
                  Showroom Title *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aurelia Flagship Salon"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 100 Galle Road"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    City / Zone *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Colombo 03"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Direct Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 11 258 9000"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Concierge Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colombo@aureliamotors.com"
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeBranchCheck"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="activeBranchCheck" className="text-xs font-bold text-stone-800 cursor-pointer">
                  Active Showroom (Accepting Appointments & Client Walk-ins)
                </label>
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
                  {isSaving ? 'Saving...' : 'Save Showroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
