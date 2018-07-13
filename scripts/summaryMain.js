$(function() {
	var tickers = ["AMZN", "IBM", "JPM"];
	var weights = [10, 20, 50];

	var portfolioWeightsDataset = [];
	for(var i = 0; i < tickers.length; i++) {
		if(companyInfo[tickers[i]]) {
			var cap = {};
			cap.label = tickers[i];
			cap.count = weights[i];
			portfolioWeightsDataset.push(cap);
		}
	}

	var tagsFrequencyDataset = [];
	var dataFreq = getTagFrequency(tickers);
	for (var f in dataFreq) {
	    if (dataFreq.hasOwnProperty(f)) {
	    	tagsFrequencyDataset.push(dataFreq[f] * 10);
	    }
	}
	tagsFrequencyDataset.sort();
	drawPie(portfolioWeightsDataset);
	drawBarChart(tagsFrequencyDataset);

	 /* chart list */
	 for(var i = 0; i < tickers.length; i++) {
	 	var weight = "weight_" + tickers[i];
	 	$("#companyList").append("<tr><td class='ticker'>"+tickers[i]+"</td><td><input class='weight' type='text' name='" + tickers[i] + "' /></td></tr>");


	 }

	 $('.weight').keyup(function(e) {
	 		for(var x = 0; x < portfolioWeightsDataset.length; x++) {
	 			var temp = portfolioWeightsDataset[x];
	 			console.log($(this).attr('name'));
	 			if(temp.label === $(this).attr('name')) {
	 				console.log("here");
	 				temp.count = $(this).val();
	 			}
	 		}

    		$("#tagList").html($(this).val());
    		drawPie(portfolioWeightsDataset)
	 	});


});

function createPortfolioWeightTable() {


}

function cartOnClick(){
  location.href = "summary.html";
}

function drawPie(dataset){
	d3.select("#listPie").select("svg").remove();
  var data = []
  var sum = d3.sum(dataset, function(d){ return d.count; })
  for(var each in dataset){
    var tmp = {'name': dataset[each].label, 'value': dataset[each].count, 'percentage': dataset[each].count/sum}
    data.push(tmp)
  }
		/* companies pie chart  */

	var width = $('#listPie').width();
	var height = $('#listPie').height();

  var donut = donutChart()
      .width(width)
      .height(height)
      .cornerRadius(3) // sets how rounded the corners are on each slice
      .padAngle(0.015) // effectively dictates the gap between slices
      .variable('percentage')
      .category('name');
    d3.select('#listPie')
        .datum(data) // bind data to the div
        .call(donut); // draw chart in div
}
// DRAWING

function drawBarChart(dataArray) {
  var data = [];
  for(var i = 0; i < dataArray.length; i++){
    var tmp = {"tag": i, "freq": dataArray[i]};
    data.push(tmp);
  }
  console.log(data)
  d3.select("#tagChart").select("svg").remove();
  var svg = d3.select("#tagChart").append("svg")
            .attr("height", height)
            .attr("width", width);

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear();

    x.domain(data.map(function (d) { return d.tag; }));
    y.domain([0, d3.max(data, function (d) { return d.freq; })]);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .attr("class", "axis axis--x");

  g.append("g")
    .attr("class", "axis axis--y");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

  var width = $('#tagChart').width() - margin.left - margin.right;
  var height = $('#tagChart').height() - margin.top - margin.bottom;

  x.rangeRound([0, width]);
  y.rangeRound([height, 0]);

  g.select(".axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.select(".axis--y")
    .call(d3.axisLeft(y).ticks(10, "%"));

  var bars = g.selectAll(".bar")
    .data(data);

  // ENTER
  bars
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.tag); })
    .attr("y", function (d) { return y(d.freq); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.freq); });

  // UPDATE
  bars.attr("x", function (d) { return x(d.tag); })
    .attr("y", function (d) { return y(d.freq); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.freq); });
}

document.getElementById("right-brand").style.cursor = "pointer";
