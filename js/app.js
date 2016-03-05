var roll = document.getElementById('roll');
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
var serveResults = function ( parent, restaurants ) {
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
  var backbutton = el('a', parent, 'btn btn-primary');
    backbutton.href = '#';
    backbutton.content = txt('←Back', backbutton)
    backbutton.addEventListener('click', function(){ serveResults( roll, lastServed ); });
  var plate = {};
    plate.title = el('div', parent, 'row');
    plate.title.name = el('span', plate.title, 'h2');
    plate.title.name.text = txt(restaurant.name, plate.title.name);
    plate.title.rating = el('span', plate.title, 'h2 info-text pull-right');
    plate.title.rating.text = txt(restaurant.rating+'☆', plate.title.rating);
}
serveLocation( roll, Restaurants[0] );
// serveResults( roll, Restaurants );
