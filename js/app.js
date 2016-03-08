var TABLE = document.getElementById('Table');
var me = 'defaultUser';
var lastServed = Restaurants;

var clear = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

var toggle = function (el, value) {
  var classList = el.className.split(' ');
  var i = classList.indexOf(value);
  if ( i < 0 ) {
    classList.push(value);
  } else {
    classList.splice(i,1);
  }
  el.className = classList.join(' ');
}

/////////////////////////////////////////////
//// GET RID OF THESE NAMES & FIX THEM //////
/////////////////////////////////////////////
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
/////////////////////////////////////////////
/////////////////////////////////////////////

var serveResults = function(restaurants, results ) {
  // FUNCTION DEFINITIONS =====================
  // return a string for search results header
  function searchTerms(returned, terms, locations) {
    var queryTerms = document.createElement('h3');
    queryTerms.className = 'row text-muted';
    queryTerms.textContent =  'We found ' + (returned != 1? returned + ' places' : '1 place');
    if (terms.length > 0) {
      queryTerms.textContent += ' matching ' + _.map(terms, function(term) {
        // wrap all the query terms in quote marks
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
  function plate(restaurant) {

    function reviewRanking(review) {
      helpfuls = review.ups['helpful'].length;
      wittys = review.ups['witty'].length;
      harshes = review.ups['harsh'].length;
      return ((helpfuls * 1.75) + wittys - harshes);
    }

    function makeLabel(text) {
      var span = document.createElement('span');
      span.className = 'label label-default';
      span.textContent = text;
      return span;
    }
    var idealReview = _.max(restaurant.reviews, reviewRanking);
    // var allRatings = _.map(restaurant.reviews, function(review){
    //   return review.rating;
    // });
    // var averageRating = Math.floor(_.reduce(restaurant.reviews, function (sum, index) {
    //     return sum + index;
    //   }) / allRatings.length);
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
      serveLocation(TABLE, Restaurants[i]);
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
  // EXECUTION ================================
  var TABLE = document.getElementById('Table');
  clear(TABLE);

  if (results) {
    TABLE.appendChild(searchTerms(restaurants.length, results.query, results.near));
  }
  _.each(restaurants, function(restaurant) {
    TABLE.appendChild(plate(restaurant));
  });

  lastServed = restaurants;
}
var serveLocation = function ( parent, restaurant ) {
  clear(parent);
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
  var localNav = el('div', parent, 'row em-bot');
    localNav.backbutton = el('a', localNav, 'btn btn-primary');
    localNav.backbutton.href = '#';
    localNav.backbutton.content = txt('← Back', localNav.backbutton)
    localNav.backbutton.addEventListener('click', function(){ serveResults( TABLE, lastServed ); });
  var card = el('div', parent, 'row em-top');
    card.head = el('div', card, 'col-xs-12');
    card.head.name = el('h2', card.head);
    card.head.name.text = txt(restaurant.name, card.head.name);
    card.head.name.spacing = txt(' ', card.head.name);
    card.head.rating = el('span', card.head.name, 'text-muted');
    card.head.rating.text = txt(restaurant.rating+'★', card.head.rating);
    card.head.info = el('div', card.head);
    card.head.info.address = el('p', card.head.info, 'text-info');
    card.head.info.address.text = txt(restaurant.address, card.head.info.address);
    card.head.info.tags = el('p', card.head.info, 'en-top');
    _.each(restaurant.tags, function (tag, i){
      var tagElement = el('span', this, 'label label-default');
      txt(tag, tagElement)
      txt(' ', this);
    }, card.head.info.tags);
    card.head.imagery = el('div', card.head);
    _.each(restaurant.images, function(path, i) {
      var image = el('img', this, 'img-responsive thumbnail col-xs-2');
       image.src = path;
    }, card.head.imagery);
    card.reviews = el('div', card, 'row en-top');
    _.each(restaurant.reviews, function (review, i) {
      var self = el('div', this, 'col-xs-12 em-bot');
      var info = el('div', self);
        info.author = el('span', info, 'h4 text-primary');
        info.author.text = txt(review.user, info.author);
        info.spacing = txt(' ', info);
        info.rating = el('span', info, 'h4 text-muted');
        info.rating.text = txt(review.rating+'★', info.rating);
      var body = el('div', self);
        body.text = txt(review.body, body);
      var ups = el('p', self);
      var votes = function() {
        while (ups.firstChild) {
          ups.removeChild(ups.firstChild);
        }
        var toggleUser = function (array, user) {
          if (_.contains(array, user)){
            return _.without(array, user);
          } else {
            return _.union(array, [user]);
          };
        }
        _.mapObject(review.ups, function(voters, key){
          var it = el('span', this, 'label label-warning');
          it.text = txt(key+' ('+review.ups[key].length+')', it);
          txt(' ', this);
        }, ups);
      };
      votes();
    }, card.reviews);
}
serveResults(Restaurants, undefined);
