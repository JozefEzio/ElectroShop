import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleBarChart({ last7Days }) {
    const xLabels = last7Days.map(d => d.date)
    const pData = last7Days.map(m => m.montant);
    return (
        <Box sx={{ width: '100%', height: 350 }}>
            <BarChart
                series={[
                    {
                        data: pData,
                        label: 'CA des 7 derniers jours',
                        id: 'pvId',
                        color: 'var(--color-btn)', 
                    },
                ]}
                xAxis={[{
                    scaleType: 'band',
                    data: xLabels,
                    tickLabelStyle: {
                        fill: 'var(--color-third)', 
                        fontSize: 14,
                    },
                    axisLineStyle: {
                        stroke: 'var(--color-third)', 
                    },
                }]}

                yAxis={[{
                    width: 100,
                    label: 'Revenu (DH)',
                    labelStyle: { fill: 'var(--color-third)' }, 
                    tickLabelStyle: { fill: 'var(--color-third)' },
                    axisLineStyle: { stroke: 'var(--color-third)' }, 
                    gridLineStyle: { stroke: 'var(--color-third)' },  
                }]}

                margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
            />


        </Box>
    );
}