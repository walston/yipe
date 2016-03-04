var LATIN = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat. Duis aute irure dolor in \
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in \
      culpa qui officia deserunt mollit anim id est laborum."
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
        body: LATIN,
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
        body: LATIN,
        ups: {
          helpful: ['PhilArcadian', 'RobinSherbatsky'],
          witty: [],
          harsh: ['BarneyStinson']
        }
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN,
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
        body: LATIN,
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
        body: LATIN,
        ups: {
          helpful: [],
          witty: [],
          harsh: ['BarneyStinson','LilyAldrin']
        }
      },
      {
        user: 'LilyAldrin',
        rating: 5,
        body: LATIN,
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN,
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
        body: LATIN,
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
          helpful: [],
          witty: ['TedMosbey'],
          harsh: ['BarneyStinson']
        }
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN,
        ups: {
          helpful: ['LeonardoDicaprio'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN,
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
        body: LATIN,
        ups: {
          helpful: ['MarshallEriksen'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'MarshallEriksen',
        rating: 5,
        body: LATIN,
        ups: {
          helpful: ['LilyAldrin'],
          witty: [],
          harsh: []
        }
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN,
        ups: {
          helpful: ['RobinSherbatsky'],
          witty: [],
          harsh: []
        }
      }
    ],
    tags: ['tacos','burritos','quesadillas','mexican', 'american','burgers'],
    images: ['images/tacos.jpg']
  }
]
