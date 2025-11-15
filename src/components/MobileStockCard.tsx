import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import type { Stock } from '../data/mockData';

interface MobileStockCardProps {
  stock: Stock;
  onTrade: (stock: Stock, type: 'buy' | 'sell') => void;
  onStockClick: (stock: Stock) => void;
  onWatchlistToggle: (stock: Stock) => void;
  isInWatchlist: boolean;
}

export default function MobileStockCard({
  stock,
  onTrade,
  onStockClick,
  onWatchlistToggle,
  isInWatchlist,
}: MobileStockCardProps) {
  const isPositive = stock.change >= 0;

  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 active:bg-gray-800/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div
          onClick={() => onStockClick(stock)}
          className="flex-1 cursor-pointer active:opacity-70"
        >
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">{stock.symbol}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWatchlistToggle(stock);
              }}
              className="p-1"
            >
              <Star
                className={`w-4 h-4 ${
                  isInWatchlist
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-600'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-400">{stock.name}</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-white">
            ₺{stock.price.toFixed(2)}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isPositive ? '+' : ''}
              {stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-gray-400 mb-0.5">Yüksek</p>
          <p className="text-white font-semibold">₺{stock.high.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-gray-400 mb-0.5">Düşük</p>
          <p className="text-white font-semibold">₺{stock.low.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2">
          <p className="text-gray-400 mb-0.5">Hacim</p>
          <p className="text-white font-semibold">
            {(stock.volume / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onTrade(stock, 'buy')}
          className="py-2.5 bg-green-500/10 active:bg-green-500/20 text-green-500 font-semibold rounded-lg transition-colors"
        >
          Al
        </button>
        <button
          onClick={() => onTrade(stock, 'sell')}
          className="py-2.5 bg-red-500/10 active:bg-red-500/20 text-red-500 font-semibold rounded-lg transition-colors"
        >
          Sat
        </button>
      </div>
    </div>
  );
}
