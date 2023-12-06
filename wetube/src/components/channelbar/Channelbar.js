import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ChannelsBar = () => {
  const [data, setData] = useState([]);
  const storedUser = sessionStorage.getItem("currentUser");
  const Udata = JSON.parse(storedUser);
  const user = Udata.user;

  useEffect(() => {
    fetch(`http://35.239.242.245:8080/bar/${user.id}/countRegionVideos`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) =>
        setData(
          data.map((item) => ({
            ...item,
            totalViews: parseInt(item.totalViews, 10), // Convert string to number
          }))
        )
      )
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // Formatter for large numbers
  const formatNumber = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return number.toString();
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`${label} : ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="60%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="channelTitle"
          angle={-30}
          textAnchor="end"
          height={100}
          stroke="#a0aec0"
        />{" "}
        {/* Darker text for better contrast */}
        <YAxis tickFormatter={formatNumber} stroke="#a0aec0" />{" "}
        {/* Darker text for better contrast */}
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: "#a0aec0" }} />{" "}
        {/* Darker legend text for better contrast */}
        <Bar dataKey="totalViews" fill="#4e79a7" />{" "}
        {/* Changed bar color to a more contrasting color */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChannelsBar;
