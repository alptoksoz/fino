import { useState, useEffect, useCallback } from 'react';
import type { Stock } from '../data/mockData';

export function useLivePrices(initialStocks: Stock[], enabled: boolean = true) {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  const updatePrices = useCallback(() => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        // Random price change between -0.5% and +0.5%
        const changePercent = (Math.random() - 0.5) * 1;
        const priceChange = stock.price * (changePercent / 100);
        const newPrice = Math.max(0.01, stock.price + priceChange);

        // Update change and changePercent
        const oldPrice = stock.price - stock.change;
        const newChange = newPrice - oldPrice;
        const newChangePercent = (newChange / oldPrice) * 100;

        // Update high and low
        const newHigh = Math.max(stock.high, newPrice);
        const newLow = Math.min(stock.low, newPrice);

        return {
          ...stock,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          high: newHigh,
          low: newLow,
        };
      })
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Update prices every 3 seconds
    const interval = setInterval(updatePrices, 3000);

    return () => clearInterval(interval);
  }, [enabled, updatePrices]);

  return stocks;
}
