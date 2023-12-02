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

export const createViz = (
  plotHolder: d3.Selection<null, unknown, null, undefined>,
  data: (number | undefined)[],
  moves: string[],
): void => {
  console.log(data);
  const plottingProps = {
    width: 1000,
    height: 1000,
    margin: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
  };

  const dataObj: { move: string; value: number }[] = [];
  data.forEach((d, i) => {
    if (d !== undefined) {
      dataObj.push({ move: moves[i], value: d! });
    }
  });

  const x = d3
    .scaleBand()
    .range([plottingProps.margin.left, plottingProps.width - plottingProps.margin.right])
    .domain(moves)
    .padding(0.2);
  const y = d3
    .scaleLinear()
    .domain([-1, 1])
    .range([plottingProps.height - plottingProps.margin.bottom, plottingProps.margin.top]);

  const svg = plotHolder
    .append("svg")
    .attr("viewBox", [0, 0, plottingProps.width, plottingProps.height])
    .style("max-height", "100%")
    .style("max-width", "100%");

  // svg
  //   .append("line")
  //   .style("stroke", "grey")
  //   .attr("x1", x("stay"))
  //   .attr("y1", 0)
  //   .attr("x2", x(moves.length))
  //   .attr("y2", 0);

  svg
    .selectAll("bar-chart")
    .data(dataObj)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.move))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => plottingProps.height - y(d.value))
    .attr("width", x.bandwidth())
    .attr("fill", (d) => nameColors[d.move as keyof typeof nameColors]);
};
