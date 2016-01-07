(function() {
  'use strict';

  angular
    .module('colors')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
