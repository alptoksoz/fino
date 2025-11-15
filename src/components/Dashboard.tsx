import Header from './Header';
import SummaryCards from './SummaryCards';
import PortfolioChart from './PortfolioChart';
import PortfolioTable from './PortfolioTable';
import StocksTable from './StocksTable';
import { portfolioSummary, portfolioChartData, portfolioData, bist100Stocks } from '../data/mockData';

export default function Dashboard() {
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
          <StocksTable stocks={bist100Stocks} title="BIST 100 Hisseleri" />
        </div>
      </main>
    </div>
  );
}
