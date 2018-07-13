//tagsToTickers
var tags = {
  "Trending": [
    "AMZN",
    "FB",
    "JPM",
    "WFC",
    "C"
   ],
   "Female CEOs" : [
     "IBM",
     "GSK",
     "LMT",
     "OXY",
     "GD"
     ],
  "Glassdoor" : [
      "Hung-Wei"
    ],
  "Positive Sentiment" : [
      "AMZN",
      "FB",
      "JPM",
      "WFC",
      "AVGO"
    ]
}

//TickersToInfo (including tags)
var companyInfo = {
  "AMZN": {
    "name": "Amazon.com Inc.",
    "marketCap": 851.2,
    "sharePrice": 1811.45,
    "peRatio": 227.84,
    "dividends": "N/A",
    "sector": "Retail Trade",
    "tags": "Trending, Postive Sentiment"
  },
  "FB" : {
    "name": "Facebook",
    "marketCap": 587.8,
    "sharePrice": 207.77,
    "peRatio": 34.40,
    "dividends": "N/A",
    "sector": "Technology Services",
    "tags": "Trending, Postive Sentiment"
  },
  "JPM": {
    "name": "JPMorgan Chase & Co.",
    "sharePrice": 106.88,
    "peRatio": 15.24,
    "dividends": 2.24,
    "marketCap": 362.2,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "WFC" : {
    "name": "Wells Fargo & Company",
    "marketCap": 273.3,
    "sharePrice": 54.83,
    "peRatio": 13.60,
    "dividends": 1.56,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "C" : {
    "name": "Citigroup, Inc.",
    "marketCap": 173.2,
    "sharePrice": 66.50,
    "peRatio": "N/A",
    "dividends": 1.28,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "AVGO" : {
    "name": "Broadcom",
    "marketCap": 106.2,
    "sharePrice": 207.41,
    "peRatio": 7.82,
    "dividends": 7.00,
    "sector": "Electronic Technology",
    "tags" : "Postive Sentiment"
  },
  "IBM" : {
    "name": "IBM",
    "market_cap": 133.1,
    "sharePrice": 146.52,
    "peRatio": 24.04,
    "dividends": 6.28,
    "sector": "Technology Services",
    "tags":"Female CEOs"
  },
  "GSK" : {
    "name": "GlaxoSmithKline",
    "market_cap":101.0,
    "sharePrice": 41.685,
    "peRatio": 75.24,
    "dividends": 2.17,
    "sector": "Health Technology",
    "tags": "Female CEO"
  },
  "LMT" : {
    "name": "Lockheed",
    "market_cap":87.5,
    "sharePrice": 315.53,
    "peRatio": 38.49,
    "dividends": 8.00,
    "sector": "Electronic Technology",
    "tags": "Female CEOs"
  },
  "OXY" : {
    "name": "Occidental Petroleum",
    "market_cap": 64.3,
    "sharePrice": 83.95,
    "peRatio": 33.99,
    "dividends": 3.08,
    "sector": "Energy Minerals",
    "tags" : "Female CEOs"
  },
  "GD" :{
    "name": "General Dynamics",
    "market_cap":56.9,
    "sharePrice": 192.77,
    "peRatio": 19.82,
    "dividends": 3.72,
    "sector": "Electronic Technology",
    "tags" : "Female CEOs"
  }
}

var portfolioStats = {
  "expected_return": "10%",
  "risk": "20%",
  "volatility": "5%"

}

var statsIcons = {
  "expected_return": "glyphicon-signal",
  "risk": "glyphicon-dashboard",
  "volatility": "glyphicon-tasks"
}

var statsNames = {
  "expected_return": "Expected Return",
  "risk": "Risk",
  "volatility": "Volatility"

}

