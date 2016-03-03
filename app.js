var roll = document.getElementById('roll');

serveResults(roll, Restaurants);

function serveResults ( element, objects ) {
  // clear out any results
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
  objects.forEach(function(obj) {
    // {
    //   name: 'name',
    //   address: '9999 First St. City, CA 90001'
    //   reviews: [
    //     {
    //       user: 'username',
    //       rating: 3,
    //       body: 'Lorem ipsum ...';
    //     }
    //   ],
    //   tags: ['tag1','tag2','tag3'],
    //   images: ['path/to/images.jpg']
    // }
    function element ( tag, parent, classes ) {
      var node = document.createElement(tag);
      if (classes) { node.className = classes; }
      parent.appendChild(node)
      return node;
    }
    function textNode ( content, parent ) {
      var node = document.createTextNode(content);
      parent.appendChild(node);
      return node;
    }
    var item = element('div', roll, 'row');
    var mediaLeft = element('div', item, 'hidden-xs col-sm-3 col-md-2');
    var imageWrapper = element('div', mediaLeft, 'h1');
    var image = element('img', imageWrapper, 'img-responsive inline-block');
        image.src = obj.images[0];
    var mediaBody = element('div', item, 'col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-9 col-md-10');
    var name = element('h1', mediaBody, 'h2');
               textNode(obj.name, name);
               textNode(' ', name);
    var rating = element('span', name, 'text-muted h4');
               textNode(obj.reviews[0].rating, rating);
               textNode(' ', name);
    var author = element('span', name, 'text-muted h4');
               textNode(obj.reviews[0].user, author);
    var review = textNode(obj.reviews[0].body, mediaBody);
    var tags = element('p', mediaBody);
    obj.tags.forEach( function (tag, i){
      var tagElement = element('span', this, 'text-info tag');
      textNode(tag, tagElement)
      textNode(' ', this);
    }, tags);
  })
}

///////////////////////////////////
// SEARCH /////////////////////////
///////////////////////////////////
document.getElementById('search').addEventListener('submit', function (evt) {
  evt.preventDefault();
  var searchResults = Restaurants.filter(byQuery).filter(byLocation);

  serveResults(roll, searchResults);

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
})

///////////////////////////////////
// SUBMIT REVIEW //////////////////
///////////////////////////////////
document.getElementById('review').addEventListener('submit', function  (evt) {
  evt.preventDefault();
  var submission = {
    name: document.getElementById('restaurant').value,
    address: document.getElementById('address').value,
    reviews: [{
      user: 'defaultUser',
      rating: document.getElementById('rating').value,
      body: document.getElementById('reviewBody').value
    }],
    tags: cleanTags(document.getElementById('tags').value),
    images: document.getElementById('image').src
  };

  function cleanTags(string) {
    // this feature should eventually
    // remove duplicates being input as well
    return string.split(/\s*,\s*/ig)
      .map(function(string){
        return string.toLowerCase();
      });
  }

  var i = Restaurants.findIndex(function(obj){
    return obj.name == submission.name;
  });
  if (i >= 0) {
    Restaurants[i].reviews.unshift(submission.reviews[0]);
    submission.tags //
    .filter(function(tag) {
      return !Restaurants[i].tags.includes(tag);
    }).forEach(function (tag) {
      if (tag) {
        Restaurants[i].tags.push(tag);
      }
    })
  } else {
    Restaurants.push(submission);
  }

  // reload results
  serveResults(roll, Restaurants);
  modalization();
});
function modalization (event) {
  toggleClassName(document.getElementById('userReviewModal'), 'hidden');

  function toggleClassName(element, value) {
    var classList = element.className.split(' ');
    var i = classList.indexOf(value);
    if ( i < 0 ) {
      classList.push(value);
    } else {
      classList.splice(i,1);
    }
    element.className = classList.join(' ');
  }
}
document.getElementById('userReviewButton').addEventListener('click', modalization)
document.getElementById('userReviewCancelButton').addEventListener('click', modalization)
