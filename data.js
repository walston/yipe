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
//   restaurant: restaurant.name // points to {restaurant},
//   rating: 1-5,
//   body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \
//         do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
//         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut \
//         aliquip ex ea commodo consequat. Duis aute irure dolor in \
//         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla \
//         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in \
//         culpa qui officia deserunt mollit anim id est laborum.',
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
