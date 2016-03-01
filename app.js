var roll = document.getElementById('roll');

serveResults(document.getElementById('roll'), Restaurants);

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
    var item = document.createElement('li');
    var mediaLeft = document.createElement('div');
    var imageWrapper = document.createElement('a');
    var image = document.createElement('img');
    var mediaBody = document.createElement('div');
    var name = document.createElement('h1');
    var rating = document.createElement('span');
    var author = document.createElement('span');
    var review = document.createTextNode(obj.reviews[0].body)
    var tags = document.createElement('p');
    var tagElement = document.createElement('span');
    obj.tags.forEach( function (tag){
      tagElement.appendChild(document.createTextNode(tag+' '))
      this.appendChild(tagElement);
    }, tags);

    item.className = 'media';
    mediaLeft.className = 'media-left';
    imageWrapper.href = '#';
    image.className = 'media-object'
    image.src = obj.images[0];
    mediaBody.className = 'media-body';
    name.className = 'media-heading';
    rating.className = 'rating'
    author.className = 'pull-right';
    tags.className = 'tags';

    element.appendChild(item);
      item.appendChild(mediaLeft);
        mediaLeft.appendChild(imageWrapper);
          imageWrapper.appendChild(image);
        item.appendChild(mediaBody);
          mediaBody.appendChild(name);
            name.appendChild(document.createTextNode(obj.name));
              rating.appendChild(document.createTextNode(' '+obj.reviews[0].rating+'★'));
              name.appendChild(rating);
              author.appendChild(document.createTextNode(obj.reviews[0].user));
            name.appendChild(author)
        mediaBody.appendChild(review);
        mediaBody.appendChild(tags);
  })
}

document.getElementById('search').addEventListener('submit', function (evt) {
  evt.preventDefault();
  serveResults(document.getElementById('roll'), Restaurants.filter(function(obj) {
    return new RegExp(document.getElementById('query').value, 'i').test(obj.name);
  }, this));
})

document.getElementById('review').addEventListener('submit', function (evt) {
  evt.preventDefault();
  // /////// OBJECT MAP ////////
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
  var submission = {
    name: document.getElementById('restaurant').value,
    address: document.getElementById('address').value,
    reviews: [{
      user: 'defaultUser',
      rating: document.getElementById('rating').value,
      body: document.getElementById('reviewBody').value
    }],
    tags: document.getElementById('tags').value.split(/,\s*/ig),
    images: document.getElementById('image').src
  };

  var indexOfRestaurant = Restaurants.findIndex(function(obj){
    console.log(obj.name + ' == ' + submission.named)
    return obj.name == submission.name;
  })
  if (indexOfRestaurant >= 0) {
    Restaurants[indexOfRestaurant].reviews.unshift(submission.reviews[0]);
  } else {
    Restaurants.push(submission);
  }

  // reload results
  console.log(document.getElementById('reviewBody').value)
  console.log(submission.reviews[0].body);
  serveResults( document.getElementById('roll'), Restaurants)
})
