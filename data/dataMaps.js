//tagsToTickers
var tags = {
  "Trending": [
    "AMZN",
    "FB",
    "JPM",
    "WFC",
    "C"
   ],
   "Female CEO" : [
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
    "sector": "Retail Trade",
    "tags": "Trending, Postive Sentiment"
  },
  "FB" : {
    "name": "Facebook",
    "marketCap": 587.8,
    "sector": "Technology Services",
    "tags": "Trending, Postive Sentiment"
  },
  "JPM": {
    "name": "JPMorgan Chase & Co.",
    "marketCap": 362.2,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "WFC" : {
    "name": "Wells Fargo & Company",
    "marketCap": 273.3,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "C" : {
    "name": "Citigroup, Inc.",
    "marketCap": 173.2,
    "sector": "Finance",
    "tags": "Trending, Postive Sentiment"
  },
  "AVGO" : {
    "name": "Broadcom",
    "marketCap": 106.2,
    "sector": "Electronic Technology",
    "tags" : "Postive Sentiment"
  },
  "IBM" : {
    "name": "IBM",
    "market_cap": 133.1,
    "sector": "Technology Services",
    "tags":"Female CEO"
  },
  "GSK" : {
    "name": "GlaxoSmithKline",
    "market_cap":101.0,
    "sector": "Health Technology",
    "tags": "Female CEO"
  },
  "LMT" : {
    "name": "Lockheed",
    "market_cap":87.5,
    "sector": "Electronic Technology",
    "tags": "Female CEO"
  },
  "OXY" : {
    "name": "Occidental Petroleum",
    "market_cap": 64.3,
    "sector": "Energy Minerals",
    "tags" : "Female CEO"
  },
  "GD" :{
    "name": "General Dynamics",
    "market_cap":56.9,
    "sector": "Electronic Technology",
    "tags" : "Female CEO"
  }
}

var portfolioStats = {
  "expected_return": "10%",
  "risk": "20%",
  "volatility": "5%"

}
