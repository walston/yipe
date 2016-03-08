var roll = document.getElementById('roll');
var me = 'defaultUser';
var lastServed = Restaurants;

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
var serveResults = function ( parent, restaurants, results ) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  if (results) {
    var searchResults = el('h4', parent, 'text-muted');
      results.text = 'We found '+ (restaurants.length != 1 ? restaurants.length+' places' : '1 place');
    if (results.query.length > 0) {
      results.text += ' matching ' + _.map(results.query, function(term,i) {
        return '\''+term+'\'';
      }).join(', ');
    }
    if (results.near.length > 0) {
      results.text += ' near '+results.near;
    }
    results.text += ':';
    searchResults.text = txt(results.text, searchResults);

  }
  _.each(restaurants, function(restaurant, i) {
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
    var nameLink = el('a', name)
        nameLink.href = '#';
        nameLink.addEventListener('click', function () {
          serveLocation(roll, Restaurants[i]);
        });
               txt(restaurant.name, nameLink);
               txt(' ', name);
    var rating = el('span', name, 'text-muted h4');
               txt(restaurant.rating+'★', rating);
               txt(' ', name);
    var author = el('span', name, 'text-muted h4');
               txt(restaurant.reviews.ideal.user, author);
    var review = txt(restaurant.reviews.ideal.body, mediaBody);
    var tags = el('p', mediaBody);
    _.each(restaurant.tags, function (tag, i){
      var tagElement = el('span', this, 'label label-default');
      txt(tag, tagElement)
      txt(' ', this);

    }, tags);
  });
  lastServed = restaurants;
}
var serveLocation = function ( parent, restaurant ) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
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
    localNav.backbutton.addEventListener('click', function(){ serveResults( roll, lastServed ); });
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
      ups.addEventListener('click', function (event) {
        var key = event.target.getAttribute('data-key');
        var toggleUser = function (array, user) {
          if (_.contains(array, user)){
            return _.without(array, user);
          } else {
            return _.union(array, [user]);
          };
        }
        toggleUser(review.ups[key], me);
        votes();
      });
      var votes = function() {
        while (ups.firstChild) {
          ups.removeChild(ups.firstChild);
        };
        _.mapObject(review.ups, function(voters, key){
          var up = el('span', this, 'label label-warning');
          up.setAttribute('data-key', key);
          up.text = txt(key+' ('+review.ups[key].length+')', up);
          txt(' ', this);
        }, ups);
      };
      votes();
    }, card.reviews);
}
serveResults( roll, Restaurants );
