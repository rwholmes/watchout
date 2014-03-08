var width = 700;
var height = 450;
var gameSpeed = 3000;

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,width]),
  y: d3.scale.linear().domain([0,100]).range([0,height])
}

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
    var enemy = {id: i, x: setXPos(), y: setYPos(), color: enemyColors[Math.floor(Math.random() * 5 | 0)]};
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
  .attr("transform", "translate(" + d3.event.x + "," + d3.event.y  + ")");
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
  .attr("r", 10)
  .attr("class", "enemy")
  .style("fill", function(d){return d.color;});

var checkCollision = function(enemy){
  //debugger;
  var radiusSum = parseFloat(enemy.attr("r")) + player.r;
  var xDiff = parseFloat(enemy.attr("cx")) - player.x;
  var yDiff = parseFloat(enemy.attr("cy")) - player.y;

  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );

  if(separation < radiusSum){
    console.log("HITTTT!!");
  }
};

var tweenWithCollisionDetection = function(endData) {
  var enemy = d3.select(this);

  var startPos = {
    x: parseFloat(enemy.attr("cx")),
    y: parseFloat(enemy.attr("cy"))
  };

  var endPos = {
    x: axes.x(endData.x),
    y: axes.y(endData.y)
  };

  return function(t) {
    checkCollision(enemy);
    var enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x)*t,
      y: startPos.y + (endPos.y - startPos.y)*t
    };
    enemy.attr("cx", enemyNextPos.x)
      .attr("cy", enemyNextPos.y);
  };

};



window.setInterval(function(){
  d3.selectAll(".enemy").transition()
    .duration(gameSpeed)
    .attr("cx", function(d){
      return setXPos();
    })
    .attr("cy", function(d){
      return setYPos();
    })
    .tween("custom", tweenWithCollisionDetection);

},gameSpeed);


