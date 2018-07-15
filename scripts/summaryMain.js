if($(window).height() > 700) {
  $("html").css('font-size','1.5em');
  $("a").css('font-size','1.5em');
  $("h3").css('font-size','1.5em');
  $("th").css('font-size','1.2em');
  $(".ad").css('font-size','1.2em');
  $(".stat").css('font-size','1.5em');
}

$(function() {

  var query = window.location.search.replace(/^\?/, "");
  query = query.replace("companies=", "");
  query = query.replace(/\+/g, ",");
  query = query.replace("%2C","");
  var parsed = query.split(",");
  var tickers = [];
  for(var i = 0; i < parsed.length; i++) {
    tickers.push(parsed[i].toUpperCase());
  }

  var weights = getWeights(tickers);
  var sum = 0;
  var percentSum = 0;
  for(var i = 0; i < weights.length; i++) {
    sum += weights[i];
  }

	var portfolioWeightsDataset = [];
	for(var i = 0; i < tickers.length; i++) {
		if(companyInfo[tickers[i]]) {
			var cap = {};
			cap.label = tickers[i];
			cap.count = ((weights[i]/sum) * 100).toFixed(2);
			portfolioWeightsDataset.push(cap);
      percentSum += parseFloat(cap.count);

 		}
	}
  getAnalytics(portfolioWeightsDataset);
	var tagsFrequencyDataset = [];
	var dataFreq = getTagFrequency(portfolioWeightsDataset);
	for (var f in dataFreq) {
	    if (dataFreq.hasOwnProperty(f)) {
	    	tagsFrequencyDataset.push(dataFreq[f]);
	    }
	}
	tagsFrequencyDataset.sort();
	drawPie(portfolioWeightsDataset);
	drawBarChart(dataFreq);

	 /* chart list */
	 for(var i = 0; i < tickers.length; i++) {
	 	var weight = "weight_" + tickers[i];
    var percent = ((weights[i]/sum) * 100).toFixed(2);
		var href = "detail.html?stock="+tickers[i];
	 	$("#companyList").append("<tr><td class='ticker'><a href='" + href + "'>"+getCompanyName(tickers[i])+"</a></td><td><input class='weight' type='text' name='" + tickers[i] + "' value='" + percent +"'/></td></tr>");
	 }
   $("#companyList").append("<tr><td class='ticker'>Total</td><td><input class='weight' type='text' id='total' value='" + percentSum +"'/></td></tr>");

	 $('.weight').keyup(function(e) {
	 		for(var x = 0; x < portfolioWeightsDataset.length; x++) {
	 			var temp = portfolioWeightsDataset[x];
	 			if(temp.label === $(this).attr('name')) {
	 				temp.count = $(this).val();
	 			}
	 		}

    		drawPie(portfolioWeightsDataset);
        getAnalytics(portfolioWeightsDataset);
        var newDataFreq = getTagFrequency(portfolioWeightsDataset);
        drawBarChart(newDataFreq);

        var newSum = 0;
        for(var i = 0; i < portfolioWeightsDataset.length; i++) {
          console.log(portfolioWeightsDataset[i]["count"]);
          newSum += parseFloat(portfolioWeightsDataset[i]["count"]);
        }
        $("#total").val(newSum);
        $("#statsListTable").html("");
        for(var stat in portfolioStats) {
          if (portfolioStats.hasOwnProperty(stat)) {
            var glyph = "glyphicon " + statsIcons[stat];
            $("#statsListTable").append('<tr class="analytics"><td><a href="" class="icon ' + stat + '"><span class="' + glyph + '"></span></a></td><td class="stat"> ' + statsNames[stat] + ': ' + portfolioStats[stat] + ' <td></tr>');
          }
        }



	 	});
   /* portfolio info */
   for(var stat in portfolioStats) {
    if (portfolioStats.hasOwnProperty(stat)) {
      var glyph = "glyphicon " + statsIcons[stat];
      $("#statsListTable").append('<tr class="analytics"><td><a href="" class="icon ' + stat + '"><span class="' + glyph + '"></span></a></td><td class="stat"> ' + statsNames[stat] + ': ' + portfolioStats[stat] + ' <td></tr>');
    }
  }


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

function drawBarChart(dataMap) {
  var data = [];
  for (var tag in dataMap) {
    if (dataMap.hasOwnProperty(tag)) {
        var tmp = {"tag": tag, "freq": dataMap[tag]/100};
        data.push(tmp);
    }
}


  d3.select("#tagChart").select("svg").remove();

  var  x = d3.scaleBand().padding(0.1),
    y = d3.scaleLinear();

  var width = $('#tagChart').width() * 0.95;
  var height = $('#tagChart').height() * 0.95;

  var svg = d3.select("#tagChart").append("svg")
            .attr("height", height)
            .attr("width", width);
  var color = d3.scaleOrdinal(["#5b1f52","#2C2C54","#32546d","#4a215e", "#27666d", "#29476d","#1f5141","#84272f"].reverse()); // colour scheme

    x.domain(data.map(function (d) { return d.tag; }));
    y.domain([0, 1]);

  height -= 40;
  width -= 40;
  var g = svg.append("g")
    .attr("transform", "translate(" + 40 + "," + 20 + ")");

  g.append("g")
    .attr("class", "axis axis--x");

  g.append("g")
    .attr("class", "axis axis--y");

  x.rangeRound([0, width]);
  y.rangeRound([height, 0]);

  g.select(".axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  g.select(".axis--y")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".0%")));

  var bars = g.selectAll(".bar")
    .data(data).enter();

  // ENTER
  bars
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return x(d.tag)+x.bandwidth()*0.25; })
    .attr("y", function (d) { return y(d.freq); })
    .attr("width", x.bandwidth()*0.5)
    .attr("height", function (d) { return height - y(d.freq); })
		.attr("fill", function(d){return color(d.tag);})

	bars.append("text")
		.attr("x", function (d) { return x(d.tag)+x.bandwidth()*0.35; })
		.attr("y", function (d) { return y(d.freq) - 10; })
		.text(function(d){ return Math.round(d.freq*100)+"%"; })
		.style("font-size", "12px")
}
if($(window).height() > 700) {
  $("html").css('font-size','1.5em!important');
}
