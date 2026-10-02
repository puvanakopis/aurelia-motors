'use client';

import * as React from 'react';
import {
  CalendarCheck,
  Search,
  Trash2,
  Edit,
  Clock,
  Phone,
  Mail,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { getTestDrives, updateTestDrive, deleteTestDrive } from '@/lib/api';
import { TestDriveRequest } from '@/types';

export default function AdminTestDrivesPage() {
  const [testDrives, setTestDrives] = React.useState<TestDriveRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<TestDriveRequest | null>(null);
  const [statusNotes, setStatusNotes] = React.useState<string>('');
  const [newStatus, setNewStatus] = React.useState<string>('PENDING');
  const [isUpdating, setIsUpdating] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getTestDrives(1, 100)
      .then((res) => {
        setTestDrives(res.data || []);
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

  const handleOpenEdit = (item: TestDriveRequest) => {
    setSelectedItem(item);
    setNewStatus(item.status);
    setStatusNotes(item.notes || '');
  };

  const handleSaveStatus = async () => {
    if (!selectedItem) return;
    setIsUpdating(true);
    try {
      await updateTestDrive(selectedItem.id, {
        status: newStatus,
        notes: statusNotes,
      });
      setSelectedItem(null);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to update test drive');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this appointment request?')) return;
    try {
      await deleteTestDrive(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = testDrives.filter((item) => {
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.vehicle?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-black" />
            <span>Salon Concierge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Test Drive Appointments
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage customer VIP test drive bookings, appointment scheduling, and showroom dispatch.
          </p>
        </div>

        <button
          onClick={fetchItems}
          className="px-4 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] border border-[#E5E5E8] text-stone-800 text-xs font-bold rounded-xl transition-all self-start cursor-pointer shadow-sm"
        >
          Refresh Bookings
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by client, email, phone, or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
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

      {/* Test Drives Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Client</th>
                <th className="p-4">Vehicle Reserved</th>
                <th className="p-4">Salon Branch</th>
                <th className="p-4">Appointment Schedule</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading bookings...
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
                          <p className="font-bold text-[#111215]">{item.vehicle.name}</p>
                          <p className="text-[11px] text-stone-500">
                            {item.vehicle.brand?.name} · Year {item.vehicle.year}
                          </p>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic">General VIP Consultation</span>
                      )}
                    </td>

                    <td className="p-4">
                      <p className="font-semibold text-stone-800">
                        {item.branch?.name || 'Main Flagship Salon'}
                      </p>
                      <p className="text-[11px] text-stone-500">{item.branch?.city}</p>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#111215]">{item.preferredDate}</p>
                        <p className="text-[11px] text-stone-500">{item.preferredTime}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.status === 'PENDING'
                            ? 'bg-[#FFF8D6] text-stone-900 border border-[#FEE123]'
                            : item.status === 'CONFIRMED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === 'COMPLETED'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Update Appointment Status"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Request"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-stone-500">
                    No test drive appointments matching filter.
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
                  Concierge Scheduling
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  Update Test Drive Status
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
                <strong className="text-[#111215]">Client:</strong> {selectedItem.name} ({selectedItem.phone})
              </p>
              <p>
                <strong className="text-[#111215]">Vehicle:</strong> {selectedItem.vehicle?.name || 'VIP Experience'}
              </p>
              <p>
                <strong className="text-[#111215]">Time Slot:</strong> {selectedItem.preferredDate} at {selectedItem.preferredTime}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Appointment Status *
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-3 py-2.5 text-xs text-[#111215] outline-none"
                >
                  <option value="PENDING">PENDING (Awaiting Confirmation)</option>
                  <option value="CONFIRMED">CONFIRMED (Date & Vehicle Locked)</option>
                  <option value="COMPLETED">COMPLETED (Test Drive Concluded)</option>
                  <option value="CANCELLED">CANCELLED (Client or Salon Cancelled)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Internal Concierge Notes
                </label>
                <textarea
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Record customer preferences, feedback, or follow-up actions..."
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
