(function() {
	'use strict';

	angular
		.module('colors')
		.filter('secondsToTime', [function() {
			return function(seconds) {
				return new Date(1970, 0, 1).setSeconds(seconds);
			};
		}]);
})();