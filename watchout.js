var width = 700;
var height = 450;
var gameSpeed = 3000;

var enemyColors = ['red', 'blue', 'green', 'purple', 'orange'];

var gameboard = d3.select(".container").append("svg")
  .attr("width", width)
  .attr("height", height);

var setXPos = function(){
  return Math.random() * width;
};
var setYPos = function(){
  return Math.random() * height;
};

var createEnemies = function(numberOfEmemies) {
  var enemies = [];
  for (var i=0; i<numberOfEmemies; i++) {
    var enemy = {id: i, x: setXPos(), y: setYPos(), color: enemyColors[Math.floor(Math.random() * 5 | 0)]};
    enemies.push(enemy);
  }
  return enemies;
};

var enemies = createEnemies(30);

var enemyCircles = gameboard.selectAll("circle")
  .data(enemies)
  .enter()
  .append("circle");

var circleAttributes = enemyCircles
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; })
  .attr("r", 10)
  .style("fill", function(d){return d.color;});

window.setInterval(function(){
  d3.selectAll("circle").transition()
    .duration(gameSpeed)
    .attr("cx", function(d){
      return setXPos();
    })
    .attr("cy", function(d){
      return setYPos();
    });
},gameSpeed);


