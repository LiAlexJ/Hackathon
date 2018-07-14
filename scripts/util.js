function getCompaniesFromTag(tagName) {
	return tags[tagName];
}

function getCompanyName(ticker) {
	return companyInfo[ticker]["name"];
}
function getTags(ticker) {
	var companyTags = [];
	console.log(tags);
	for (var tag in tags) {
		if (tags.hasOwnProperty(tag)) {
			var companies = tags[tag];
			if($.inArray(ticker, companies) != -1) {
				companyTags.push(tag);
			}
		}
	}
	console.log(companyTags);
	return companyTags;
}

function getCompanyInfo(ticker) {
	return companyInfo[ticker];
}

function getTagFrequency(tickerList) {
	var tagsMap = {};

	for(var i = 0; i < tickerList.length; i++) {
		var tickerMap = tickerList[i];
		var ticker = tickerMap["label"];
		var weight = tickerMap["count"];
		var tags = getTags(ticker);
		for(var a = 0; a < tags.length; a++) {
			var tag = tags[a];
			if(tagsMap[tag]) {
				tagsMap[tag] = tagsMap[tag] + parseFloat(weight);
			} else {
				tagsMap[tag] = parseFloat(weight);
			}
		}

	}

	return tagsMap;

}
//A B C D
function getWeights1(tickersList) {
	var weights = [];
	for(var i = 0; i < tickersList.length; i++) {
		weights.push(Math.random()*10);
	}
	return weights;
}
function getWeights(tickersList) {
	var weights = [];

	if(tickersList.length === 1) {
		weights.push(1);
		return weights;
	}
	var averageTickers = {};
	var weightTickers = {};
	var sum = 0;
	//key = ticker, value = average monthly return
	for(var i = 0; i < tickersList.length; i++) {
		var priceInfo = companyInfo[tickersList[i]]["prices"];

		var monthlyReturn = 0;
		var x = priceInfo.length-1;
		for(var j = 0; j < priceInfo.length; j++) {
			if(isNaN(priceInfo[j]) || priceInfo[j] === 0){
				priceInfo[j]=1;
			}
		}
		for(var a = 0; a < 12; a++) {
			monthlyReturn += (parseFloat(priceInfo[x])-parseFloat(priceInfo[x-19]))/parseFloat(priceInfo[x-19]);
			x -= 20;
		}
		var averageMonthlyReturn = monthlyReturn / 12;
		if(averageMonthlyReturn < 0) {
			averageTickers[tickersList[i]] = 0;
			sum += 0;
		} else {
			averageTickers[tickersList[i]] = averageMonthlyReturn;
			sum += averageMonthlyReturn;
		}
	}

	for(var ticker in averageTickers) {
		if(averageTickers[ticker]) {
			weightTickers[ticker] = averageTickers[ticker] / sum;
		}

	}

	for(var i = 0; i < tickersList.length; i++) {
		if(weightTickers[tickersList[i]]) {
			weights[i] = weightTickers[tickersList[i]];
		} else {
			weights[i] = 0;
		}

	}

	return weights;
}

function getAnalytics(portfolioWeightsDataset) {
	portfolioStats["year-to-date"] = portfolioYTD(portfolioWeightsDataset)*100 + "%";
	portfolioStats["risk"] = risk(portfolioWeightsDataset)*100 + "%";
	portfolioStats["volatility"] = ((Math.random()*5) + 5).toFixed(2) + "/10";

}

function portfolioYTD(tickerList) {

	var portfolioYTD = 0;
	//key = ticker, value = average monthly return
	for(var i = 0; i < tickerList.length; i++) {
		var tickerMap = tickerList[i];
		var ticker = tickerMap["label"];
		var weight = tickerMap["count"] / 100;
		console.log(weight);
		var priceInfo = companyInfo[ticker]["prices"];

		var ytd = 0;
		var x = priceInfo.length-1;
		//price most recent - least recent / least recent
		ytd = (parseFloat(priceInfo[x]) - parseFloat(priceInfo[0])) / parseFloat(priceInfo[0]);
		console.log(ytd);

		portfolioYTD += weight * ytd;
		}

	return ytd.toFixed(4);

}

function risk(tickerList) {
	var risk = 0;
	for(var i = 0; i < tickerList.length; i++) {
		var tickerMap = tickerList[i];
		var ticker = tickerMap["label"];
		var weight = tickerMap["count"] / 100;
		console.log(weight);
		var priceInfo = companyInfo[ticker]["prices"];
		var x = priceInfo.length-1;
		var monthlyReturn = [];
		for(var j = 0; j < priceInfo.length; j++) {
				if(isNaN(priceInfo[j]) || priceInfo[j] === 0){
					priceInfo[j]=1;
				}
		}

		for(var a = 0; a < 12; a++) {
			monthlyReturn.push((parseFloat(priceInfo[x])-parseFloat(priceInfo[x-19]))/parseFloat(priceInfo[x-19]));
			x -= 20;
		}

		var stdev = standardDeviation(monthlyReturn);
		risk += weight * stdev;
	}

	return risk.toFixed(4);
}

function standardDeviation(values){
  var avg = average(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
