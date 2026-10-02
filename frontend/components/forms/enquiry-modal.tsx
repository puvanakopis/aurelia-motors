'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { submitEnquiry } from '@/lib/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId?: string;
  defaultSubject?: string;
}

export function EnquiryModal({ isOpen, onClose, vehicleId, defaultSubject }: EnquiryModalProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState(defaultSubject ? `Subject: ${defaultSubject}\n` : '');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await submitEnquiry({
        name,
        email,
        phone,
        message,
        vehicleId,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
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
      title={isSubmitted ? 'Message Dispatched' : 'Private Concierge'}
      subtitle="Bespoke Inquiries & Quotations"
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
            Inquiry Received
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out to Aurelia Motors. A Senior Automotive Specialist will review your request and respond discreetly within four business hours.
          </p>
          <div className="pt-4">
            <Button variant="primary" onClick={handleResetAndClose} className="w-full rounded-full">
              CLOSE
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
          <Input
            label="Full Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+94 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium uppercase tracking-tracked text-stone-600">
              Message or Specific Inquiries
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inquire regarding specific custom build allocations, international shipping, or bespoke financing options..."
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors rounded-xl"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="champagne"
              isLoading={isLoading}
              className="w-full rounded-full"
            >
              SEND INQUIRY TO CONCIERGE
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
