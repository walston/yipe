////////////////////////////
// KEYWORDS
////////////////////////////
// user, review, opinion, rating, body, text, copy, tag, flavors, notes
// restaurant, location, address, zipcode, site
// search, results, expand, filter, teaser, preview, feature, promo, roll
// flow, serving, appetizer, dish
// ///////////////////////////
// /////// OBJECT MAPS ///////
// ///////////////////////////
// {
//   name: 'name',
//   address: '9999 First St. City, CA 90001'
//   reviews: [
//     {
//       user: 'username',
//       rating: 3,
//       body: 'Lorem ipsum ...';
//     }
//   ],
//   tags: ['tag1','tag2','tag3'],
//   images: ['path/to/images.jpg']
// }

var LATIN = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat. Duis aute irure dolor in \
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in \
      culpa qui officia deserunt mollit anim id est laborum."

var Restaurants = [
  {
    name: 'Ionian Burger #1',
    address: '1001 First St. City, CA 90001',
    reviews: [
      {
        user: 'PhilArcadian',
        rating: 3,
        body: LATIN
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
        body: LATIN
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN
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
        body: LATIN
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
        body: LATIN
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN
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
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN
      },
      {
        user: 'TedMosbey',
        rating: 5,
        body: LATIN
      },
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN
      }
    ],
    tags: ['tacos','burritos','quesadillas','mexican'],
    images: ['images/taco.jpg']
  },
  {
    name: 'Corner Gastropub',
    address: '5055 5th St. City, CA 90005',
    reviews: [
      {
        user: 'PhilArcadian',
        rating: 5,
        body: LATIN
      },
      {
        user: 'TedMosbey',
        rating: 5,
        body: LATIN
      },
      {
        user: 'LeonardoDicaprio',
        rating: 4,
        body: LATIN
      }
    ],
    tags: ['tacos','burritos','quesadillas','mexican', 'american','burgers'],
    images: ['images/taco.jpg']
  }
]
