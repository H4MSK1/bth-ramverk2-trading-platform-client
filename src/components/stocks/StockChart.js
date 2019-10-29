import React from 'react';
import { DateTime } from 'luxon';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { roundNumber, numberDiffPercentage } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const StockChart = ({ stock }) => {
  const { state } = getStateWithDispatcher();
  const [stockDiff, setStockDiff] = React.useState({});
  const [dataPoints, setDataPoints] = React.useState([
    {
      x: 'now',
      y: stock.price,
    },
  ]);

  React.useEffect(() => {
    if (!stock || !stock.history) {
      return;
    }

    if (stock.history.length) {
      let data = [];
      const history = stock.history.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      const { price_old, price_new } = history[history.length - 1];
      setStockDiff({
        previous: price_old,
        current: price_new,
        diff: roundNumber(price_new - price_old),
        diffPercentage: roundNumber(numberDiffPercentage(price_new, price_old)),
      });

      history.forEach(item => {
        data.push({
          x: item.createdAt,
          y: item.price_new,
        });
      });

      data[data.length - 1].x = 'now';
      setDataPoints(data);
    }
  }, [stock.history]);

  return (
    <>
      {Object.keys(stockDiff).length && (
        <h6>
          <b>
            ({state.currency}) {stockDiff.current}{' '}
            <span style={{ color: stockDiff.diff < 1 ? 'red' : 'green' }}>
              {stockDiff.diff} ({stockDiff.diffPercentage}%)
            </span>
          </b>
        </h6>
      )}
      <ResponsiveContainer height={300}>
        <AreaChart data={dataPoints}>
          <defs>
            <linearGradient
              id={`color-${stock.id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#384fc5" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#384fc5" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            tickFormatter={date =>
              (date !== 'now' && DateTime.fromISO(date).toFormat('HH:mm')) ||
              date
            }
          />
          <YAxis type="number" />
          <Tooltip
            formatter={value => `${value} ${state.currencySymbol}`}
            labelFormatter={date =>
              (date !== 'now' &&
                DateTime.fromISO(date).toFormat('y-LL-dd HH:mm:ss')) ||
              date
            }
          />
          <Area
            type="linear"
            dataKey="y"
            name="Stock Price"
            stroke="#384fc5"
            fillOpacity={1}
            strokeWidth={1}
            animationEasing="linear"
            animationDuration={800}
            fill={`url(#color-${stock.id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default StockChart;
