var data = [20, 5, 2, 15, 40, 8];

var btn = document.querySelector("#insertionChart button") 
btn.addEventListener("click", function(evt){
  insStep();
  updateData();
  });

var chartDiv = document.querySelector("#insertionChart");
chartDiv.appendChild(btn);

var width = 420,
    barHeight = 20;

var curStep = 1;

function swap(i, j){
  var a   = data[i];
  data[i] = data[j];
  data[j] = a;
}

function insStep(){
  var j = curStep;
    while(j > 0 && data[j-1] > data[j]){
        swap(j,j-1);
        j -= 1;
  }
  curStep +=1;
}


function updateData(){
    var chart = d3.select('#insertionChart .chart');
    var bar = chart.selectAll('g').data(data);

    bar.select("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

    bar.select("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
};

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select("#insertionChart .chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
