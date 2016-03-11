var User = {
  PhilArcadian: 'PhilArcadian',
  LeonardoDicaprio: 'LeonardoDicaprio',
  TedMosbey: 'TedMosbey',
  LilyAldrin: 'LilyAldrin',
  MarshallEriksen: 'MarshallEriksen',
  RobinSherbatsky: 'RobinSherbatsky',
  BarneyStinson: 'BarneyStinson'
}

var RESTAURANTS = [
  {
    "name": "No Better Burgers",
    "restaurantId": 0,
    "pricing": 3,
    "address": "1234 Civic Center Dr. City, CA 90000",
    "reviews": [
      {
        "user": "PhilArcadian",
        "reviewId": 0,
        "rating": 3,
        "body": "I love this establishment. Everything I’ve ever had here has been great. From the cheeseburger to turkey burger to turkey tacos. ",
        "ups": {
          "helpful": [
            "LeonardoDicaprio",
            "LilyAldrin",
            "BarneyStinson"
          ],
          "witty": [
            "TedMosbey"
          ],
          "harsh": []
        }
      },
      {
        "user": "TedMosbey",
        "reviewId": 1,
        "rating": 5,
        "body": "My husband and I had to give up our burger :/ toward the end cause our son, who already finished his burger asked for more.... Next time, I need to order him 5oz :)",
        "ups": {
          "helpful": [
            "LeonardoDicaprio",
            "defaultUser"
          ],
          "witty": [
            "MarshallEriksen"
          ],
          "harsh": []
        }
      },
      {
        "user": "defaultUser",
        "reviewId": 2,
        "rating": "5",
        "body": "Super delicious burgers, the fries were a little undercooked, but last time I came I had garlic fries and those sold my soul to this place: don't get your fries anywhere else (period).",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "burgers",
      "american",
      "tacos"
    ],
    "images": [
      "images/mbburger1.jpg",
      "images/mbburger2.jpg",
      "images/mbburger3.jpg"
    ]
  },
  {
    "name": "Ichiban Poké Cafe",
    "restaurantId": 1,
    "pricing": 6,
    "address": "1001 First St. City, CA 90001",
    "reviews": [
      {
        "user": "LeonardoDicaprio",
        "reviewId": 0,
        "rating": 1,
        "body": "can we talk about the service fee? I read the whole rationale about providing a living wage... but if they want their employees to have that, just add it into the price. This isn’t a service based concept, you order at a counter and that’s the end of the transaction. I’m not opposed to providing a living wage, but when the price charged is higher than the price on the menu, it only adds to confusion, and an uncomfortable situation for the customer who only wants to pay the price on the menu, especially when they get food to go. Build it into the price, enough with the signs and explanations.",
        "ups": {
          "helpful": [
            "PhilArcadian",
            "defaultUser"
          ],
          "witty": [],
          "harsh": [
            "BarneyStinson",
            "RobinSherbatsky"
          ]
        }
      },
      {
        "user": "PhilArcadian",
        "reviewId": 1,
        "rating": 5,
        "body": "At first glance of the menu, although I came for the poke, the shrimp is what caught my eye, but I knew I had to save it for another day. The employees helped me out by giving options to split bases and fish offering the customer a multitude of options/ability to try combinations (something I greatly appreciate). The fish options for the poke bowl limit to only tuna, however the sauces offered give the customer a variety to choose from in terms of flavor.",
        "ups": {
          "helpful": [
            "LeonardoDicaprio",
            "LilyAldrin"
          ],
          "witty": [
            "TedMosbey"
          ],
          "harsh": []
        }
      },
      {
        "user": "defaultUser",
        "reviewId": 2,
        "rating": "5",
        "body": "My spicy salmon bowl was way under spiced. I've got to assume the order girl made some kind of mistake, because I've had spicier salmon from my grandmothers lemon chicken",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "poke",
      "sushi",
      "bowls",
      "sashimi",
      "lunch",
      "dinner"
    ],
    "images": [
      "images/ichipoke1.jpg",
      "images/ichipoke2.jpg"
    ]
  },
  {
    "name": "Cafe Duet",
    "restaurantId": 2,
    "pricing": 9,
    "address": "222 2nd St. City, CA 90002",
    "reviews": [
      {
        "user": "LeonardoDicaprio",
        "reviewId": 0,
        "rating": 5,
        "body": "Absolutely love this place! So far I’ve had the lavender latte, earl grey creme latte, matcha tea latte, and one of the open faced sandwiches and everything has been absolutely amazing. They put lavender flowers on the lavender latte which is a super cute touch, and the whole place just has very light and airy energy.",
        "ups": {
          "helpful": [
            "RobinSherbatsky",
            "defaultUser"
          ],
          "witty": [
            "TedMosbey"
          ],
          "harsh": []
        }
      },
      {
        "user": "TedMosbey",
        "reviewId": 1,
        "rating": 1,
        "body": "Welcome to California, where most people know when an avocado is ripe or not. Impresso does not. Running out of bananas? Happened. Confusing almond milk for real milk? Also happened. Cold toast? Is toast supposed to be cold? The place is clean and the coffee is good and that is right about where the list of positives ends.",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": [
            "TedMosbey",
            "RobinSherbatsky",
            "defaultUser"
          ]
        }
      },
      {
        "user": "defaultUser",
        "reviewId": 2,
        "rating": "5",
        "body": "The lemon meringue filled croissant was life changing. You should always get it.",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "cafe",
      "coffee",
      "tea",
      "breakfast"
    ],
    "images": [
      "images/cafe1.jpg",
      "images/cafe2.jpg"
    ]
  },
  {
    "name": "Cretan Burger",
    "restaurantId": 3,
    "pricing": 1,
    "address": "3033 3rd Ave. City, CA 90003",
    "reviews": [
      {
        "user": "TedMosbey",
        "reviewId": 0,
        "rating": 1,
        "body": "The burgers were flavorless and way over cooked. There was almost no chili on the Terlingua burger, and my son was unable to eat his normal burger because it was over cooked and over salted. The shakes were not good either: the chocolate one had a weird coconut taste and the salted caramel one was more whipped cream than milkshake.",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": [
            "BarneyStinson",
            "LilyAldrin"
          ]
        }
      },
      {
        "user": "LilyAldrin",
        "reviewId": 1,
        "rating": 5,
        "body": "Ordered a kobe burger with lettuce, tomato, grilled onions, and I added cheddar cheese. Beef had a good char-grilled flavor to it and not overly seasoned. The aioli on the burger was good. Overall, the burger was really good, I could tell all burger ingredients were of high quality, however, it was not one of my favorites. It didn’t compare to Green2Go, Hoppdoddy or Eureka. So, I guess I would say it was fourth on my list of natural burgers.",
        "ups": {
          "helpful": [
            "LeonardoDicaprio"
          ],
          "witty": [],
          "harsh": []
        }
      },
      {
        "user": "LeonardoDicaprio",
        "reviewId": 2,
        "rating": 4,
        "body": "Overall, the burger is good. My meat was a little too well done. It tasted good. The restaurant is new and perhaps the crafting of the sandwich will get better as time goes on.",
        "ups": {
          "helpful": [
            "LilyAldrin"
          ],
          "witty": [
            "TedMosbey",
            "RobinSherbatsky",
            "MarshallEriksen"
          ],
          "harsh": []
        }
      }
    ],
    "tags": [
      "burgers",
      "american",
      "greek",
      "fries",
      "beer"
    ],
    "images": [
      "images/cretan1.jpg",
      "images/cretan2.jpg",
      "images/cretan3.jpg"
    ]
  },
  {
    "name": "Starbucks",
    "restaurantId": 4,
    "pricing": 6,
    "address": "444 4th St. City, CA 90004",
    "reviews": [
      {
        "user": "RobinSherbatsky",
        "reviewId": 0,
        "rating": 3,
        "body": "Pretty decent coffee. Average Starbucks service. nothing to hate but nothing to love.",
        "ups": {
          "helpful": [
            "RobinSherbatsky"
          ],
          "witty": [
            "TedMosbey"
          ],
          "harsh": []
        }
      },
      {
        "user": "BarneyStinson",
        "reviewId": 1,
        "rating": 5,
        "body": "Best place to mingle with other coffee snobs. Absolutely love the ambiance. I’d give it 6 stars if i could",
        "ups": {
          "helpful": [],
          "witty": [
            "TedMosbey",
            "RobinSherbatsky"
          ],
          "harsh": []
        }
      },
      {
        "user": "defaultUser",
        "reviewId": 2,
        "rating": "1",
        "body": "Super average. This place really hit it's stride with mediocrity. P.S. the bathrooms are horrendous.",
        "ups": {
          "helpful": [],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "cafe",
      "coffee",
      "tea",
      "breakfast",
      "lunch",
      "dinner"
    ],
    "images": [
      "images/sbux1.jpg",
      "images/sbux2.jpg"
    ]
  },
  {
    "name": "Cinqos Tacos",
    "restaurantId": 5,
    "pricing": 5,
    "address": "5055 5th St. City, CA 90005",
    "reviews": [
      {
        "user": "MarshallEriksen",
        "reviewId": 0,
        "rating": 5,
        "body": "",
        "ups": {
          "helpful": [
            "LeonardoDicaprio",
            "LilyAldrin",
            "RobinSherbatsky"
          ],
          "witty": [],
          "harsh": []
        }
      },
      {
        "user": "TedMosbey",
        "reviewId": 1,
        "rating": 1,
        "body": "While Cinquos Tacquos tastes like the kitchen *cinq* ;D",
        "ups": {
          "helpful": [
            "RobinSherbatsky"
          ],
          "witty": [
            "TedMosbey",
            "LilyAldrin",
            "LeonardoDicaprio",
            "PhilArcadian",
            "MarshallEriksen"
          ],
          "harsh": [
            "BarneyStinson"
          ]
        }
      },
      {
        "user": "PhilArcadian",
        "reviewId": 2,
        "rating": 5,
        "body": "We’ve been to the location in Huntington Beach several times so we though we’d try the second location in Newport Beach.  This was a real disappointment, especially since we’ve always had good food at the main location.",
        "ups": {
          "helpful": [
            "LeonardoDicaprio"
          ],
          "witty": [],
          "harsh": []
        }
      },
      {
        "user": "LeonardoDicaprio",
        "reviewId": 3,
        "rating": 4,
        "body": "Best tacos in Orange County. A bit pricey for what you get but the scenery makes up for that. Be prepared to sit outside as there are not many tables inside. Also the bathrooms are only one stall and sometimes there’s a line.        The Nachos are to die for made with real cheese and enough to share with the entire table. I would suggest trying one of each taco but be aware if you don’t like spicy make sure to steer away from the \"hot\" side of the menu.",
        "ups": {
          "helpful": [
            "TedMosbey"
          ],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "tacos",
      "mexican"
    ],
    "images": [
      "images/tacos1.jpg",
      "images/tacos2.jpg"
    ]
  },
  {
    "name": "Frank Gastropub",
    "restaurantId": 6,
    "pricing": 8,
    "address": "6066 6th St. City, CA 90006",
    "reviews": [
      {
        "user": "LilyAldrin",
        "reviewId": 0,
        "rating": 5,
        "body": "I had the Veggie brat, and it was the best brat I’ve ever tasted. The bun was a perfect crispiness, the ingredients were fresh and plentiful, and it had a divine umami that rivaled pork (which wasn’t there), mostly from the caramelized mushrooms and artichoke leaves. Check the joint out.",
        "ups": {
          "helpful": [
            "MarshallEriksen"
          ],
          "witty": [],
          "harsh": []
        }
      },
      {
        "user": "MarshallEriksen",
        "reviewId": 1,
        "rating": 5,
        "body": "I’ve been to Gordon Ramsey’s burgers in Las Vegas. To me, the \"Black Sheep Burger\" tastes almost the same with their meat. It’s a high price for a smallish burger, but the price does match the quality. Ramsey’s burgers cost $15 while Black Sheep is $8, so... I think Black Sheep is better in this way.",
        "ups": {
          "helpful": [
            "LilyAldrin",
            "RobinSherbatsky",
            "TedMosbey"
          ],
          "witty": [],
          "harsh": []
        }
      },
      {
        "user": "LeonardoDicaprio",
        "reviewId": 2,
        "rating": 4,
        "body": "Looking for a delicious, juicy burger to satisfy your hunger? Black Sheep can help you solve that! Located right next to Cole’s, this restaurant is almost hidden due to its lack of signage and subtle entrance. However, the restaurant was pretty packed when we went, and it seems that locals are a frequent visitor at this gastropub!",
        "ups": {
          "helpful": [
            "RobinSherbatsky"
          ],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "brats",
      "sausages",
      "american",
      "burgers",
      "veggie"
    ],
    "images": [
      "images/beehive1.jpg",
      "images/beehive2.jpg",
      "images/beehive3.jpg"
    ]
  },
  {
    "name": "Garden Grove Bakery",
    "restaurantId": 7,
    "pricing": 9,
    "address": "7707 Garden Grove Blvd. Town, CA 90007",
    "reviews": [
      {
        "user": "TedMosbey",
        "reviewId": 0,
        "rating": "3",
        "body": "Pretty Decent cookies, but I'm not sure the price was worth it.",
        "ups": {
          "helpful": [
            "defaultUser"
          ],
          "witty": [],
          "harsh": []
        }
      }
    ],
    "tags": [
      "breakfast",
      "coffee",
      "bread",
      "cookies",
      "cakes",
      "sweets",
      "cafe",
      "bistro"
    ],
    "images": [
      "images/garden1.jpg",
      "images/garden2.jpg"
    ]
  }
]
