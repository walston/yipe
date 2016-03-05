document.getElementById('search').addEventListener('submit', function (evt) {
  evt.preventDefault();
  var searchResults = Restaurants.filter(byQuery).filter(byLocation);

  function byQuery(obj) {
    var queryTerms = document.getElementById('query').value.split(/[\s,\.]+/);
    return queryTerms.some(function (term) {
      var query = new RegExp(term, 'i');
      return (query.test(obj.name) || obj.tags.some( function(tag){ return query.test(tag) }));
    })
  }
  function byLocation(obj) {
    var locationTerms = document.getElementById('location').value.split(/[\s,\.]+/);
    return locationTerms.some(function (term) {
      var location = new RegExp(term, 'i');
      return (location.test(obj.address));
    })
  }

  serveResults(roll, searchResults);
})
document.getElementById('review').addEventListener('submit', function  (evt) {
  evt.preventDefault();
  var submission = {
    name: document.getElementById('restaurant').value,
    address: document.getElementById('address').value,
    reviews: [{
      user: 'defaultUser',
      rating: document.getElementById('rating').value,
      body: document.getElementById('reviewBody').value,
      ups: {
        helpful: [],
        witty: [],
        harsh: []
      }
    }],
    tags: cleanTags(document.getElementById('tags').value),
    images: document.getElementById('image').src
  };
  function cleanTags(string) {
    tags = string.split(/\s*,\s*/ig);
    tags = _.map(tags, function(string){
      return string.toLowerCase();
    });
    tags = _.compact(tags);
    return _.uniq(tags);
  }
  var i = Restaurants.findIndex(function(restaurant){
    return restaurant.name == submission.name;
  });
  if (i >= 0) {
    Restaurants[i].reviews.unshift(submission.reviews[0]);
    Restaurants[i].tags = _.union(Restaurants[i].tags, submission.tags);
  } else {
    Restaurants.push(submission);
  }
  serveResults(document.getElementById('roll'), Restaurants);
  toggleClassName(document.getElementById('userReviewModal'), 'hidden');
});

document.getElementById('userReviewButton').addEventListener('click', function () {
  toggleClassName(document.getElementById('userReviewModal'), 'hidden');
});
document.getElementById('userReviewCancelButton').addEventListener('click', function () {
  toggleClassName(document.getElementById('userReviewModal'), 'hidden');
});
