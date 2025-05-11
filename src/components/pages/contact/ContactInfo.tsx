// src/components/pages/contact/ContactInfo.tsx
import React from 'react';
import { motion } from 'framer-motion';

const ContactInfo = () => {
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const contactInfo = [
    {
      title: 'Nomor Telepon',
      details: [
        '+62 853-3715-2513 (Krisan - Lead Coordinator)'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: 'bg-babyBlue-light',
      textColor: 'text-babyBlue-dark'
    },
    {
      title: 'Email',
      details: [
        'bakubantusulut@gmail.com'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-poppy-light',
      textColor: 'text-poppy-dark'
    },
    {
      title: 'Alamat',
      details: [
        'Walian, Tomohon Selatan',
        'Kota Tomohon, Sulawesi Utara'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'bg-forest-light',
      textColor: 'text-forest-dark'
    },
    {
      title: 'Jam Operasional',
      details: [
        'Senin - Sabtu: 8:00 - 17:00 (tentatif)'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mango-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-mango-light',
      textColor: 'text-mango-dark'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/bakubantusulut/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-pink-100 hover:bg-pink-200',
      textColor: 'text-pink-700',
      hoverColor: 'hover:text-pink-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/baku-bantu-sulut/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: 'bg-blue-100 hover:bg-blue-200',
      textColor: 'text-blue-700',
      hoverColor: 'hover:text-blue-800'
    }
  ];

  return (
    <div className="mb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Informasi Kontak</h2>
        <p className="text-gray-600">
          Ada beberapa cara untuk menghubungi kami. Pilih yang paling nyaman untuk Anda.
        </p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            className={`${item.color} p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
            variants={itemAnimation}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start">
              <div className="bg-white/60 rounded-full p-3 mr-4 backdrop-blur-sm">
                {item.icon}
              </div>
              <div>
                <h3 className={`font-semibold ${item.textColor} mb-2`}>{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700">{detail}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ikuti Kami</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-4 py-2 rounded-full ${link.color} ${link.textColor} ${link.hoverColor} transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;