import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SimplePieChart({ data }) {
  // Transform data to recharts format
  const chartData = data.map((d) => ({
    name: `${d.label} (${d.value}%)`,
    value: Number(d.value),
    label: d.label,
  }));

  // Color palette for pie slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  // Custom label renderer
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Custom legend formatter
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: '10px 0 0 0',
        gap: '15px'
      }}>
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'var(--color-third)',
            fontSize: '14px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: entry.color,
              marginRight: '8px',
              borderRadius: '2px'
            }}></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: 'var(--color-third)'
          }}
          formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
        />
        <Legend 
          content={renderLegend}
          verticalAlign="bottom"
          height={50}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}