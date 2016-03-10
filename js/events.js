window.setInterval(check, 500);

document.body.addEventListener('click', function (e) {
  function parentWith(attribute, clicked) {
    for (looker = clicked;
      looker != document.body;
      looker = looker.parentNode) {
      if (looker.hasAttribute(attribute))
        return looker;
    }
    return clicked;
  }

  var target = parentWith('data-method', e.target);
  var method = target.getAttribute('data-method');

  if (method == 'vote') {
    var restaurantId = Number.parseInt(target.getAttribute('data-restaurantid'));
    var reviewId = Number.parseInt(target.getAttribute('data-reviewid'));
    var upsKey = target.getAttribute('data-key');
    vote(restaurantId, reviewId, upsKey);
    toggle(target, 'change');
  }
  else if (method == 'review') {
    toggle(document.getElementById('userReviewModal'), 'hidden');
  }
  else if (method == 'location') {
    serveLocation(RESTAURANTS[target.getAttribute('data-restaurantid')])
  }
  else if (method == 'results') {
    serveResults(lastServed);
  }
  else if (method == 'sort') {
    sortPlates(lastServed, target.getAttribute('data-sortmethod'));
  }
});

document.getElementById('search').addEventListener('submit', function (evt) {
  evt.preventDefault();
  var form = {
    query: _.filter(document.getElementById('query').value.split(/[\s,\.]+/), function(term) {
      return term.length > 0;
    }),
    near: _.filter(document.getElementById('location').value.split(/[\s,\.]+/), function(term) {
      return term.length > 0;
    })
  };
  var results = _.chain(RESTAURANTS).filter(byQuery).filter(byLocation).value();

  function byQuery(obj) {
    if (form.query.length == 0) return true;
    return _.some(form.query, function (term) {
      var query = new RegExp(term, 'i');
      return (query.test(obj.name) || obj.tags.some( function(tag){ return query.test(tag) }));
    })
  }
  function byLocation(obj) {
    if (form.near.length == 0) return true;
    return _.some(form.near, function (term) {
      var location = new RegExp(term, 'i');
      return (location.test(obj.address));
    })
  }
  serveResults(results, form);
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
  var i = RESTAURANTS.findIndex(function(restaurant){
    return restaurant.name == submission.name;
  });
  if (i >= 0) {
    RESTAURANTS[i].reviews.unshift(submission.reviews[0]);
    RESTAURANTS[i].tags = _.union(RESTAURANTS[i].tags, submission.tags);
  } else {
    RESTAURANTS.push(submission);
  }
  serveResults(RESTAURANTS);
  toggleClassName(document.getElementById('userReviewModal'), 'hidden');
});
