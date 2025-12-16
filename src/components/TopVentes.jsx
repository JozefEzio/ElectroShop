import React from 'react';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
const TopVentes = ({ data }) => {


    const displayData = data.slice(0, 5);
    const maxMontant = displayData.length > 0 ? displayData[0].montant : 1;

    return (
        <>
            <div className="flex items-center gap-2 mb-6">
                <div className="text-btn">
                    <CallMissedOutgoingIcon />
                </div>
                <h2 className="text-xl font-semibold text-secondary">
                    Top 5 Produits les Plus Vendus
                </h2>
            </div>

            <div className="space-y-4">
                {displayData.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-btn text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                            {index + 1}
                        </div>

                        <div className="flex-1">
                            <p className="text-secondary font-medium mb-1">{product.produit}</p>                            
                            <div className="w-full bg-fourth rounded-full h-2">
                                <div
                                    className="bg-btn h-2 rounded-full"
                                    style={{ width: `${(product.montant / maxMontant) * 100}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-secondary font-semibold">
                            {product.montant.toLocaleString('fr-FR')} DH
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TopVentes;