'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 700);
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
            <Button variant="primary" onClick={handleResetAndClose} className="w-full">
              CLOSE
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 dark:focus:border-stone-100 transition-colors"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="champagne"
              isLoading={isLoading}
              className="w-full"
            >
              SEND INQUIRY TO CONCIERGE
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
