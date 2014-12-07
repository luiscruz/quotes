jQuery(document).ready(function () {
});

var app = angular.module('quotesApp', [
        'ui.bootstrap',
        'ngRoute',
        'appControllers',
        'appServices',
        'colorpicker.module',
        'ngFlowtype',
    ]
);
    
var todayDate = new Date(),
    current_day = todayDate.getDate()
    current_month = todayDate.getMonth()+1,
    current_year = todayDate.getFullYear();
    today_path = '/'+current_year+'/'+current_month+'/'+current_day

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/:year/:month/:day', {
        templateUrl: '/app/partials/quote_show.html',
        controller: 'QuoteByDateCtrl'
      }).
      when('/quotes/index', {
        templateUrl: '/app/partials/quote_index.html',
        controller: 'QuoteIndexCtrl'
      }).
      when('/login', {
        templateUrl: 'app/partials/login.html',
          controller: 'LoginCtrl'
      }).
      when('/logout', {
          template: '',
          controller: function(Session, $location){Session.destroy(); $location.path('/login')}
      }).
      otherwise({
        redirectTo: today_path
      });
      
      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });
  }]);
