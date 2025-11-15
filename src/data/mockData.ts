export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}

export interface PortfolioItem {
  stock: Stock;
  quantity: number;
  avgPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

// BIST100 popüler hisseler
export const bist100Stocks: Stock[] = [
  {
    symbol: "THYAO",
    name: "Türk Hava Yolları",
    price: 285.50,
    change: 8.25,
    changePercent: 2.98,
    volume: 12500000,
    high: 287.00,
    low: 277.25,
  },
  {
    symbol: "ASELS",
    name: "Aselsan",
    price: 156.80,
    change: -2.40,
    changePercent: -1.51,
    volume: 8900000,
    high: 160.50,
    low: 155.75,
  },
  {
    symbol: "SISE",
    name: "Şişe Cam",
    price: 74.25,
    change: 1.15,
    changePercent: 1.57,
    volume: 15200000,
    high: 75.00,
    low: 73.10,
  },
  {
    symbol: "EREGL",
    name: "Ereğli Demir Çelik",
    price: 45.88,
    change: -0.82,
    changePercent: -1.76,
    volume: 22100000,
    high: 46.90,
    low: 45.50,
  },
  {
    symbol: "AKBNK",
    name: "Akbank",
    price: 62.35,
    change: 1.75,
    changePercent: 2.89,
    volume: 45600000,
    high: 62.80,
    low: 60.50,
  },
  {
    symbol: "GARAN",
    name: "Garanti BBVA",
    price: 118.40,
    change: 3.20,
    changePercent: 2.78,
    volume: 28900000,
    high: 119.00,
    low: 115.20,
  },
  {
    symbol: "ISCTR",
    name: "İş Bankası (C)",
    price: 15.82,
    change: -0.18,
    changePercent: -1.13,
    volume: 38700000,
    high: 16.05,
    low: 15.75,
  },
  {
    symbol: "PETKM",
    name: "Petkim",
    price: 8.94,
    change: 0.24,
    changePercent: 2.76,
    volume: 18500000,
    high: 9.05,
    low: 8.70,
  },
  {
    symbol: "KCHOL",
    name: "Koç Holding",
    price: 178.50,
    change: -4.50,
    changePercent: -2.46,
    volume: 9800000,
    high: 183.00,
    low: 177.25,
  },
  {
    symbol: "SAHOL",
    name: "Sabancı Holding",
    price: 89.15,
    change: 2.35,
    changePercent: 2.71,
    volume: 12300000,
    high: 89.75,
    low: 86.80,
  },
  {
    symbol: "TUPRS",
    name: "Tüpraş",
    price: 182.60,
    change: 5.80,
    changePercent: 3.28,
    volume: 7600000,
    high: 183.50,
    low: 176.80,
  },
  {
    symbol: "BIMAS",
    name: "BIM",
    price: 468.00,
    change: -8.50,
    changePercent: -1.78,
    volume: 3200000,
    high: 476.50,
    low: 465.00,
  },
];

// Portfolio mock data
export const portfolioData: PortfolioItem[] = [
  {
    stock: bist100Stocks[0], // THYAO
    quantity: 500,
    avgPrice: 265.00,
    totalValue: 142750,
    profitLoss: 10250,
    profitLossPercent: 7.74,
  },
  {
    stock: bist100Stocks[4], // AKBNK
    quantity: 1000,
    avgPrice: 58.50,
    totalValue: 62350,
    profitLoss: 3850,
    profitLossPercent: 6.58,
  },
  {
    stock: bist100Stocks[5], // GARAN
    quantity: 300,
    avgPrice: 110.00,
    totalValue: 35520,
    profitLoss: 2520,
    profitLossPercent: 7.64,
  },
  {
    stock: bist100Stocks[10], // TUPRS
    quantity: 200,
    avgPrice: 170.00,
    totalValue: 36520,
    profitLoss: 2520,
    profitLossPercent: 7.41,
  },
];

// Portfolio değer grafiği için mock data (son 30 gün)
export const portfolioChartData: ChartDataPoint[] = [
  { time: "01 Eki", value: 245000 },
  { time: "02 Eki", value: 247500 },
  { time: "03 Eki", value: 246800 },
  { time: "04 Eki", value: 249200 },
  { time: "05 Eki", value: 251000 },
  { time: "08 Eki", value: 253500 },
  { time: "09 Eki", value: 252800 },
  { time: "10 Eki", value: 255400 },
  { time: "11 Eki", value: 257200 },
  { time: "12 Eki", value: 259800 },
  { time: "15 Eki", value: 258500 },
  { time: "16 Eki", value: 261200 },
  { time: "17 Eki", value: 263000 },
  { time: "18 Eki", value: 265400 },
  { time: "19 Eki", value: 264100 },
  { time: "22 Eki", value: 267300 },
  { time: "23 Eki", value: 269500 },
  { time: "24 Eki", value: 271800 },
  { time: "25 Eki", value: 270200 },
  { time: "26 Eki", value: 273600 },
  { time: "29 Eki", value: 275400 },
  { time: "30 Eki", value: 277140 },
];

// Genel özet verileri
export const portfolioSummary = {
  totalValue: 277140,
  totalCost: 258000,
  totalProfitLoss: 19140,
  totalProfitLossPercent: 7.42,
  dailyChange: 4280,
  dailyChangePercent: 1.57,
  cash: 48650,
  totalAssets: 325790,
};
