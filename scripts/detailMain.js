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
            var id = result["results"][0]["instrument"];
            var desc = x["description"];
            var name = desc.split(".")[0];
            var city = x["headquarters_city"];
            var state = x["headquarters_state"];
            var sector = x["sector"];
            var marketcap = x["market_cap"];
            var pe = x["pe_ratio"];
            var price = x["open"];
            var dividend = x["dividend_yield"];
            var founded = x["year_founded"];
            var employees = x['num_employees'];
            var ceo = x["ceo"];

            $("#company").append("<img id=\"logo\" src=\"https://logo.clearbit.com/" + name.split(" ")[0].split(",")[0] + ".com\">");

            $("#company").append("<div id=\"title\">" + name + "</div>");
            $("#company").append("</b><br>");
            $("#company").append("<b>Price</b>:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;$" + parseFloat(price).toFixed(2) + "<br>")
            var scap = moneyFormat((marketcap))
            $("#company").append("<b>Market Cap</b>:&emsp;&emsp;&emsp;$" + scap.split(".")[0] + " " + scap.split(" ")[1] + "<br>")
            $("#company").append("<b>P/E Ratio</b>:&emsp;&emsp;&emsp;&emsp;" + parseFloat(pe).toFixed(2) + "<br><br>");
            $("#company").append("<b>Sector:&emsp;&emsp;&emsp;&emsp;&emsp;</b>" + sector + "<br>")
            $("#company").append("<b>Location:&emsp;&emsp;&emsp;&emsp;</b>" + city + ", " + state + "<br>")
            $("#company").append("<b>CEO:&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</b>" + ceo + "<br>")
            $("#company").append("<b>Employees:&emsp;&emsp;&emsp;</b>" + employees + "<br>")
            $("#company").append("<b>Founded:&emsp;&emsp;&emsp;&emsp;</b>" + founded + "<br>")
            /*$("#comp-2").append("<b>Founded:&emsp;&emsp;&emsp;&emsp;</b>" + founded + "<br>")*/
            $("#about").append("<br><br>" + desc + " ");

            $.getJSON("https://api.robinhood.com/quotes/historicals/?symbols=" + symbol + "&interval=day", function(result2){
              var ts = result2['results'][0]['historicals'];
              console.log(ts)
              var dates = ts.map(i => i['begins_at']);
              var prices = ts.map(i => i['close_price']);
              console.log(ts);

            const ctx = document.getElementById('myChart').getContext('2d');
            const data = {
            // Labels should be Date objects
                  labels: dates,
                  datasets: [{
                      fill: false,
                      label: 'Stock Price',
                      data: prices,
                      cubicInterpolationMode: 'default',
                      borderColor: '#fe8b36',
                      backgroundColor: '#fe8b36',
                      lineTension: 0,
                  }]
              }
              const options = {
                  type: 'line',
                  data: data,
                  options: {
                      fill: false,
                      responsive: true,
                      scales: {
                          xAxes: [{
                              type: 'time',
                              display: true,
                              scaleLabel: {
                                  display: true,
                                  labelString: "Date",
                              }
                          }],
                          yAxes: [{
                              ticks: {
                                display: true,
                              },
                              scaleLabel: {
                                  display: true,
                                  labelString: "Stock Price",
                              }
                          }]
                      }
                  }
              }
            const chart = new Chart(ctx, options);
            $("#graph").append("<canvas id=\"myChart\" width=\"400\" height=\"400\"></canvas><script>" + graph +
              "</script>");
          });

      });
      $(".carousel-indicators").append("<li data-target=\"#demo\" data-slide-to=\"0\" class=\"active\"></li>")
      var item = "<div class=\"carousel-item active\">"
      item += "<div class=\"img-wrap\">"
      item += "<img id=\"carousel\" src=\""+ data.articles[1].urlToImage +"\">"
      item += "<div class=\"overlay\"><div class=\"info\"><h2>" + data.articles[1].title + "</h2></div></div>"
      item += "</div>"
/*      item += "<div class=\"carousel-caption\">"
      item += "<h4>"+data.articles[1].title+"</h4>"*/
      //item += "<p>"+data.articles[0].description+"</p></div> </div>"
      $(".carousel-inner").append(item)
      for(var i = 2; i < 10; i++){
        var news = data.articles[i];
        var indicator = "<li data-target=\"#demo\" data-slide-to=\"" + i + "\"></li>";
        $(".carousel-indicators").append(indicator);

        var item = "<div class=\"carousel-item\">"
        item += "<img id=\"carousel\" src=\""+ data.articles[i].urlToImage +"\">"
        item += "<div class=\"carousel-caption\">"
        item += "<h4>"+data.articles[i].title+"</h4>"
        //item += "<p>"+data.articles[i].description+"</p></div> </div>"
        $(".carousel-inner").append(item)
      }


    })
