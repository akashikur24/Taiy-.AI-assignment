import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LegendItem,
} from "chart.js";
import { fetchHistoricalData } from "../utility/fetchHistoricalData";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineGraph: React.FC = () => {
  //api fetching using the react query
  const { data, isLoading, error } = useQuery(
    "historicalData",
    fetchHistoricalData //api
  );

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth <= 640
  );

  useEffect(() => {
    //checking the size of the window
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart</div>;
  //data's for the chart
  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Deaths",
        data: Object.values(data.deaths),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
      {
        label: "Recovered",
        data: Object.values(data.recovered),
        fill: false,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        //posistioning the label
        position: isSmallScreen ? ("top" as const) : ("right" as const),
        onClick: (e: any, legendItem: LegendItem, legend: any) => {
          const chart = legend.chart;
          const datasetIndex = legendItem.datasetIndex;

          if (datasetIndex !== undefined) {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.hidden = !meta.hidden;
            chart.update();
          }
        },
      },

      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
        beginAtZero: true,
        min: 0,
      },
    },
  };

  return (
    <div className="max-sm:w-full w-[90%] mx-auto">
      <h1 className="text-center text-xl font-semibold">Line Chart</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
