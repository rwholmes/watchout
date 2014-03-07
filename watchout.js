// start slingin' some d3 here.

// NOTES
//
//  enter() -- creates nodes for incoming data
//  update --
//  exit() -- removes nodes (outgoing nodes)
//  key() --


var width = 700;
var height = 450;

var gameboard = d3.select(".container").append("svg")
  .attr("width", width)
  .attr("height", height);

var createEnemies = function(numberOfEmemies) {
  var enemies = [];
  for (var i=0; i<numberOfEmemies; i++) {
    var enemy = {id: i, x: Math.random()*width, y: Math.random()*height};
    enemies.push(enemy);
  }
  return enemies;
};
var enemies = createEnemies(30);
console.log(enemies);

var circles = gameboard.selectAll("circle")
  .data(enemies)
  .enter()
  .append("circle");

var circleAttributes = circles
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; })
  .attr("r", 10)
  .style("fill", "black");


var axes;
var updateScore = function() {
};
var updateTopScore = function() {
};
var updateCollisions = function() {
};




