import React from 'react'

const Kpi = ({icon:Icon, title, revenue, ventes, color}) => {
  return (
    <div>
        <div className="bg-background rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-third">{title}</span>
              <Icon className={`w-15 h-15 text-${color}`} />
            </div>
            <p className="text-3xl text-third">{revenue.toLocaleString('fr-FR')} DH</p>
            <p className="text-sm text-third mt-1">{ventes.length} vente(s)</p>
          </div>
    </div>
  )
}

export default Kpi