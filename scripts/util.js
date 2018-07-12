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
			if($.inArray(ticker, companies != -1)) {
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