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

//Maya, Alex, Jenny
function getTagFrequency(tickersList) {
	var tagsToFrequency = {};
	for(var i = 0; i < tickersList.length; i++) {
		//Maya
		for (var tag in tags) {
			if (tags.hasOwnProperty(tag)) {
				//get all companies with that tag
				var companies = tags[tag];
				//if Maya is tagged with that tag
				if($.inArray(tickersList[i], companies) != -1) {
					//increase the frequency
					var freq = tagsToFrequency[tag];
					if(freq) {
						tagsToFrequency[tag] = freq + 1;
					} else {
						tagsToFrequency[tag] = 1;
					}
					
				}				       
			}
		}
	}
	return tagsToFrequency;

}

function getWeights(tickersList) {
	var weights = [];
	for(var i = 0; i < tickersList.length; i++) {
		weights.push(Math.random()*10);
	}
	return weights;
}

function getAnalytics() {
	portfolioStats["expected_return"] = (Math.random()*10).toFixed(2) + "%";
	portfolioStats["risk"] = (Math.random()*5).toFixed(2) + "%";
	portfolioStats["volatility"] = (Math.random()*10).toFixed(2) + "%";

}