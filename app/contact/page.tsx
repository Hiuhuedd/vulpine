'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Mail, Phone, Clock, FileText, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PageHero from '@/components/PageHero';

function ContactFormContent() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    service: 'electrical',
    description: '',
    budget: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const pppParam = searchParams.get('type') === 'ppp';
    
    if (pppParam) {
      setFormData((prev) => ({ ...prev, service: 'ppp' }));
    } else if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Your inquiry has been submitted successfully! We will contact you shortly.',
        });
        setFormData({
          fullName: '',
          companyName: '',
          phone: '',
          email: '',
          service: 'electrical',
          description: '',
          budget: '',
        });
      } else {
        throw new Error(data.error || 'Failed to submit the form.');
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred while sending your message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.type && (
        <div 
          className={`p-4 flex items-start space-x-3 border ${
            status.type === 'success' 
              ? 'bg-accent/5 border-accent text-primary' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
          ) : (
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
          )}
          <span className="text-xs font-bold font-sans">{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
            placeholder="Company Ltd"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
            placeholder="+254 700 000 000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Service Interested In *</label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-white border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
          >
            <option value="electrical">Electrical Works</option>
            <option value="building">Building Works</option>
            <option value="roads">Road Works</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Budget Range (Optional)</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
            placeholder="e.g. KES 5M - 10M"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Project Description *</label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-surface/25 border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent font-sans"
          placeholder="Please describe the project scope, location details, timeline requirements, etc."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="architectural-btn w-full bg-accent text-primary font-sans text-xs font-bold uppercase tracking-widest py-4 hover:bg-accent-mid transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55"
      >
        <span>{loading ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
        <Send size={14} />
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState({
    address: 'Kangundo Road, Block 2/589, Embakasi, Nairobi',
    email: 'vulpineltd@gmail.com',
    phone: '+254 720 999 925',
    poBox: '269-00400, Nairobi, Kenya',
  });

  useEffect(() => {
    const ref = doc(db, 'settings', 'contact');
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setContactInfo({
          address: d.address || contactInfo.address,
          email: d.email || contactInfo.email,
          phone: d.phone || contactInfo.phone,
          poBox: d.poBox || contactInfo.poBox,
        });
      }
    });
    return () => unsub();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <PageHero
        pageId="contact"
        heading="Contact Us"
        fallbackImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Main Body */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Details & Map */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">GET IN TOUCH</span>
                  <div className="w-12 h-0.5 bg-accent mb-6" />
                  <h2 className="font-serif text-3xl font-bold text-primary tracking-wide">Office Location</h2>
                </div>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  Have a project inquiry, partnership request, or require technical support? Drop us a line or visit our office.
                </p>
              </div>

              <div className="space-y-5 text-sm font-sans text-primary/80 pt-4 border-t border-surface">
                <div className="flex items-start space-x-3.5">
                  <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Address</h4>
                    <span>{contactInfo.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Email Address</h4>
                    <span>{contactInfo.email}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Call Us</h4>
                    <span>{contactInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="text-primary shrink-0 text-xs font-bold mt-0.5">P.O. Box</div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Post Box</h4>
                    <span>{contactInfo.poBox}</span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="relative w-full aspect-video border border-surface bg-surface/30">
                <iframe
                  title="Vulpine Limited Embakasi Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.161048682054!2d36.907914!3d-1.2943269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1d15955.16!2d36.9079!3d-1.2943!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f136270e5b7b9%3A0xc3cf9b4f2c8d234a!2sEmbakasi%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1717800000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7 bg-surface/20 border border-surface p-8 sm:p-10 shadow-sm architectural-card">
              <div className="mb-8">
                <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">INQUIRY FORM</span>
                <h3 className="font-serif text-2xl font-bold text-primary">Submit a Construction Request</h3>
              </div>

              <Suspense fallback={<div className="font-sans text-sm text-slate-500">Loading contact parameters...</div>}>
                <ContactFormContent />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
