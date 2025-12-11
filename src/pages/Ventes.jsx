import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVentes, removeVentes } from '../redux/VentesSlice';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Ventes = () => {
  const [delteConfirme, setDeleteConfirme] = useState(null)
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.ventes);

  useEffect(() => {
    dispatch(fetchVentes());
  }, [dispatch]);

  console.log("Component data:", data);
  const montantTotal = (price, quantity) => {
    const total = price * quantity;
    return total

  }
  const totalGeneral = data.reduce((sum, sale) => sum + montantTotal(sale.unit_price, sale.quantity), 0);

  const handleDelete = (id) => {
    dispatch(removeVentes(id))
    setDeleteConfirme(null)
  }
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-secondary">Toutes les Ventes</h2>
          <Link
            to="/ventes/ajouter"
            className="bg-btn text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <AddIcon className="w-5 h-5" />
            Nouvelle Vente
          </Link>
        </div>

        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className='text-secondary'>
                  <th className="px-6 py-3 text-left ">Date</th>
                  <th className="px-6 py-3 text-left ">Produit</th>
                  <th className="px-6 py-3 text-left ">Client</th>
                  <th className="px-6 py-3 text-left ">Quantité</th>
                  <th className="px-6 py-3 text-left ">Prix Unitaire</th>
                  <th className="px-6 py-3 text-left ">Montant Total</th>
                  <th className="px-6 py-3 text-left ">Mode Paiement</th>
                  <th className="px-6 py-3 text-left ">Vendeur</th>
                  <th className="px-6 py-3 text-left ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((sale) => (
                  <tr key={sale.id} className="hover:bg-main text-third border-b border-border">
                    <td className="px-6 py-4 ">
                      {new Date(sale.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 ">{sale.product}</td>
                    <td className="px-6 py-4 ">{sale.client}</td>
                    <td className="px-6 py-4 ">{sale.quantity}</td>
                    <td className="px-6 py-4 ">{sale.unit_price.toLocaleString('fr-FR')} DH</td>
                    <td className="px-6 py-4 ">{montantTotal(sale.unit_price, sale.quantity).toLocaleString('fr-FR')} DH</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${sale.payment === 'Espèces' ? 'bg-green-100 text-green-800' :
                        sale.payment === 'Carte' ? 'bg-blue-100 text-blue-800' :
                          sale.payment === 'Virement' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                        }`}>
                        {sale.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-third">{sale.seller}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/ventes/modifier/${sale.id}`}
                          className="p-2 text-blue-600 hover:bg-background rounded transition-colors"
                          title="Modifier"
                        >
                          <ModeEditOutlineOutlinedIcon className="w-4 h-4" />
                        </Link>
                        {delteConfirme === sale.id ? (
                          <>
                            <button onClick={() => handleDelete(sale.id)} className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Confirmer</button>
                            <button onClick={() => setDeleteConfirme(null)} className="px-2 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Annuler</button>
                          </>
                        ) : (
                          <button onClick={() => setDeleteConfirme(sale.id)} className="p-2 cursor-pointer text-red-600 hover:bg-background rounded transition-colors"><DeleteOutlineOutlinedIcon /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-background border-t-2 border-border">
                <tr className='text-secondary'>
                  <td colSpan={5} className="px-6 py-4">Total Général</td>
                  <td className="px-6 py-4 ">{totalGeneral.toLocaleString('fr-FR')} DH</td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ventes;
