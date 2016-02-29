/*//////////////////////////
// KEYWORDS
////////////////////////////
user, review, opinion, rating, body, text, copy, tag, flavors, notes
restaurant, location, address, zipcode, site
search, results, expand, filter, teaser, preview, feature, promo, roll
flow, serving, appetizer, dish
/*/////////////////////////
/////// OBJECT MAPS ///////
///////////////////////////
// var user = {
//   name: ' ... '         // unique id
//   zipcode: ' ZIP '     // user zipcode
//   reviews: [ {review}, {review}, ... ] // points to reviews
// }
// var review = {
//   user: user.name // points to {user},
//   id: ' ...hash... '
//   restaurant: restaurant.name // points to {restaurant},
//   rating: 1-5,
//   body: 'Lorem ipsum dolor sit ... ',
//   tags: ['tacos', 'pizza', 'burgers', ... ],
//   teaser: this.body.firstTwoSentences(),
//   image: 'url/to/image.jpg'
// }
// var restaurant = {
//   name: ' ... ',
//   address: ' 111 Address Rd. City CA 90001 ',
//   reviews: [ {review}, {review}, ... ], // points to reviews
//   rating: reviews.reduce( reviews.rating/total ),
//   images: [ jpg, png, ... ] // points to review[s].images
// }
// var roll = [
//   var snippet(restaurant) = {
//     title: review.restaurantName,
//     rating: review.rating,
//     preview: review.teaser
//     // , OPTIONAL!
//     image: review.image
//   }
// ]
var LATIN = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \
      do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
      aliquip ex ea commodo consequat. Duis aute irure dolor in \
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in \
      culpa qui officia deserunt mollit anim id est laborum."

var Reviews = [
  {
    user: 'PhillipArce',
    id: '00000001',
    restaurant: "Pho 111",
    rating: 5,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/pho.jpg'
  },
  {
    user: 'AdrianKipauldi',
    id: '00000002',
    restaurant: "Ionian Burger 2",
    rating: 4,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/burger.jpg'
  },
  {
    user: 'PhillipArce',
    id: '00000003',
    restaurant: "Tres Tacos",
    rating: 5,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/tacos.jpg'
  },
  {
    user: 'LeonardoDiCaprio',
    id: '00000004',
    restaurant: "Bad Luck Sushi Four",
    rating: 2,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/sushi.jpg'
  },
  {
    user: 'AdrianKipauldi',
    id: '00000005',
    restaurant: "Panera Bread #555",
    rating: 4,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/panini.jpg'
  },
  {
    user: 'LeonardoDiCaprio',
    id: '00000006',
    restaurant: "Ionian Burger 2",
    rating: 5,
    body: LATIN,
    tags: ['food', '...'],
    image: 'images/burger2.jpg'
  }
]
