(function() {
  'use strict';

  angular
    .module('colors')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, toastrConfig, game) {    
    var vm = this;
    var toasts = [];

    vm.newGame = newGame;
    vm.flip = flip;
    vm.home = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;    

    function newGame() {
      vm.grid = game.new();
      vm.home = false;
      vm.firstCard = vm.secondCard = undefined;
      vm.matched = 0;
      toastr.clear();
    }

    function flip(card) {
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
              toasts.push(toastr.info("You won \\o/ press New game button", "Congratulations", {timeOut: 0}));
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
})();
