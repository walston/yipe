window.setInterval(check, 500);

document.body.addEventListener('click', function (e) {
  function parentWith(attribute, clicked) {
    for (looker = clicked;
      looker != document.body;
      looker = looker.parentNode) {
      if (looker.hasAttribute(attribute))
        return looker;
    }
    return clicked;
  }

  var target = parentWith('data-method', e.target);
  var method = target.getAttribute('data-method');

  if (method == 'vote') {
    var restaurantId = Number.parseInt(target.getAttribute('data-restaurantid'));
    var reviewId = Number.parseInt(target.getAttribute('data-reviewid'));
    var upsKey = target.getAttribute('data-key');
    vote(restaurantId, reviewId, upsKey);
    toggle(target, 'change');
  }
  else if (method == 'review') {
    toggle(document.getElementById('userReviewModal'), 'hidden');
  }
  else if (method == 'location') {
    serveLocation(RESTAURANTS[target.getAttribute('data-restaurantid')])
  }
  else if (method == 'results') {
    serveResults(lastServed);
  }
  else if (method == 'sort') {
    sortPlates(lastServed, target.getAttribute('data-sortmethod'));
  }
  else if (method == 'tag') {
    searchTag(target.getAttribute('data-value'));
  }
});

document.getElementById('search').addEventListener('submit', function (evt) {
  evt.preventDefault();
  searchSubmit();
})

document.getElementById('review').addEventListener('submit', function  (evt) {
  evt.preventDefault();
  reviewSubmit();
});
