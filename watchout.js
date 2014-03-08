var width = 700;
var height = 450;
var gameSpeed = 3000;
var enemyColors = ["black"];

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
    var enemy = {id: i, r: 10, x: setXPos(), y: setYPos(), color: enemyColors[Math.floor(Math.random() * 5 | 0)]};
    enemies.push(enemy);
  }
  return enemies;
};

var Player =  function() {
  this.x = 0;
  this.y = 0;
  this.r = 100;
  this.color = "orange";
};

var player = new Player();
var enemies = createEnemies(30);

var move = function() {
  d3.select(this)
  .attr("cx", d3.event.x)
  .attr("cy", d3.event.y);
};

var playerCircles = gameboard.selectAll("circle")
  .data([player])
  .enter()
  .append("circle");

var pcircleAttributes = playerCircles
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; })
  .attr("r", 100)
  .attr("class", "player")
  .style("fill", function(d){return d.color;})
  .call(d3.behavior.drag().on("drag", move));

var enemyCircles = gameboard.selectAll("circle")
  .data(enemies)
  .enter()
  .append("circle");

var circleAttributes = enemyCircles
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; })
  .attr("r", function(d) { return d.r; })
  .attr("class", "enemy")
  .style("fill", function(d){return d.color;});


var checkCollision = function(){
  d3.selectAll(".enemy").each(function(enemy){
    var radiusSum =  enemy.r + player.r;
    var xDiff = d3.select(this).attr("cx") - d3.select(".player").attr("cx");
    var yDiff = d3.select(this).attr("cy") - d3.select(".player").attr("cy");
    console.log(d3.select(".player").attr("cx"));
  });
};

// d3.select(d3.selectAll(".enemy")).attr("cx")


window.setInterval(function(){
  d3.selectAll(".enemy").transition()
    .duration(gameSpeed)
    .attr("cx", function(d){
      return setXPos();
    })
    .attr("cy", function(d){
      return setYPos();
    });

},gameSpeed);


