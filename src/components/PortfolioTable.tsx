import { TrendingUp, TrendingDown } from 'lucide-react';
import type { PortfolioItem } from '../data/mockData';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
}

export default function PortfolioTable({ portfolio }: PortfolioTableProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('tr-TR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Portföyüm</h2>
        <p className="text-sm text-gray-400 mt-1">Elinizdeki hisseler ve performans</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Hisse
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Adet
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ort. Fiyat
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Güncel Fiyat
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Toplam Değer
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Kar/Zarar
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {portfolio.map((item) => {
              const isProfit = item.profitLoss >= 0;
              return (
                <tr
                  key={item.stock.symbol}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {item.stock.symbol}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.stock.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-300">
                      {item.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-400">
                      ₺{formatPrice(item.avgPrice)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-white">
                      ₺{formatPrice(item.stock.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-semibold text-white">
                      ₺{formatCurrency(item.totalValue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className={`text-sm font-medium ${
                        isProfit ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {isProfit ? '+' : ''}₺{formatCurrency(Math.abs(item.profitLoss))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {isProfit ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          isProfit ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isProfit ? '+' : ''}{item.profitLossPercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
