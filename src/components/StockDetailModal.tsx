import { X, TrendingUp, TrendingDown, Star, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Stock } from '../data/mockData';

interface StockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  onAddToWatchlist: (stock: Stock) => void;
  onTrade: (stock: Stock, type: 'buy' | 'sell') => void;
  isInWatchlist: boolean;
}

export default function StockDetailModal({
  isOpen,
  onClose,
  stock,
  onAddToWatchlist,
  onTrade,
  isInWatchlist,
}: StockDetailModalProps) {
  if (!isOpen || !stock) return null;

  const isPositive = stock.change >= 0;

  // Mock intraday data
  const intradayData = Array.from({ length: 20 }, (_, i) => {
    const variance = (Math.random() - 0.5) * 5;
    return {
      time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15}`,
      price: stock.price + variance,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{stock.symbol}</h2>
                <button
                  onClick={() => onAddToWatchlist(stock)}
                  className={`p-2 rounded-lg transition-colors ${
                    isInWatchlist
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-gray-800 text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Star className={`w-5 h-5 ${isInWatchlist ? 'fill-yellow-500' : ''}`} />
                </button>
              </div>
              <p className="text-gray-400">{stock.name}</p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-bold text-white">
                  ₺{stock.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 mb-1">
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`text-lg font-semibold ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {isPositive ? '+' : ''}₺{Math.abs(stock.change).toFixed(2)} (
                    {isPositive ? '+' : ''}
                    {stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Gün İçi Grafik</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={intradayData}>
                <XAxis
                  dataKey="time"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`₺${value.toFixed(2)}`, 'Fiyat']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? '#10B981' : '#EF4444'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Yüksek</p>
              <p className="text-lg font-semibold text-white">₺{stock.high.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Düşük</p>
              <p className="text-lg font-semibold text-white">₺{stock.low.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Hacim</p>
              <p className="text-lg font-semibold text-white">
                {(stock.volume / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Değişim</p>
              <p
                className={`text-lg font-semibold ${
                  isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {isPositive ? '+' : ''}
                {stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onTrade(stock, 'buy')}
              className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-500/30"
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Al
            </button>
            <button
              onClick={() => onTrade(stock, 'sell')}
              className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-red-500/30"
            >
              <TrendingDown className="w-5 h-5 inline mr-2" />
              Sat
            </button>
            <button className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Company Info */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-white mb-3">Şirket Bilgileri</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Sektör</span>
                <span className="text-white">Teknoloji</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Piyasa Değeri</span>
                <span className="text-white">
                  ₺{(stock.price * stock.volume * 0.001).toFixed(0)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ortalama Hacim</span>
                <span className="text-white">{(stock.volume / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
