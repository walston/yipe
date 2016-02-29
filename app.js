var roll = document.getElementById('roll');
var rollItems = roll.getElementsByTagName('li');
var appetizer = rollItems[0]

roll.innerHTML = formater(appetizer.outerHTML, Reviews);

function formater(template, objects) {
  // var review = {
  //   user: user.name // points to {user},
  //   id: ' ...hash... '
  //   restaurant: restaurant.name // points to {restaurant},
  //   rating: 1-5,
  //   body: 'Lorem ipsum dolor sit ... ',
  //   tags: ['tacos', 'pizza', 'burgers', ... ],
  //   teaser: this.body.firstTwoSentences(),
  //   image: 'url/to/image.jpg'
  // }
  var innerHTML = '';

  for (var i = 0; i < objects.length; i++) {
    var appendMe = template;
    var review = objects[i];
    appendMe = appendMe.replace(/{{ author }}/gi, review.user);
    appendMe = appendMe.replace(/{{ restaurant.name }}/gi, review.restaurant);
    appendMe = appendMe.replace(/{{ rating }}/gi, review.rating);
    appendMe = appendMe.replace(/{{ review }}/gi, review.body);
    appendMe = appendMe.replace(/{{ image-link }}/gi, review.image);
    innerHTML += appendMe;
  }
  return innerHTML;
}
