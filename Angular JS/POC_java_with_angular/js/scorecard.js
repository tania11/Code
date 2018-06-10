'use strict';

var gscAutomationApp = angular.module('gscAutomationApp', ['ngRoute']);

gscAutomationApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'html/home.html'
                }).
                when('/table', {
                    templateUrl: 'html/table.html'
                });
        }]);

gscAutomationApp.controller('gscAutomationController', function($scope,$http) {
    $scope.ctrl = this;

    
    $scope.loading = true;
    
    $scope.getTableData = function () {
        $http.get('https://api.myjson.com/bins/16esvv').then(function (response, $http) {
                $scope.tableData = response.data.data;
                $scope.arrayOfKeys=Object.keys($scope.tableData[0]);
                $scope.hiddenColList=[];
                $scope.TotalColList=$scope.arrayOfKeys;
                $scope.selected=true;
                $scope.selectedAll=true;
                $scope.loading = false;
            },
            function myError(response) {
                alert(response.statusText);
            });
    };

    $scope.hideColumn=function(colindex,colkey){
        $scope.hideCol=colindex;
        $scope.flagHide==0;
        //console.log(colindex);

        for (let el of document.querySelectorAll('.'+colkey)) {

            if (el.classList.contains("hidden-column")) {
                $scope.flagHide=1;
                el.classList.remove("hidden-column");
            } 
            else {

                $scope.flagHide=0;
                el.classList.add("hidden-column");
            }
        }

        if($scope.flagHide==1){
            $scope.colListHiddenDropdownPop(colkey);
        }

        else{
            $scope.colListHiddenDropdownPush(colkey); 
        }
    };

    $scope.hideShowAllColumns=function(colindex,colkey,checked){
        $scope.flagHideAll==0;
        //console.log(colindex);
        for (let el of document.querySelectorAll('.'+colkey)) {
            if(checked==true){
                $scope.flagHideAll=1;
                el.classList.remove("hidden-column");
            }
            else{
                $scope.flagHideAll=1;
                el.classList.add("hidden-column");
            }           
        }

        if($scope.flagHideAll==1){
            $scope.colListHiddenDropdownPop(colkey);
        }

        else{
            $scope.colListHiddenDropdownPush(colkey); 
        }
    };

    $scope.hideShowColms=function(selected,hidddencol){
        $scope.hideColumn(0,hidddencol); 
    };

    $scope.hideShowColmsAll=function(selectedAll,hidddencol){
        $scope.selected=selectedAll;
        if(selectedAll==true){
            $scope.hiddenColList=[];
        }
        angular.forEach($scope.arrayOfKeys,function(data,i){
            $scope.hideShowAllColumns(i,data,selectedAll);
        });     
    };

    $scope.colListHiddenDropdownPush=function(colkeyDropdownPush){

        $scope.hiddenColList.push(colkeyDropdownPush);
    };

    $scope.colListHiddenDropdownPop=function(colkeyDropdownPop){

        $scope.index = $scope.hiddenColList.indexOf(colkeyDropdownPop);
        if ($scope.index > -1) {
            $scope.hiddenColList.splice($scope.index, 1);
        }
   
    };

    $scope.columnFilter=function(col){
        document.querySelector(".dropdown-content").classList.add("dropdown-content-show");
        //console.log(col);
    };

    $scope.columnFilterHide=function(col){
        document.querySelector(".dropdown-content").classList.remove("dropdown-content-show");
        //console.log(col);
    };

    $scope.ctrl.handleScrollToTop = function () {
        console.log("TOP!");
    };

    $scope.ctrl.handleScrollToBottom = function () {
        console.log("BOTTOM!");
    };



});



gscAutomationApp.directive('execOnScrollToTop', function () {

  return {
    
    restrict: 'A',
    link: function (scope, element, attrs) {
      var fn = scope.$eval(attrs.execOnScrollToTop);

      element.on('scroll', function (e) {

        if (!e.target.scrollTop) {
          console.log("scrolled to top...");
          scope.$apply(fn);
        }

      });
    }
    
  };
  
});

gscAutomationApp.directive('execOnScrollToBottom', function () {

  return {
    
    restrict: 'A',
    link: function (scope, element, attrs) {
      var fn = scope.$eval(attrs.execOnScrollToBottom),
          clientHeight = element[0].clientHeight;

      element.on('scroll', function (e) {
        var el = e.target;

        if ((el.scrollHeight - el.scrollTop) === clientHeight) { // fully scrolled
          console.log("scrolled to bottom...");
          scope.$apply(fn);
        }
      });
    }
    
  };
  
});
