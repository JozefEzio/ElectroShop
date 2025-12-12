import { PieChart } from '@mui/x-charts/PieChart';

export default function SimplePieChart({ data }) {
    return (
        <PieChart
            series={[
                {
                    data: data.map((d) => ({
                        value: Number(d.value),
                        label: `${d.label} (${d.value}%)`,
                    })),
                    labelStyle: {fontSize: 54, fill: 'var(--color-third)' }, 
                },
            ]}
            width={400}
            height={300}
            slotProps={{
                legend: {
                    position: 'bottom',
                    direction: 'row',
                    labelStyle: { fontSize: 54, fill: 'var(--color-third)' }, 
                },
            }}
        />
        )
}
