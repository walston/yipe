var User = {
  PhilArcadian: 'PhilArcadian',
  LeonardoDicaprio: 'LeonardoDicaprio',
  TedMosbey: 'TedMosbey',
  LilyAldrin: 'LilyAldrin',
  MarshallEriksen: 'MarshallEriksen',
  RobinSherbatsky: 'RobinSherbatsky',
  BarneyStinson: 'BarneyStinson'
}

var Restaurants = [
  {
    name: 'Ionian Burger #1',
    address: '1001 First St. City, CA 90001',
    reviews: [
      {
        user: 'PhilArcadian',
        rating: 3,
        body: 'Burger places appear to be the new "thing" because I am starting to see one pop up on every corner.  I don’t mind at all though and hope they stick around because I personally love poke!  It reminds me of happy island vacation in Hawaii times.\
        \
        I was going to Turner’s and noticed this place next door. At 2pm on a Friday, there was a decent amount of people inside, and with a good 400+ reviews on Yelp, I figured it would be reliable. I try to do a legit scan of Yelp reviews prior to going to a poke restaurant because poke is consumed raw and I’m guessing comes with a high risk of food poisoning.\
        \
        The poke here was fresh but I didn’t like how the ingredients came separate because it was hard to eat everything together.  Also, the choices are more limited as you can only choose between tuna and salmon, so no scallops or octopus which is usually my go-to.  I got tuna with the spicy sauce, cucumber salad and a $1 additional for avocado. It came with one scoop of seaweed salad as well as one scoop of imitation crab. The taste of the crab and the taste of the sweet seaweed salad didn’t blend well together but they were right next to each other. Also, the poke was a little dry even with the spicy sauce but I tried my best to blend the ingredients within the box. Hubby got the classic soy sauce and the poke for me was too salty. \
        \
        Overall, not bad, but with so many great places, the competition is stiff! Out of all of the poke places I’ve tried... I would rate this place 3 stars!',
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      }
    ],
    tags: ['burgers','american','greek'],
    images: ['images/burger.jpg']
  },
  {
    name: 'Burger King',
    address: '222 2nd St. City, CA 90002',
    reviews: [
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: 'For burgers, I’m puzzled as to why it took so long to execute orders--they had a considerably large staff working dinner service but I felt like everyone was waiting about 15-20 minutes for their food. I couldn’t think of one person they didn’t say "sorry, thank you for waiting." I don’t understand what the underlying issue is, but they need to fix it because you could just sense the hangriness building up in the room.',
        ups: {
          helpful: ['PhilArcadian', 'RobinSherbatsky'],
          witty: [],
          harsh: ['BarneyStinson']
        }
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: 'Really cool place! Nice atmosphere with plenty of seating. Got seated relatively fast, it was pretty packed on a Sunday afternoon.',
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      }
    ],
    tags: ['burgers','american'],
    images: ['images/burger.jpg']
  },
  {
    name: 'McDonald\'s',
    address: '333 3rd St. City, CA 90003',
    reviews: [
      {
        user: 'LeonardoDicaprio',
        rating: 1,
        body: 'Had an amazing classic burger with egg and caramelized onion , and a tasty magic shroom with cheddar cheese instead of the goat cheese.\
        We tried a the truffle fries and was just great\
        Next time I will try their shakes, they seem very tasty',
        ups: {
          helpful: [],
          witty: ['TedMosbey'],
          harsh: []
        }
      }
    ],
    tags: ['burgers','american'],
    images: ['images/burger.jpg']
  },
  {
    name: 'Cretian Burger #4',
    address: '4044 4th St. City, CA 90004',
    reviews: [
      {
        user: 'TedMosbey',
        rating: 1,
        body: 'The burgers were flavorless and way over cooked. There was almost no chili on the Terlingua burger, and my son was unable to eat his normal burger because it was over cooked and over salted. The shakes were not good either: the chocolate one had a weird coconut taste and the salted caramel one was more whipped cream than milkshake.',
        ups: {
          helpful: [],
          witty: [],
          harsh: ['BarneyStinson','LilyAldrin']
        }
      },
      {
        user: 'LilyAldrin',
        rating: 5,
        body: 'Ordered a kobe burger with lettuce, tomato, grilled onions, and I added cheddar cheese. Beef had a good char-grilled flavor to it and not overly seasoned. The aioli on the burger was good. Overall, the burger was really good, I could tell all burger ingredients were of high quality, however, it was not one of my favorites. It didn’t compare to Green2Go, Hoppdoddy or Eureka. So, I guess I would say it was fourth on my list of natural burgers.',
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: 'Overall, the burger is good. My meat was a little too well done. It tasted good. The restaurant is new and perhaps the crafting of the sandwich will get better as time goes on.',
        ups: {
          helpful: ['LilyAldrin'],
          witty: ['TedMosbey','RobinSherbatsky','MarshallEriksen'],
          harsh: []
        }
      }
    ],
    tags: ['burgers','american','greek', 'italian'],
    images: ['images/burger.jpg']
  },
  {
    name: 'Cinqos Tacos',
    address: '5055 5th St. City, CA 90005',
    reviews: [
      {
        user: 'MarshallEriksen',
        rating: 5,
        body: 'Some really great tacos!  I tried the chicken, carnitas, and fish and all were awesome.  They have their "house" sauce which they add which is really amazing.\
        \
        Horrible to park and be very careful...there’s a guy patrolling the nearby lot and will tow you...street parking is the only way to go (or walking/biking of course).\
        \
        Quick, reasonable and pretty tasty.  I’ll be back!',
        ups: {
          helpful: ['LeonardoDicaprio','LilyAldrin','RobinSherbatsky'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'TedMosbey',
        rating: 5,
        body: 'While Cinquos Tacquos may be delicious, the chicken \
        tastes just like the kitchen *cinq* ;D',
        ups: {
          helpful: ['RobinSherbatsky','LilyAldrin','LeonardoDicaprio','PhilArcadian','MarshallEriksen'],
          witty: ['TedMosbey'],
          harsh: ['BarneyStinson']
        }
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: 'We’ve been to the location in Huntington Beach several times so we though we’d try the second location in Newport Beach.  This was a real disappointment, especially since we’ve always had good food at the main location.',
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: 'Best tacos in Orange County. A bit pricey for what you get but the scenery makes up for that. Be prepared to sit outside as there are not many tables inside. Also the bathrooms are only one stall and sometimes there’s a line.\
        The Nachos are to die for made with real cheese and enough to share with the entire table. I would suggest trying one of each taco but be aware if you don’t like spicy make sure to steer away from the "hot" side of the menu.',
        ups: {
          helpful: ['TedMosbey'],
          witty: [],
          harsh: []
        }
      }
    ],
    tags: ['tacos','burritos','quesadillas','mexican'],
    images: ['images/tacos.jpg']
  },
  {
    name: 'Corner Gastropub',
    address: '5055 5th St. City, CA 90005',
    reviews: [
      {
        user: 'LilyAldrin',
        rating: 5,
        body: 'I had the Veggie Burrito, and it was the best burrito I’ve ever tasted.\
        \
        The tortilla was a perfect crispiness, the ingredients were fresh and plentiful, and it had a divine creaminess that rivaled cheese (which wasn’t there), mostly from the caramelized mushrooms and artichoke leaves, in addition to the Spinach and perfectly textured pinto beans.\
        \
        Check the joint out.',
        ups: {
          helpful: ['MarshallEriksen'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'MarshallEriksen',
        rating: 5,
        body: 'Best tacos I’ve had in my life. I ate here twice while on vacation in Newport Beach. The first time was for dinner. I had the OG and an order of chips and salsa. Obviously home made tortilla chips and excellent salsa. We also stopped in for breakfast the day we left town. Best breakfast tacos I’ve had ever, hands down.  If I lived near Sanchos I’d be a regular. Not a huge menu, but I think that’s good, they sell what they are good at, nothing more.',
        ups: {
          helpful: ['LilyAldrin'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: 'The OG tacos just blew my mind...one of the best tacos I’ve had to date...well played Sancho!',
        ups: {
          helpful: ['RobinSherbatsky'],
          witty: [],
          harsh: []
        }
      }
    ],
    tags: ['tacos','burritos','quesadillas','mexican', 'american','burgers'],
    images: ['images/tacos.jpg','images/sushi.jpg','images/burger.jpg']
  }
];
