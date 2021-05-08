import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
const options = {
  chart: {
    type: "spline",
  },
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
  ],
};
export function MapComponent() {
  return (
    <div className="map-component">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
