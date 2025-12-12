import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVentes, removeVentes } from '../redux/VentesSlice';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Vente from '../components/Vente';

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
  const totalGeneral = data.reduce((sum, sale) => sum + montantTotal(sale.prixUnitaire, sale.quantite), 0);

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
              {data.length !== 0 ? (<>
                <tbody className="divide-y">
                  {data.map((sale) => (

                    <Vente key={sale.id} id={sale.id} date={sale.date} product={sale.produit} client={sale.client} quantity={sale.quantite} unit_price={sale.prixUnitaire} montantTotal={montantTotal} payment={sale.modePaiement} seller={sale.vendeur} delteConfirme={delteConfirme} setDeleteConfirme={setDeleteConfirme} handleDelete={handleDelete} />
                  ))}
                </tbody>
                <tfoot className="bg-background border-t-2 border-border">
                  <tr className='text-secondary'>
                    <td colSpan={5} className="px-6 py-4">Total Général</td>
                    <td className="p-5 ">{totalGeneral.toLocaleString('fr-FR')} DH</td>
                    <td colSpan={3}></td>
                  </tr>
                </tfoot>
              </>) : <tr>
                <td colSpan={9} className="p-6 text-center text-third">
                  Aucune vente n'est disponible pour le moment.
                </td>
              </tr>}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ventes;
