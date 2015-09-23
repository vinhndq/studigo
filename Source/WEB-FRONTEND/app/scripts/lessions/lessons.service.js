(function(){
  'use strict';

  angular.module('studigoApp')
    .factory('LessionService',LessonService);

  LessonService.$inject=['$http'];
  function LessonService($http)
  {
    var service={};
    service.GetLesson = GetLesson;
    return service;

    function GetLesson(code,type)
    {
      return {};
    }
  };
})();
