// src/lib/validations/volunteer-schema.ts
import { z } from 'zod';

// Define the volunteer form data structure
export interface VolunteerFormData {
  namaLengkap: string;
  jenisKelamin: 'MALE' | 'FEMALE';
  tempatLahir: string;
  tanggalLahir: string;
  alamatDomisili: string;
  kewarganegaraan: 'INDONESIA' | 'ASING';
  nomorHP: string;
  email: string;
  wilayahId: number | string; // Accept both for flexibility but will convert to number before API call
  profileImage: File | null;
}

// Utility function to calculate age from date of birth
export const calculateAge = (birthDateString: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Step 1 validation
export const validateStep1 = (data: Partial<VolunteerFormData>): Partial<Record<keyof VolunteerFormData, string>> => {
  const errors: Partial<Record<keyof VolunteerFormData, string>> = {};
  
  // Nama Lengkap validation
  if (!data.namaLengkap || data.namaLengkap.trim() === '') {
    errors.namaLengkap = 'Nama lengkap harus diisi';
  } else if (data.namaLengkap.length < 3) {
    errors.namaLengkap = 'Nama terlalu pendek (minimum 3 karakter)';
  } else if (data.namaLengkap.length > 100) {
    errors.namaLengkap = 'Nama terlalu panjang (maksimum 100 karakter)';
  }
  
  // Tempat Lahir validation
  if (!data.tempatLahir || data.tempatLahir.trim() === '') {
    errors.tempatLahir = 'Tempat lahir harus diisi';
  }
  
  // Tanggal Lahir validation
  if (!data.tanggalLahir) {
    errors.tanggalLahir = 'Tanggal lahir harus diisi';
  } else {
    // Check if the date is valid
    const isValidDate = !isNaN(new Date(data.tanggalLahir).getTime());
    if (!isValidDate) {
      errors.tanggalLahir = 'Tanggal lahir tidak valid';
    } else {
      // Check if the person is at least 17 years old
      const age = calculateAge(data.tanggalLahir);
      if (age < 17) {
        errors.tanggalLahir = 'Usia minimal untuk menjadi relawan adalah 17 tahun';
      }
    }
  }
  
  // Alamat Domisili validation
  if (!data.alamatDomisili || data.alamatDomisili.trim() === '') {
    errors.alamatDomisili = 'Alamat domisili harus diisi';
  } else if (data.alamatDomisili.length < 10) {
    errors.alamatDomisili = 'Alamat terlalu pendek, harap masukkan alamat lengkap';
  }
  
  return errors;
};

// Step 2 validation
export const validateStep2 = (data: Partial<VolunteerFormData>): Partial<Record<keyof VolunteerFormData, string>> => {
  const errors: Partial<Record<keyof VolunteerFormData, string>> = {};
  
  // Nomor HP validation
  if (!data.nomorHP || data.nomorHP.trim() === '') {
    errors.nomorHP = 'Nomor HP harus diisi';
  } else if (!/^[0-9]{8,15}$/.test(data.nomorHP)) {
    errors.nomorHP = 'Nomor HP tidak valid (8-15 digit)';
  }
  
  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email harus diisi';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Format email tidak valid';
    }
  }
  
  // Wilayah validation
  if (!data.wilayahId) {
    errors.wilayahId = 'Pilih wilayah kegiatan relawan';
  }
  
  return errors;
};

// Profile Picture validation
export const validateProfilePicture = (file: File | null): string | undefined => {
  if (!file) {
    return 'Foto profil harus diunggah';
  }
  
  // Check file size (max 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    return 'Ukuran file terlalu besar (maksimum 2MB)';
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return 'Format file tidak valid (hanya JPG, JPEG, dan PNG)';
  }
  
  return undefined;
};

// Prepare form data for API submission
export const prepareFormDataForSubmission = (formData: VolunteerFormData): Record<string, any> => {
  // Create a new object to avoid modifying the original
  const submissionData = { ...formData };
  
  // Ensure wilayahId is a number
  if (typeof submissionData.wilayahId === 'string') {
    submissionData.wilayahId = parseInt(submissionData.wilayahId, 10);
    // If parsing fails (NaN), set it to 0 or handle accordingly
    if (isNaN(submissionData.wilayahId as number)) {
      submissionData.wilayahId = 0;
    }
  }
  
  return submissionData;
};