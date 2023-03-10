import React from 'react'
import s from './FunctionGraph.module.css'
import functionPlot from 'function-plot'

export const FunctionGraph = () => {
  const coordinates = [
    [1, 1],
    [2, 2],
    [4, 1],
  ];

  functionPlot({
    target: "#funplot",
    width: 300,
    height: 300,
    grid: true,
    data: [
      {
        points: coordinates,
        fnType: "points",
        graphType: "polyline",
      },
    ],
  });

  return <div className={s.container} id="funplot"></div>;
}