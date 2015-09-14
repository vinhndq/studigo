(function(){
  'use strict';

  angular.module('studigoApp')
    .factory('LessionService',LessonService);

  LessonService.$inject=['$http'];
  function LessonService($http)
  {
    var service={};
    service.GetLesssonByID = GetLesssonByID;
    return service;

    GetLesssonByID = function(lessionId)
    {
      return {};
    }
  };
})();
