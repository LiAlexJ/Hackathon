function getCompaniesFromTag(tagName) {
	return tags[tagName];
}

function getTags(ticker) {
	var companyTags = [];
	console.log("ticker" + ticker)
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
function getTagFrequency() {
	var tickersList = ["Maya", "Alex"];
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
	console.log(tagsToFrequency);
	return tagsToFrequency;

}