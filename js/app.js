var TABLE = document.getElementById('Table');
var CRAVINGS = document.getElementById('cravings');
var me = 'defaultUser';
var lastServed = database;

/////////////////////////////
//******* DOM Getters *******
/////////////////////////////

function searchSubmit() {
  var form = {
    query: _.filter(document.getElementById('query').value.split(/[\s,\.]+/), function(term) {
      return term.length > 0;
    }),
    location: _.filter(document.getElementById('location').value.split(/[\s,\.]+/), function(term) {
      return term.length > 0;
    })
  };
  var results = _.chain(database).filter(byQuery).filter(byLocation).value();

  function byQuery(obj) {
    if (form.query.length == 0) return true;
    return _.some(form.query, function (term) {
      var query = new RegExp(term, 'i');
      return (query.test(obj.name) || obj.tags.some( function(tag){ return query.test(tag) }));
    })
  }

  function byLocation(obj) {
    if (form.location.length == 0) return true;
    return _.some(form.location, function (term) {
      var location = new RegExp(term, 'i');
      return (location.test(obj.address));
    })
  }

  if (form.query.length > 0 || form.location.length > 0) {
    CRAVINGS.setAttribute('data-queried', 'true');
  } else {
    CRAVINGS.removeAttribute('data-queried');
  }
  serveResults(results, form);
}

function reviewSubmit() {
  var submission = {
    "name": document.getElementById('restaurant').value,
    "restaurantId": 0,
    "pricing": _.random(1, 10),
    "address": document.getElementById('address').value,
    "reviews": [{
      "user": 'defaultUser',
      "reviewId": 0,
      "rating": document.getElementById('rating').value,
      "body": document.getElementById('reviewBody').value,
      "ups": {
        "helpful": [],
        "witty": [],
        "harsh": []
      }
    }],
    "tags": cleanTags(document.getElementById('tags').value),
    "images": ['images/generic1.jpg', 'images/generic2.jpg']
  };

  var i = database.findIndex(function(restaurant){
    return restaurant.name.toLowerCase() == submission.name.toLowerCase();
  });
  if (i >= 0) {
    submission.reviews[0].reviewId = database[i].reviews.length;
    database[i].reviews.push(submission.reviews[0]);
    database[i].tags = _.union(database[i].tags, submission.tags);
  } else {
    submission.restaurantId = database.length;
    database.push(submission);
  }
  serveResults(database);
  toggle(document.getElementById('userReviewModal'), 'hidden');
}

function check() {
  var suspects = document.getElementsByClassName('change');
  for (i = 0; i < suspects.length; i++){
    var suspect = suspects[i];
    if (suspect.getAttribute('data-method') == 'vote'){
      checkVotes(suspect);
    }
  }
}

function checkVotes(element) {
  var restaurant = database[element.getAttribute('data-restaurantid')];
  var review = restaurant.reviews[element.getAttribute('data-reviewid')];
  var ups = review.ups[element.getAttribute('data-key')];
  redraw = (ups.length != element.getAttribute('data-value'));
  if (redraw){
    var newVotes = votes(restaurant.restaurantId, review);
    element.parentElement.parentElement.replaceChild(newVotes, element.parentElement);
  }
}

/////////////////////////////
//****** DOM Builders *******
/////////////////////////////

function receipt(returned, terms, locations) {
  if (CRAVINGS.getAttribute('data-queried') == 'true') {
    var queryTerms = document.createElement('span');
    queryTerms.classList.add('h4', 'text-muted');
    queryTerms.textContent =  'We found ' + (returned != 1 ? returned + ' places' : '1 place');
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
  } else {
    return document.createElement('br')
  }
}

function votes(restaurantId, review) {
  var container = document.createElement('p');
  container.setAttribute('data-model', 'votes');
  var buttons = _.map(review.ups, function(voters, key){
    var button = document.createElement('span');
    button.textContent = key + ' (' + voters.length + ')'
    if (voters.includes(me)) {
      button.classList.add('btn', 'btn-xs', 'btn-success');
    } else{
      button.classList.add('btn', 'btn-xs', 'btn-default');
    }
    button.setAttribute('data-method', 'vote');
    button.setAttribute('data-restaurantid', restaurantId);
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

function itemTags(terms) {
  var container = document.createElement('p');
  var buttons = _.map(terms, function(tag) {
    var button = document.createElement('span');
    button.textContent = tag;
    button.classList.add('btn', 'btn-xs', 'btn-default');
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

function itemTitle(restaurant) {
  var averageRating = Math.floor(restaurantAverage(restaurant));
  var displayPricing = (restaurant.pricing / 5) + 1;

  var container = document.createElement('h2');
  var name = document.createElement('span');
  var rating = ratingSymbols(averageRating, '★', 'label label-danger');
  var pricing = ratingSymbols(displayPricing, '$', 'label label-success');

  name.textContent = restaurant.name;
  name.classList.add('h3', 'clickable');
  name.setAttribute('data-restaurantid', restaurant.restaurantId);
  name.setAttribute('data-method', 'location');
  rating.classList.add('h6');
  pricing.classList.add('h6');

  container.appendChild(name);
  container.appendChild(document.createTextNode(' '));
  container.appendChild(pricing);
  container.appendChild(document.createTextNode(' '));
  container.appendChild(rating);
  container.appendChild(document.createTextNode(' '));

  return container;
}

function itemReviews(restaurant) {
  var sortedReviews = _.sortBy(restaurant.reviews, reviewRanking);
  var container = document.createElement('div');
  var reviews = sortedReviews.forEach(function (review) {
    container.appendChild(itemReview(review, restaurant.restaurantId));
  })
  return container;
}

function itemReview(review, restaurantId) {
  var container = document.createElement('p');
  var author = document.createElement('span');
  var rating = document.createElement('span');
  var body = document.createElement('p');
  if (restaurantId != undefined) {
    var ups = votes(restaurantId, review);
  }

  container.classList.add('en-top');
  author.classList.add('h5', 'text-primary');
  rating.classList.add('text-muted');

  author.textContent = review.user;
  rating.textContent = review.rating + '★';
  body.textContent = review.body;

  container.appendChild(author);
  container.appendChild(document.createTextNode(' '))
  container.appendChild(rating);
  container.appendChild(body);
  if (ups) {
    container.appendChild(ups);
  }
  return container;
}

function menuItem(restaurant) {
  var idealReview = _.max(restaurant.reviews, reviewRanking);

  var container = document.createElement('div');
  var mediaLeft = document.createElement('div');
  var imageWrapper = document.createElement('div');
  var image = document.createElement('img');
  var mediaBody = document.createElement('div');
  var name = itemTitle(restaurant);
  var review = itemReview(idealReview);
  var tags = itemTags(restaurant.tags);

  container.classList.add('row');
  mediaLeft.classList.add('hidden-xs', 'col-sm-3', 'col-md-2');
  imageWrapper.classList.add('em-top');
  image.classList.add('img-responsive', 'inline-block');
  image.src = restaurant.images[0];
  mediaBody.classList.add('col-xs-10', 'col-xs-offset-1', 'col-sm-offset-0', 'col-sm-9', 'col-md-10');


  container.appendChild(mediaLeft);
  mediaLeft.appendChild(imageWrapper);
  imageWrapper.appendChild(image);
  container.appendChild(mediaBody);
  mediaBody.appendChild(name);
  mediaBody.appendChild(review);
  mediaBody.appendChild(tags);

  return container;
}

function localNav() {
  var container = document.createElement('div');
  var back = document.createElement('a');

  container.classList.add('row', 'em-bot');
  back.classList.add('btn', 'btn-primary');
  back.href = '#'
  back.textContent = '← Back'
  back.setAttribute('data-method', 'results');
  container.appendChild(back);
  return container;
}

function mainCourse(restaurant) {
  var averageRating = Math.floor(restaurantAverage(restaurant));
  var displayPricing = (restaurant.pricing / 5) + 1;
  var card = document.createElement('div');
  var head = document.createElement('div');
  var name = itemTitle(restaurant);
  var info = document.createElement('div');
  var address = document.createElement('p');
  var tags = itemTags(restaurant.tags);
  var imageContainer = document.createElement('div');
  var images = _.map(restaurant.images, function(path) {
    var image = document.createElement('img')
      image.classList.add('img-responsive', 'thumbnail', 'col-xs-2');
      image.src = path;
      return image;
    });
  var reviews = itemReviews(restaurant);

  card.classList.add('row');
  name.classList.add('row');
  head.classList.add('container');
  info.classList.add('row');
  address.classList.add('text-info');
  tags.classList.add('row');
  imageContainer.classList.add('row');

  address.textContent = restaurant.address;

  card.appendChild(head);
  head.appendChild(name);
  head.appendChild(info);
  info.appendChild(address);
  head.appendChild(tags);
  head.appendChild(imageContainer);
  images.forEach(function(image){
    imageContainer.appendChild(image);
    imageContainer.appendChild(document.createTextNode(' '));
  });
  card.appendChild(reviews);
  return card;
}

function ratingSymbols(repetitions, character, classNames){
  var container = document.createElement('span');
  for (var i = 0; i < repetitions; i++) {
    var item = document.createElement('span');
    classNames.split(' ').forEach(function(className) {
      item.classList.add(className);
    })
    item.textContent = character;
    container.appendChild(item);
    container.appendChild(document.createTextNode(' '));
  }
  return container;
}

/////////////////////////////
//******* DOM Putters *******
/////////////////////////////

function clear(element, parent) {
  if (parent){
    element.parentElement.removeChild(element);
  } else {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

function toggle(element, value) {
  if (element.classList.contains(value)) {
    element.classList.remove(value);
  } else {
    element.classList.add(value);
  }
}

function tagSearch(query) {
  var input = document.getElementById('query');
  input.value = query;
  searchSubmit();
}

function serveResults(database, results) {
  if (!results) {
    results = {
      query: '',
      location: ''
    }
  }
  clear(TABLE);
  serveCravings(receipt(database.length, results.query, results.location));
  if (database.length == 0) {
    var noResults = document.createElement('img');
    noResults.classList.add('col-xs-8', 'col-xs-offset-2', 'em-top');
    noResults.src = 'images/nothing.svg';
    noResults.setAttribute('alt', 'Nothing found...');
    TABLE.appendChild(noResults);
  } else {
    database.forEach(function(restaurant) {
      TABLE.appendChild(menuItem(restaurant));
    });
  }
  lastServed = database;
}

function serveLocation(restaurant) {
  TABLE = document.getElementById('Table');
  clear(TABLE);
  serveCravings(localNav());
  TABLE.appendChild(mainCourse(restaurant));
}

function serveCravings(element) {
  clear(CRAVINGS);
  CRAVINGS.appendChild(element);
}

/////////////////////////////
//**** Database Handlers ****
/////////////////////////////

function vote(restaurantId, reviewId, tag) {
  var ballotBox = database[restaurantId].reviews[reviewId].ups[tag];
  var i = ballotBox.indexOf(me)
  if (i < 0) {
    ballotBox.push(me);
  } else {
    ballotBox.splice(i, 1);
  }
}

function reviewRanking(review) {
  helpfuls = review.ups['helpful'].length;
  wittys = review.ups['witty'].length;
  harshes = review.ups['harsh'].length;
  return ((helpfuls * 1.75) + wittys - harshes);
}

function sortPlates(database, sortMethod) {
  if (sortMethod == 'name') {
    var ordered = _.sortBy(database, function(restaurant) {
      return restaurant.name.toLowerCase();
    });
    serveResults(ordered);
  } else if (sortMethod == 'rating') {
    var ordered = _.sortBy(database, function(restaurant) {
      return restaurantAverage(restaurant);
    });
    serveResults(ordered.reverse());
  } else if (sortMethod == 'price') {
    var ordered = _.sortBy(database, function(restaurant) {
      return restaurant.pricing;
    });
    serveResults(ordered)
  }
}

/////////////////////////////
//**** Helper Functions *****
/////////////////////////////

function cleanTags(string) {
  tags = string.split(/\s*,\s*/ig);
  tags = _.map(tags, function(string){
    return string.toLowerCase();
  });
  tags = _.compact(tags);
  return _.uniq(tags);
}

function restaurantAverage (restaurant) {
  return _.reduce(restaurant.reviews, function (memo, value, index, list) {
      return memo + (value.rating / list.length);
    }, 0);
}

serveResults(database);
