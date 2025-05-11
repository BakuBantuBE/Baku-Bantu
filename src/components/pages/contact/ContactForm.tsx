// src/components/pages/contact/ContactForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Animation variants
  const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited after being touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Nama wajib diisi';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format email tidak valid';
        }
        break;
      case 'phone':
        if (value.trim() && !/^[0-9+\-\s]+$/.test(value)) {
          error = 'Format nomor telepon tidak valid';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'Topik wajib dipilih';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Pesan wajib diisi';
        } else if (value.trim().length < 10) {
          error = 'Pesan minimal 10 karakter';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  const validateForm = (): boolean => {
    const fieldsToValidate: (keyof FormData)[] = ['name', 'email', 'subject', 'message'];
    let isValid = true;
    const newErrors: FormErrors = {};
    
    // Mark all required fields as touched
    const newTouched = { ...touched };
    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      const fieldIsValid = validateField(field, formData[field]);
      if (!fieldIsValid) {
        isValid = false;
        // Get the error message from the validateField call
        newErrors[field] = errors[field];
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Membuat body email
      const emailBody = `
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone || 'Tidak diisi'}
Topik: ${formData.subject}

Pesan:
${formData.message}
      `;

      // Membuat URL mailto
      const mailtoUrl = `mailto:bakubantusulut@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Membuka email client
      window.location.href = mailtoUrl;

      onSubmit(formData);
    }
  };

  const subjectOptions = [
    { value: '', label: 'Pilih topik' },
    { value: 'volunteer', label: 'Informasi Relawan' },
    { value: 'donation', label: 'Donasi' },
    { value: 'partnership', label: 'Kerjasama' },
    { value: 'general', label: 'Pertanyaan Umum' },
    { value: 'other', label: 'Lainnya' }
  ];

  return (
    <motion.div 
      id="contact-form"
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formAnimation}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Kirim Pesan</h2>
        <p className="text-gray-600">
          Kami akan merespon pesan Anda secepat mungkin, biasanya dalam 1-2 hari kerja.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : undefined}
            placeholder="Masukkan nama lengkap Anda"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            }
            required
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
            placeholder="alamat@email.com"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nomor Telepon (Opsional)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
            placeholder="+62 812 3456 7890"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            }
          />
          
          <Select
            label="Topik"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subject ? errors.subject : undefined}
            options={subjectOptions}
            required
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pesan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={5}
            className={`w-full rounded-xl border ${errors.message && touched.message ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue transition-all duration-300`}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
            required
          />
          {errors.message && touched.message && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.message}
            </p>
          )}
          <div className="text-right mt-2">
            <span className={`text-xs ${formData.message.length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
              {formData.message.length} / 10+ karakter
            </span>
          </div>
        </div>
        
        <div className="bg-babyBlue-light/20 p-4 rounded-lg border border-babyBlue-light/40">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v3h1a1 1 0 110 2h-2z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600">
              Dengan mengirimkan formulir ini, Anda menyetujui kebijakan privasi kami. Kami tidak akan membagikan informasi Anda dengan pihak ketiga tanpa izin.
            </p>
          </div>
        </div>
        
        <motion.div 
          className="pt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            variant="primary" 
            size="full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-babyBlue to-babyBlue-dark shadow-lg"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;