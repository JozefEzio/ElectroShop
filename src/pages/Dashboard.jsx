import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVentes } from '../redux/VentesSlice';
import Kpis from '../components/Kpi/Kpis';
import SimplePieChart from '../components/charts/PieChart';
import SimpleBarChart from '../components/charts/BarChart';
import TopVentes from '../components/TopVentes';
import { useReactToPrint } from 'react-to-print'
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Dashboard = () => {
  const { data } = useSelector(state => state.ventes)
  const dashboardRef = useRef(null)
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [filteredData, setFilteredData] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchVentes())
  }, [dispatch])

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const applyDateFilter = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(sale => {
      const saleDate = new Date(sale.date);
      const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

      if (start && end) {
        return saleDate >= start && saleDate <= end;
      } else if (start) {
        return saleDate >= start;
      } else if (end) {
        return saleDate <= end;
      }
      return true;
    });

    setFilteredData(filtered);
  };

  const resetDateFilter = () => {
    setDateRange({ startDate: '', endDate: '' });
    setFilteredData(data);
  };

  const montantTotal = (quantity, price) => price * quantity;

  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const daySales = filteredData.filter(s => s.date === dateStr);
    const dayRevenue = daySales.reduce((sum, sale) => sum + montantTotal(sale.quantite, sale.prixUnitaire), 0);

    last7Days.push({
      date: new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      montant: dayRevenue
    });
  }

  const paymentData = {};
  filteredData.forEach((d) => {
    if (paymentData[d.modePaiement]) {
      paymentData[d.modePaiement] += 1;
    } else {
      paymentData[d.modePaiement] = 1;
    }
  });

  const percentagesArray = Object.keys(paymentData).map(mode => {
    const percentage = (paymentData[mode] / filteredData.length) * 100;
    return {
      value: percentage.toFixed(2),
      label: mode,
      labelMarkType: 'square'
    };
  });

  const productSales = {};
  filteredData.forEach(sale => {
    if (productSales[sale.produit]) {
      productSales[sale.produit] += montantTotal(sale.quantite, sale.prixUnitaire);
    } else {
      productSales[sale.produit] = montantTotal(sale.quantite, sale.prixUnitaire);
    }
  });
  const topProducts = Object.entries(productSales)
    .map(([produit, montant]) => ({ produit, montant }))
    .sort((a, b) => b.montant - a.montant)
    .slice(0, 5);

  const handlePrint = useReactToPrint({
    contentRef: dashboardRef,
    documentTitle: `dashboard_${new Date().toLocaleDateString('fr-FR')}`,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { -webkit-print-color-adjust: exact; }
    `
  });

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-2">Tableau de Bord</h1>
            <p className="text-third">Aperçu de vos performances commerciales</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shadow-sm transition-colors duration-200 border border-slate-300"
            >
              <CalendarTodayIcon className="text-lg" />
              <span className="font-medium">Filtrer par Date</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-btn to-indigo-600 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <DownloadIcon className="text-lg" />
              <span className="font-medium">Télécharger PDF</span>
            </button>
          </div>
        </div>

        {showDateFilter && (
          <div className="bg-background rounded-lg p-6 shadow-md mb-8 border border-border">
            <h3 className="text-lg font-semibold text-secondary mb-4">Filtrer par Période</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-third mb-2" htmlFor="date1">
                  Date de Début
                </label>
                <input
                  type="date"
                  id='date1'
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-third mb-2" htmlFor="date2">
                  Date de Fin
                </label>
                <input
                  type="date"
                  id='date2'
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="w-full text-third px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-btn focus:border-transparent focus:outline-0"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={applyDateFilter}
                  className="px-4 py-2 flex-1 cursor-pointer bg-btn text-white  rounded-lg hover:bg-btn transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Appliquer
                </button>
                <button
                  onClick={resetDateFilter}
                  className="px-4 py-2 cursor-pointer  border border-fourth rounded-lg hover:bg-border transition-colors text-secondary"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
            {(dateRange.startDate || dateRange.endDate) && (
              <div className="mt-4 text-sm text-third">
                Affichage des données: {' '}
                {dateRange.startDate && <span className="font-medium">du {new Date(dateRange.startDate).toLocaleDateString('fr-FR')}</span>}
                {dateRange.startDate && dateRange.endDate && <span> au </span>}
                {dateRange.endDate && <span className="font-medium">{new Date(dateRange.endDate).toLocaleDateString('fr-FR')}</span>}
                {' '}({filteredData.length} vente{filteredData.length > 1 ? 's' : ''})
              </div>
            )}
          </div>
        )}
        <div ref={dashboardRef} >
          <div className='mb-8'>
            <Kpis data={filteredData} />
          </div>

          <div className='grid lg:grid-cols-2 gap-6 mb-8'>
            <div className="bg-background rounded-lg p-6 shadow-md">
              <h2 className="mb-6 text-third font-semibold">Évolution des Ventes (7 Derniers Jours)</h2>
              <SimpleBarChart last7Days={last7Days} />
            </div>
            <div className="bg-background rounded-lg p-6 shadow-md">
              <h2 className="mb-6 text-third font-semibold">Répartition Modes de Paiement</h2>
              <SimplePieChart data={percentagesArray} />
            </div>
          </div>

          <div className="bg-background rounded-lg p-6 shadow-md">
            <TopVentes data={topProducts} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard