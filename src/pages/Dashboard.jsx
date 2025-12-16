import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVentes } from '../redux/VentesSlice';
import Kpis from '../components/Kpi/Kpis';
import SimplePieChart from '../components/charts/PieChart';
import SimpleBarChart from '../components/charts/BarChart';
import TopVentes from '../components/TopVentes';


const Dashboard = () => {
  const { data } = useSelector(state => state.ventes)
  const last7Days = [];
  const paymentData = {};
  const dispatche = useDispatch();
  useEffect(() => { dispatche(fetchVentes()) }, [dispatche])
  const montantTotal = (quantity, price) => price * quantity
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const daySales = data.filter(s => s.date === dateStr);
    const dayRevenue = daySales.reduce((sum, sale) => sum + montantTotal(sale.quantite, sale.prixUnitaire), 0);

    last7Days.push({
      date: new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      montant: dayRevenue
    });
  }
  // console.log(last7Days)
  const paymentModes = () => {
    data.forEach((d) => {
      if (paymentData[d.modePaiement]) {
        paymentData[d.modePaiement] += 1;
      } else {
        paymentData[d.modePaiement] = 1;
      }
    })
  }
  paymentModes()
  const percentagesArray = Object.keys(paymentData).map(mode => {
    const percentage = (paymentData[mode] / data.length) * 100;

    return {
      value: percentage.toFixed(2),
      label: mode,
      labelMarkType: 'square'
    };
  });
  // console.log(percentagesArray)

  const productSales = {};
  data.forEach(sale => {
    if (productSales[sale.produit]) {
      productSales[sale.produit] += montantTotal(sale.quantite, sale.prixUnitaire);
    } else {
      productSales[sale.produit] = montantTotal(sale.quantite, sale.prixUnitaire);
    }
  });
  const topProducts = Object.entries(productSales).map(([produit, montant]) => ({ produit, montant })).sort((a, b) => b.montant - a.montant).slice(0, 5);

  console.log(topProducts)

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2"> Tableau de Bord</h1>
          <p className="text-third">Aperçu de vos performances commerciales</p>
        </div>
        <Kpis data={data} />
        <div className='grid lg:grid-cols-2 gap-6 mb-8'>
          <div className="bg-background rounded-lg p-6 shadow-md">
            <h2 className="mb-6 text-third">Évolution des Ventes (7 Derniers Jours)</h2>
            <SimpleBarChart last7Days={last7Days} />
          </div>
          <div className="bg-background rounded-lg p-6 shadow-md">
            <h2 className="mb-6 text-third">Répartition Modes de Paiement</h2>
            <SimplePieChart data={percentagesArray} />
          </div>
        </div>
        <div className="bg-background rounded-lg p-6 shadow-md">
          <TopVentes data={topProducts} />
        </div>
      </div>
    </>
  )
}

export default Dashboard