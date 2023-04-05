var MakeMouseDancer = function (top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<span class="mousedancer"></span>');

  this.$node.mouseenter(function() {
    $(this).css('background-color', 'purple');
  });
  this.$node.mouseleave(function() {
    $(this).css('background-color', 'yellow');
  });

  this.setPosition(top, left);
  this.step();
};

MakeMouseDancer.prototype = Object.create(makeDancer.prototype);
MakeMouseDancer.prototype.constructor = MakeMouseDancer;
MakeMouseDancer.prototype.step = function() {

};