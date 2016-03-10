var TABLE = document.getElementById('Table');
var me = 'defaultUser';
var lastServed = RESTAURANTS;

function check() {
  var suspects = document.getElementsByClassName('change');
  for (i=0;i<suspects.length;i++){
    var suspect = suspects[i];
    if (suspect.getAttribute('data-method') == 'vote'){
      checkVotes(suspect);
    }
  }
}

function checkVotes (element) {
  var restaurant = RESTAURANTS[element.getAttribute('data-restaurantid')];
  var review = restaurant.reviews[element.getAttribute('data-reviewid')];
  var ups = review.ups[element.getAttribute('data-key')];
  redraw = (ups.length != element.getAttribute('data-value'));
  if (redraw){
    var newVotes = votes(restaurant, review);
    element.parentElement.parentElement.replaceChild(newVotes ,element.parentElement);
  }
}

function clear(element, parent) {
  if (parent != true){
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  } else {
    element.parentElement.removeChild(element);
  }
}

function reviewRanking(review) {
  helpfuls = review.ups['helpful'].length;
  wittys = review.ups['witty'].length;
  harshes = review.ups['harsh'].length;
  return ((helpfuls * 1.75) + wittys - harshes);
}

function toggle(element, value) {
  var classList = element.className.split(' ');
  var i = classList.indexOf(value);
  if ( i < 0 ) {
    classList.push(value);
  } else {
    classList.splice(i,1);
  }
  element.className = classList.join(' ');
}

function vote(restaurantId, reviewId, tag) {
  var ballotBox = RESTAURANTS[restaurantId].reviews[reviewId].ups[tag];
  var i = ballotBox.indexOf(me)
  if (i < 0) {
    ballotBox.push(me);
  } else {
    ballotBox.splice(i, 1);
  }
}

function votes(restaurant, review) {
  var container = document.createElement('p');
  container.setAttribute('data-model', 'votes');
  var buttons = _.map(review.ups, function(voters, key){
    var button = document.createElement('span');
    button.textContent = key + ' (' + voters.length + ')'
    if (voters.includes(me)) {
      button.className = 'btn btn-xs btn-success';
    } else{
      button.className = 'btn btn-xs btn-default';
    }
    button.setAttribute('data-method', 'vote');
    button.setAttribute('data-restaurantid', restaurant.restaurantId);
    button.setAttribute('data-reviewid', review.reviewId);
    button.setAttribute('data-key', key);
    button.setAttribute('data-value', voters.length);
    return button;
  });
  buttons.forEach(function(button) {
    container.appendChild(button);
    container.appendChild(document.createTextNode(' '));
  });

  return container;
}

function searchTag (query) {
  var input = document.getElementById('query');
  input.value = query;
  searchSubmit();
}

function tagMaker(terms) {
  var container = document.createElement('p');
  var buttons = _.map(terms, function(tag) {
    var button = document.createElement('span');
    button.textContent = tag;
    button.className = 'btn btn-xs btn-default';
    button.setAttribute('data-method', 'tag');
    button.setAttribute('data-value', tag);
    return button;
  })
  buttons.forEach(function(button) {
    container.appendChild(button);
    container.appendChild(document.createTextNode(' '));
  })
  return container;
}

function sortPlates(restaurants, sortMethod) {
  if (sortMethod == 'name') {
    var ordered = _.sortBy(restaurants, function(restaurant) {
      return restaurant.name.toLowerCase();
    });
    serveResults(ordered);
  } else if (sortMethod == 'rating') {
    var ordered = _.sortBy(restaurants, function(restaurant) {
      var averageRating = restaurantAverage(restaurant);
      return averageRating;
    });
    serveResults(ordered.reverse());
  }
}

function restaurantAverage (restaurant) {
  return _.reduce(restaurant.reviews, function (memo, value, index, list) {
      return memo + (value.rating / list.length);
    }, 0);
}

function serveResults(restaurants, results ) {

  function plate(restaurant) {
    var idealReview = _.max(restaurant.reviews, reviewRanking);
    var averageRating = Math.floor(restaurantAverage(restaurant));
    var dish = document.createElement('div');
    var mediaLeft = document.createElement('div');
    var imageWrapper = document.createElement('div');
    var image = document.createElement('img');
    var mediaBody = document.createElement('div');
    var name = document.createElement('h1');
    var nameLink = document.createElement('a');
    var rating = document.createElement('span');
    var author = document.createElement('span');
    var review = document.createElement('p');
    var tagsContainer = tagMaker(restaurant.tags);

    dish.className = 'row';
    mediaLeft.className = 'hidden-xs col-sm-3 col-md-2';
    imageWrapper.className = 'em-top';
    image.className = 'img-responsive inline-block';
    image.src = restaurant.images[0];
    mediaBody.className = 'col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-9 col-md-10';
    nameLink.href = '#';
    nameLink.setAttribute('data-restaurantid', restaurant.restaurantId);
    nameLink.setAttribute('data-method', 'location');
    rating.className = 'text-muted h4';
    author.className = 'text-muted h4';

    nameLink.textContent = restaurant.name;
    rating.textContent = averageRating + '★';
    author.textContent = idealReview.user;
    review.textContent = idealReview.body;

    dish.appendChild(mediaLeft);
    mediaLeft.appendChild(imageWrapper);
    imageWrapper.appendChild(image);
    dish.appendChild(mediaBody);
    mediaBody.appendChild(name);
    name.appendChild(nameLink);
    name.appendChild(document.createTextNode(' '));
    name.appendChild(rating);
    name.appendChild(document.createTextNode(' '));
    name.appendChild(author);
    mediaBody.appendChild(review);
    mediaBody.appendChild(tagsContainer);
    return dish;
  }

  function searchTerms(returned, terms, locations) {
    var queryTerms = document.createElement('h3');
    queryTerms.className = 'row text-muted';
    queryTerms.textContent =  'We found ' + (returned != 1? returned + ' places' : '1 place');
    if (terms.length > 0) {
      queryTerms.textContent += ' matching ' + _.map(terms, function(term) {
        return '\''+term+'\'';
      })
      .join(', ');
    }
    if (locations.length > 0) {
      queryTerms.textContent += ' near ' + locations.join(', ');
    }
    queryTerms.textContent += ':';
    return queryTerms;
  }

  var TABLE = document.getElementById('Table');
  clear(TABLE);
  if (results) {
    TABLE.appendChild(searchTerms(restaurants.length, results.query, results.near));
  }
  restaurants.forEach(function(restaurant) {
    TABLE.appendChild(plate(restaurant));
  });
  lastServed = restaurants;
}

function serveLocation(restaurant) {
  function localNav() {
    var container = document.createElement('div');
    var back = document.createElement('a');

    container.className = 'row em-bot';
    back.className = 'btn btn-primary';
    back.href = '#'
    back.textContent = '← Back'
    back.setAttribute('data-method', 'results');
    container.appendChild(back);
    return container;
  }

  function reviewElementer(review) {
    var restaurant = this; // passed in via _.map(x,x,[context]) ?? do we still need this??
    var container = document.createElement('div');
    var info = document.createElement('p');
    var author = document.createElement('span');
    var rating = document.createElement('span');
    var body = document.createElement('p');
    var upsContainer = votes(restaurant, review);

    container.className = 'em-bot';
    author.className = 'h4 text-muted';
    rating.className = 'h4 text-muted';

    author.textContent = review.user;
    rating.textContent = review.rating + '★';
    body.textContent = review.body;

    container.appendChild(info);
    info.appendChild(author);
    info.appendChild(document.createTextNode(' '));
    info.appendChild(rating);
    container.appendChild(body);
    container.appendChild(upsContainer);
    return container;
  }

  function mainCourse(restaurant) {
    var averageRating = Math.floor(restaurantAverage(restaurant));
    var sortedReviews = _.sortBy(restaurant.reviews, reviewRanking);
    var card = document.createElement('div');
    var head = document.createElement('div');
    var name = document.createElement('h2');
    var rating = document.createElement('span');
    var info = document.createElement('div');
    var address = document.createElement('p');
    var tagsContainer = tagMaker(restaurant.tags);
    var imageContainer = document.createElement('div');
    var images = _.map(restaurant.images, function(path) {
      var image = document.createElement('img')
        image.className = 'img-responsive thumbnail col-xs-2';
        image.src = path;
        return image;
      });
    var reviewsContainer = document.createElement('div');
    var reviews = _.map(sortedReviews, reviewElementer, restaurant);

    card.className = 'row';
    head.className = 'container';
    name.className = 'row';
    rating.className = 'text-muted';
    info.className = 'row';
    address.className = 'text-info';
    tagsContainer.className = 'row';
    imageContainer.className = 'row';

    name.textContent = restaurant.name;
    rating.textContent = averageRating + '★';
    address.textContent = restaurant.address;

    card.appendChild(head);
    head.appendChild(name);
    name.appendChild(document.createTextNode(' '));
    head.appendChild(info);
    info.appendChild(address);
    head.appendChild(tagsContainer);
    head.appendChild(imageContainer);
    images.forEach(function(image){
      imageContainer.appendChild(image);
      imageContainer.appendChild(document.createTextNode(' '));
    });
    card.appendChild(reviewsContainer);
    reviews.forEach(function(review) {
      reviewsContainer.appendChild(review);
    });
    return card;
  }

  TABLE = document.getElementById('Table');
  clear(TABLE);
  TABLE.appendChild(localNav());
  TABLE.appendChild(mainCourse(restaurant));
}

function searchSubmit() {
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
}

function reviewSubmit() {

  function cleanTags(string) {
    tags = string.split(/\s*,\s*/ig);
    tags = _.map(tags, function(string){
      return string.toLowerCase();
    });
    tags = _.compact(tags);
    return _.uniq(tags);
  }

  var submission = {
    name: document.getElementById('restaurant').value,
    restaurantId: 0,
    address: document.getElementById('address').value,
    reviews: [{
      user: 'defaultUser',
      reviewId: 0,
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

  var i = RESTAURANTS.findIndex(function(restaurant){
    return restaurant.name == submission.name;
  });
  if (i >= 0) {
    submission.reviews[0].reviewId == RESTAURANTS[i].reviews.length;
    RESTAURANTS[i].reviews.push(submission.reviews[0]);
    RESTAURANTS[i].tags = _.union(RESTAURANTS[i].tags, submission.tags);
  } else {
    submission.restaurantId = RESTAURANTS.length;
    RESTAURANTS.push(submission);
  }
  serveResults(RESTAURANTS);
  toggle(document.getElementById('userReviewModal'), 'hidden');
}

serveResults(RESTAURANTS, undefined);
