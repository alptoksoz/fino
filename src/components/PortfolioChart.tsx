import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../data/mockData';

interface PortfolioChartProps {
  data: ChartDataPoint[];
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-1">Portföy Performansı</h2>
        <p className="text-sm text-gray-400">Son 30 günlük performans grafiği</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6',
            }}
            formatter={(value: number) => [
              `₺${value.toLocaleString('tr-TR')}`,
              'Değer',
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
