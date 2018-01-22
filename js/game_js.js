"use strict"

console.log("Build by RedRuby in 2017");
var currentStep=0;
var gameOver=true;
var currentState=[];
var symbols = ['X','O'];
var winner;
var cell = document.querySelectorAll('.cell');
var winningCombos={
	combo0:[0,1,2],
	combo1:[3,4,5],
	combo2:[6,7,8],
	combo3:[0,3,6],
	combo4:[1,4,7],
	combo5:[2,5,8],
	combo6:[0,4,8],
	combo7:[2,4,6]
};
var potentialCombos={
	0: ['combo0','combo3','combo6'],
	1: ['combo0','combo4'],
	2: ['combo0','combo5','combo7'],
	3: ['combo1','combo3'],
	4: ['combo1','combo4','combo6','combo7'],
	5: ['combo1','combo5'],
	6: ['combo2','combo3','combo7'],
	7: ['combo2','combo4'],
	8: ['combo2','combo5','combo6'],
	
};

function winResizeHandler( ) {
	
	
	var cell_w=cell[0].offsetWidth;	
	//console.log('cell '+cell_w+'px');

	for (var i = 0; i < cell.length; i++) {
		cell[i].style.height=cell_w+"px";
		cell[i].style.fontSize=cell_w*0.9+"px";
	};
	
var mark = document.querySelectorAll('.mark');
	for (var i = 0; i < mark.length; i++) {
		mark[i].style.fontSize=cell_w*0.7+"px";
	};


}
winResizeHandler();


var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addEvent(window, "resize", function(event) {
  winResizeHandler();
 // console.log('resized');
});




var showmark=function(step){
	var mark1=document.getElementById('mark1') ;
	var mark2=document.getElementById('mark2') ;
	if (step%2==0) {

		mark1.className=mark1.className+" select";
		mark2.className="mark";
		document.getElementById('arrow2').style.display='none';
		document.getElementById('arrow1').style.display='block';
	}else{
		mark2.className=mark2.className+" select";
		mark1.className="mark";
		document.getElementById('arrow1').style.display='none';
		document.getElementById('arrow2').style.display='block';
	}
 };

var init= function(){
	if (gameOver) {
		currentStep=0;
		gameOver=false;
		winner=null;
		showmark(currentStep);

		for (var i = 0; i < cell.length; i++) {
			currentState[i]=null;
			cell[i].className='cell';
			cell[i].innerHTML="";
		}
		document.getElementById('overlay').style.display='none';
		document.getElementById('s').innerHTML="";
		//console.log('init');
	}

};
init();

var checkCombo = function(a){
	var w =(currentState[a[0]]===currentState[a[1]]&&currentState[a[1]]===currentState[a[2]]);
	if(w){

		for (var i = 0; i < cell.length; i++) {
			if(cell[i].dataset.i==a[0]||cell[i].dataset.i==a[1]||cell[i].dataset.i==a[2]){
				cell[i].className=cell[i].className+' win';
			}
		}
		
		winner=currentState[a[0]];
	}
	return w;
};


for(var c = 0;c<cell.length;c++)
cell[c].onclick=function(){


	//console.log('2');
 	if (!gameOver) {

 		var $this=this;
 		var data_i=$this.dataset.i;
 		//console.log(data_i);
 		if (currentState[data_i]==null) {
			var s =symbols[currentStep++ %2];
			currentState[data_i]=s;
		//	console.log(s);
			$this.innerHTML=s;
			for (var i = 0; i<potentialCombos[data_i].length;i++) {
				var ww =winningCombos[potentialCombos[data_i][i]];
				if (checkCombo(ww)) {
					gameOver=true;
					document.getElementById('s').innerHTML=winner;
					document.getElementById('text').innerHTML="Win!"
					document.getElementById('overlay').style.display='block';
				}
			}

			if (currentStep==9&&gameOver==false) {
				gameOver=true;
				document.getElementById('text').innerHTML="Draw!"
				document.getElementById('overlay').style.display='block';
			}
 		showmark(currentStep);
 		}
 	}


 }

document.getElementById("overlay").onclick =function(){
	init();
};
