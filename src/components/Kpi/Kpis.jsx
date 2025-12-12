import React, { useEffect, useState } from 'react'
import Kpi from './Kpi'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const Kpis = ({ data }) => {
    const [kpiData, setKpiData] = useState([]);
    const montantTotal = (quantity, price) => price * quantity


    const caJour = (data) => {
        const jourD = new Date().toISOString().split('T')[0];
        const dailySales = data.filter(v => v.date === jourD);
        const dailyRevenu = dailySales.length !== 0 ? dailySales.reduce((sum, vente) => sum + montantTotal(vente.quantite, vente.prixUnitaire), 0) : 0
        return { icon: AttachMoneyIcon, title: 'CA du Jour', revenue: dailyRevenu, ventes: dailySales, color: 'green-600' }
    }
    const caMois = (data) => {
        const currentMonth = new Date().toISOString().slice(0, 7)
        const monthlySales = data.filter(v => v.date.startsWith(currentMonth))
        const monthlyRevenu = monthlySales.length !== 0 ? monthlySales.reduce((sum, vente) => sum + montantTotal(vente.quantite, vente.prixUnitaire), 0) : 0
        return { icon: CallMissedOutgoingIcon, title: 'CA du Mois', revenue: monthlyRevenu, ventes: monthlySales, color: 'blue-600' }

    }

    const caTotal = (data) => {
        const totalSales = data.length;
        const totalRevenu = totalSales !== 0 ? data.reduce((sum, vente) => sum + montantTotal(vente.quantite, vente.prixUnitaire), 0) : 0
        return { icon: ShoppingBagOutlinedIcon, title: 'CA Total', revenue: totalRevenu, ventes: data, color: 'purple-600' }
    }
    const caMoyen = (data) => {
        const moyenSales = data.length;
        const moyenRevenu = moyenSales !== 0 ? data.reduce((sum, vente) => sum + montantTotal(vente.quantite, vente.prixUnitaire), 0) / moyenSales : 0
        return { icon: CreditCardOutlinedIcon, title: 'Panier Moyen', revenue: moyenRevenu, ventes: data, color: 'orange-600' }
    }
    useEffect(() => {
        if (data && data.length > 0) {
            const dailyKpi = caJour(data);
            const monthlyKpi = caMois(data)
            const totalKpi = caTotal(data)
            const moyenKpi = caMoyen(data)
            setKpiData([dailyKpi, monthlyKpi, totalKpi, moyenKpi]);
        }
    }, [data]);


    return (
        <>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {kpiData.map((kpi, index) => (
                    <Kpi icon={kpi.icon} title={kpi.title} revenue={kpi.revenue} ventes={kpi.ventes} color={kpi.color} />

                ))}
            </div>
        </>
    )
}

export default Kpis