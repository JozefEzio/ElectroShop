import React from 'react'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
const Vente = ({ id, date, product, client, quantity, unit_price, montantTotal, payment, seller, delteConfirme, setDeleteConfirme, handleDelete }) => {
    return (
        <tr key={id} className="hover:bg-main text-third border-b border-border">
            <td className="px-6 py-4 ">
                {new Date(date).toLocaleDateString('fr-FR')}
            </td>
            <td className="px-6 py-4 ">{product}</td>
            <td className="px-6 py-4 ">{client}</td>
            <td className="px-6 py-4 ">{quantity}</td>
            <td className="px-6 py-4 ">{unit_price.toLocaleString('fr-FR')} DH</td>
            <td className="px-6 py-4 ">{montantTotal(unit_price, quantity).toLocaleString('fr-FR')} DH</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-sm ${payment === 'Espèces' ? 'bg-green-100 text-green-800' :
                    payment === 'Carte' ? 'bg-blue-100 text-blue-800' :
                        payment === 'Virement' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                    }`}>
                    {payment}
                </span>
            </td>
            <td className="px-6 py-4 text-third">{seller}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <Link
                        to={`/ventes/modifier/${id}`}
                        className="p-2 text-blue-600 hover:bg-background rounded transition-colors"
                        title="Modifier"
                    >
                        <ModeEditOutlineOutlinedIcon className="w-4 h-4" />
                    </Link>
                    {delteConfirme === id ? (
                        <>
                            <button onClick={() => handleDelete(id)} className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Confirmer</button>
                            <button onClick={() => setDeleteConfirme(null)} className="px-2 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Annuler</button>
                        </>
                    ) : (
                        <button onClick={() => setDeleteConfirme(id)} className="p-2 cursor-pointer text-red-600 hover:bg-background rounded transition-colors"><DeleteOutlineOutlinedIcon /></button>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default Vente