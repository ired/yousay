(function() {
  'use strict';

  angular
    .module('yousay',[
        'ngAria',
        'ngRoute',
        'ab-base64',
        'angularTypewrite'
    ])

      .config(routeConfig)

      routeConfig.$inject = ['$routeProvider'];

      function routeConfig($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    templateUrl: 'DefaultMessage.html'
                })
                .when('/new', {
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    templateUrl: 'NewMessage.html'
                }).
                when ('/m/:message/:video', {
                    controller: 'MessageController',
                    controllerAs: 'vm',
                    templateUrl: 'ShowMessage.html'

                })

                .otherwise({ redirectTo: '/' });
      }

})();