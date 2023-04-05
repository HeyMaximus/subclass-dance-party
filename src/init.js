$(document).ready(function() {
  window.dancers = [];

  $('.addDancer.button').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName]; //window[makeBlinkyDancer]


    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    dancers.push(dancer);
  });

  $('.Lineup.button').on('click', function() {
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].lineup();
    }
  });


  var distanceCalcultor = function (firstPosition, secondPosition) {
    var aSquare = Math.pow(Math.abs(firstPosition.top - secondPosition.top), 2);
    var bSquare = Math.pow(Math.abs(firstPosition.left - secondPosition.left), 2);

    return Math.pow(aSquare + bSquare, 0.5);

  };

  // obj {
  //   top: 23px,
  //   left: 45px
  // }

  window.dancersFound = [];
  // Funtionality - interaction
  // every dancer find its cloest partner
  // somehow change the distance for these two dancers
  $('.Interact.button').on('click', function() {
    // create empty array to store all remaining dancers
    var remainingDancers = [];
    dancers.forEach (function(dancer) {
      if (!dancersFound.includes(dancer)) {
        remainingDancers.push(dancer);
      }
    });
    console.log('this is the array at start:', remainingDancers);
    // run through alogthrim - find its cloest parner for every dancers


    while (remainingDancers.length >= 2) {
      console.log('this is the array at every iteration:', remainingDancers);
      var dancer = remainingDancers[0];
      var smallestDistance = 0;
      var closestPartner, closePartnerIndex;

      for (var j = 1; j < remainingDancers.length; j++) {
        var firstPosition = dancer.$node.position();
        var secondPosition = remainingDancers[j].$node.position();
        if (distanceCalcultor(firstPosition, secondPosition) < smallestDistance || smallestDistance === 0) {
          smallestDistance = distanceCalcultor(firstPosition, secondPosition);
          closestPartner = remainingDancers[j];
          closePartnerIndex = j;
        }
      }

      // if (!dancersFound.includes(dancer) && !dancersFound.includes(closestPartner)) {
        // do some effect
        var top = firstPosition.top;
        var left = firstPosition.left + 10;
        closestPartner.$node.css({
          'top': top,
          'left': left
        });
        dancersFound.push(dancer);
        dancersFound.push(closestPartner);
        remainingDancers.splice(0, 1);
        remainingDancers.splice(closePartnerIndex, 1);
      // }
      // pop two dancers that we paired

    }
      // check if those two dancers already exist in the array
        // apply some distance changes
      // push two dancers into that empty array

    // var smallestDistance = 0;
    // var firstIndex, secondIndex;
    // for (var i = 0; i < dancers.length; i++) {
    //   for (var j = i + 1; j < dancers.length; j++) {
    //     var firstPosition = dancers[i].$node.position();
    //     var secondPosition = dancers[j].$node.position();
    //     if (distanceCalcultor(firstPosition, secondPosition) < smallestDistance || smallestDistance === 0) {
    //       smallestDistance = distanceCalcultor(firstPosition, secondPosition);
    //       firstIndex = i;
    //       secondIndex = j;
    //     }
    //   }
    // }
    // dancers[firstIndex].$node.css('border-color', 'red');
    // dancers[secondIndex].$node.css('border-color', 'red');
  });
});

// dancers: [1, 2, 3, 4, 5, 6]
// dancersFound: []
// first iteration
  // dancer: 1
  // closestPartner: 4
  // dancersFound: [1, 4]
// second iteration
  // dancer: 2
  // closestPartner: 4
  // dancersFound: [1, 4]
// third iteration
  // dancer: 3
  // closestPartner:
  // dancersFound: [1, 2]
// first iteration
  // dancersFound: [1, 2]

// remainingDancers: [1,2,3]
// first: [1,2] paired i = 0
// remainingDancers: [3,4]
// second: i = 1;
// remainingDancers: []
//
