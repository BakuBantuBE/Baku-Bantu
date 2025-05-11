"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/contexts/ToastContext';
import orphanageService, { 
  Orphanage, 
  OrphanageDetail,
  UpdateOrphanageDetailParams
} from '@/services/orphanageService';

// Type definitions
interface Wilayah {
  id: number;
  nama: string;
  status?: string;
}

interface Yayasan {
  id: number;
  namaYayasan: string;
  status?: string;
}

interface OrphanageFormData {
  namaPanti: string;
  deskripsiSingkat: string;
  jumlahAnak: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  yayasanId: number | null;
  wilayahId: number | null;
  fotoUtama: File | null;
}

export default function AddOrphanagePage() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wilayahs, setWilayahs] = useState<Wilayah[]>([]);
  const [yayasans, setYayasans] = useState<Yayasan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [createdOrphanage, setCreatedOrphanage] = useState<Orphanage | null>(null);

  // Form state for step 1
  const [formData, setFormData] = useState<OrphanageFormData>({
    namaPanti: '',
    deskripsiSingkat: '',
    jumlahAnak: 0,
    status: 'ACTIVE',
    yayasanId: null,
    wilayahId: null,
    fotoUtama: null
  });

  // Form state for step 2
  const [detailFormData, setDetailFormData] = useState<UpdateOrphanageDetailParams>({
    fokusPelayanan: 'Umum',
    alamatLengkap: '',
    deskripsiLengkap: '',
    jumlahPengasuh: 0,
    jumlahPenghuni: {
      laki_laki: 0,
      perempuan: 0
    },
    kategoriKebutuhan: [],
    sumbanganDiterima: []
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch wilayahs and yayasans data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch active wilayahs
        const wilayahResponse = await orphanageService.getActiveWilayah();
        setWilayahs(wilayahResponse.data || []);

        // Fetch active yayasans
        const yayasanResponse = await orphanageService.getActiveYayasan();
        setYayasans(yayasanResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Gagal memuat data wilayah dan yayasan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Update form data for step 1
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10) || 0;
    setFormData(prev => ({
      ...prev,
      [name]: numberValue
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : null
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({
        ...prev,
        fotoUtama: file
      }));

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update form data for step 2
  const handleDetailInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetailFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10) || 0;
    setDetailFormData(prev => ({
      ...prev,
      [name]: numberValue
    }));
  };

  const handlePenghuniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const gender = name === 'laki_laki' ? 'laki_laki' : 'perempuan';
    const numberValue = parseInt(value, 10) || 0;
    
    setDetailFormData(prev => ({
      ...prev,
      jumlahPenghuni: {
        ...prev.jumlahPenghuni,
        [gender]: numberValue
      }
    }));
  };

  const handleCheckboxChange = (category: string, type: 'kategoriKebutuhan' | 'sumbanganDiterima') => {
    setDetailFormData(prev => {
      const currentCategories = prev[type];
      const newCategories = currentCategories.includes(category)
        ? currentCategories.filter(item => item !== category)
        : [...currentCategories, category];
      
      return {
        ...prev,
        [type]: newCategories
      };
    });
  };

  // Validate first form
  const validateFirstForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.namaPanti.trim()) {
      newErrors.namaPanti = 'Nama panti asuhan wajib diisi';
    }
    
    if (!formData.deskripsiSingkat.trim()) {
      newErrors.deskripsiSingkat = 'Deskripsi singkat wajib diisi';
    }
    
    if (formData.wilayahId === null) {
      newErrors.wilayahId = 'Wilayah wajib dipilih';
    }
    
    if (formData.yayasanId === null) {
      newErrors.yayasanId = 'Yayasan wajib dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit first form
  const submitFirstForm = async () => {
    if (!validateFirstForm()) {
      toast.error('Mohon perbaiki kesalahan pada formulir');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for sending file
      const formDataObj = new FormData();
      
      // Add all fields to FormData
      formDataObj.append('namaPanti', formData.namaPanti);
      formDataObj.append('deskripsiSingkat', formData.deskripsiSingkat);
      formDataObj.append('yayasanId', formData.yayasanId!.toString());
      formDataObj.append('wilayahId', formData.wilayahId!.toString());
      
      // Add file if available
      if (formData.fotoUtama) {
        formDataObj.append('fotoUtama', formData.fotoUtama);
      }
      
      // Send request to create orphanage using the service
      const response = await orphanageService.createOrphanage(formDataObj);
      
      // Store the created orphanage data
      setCreatedOrphanage(response.data);
      
      // Initialize detail form with description from first step
      setDetailFormData(prev => ({
        ...prev,
        deskripsiLengkap: formData.deskripsiSingkat
      }));
      
      toast.success('Data dasar panti asuhan berhasil disimpan');
      
      // Move to next step
      setStep(2);
    } catch (error) {
      console.error('Error creating orphanage:', error);
      toast.error('Gagal menyimpan data panti asuhan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit second form
  const submitDetailForm = async () => {
    if (!createdOrphanage) {
      toast.error('Data panti asuhan tidak ditemukan');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send request to update orphanage detail using the service
      await orphanageService.updateOrphanageDetail(
        createdOrphanage.id, 
        detailFormData as UpdateOrphanageDetailParams
      );
      
      toast.success('Detail panti asuhan berhasil disimpan');
      
      // Redirect to orphanage list page
      router.push('/dashboard/orphanages');
    } catch (error) {
      console.error('Error updating orphanage detail:', error);
      toast.error('Gagal menyimpan detail panti asuhan');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kategori kebutuhan options
  const kategoriKebutuhanOptions = [
    'Sembako',
    'Peralatan Sekolah',
    'Peralatan Mandi',
    'Perlengkapan Belajar',
    'Mainan Edukatif',
    'Pakaian',
    'Obat-obatan',
    'Kebutuhan Bayi'
  ];

  // Sumbangan options
  const sumbanganOptions = [
    'Pangan',
    'Sandang',
    'Tunai',
    'Kebutuhan Asuh',
    'Layanan Kesehatan',
    'Pendidikan',
    'Transportasi',
    'Kebutuhan Ibadah'
  ];

  // Fokus pelayanan options
  const fokusPelayananOptions = [
    'Umum',
    'Anak Yatim Piatu',
    'Dhuafa',
    'Anak dengan Kebutuhan Khusus',
    'Lansia',
    'Anak Jalanan',
    'Anak Yatim Piatu dan Dhuafa',
    'Anak Yatim Piatu, Dhuafa, dan Anak dengan Kebutuhan Khusus'
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Tambah Panti Asuhan' : 'Detail Panti Asuhan'}
          </h1>
          <p className="text-gray-600 mt-1">
            {step === 1 
              ? 'Isi formulir di bawah untuk menambahkan panti asuhan baru' 
              : 'Lengkapi detail panti asuhan untuk melanjutkan'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => step === 1 ? router.back() : setStep(1)}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          }
        >
          {step === 1 ? 'Kembali' : 'Sebelumnya'}
        </Button>
      </div>

      {isLoading && step === 1 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Step 1: Basic Orphanage Information */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Nama Panti Asuhan"
                    name="namaPanti"
                    value={formData.namaPanti}
                    onChange={handleInputChange}
                    error={errors.namaPanti}
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wilayah <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="wilayahId"
                      className={`h-10 w-full rounded-md border ${errors.wilayahId ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue`}
                      value={formData.wilayahId || ''}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="">Pilih Wilayah</option>
                      {wilayahs.map(wilayah => (
                        <option key={wilayah.id} value={wilayah.id}>{wilayah.nama}</option>
                      ))}
                    </select>
                    {errors.wilayahId && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.wilayahId}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yayasan <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="yayasanId"
                      className={`h-10 w-full rounded-md border ${errors.yayasanId ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue`}
                      value={formData.yayasanId || ''}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="">Pilih Yayasan</option>
                      {yayasans.map(yayasan => (
                        <option key={yayasan.id} value={yayasan.id}>{yayasan.namaYayasan}</option>
                      ))}
                    </select>
                    {errors.yayasanId && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.yayasanId}
                      </p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi Singkat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="deskripsiSingkat"
                      rows={3}
                      className={`w-full rounded-md border ${errors.deskripsiSingkat ? 'border-red-500' : 'border-gray-300'} bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue`}
                      value={formData.deskripsiSingkat}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    {errors.deskripsiSingkat && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.deskripsiSingkat}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="status-active"
                          name="status"
                          type="radio"
                          value="ACTIVE"
                          checked={formData.status === 'ACTIVE'}
                          onChange={() => setFormData(prev => ({ ...prev, status: 'ACTIVE' }))}
                          className="h-4 w-4 border-gray-300 text-babyBlue focus:ring-babyBlue"
                        />
                        <label htmlFor="status-active" className="ml-2 block text-sm text-gray-700">
                          Aktif
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="status-inactive"
                          name="status"
                          type="radio"
                          value="INACTIVE"
                          checked={formData.status === 'INACTIVE'}
                          onChange={() => setFormData(prev => ({ ...prev, status: 'INACTIVE' }))}
                          className="h-4 w-4 border-gray-300 text-babyBlue focus:ring-babyBlue"
                        />
                        <label htmlFor="status-inactive" className="ml-2 block text-sm text-gray-700">
                          Tidak Aktif
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="status-pending"
                          name="status"
                          type="radio"
                          value="PENDING"
                          checked={formData.status === 'PENDING'}
                          onChange={() => setFormData(prev => ({ ...prev, status: 'PENDING' }))}
                          className="h-4 w-4 border-gray-300 text-babyBlue focus:ring-babyBlue"
                        />
                        <label htmlFor="status-pending" className="ml-2 block text-sm text-gray-700">
                          Menunggu
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto Utama
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {selectedImage ? (
                          <div className="relative">
                            <img 
                              src={selectedImage} 
                              alt="Preview" 
                              className="mx-auto h-40 w-auto object-cover" 
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImage(null);
                                setFormData(prev => ({ ...prev, fotoUtama: null }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-babyBlue hover:text-babyBlue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-babyBlue"
                              >
                                <span>Upload foto</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={submitFirstForm}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Selanjutnya'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Orphanage Details */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fokus Pelayanan
                    </label>
                    <select
                      name="fokusPelayanan"
                      className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue"
                      value={detailFormData.fokusPelayanan}
                      onChange={handleDetailInputChange}
                    >
                      {fokusPelayananOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Input
                    label="Jumlah Pengasuh"
                    type="number"
                    name="jumlahPengasuh"
                    value={detailFormData.jumlahPengasuh.toString()}
                    onChange={handleDetailNumberChange}
                    min={0}
                  />
                  
                  <Input
                    label="Jumlah Penghuni Laki-laki"
                    type="number"
                    name="laki_laki"
                    value={detailFormData.jumlahPenghuni.laki_laki.toString()}
                    onChange={handlePenghuniChange}
                    min={0}
                  />
                  
                  <Input
                    label="Jumlah Penghuni Perempuan"
                    type="number"
                    name="perempuan"
                    value={detailFormData.jumlahPenghuni.perempuan.toString()}
                    onChange={handlePenghuniChange}
                    min={0}
                  />
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      name="alamatLengkap"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue"
                      value={detailFormData.alamatLengkap}
                      onChange={handleDetailInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi Lengkap
                    </label>
                    <textarea
                      name="deskripsiLengkap"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue"
                      value={detailFormData.deskripsiLengkap}
                      onChange={handleDetailInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori Kebutuhan
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {kategoriKebutuhanOptions.map(category => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`kategori-${category}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-babyBlue focus:ring-babyBlue"
                            checked={detailFormData.kategoriKebutuhan.includes(category)}
                            onChange={() => handleCheckboxChange(category, 'kategoriKebutuhan')}
                          />
                          <label htmlFor={`kategori-${category}`} className="ml-2 block text-sm text-gray-700">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sumbangan Diterima
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {sumbanganOptions.map(category => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`sumbangan-${category}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-babyBlue focus:ring-babyBlue"
                            checked={detailFormData.sumbanganDiterima.includes(category)}
                            onChange={() => handleCheckboxChange(category, 'sumbanganDiterima')}
                          />
                          <label htmlFor={`sumbangan-${category}`} className="ml-2 block text-sm text-gray-700">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={submitDetailForm}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Detail'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}