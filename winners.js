console.log('hola')


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv('./ganadores.csv', function(data) {
  const dataPlot = [...data].sort((a, b) => b.Year - a.Year)
  const names = Object.keys(dataPlot[dataPlot.length-1]);
  const year2018 = dataPlot[1];
  const year2019 = dataPlot[0];
  console.log(year2019)
  names.splice(0,1)
  names.splice(13,1)
  const namesToMerge = {names:{...names}}
  console.log(namesToMerge)
  const dataMerged = {...dataPlot,...namesToMerge} 

  console.log(dataMerged)

  // Add X axis
  var x = d3.scaleLinear()
    // .domain([0, 4000])
    .domain(names.map(d => d))
    .range([0, width ])
    // .padding(0.1)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll('text').style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function () {
        return "rotate(-90)"
    });

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([d3.min(dataPlot, d => d.Year), d3.max(dataPlot, d => d.Year)])
    .range([ height, 0])
    .clamp(true)
  svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d3.format("d")));


//pointScale
  var pointScale = d3.scalePoint()
    .domain([d3.min(dataPlot, d => d.Year), d3.max(dataPlot, d => d.Year)])
    .range(dataMerged,d=>d.names);


    console.log(pointScale.range())
    // console.log(pointScale(2002))
    // console.log(y.domain())
    // console.log(x.domain())
    // console.log(y(0))
    // console.log(x(0))

  // Add dots
  // svg.append('g')
  //   .selectAll("dot")
  //   .data(dataPlot)
  //   .enter()
  //   .append("circle")
  //     .attr("cx",  x(0) )
  //     .attr("cy", function (d) { return y(d.Year); } )
  //     .attr("r", 1.5)
  //     .style("fill", "#69b3a2")
      
  // svg.append('g')
  //   .selectAll("myline")
  //   .data(dataPlot)
  //   .enter()
  //   .append("line")
  //     .attr("x1", x(0))
  //     .attr("x2", x(0))
  //     .attr("y1", function(d) { return x(d.Year); })
  //     .attr("y2", function(d) { return x(d.Year); })
  //     .attr("stroke", "grey")


    svg.append('g')
    .selectAll("myline")
    .data(dataPlot)
    .enter()
    .append("line")
      .attr("x1", 40)
      .attr("x2", 40)
      .attr("y1", -200)
      .attr("y2", y(10))
      .attr("stroke", "grey")

  
})
