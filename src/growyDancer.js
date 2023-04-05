var MakeGrowyDancer = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<span class="growydancer"></span>');
  this.setPosition(top, left);
};

MakeGrowyDancer.prototype = Object.create(makeDancer.prototype);
MakeGrowyDancer.prototype.constructor = MakeGrowyDancer;
MakeGrowyDancer.prototype.step = function(timeBetweenSteps) {
  makeDancer.prototype.step.call(this, timeBetweenSteps);
  if (this.$node.width() < 65) {
    this.$node.animate({
      'height': '+=5px',
      'width': '+=5px'
    }, 'slow');
  }
};
