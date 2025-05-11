// src/components/DonationChart.tsx
import React from 'react';
import { Pie } from 'recharts';
import { PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonationChartProps {
  className?: string;
}

const DonationChart: React.FC<DonationChartProps> = ({ className }) => {
  const data = [
    { name: 'Panti Asuhan', value: 40, color: '#9FC4E8' },
    { name: 'Program Kebersihan', value: 35, color: '#CFA4CC' },
    { name: 'Kegiatan Luar', value: 10, color: '#F5AB54' },
    { name: 'Memberi Makan', value: 5, color: '#EE5A36' },
    { name: 'Membantu Orang', value: 10, color: '#1A9562' }
  ];

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonationChart;