import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PortfolioItem } from '../data/mockData';

interface PortfolioDistributionProps {
  portfolio: PortfolioItem[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function PortfolioDistribution({ portfolio }: PortfolioDistributionProps) {
  const data = portfolio.map((item, index) => ({
    name: item.stock.symbol,
    value: item.totalValue,
    color: COLORS[index % COLORS.length],
  }));

  const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{item.name}</p>
          <p className="text-gray-300 text-sm">
            ₺{item.value.toLocaleString('tr-TR')}
          </p>
          <p className="text-blue-400 text-sm">%{percentage}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-1">Portföy Dağılımı</h2>
        <p className="text-sm text-gray-400">Hisselere göre dağılım</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => {
          const percentage = ((item.value / totalValue) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-white">{item.name}</span>
                  <span className="text-xs text-gray-400">%{percentage}</span>
                </div>
                <div className="text-xs text-gray-500">
                  ₺{item.value.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
