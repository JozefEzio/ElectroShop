import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVentes, removeVentes } from '../redux/VentesSlice';
import { Link } from 'react-router-dom';
import Vente from '../components/Vente';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Ventes = () => {
  const [delteConfirme, setDeleteConfirme] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { data } = useSelector((state) => state.ventes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVentes());
  }, [dispatch]);

  console.log("Component data:", data);

  const montantTotal = (price, quantity) => price * quantity;
  const totalGeneral = data.reduce((sum, vente) => sum + montantTotal(vente.prixUnitaire, vente.quantite), 0);

  const handleDelete = (id) => {
    dispatch(removeVentes(id))
    setDeleteConfirme(null)
  }

  const filteredData = data.filter(vente =>
    vente.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vente.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vente.vendeur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(filteredData)


  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ReceiptLongIcon className="w-8 h-8 text-btn" />
            <h1 className="text-3xl font-bold text-secondary">Gestion des Ventes</h1>
          </div>
          <p className="text-fourth">Gérez et suivez toutes vos transactions commerciales</p>
        </div>

        <div className="bg-background rounded-xl shadow-md p-6 mb-6 border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fourth" />
                <input
                  type="text"
                  placeholder="Rechercher un produit, client ou vendeur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-main border border-border rounded-lg text-third placeholder-fourth focus:outline-none focus:ring-2 focus:ring-btn focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <Link to={'/ventes/ajouter'} className="flex items-center gap-2 px-6 py-2.5 bg-btn text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium">
                <AddIcon className="w-5 h-5" />
                Nouvelle Vente
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-xl shadow-md overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-border">
                <tr className="text-secondary">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Produit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Quantité</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Prix Unitaire</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Montant Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Mode Paiement</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Vendeur</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              {filteredData.length !== 0 ? (
                <>
                  <tbody className="divide-y divide-border">
                    {currentItems.map((vente) => (
                      <Vente
                        key={vente.id}
                        id={vente.id}
                        date={vente.date}
                        product={vente.produit}
                        client={vente.client}
                        quantity={vente.quantite}
                        unit_price={vente.prixUnitaire}
                        montantTotal={montantTotal}
                        payment={vente.modePaiement}
                        seller={vente.vendeur}
                        delteConfirme={delteConfirme}
                        setDeleteConfirme={setDeleteConfirme}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 dark:bg-slate-800/50 border-t-2 border-border">
                    <tr className="text-secondary font-semibold">
                      <td colSpan={5} className="px-4 py-4 text-lg">Total Général</td>
                      <td className="text-lg text-primary">{totalGeneral.toLocaleString('fr-FR')} DH</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={9} className="p-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <ReceiptLongIcon className="w-16 h-16 text-fourth opacity-50" />
                        <p className="text-third text-lg font-medium">
                          {searchTerm ? 'Aucun résultat trouvé' : 'Aucune vente disponible'}
                        </p>
                        <p className="text-fourth text-sm">
                          {searchTerm ? 'Essayez de modifier votre recherche' : 'Commencez par ajouter une nouvelle vente'}
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        {filteredData.length > itemsPerPage && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background rounded-xl shadow-md p-4 border border-border">
            <div className="text-third text-sm">
              Affichage de <span className="font-semibold">{indexOfFirstItem +1}</span> à{' '}
              <span className="font-semibold">{Math.min(indexOfLastItem, filteredData.length)}</span> sur{' '}
              <span className="font-semibold">{filteredData.length}</span> ventes
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border border-border transition-colors ${currentPage === 1
                    ? 'bg-main text-fourth cursor-not-allowed'
                    : 'bg-main text-third hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
              >
                <ChevronLeftIcon />
              </button>

              <div className="px-4 py-2 rounded-lg bg-main text-third border border-border">
                Page <span className="font-semibold">{currentPage}</span> sur{' '}
                <span className="font-semibold">{totalPages}</span>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border border-border transition-colors ${currentPage === totalPages
                    ? 'bg-main text-fourth cursor-not-allowed'
                    : 'bg-main text-third hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Ventes;