 "use strict"

console.log("Build by Ruby in 2017");

var winResizeHandler = function () {
	var w= $('.cell').width();
 
	$('.cell').height(w).css({
		'font-size':w*0.9+'px',
		'line-height':w+'px'
	});
	$('.mark,.arrow').css({
		'font-size':w*0.8+'px'
	});
	 $('.title').css({
		'font-size':w*0.2+'px'
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
var gameOver=true;
var currentState=[];
var symbols = ['X','O'];
var winner;
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

var showmark = function (p) {
	if (p % 2===0) {
		$('.player2>.mark').removeClass('select');
		$('.player1>.mark').addClass('select');

		$('.player1>.arrow').removeClass('select');
		$('.player2>.arrow').addClass('select');
 
	}else{
		 
		$('.player1>.mark').removeClass('select');
		$('.player2>.mark').addClass('select');

		$('.player2>.arrow').removeClass('select');
		$('.player1>.arrow').addClass('select');

	}
};

var init=function () {
	if (gameOver) {
		$('.cell').empty().removeClass('win');
		gameOver=false;
		winner=null;
		for (var i = 0; i < 9; i++) {
			currentState[i]=null;
		}
		currentStep=0;
		showmark(currentStep);
		$('.ss').text('');
		$('#overlay').css("display","none");
		$('#s').html("");
		$('.player2>.mark').removeClass('select');
		$('.player1>.mark').addClass('select');
		 
	}

		
};
init();
var checkCombo = function(a){
	var w =(currentState[a[0]]===currentState[a[1]]&&currentState[a[1]]===currentState[a[2]]);
	if(w){

		$('.cell[data-i ="'+ a[0]+'"]').addClass('win');
		$('.cell[data-i ="'+ a[1]+'"]').addClass('win');
		$('.cell[data-i ="'+ a[2]+'"]').addClass('win');
		winner=currentState[a[0]];
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
		 			$('#s').html(winner);
		 			$('#text').html('Win!');
		 			$('#overlay').css("display","block");
		 			return;
		 		}
		 	}
		 	if (currentStep===9) {
		 		gameOver=true;
		 		$('#text').text('Draw!');
		 		$('#overlay').css("display","block");
		 		return;
		 	}
		 	showmark(currentStep);
		}

 	}
});

$('#overlay').click(function(){
	init();
})


