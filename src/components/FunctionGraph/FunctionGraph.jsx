import React, { useState, useEffect } from "react";
import s from "./FunctionGraph.module.css";
import { io } from "socket.io-client";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer
} from "recharts";

export const FunctionGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:4000/")
    
    socket.on("message", (data) => {
      setData(data);
    });
  }, []);

  return (
    <div className={s.container} id="chart">
      <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={300}
        height={300}
        data={data?.slice(Math.max(data.length - 20, 1))}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3"/>
        <XAxis dataKey="x" />
        <Tooltip />
        <Line isAnimationActive={false} type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
        <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
