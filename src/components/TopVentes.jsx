import React from 'react'

const TopVentes = ({ data }) => {
    return (
        <div>
            <h2 className="mb-6 text-third">Top 5 Produits les Plus Vendus</h2>
            <div className="space-y-4">
                {data.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="text-third">{product.produit}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                    className="bg-indigo-600 h-2 rounded-full"
                                    style={{ width: `${(product.montant / data[0].montant) * 100}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-third">{product.montant} DH</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopVentes