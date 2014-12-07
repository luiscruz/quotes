var appServices = angular.module('appServices', []);


appServices.service('Session', function ($http) {
  this.create = function (session_id) {
      //this.session_id = session_id;
      //$http.defaults.headers.common['session_id'] = session_id
  };
  this.destroy = function (api_url) {
      //this.session_id = null;
      //$http.defaults.headers.common['session_id'] = '';
      if(api_url){
          $http.get(api_url+'/logout');
      }
          
  };
  return this;
})