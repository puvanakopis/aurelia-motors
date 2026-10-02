'use client';

import * as React from 'react';
import {
  MessageSquareText,
  Search,
  Trash2,
  Edit,
  Mail,
  Phone,
  Clock,
  Car,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { getEnquiries, updateEnquiry, deleteEnquiry } from '@/lib/api';
import { Enquiry } from '@/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = React.useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<Enquiry | null>(null);
  const [statusNotes, setStatusNotes] = React.useState<string>('');
  const [newStatus, setNewStatus] = React.useState<string>('NEW');
  const [isUpdating, setIsUpdating] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getEnquiries(1, 100)
      .then((res) => {
        setEnquiries(res.data || []);
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

  const handleOpenEdit = (item: Enquiry) => {
    setSelectedItem(item);
    setNewStatus(item.status);
    setStatusNotes(item.notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedItem) return;
    setIsUpdating(true);
    try {
      await updateEnquiry(selectedItem.id, {
        status: newStatus,
        notes: statusNotes,
      });
      setSelectedItem(null);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to update enquiry');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this client inquiry?')) return;
    try {
      await deleteEnquiry(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <MessageSquareText className="w-3.5 h-3.5 text-black" />
            <span>Private Advisory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Client Inquiries & Messages
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review customer acquisition requests, bespoke consultation notes, and private showroom dispatches.
          </p>
        </div>

        <button
          onClick={fetchItems}
          className="px-4 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] border border-[#E5E5E8] text-stone-800 text-xs font-bold rounded-xl transition-all self-start cursor-pointer shadow-sm"
        >
          Refresh Inquiries
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by client, email, phone, or message text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'QUALIFIED', 'CLOSED'].map((st) => (
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

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Client Contact</th>
                <th className="p-4">Nature / Vehicle</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date Dispatched</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading inquiries...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-[#111215] text-sm">{item.name}</p>
                      <p className="text-[11px] text-stone-500">{item.email}</p>
                      <p className="text-[11px] text-stone-400">{item.phone}</p>
                    </td>

                    <td className="p-4">
                      {item.vehicle ? (
                        <div>
                          <p className="font-bold text-[#111215]">
                            {item.vehicle.name}
                          </p>
                          <p className="text-[10px] text-stone-500">
                            Vehicle Allocation Inquiry
                          </p>
                        </div>
                      ) : (
                        <span className="text-stone-500 font-semibold">
                          General Concierge
                        </span>
                      )}
                    </td>

                    <td className="p-4 max-w-sm">
                      <p className="text-stone-700 leading-relaxed italic line-clamp-2">
                        &quot;{item.message}&quot;
                      </p>
                      {item.notes && (
                        <p className="text-[11px] font-semibold text-stone-900 mt-1 bg-[#FFF8D6] px-2 py-0.5 rounded-md inline-block border border-[#FEE123]">
                          Staff Note: {item.notes}
                        </p>
                      )}
                    </td>

                    <td className="p-4 text-stone-500 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}{' '}
                      <span className="text-[10px] text-stone-400 block">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.status === 'NEW'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'CONTACTED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.status === 'QUALIFIED'
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
                        title="Update Inquiry Status"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-stone-500">
                    No client inquiries matching current filters.
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
                  Concierge Advisory
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  Update Client Inquiry
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F8F8FA] border border-[#E5E5E8] rounded-2xl space-y-2 text-xs text-stone-700">
              <p>
                <strong className="text-[#111215]">Client:</strong> {selectedItem.name} ({selectedItem.phone} · {selectedItem.email})
              </p>
              <p className="italic bg-white p-3 rounded-xl border border-[#E5E5E8] text-stone-800">
                &quot;{selectedItem.message}&quot;
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Follow-Up Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                >
                  <option value="NEW">NEW (Unreviewed)</option>
                  <option value="CONTACTED">CONTACTED (Initial Reach Out Made)</option>
                  <option value="FOLLOW_UP">FOLLOW_UP (Pending Further Response)</option>
                  <option value="QUALIFIED">QUALIFIED (High-Intent Acquisition)</option>
                  <option value="CONVERTED">CONVERTED (Purchase or Order Created)</option>
                  <option value="CLOSED">CLOSED (Completed / Inactive)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Internal Staff Notes
                </label>
                <textarea
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Record client preferences, vehicle allocations discussed..."
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
