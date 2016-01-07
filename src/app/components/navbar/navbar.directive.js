(function() {
  'use strict';

  angular
    .module('colors')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html'
    };

    return directive;
  }

})();
