var roll = document.getElementById('roll');

var toggleClassName = function (el, value) {
  var classList = el.className.split(' ');
  var i = classList.indexOf(value);
  if ( i < 0 ) {
    classList.push(value);
  } else {
    classList.splice(i,1);
  }
  el.className = classList.join(' ');
}
var el = function ( tag, parent, classes ) {
  var node = document.createElement(tag);
  if (classes) { node.className = classes; }
  parent.appendChild(node)
  return node;
}
var txt = function ( content, parent ) {
  var node = document.createTextNode(content);
  parent.appendChild(node);
  return node;
}
var serveResults = function ( parent, restaurants ) {
  // clear out any results
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  restaurants.forEach(function(restaurant) {
    restaurant.reviews.ideal = (function () {
      return _.max(restaurant.reviews, function (review) {
        return (review.ups['helpful'].length + review.ups['witty'].length);
      });
    })();
    restaurant.rating = (function () {
      var ratings = _.map(restaurant.reviews, function (review) {
        return review.rating;
      });
      var average = Math.floor(_.reduce(ratings,
        function (s, j) { return s + j; }) / ratings.length);

      return average;
    })();
    var item = el('div', roll, 'row');
    var mediaLeft = el('div', item, 'hidden-xs col-sm-3 col-md-2');
    var imageWrapper = el('div', mediaLeft, 'h1');
    var image = el('img', imageWrapper, 'img-responsive inline-block');
        image.src = restaurant.images[0];
    var mediaBody = el('div', item, 'col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-9 col-md-10');
    var name = el('h1', mediaBody, 'h2');
               txt(restaurant.name, name);
               txt(' ', name);
    var rating = el('span', name, 'text-muted h4');
               txt(restaurant.rating+'☆', rating);
               txt(' ', name);
    var author = el('span', name, 'text-muted h4');
               txt(restaurant.reviews.ideal.user, author);
    var review = txt(restaurant.reviews.ideal.body, mediaBody);
    var tags = el('p', mediaBody);
    restaurant.tags.forEach( function (tag, i){
      var tagElement = el('span', this, 'text-info tag');
      txt(tag, tagElement)
      txt(' ', this);
    }, tags);
  })
}

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

serveResults(document.getElementById('roll'), Restaurants);
