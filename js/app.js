var TABLE = document.getElementById('Table');
var me = 'defaultUser';
var lastServed = RESTAURANTS;

function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function makeLabel(text) {
  var span = document.createElement('span');
  span.className = 'label label-default';
  span.textContent = text;
  return span;
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

function vote(restaurantId, reviewId, tag, node) {
  var ballotBox = RESTAURANTS[restaurantId].reviews[reviewId].ups[tag];
  var i = ballotBox.indexOf(me)
  if (i < 0) {
    ballotBox.push(me);
  } else {
    ballotBox.splice(i, 1);
  }
  // refresh that particular spot
}

function serveResults(restaurants, results ) {

  function plate(restaurant) {
    var idealReview = _.max(restaurant.reviews, reviewRanking);
    var averageRating = Math.floor(_.reduce(restaurant.reviews, function (memo, value, index, list) {
        return memo + (value.rating / list.length);
      }, 0));
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
    var tagsContainer = document.createElement('p');
    var tags = _.map(restaurant.tags, makeLabel); // array of <span>label</span>

    dish.className = 'row';
    dish.setAttribute('data-id',restaurant);
    mediaLeft.className = 'hidden-xs col-sm-3 col-md-2';
    imageWrapper.className = 'em-top';
    image.className = 'img-responsive inline-block';
    image.src = restaurant.images[0];
    mediaBody.className = 'col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-9 col-md-10';
    nameLink.href = '#';
    rating.className = 'text-muted h4';
    author.className = 'text-muted h4';

    nameLink.textContent = restaurant.name;
    rating.textContent = averageRating + '★';
    author.textContent = idealReview.user;
    review.textContent = idealReview.body;

    nameLink.addEventListener('click', function () {
      // ### RED ALERT -- REFACTORING WILL BREAK THIS!!
      serveLocation(restaurant);
    });

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
    _.each(tags, function(tag) {
      tagsContainer.appendChild(tag);
      tagsContainer.appendChild(document.createTextNode(' '));
    });
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
    back.addEventListener('click', function () {
      serveResults(lastServed);
    });
    container.appendChild(back);
    return container;
  }

  function reviewElementer(review) {
    var restaurant = this; // passed in via _.map(x,x,[context])
    var container = document.createElement('div');
    var info = document.createElement('p');
    var author = document.createElement('span');
    var rating = document.createElement('span');
    var body = document.createElement('p');
    var upsContainer = document.createElement('p');
    var ups = _.mapObject(review.ups, function(voters, key){
      // ??????????????????????
      var label = makeLabel(key + ' (' + voters.length + ')');
      label.className = 'btn btn-xs btn-default clickable';
      label.setAttribute('data-method', 'vote');
      label.setAttribute('data-restaurantId', restaurant.restaurantId);
      label.setAttribute('data-reviewId', review.reviewId);
      label.setAttribute('data-tag', key);
      return label;
    });

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
    _.each( ups, function(label) {
      upsContainer.appendChild(label);
      upsContainer.appendChild(document.createTextNode(' '));
    });
    return container;
  }

  function mainCourse(restaurant) {
    var averageRating = Math.floor(_.reduce(restaurant.reviews, function (memo, value, index, list) {
        return memo + (value.rating / list.length);
      }, 0));
    var sortedReviews = _.sortBy(restaurant.reviews, reviewRanking);
    var card = document.createElement('div');
    var head = document.createElement('div');
    var name = document.createElement('h2');
    var rating = document.createElement('span');
    var info = document.createElement('div');
    var address = document.createElement('p');
    var tagsContainer = document.createElement('p');
    var tags = _.map(restaurant.tags, makeLabel);
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
    tags.forEach(function(tag) {
      tagsContainer.appendChild(tag);
      tagsContainer.appendChild(document.createTextNode(' '));
    });
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

serveResults(RESTAURANTS, undefined);
