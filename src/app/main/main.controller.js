(function() {
  'use strict';

  angular
    .module('colors')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $interval, $filter, toastr, toastrConfig, game) {    
    var vm = this;
    var toasts = [];

    vm.newGame = newGame;
    vm.flip = flip;
    vm.home = true;
    vm.bestTime = 0;
    toastrConfig.timeOut = 2000;
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;    

    function newGame() {
      vm.grid = game.new();
      vm.home = false;
      vm.firstCard = vm.secondCard = undefined;
      vm.matched = 0;
      vm.time = 0;
      toastr.clear();
      if (angular.isDefined(vm.gameTime)) {$interval.cancel(vm.gameTime);}
      vm.gameTime = gameTime();
    }

    function flip(card) {
      if (vm.matched < game.pairs()) {
        if (!card.flipped) {
          game.flip(card);
          if (angular.isUndefined(vm.secondCard)) {
            if (angular.isUndefined(vm.firstCard)) {
              vm.firstCard = card;
            } else {
              vm.secondCard = card;
              if (vm.firstCard.color === vm.secondCard.color) {
                toasts.push(toastr.success("Good one :)", "Color Match"));
                vm.firstCard = vm.secondCard = undefined;
                vm.matched++;                
              } else {
                toasts.push(toastr.error("Try again :(", "Color don't match"));
              }              
              if (vm.matched == game.pairs()) {
                toasts.push(toastr.info("You won \\o/ and your time was: " + $filter('date')($filter('secondsToTime')(vm.time),'HH:mm:ss'), "Congratulations", {timeOut: 0}));
                $interval.cancel(vm.gameTime);
                if (vm.bestTime == 0 || vm.time < vm.bestTime) {
                  vm.bestTime = vm.time;
                }
              }
            }
          } else {            
            game.flip(vm.firstCard);
            game.flip(vm.secondCard);
            vm.firstCard = card;
            vm.secondCard = undefined;
          }
        }
      }
    }

    function gameTime() {
      return $interval(function() {
        return vm.time++;
      }, 1000, 0);
    }
  }
})();
