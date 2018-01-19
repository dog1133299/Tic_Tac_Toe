 "use strict"

console.log("Build by Ruby in 2017");

var winResizeHandler = function () {
	var w= $('.cell').width();
	$('.cell').height(w).css({
		'font-size':w+'px',
		'line-height':w*0.9+'px'
	});
	$('.mark').height(w).css({
		'font-size':w*0.6+'px',
		 
	});
 
};
$(window)
	.resize(winResizeHandler)
	.keydown(function(e){
		e.preventDefault();
		init();
});


winResizeHandler();


var currentStep=0;
var gameOver=false;
var currentState=[];
var symbols = ['&times;','&#9675;'];
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

var showArrow = function (p) {
	if (p % 2===0) {
		$('.player2>.arrow').removeClass('inv');
		$('.player1>.arrow').addClass('inv');

		$('.player1>.mark').removeClass('select');
		$('.player2>.mark').addClass('select');
	}else{
		$('.player2>.mark').removeClass('select');
		$('.player1>.mark').addClass('select');

		$('.player1>.arrow').removeClass('inv');
		$('.player2>.arrow').addClass('inv');

	}
};

var init=function () {
	if (gameOver) {
		$('.cell').empty().removeClass('win');
		gameOver=false;
		for (var i = 0; i < 9; i++) {
			currentState[i]=null;
		}
		currentStep=0;
		showArrow(currentStep);
		$('.ss').text('');

	}
};
init();
var checkCombo = function(a){
	var w =(currentState[a[0]]===currentState[a[1]]&&currentState[a[1]]===currentState[a[2]]);
	if(w){

		$('.cell[data-i ="'+ a[0]+'"]').addClass('win');
		$('.cell[data-i ="'+ a[1]+'"]').addClass('win');
		$('.cell[data-i ="'+ a[2]+'"]').addClass('win');
	}
	return w;
};
$('.cell').click(function(){
 	if (!gameOver) {
 		var $this = $(this);
		var i = $this.data('i');
		if (currentState[i]==null) {
			var s =symbols[currentStep++ %2];
			currentState[i]=s;
			$this.html(s);
			console.log(i);
		 	for (var j = 0 ,len = potentialCombos[i].length; j<len; j++) {
		 		var ww=winningCombos[potentialCombos[i][j]];
		 		if (checkCombo(ww)) {
		 			gameOver=true;
		 			$('.ss').text('Press any key to start a new game.');
		 			return;
		 		}
		 	}
		 	if (currentStep===9) {
		 		gameOver=true;
		 		$('.ss').text('Draw!Press any key to start a new game.');
		 		return;
		 	}
		 	showArrow(currentStep);
		}

 	}
});


