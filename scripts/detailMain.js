function cartOnClick(){
  location.href = "summary.html";
}
var name = "Apple"
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
          'q=fintech&' +
          'from=2018-06-12&' +
          'sortBy=popularity&' +
          'apiKey=d0b478dc381f4d8480bc0e05fe021974';

var req = new Request(url);

fetch(url)
    .then(function(response) {
      return response.json(); })
    .then(function(data) {
      console.log(data.articles)
      $(".carousel-indicators").append("<li data-target=\"#demo\" data-slide-to=\"0\" class=\"active\"></li>")
      var item = "<div class=\"carousel-item active\">"
      item += "<img src=\""+ data.articles[1].urlToImage +"\" alt=\""+ data.articles[1].title +"\">"
      item += "<div class=\"carousel-caption\">"
      item += "<h4>"+data.articles[1].title+"</h4>"
      //item += "<p>"+data.articles[0].description+"</p></div> </div>"
      $(".carousel-inner").append(item)
      for(var i = 2; i < 10; i++){
        var news = data.articles[i];
        var indicator = "<li data-target=\"#demo\" data-slide-to=\"" + i + "\"></li>";
        $(".carousel-indicators").append(indicator);

        var item = "<div class=\"carousel-item\">"
        item += "<img src=\""+ data.articles[i].urlToImage +"\" alt=\""+ data.articles[i].title +"\">"
        item += "<div class=\"carousel-caption\">"
        item += "<h4>"+data.articles[i].title+"</h4>"
        //item += "<p>"+data.articles[i].description+"</p></div> </div>"
        $(".carousel-inner").append(item)
      }


    })
