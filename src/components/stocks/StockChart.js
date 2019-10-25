import React from 'react';
import Chart from 'react-apexcharts';
import { formatDateTime, roundNumber, numberDiffPercentage } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const StockChart = ({ stock }) => {
  const { state } = getStateWithDispatcher();
  const chartId = `stock-chart-${stock.id}`;
  const [stockDiff, setStockDiff] = React.useState({});
  const [chartData] = React.useState({
    options: {
      chart: {
        id: chartId,
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#384fc5'],
      stroke: {
        width: 2,
        curve: 'straight',
      },
      yaxis: {
        title: {
          text: `Stock Prices (${state.currency})`,
        },
      },
      xaxis: {
        type: 'time',
        tooltip: {
          enabled: false,
        },
      },
      tooltip: {
        style: { fontSize: 14 },
      },
    },
    series: [
      {
        name: 'Stock price',
        data: [],
      },
    ],
  });

  React.useEffect(() => {
    if (!stock || !stock.history) {
      return;
    }

    let dataPoints = [];
    if (stock.history.length) {
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

      history.slice(-6).forEach(item => {
        dataPoints.push({
          x: formatDateTime(item.createdAt),
          y: item.price_new,
        });
      });

      dataPoints[dataPoints.length - 1].x = 'now';
    }

    window.ApexCharts.exec(chartId, 'updateSeries', [
      {
        data: dataPoints,
      },
    ]);
  }, [stock, stock.history]);

  React.useEffect(() => {
    window.ApexCharts.exec(chartId, 'updateOptions', {
      tooltip: {
        y: {
          formatter: val => `${val} ${state.currencySymbol}`,
        },
      },
      yaxis: {
        title: {
          text: `Stock Prices (${state.currency})`,
        },
      },
    });
  }, [state.currency, state.currencySymbol]);

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
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width="100%"
        height="320px"
      />
    </>
  );
};

export default StockChart;
