// src/components/common/CallToAction.tsx
import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-24 my-16">
      <div className="container mx-auto px-12">
        <div className="bg-cover bg-center rounded-3xl overflow-hidden relative" style={{ backgroundImage: "url('/images/cta-background.jpeg')", minHeight: "320px" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center text-white py-24 px-4 md:px-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Di sini torang bantu ngoni<br />
              Supaya ngoni boleh bantu yang laeng!
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/volunteer">
                <button className="bg-mango hover:bg-mango-dark text-black px-8 py-3 rounded-md font-medium transition-colors">
                  Bergabung sebagai Relawan
                </button>
              </Link>
              <Link href="/donate">
                <button className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-md font-medium transition-colors">
                  Donasi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;