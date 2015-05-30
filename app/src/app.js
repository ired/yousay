(function() {
  'use strict';

  angular
    .module('yousay',[
        'ngAria',
        'ngRoute'
    ])

      .config(routeConfig)

      routeConfig.$inject = ['$routeProvider'];

      function routeConfig($routeProvider) {
            $routeProvider
                // .when('/', {
                //     templateUrl: 'app/msg_form/introview.html',
                //     title: 'Send Message Anonymously'
                // })
                .when('/', {
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    templateUrl: 'messageform.html'
                })
                .otherwise({ redirectTo: '/' });
      }

})();