'use client';

import * as React from 'react';
import { Sparkles, Plus, Trash2, Edit, Calendar, Percent, DollarSign, X, CheckCircle } from 'lucide-react';
import { getOffers, createOffer, updateOffer, deleteOffer } from '@/lib/api';
import { Offer } from '@/types';

export default function AdminOffersPage() {
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingOffer, setEditingOffer] = React.useState<Offer | null>(null);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [discountType, setDiscountType] = React.useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = React.useState<number>(5);
  const [startDate, setStartDate] = React.useState('2026-01-01');
  const [endDate, setEndDate] = React.useState('2026-12-31');
  const [active, setActive] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getOffers(true)
      .then((res) => {
        setOffers(res || []);
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
    setEditingOffer(null);
    setTitle('');
    setDescription('');
    setDiscountType('PERCENTAGE');
    setDiscountValue(5);
    setStartDate('2026-03-01');
    setEndDate('2026-09-30');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (o: Offer) => {
    setEditingOffer(o);
    setTitle(o.title);
    setDescription(o.description);
    setDiscountType(o.discountType);
    setDiscountValue(o.discountValue);
    setStartDate(o.startDate ? o.startDate.substring(0, 10) : '2026-01-01');
    setEndDate(o.endDate ? o.endDate.substring(0, 10) : '2026-12-31');
    setActive(o.active);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingOffer) {
        await updateOffer(editingOffer.id, {
          title,
          description,
          discountType,
          discountValue: Number(discountValue),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          active,
        });
      } else {
        await createOffer({
          title,
          description,
          discountType,
          discountValue: Number(discountValue),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          active,
        });
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to save offer');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this bespoke promotion?')) return;
    try {
      await deleteOffer(id);
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
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Commercial Incentives</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Offers & Acquisition Programs
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Curate bespoke seasonal promotions, preferential lease rates, and VIP acquisition incentives.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Campaign Offer</th>
                <th className="p-4">Advantage / Benefit</th>
                <th className="p-4">Validity Period</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading acquisition programs...
                  </td>
                </tr>
              ) : offers.length > 0 ? (
                offers.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF8D6] text-black border border-[#FEE123] flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#111215] text-sm">{o.title}</p>
                          <p className="text-[11px] text-stone-500 line-clamp-1 max-w-sm">{o.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FEE123] text-black font-extrabold text-xs rounded-full shadow-sm">
                        {o.discountType === 'PERCENTAGE' ? (
                          <>{o.discountValue}% OFF</>
                        ) : (
                          <>${o.discountValue.toLocaleString()} SAVINGS</>
                        )}
                      </span>
                    </td>

                    <td className="p-4 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>
                          {new Date(o.startDate).toLocaleDateString()} — {new Date(o.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          o.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {o.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(o)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Offer"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(o.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Offer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-stone-500">
                    No active acquisition programs found.
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
                  Program Structuring
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  {editingOffer ? 'Edit Acquisition Program' : 'Create Acquisition Program'}
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
                  Program Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Bespoke Allocation Incentive"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Curated Benefit Terms & Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed terms of privilege or lease consideration..."
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl p-3 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Advantage Structure
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                  >
                    <option value="PERCENTAGE">Percentage (%) Off</option>
                    <option value="FIXED">Fixed Amount ($) Off</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Advantage Value ({discountType === 'PERCENTAGE' ? '%' : '$'}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeOfferCheck"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="activeOfferCheck" className="text-xs font-bold text-stone-800 cursor-pointer">
                  Campaign Active & Applicable to Showroom Inquiries
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
                  {isSaving ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
