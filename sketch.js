var wid = window.innerWidth;
var hei = wid + 60;
var mar = 10;
var inwid = wid-mar*2;
var m = 2;
var score = 0;
var time = 60;
var sum = 0;
var loo = 0;
var boards = [...new Array(m)].map((__,i) => [...new Array(m)].map((__,j) => 0));
newmap(2)
setTimeout(function() {
	wid = window.innerWidth;
	hei = wid + 60;
	mar = 10;
	inwid = wid-mar*2;
	console.log(inwid);
	resizeCanvas(wid,hei);
	document.getElementById("startb").onclick = function(){
	m = 2;
	score = 0;
	time = 60;
	sum = 0;
	boards = [...new Array(m)].map((__,i) => [...new Array(m)].map((__,j) => 0));
	document.getElementById("modal2").classList.add("vanish");
	document.getElementById("bb").classList.add("vanish");
	
	newmap(2)
	var g = setInterval(function(){
		time--;
		t.innerHTML = time;
		if(time==0){clearInterval(g);document.getElementById("modal2").classList.remove("vanish");document.getElementById("bb").classList.remove("vanish");document.getElementById("score").innerHTML = "score:" + score + "pt";}
	},1000)
}
},200);
function newmap(k){
  for (var i=0;i<k;i++){
    let x = Math.floor(Math.random()*(m))
    let y = Math.floor(Math.random()*(m))
    turn(x,y)
  }
}
function turn(x,y){
  boards [x][y]=(boards [x][y]-1)**2
  for(var j=1;j<m; j++){
    boards[(x+j)%m] [y]=(boards[(x+j)%m][y]-1)**2;
    boards[x][(y+j)%m]=(boards [x][(y+j)%m]-1)**2;
  }
}
function fillbox(x,y){
fill(100,100,255)
rect(mar+inwid/m*x, mar+inwid/m*y, inwid/m,inwid/m)
}
function setup() {
createCanvas (wid, hei);
t = document.getElementById("time");
}
function draw() {
  background(220,230,255);
  sum = 0;
  for(var i=0;i<=m;i++){
    line(mar,mar+inwid/m*i,mar+inwid,mar+inwid/m*i)
    line(mar+inwid/m*i,mar,mar+inwid/m*i,mar+inwid)
  }
  for(var i=0;i<m;i++){
    for(var j=0;j<m;j++){
      if(boards[i][j]==1){fillbox(i,j);sum++}
    }
  }
  if(sum==0){loo=0;score++;document.getElementById("conscore").innerHTML = "SCORE:" + score + "pt";let score_ = Math.floor(score/2);m=Math.floor(score_/4)+2;boards = [...new Array(m)].map((__,i) => [...new Array(m)].map((__,j) => 0));newmap((score_%4)+2-0**score);console.log("a")}
  if(loo<wid*3){
  let tmp = loo<wid*2?0:loo-wid*2;
  fill(200,210,255);
  rect(tmp,0,loo,hei)
  loo+=90;
  }
}
function mouseClicked(){
  if(document.getElementById("bb").classList.contains("vanish")){
  let x = Math.floor((mouseX-mar)/inwid*m);
  let y = Math.floor((mouseY-mar)/inwid*m);
  if(0<=x && x<m && 0<=y && y<m){
    turn(x,y)
  }
  }
}
function touchEnded(){
  if(document.getElementById("bb").classList.contains("vanish")){
  let x = Math.floor((mouseX-mar)/inwid*m);
  let y = Math.floor((mouseY-mar)/inwid*m);
  if(0<=x && x<m && 0<=y && y<m){
    turn(x,y)
  }
  }
}