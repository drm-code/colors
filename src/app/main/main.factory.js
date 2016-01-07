(function() {
	'use strict';

	function Card(color) {
		this.color = color;
		this.flipped = false;
		this.flip = function() {
			this.flipped = !this.flipped;
		}
	}

	angular
		.module('colors')
		.factory('game', function() {
			var colors = [
				'#B71C1C',
				'#F48FB1',
				'#4A148C',
				'#303F9F',
				'#9575CD',
				'#009688',
				'#84FFFF',
				'#D4E157',
				'#1B5E20',
				'#9E9E9E',
				'#4E342E',
				'#FF5722'
			],
			dimension = Math.sqrt(colors.length*2+1),
			Game = {
				new: function() {
					var arrCards = [],
					matrix = [];
					colors.forEach(function(color) {
						arrCards.push(new Card(color));
						arrCards.push(new Card(color));
					});
					arrCards.push(new Card());
					for (var row=0; row<dimension; row++) {
						matrix[row] = [];
						for (var col=0; col<dimension; col++) {
							var remove = Math.floor(Math.random()*arrCards.length);
							matrix[row][col] = arrCards[remove];
							arrCards.splice(remove,1);
						}
					}
					return matrix;					
				},
				flip: function(card) {
					card.flip();
				},
				pairs: function() {
					return colors.length;
				}
			};

			return Game;
		});
})();