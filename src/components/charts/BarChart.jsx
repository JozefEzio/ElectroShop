import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SimpleBarChart({ last7Days }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={last7Days}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: 'var(--color-third)', fontSize: 14 }}
          stroke="var(--color-third)"
        />
        <YAxis 
          label={{ 
            value: 'Revenu (DH)', 
            angle: -90, 
            position: 'insideLeft',
            style: { fill: 'var(--color-third)' }
          }}
          tick={{ fill: 'var(--color-third)' }}
          stroke="var(--color-third)"
          width={80}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          formatter={(value) => [`${value.toLocaleString('fr-FR')} DH`, 'Revenu']}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '10px' }}
          formatter={() => 'CA des 7 derniers jours'}
        />
        <Bar 
          dataKey="montant" 
          fill="var(--color-btn)" 
          radius={[8, 8, 0, 0]}
          name="CA des 7 derniers jours"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default SimpleBarChart