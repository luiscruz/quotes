jQuery(document).ready(function () {
});

var app = angular.module('quotesApp', [
        'ui.bootstrap',
        'ngRoute',
        'appControllers',
        'colorpicker.module',
        'ngFlowtype',
    ]
);
    
var todayDate = new Date(),
    current_day = todayDate.getDate()
    current_month = todayDate.getMonth()+1,
    current_year = todayDate.getFullYear();
    today_path = '/'+current_year+'/'+current_month+'/'+current_day

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/:year/:month/:day', {
        templateUrl: 'partials/quote_show.html',
        controller: 'QuoteByDateCtrl'
      }).
      when('/quotes/index', {
        templateUrl: 'partials/quote_index.html',
        controller: 'QuoteIndexCtrl'
      }).
      otherwise({
        redirectTo: today_path
      });
  }]);
