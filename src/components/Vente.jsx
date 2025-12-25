import React from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
const Vente = ({ id, date, product, client, quantity, unit_price, montantTotal, payment, seller, delteConfirme, setDeleteConfirme, handleDelete }) => {
    const getPaymentStyle = (payment) => {
        switch (payment) {
            case 'Espèces':
                return 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800';
            case 'Carte':
                return 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
            case 'Virement':
                return 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
            default:
                return 'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
        }
    };

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-border">
            <td className="px-6 py-4 text-third">
                <div className="flex items-center gap-2">
                    <CalendarTodayIcon className="w-4 h-4 text-fourth" />
                    {new Date(date).toLocaleDateString('fr-FR')}
                </div>
            </td>
            <td className="px-6 py-4 font-medium text-secondary">{product}</td>
            <td className="px-6 py-4 text-third">
                <div className="flex items-center gap-2">
                    <PersonIcon className="w-4 h-4 text-fourth" />
                    {client}
                </div>
            </td>
            <td className="px-6 py-4 text-center text-third">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium">
                    {quantity}
                </span>
            </td>
            <td className="px-6 py-4 text-third font-medium">{unit_price.toLocaleString('fr-FR')} DH</td>
            <td className="px-6 py-4 text-secondary font-semibold">{montantTotal(unit_price, quantity).toLocaleString('fr-FR')} DH</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPaymentStyle(payment)}`}>
                    {payment}
                </span>
            </td>
            <td className="px-6 py-4 text-third">{seller}</td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    {delteConfirme === id ? (
                        <>
                            <button
                                onClick={() => handleDelete(id)}
                                className="px-3 py-1.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Confirmer
                            </button>
                            <button
                                onClick={() => setDeleteConfirme(null)}
                                className="px-3 py-1.5 text-sm font-medium bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={`/ventes/modifier/${id}`}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Modifier"
                            >
                                <ModeEditOutlineOutlinedIcon className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => setDeleteConfirme(id)}
                                className="p-2 cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Supprimer"
                            >
                                <DeleteOutlineOutlinedIcon className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};
export default Vente