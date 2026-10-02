'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Vehicle, Branch } from '@aurelia/types';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { bookTestDrive } from '@/lib/api';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  branches: Branch[];
  selectedVehicleId?: string;
}

export function TestDriveModal({
  isOpen,
  onClose,
  vehicles,
  branches,
  selectedVehicleId,
}: TestDriveModalProps) {
  const [vehicleId, setVehicleId] = React.useState(selectedVehicleId || vehicles[0]?.id || '');
  const [branchId, setBranchId] = React.useState(branches[0]?.id || '');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [preferredDate, setPreferredDate] = React.useState('');
  const [preferredTime, setPreferredTime] = React.useState('11:00 AM');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedVehicleId) {
      setVehicleId(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  React.useEffect(() => {
    if (vehicles.length > 0 && !vehicleId) {
      setVehicleId(vehicles[0].id);
    }
    if (branches.length > 0 && !branchId) {
      setBranchId(branches[0].id);
    }
  }, [vehicles, branches, vehicleId, branchId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await bookTestDrive({
        vehicleId: vehicleId || vehicles[0]?.id,
        branchId: branchId || branches[0]?.id,
        name,
        email,
        phone,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTime,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit appointment. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? 'Appointment Confirmed' : 'Book a Test Drive'}
      subtitle="A Personal Appointment"
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">
            Appointment Reserved
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Thank you, {name || 'valued guest'}. Your personal consultation and test drive appointment for{' '}
            <span className="font-semibold text-stone-800">
              {vehicles.find((v) => v.id === vehicleId)?.name || 'the vehicle'}
            </span>{' '}
            at our {branches.find((b) => b.id === branchId)?.name || 'Salon'} has been scheduled for{' '}
            <span className="font-semibold text-stone-800">{preferredDate || 'your selected date'}</span> at{' '}
            <span className="font-semibold text-stone-800">{preferredTime}</span>.
          </p>
          <p className="text-[11px] text-stone-400">
            Our Private Client Concierge will contact you at {phone || email} to confirm any bespoke requirements.
          </p>
          <div className="pt-4">
            <Button variant="primary" onClick={handleResetAndClose} className="w-full rounded-full">
              RETURN TO SHOWROOM
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <Select
            label="Selected Vehicle"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          >
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.year})
              </option>
            ))}
          </Select>

          <Select
            label="Showroom Location"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.city})
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Preferred Date"
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />
            <Select
              label="Preferred Time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              required
            >
              <option value="10:00 AM">10:00 AM - Morning Slot</option>
              <option value="11:30 AM">11:30 AM - Midday Slot</option>
              <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
              <option value="04:30 PM">04:30 PM - Golden Hour Slot</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Julian Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+94 77 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="julian.vance@aurelia.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="champagne"
              isLoading={isLoading}
              className="w-full h-12 text-xs font-semibold tracking-tracked rounded-full"
            >
              CONFIRM APPOINTMENT
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
