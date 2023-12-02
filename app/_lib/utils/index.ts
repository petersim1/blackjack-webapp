import { InferenceSession } from "onnxruntime-web";
import * as d3 from "d3";

import { nameColors } from "../constants";

/*
  @param card is a tuple of cardNum and Suit
*/
export const getImgUrl = (card: [number | string, string]): string => {
  const [cardVal, suit] = card;
  if (suit === "Hidden") {
    return "/images/back.png";
  }
  return "/images/" + String(cardVal) + suit + ".png";
};

export const spawnOrtSession = async (): Promise<InferenceSession> => {
  const session = await InferenceSession.create("/model/deep_q.onnx", {
    executionProviders: ["webgl"],
  });

  return session;
};

interface DataI {
  move: string;
  value: number;
}

export const createViz = (
  plotHolder: d3.Selection<null, unknown, null, undefined>,
  data: DataI[],
  moves: string[],
): void => {
  const plottingProps = {
    width: 300,
    height: 300,
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  const x = d3
    .scaleBand()
    .range([plottingProps.margin.left, plottingProps.width - plottingProps.margin.right])
    .domain(moves)
    .padding(0.3);
  const y = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([plottingProps.height - plottingProps.margin.bottom, plottingProps.margin.top]);

  const svg = plotHolder
    .append("svg")
    .attr("viewBox", [0, 0, plottingProps.width, plottingProps.height])
    .style("max-height", "100%")
    .style("max-width", "100%");

  svg
    .append("line")
    .style("stroke", "grey")
    .attr("x1", plottingProps.margin.left)
    .attr("y1", plottingProps.height / 2)
    .attr("x2", plottingProps.width - plottingProps.margin.right)
    .attr("y2", plottingProps.height / 2);

  const getY = (d: DataI): number => {
    const val = d.value < 0 ? y(0) : y(d.value);
    return val;
  };
  const getH = (d: DataI): number => {
    const val = Math.min(1, Math.max(-1, d.value));
    return val < 0 ? y(val) - y(0) : y(0) - y(val);
  };

  svg
    .selectAll("bar-chart")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.move)!)
    .attr("y", getY)
    .attr("height", getH)
    .attr("width", x.bandwidth())
    .attr("fill", (d) => nameColors[d.move as keyof typeof nameColors]);
};
