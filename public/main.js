'use strict';

var app = angular.module("transApp", []);
var editIndex;

app.controller("main-controller", function($scope, $http) {
    console.log($scope);

    getData();

    function getData() {
        $http({
            method: "GET",
            url: "http://localhost:8000/transactions"
        }).then(function(res) {
            console.log(res.data)
            $scope.transList = res.data;
            console.log($scope.transList);
        }, function(err) {
            console.log(err);
        });
    }


    $scope.clickRemove = function() {
        var delIndex = this.trans.id;
        console.log(this.trans.id)
        $http({
            method: "DELETE",
            url: "http://localhost:8000/transactions/" + delIndex
        }).then(function(res) {
            $scope.transList.splice(this.$index, 1);
        }, function(err) {
            console.log(err);
        })
    };

    $scope.clickEdit = function() {
        var delIndex = this.trans.id;
        //$(".upDate").val(this.trans.date);


        // $scope.updatetrans.date = this.trans.date
        //$(".upDesc").val(this.trans.description);  
        console.log(this.trans.id)

    }

    function updateDataServer(index, data) {
        var delIndex = this.trans.id;
        console.log(this.trans.id)
        $http({
            method: "PUT",
            url: "http://localhost:8000/transactions/" + delIndex,
            data: data
        }).then(function(res) {
            $scope.transList.splice(this.$index, 1);
        }, function(err) {
            console.log(err);
        })
    }

});