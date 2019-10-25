import React from 'react';
import Chart from 'react-apexcharts';
import { formatDateTime } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const StockChart = ({ stock }) => {
  const { state } = getStateWithDispatcher();
  const chartId = `stock-chart-${stock.id}`;
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
    stock.history.forEach(item => {
      dataPoints.push({
        x: formatDateTime(item.createdAt, 'y-LL-dd HH:mm:ss'),
        y: item.price_new,
      });
    });

    dataPoints.length &&
      dataPoints.push({
        x: 'now',
        y: stock.price,
      });

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
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      width="100%"
      height="320px"
    />
  );
};

export default StockChart;
