import { Star, TrendingUp, TrendingDown, X } from 'lucide-react';
import type { Stock } from '../data/mockData';

interface WatchlistProps {
  stocks: Stock[];
  onRemove: (symbol: string) => void;
  onStockClick: (stock: Stock) => void;
}

export default function Watchlist({ stocks, onRemove, onStockClick }: WatchlistProps) {
  if (stocks.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <h2 className="text-lg font-semibold text-white">İzleme Listesi</h2>
        </div>
        <div className="text-center py-8">
          <Star className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">İzleme listeniz boş</p>
          <p className="text-gray-500 text-xs mt-1">Hisseleri favorilerinize ekleyin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h2 className="text-lg font-semibold text-white">İzleme Listesi</h2>
        <span className="ml-auto text-xs text-gray-500">{stocks.length} hisse</span>
      </div>

      <div className="space-y-2">
        {stocks.map((stock) => {
          const isPositive = stock.change >= 0;
          return (
            <div
              key={stock.symbol}
              className="flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group"
              onClick={() => onStockClick(stock)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{stock.symbol}</span>
                  <span className="text-sm font-medium text-white">
                    ₺{stock.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{stock.name}</span>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(stock.symbol);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
