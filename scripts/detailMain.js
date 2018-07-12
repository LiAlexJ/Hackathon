function cartOnClick(){
  location.href = "summary.html";
}

$(function() {
	var companyTicker = "Maya";
	var info = companyInfo[companyTicker];
	if(info) {
		console.log(info);
		$("#companyName").append(info["name"]);
		for (var key in info) {
			if (info.hasOwnProperty(key)) {
				$("#companyAbout").append(key + ": " + info[key] + " ");
			 }
		}
		theTags = getTags(companyTicker);
		for(var i = 0; i < theTags.length; i++) {
			$("#companyTags").append(theTags[i] + " ");
		}


	}
});
document.getElementById("right-brand").style.cursor = "pointer";

var url = 'https://newsapi.org/v2/everything?' +
          'q=Maya&' +
          'from=2018-07-12&' +
          'sortBy=popularity&' +
          'apiKey=d0b478dc381f4d8480bc0e05fe021974';

var req = new Request(url);

fetch(url).then(function(response) {
  return response.json();
}).then(function(jsonData){
  console.log(jsonData.articles);
});
