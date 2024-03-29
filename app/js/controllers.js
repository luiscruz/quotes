var appControllers = angular.module('appControllers', []);
var api_url = 'http://localhost:3000/api';
//var api_url = 'https://aquote.herokuapp.com/api';


appControllers.controller('QuoteByDateCtrl', function ($scope, $http, $routeParams, $location) {
    var current_day = $routeParams.day,
        current_month = $routeParams.month,
        current_year = $routeParams.year;
    var current_date = new Date(current_year, current_month -1, current_day)
    
    window.hiddenElements = '#toolbar-bottom, #toolbar-top'; //redundant but needed to hide these elements
    window.timeoutDelay = 2000;
    window.mouseInsideHiddenElements = false;
    animationDuration = 500;
    
    $scope.bodyStyle = function(){
        return {
            "background-color": $scope.bgColor,
            color: $scope.fgColor
        };
    } ;
    $scope.onMouseEnterHiddenElements = function(){
        $scope.mouseInsideHiddenElements = true;
    }

    $scope.onMouseLeaveHiddenElements = function(){
        $scope.mouseInsideHiddenElements = false;
    }
    
    $scope.onMouseMove = function(){
            jQuery(window.hiddenElements).fadeIn(animationDuration);
            if(window.timeoutID !== undefined){
                window.timeoutID = clearTimeout(window.timeoutID);
            }
            window.timeoutID = window.setTimeout(
                function(){
                    if(!$scope.mouseInsideHiddenElements){
                        jQuery(window.hiddenElements).fadeOut(animationDuration);
                    }   
                },
                timeoutDelay
            );
        }
    
    $http.get(api_url+'/quotes/'+current_year+'/'+current_month+'/'+current_day).
        success(function(data, status, headers, config){

            $scope.quote = data.quote;
            $scope.author = data.author;
            $scope.bgColor = data.bgColor;
            $scope.fgColor = data.fgColor;
            jQuery('body').css({'background-color':$scope.bgColor, 'color':$scope.fgColor});
            
            if(window.callPhantom){
                window.setTimeout(function(){
                    window.callPhantom('takeShot');
                },
                1010);
            }

        })
        .error(function(data, status){
            if(status == 401){
                $location.path('/')    
            }
            if(window.callPhantom){
                window.callPhantom('takeShot');
            }
        });
        
    $scope.goToDayBefore = function(){
        var dayBefore = new Date(current_date)
        dayBefore.setDate(current_date.getDate() - 1);
        goToDate(dayBefore.getFullYear(),(dayBefore.getMonth()+1),dayBefore.getDate());
    }
    
    $scope.goToDayAfter = function(){
        var dayBefore = new Date(current_date)
        dayBefore.setDate(current_date.getDate() + 1);
        goToDate(dayBefore.getFullYear(),(dayBefore.getMonth()+1),dayBefore.getDate());
    }
    
    goToDate = function(year, month, day){
        $location.path( '/'+year+'/'+month+'/'+day);
        
    }
});

appControllers.directive('buttonTransparent', function () {
    return {
        restrict: 'EA',
        link: function (scope, element) {
            element.addClass('btn btn-transparent')
            element.on('mouseenter', function() {
                element.css({
                    color: scope.bgColor,
                    backgroundColor: scope.fgColor
                })
            });
            element.on('mouseleave', function() {
                element.removeAttr('style');
            });
        }
    };
});

appControllers.controller('QuoteIndexCtrl', function ($scope, $http, $route, $routeParams) {
    $http.get(api_url+'/quotes/').success(function(data, status, headers, config){
        $scope.quotes = data;
    })
    
    $scope.quoteStyle = function(quote){
        if (quote == undefined){
            return {};
        }
        return {
            "background-color": quote.bgColor,
            color: quote.fgColor
        };
    }
    
    $scope.updateQuote = function(quote){
        console.log('update quote started')
        $http.put(api_url+'/quotes/'+quote._id, quote).
            success(function(data, status, headers, config){
                console.log('update quote succeeded')
            });
    }
    
    $scope.createQuote = function(quote){
        $http.post(api_url+'/quotes', quote).
            success(function(data, status, headers, config){
                console.log('create quote succeeded')
                $route.reload()
            });
    }
    
    $scope.isToday = function(date){
        today = new Date();
        dateObj = new Date(date)
        return dateObj.toDateString() == today.toDateString();
    }
    
    $scope.isTomorrow = function(date){
        tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateObj = new Date(date);
        return dateObj.toDateString() == tomorrow.toDateString();
    }
    
    function daydiff(first, second){
        first = new Date(first)
        second = new Date(second)
        return Math.round(Math.abs((second-first)/(1000*60*60*24)));
    }
    
    $scope.daysInBetween = function(quote, index){
        if(index > 0){
            previousQuote = $scope.quotes[index -1];
            console.log(previousQuote.publishOnDate)
            console.log(quote.publishOnDate)
            console.log('--')
            return daydiff(previousQuote.publishOnDate, quote.publishOnDate);
        }
    }
});

appControllers.controller('LoginCtrl', function ($scope, $http,$location, Session) {
    $scope.credentials = {'username': '', 'password': ''}
    $scope.login = function(){
        hashed_password = $scope.credentials.password;
        return $http
            .post(api_url+'/login', {username: $scope.credentials.username, password: hashed_password})
            .success(function (data) {
                console.log(data)
                Session.create(data.session_id);
                $location.path('/quotes/index');
            });
    }
});
