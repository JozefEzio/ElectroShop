import React, { useEffect, useState } from 'react';

const Kpi = ({ icon: Icon, title, revenue, ventes, color, gradient }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-background p-6 shadow-lg transition-all duration-300 ">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${gradient}`}></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${color} bg-opacity-10`}>
          {ventes.length} vente{ventes.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <p className={`text-3xl font-bold text-secondary`}>
            {revenue.toLocaleString('fr-FR')}
          </p>
          <span className="text-lg font-semibold text-gray-400">DH</span>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300" 
           style={{ background: `linear-gradient(135deg, ${color.includes('green') ? '#10b981' : color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#8b5cf6' : '#f59e0b'} 0%, transparent 70%)` }}>
      </div>
    </div>
  );
};
export default Kpi