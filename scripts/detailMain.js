function cartOnClick(){
  location.href = "summary.html";
}

function getStock() {
  $.getJSON('https://api.robinhood.com/fundamentals/?symbols=?' + window.location.href.split("=")[1], function(data) {
    //data is the JSON string
  });
  return window.location.href.split("=")[1];
}

function moneyFormat(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

       ? Math.abs(Number(labelValue)) / 1.0e+9 + " Billion"
       // Six Zeroes for Millions 
       : Math.abs(Number(labelValue)) >= 1.0e+6

       ? Math.abs(Number(labelValue)) / 1.0e+6 + " Million"

       : Math.abs(Number(labelValue));

   }

var name = "Apple"
$(function() {
  var companyTicker = "AMZN";
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

var url = 'https://newsapi.org/v2/everything?' +
          'q=' +
          window.location.href.split("=")[1].toUpperCase() +
          '&from=2018-06-12&' +
          'sortBy=popularity&' +
          'apiKey=d0b478dc381f4d8480bc0e05fe021974';

var req = new Request(url);

fetch(url)
    .then(function(response) {
      return response.json(); })
    .then(function(data) {
      console.log(data.articles)
      var token = "a6c4e6e34416215cac560ef6233c55895aa15de9";
      var head = {'Authorization':"Token " + token};
      var symbol = window.location.href.split("=")[1].toUpperCase();
      $.getJSON("https://api.robinhood.com/fundamentals/?symbols=" + symbol, function(result){
            var x = result["results"][0];
            var id = result["results"][0]["instrument"]
            var desc = x["description"];
            var name = desc.split(".")[0]
            var city = x["headquarters_city"];
            var state = x["headquarters_state"];
            var sector = x["sector"];
            var marketcap = x["market_cap"];
            var pe = x["pe_ratio"];
            var price = x["open"]
            var dividend = x["dividend_yield"]
            var founded = x["year_founded"]
            var employees = x['num_employees']

            $("#company").append("<img id=\"logo\" src=\"https://logo.clearbit.com/" + name.split(" ")[0].split(",")[0] + ".com\">");

            $("#company").append("<div id=\"title\">" + name + "</div>");
            $("#company").append("</b><br>");
            $("#company").append("<b>Price</b>:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;$" + parseFloat(price).toFixed(2) + "<br>")
            var scap = moneyFormat((marketcap))
            $("#company").append("<b>Market Cap</b>:&emsp;&emsp;&emsp;$" + scap.split(".")[0] + " " + scap.split(" ")[1] + "<br><br>")
            $("#company").append("<b>Sector:&emsp;&emsp;&emsp;&emsp;&emsp;</b>" + sector + "<br>")
            $("#company").append("<b>Location:&emsp;&emsp;&emsp;&emsp;</b>" + city + ", " + state + "<br>")
            $("#company").append("<b>Employees:&emsp;&emsp;&emsp;</b>" + employees + "<br>")
            $("#company").append("<b>Founded:&emsp;&emsp;&emsp;&emsp;</b>" + founded + "<br>")
            $("#about").append("<br><br>" + desc + " ");

            var graph = "<div class=\"tradingview-widget-container\"><div id=\"tradingview_1f1c8\"></div>" +
            "<div class=\"tradingview-widget-copyright\"><a href=\"https://www.tradingview.com/symbols/NASDAQ-" + symbol + "\"" +
            "rel=\"noopener\" target=\"_blank\"><span class=\"blue-text\">" +
            symbol + "chart</span></a></div>" + 
            "<script type=\"text/javascript\" src=\"https://s3.tradingview.com/tv.js\"></script>" +
            "<script type=\"text/javascript\"> new TradingView.widget(" + 
            "{\"autosize\": true," +
            "\"symbol\": \"NASDAQ:" + symbol + "\"," +
            "\"interval\": \"D\"," +
            "\"timezone\": \"Etc/UTC\"," +
            "\"theme\": \"Light\"," +
            "\"style\": \"3\"," +
            "\"locale\": \"en\"," +
            "\"toolbar_bg\": \"#f1f3f6\"," +
            "\"enable_publishing\": false," +
            "\"allow_symbol_change\": true," +
            "\"container_id\": \"tradingview_1f1c8\"});</script></div>"
            $("#graph").append(graph);

      });
      $(".carousel-indicators").append("<li data-target=\"#demo\" data-slide-to=\"0\" class=\"active\"></li>")
      var item = "<div class=\"carousel-item active\">"
      item += "<img id=\"carousel\" src=\""+ data.articles[1].urlToImage +"\" alt=\""+ data.articles[1].title +"\">"
      item += "<div class=\"carousel-caption\">"
      item += "<h4>"+data.articles[1].title+"</h4>"
      //item += "<p>"+data.articles[0].description+"</p></div> </div>"
      $(".carousel-inner").append(item)
      for(var i = 2; i < 10; i++){
        var news = data.articles[i];
        var indicator = "<li data-target=\"#demo\" data-slide-to=\"" + i + "\"></li>";
        $(".carousel-indicators").append(indicator);

        var item = "<div class=\"carousel-item\">"
        item += "<img id=\"carousel\" src=\""+ data.articles[i].urlToImage +"\" alt=\""+ data.articles[i].title +"\">"
        item += "<div class=\"carousel-caption\">"
        item += "<h4>"+data.articles[i].title+"</h4>"
        //item += "<p>"+data.articles[i].description+"</p></div> </div>"
        $(".carousel-inner").append(item)
      }


    })
