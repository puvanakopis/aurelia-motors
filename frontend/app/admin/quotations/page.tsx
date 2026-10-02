'use client';

import * as React from 'react';
import {
  FileSpreadsheet,
  Search,
  Trash2,
  Edit,
  DollarSign,
  Calculator,
  Percent,
  X,
  Sparkles,
} from 'lucide-react';
import { getQuotations, updateQuotation, deleteQuotation } from '@/lib/api';
import { QuotationRequest } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = React.useState<QuotationRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('ALL');
  const [selectedItem, setSelectedItem] = React.useState<QuotationRequest | null>(null);
  const [newStatus, setNewStatus] = React.useState<string>('DRAFT');
  const [finalPrice, setFinalPrice] = React.useState<number>(0);
  const [discount, setDiscount] = React.useState<number>(0);
  const [fees, setFees] = React.useState<number>(0);
  const [notes, setNotes] = React.useState<string>('');
  const [isUpdating, setIsUpdating] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getQuotations(1, 100)
      .then((res) => {
        setQuotations(res.data || []);
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

  const handleOpenEdit = (item: QuotationRequest) => {
    setSelectedItem(item);
    setNewStatus(item.status);
    setFinalPrice(item.finalPrice || item.vehicle?.price || 0);
    setDiscount(item.discount || 0);
    setFees(item.fees || 0);
    setNotes(item.notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedItem) return;
    setIsUpdating(true);
    try {
      await updateQuotation(selectedItem.id, {
        status: newStatus,
        finalPrice: Number(finalPrice),
        discount: Number(discount),
        fees: Number(fees),
        notes,
      });
      setSelectedItem(null);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to update quotation');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this quotation request?')) return;
    try {
      await deleteQuotation(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = quotations.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.vehicle?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-black" />
            <span>Commercial Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Quotations & Acquisition Offers
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Formal vehicle purchase proposals, bespoke pricing agreements, and acquisition quotes.
          </p>
        </div>

        <button
          onClick={fetchItems}
          className="px-4 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] border border-[#E5E5E8] text-stone-800 text-xs font-bold rounded-xl transition-all self-start cursor-pointer shadow-sm"
        >
          Refresh Quotations
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by quote #, client, email, or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#121316] text-white shadow-sm'
                  : 'bg-white border border-[#E5E5E8] text-stone-600 hover:text-black hover:bg-stone-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Quote & Client</th>
                <th className="p-4">Vehicle Listing</th>
                <th className="p-4">Base MSRP</th>
                <th className="p-4">Discount / Fees</th>
                <th className="p-4">Final Quoted Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading quotations...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-mono text-xs font-bold text-stone-900 bg-[#F4F4F6] px-2 py-0.5 rounded-md inline-block mb-1 border border-[#E5E5E8]">
                        QT-{item.id.substring(0, 8).toUpperCase()}
                      </p>
                      <p className="font-bold text-[#111215]">{item.name}</p>
                      <p className="text-[11px] text-stone-500">{item.email}</p>
                    </td>

                    <td className="p-4">
                      {item.vehicle ? (
                        <div>
                          <p className="font-bold text-[#111215]">{item.vehicle.name}</p>
                          <p className="text-[11px] text-stone-500">
                            {item.vehicle.brand?.name} · Year {item.vehicle.year}
                          </p>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic">Custom Specification</span>
                      )}
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-stone-800">
                        {formatCurrency(item.vehicle?.price || 0)}
                      </p>
                    </td>

                    <td className="p-4 text-[11px]">
                      <p className="text-emerald-600 font-medium">
                        -{formatCurrency(item.discount || 0)}
                      </p>
                      <p className="text-stone-400">
                        +{formatCurrency(item.fees || 0)} fees
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="font-extrabold text-[#111215] text-sm">
                        {formatCurrency(item.finalPrice || item.vehicle?.price || 0)}
                      </p>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.status === 'ACCEPTED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'SENT'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.status === 'DRAFT'
                            ? 'bg-[#FFF8D6] text-stone-900 border border-[#FEE123]'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Adjust Pricing & Status"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Quotation"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-stone-500">
                    No quotation requests found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E5E8] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl text-[#111215]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Commercial Structuring
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  Adjust Quotation Pricing
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F8F8FA] border border-[#E5E5E8] rounded-2xl space-y-1.5 text-xs text-stone-700">
              <p>
                <strong className="text-[#111215]">Client:</strong> {selectedItem.name} ({selectedItem.email})
              </p>
              <p>
                <strong className="text-[#111215]">Vehicle:</strong> {selectedItem.vehicle?.name} (MSRP: {formatCurrency(selectedItem.vehicle?.price || 0)})
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Discount Concession ($)
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Registration & Duties ($)
                  </label>
                  <input
                    type="number"
                    value={fees}
                    onChange={(e) => setFees(Number(e.target.value))}
                    className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Final Quoted Acquisition Price ($) *
                </label>
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(Number(e.target.value))}
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-sm font-extrabold text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Proposal Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                >
                  <option value="DRAFT">DRAFT (Internal Review)</option>
                  <option value="SENT">SENT (Dispatched to Client)</option>
                  <option value="ACCEPTED">ACCEPTED (Client Approved)</option>
                  <option value="REJECTED">REJECTED (Offer Declined)</option>
                  <option value="EXPIRED">EXPIRED (Validity Concluded)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Internal Commercial Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Financing terms, trade-in considerations..."
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl p-3 text-xs text-[#111215] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#E5E5E8]">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveStatus}
                className="px-6 py-2.5 bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
