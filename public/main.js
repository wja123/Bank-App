'use strict';

var app = angular.module("transApp", []);
var editIndexAndId;
var transListArr = [];

app.controller("main-controller", function($scope, $http) {
    console.log($scope);
    getData();

    function getData() {
        $http({
            method: "GET",
            url: "/transactions"
        }).then(function(res) {
            $scope.transList = res.data;
            transListArr = res.data;
            updateBankBalance();

        }, function(err) {
            console.log(err);
        });

    }


    $scope.clickRemove = function() {
        var delId = this.trans.id;
        var delIndex = this.$index;
        console.log(delIndex);
        $http({
            method: "DELETE",
            url: "/transactions/" + delId
        }).then(function(res) {
            $scope.transList.splice(delIndex, 1);
        }, function(err) {
            console.log(err);
        })
        getData();
    };

    $scope.clickEdit = function() {
        editIndexAndId = [this.trans.id, this.$index];
        console.log(editIndexAndId);
        $(".upDate").val($scope.transList[this.$index].date);
        $(".upDesc").val($scope.transList[this.$index].description);
        $(".upDebit").val($scope.transList[this.$index].debit);
        $(".upCredit").val($scope.transList[this.$index].credit);
        $(".upDate").trigger();
        $(".upDesc").trigger();
        $(".upDebit").trigger();
        $(".upCredit").trigger();

    }

    $scope.deposit = function() {
        var upDate = angular.copy($scope.transaction);
        if (upDate.description !== "" && upDate.date !== "" && upDate.amount !== "") {

            upDate.debit = $scope.transaction.amount;
            upDate.credit = 0;
            delete upDate.amount;
            addTransaction(upDate);
        }

    }

    $scope.withdraw = function() {
        var upDate = angular.copy($scope.transaction);
        if (upDate.description !== "" && upDate.date !== "" && upDate.amount !== "") {

            var upDate = angular.copy($scope.transaction);
            upDate.credit = $scope.transaction.amount;
            upDate.debit = 0;
            delete upDate.amount;
            addTransaction(upDate);
        }
    }


    var addTransaction = function(newData) {
        var upDate = angular.copy($scope.updatetrans);
        console.log($scope.transList);
        $http({
            method: "POST",
            url: "/transactions/",
            data: newData
        }).then(function(res) {
            getData();
        }, function(err) {
            console.log(err);
        })
        getData();

    }

    $scope.clickUpdate = function() {
        var upDate = angular.copy($scope.updatetrans);
        console.log($scope.transList);
        $http({
            method: "PUT",
            url: "/transactions/" + editIndexAndId[0],
            data: upDate
        }).then(function(res) {
            getData();

        }, function(err) {
            console.log(err);
        })
        getData();
    }

    function updateBankBalance() {
        var balance = 0;
        console.log(transListArr);
        for (var i = 0; i < transListArr.length; i++) {
            balance += (transListArr[i].debit) - (transListArr[i].credit);
        }
        $scope.bankbalance = balance;
        console.log(balance);
    }

});