import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement } from "chart.js/auto";

export default function BarGraph({ label, data, dataName }) {
  const accent = getComputedStyle(
    document.documentElement
  ).getPropertyValue(
    "--color-accent"
  );
  const formattedData = {
    labels: data.map((data) => data.office_name),
    datasets: [
      {
        label: label,
        data: data.map((data) => data[dataName]),
        backgroundColor: [accent]
      },
    ],
  };

  return(
    <div>
      <Bar data={formattedData} />
    </div>
  );
}