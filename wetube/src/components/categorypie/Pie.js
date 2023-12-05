import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./pie.css"; // Assuming you have some CSS here
import getCategoryName from "../../GetCategory";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const VideoCategoryPieChart = () => {
  const [data, setData] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 300 }); // Default height
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width) {
        setDimensions({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.width, // You can make the height proportional as needed
        });
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    // Fetch the data from the backend using fetch API
    fetch("http://localhost:8080/pie")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const totalViews = data.reduce(
          (sum, item) => sum + parseInt(item.totalViews, 10),
          0
        );
        // Transform data to include category names and percentages
        const transformedData = data.map((item) => ({
          name: getCategoryName(parseInt(item.videoCategory, 10)),
          value: parseInt(item.totalViews, 10),
          percentage: (
            (parseInt(item.totalViews, 10) / totalViews) *
            100
          ).toFixed(2),
        }));
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    // Clean up observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="pie-chart-wrapper" ref={chartContainerRef}>
      <PieChart width={dimensions.width} height={dimensions.height}>
        <Pie
          data={data}
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          labelLine={false}
          outerRadius={dimensions.width / 4}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${percent}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) =>
            `${props.payload.name}: ${props.payload.percentage}%`
          }
        />
        <Legend />
      </PieChart>
    </div>
  );
};

export default VideoCategoryPieChart;
