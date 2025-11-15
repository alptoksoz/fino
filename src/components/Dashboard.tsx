import { useState } from 'react';
import Header from './Header';
import SummaryCards from './SummaryCards';
import PortfolioChart from './PortfolioChart';
import PortfolioDistribution from './PortfolioDistribution';
import PortfolioTable from './PortfolioTable';
import StocksTable from './StocksTable';
import Watchlist from './Watchlist';
import TradeModal from './TradeModal';
import StockDetailModal from './StockDetailModal';
import Toast from './Toast';
import { portfolioSummary, portfolioChartData, portfolioData, bist100Stocks } from '../data/mockData';
import { useLivePrices } from '../hooks/useLivePrices';
import type { Stock } from '../data/mockData';

export default function Dashboard() {
  // Live prices
  const liveStocks = useLivePrices(bist100Stocks, true);

  // Trade modal state
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [initialTradeType, setInitialTradeType] = useState<'buy' | 'sell'>('buy');

  // Stock detail modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailStock, setDetailStock] = useState<Stock | null>(null);

  // Watchlist state
  const [watchlist, setWatchlist] = useState<string[]>(['THYAO', 'ASELS', 'GARAN']);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleTradeClick = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setInitialTradeType(type);
    setIsTradeModalOpen(true);
    setIsDetailModalOpen(false);
  };

  const handleTrade = (
    type: 'buy' | 'sell',
    orderType: 'market' | 'limit',
    quantity: number,
    price?: number
  ) => {
    const action = type === 'buy' ? 'Alış' : 'Satış';
    const orderTypeText = orderType === 'market' ? 'Piyasa' : 'Limitli';
    const priceText = price ? ` ₺${price.toFixed(2)} fiyatından` : '';

    setToastMessage(
      `${action} emri başarıyla oluşturuldu! ${quantity} adet ${selectedStock?.symbol}${priceText} (${orderTypeText})`
    );
    setShowToast(true);
    setIsTradeModalOpen(false);
  };

  const handleStockClick = (stock: Stock) => {
    setDetailStock(stock);
    setIsDetailModalOpen(true);
  };

  const handleWatchlistToggle = (stock: Stock) => {
    setWatchlist((prev) => {
      if (prev.includes(stock.symbol)) {
        setToastMessage(`${stock.symbol} izleme listesinden çıkarıldı`);
        setShowToast(true);
        return prev.filter((s) => s !== stock.symbol);
      } else {
        setToastMessage(`${stock.symbol} izleme listesine eklendi`);
        setShowToast(true);
        return [...prev, stock.symbol];
      }
    });
  };

  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
    setToastMessage(`${symbol} izleme listesinden çıkarıldı`);
    setShowToast(true);
  };

  const watchlistStocks = liveStocks.filter((stock) => watchlist.includes(stock.symbol));

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <SummaryCards
          totalValue={portfolioSummary.totalValue}
          totalProfitLoss={portfolioSummary.totalProfitLoss}
          totalProfitLossPercent={portfolioSummary.totalProfitLossPercent}
          dailyChange={portfolioSummary.dailyChange}
          dailyChangePercent={portfolioSummary.dailyChangePercent}
          cash={portfolioSummary.cash}
          totalAssets={portfolioSummary.totalAssets}
        />

        {/* Charts Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance Chart */}
          <div className="lg:col-span-2">
            <PortfolioChart data={portfolioChartData} />
          </div>

          {/* Portfolio Distribution */}
          <div>
            <PortfolioDistribution portfolio={portfolioData} />
          </div>
        </div>

        {/* Watchlist and Quick Stats */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Watchlist */}
          <div className="lg:col-span-2">
            <Watchlist
              stocks={watchlistStocks}
              onRemove={handleRemoveFromWatchlist}
              onStockClick={handleStockClick}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Hızlı Özet</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Günlük Kazanç</span>
                <span className="text-sm font-semibold text-green-500">
                  +₺{portfolioSummary.dailyChange.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Portföy Getiri</span>
                <span className="text-sm font-semibold text-green-500">
                  %{portfolioSummary.totalProfitLossPercent.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Toplam Maliyet</span>
                <span className="text-sm font-semibold text-white">
                  ₺{portfolioSummary.totalCost.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-sm text-gray-400">Nakit Oran</span>
                <span className="text-sm font-semibold text-white">
                  %{((portfolioSummary.cash / portfolioSummary.totalAssets) * 100).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">İzlenen Hisse</span>
                <span className="text-sm font-semibold text-white">
                  {watchlist.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="mt-8">
          <PortfolioTable portfolio={portfolioData} />
        </div>

        {/* BIST100 Stocks */}
        <div className="mt-8">
          <StocksTable
            stocks={liveStocks}
            title="BIST 100 Hisseleri"
            onTradeClick={handleTradeClick}
            onStockClick={handleStockClick}
            onWatchlistToggle={handleWatchlistToggle}
            watchlist={watchlist}
          />
        </div>
      </main>

      {/* Trade Modal */}
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        stock={selectedStock}
        initialTradeType={initialTradeType}
        onTrade={handleTrade}
      />

      {/* Stock Detail Modal */}
      <StockDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        stock={detailStock}
        onAddToWatchlist={handleWatchlistToggle}
        onTrade={handleTradeClick}
        isInWatchlist={detailStock ? watchlist.includes(detailStock.symbol) : false}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
