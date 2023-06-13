import React, { useState, useEffect } from "react";
import s from "./FunctionGraph.module.css";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  ResponsiveContainer
} from "recharts";

export const FunctionGraph = () => {

  const [data, setData] = useState([{x: 1, y: 2},{x: 2, y: 10}]);

  useEffect(() => {
    let ax = 2
    setInterval(()=>{
      ax++
      setData(prev => [...prev, {x: ax, y: Math.random()*10}])
    }, 1000)
  }, []);

  

  return (
    <div className={s.container} id="chart">
      <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={300}
        height={300}
        data={data?.slice(Math.max(data.length - 20, 0))}
      >
        <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3"/>
        <XAxis dataKey="x" />
        <Tooltip />
        <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
