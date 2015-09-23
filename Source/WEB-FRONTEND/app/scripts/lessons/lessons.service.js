(function(){
  'use strict';

  angular.module('studigoApp')
    .factory('LessonService',LessonService);

  LessonService.$inject=['$http'];
  function LessonService($http)
  {
    var service={};
    service.GetLessonInfo = GetLesson;
    service.GetLessons = GetLessons;
    service.GetUnits = GetUnits;
    service.GetUnitInfo = GetUnitInfo;
    service.GetQuestions = GetQuestions;
    service.GetQuestionInfo = GetQuestionInfo;
    return service;

    function GetLessons(type)
    {
      return {};
    }
    function GetLessonInfo(code)
    {
      return {};
    }
    function GetUnits(lessionCode)
    {
      return {};
    }
    function GetUnitInfo(unitCode)
    {
      return {};
    }
    function GetQuestions(unitCode)
    {
      return {};
    }
    function GetQuestionInfo(questionCode)
    {
      return {};
    }
  };
})();
