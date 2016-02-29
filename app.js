var roll = document.getElementById('roll');
var rollItems = roll.getElementsByTagName('li');
var appetizer = rollItems[0]

serveResults(roll, Restaurants);

function serveResults ( element, objects ) {
  // clear out any results
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
  element.className.co
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
    item.className = 'media';
    element.appendChild(item);

    var mediaLeft = document.createElement('div');
    mediaLeft.className = 'media-left';
    item.appendChild(mediaLeft);
    var imageWrapper = document.createElement('a');
    imageWrapper.href = '#';
    mediaLeft.appendChild(imageWrapper);
    var image = document.createElement('img');
    image.className = 'media-object'
    image.src = obj.images[0];
    imageWrapper.appendChild(image);

    var mediaBody = document.createElement('div');
    mediaBody.className = 'media-body';
    item.appendChild(mediaBody);
    var name = document.createElement('h1');
    name.className = 'media-heading';
    mediaBody.appendChild(name);
    name.appendChild(document.createTextNode(obj.name));
    var rating = document.createElement('span');
    rating.className = 'pull-right'
    rating.appendChild(document.createTextNode(obj.reviews[0].rating+'★'));
    name.appendChild(rating);
    var review = document.createTextNode(obj.reviews[0].body)
    mediaBody.appendChild(review);
    var tags = document.createElement('p');
    tags.className = 'tags';
    obj.tags.forEach(function(tag){
      var tagElement = document.createElement('span');
      tagElement.appendChild(document.createTextNode(tag+' '))
      this.appendChild(tagElement);
    }, tags);
    mediaBody.appendChild(tags);

  })
}
