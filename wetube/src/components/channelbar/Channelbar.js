import "./channelbar.css";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Channelsbar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bar")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="channel" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalViews" fill="#8884d8" />
    </BarChart>
  );
};

export default Channelsbar;
