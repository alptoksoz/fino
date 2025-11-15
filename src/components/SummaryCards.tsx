import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  changePercent?: number;
  icon: React.ReactNode;
}

function SummaryCard({ title, value, change, changePercent, icon }: SummaryCardProps) {
  const isPositive = changePercent !== undefined ? changePercent >= 0 : true;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
          {change && changePercent !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change} ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface SummaryCardsProps {
  totalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercent: number;
  dailyChange: number;
  dailyChangePercent: number;
  cash: number;
  totalAssets: number;
}

export default function SummaryCards({
  totalValue,
  totalProfitLoss,
  totalProfitLossPercent,
  dailyChange,
  dailyChangePercent,
  cash,
  totalAssets,
}: SummaryCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Toplam Portföy Değeri"
        value={formatCurrency(totalValue)}
        change={formatCurrency(dailyChange)}
        changePercent={dailyChangePercent}
        icon={<DollarSign className="w-6 h-6 text-green-500" />}
      />
      <SummaryCard
        title="Toplam Kar/Zarar"
        value={formatCurrency(totalProfitLoss)}
        change={formatCurrency(totalProfitLoss)}
        changePercent={totalProfitLossPercent}
        icon={<TrendingUp className="w-6 h-6 text-green-500" />}
      />
      <SummaryCard
        title="Nakit"
        value={formatCurrency(cash)}
        icon={<Wallet className="w-6 h-6 text-blue-500" />}
      />
      <SummaryCard
        title="Toplam Varlık"
        value={formatCurrency(totalAssets)}
        icon={<DollarSign className="w-6 h-6 text-blue-500" />}
      />
    </div>
  );
}
