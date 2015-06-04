(function() {
  'use strict';

  angular
    .module('yousay',[
        'ngAria',
        'ngRoute',
        'ab-base64',
        'angularTypewrite',
        'snap'
    ])
    .config(routeConfig)

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider, $locationProvider) {
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
              when ('/m/:message', {
                  controller: 'MessageController',
                  controllerAs: 'vm',
                  templateUrl: 'ShowMessage.html'

              })

              .otherwise({ redirectTo: '/' });
    }

})();