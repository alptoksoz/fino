import { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import type { Stock } from '../data/mockData';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  initialTradeType?: 'buy' | 'sell';
  onTrade: (type: 'buy' | 'sell', orderType: 'market' | 'limit', quantity: number, price?: number) => void;
}

export default function TradeModal({ isOpen, onClose, stock, initialTradeType = 'buy', onTrade }: TradeModalProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState<string>('');
  const [limitPrice, setLimitPrice] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTradeType(initialTradeType);
    }
  }, [isOpen, initialTradeType]);

  if (!isOpen || !stock) return null;

  const currentPrice = stock.price;
  const numQuantity = parseInt(quantity) || 0;
  const numLimitPrice = parseFloat(limitPrice) || currentPrice;
  const effectivePrice = orderType === 'market' ? currentPrice : numLimitPrice;
  const totalAmount = numQuantity * effectivePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numQuantity > 0) {
      onTrade(
        tradeType,
        orderType,
        numQuantity,
        orderType === 'limit' ? numLimitPrice : undefined
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setQuantity('');
    setLimitPrice('');
    setOrderType('market');
    setTradeType('buy');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">{stock.symbol}</h2>
            <p className="text-sm text-gray-400">{stock.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Trade Type Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTradeType('buy')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                tradeType === 'buy'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Al
            </button>
            <button
              type="button"
              onClick={() => setTradeType('sell')}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                tradeType === 'sell'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <TrendingDown className="w-5 h-5 inline mr-2" />
              Sat
            </button>
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Emir Tipi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('market')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  orderType === 'market'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                Piyasa
              </button>
              <button
                type="button"
                onClick={() => setOrderType('limit')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  orderType === 'limit'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                Limitli
              </button>
            </div>
          </div>

          {/* Current Price */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Güncel Fiyat</span>
              <span className="text-lg font-bold text-white">
                ₺{currentPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-400">Değişim</span>
              <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? '+' : ''}₺{Math.abs(stock.change).toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-400 mb-2">
              Miktar (Adet)
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
              required
            />
          </div>

          {/* Limit Price */}
          {orderType === 'limit' && (
            <div>
              <label htmlFor="limitPrice" className="block text-sm font-medium text-gray-400 mb-2">
                Limit Fiyat (₺)
              </label>
              <input
                id="limitPrice"
                type="number"
                step="0.01"
                min="0"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={currentPrice.toFixed(2)}
              />
            </div>
          )}

          {/* Total Amount */}
          {numQuantity > 0 && (
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Toplam Tutar</span>
                <span className="text-2xl font-bold text-white">
                  ₺{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {numQuantity} adet × ₺{effectivePrice.toFixed(2)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-lg transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={numQuantity <= 0}
              className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all ${
                tradeType === 'buy'
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none'
              }`}
            >
              {tradeType === 'buy' ? 'Al' : 'Sat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
