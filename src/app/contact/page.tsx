// src/app/contact/page.tsx
"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header, Footer,CallToAction } from '@/components/common';
import ContactHero from '@/components/pages/contact/ContactHero';
import ContactForm from '@/components/pages/contact/ContactForm';
import ContactInfo from '@/components/pages/contact/ContactInfo';
import LocationMap from '@/components/pages/contact/LocationMap';
import ContactFAQ from '@/components/pages/contact/ContactFAQ';
import SuccessMessage from '@/components/pages/contact/SuccessMessage';
import { useToast } from '@/contexts/ToastContext';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const toast = useToast();

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setShowSuccess(true);
      toast.success('Pesan Anda telah berhasil dikirim!', 'Terima kasih telah menghubungi kami');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      toast.error('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        
        <section className="py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-babyBlue/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-poppy/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left column - Contact form */}
              <div>
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <SuccessMessage onReset={() => setShowSuccess(false)} />
                  ) : (
                    <ContactForm 
                      onSubmit={handleSubmit} 
                      isSubmitting={isSubmitting} 
                    />
                  )}
                </AnimatePresence>
              </div>
              
              {/* Right column - Contact information */}
              <div>
                <ContactInfo />
                <LocationMap />
              </div>
            </div>
          </div>
        </section>
        
        <ContactFAQ />
        <CallToAction/>
      </main>
      <Footer />
    </div>
  );
}