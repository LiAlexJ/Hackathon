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
function getWeights(tickersList) {
	var weights = [];
	for(var i = 0; i < tickersList.length; i++) {
		weights.push(Math.random()*10);
	}
	return weights;
}
function getWeights1(tickersList) {
	var weights = [];
	var averageTickers = {};
	var weightTickers = {};
	var sum = 0;
	//key = ticker, value = average monthly return
	for(var i = 0; i < tickersList.length; i++) {
		var priceInfo = companyInfo[tickersList[i]]["prices"];
		var monthlyReturn = 0;
		var x = priceInfo.length-1;
		for(var a = 0; a < 12; a++) {
			monthlyReturn += (priceInfo[x]-(priceInfo[x-29])/priceInfo[x-29];
			x -= 30;
		}
		var averageMonthlyReturn = monthlyReturn / 12;
		if(averageMonthlyReturn < 0) {
			averageTickers[tickerList[i]] = 0;
			sum += 0;
		} else {
			averageTickers[tickerList[i]] = averageMonthlyReturn;
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
			weight[i] = weightTickers[tickersList[i]];
		} else {
			weight[i] = 0;
		}

	}

	//have average return for each ticker
	//sum all returns in the map

	//each ticker's weight is own return / sum of everything

	//go through tickersList again, set weights array using map
	return weights;
}

function getAnalytics() {
	portfolioStats["year-to-date"] = (Math.random()*10).toFixed(2) + "%";
	portfolioStats["risk"] = (Math.random()*5).toFixed(2) + "%";
	portfolioStats["volatility"] = (Math.random()*10).toFixed(2) + "%";

}