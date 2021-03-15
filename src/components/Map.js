  import React, { useEffect, useRef, useState } from "react";
  import * as d3 from "d3";
  import { connect } from "react-redux";
  import useResizeObserver from "./useResizeObserver";
  import { color } from "d3";
  const data = require("../json/world.geo.json");

  function Map(props) {
    const { countryDataResponse } = props;
    const wrapperRef = useRef();
    const svgref = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedCountry, setSelectedCountry] = useState();
    useEffect(() => {
      const svg = d3.select(svgref.current);
      svg.exit().remove();

      if (!countryDataResponse) return;
      draw();
    }, [data, dimensions, countryDataResponse, selectedCountry]);

    const draw = () => {
      
      const svg = d3.select(svgref.current);
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();
      const projection = d3.geoMercator().fitSize([width, height], data); //projects geo-coordinates on a 2d plane
      const pathGenerator = d3.geoPath().projection(projection); //transform them into d attributes of a path element
      const max = d3.max(countryDataResponse.data, (d) => d.confirmed);
      const min = d3.min(countryDataResponse.data, (d) => d.confirmed);

      var div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("border-radius", 10)
        .style("opacity", 0)
        .style("height", 100)
        .style("width", 500);

      const colorScale = d3
        .scaleLinear()
        .domain([min, max])
        .range(["#ccc", "red"]);
      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        
        .attr("class", "country")
        .attr("d", (feature) => {
          return pathGenerator(feature);
        })
        .transition()
        .attr("fill", (feature, index) => {
          const countryObj = countryDataResponse.data.filter((item) => {
            return item.location == feature.properties.brk_name;
          });
          return colorScale(countryObj.length > 0 && countryObj[0].confirmed);
        });
       
    };
  
    return (
      <div className="svg-container" ref={wrapperRef}>
        <svg ref={svgref}></svg>
      </div>
    );
  }
  const mapStateToProps = ({ countryData }) => {
    return {
      countryDataResponse: countryData.data,
    };
  };
  export default connect(mapStateToProps, null)(Map);
