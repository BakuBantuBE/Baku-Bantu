// src/types/orphanage.ts
// Existing interfaces kept for backward compatibility
export interface Orphanage {
  id: number;
  namaPanti: string;
  fotoUtama: string;
  deskripsiSingkat: string;
  jumlahAnak: number;
  status: string;
  yayasanId: number;
  wilayahId: number;
  createdAt: string;
  updatedAt: string;
  yayasan: {
    id: number;
    namaYayasan: string;
  };
  wilayah: {
    id: number;
    nama: string;
    provinsi: string | null;
  };
}

// New interfaces for detailed orphanage view
export interface OrphanageDetail {
  id_panti: number;
  nama_panti: string;
  foto_utama: string;
  deskripsi_singkat: string;
  jumlah_anak: number;
  status: string;
  yayasan: YayasanDetail;
  wilayah: WilayahDetail;
  detail: OrphanageDetailInfo;
}

export interface YayasanDetail {
  id_yayasan: number;
  nama_yayasan: string;
  kontak_yayasan: KontakYayasan[];
}

export interface KontakYayasan {
  jabatan: string;
  nama_kontak: string;
  nomor_telepon: string;
}

export interface WilayahDetail {
  id_wilayah: number;
  nama_wilayah: string;
  provinsi: string | null;
}

export interface OrphanageDetailInfo {
  fokus_pelayanan: string;
  alamat_lengkap: string;
  deskripsi_lengkap: string;
  jumlah_pengasuh: number;
  jumlah_penghuni: {
    laki_laki: number;
    perempuan: number;
  };
  kategori_kebutuhan: string[];
  sumbangan_diterima: string[];
}

export interface Wilayah {
  id: number;
  nama: string;
  provinsi: string | null;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface Yayasan {
  id: number;
  namaYayasan: string;
  alamatYayasan: string;
  emailYayasan: string;
  kontakYayasan: {
    jabatan: string;
    nama_kontak: string;
    nomor_telepon: string;
  }[];
}

export interface OrphanageFilterProps {
  searchTerm: string;
  selectedRegion: number | null;
  selectedYayasan: number | null;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: number | null) => void;
  onYayasanChange: (value: number | null) => void;
  onResetFilters: () => void;
}

export interface OrphanageGridProps {
  orphanages: Orphanage[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export interface OrphanageCardProps {
  orphanage: Orphanage;
}

// New interfaces for orphanage detail components
export interface OrphanageHeroProps {
  orphanage: OrphanageDetail;
}

export interface OrphanageDetailsProps {
  orphanage: OrphanageDetail;
}

export interface OrphanageNeedsProps {
  orphanage: OrphanageDetail;
}

export interface OrphanageDonationProps {
  orphanage: OrphanageDetail;
}

export interface OrphanageContactProps {
  orphanage: OrphanageDetail;
}