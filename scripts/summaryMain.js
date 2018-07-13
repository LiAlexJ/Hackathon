$(function() {
	console.log("hello");
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
	console.log(dataFreq);
	for (var f in dataFreq) {
	    if (dataFreq.hasOwnProperty(f)) {
	    	tagsFrequencyDataset.push(dataFreq[f] * 10);
	    }
	}
	tagsFrequencyDataset.sort();
	console.log(tagsFrequencyDataset);
	drawPie(portfolioWeightsDataset);
	drawBarChart(tagsFrequencyDataset);



	 /* chart list */
	 for(var i = 0; i < tickers.length; i++) {
	 	var weight = "weight_" + tickers[i];
	 	$("#companyList").append("<tr><td class='ticker'>"+tickers[i]+"</td><td><input class='weight' type='text' name='" + tickers[i] + "' /></td></tr>");
	 	
	 
	 }

	 $('.weight').keyup(function(e) {
	 		for(var x = 0; x < dataset.length; x++) {
	 			var temp = dataset[x];
	 			console.log($(this).attr('name'));
	 			if(temp.label === $(this).attr('name')) {
	 				console.log("here");
	 				temp.count = $(this).val();
	 			}
	 		}

    		$("#tagList").html($(this).val());
    		drawPie(dataset)
	 	});


});

function createPortfolioWeightTable() {


}

function cartOnClick(){
  location.href = "summary.html";
}

function drawPie(dataset){
	d3.select("svg").remove();
		/* companies pie chart  */
	var width = 360;
	var height = 360;
	var radius = Math.min(width, height) / 2;
	var color = d3.scaleOrdinal(d3.schemeCategory20b);
	var legendRectSize = 18;
	var legendSpacing = 4;
	//var color = d3.scaleOrdinal().range(['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C']);
	var svg = d3.select('#listPie').append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
    .attr('preserveAspectRatio','xMinYMin')
    .append("g")
    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

	

	var arc = d3.arc()
	  .innerRadius(0)
	  .outerRadius(radius);

	var pie = d3.pie()
	  .value(function(d) { return d.count; })
	  .sort(null);
	
	var path = svg.selectAll('path')
	  .data(pie(dataset))
	  .enter()
	  .append('path')
	  .attr('d', arc)
	  .attr('fill', function(d, i) {
	    return color(d.data.label);
	  });

}

function drawBarChart(dataArray) {


// Create variable for the SVG
var svg = d3.select("#tagChart").append("svg")
          .attr("height","100%")
          .attr("width","100%");

// Select, append to SVG, and add attributes to rectangles for bar chart
svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
          .attr("class", "bar")
          .attr("height", function(d, i) {return (d * 10)})
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60) + 25})
          .attr("y", function(d, i) {return 400 - (d * 10)});

// Select, append to SVG, and add attributes to text
svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d})
           .attr("class", "text")
           .attr("x", function(d, i) {return (i * 60) + 36})
           .attr("y", function(d, i) {return 415 - (d * 10)});


}






document.getElementById("right-brand").style.cursor = "pointer";
