// src/components/ui/ColorSystem.tsx
/**
 * Komponen ini adalah dokumentasi visual dari sistem warna yang digunakan di aplikasi
 * Berguna untuk rujukan developer
 */
import React from 'react';
import { colors } from '@/lib/colors';

const ColorBox = ({ color, name, value }: { color: string; name: string; value?: string }) => {
  return (
    <div className="flex flex-col">
      <div 
        className="h-16 w-full rounded-md mb-1" 
        style={{ backgroundColor: color }}
      />
      <div className="text-xs font-medium">{name}</div>
      {value && <div className="text-xs text-gray-500">{value}</div>}
    </div>
  );
};

const ColorSystem = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Sistem Warna Aplikasi</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Warna Utama</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <ColorBox color={colors.primary.DEFAULT} name="Primary" value="#9FC4E8" />
          <ColorBox color={colors.primary.light} name="Primary Light" value="#C1DBF2" />
          <ColorBox color={colors.primary.dark} name="Primary Dark" value="#7BA9D6" />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <ColorBox color={colors.secondary.DEFAULT} name="Secondary" value="#CFA4CC" />
          <ColorBox color={colors.secondary.light} name="Secondary Light" value="#E1C5DF" />
          <ColorBox color={colors.secondary.dark} name="Secondary Dark" value="#B383B0" />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Warna Brand</h3>
        <div className="grid grid-cols-5 gap-4">
          <ColorBox color={colors.lavender.DEFAULT} name="Lavender" value="#CFA4CC" />
          <ColorBox color={colors.poppy.DEFAULT} name="Poppy" value="#EE5A36" />
          <ColorBox color={colors.babyBlue.DEFAULT} name="Baby Blue" value="#9FC4E8" />
          <ColorBox color={colors.forest.DEFAULT} name="Forest" value="#1A9562" />
          <ColorBox color={colors.mango.DEFAULT} name="Mango" value="#F5AB54" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Warna Netral</h3>
        <div className="grid grid-cols-5 gap-4">
          <ColorBox color={colors.neutral[100]} name="Gray 100" value="#f3f4f6" />
          <ColorBox color={colors.neutral[300]} name="Gray 300" value="#d1d5db" />
          <ColorBox color={colors.neutral[500]} name="Gray 500" value="#6b7280" />
          <ColorBox color={colors.neutral[700]} name="Gray 700" value="#374151" />
          <ColorBox color={colors.neutral[900]} name="Gray 900" value="#111827" />
        </div>
      </div>
    </div>
  );
};

export default ColorSystem;