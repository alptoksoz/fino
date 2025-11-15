import { useState } from 'react';
import Header from './Header';
import SummaryCards from './SummaryCards';
import PortfolioChart from './PortfolioChart';
import PortfolioTable from './PortfolioTable';
import StocksTable from './StocksTable';
import TradeModal from './TradeModal';
import Toast from './Toast';
import { portfolioSummary, portfolioChartData, portfolioData, bist100Stocks } from '../data/mockData';
import type { Stock } from '../data/mockData';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [initialTradeType, setInitialTradeType] = useState<'buy' | 'sell'>('buy');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleTradeClick = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock);
    setInitialTradeType(type);
    setIsModalOpen(true);
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
    setIsModalOpen(false);
  };

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

        {/* Chart and Portfolio */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioChart data={portfolioChartData} />
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
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Nakit Oran</span>
                <span className="text-sm font-semibold text-white">
                  %{((portfolioSummary.cash / portfolioSummary.totalAssets) * 100).toFixed(1)}
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
            stocks={bist100Stocks}
            title="BIST 100 Hisseleri"
            onTradeClick={handleTradeClick}
          />
        </div>
      </main>

      {/* Trade Modal */}
      <TradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={selectedStock}
        initialTradeType={initialTradeType}
        onTrade={handleTrade}
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
