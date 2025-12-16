import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editVentes, fetchVenteById } from '../redux/VentesSlice';
import { Link, useNavigate, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SaveIcon from '@mui/icons-material/Save';
import InventoryIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';


const EditVentes = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ventes);
  const vente = data.find((v) => v.id == id);
  console.log(vente)

  useEffect(() => {
    if (!vente) dispatch(fetchVenteById(id));
  }, [dispatch, id, vente]);


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    produit: '',
    quantite: 1,
    prixUnitaire: 0,
    client: '',
    date: new Date().toISOString().split('T')[0],
    modePaiement: 'Espèces',
    vendeur: ''
  });

  useEffect(() => {
    if (vente) {
      setFormData({
        produit: vente.produit,
        quantite: vente.quantite,
        prixUnitaire: vente.prixUnitaire,
        client: vente.client,
        date: vente.date,
        modePaiement: vente.modePaiement,
        vendeur: vente.vendeur
      })
    }
  }, [vente])

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const paymentMethod = ['Espèces', 'Carte', 'Virement', 'Chèque'];
  const montantTotal = formData.quantite * formData.prixUnitaire;


  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: name === 'quantite' || name === 'prixUnitaire' ? Number(value) : value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    console.log(formData);
  };
  const validateForm = (data) => {
    let newErrors = {};

    if (!data.produit.trim()) {
      newErrors.produit = 'Le nom du produit est requis.';
    }
    if (!data.client.trim()) {
      newErrors.client = 'Le nom du client est requis.';
    }
    if (!data.vendeur.trim()) {
      newErrors.vendeur = 'Le nom du vendeur est requis.';
    }
    if (!data.modePaiement) {
      newErrors.modePaiement = 'Le mode de paiement est requis.';
    }
    if (!data.date) {
      newErrors.date = 'La date est requise.';
    }
    if (data.quantite <= 0 || isNaN(data.quantite)) {
      newErrors.quantite = 'La quantité doit être un nombre positif.';
    }
    if (data.prixUnitaire < 0 || isNaN(data.prixUnitaire)) {
      newErrors.prixUnitaire = 'Le prix unitaire ne peut pas être négatif.';
    }

    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false)
      setErrors(validationErrors)
      return
    }
    dispatch(editVentes({ id, vente: formData }))
    navigate('/ventes')
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className="max-w-2xl mx-auto">
        <Link to={'/ventes'} className='inline-flex items-center gap-2 text-fourth  hover:text-primary transition-colors mb-6'>
          <KeyboardBackspaceIcon />
          Retour à la liste
        </Link>
        {vente ? (<div className="bg-background rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Modifier une Vente</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="produit" className="flex items-center gap-2 text-secondary font-medium mb-2">
                <InventoryIcon className="w-4 h-4" />
                Nom du Produit *
              </label>
              <input
                type="text"
                id="produit"
                name="produit"
                value={formData.produit}
                onChange={handleChange}

                className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                placeholder="Ex: Smartphone Samsung Galaxy A54"
              />
              {errors.produit && <p className="text-red-500 text-sm mt-1">{errors.produit}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="quantite" className="flex items-center gap-2 text-secondary font-medium mb-2">
                  <NumbersIcon className="w-4 h-4" />
                  Quantité *
                </label>
                <input
                  type="number"
                  id="quantite"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}

                  min="1"
                  className="w-full px-4 py-2 border text-third border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                />
                {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite}</p>}
              </div>

              <div>
                <label htmlFor="prixUnitaire" className="flex items-center gap-2 text-secondary font-medium mb-2">
                  <AttachMoneyIcon className="w-4 h-4" />
                  Prix Unitaire (DH) *
                </label>
                <input
                  type="number"
                  id="prixUnitaire"
                  name="prixUnitaire"
                  value={formData.prixUnitaire}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                />
                {errors.prixUnitaire && <p className="text-red-500 text-sm mt-1">{errors.prixUnitaire}</p>}
              </div>
            </div>
            <div className="bg-main border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-fourth font-medium mb-1">Montant Total</p>
              <p className="text-3xl font-bold text-primary">
                {montantTotal.toLocaleString('fr-FR')} DH
              </p>
            </div>
            <div>
              <label htmlFor="client" className="flex items-center gap-2 text-secondary font-medium mb-2">
                <PersonIcon className="w-4 h-4" />
                Nom du Client *
              </label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                placeholder="Ex: Ahmed Bennani"
              />
              {errors.client && <p className="text-red-500 text-sm mt-1">{errors.client}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="flex items-center gap-2 text-secondary font-medium mb-2">
                  <CalendarTodayIcon className="w-4 h-4" />
                  Date de Vente *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}

                  className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}

              </div>

              <div>
                <label htmlFor="modePaiement" className="flex items-center gap-2 text-secondary font-medium mb-2">
                  <PaymentIcon className="w-4 h-4" />
                  Mode de Paiement *
                </label>

                <select
                  id="modePaiement"
                  name="modePaiement"
                  value={formData.modePaiement}
                  onChange={handleChange}
                  className="w-full text-third px-4 py-2 border border-border bg-background cursor-pointer rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0 "
                >
                  {paymentMethod.map((p, i) => <option key={i} value={p}>{p}</option>)}
                </select>
                {errors.modePaiement && <p className="text-red-500 text-sm mt-1">{errors.modePaiement}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="vendeur" className="flex items-center gap-2 text-secondary font-medium mb-2">
                <BadgeIcon className="w-4 h-4" />
                Nom du Vendeur *
              </label>
              <input
                type="text"
                id="vendeur"
                name="vendeur"
                value={formData.vendeur}
                onChange={handleChange}

                className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                placeholder="Ex: Karim"
              />
              {errors.vendeur && <p className="text-red-500 text-sm mt-1">{errors.vendeur}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-btn text-white px-6 py-3 rounded-lg hover:bg-btn transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <SaveIcon className="w-5 h-5" />
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer la Vente'}
              </button>
              <Link
                to="/ventes"
                className="px-6 py-3 border border-fourth rounded-lg hover:bg-border transition-colors text-secondary"
              >
                Annuler
              </Link>
            </div>
          </form>

        </div>) : <p className='text-secondary text-center p-5'>La vente avec l’ID {id} n’existe pas.</p>}
      </div>
    </div>
  )
}

export default EditVentes